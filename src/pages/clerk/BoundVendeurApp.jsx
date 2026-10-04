import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Mic, Sparkles, AlertTriangle, ArrowRight, Check,
  Camera, ShoppingCart, RefreshCw, CheckCircle2, ChevronRight,
  TrendingUp, Radio
} from 'lucide-react';

export const BoundVendeurApp = () => {
  const navigate = useNavigate();
  const {
    currentRegion,
    formatMoney,
    isOffline,
    setIsOffline,
    theme,
    addToCart,
    playSoundEffect,
    addToast
  } = useApp();

  const R = currentRegion;

  // Screen states: 'home' | 'listen' | 'confirm' | 'pay' | 'receipt'
  const [screen, setScreen] = useState('home');
  const [spokenWordsIndex, setSpokenWordsIndex] = useState(0);
  const [detectedItem, setDetectedItem] = useState(null);
  const [selectedRail, setSelectedRail] = useState(R.rails[0].n);
  const [isFlagged, setIsFlagged] = useState(false);
  const [invoiceSentWa, setInvoiceSentWa] = useState(false);
  const [todayRevenue, setTodayRevenue] = useState(R.today);
  const [salesCount, setSalesCount] = useState(R.salesToday);

  // Home Quick Action: Start Voice Sale
  const handleStartVoice = () => {
    setScreen('listen');
    setSpokenWordsIndex(0);
    setDetectedItem(null);

    // Stream words like live speech
    let current = 0;
    const interval = setInterval(() => {
      current++;
      setSpokenWordsIndex(current);
      if (current >= R.words.length) {
        clearInterval(interval);
        setTimeout(() => {
          setDetectedItem({
            name: R.item,
            qty: R.qty,
            unitPrice: R.unitPrice,
            total: R.total,
            rail: R.rail
          });
          setScreen('confirm');
          playSoundEffect('add');
        }, 400);
      }
    }, 140);
  };

  const handleConfirmSale = () => {
    setScreen('pay');
  };

  const handleExecutePayment = (railName) => {
    setSelectedRail(railName);
    playSoundEffect('success');
    setTodayRevenue(prev => prev + R.total);
    setSalesCount(prev => prev + 1);
    setScreen('receipt');
  };

  const handleSendWa = () => {
    setInvoiceSentWa(true);
    addToast('WhatsApp Reçu Envoyé', `Le reçu a été envoyé au client avec succès.`, 'success');
  };

  return (
    <div className="flex flex-col h-full bg-[var(--bg)] text-[var(--fg)] relative select-none">
      {/* ── App Top Header ── */}
      <div className="px-4 py-3 bg-[var(--card)] border-b border-[rgba(var(--lineRGB),0.08)] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center font-display font-black text-sm text-[var(--onAcc)] shadow-md"
            style={{ background: 'var(--acc)' }}
          >
            {R.clerkInit}
          </div>
          <div className="min-w-0">
            <h2 className="text-xs font-bold truncate leading-tight">{R.store}</h2>
            <p className="text-[10px] text-[rgba(var(--fgRGB),0.55)] truncate">
              {R.area}, {R.city} · <span className="font-semibold text-[var(--acc)]">{R.clerk}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <span
            className="w-4 h-4 rounded-full shadow-inner inline-block shrink-0"
            style={{ background: R.flag }}
            title={R.country}
          />
        </div>
      </div>

      {/* ── Offline Banner ── */}
      {isOffline && (
        <div
          onClick={() => setIsOffline(false)}
          className="mx-4 mt-3 px-3 py-2 rounded-xl bg-[rgba(255,183,3,0.14)] border border-[rgba(255,183,3,0.35)] flex items-center justify-between text-xs cursor-pointer hover:bg-[rgba(255,183,3,0.2)] transition"
        >
          <div className="flex items-center gap-2 text-[var(--warn)]">
            <span className="w-2 h-2 rounded-full bg-[var(--warn)] animate-ping" />
            <span className="font-bold text-[11px]">Mode Hors Ligne Activé (SQLite)</span>
          </div>
          <span className="text-[10px] font-mono text-[var(--warnFg)] underline">Synchro Auto →</span>
        </div>
      )}

      {/* ════ SCREEN 1: HOME ════ */}
      {screen === 'home' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Revenue Hero Banner */}
          <div className="p-4 rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.08)] shadow-sm">
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[rgba(var(--fgRGB),0.5)] mb-1">
              <span>Aujourd'hui · {R.clerk}</span>
              <span className="text-[var(--acc2)] font-bold">● En ligne</span>
            </div>
            <div className="flex items-baseline justify-between">
              <div className="font-display font-black text-3xl tracking-tight">
                {formatMoney(todayRevenue)}
              </div>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[rgba(10,123,79,0.15)] text-[var(--acc2)]">
                {salesCount} ventes
              </span>
            </div>
          </div>

          {/* Large Voice Action Button (96px+ tactile target per BOUND OS spec) */}
          <button
            onClick={handleStartVoice}
            className="w-full h-28 rounded-2xl flex items-center gap-4 px-6 text-left shadow-lg transition active:scale-[0.98] group relative overflow-hidden"
            style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}
          >
            <div className="w-14 h-14 rounded-full bg-[rgba(var(--bgRGB),0.15)] flex items-center justify-center shrink-0 group-hover:scale-110 transition">
              <Mic className="w-7 h-7" />
            </div>
            <div>
              <span className="block font-display font-extrabold text-2xl tracking-tight leading-tight">
                VENDRE EN VOCAL
              </span>
              <span className="text-xs font-medium opacity-80">
                Parlez en {R.langs}
              </span>
            </div>
            <div className="absolute right-3 top-3 text-[10px] font-mono uppercase font-bold opacity-60">
              Deepgram · 120ms
            </div>
          </button>

          {/* Secondary Quick Action Tiles */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => navigate('/clerk/catalog')}
              className="p-3.5 rounded-2xl bg-[var(--raise)] border border-[rgba(var(--lineRGB),0.08)] text-left hover:border-[rgba(var(--lineRGB),0.2)] transition active:scale-95"
            >
              <Camera className="w-5 h-5 text-[var(--acc)] mb-2" />
              <div className="font-display font-bold text-sm">Scanner Rayon</div>
              <div className="text-[10px] text-[rgba(var(--fgRGB),0.55)]">OCR Document &amp; Stock</div>
            </button>

            <button
              onClick={() => handleStartVoice()}
              className="p-3.5 rounded-2xl bg-[var(--raise)] border border-[rgba(var(--lineRGB),0.08)] text-left hover:border-[rgba(var(--lineRGB),0.2)] transition active:scale-95"
            >
              <ShoppingCart className="w-5 h-5 text-[var(--acc2)] mb-2" />
              <div className="font-display font-bold text-sm">Paiement Mobile</div>
              <div className="text-[10px] text-[rgba(var(--fgRGB),0.55)]">{R.railShort}</div>
            </button>
          </div>

          {/* Recent Sales Stream */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[rgba(var(--fgRGB),0.45)] mb-2">
              <span>Ventes Récentes</span>
              <span>Aujourd'hui</span>
            </div>
            <div className="space-y-2">
              {R.sales.map((sale, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.07)] flex items-center justify-between"
                >
                  <div className="min-w-0 pr-2">
                    <div className="font-semibold text-xs truncate">{sale.item}</div>
                    <div className="text-[10px] text-[rgba(var(--fgRGB),0.5)]">
                      {sale.buyer.name} · <span className="font-bold text-[var(--acc)]">{sale.rail}</span> · {sale.time}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-display font-bold text-xs">{formatMoney(sale.amount)}</div>
                    <span className="text-[9px] font-mono text-[var(--acc2)]">✓ Payé</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ════ SCREEN 2: LIVE SPEECH STREAMING ════ */}
      {screen === 'listen' && (
        <div className="flex-1 flex flex-col p-6 items-center justify-between text-center animate-fadeUp">
          <div className="w-full text-left">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--acc)]">
              IA VOCALE EN DIRECT · {R.langs}
            </span>
          </div>

          {/* Waveform Visualizer */}
          <div className="relative my-8 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-[var(--accSoft)] animate-pulse flex items-center justify-center">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}
              >
                <Mic className="w-8 h-8 animate-bounce" />
              </div>
            </div>
          </div>

          {/* Live Transcript Bubble */}
          <div className="w-full p-4 rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.12)] min-h-[90px] flex flex-wrap gap-1.5 items-center justify-center text-sm font-medium">
            {R.words.slice(0, spokenWordsIndex).map((w, idx) => (
              <span key={idx} className="animate-fadeUp text-[var(--fg)]">
                {w}
              </span>
            ))}
            {spokenWordsIndex < R.words.length && (
              <span className="w-2 h-4 bg-[var(--acc)] animate-ping inline-block" />
            )}
          </div>

          <div className="text-xs text-[rgba(var(--fgRGB),0.55)]">
            Écoute active avec modèle Deepgram Nova-2 + Gemini 1.5 Flash
          </div>

          <button
            onClick={() => setScreen('home')}
            className="w-full py-3 rounded-xl bg-[var(--raise)] text-xs font-semibold text-[rgba(var(--fgRGB),0.7)] hover:text-[var(--fg)]"
          >
            Annuler
          </button>
        </div>
      )}

      {/* ════ SCREEN 3: CONFIRM EXTRACTED SALE ════ */}
      {screen === 'confirm' && detectedItem && (
        <div className="flex-1 p-5 flex flex-col justify-between animate-fadeUp overflow-y-auto">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--acc2)] mb-1 font-bold">
              ✓ INTENTION RECONNUE AVEC SUCCÈS
            </div>
            <h3 className="font-display font-black text-xl mb-4">Vente Détectée</h3>

            {/* Extracted Item Card */}
            <div className="p-4 rounded-2xl bg-[var(--card)] border-2 border-[var(--acc)] shadow-md space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[var(--acc)] uppercase font-bold">Article</span>
                  <div className="font-display font-bold text-base">{detectedItem.name}</div>
                  <div className="text-xs text-[rgba(var(--fgRGB),0.6)]">Quantité: {detectedItem.qty}</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-[rgba(var(--fgRGB),0.5)] uppercase">Total</span>
                  <div className="font-display font-black text-xl text-[var(--acc)]">
                    {formatMoney(detectedItem.total)}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[rgba(var(--lineRGB),0.08)] flex items-center justify-between text-xs">
                <span className="text-[rgba(var(--fgRGB),0.6)]">Moyen de règlement:</span>
                <span className="font-bold px-2 py-0.5 rounded-md bg-[rgba(29,200,255,0.15)] text-[#1DC8FF]">
                  {detectedItem.rail}
                </span>
              </div>
            </div>

            {/* Correction preview */}
            <div className="mt-3 p-3 rounded-xl bg-[rgba(255,183,3,0.1)] border border-[rgba(255,183,3,0.25)] text-[11px] text-[var(--warnFg)]">
              💡 L'IA a corrigé : <em>« {R.heard} »</em> → <strong className="text-[var(--fg)]">{R.real}</strong>
            </div>
          </div>

          <div className="space-y-2 pt-4">
            <button
              onClick={handleConfirmSale}
              className="w-full h-14 rounded-xl font-display font-bold text-sm tracking-wide shadow-lg flex items-center justify-center gap-2"
              style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}
            >
              ENCAISSER {formatMoney(detectedItem.total)} →
            </button>
            <button
              onClick={() => setScreen('home')}
              className="w-full py-2.5 text-xs text-[rgba(var(--fgRGB),0.6)] hover:underline text-center"
            >
              Recommencer la commande
            </button>
          </div>
        </div>
      )}

      {/* ════ SCREEN 4: PAYMENT RAILS ════ */}
      {screen === 'pay' && detectedItem && (
        <div className="flex-1 p-5 flex flex-col justify-between animate-fadeUp">
          <div>
            <div className="text-center mb-5">
              <span className="text-[10px] font-mono uppercase text-[rgba(var(--fgRGB),0.5)]">À Payer</span>
              <div className="font-display font-black text-3xl text-[var(--acc)]">
                {formatMoney(detectedItem.total)}
              </div>
              <p className="text-xs text-[rgba(var(--fgRGB),0.6)]">{detectedItem.name} ({detectedItem.qty})</p>
            </div>

            <div className="text-[11px] font-mono uppercase tracking-wider text-[rgba(var(--fgRGB),0.5)] mb-2">
              Choisir le rail de paiement :
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {R.rails.map((rail) => (
                <button
                  key={rail.n}
                  onClick={() => handleExecutePayment(rail.n)}
                  className="p-3.5 rounded-xl border border-[rgba(var(--lineRGB),0.12)] bg-[var(--card)] hover:border-[var(--acc)] text-left transition flex flex-col justify-between min-h-[78px]"
                >
                  <span
                    className="w-3 h-3 rounded-full mb-1"
                    style={{ background: rail.c }}
                  />
                  <div>
                    <div className="font-display font-bold text-sm">{rail.n}</div>
                    <div className="text-[10px] text-[rgba(var(--fgRGB),0.5)]">Push USSD Instantané</div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-4 p-3 rounded-xl bg-[var(--raise)] text-[11px] text-[rgba(var(--fgRGB),0.6)] text-center font-mono">
              {R.ussd}
            </div>
          </div>

          <button
            onClick={() => setScreen('home')}
            className="w-full py-3 rounded-xl bg-[var(--raise)] text-xs font-semibold"
          >
            ← Retour
          </button>
        </div>
      )}

      {/* ════ SCREEN 5: RECEIPT & WHATSAPP DISPATCH ════ */}
      {screen === 'receipt' && detectedItem && (
        <div className="flex-1 p-5 flex flex-col justify-between animate-fadeUp overflow-y-auto">
          {/* Printable Thermal Receipt Card */}
          <div className="p-5 rounded-2xl bg-[var(--paper)] text-[#171A1F] shadow-xl space-y-3 font-mono">
            <div className="text-center pb-2 border-b border-dashed border-slate-400">
              <h4 className="font-display font-black text-base">{R.store}</h4>
              <p className="text-[10px] text-slate-600">{R.area}, {R.city} · {R.phone}</p>
              <p className="text-[9px] text-slate-500">Reçu Officiel #{Math.floor(1000 + Math.random() * 9000)}</p>
            </div>

            <div className="py-2 border-b border-dashed border-slate-400 space-y-1 text-xs">
              <div className="flex justify-between font-bold">
                <span>{detectedItem.name}</span>
                <span>{formatMoney(detectedItem.total)}</span>
              </div>
              <div className="text-[10px] text-slate-600">{detectedItem.qty} × {formatMoney(detectedItem.unitPrice)}</div>
              <div className="text-[10px] text-emerald-700 font-bold">Payé via {selectedRail}</div>
            </div>

            <div className="flex justify-between items-baseline pt-1">
              <span className="text-xs uppercase font-bold">TOTAL PAYÉ</span>
              <span className="font-display font-black text-xl text-slate-900">{formatMoney(detectedItem.total)}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-2 pt-4">
            <button
              onClick={handleSendWa}
              className={`w-full h-12 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition ${
                invoiceSentWa
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#25D366] text-slate-950 shadow-md'
              }`}
            >
              {invoiceSentWa ? '✓ Reçu WhatsApp Envoyé !' : 'Envoyer Reçu par WhatsApp'}
            </button>

            <button
              onClick={() => {
                setScreen('home');
                setInvoiceSentWa(false);
              }}
              className="w-full h-12 rounded-xl bg-[var(--raise)] text-xs font-bold text-[var(--fg)]"
            >
              Nouvelle Vente
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
