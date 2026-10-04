import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Mic, Sparkles, X, Check, ArrowRight, Plus, Package,
  AlertTriangle, Search, Volume2, ShoppingCart, ChevronDown
} from 'lucide-react';

// Parses spoken text and returns an intent object
const parseIntent = (text) => {
  const lower = text.toLowerCase();

  // ADD intent: "add", "get me", "put", "order", "buy", "i want"
  if (/\b(add|put|order|buy|get me|i want|give me)\b/.test(lower)) {
    // Try to detect quantity
    const qtyMatch = lower.match(/\b(one|two|three|four|five|six|seven|eight|nine|ten|1|2|3|4|5|6|7|8|9|10)\b/);
    const wordToNum = { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10 };
    const qty = qtyMatch ? (wordToNum[qtyMatch[1]] || parseInt(qtyMatch[1]) || 1) : 1;
    return { type: 'ADD', qty };
  }

  // CHECK STOCK / SEARCH intent: "do you have", "check stock", "is there", "how many", "available", "in stock", "search", "find", "show me", "look for"
  if (/\b(do you have|check stock|is there|how many|available|in stock|search|find|show me|look for|check|any)\b/.test(lower)) {
    return { type: 'SEARCH' };
  }

  // PRICE intent
  if (/\b(price|how much|cost|costs)\b/.test(lower)) {
    return { type: 'PRICE' };
  }

  // Default: try to match product anyway (treat as search if unknown)
  return { type: 'SEARCH' };
};

// Fuzzy product search - checks name, category, and description words
const findBestMatches = (spoken, products) => {
  const lower = spoken.toLowerCase();
  const words = lower.split(/\s+/).filter(w => w.length > 2);

  return products
    .map(p => {
      let score = 0;
      const nameWords = p.name.toLowerCase().split(/\s+/);
      const catWords = p.category.toLowerCase().split(/\s+/);
      const descWords = (p.description || '').toLowerCase().split(/\s+/);

      words.forEach(word => {
        nameWords.forEach(nw => { if (nw.startsWith(word) || word.startsWith(nw)) score += 3; });
        catWords.forEach(cw => { if (cw.startsWith(word) || word.startsWith(cw)) score += 1.5; });
        descWords.forEach(dw => { if (dw.startsWith(word) || word.startsWith(dw)) score += 0.5; });
      });
      return { product: p, score };
    })
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(r => r.product);
};

// Voice audio synthesis helper
const speakText = (text) => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.05;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
  }
};

