import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ScanBarcode, Camera, X, Check, Plus, AlertTriangle,
  Package, ShoppingCart, Sparkles, ChevronRight
} from 'lucide-react';

// Fuzzy product match helper (same as VoiceModal)
const findBestMatches = (query, products) => {
  const lower = query.toLowerCase();
  const words = lower.split(/\s+/).filter(w => w.length > 2);

  return products
    .map(p => {
      let score = 0;
      const nameWords = p.name.toLowerCase().split(/\s+/);
      const catWords = p.category.toLowerCase().split(/\s+/);
      const barcodeMatch = p.barcode.includes(query);
      if (barcodeMatch) score += 100; // exact barcode match = highest priority

      words.forEach(word => {
        nameWords.forEach(nw => { if (nw.startsWith(word) || word.startsWith(nw)) score += 3; });
        catWords.forEach(cw => { if (cw.startsWith(word) || word.startsWith(cw)) score += 1.5; });
      });
      return { product: p, score };
    })
    .filter(r => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map(r => r.product);
};

const speakText = (text) => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1.05;
    u.pitch = 1.1;
    window.speechSynthesis.speak(u);
  }
};

export const BarcodeModal = ({ isOpen, onClose }) => {
  const { products, addToCart, playSoundEffect } = useApp();
  const [scannedProducts, setScannedProducts] = useState(null); // null = scanning, [] = no result, [...] = results
  const [addedIds, setAddedIds] = useState(new Set());
  const [barcodeInput, setBarcodeInput] = useState('');
  const [scanMode, setScanMode] = useState('camera'); // 'camera' | 'manual'

  const handleScan = (prodOrQuery) => {
    let matches;
    if (typeof prodOrQuery === 'object') {
      // Direct product object passed from quick scan tiles
      matches = [prodOrQuery];
    } else {
      // Text barcode or name query
      matches = findBestMatches(prodOrQuery, products);
      if (!matches.length) {
        // Try barcode exact match
        const exact = products.find(p => p.barcode === prodOrQuery);
        matches = exact ? [exact] : [];
      }
    }

    setScannedProducts(matches);

    if (matches.length > 0) {
      const prod = matches[0];
      const stockMsg = prod.stock <= 0
        ? `${prod.name} is out of stock.`
        : prod.stock <= 5
        ? `${prod.name} found. Low stock — only ${prod.stock} units left at $${prod.price.toFixed(2)}.`
        : `${prod.name} found. ${prod.stock} units in stock. Price: $${prod.price.toFixed(2)}.`;
      speakText(stockMsg);
      playSoundEffect('add');
    } else {
      speakText('Product not found in catalog.');
    }
  };

  const handleAddToCart = (prod, qty = 1) => {
    addToCart(prod, qty);
    playSoundEffect('add');
    setAddedIds(prev => new Set([...prev, prod.id]));
    speakText(`${prod.name} added to cart.`);
  };

  const handleManualSearch = (e) => {
    e.preventDefault();
    if (!barcodeInput.trim()) return;
    handleScan(barcodeInput.trim());
  };

  const resetScanner = () => {
    setScannedProducts(null);
    setBarcodeInput('');
    setAddedIds(new Set());
  };

  if (!isOpen) return null;

  // Quick-scan shortcut tiles (the products pre-loaded for demo)
  const quickScanProducts = products.slice(0, 6);

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700/70 rounded-3xl max-w-md w-full shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <ScanBarcode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Vision OCR Scanner</h3>
              <p className="text-[11px] text-blue-400">Camera Barcode + Catalog Lookup + Stock Check</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-full hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-5 space-y-4">
          {/* Mode Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-800 rounded-xl border border-slate-700 text-xs">
            <button
              onClick={() => { setScanMode('camera'); resetScanner(); }}
              className={`flex-1 py-1.5 rounded-lg font-semibold transition ${scanMode === 'camera' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-400 hover:text-white'}`}
            >
              📷 Camera Scan
            </button>
            <button
              onClick={() => { setScanMode('manual'); resetScanner(); }}
              className={`flex-1 py-1.5 rounded-lg font-semibold transition ${scanMode === 'manual' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-400 hover:text-white'}`}
            >
              ⌨️ Manual / Barcode
            </button>
          </div>

          {/* Camera Viewfinder */}
          {scanMode === 'camera' && !scannedProducts && (
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border-2 border-dashed border-blue-500/40 flex flex-col items-center justify-center shadow-inner">
              {/* Corner brackets */}
              {['top-3 left-3 border-t-2 border-l-2', 'top-3 right-3 border-t-2 border-r-2', 'bottom-3 left-3 border-b-2 border-l-2', 'bottom-3 right-3 border-b-2 border-r-2'].map((cls, i) => (
                <div key={i} className={`absolute w-6 h-6 border-blue-400 ${cls}`} />
              ))}
              {/* Scanning laser */}
              <div className="absolute left-4 right-4 h-0.5 bg-gradient-to-r from-rose-500 via-red-400 to-rose-500 shadow-[0_0_10px_#ef4444] animate-laser" />
              <Camera className="w-8 h-8 text-slate-600 opacity-40 animate-pulse" />
              <span className="text-xs font-mono text-slate-500 mt-2">Aim at barcode or QR code</span>
            </div>
          )}

          {/* Manual search form */}
          {scanMode === 'manual' && !scannedProducts && (
            <form onSubmit={handleManualSearch} className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300">Barcode Number or Product Name:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={barcodeInput}
                  onChange={e => setBarcodeInput(e.target.value)}
                  placeholder="e.g. 8806091234565 or 'iPhone 15'"
                  className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white font-mono placeholder-slate-500 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition"
                >
                  Search
                </button>
              </div>
            </form>
          )}

          {/* Scan Results */}
          {scannedProducts !== null && (
            <div className="space-y-3">
              {scannedProducts.length === 0 ? (
                <div className="text-center py-6 space-y-2">
                  <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center mx-auto text-rose-400">
                    <Package className="w-5 h-5" />
                  </div>
                  <p className="text-sm text-slate-300 font-medium">Product Not Found</p>
                  <p className="text-xs text-slate-500">No catalog match for that barcode or name.</p>
                </div>
              ) : (
                <>
                  <div className="text-[11px] uppercase font-bold tracking-wider text-slate-400 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    {scannedProducts.length} Product{scannedProducts.length > 1 ? 's' : ''} Found in Catalog
                  </div>

                  {scannedProducts.map(prod => {
                    const isLow = prod.stock > 0 && prod.stock <= 5;
                    const isOut = prod.stock <= 0;
                    const isAdded = addedIds.has(prod.id);

                    return (
                      <div
                        key={prod.id}
                        className={`p-4 rounded-2xl border transition ${isAdded ? 'bg-emerald-950/30 border-emerald-500/40' : 'bg-slate-800/80 border-slate-700'}`}
                      >
                        <div className="flex items-start gap-3">
                          <img src={prod.image} alt={prod.name} className="w-16 h-16 rounded-xl object-cover border border-slate-700 shrink-0" />
                          <div className="flex-1 min-w-0 space-y-1">
                            <div className="font-bold text-sm text-white leading-tight">{prod.name}</div>
                            <div className="text-xs text-slate-400">{prod.category}</div>

                            {/* Stock Badge */}
                            <div className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              isOut ? 'bg-rose-500/20 text-rose-300' : isLow ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${isOut ? 'bg-rose-400' : isLow ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                              {isOut ? 'Out of Stock' : isLow ? `Low Stock — ${prod.stock} units` : `In Stock — ${prod.stock} units`}
                            </div>

                            {/* Price & Barcode */}
                            <div className="flex items-center justify-between">
                              <span className="text-base font-black text-white font-mono">${prod.price.toFixed(2)}</span>
                              <span className="text-[10px] text-slate-500 font-mono">{prod.barcode}</span>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        {prod.description && (
                          <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">{prod.description}</p>
                        )}

                        {/* Cost & Margin info (for CEO-like awareness) */}
                        {prod.costPrice && (
                          <div className="mt-2 text-[10px] text-slate-500 font-mono flex items-center gap-3">
                            <span>Cost: ${prod.costPrice.toFixed(2)}</span>
                            <span className="text-emerald-400">Margin: {(((prod.price - prod.costPrice) / prod.price) * 100).toFixed(0)}%</span>
                          </div>
                        )}

                        {/* Add to Cart button */}
                        {!isOut && (
                          <button
                            onClick={() => handleAddToCart(prod)}
                            className={`mt-3 w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition ${
                              isAdded
                                ? 'bg-emerald-500 text-white cursor-default'
                                : 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-500/20'
                            }`}
                            disabled={isAdded}
                          >
                            {isAdded ? (
                              <><Check className="w-4 h-4" /> Added to Cart!</>
                            ) : (
                              <><ShoppingCart className="w-4 h-4" /> Add to Cart</>
                            )}
                          </button>
                        )}
                      </div>
                    );
                  })}
                </>
              )}

              {/* Scan another */}
              <button
                onClick={resetScanner}
                className="w-full py-2.5 rounded-2xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-2 transition"
              >
                <ScanBarcode className="w-3.5 h-3.5 text-blue-400" />
                Scan Another Product
              </button>
            </div>
          )}

          {/* Quick Scan Demo Shortcuts (always visible when not in result) */}
          {!scannedProducts && (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                Simulate Camera Scan — Click a product:
              </div>
              <div className="grid grid-cols-2 gap-2">
                {quickScanProducts.map(prod => {
                  const isLow = prod.stock > 0 && prod.stock <= 5;
                  const isOut = prod.stock <= 0;
                  return (
                    <button
                      key={prod.id}
                      onClick={() => handleScan(prod)}
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 hover:border-blue-500/50 text-left transition flex flex-col justify-between gap-1"
                    >
                      <div className="flex items-center gap-2">
                        <img src={prod.image} alt={prod.name} className="w-8 h-8 rounded-lg object-cover shrink-0" />
                        <span className="font-medium text-[11px] text-slate-200 line-clamp-2 leading-tight">{prod.name}</span>
                      </div>
                      <div className="flex items-center justify-between mt-1 text-[10px]">
                        <span className="text-blue-400 font-mono font-bold">${prod.price.toFixed(2)}</span>
                        <span className={`font-bold ${isOut ? 'text-rose-400' : isLow ? 'text-amber-400' : 'text-emerald-400'}`}>
                          {isOut ? '✗ Out' : isLow ? `⚠ ${prod.stock}` : `✓ ${prod.stock}`}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