export const VoiceModal = ({ isOpen, onClose }) => {
  const { products, addToCart, playSoundEffect } = useApp();

  const [mode, setMode] = useState('listening'); // 'listening' | 'result'
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [intent, setIntent] = useState(null); // { type: 'ADD'|'SEARCH'|'PRICE', qty? }
  const [matches, setMatches] = useState([]);  // matched products
  const [addedProd, setAddedProd] = useState(null);
  const [audioLevel, setAudioLevel] = useState(0);

  const recognitionRef = useRef(null);

  // Simulated audio waveform animation
  useEffect(() => {
    let interval;
    if (isListening) {
      interval = setInterval(() => {
        setAudioLevel(Math.random());
      }, 80);
    } else {
      setAudioLevel(0);
    }
    return () => clearInterval(interval);
  }, [isListening]);

  useEffect(() => {
    if (!isOpen) {
      stopRecognition();
      setMode('listening');
      setTranscript('');
      setIntent(null);
      setMatches([]);
      setAddedProd(null);
      return;
    }

    // Start recognition
    startRecognition();
    return () => stopRecognition();
  }, [isOpen]);

  const startRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    try {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = true;
      rec.lang = 'en-US';
      recognitionRef.current = rec;

      rec.onstart = () => setIsListening(true);
      rec.onend = () => setIsListening(false);
      rec.onerror = () => setIsListening(false);

      rec.onresult = (event) => {
        const idx = event.resultIndex;
        const text = event.results[idx][0].transcript;
        setTranscript(text);

        if (event.results[idx].isFinal) {
          processVoiceInput(text);
        }
      };

      rec.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  const stopRecognition = () => {
    try { recognitionRef.current?.stop(); } catch (e) {}
    setIsListening(false);
  };

  const processVoiceInput = (text) => {
    const detectedIntent = parseIntent(text);
    const found = findBestMatches(text, products);
    setIntent(detectedIntent);
    setMatches(found);
    setMode('result');

    if (found.length === 0) {
      speakText('Sorry, I could not find that item in the catalog.');
    } else if (detectedIntent.type === 'SEARCH') {
      const prod = found[0];
      const stockMsg = prod.stock > 5
        ? `${prod.name} is available. ${prod.stock} units in stock at $${prod.price.toFixed(2)}.`
        : prod.stock > 0
        ? `${prod.name} is low stock. Only ${prod.stock} units remaining.`
        : `${prod.name} is currently out of stock.`;
      speakText(stockMsg);
    } else if (detectedIntent.type === 'ADD') {
      const prod = found[0];
      speakText(`Found ${prod.name}. Shall I add it to the cart?`);
    } else if (detectedIntent.type === 'PRICE') {
      const prod = found[0];
      speakText(`${prod.name} costs $${prod.price.toFixed(2)}.`);
    }
  };

  // Quick command simulation cards
  const sampleCommands = [
    { text: 'Add iPhone 15 Pro Max', type: 'ADD', prodId: 'prod-1', qty: 1 },
    { text: 'Do you have Sony Headphones?', type: 'SEARCH', prodId: 'prod-3', qty: 1 },
    { text: 'Check stock of Cold Brew Coffee', type: 'SEARCH', prodId: 'prod-22', qty: 1 },
    { text: 'Add 2 Caramel Macchiato Latte', type: 'ADD', prodId: 'prod-17', qty: 2 },
    { text: "How much is the Apple Watch?", type: 'PRICE', prodId: 'prod-4', qty: 1 },
    { text: 'Find Artisan Sourdough Bread', type: 'SEARCH', prodId: 'prod-12', qty: 1 },
  ];

  const executeSimulated = (cmd) => {
    setTranscript(cmd.text);
    const prod = products.find(p => p.id === cmd.prodId);
    if (!prod) return;

    const detectedIntent = { type: cmd.type, qty: cmd.qty };
    setIntent(detectedIntent);
    setMatches([prod, ...products.filter(p => p.category === prod.category && p.id !== prod.id).slice(0, 2)]);
    setMode('result');

    if (cmd.type === 'SEARCH') {
      const stockMsg = prod.stock > 5
        ? `${prod.name} is available with ${prod.stock} units in stock at $${prod.price.toFixed(2)}.`
        : prod.stock > 0
        ? `${prod.name} is low stock. Only ${prod.stock} units left.`
        : `${prod.name} is currently out of stock.`;
      speakText(stockMsg);
    } else if (cmd.type === 'ADD') {
      speakText(`Found ${prod.name} at $${prod.price.toFixed(2)}. Ready to add to cart.`);
    } else if (cmd.type === 'PRICE') {
      speakText(`${prod.name} costs $${prod.price.toFixed(2)}.`);
    }
  };

  const handleAddToCart = (prod, qty = 1) => {
    addToCart(prod, qty);
    playSoundEffect('add');
    setAddedProd(prod.id);
    speakText(`${prod.name} added to cart.`);
    setTimeout(() => {
      setAddedProd(null);
    }, 2000);
  };

  const resetToListening = () => {
    setMode('listening');
    setTranscript('');
    setIntent(null);
    setMatches([]);
    setAddedProd(null);
    startRecognition();
  };

  if (!isOpen) return null;

  const intentColor = {
    ADD: 'text-blue-400',
    SEARCH: 'text-amber-400',
    PRICE: 'text-purple-400',
  };
  const intentLabel = {
    ADD: '🛒 Add to Cart',
    SEARCH: '🔍 Stock Check',
    PRICE: '💲 Price Query',
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700/70 rounded-3xl max-w-md w-full shadow-2xl relative flex flex-col max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            {/* Animated mic ring */}
            <div className="relative shrink-0">
              <div className={`absolute inset-0 rounded-full bg-blue-500/30 ${isListening ? 'animate-ping' : ''}`} />
              <div className={`w-11 h-11 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/40 relative z-10`}>
                <Mic className={`w-5 h-5 text-white ${isListening ? 'animate-bounce' : ''}`} />
              </div>
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">AI Voice Interface</h3>
              <p className="text-[11px] text-blue-400">Voice-First Catalog Engine</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Waveform visualizer */}
        <div className="px-5 pt-4">
          <div className="flex items-center justify-center gap-0.5 h-8 bg-slate-950/70 rounded-xl px-3 border border-slate-800">
            {Array.from({ length: 32 }).map((_, i) => (
              <div
                key={i}
                className={`w-1 rounded-full transition-all duration-75 ${isListening ? 'bg-blue-500' : 'bg-slate-700'}`}
                style={{
                  height: isListening
                    ? `${Math.max(4, Math.abs(Math.sin(i * 0.4 + audioLevel * 8) * 24 + audioLevel * 12))}px`
                    : '4px'
                }}
              />
            ))}
          </div>

          {/* Transcript bubble */}
          <div className="mt-3 p-3 rounded-2xl bg-slate-800/80 border border-slate-700 text-xs font-medium text-slate-200 min-h-[44px] flex items-center text-center justify-center italic shadow-inner">
            {transcript ? `"${transcript}"` : (
              <span className="text-slate-500">
                {isListening ? '🎙️ Listening… speak now' : 'Tap a command below or speak'}
              </span>
            )}
          </div>

          {/* Detected Intent Badge */}
          {intent && mode === 'result' && (
            <div className="mt-2 flex items-center justify-center gap-2">
              <span className={`text-[11px] font-bold uppercase tracking-wider ${intentColor[intent.type]}`}>
                {intentLabel[intent.type]} Detected
              </span>
              {intent.qty > 1 && (
                <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full font-mono">
                  Qty: {intent.qty}
                </span>
              )}
              <button
                onClick={resetToListening}
                className="text-[10px] text-slate-400 hover:text-white underline ml-auto"
              >
                Reset
              </button>
            </div>
          )}
        </div>

        {/* --- RESULT VIEW: matched products --- */}
        {mode === 'result' && matches.length > 0 ? (
          <div className="overflow-y-auto p-5 pt-3 space-y-2.5 flex-1">
            <div className="text-[11px] uppercase font-bold tracking-wider text-slate-400 mb-1 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5" />
              {matches.length === 1 ? 'Best Match' : `${matches.length} Results`}
            </div>

            {matches.map((prod) => {
              const isLow = prod.stock > 0 && prod.stock <= 5;
              const isOut = prod.stock <= 0;
              const isJustAdded = addedProd === prod.id;

              return (
                <div
                  key={prod.id}
                  className={`p-3 rounded-2xl border transition ${
                    isJustAdded
                      ? 'bg-emerald-950/40 border-emerald-500/50'
                      : 'bg-slate-800/80 border-slate-700/70 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img src={prod.image} alt={prod.name} className="w-12 h-12 rounded-xl object-cover border border-slate-700 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-white truncate">{prod.name}</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">{prod.category}</div>

                      {/* Stock Status */}
                      <div className={`inline-flex items-center gap-1 mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isOut
                          ? 'bg-rose-500/20 text-rose-300'
                          : isLow
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-emerald-500/20 text-emerald-300'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${isOut ? 'bg-rose-400' : isLow ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                        {isOut ? 'Out of Stock' : isLow ? `Low Stock (${prod.stock} left)` : `In Stock (${prod.stock} units)`}
                      </div>
                    </div>

                    <div className="shrink-0 text-right space-y-1.5">
                      <div className="text-sm font-black text-white font-mono">${prod.price.toFixed(2)}</div>

                      {/* Add to Cart button — always show for search results too */}
                      {!isOut && (
                        <button
                          onClick={() => handleAddToCart(prod, intent?.qty || 1)}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold transition ${
                            isJustAdded
                              ? 'bg-emerald-500 text-white'
                              : 'bg-blue-600 hover:bg-blue-500 text-white'
                          }`}
                        >
                          {isJustAdded ? (
                            <><Check className="w-3 h-3" /> Added!</>
                          ) : (
                            <><Plus className="w-3 h-3" /> Add{intent?.qty > 1 ? ` ${intent.qty}x` : ''}</>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Description preview on first match */}
                  {prod === matches[0] && prod.description && (
                    <p className="text-[10px] text-slate-400 mt-2 leading-relaxed line-clamp-2">{prod.description}</p>
                  )}
                </div>
              );
            })}

            {/* New search prompt */}
            <button
              onClick={resetToListening}
              className="w-full py-2.5 rounded-2xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-2 transition mt-2"
            >
              <Mic className="w-3.5 h-3.5 text-blue-400" />
              Ask another question
            </button>
          </div>
        ) : mode === 'result' && matches.length === 0 ? (
          <div className="p-5 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center mx-auto text-rose-400">
              <Package className="w-6 h-6" />
            </div>
            <p className="text-sm text-slate-300 font-medium">No matching products found</p>
            <p className="text-xs text-slate-500">Try saying a product name, category like "Electronics", or brand name.</p>
            <button onClick={resetToListening} className="text-xs text-blue-400 hover:underline flex items-center gap-1 mx-auto">
              <Mic className="w-3.5 h-3.5" /> Try again
            </button>
          </div>
        ) : (
          /* --- LISTENING VIEW: sample commands --- */
          <div className="p-5 pt-3 overflow-y-auto flex-1">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Try these voice commands:</span>
            </div>
            <div className="space-y-1.5">
              {sampleCommands.map((cmd, idx) => {
                const typeIcon = cmd.type === 'ADD' ? '🛒' : cmd.type === 'PRICE' ? '💲' : '🔍';
                const typeColor = cmd.type === 'ADD' ? 'text-blue-400' : cmd.type === 'PRICE' ? 'text-purple-400' : 'text-amber-400';
                return (
                  <button
                    key={idx}
                    onClick={() => executeSimulated(cmd)}
                    className="w-full text-left px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 hover:border-slate-600 text-xs font-medium text-slate-200 transition flex items-center justify-between gap-2 group"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="shrink-0">{typeIcon}</span>
                      <span className="truncate">"{cmd.text}"</span>
                    </div>
                    <span className={`text-[10px] font-bold uppercase shrink-0 ${typeColor}`}>
                      {cmd.type}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="mt-4 grid grid-cols-3 gap-1.5 text-center text-[10px] text-slate-500">
              <div className="p-1.5 bg-slate-800/50 rounded-lg">🛒 <strong className="text-blue-400">ADD</strong> to cart</div>
              <div className="p-1.5 bg-slate-800/50 rounded-lg">🔍 <strong className="text-amber-400">SEARCH</strong> &amp; stock</div>
              <div className="p-1.5 bg-slate-800/50 rounded-lg">💲 <strong className="text-purple-400">PRICE</strong> query</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
