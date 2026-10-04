import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Mic, Camera, ShoppingCart, CheckCircle2,
  LayoutDashboard, Bell, MessageSquare, User,
  Package, ChevronRight, Wifi, WifiOff, RefreshCw
} from 'lucide-react';

// ── i18n strings keyed by region lang ──────────────────────────────────────
const T = {
  en: {
    today: 'Today',
    online: '● Online',
    offline: '⚡ Offline Mode (SQLite)',
    syncAuto: 'Auto-Sync →',
    sales: 'sales',
    sellVoice: 'SELL BY VOICE',
    speakIn: 'Speak in',
    scanShelf: 'Scan Shelf',
    ocrDoc: 'OCR · Inventory Check',
    mobilePay: 'Mobile Payment',
    recentSales: 'Recent Sales',
    paid: '✓ Paid',
    listening: 'LIVE AI VOICE ·',
    aiModel: 'Listening with Deepgram Nova-2 + Gemini 1.5 Flash',
    cancel: 'Cancel',
    detected: 'INTENT RECOGNIZED',
    saleDetected: 'Sale Detected',
    item: 'Item',
    qty: 'Qty',
    total: 'Total',
    payment: 'Payment method:',
    aiCorrected: '💡 AI corrected:',
    collectPay: 'COLLECT PAYMENT',
    restartOrder: 'Restart order',
    toPay: 'Amount Due',
    chooseRail: 'Choose payment method:',
    ussd: '',
    back: '← Back',
    receipt: 'Receipt',
    sendWa: 'Send Receipt via WhatsApp',
    waSent: '✓ WhatsApp Receipt Sent!',
    newSale: 'New Sale',
    instapay: 'Instant USSD Push',
    dashboard: 'Home',
    notifications: 'Alerts',
    chat: 'Chat',
    profile: 'Profile',
  },
  fr: {
    today: "Aujourd'hui",
    online: '● En ligne',
    offline: '⚡ Mode Hors Ligne (SQLite)',
    syncAuto: 'Synchro Auto →',
    sales: 'ventes',
    sellVoice: 'VENDRE EN VOCAL',
    speakIn: 'Parlez en',
    scanShelf: 'Scanner Rayon',
    ocrDoc: 'OCR Document & Stock',
    mobilePay: 'Paiement Mobile',
    recentSales: 'Ventes Récentes',
    paid: '✓ Payé',
    listening: 'IA VOCALE EN DIRECT ·',
    aiModel: 'Écoute active avec Deepgram Nova-2 + Gemini 1.5 Flash',
    cancel: 'Annuler',
    detected: '✓ INTENTION RECONNUE',
    saleDetected: 'Vente Détectée',
    item: 'Article',
    qty: 'Quantité',
    total: 'Total',
    payment: 'Moyen de règlement:',
    aiCorrected: '💡 L\'IA a corrigé :',
    collectPay: 'ENCAISSER',
    restartOrder: 'Recommencer la commande',
    toPay: 'À Payer',
    chooseRail: 'Choisir le rail de paiement :',
    back: '← Retour',
    receipt: 'Reçu',
    sendWa: 'Envoyer Reçu par WhatsApp',
    waSent: '✓ Reçu WhatsApp Envoyé !',
    newSale: 'Nouvelle Vente',
    instapay: 'Push USSD Instantané',
    dashboard: 'Accueil',
    notifications: 'Alertes',
    chat: 'Chat',
    profile: 'Profil',
  },
  bn: {
    today: 'আজকের',
    online: '● অনলাইন',
    offline: '⚡ অফলাইন মোড (SQLite)',
    syncAuto: 'অটো-সিঙ্ক →',
    sales: 'বিক্রয়',
    sellVoice: 'ভয়েসে বিক্রি করুন',
    speakIn: 'বলুন',
    scanShelf: 'তাক স্ক্যান',
    ocrDoc: 'OCR · স্টক চেক',
    mobilePay: 'মোবাইল পেমেন্ট',
    recentSales: 'সাম্প্রতিক বিক্রয়',
    paid: '✓ পরিশোধিত',
    listening: 'লাইভ AI ভয়েস ·',
    aiModel: 'Deepgram Nova-2 + Gemini 1.5 Flash দিয়ে শুনছে',
    cancel: 'বাতিল',
    detected: '✓ উদ্দেশ্য শনাক্ত',
    saleDetected: 'বিক্রয় সনাক্ত',
    item: 'পণ্য',
    qty: 'পরিমাণ',
    total: 'মোট',
    payment: 'পেমেন্ট পদ্ধতি:',
    aiCorrected: '💡 AI সংশোধন করেছে:',
    collectPay: 'পেমেন্ট সংগ্রহ',
    restartOrder: 'অর্ডার পুনরায় শুরু করুন',
    toPay: 'পরিশোধযোগ্য',
    chooseRail: 'পেমেন্ট পদ্ধতি বেছে নিন:',
    back: '← ফিরে যান',
    receipt: 'রসিদ',
    sendWa: 'WhatsApp-এ রসিদ পাঠান',
    waSent: '✓ WhatsApp রসিদ পাঠানো হয়েছে!',
    newSale: 'নতুন বিক্রয়',
    instapay: 'তাৎক্ষণিক পেমেন্ট',
    dashboard: 'হোম',
    notifications: 'বিজ্ঞপ্তি',
    chat: 'চ্যাট',
    profile: 'প্রোফাইল',
  }
};

const getT = (lang) => T[lang] || T.en;

export const BoundVendeurApp = () => {
  const navigate = useNavigate();
  const {
    currentRegion,
    formatMoney,
    isOffline,
    setIsOffline,
    addToCart,
    playSoundEffect,
    addToast,
    language
  } = useApp();

  const R = currentRegion;
  const t = getT(R.lang);

  // Screen states: 'home' | 'listen' | 'confirm' | 'pay' | 'receipt'
  const [screen, setScreen] = useState('home');
  const [activeNav, setActiveNav] = useState('dashboard');
  const [spokenWordsIndex, setSpokenWordsIndex] = useState(0);
  const [detectedItem, setDetectedItem] = useState(null);
  const [selectedRail, setSelectedRail] = useState(R.rails[0].n);
  const [invoiceSentWa, setInvoiceSentWa] = useState(false);
  const [todayRevenue, setTodayRevenue] = useState(R.today);
  const [salesCount, setSalesCount] = useState(R.salesToday);
  const [notifCount] = useState(3);

  const handleStartVoice = () => {
    setScreen('listen');
    setSpokenWordsIndex(0);
    setDetectedItem(null);

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

  const handleExecutePayment = (railName) => {
    setSelectedRail(railName);
    playSoundEffect('success');
    setTodayRevenue(prev => prev + R.total);
    setSalesCount(prev => prev + 1);
    setScreen('receipt');
  };

  const handleSendWa = () => {
    setInvoiceSentWa(true);
    addToast('Receipt Sent', 'WhatsApp receipt delivered to customer.', 'success');
  };

  // Bottom nav items
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: t.dashboard },
    { id: 'notifications', icon: Bell, label: t.notifications, badge: notifCount },
    { id: 'chat', icon: MessageSquare, label: t.chat },
    { id: 'profile', icon: User, label: t.profile },
  ];

  // Notification panel
  const NotificationsPanel = () => (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      <div className="text-[11px] font-mono uppercase tracking-wider text-[rgba(var(--fgRGB),0.45)] mb-1">
        Alerts & Notifications
      </div>
      {[
        { icon: '📦', title: 'Low Stock Alert', msg: `${R.ocr[0]?.name} — only ${R.ocr[0]?.stock} units left`, time: '2m ago', color: 'var(--warn)' },
        { icon: '✅', title: 'Sale Approved', msg: `#TXN-8821 approved by Manager`, time: '14m ago', color: 'var(--ok)' },
        { icon: '🔄', title: 'Sync Complete', msg: '3 offline transactions uploaded', time: '1h ago', color: 'var(--acc2)' },
      ].map((n, i) => (
        <div key={i} className="p-3.5 rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.07)] flex gap-3">
          <div className="text-xl shrink-0">{n.icon}</div>
          <div className="min-w-0">
            <div className="font-semibold text-xs" style={{ color: n.color }}>{n.title}</div>
            <div className="text-[11px] text-[rgba(var(--fgRGB),0.65)] mt-0.5">{n.msg}</div>
            <div className="text-[10px] font-mono text-[rgba(var(--fgRGB),0.4)] mt-1">{n.time}</div>
          </div>
        </div>
      ))}
    </div>
  );

  // Chat panel
  const ChatPanel = () => (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      <div className="text-[11px] font-mono uppercase tracking-wider text-[rgba(var(--fgRGB),0.45)] mb-1">
        Team Chat
      </div>
      {[
        { from: 'Manager', msg: 'Please double-check the invoice for order #4421', time: '10:32', self: false },
        { from: 'You', msg: 'Done ✓ The client confirmed via WhatsApp', time: '10:35', self: true },
        { from: 'Manager', msg: `Restock ${R.ocr[0]?.name} before end of day`, time: '11:02', self: false },
      ].map((m, i) => (
        <div key={i} className={`flex ${m.self ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-[75%] p-3 rounded-2xl text-xs ${m.self
            ? 'rounded-br-sm text-[var(--onAcc)]'
            : 'bg-[var(--card)] border border-[rgba(var(--lineRGB),0.08)] text-[var(--fg)] rounded-bl-sm'
          }`} style={m.self ? { background: 'var(--acc)' } : {}}>
            {!m.self && <div className="font-bold text-[10px] text-[var(--acc)] mb-1">{m.from}</div>}
            <div>{m.msg}</div>
            <div className={`text-[9px] font-mono mt-1 ${m.self ? 'text-[rgba(0,0,0,0.4)]' : 'text-[rgba(var(--fgRGB),0.4)]'}`}>{m.time}</div>
          </div>
        </div>
      ))}
      <div className="pt-2 flex gap-2">
        <input
          className="flex-1 px-3 py-2 text-xs rounded-xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.1)] text-[var(--fg)] placeholder-[rgba(var(--fgRGB),0.4)] focus:outline-none focus:border-[var(--acc)]"
          placeholder="Type a message…"
        />
        <button className="px-3 py-2 rounded-xl text-xs font-bold" style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}>
          Send
        </button>
      </div>
    </div>
  );

  // Profile panel
  const ProfilePanel = () => (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      <div className="p-4 rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.08)] flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-display font-black text-xl text-[var(--onAcc)] shadow-lg"
          style={{ background: 'var(--acc)' }}>
          {R.clerkInit}
        </div>
        <div>
          <div className="font-display font-bold text-base">{R.clerk}</div>
          <div className="text-xs text-[rgba(var(--fgRGB),0.55)]">{R.store}</div>
          <div className="text-[11px] text-[var(--acc)] font-mono mt-0.5">Sales Clerk · {R.area}</div>
        </div>
      </div>
      {[
        { label: "Today's Sales", value: formatMoney(todayRevenue), accent: true },
        { label: 'Transactions', value: `${salesCount} orders` },
        { label: 'Phone', value: R.phone },
        { label: 'Region', value: `${R.city}, ${R.country}` },
        { label: 'Languages', value: R.langs },
        { label: 'Payment Rails', value: R.railShort },
      ].map((row, i) => (
        <div key={i} className="px-4 py-3 rounded-xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.07)] flex justify-between items-center text-xs">
          <span className="text-[rgba(var(--fgRGB),0.55)]">{row.label}</span>
          <span className={`font-bold ${row.accent ? 'text-[var(--acc)]' : ''}`}>{row.value}</span>
        </div>
      ))}
    </div>
  );

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
              {R.area} · <span className="font-semibold text-[var(--acc)]">{R.clerk}</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isOffline
            ? <WifiOff className="w-4 h-4 text-[var(--warn)]" />
            : <Wifi className="w-4 h-4 text-[var(--ok)]" />
          }
          <span className="w-4 h-4 rounded-full shadow-inner inline-block shrink-0" style={{ background: R.flag }} />
        </div>
      </div>

      {/* ── Offline Banner ── */}
      {isOffline && (
        <div
          onClick={() => setIsOffline(false)}
          className="mx-4 mt-2 px-3 py-2 rounded-xl bg-[rgba(255,183,3,0.14)] border border-[rgba(255,183,3,0.35)] flex items-center justify-between text-xs cursor-pointer"
        >
          <div className="flex items-center gap-2 text-[var(--warn)]">
            <span className="w-2 h-2 rounded-full bg-[var(--warn)] animate-ping" />
            <span className="font-bold text-[11px]">{t.offline}</span>
          </div>
          <span className="text-[10px] font-mono text-[var(--warnFg)] underline">{t.syncAuto}</span>
        </div>
      )}

      {/* ════ NOTIFICATION / CHAT / PROFILE PANELS ════ */}
      {activeNav === 'notifications' && <NotificationsPanel />}
      {activeNav === 'chat' && <ChatPanel />}
      {activeNav === 'profile' && <ProfilePanel />}

      {/* ════ MAIN DASHBOARD FLOW ════ */}
      {activeNav === 'dashboard' && (
        <>
          {/* SCREEN 1: HOME */}
          {screen === 'home' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Revenue Hero */}
              <div className="p-4 rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.08)] shadow-sm">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[rgba(var(--fgRGB),0.5)] mb-1">
                  <span>{t.today} · {R.clerk}</span>
                  <span className="text-[var(--ok)] font-bold">{isOffline ? '⚡ Offline' : t.online}</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <div className="font-display font-black text-3xl tracking-tight">
                    {formatMoney(todayRevenue)}
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[var(--accSoft)] text-[var(--acc)]">
                    {salesCount} {t.sales}
                  </span>
                </div>
              </div>

              {/* Voice Action Button */}
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
                    {t.sellVoice}
                  </span>
                  <span className="text-xs font-medium opacity-80">
                    {t.speakIn} {R.langs}
                  </span>
                </div>
                <div className="absolute right-3 top-3 text-[10px] font-mono uppercase font-bold opacity-60">
                  Deepgram · 120ms
                </div>
              </button>

              {/* Secondary Tiles */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => navigate('/clerk/catalog')}
                  className="p-3.5 rounded-2xl bg-[var(--raise)] border border-[rgba(var(--lineRGB),0.08)] text-left hover:border-[rgba(var(--lineRGB),0.2)] transition active:scale-95"
                >
                  <Camera className="w-5 h-5 text-[var(--acc)] mb-2" />
                  <div className="font-display font-bold text-sm">{t.scanShelf}</div>
                  <div className="text-[10px] text-[rgba(var(--fgRGB),0.55)]">{t.ocrDoc}</div>
                </button>

                <button
                  onClick={handleStartVoice}
                  className="p-3.5 rounded-2xl bg-[var(--raise)] border border-[rgba(var(--lineRGB),0.08)] text-left hover:border-[rgba(var(--lineRGB),0.2)] transition active:scale-95"
                >
                  <ShoppingCart className="w-5 h-5 text-[var(--acc2)] mb-2" />
                  <div className="font-display font-bold text-sm">{t.mobilePay}</div>
                  <div className="text-[10px] text-[rgba(var(--fgRGB),0.55)]">{R.railShort}</div>
                </button>
              </div>

              {/* Recent Sales */}
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[rgba(var(--fgRGB),0.45)] mb-2">
                  <span>{t.recentSales}</span>
                  <span>{t.today}</span>
                </div>
                <div className="space-y-2">
                  {R.sales.map((sale, i) => (
                    <div key={i} className="p-3 rounded-xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.07)] flex items-center justify-between">
                      <div className="min-w-0 pr-2">
                        <div className="font-semibold text-xs truncate">{sale.item}</div>
                        <div className="text-[10px] text-[rgba(var(--fgRGB),0.5)]">
                          {sale.buyer.name} · <span className="font-bold text-[var(--acc)]">{sale.rail}</span> · {sale.time}
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-display font-bold text-xs">{formatMoney(sale.amount)}</div>
                        <span className="text-[9px] font-mono text-[var(--ok)]">{t.paid}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 2: LISTEN */}
          {screen === 'listen' && (
            <div className="flex-1 flex flex-col p-6 items-center justify-between text-center">
              <div className="w-full text-left">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--acc)]">
                  {t.listening} {R.langs}
                </span>
              </div>

              <div className="relative my-8 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-[var(--accSoft)] animate-pulse flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg"
                    style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}>
                    <Mic className="w-8 h-8 animate-bounce" />
                  </div>
                </div>
              </div>

              <div className="w-full p-4 rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.12)] min-h-[90px] flex flex-wrap gap-1.5 items-center justify-center text-sm font-medium">
                {R.words.slice(0, spokenWordsIndex).map((w, idx) => (
                  <span key={idx} className="text-[var(--fg)]">{w}</span>
                ))}
                {spokenWordsIndex < R.words.length && (
                  <span className="w-2 h-4 bg-[var(--acc)] animate-ping inline-block" />
                )}
              </div>

              <div className="text-xs text-[rgba(var(--fgRGB),0.55)]">{t.aiModel}</div>

              <button
                onClick={() => setScreen('home')}
                className="w-full py-3 rounded-xl bg-[var(--raise)] text-xs font-semibold text-[rgba(var(--fgRGB),0.7)]"
              >
                {t.cancel}
              </button>
            </div>
          )}

          {/* SCREEN 3: CONFIRM */}
          {screen === 'confirm' && detectedItem && (
            <div className="flex-1 p-5 flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--ok)] mb-1 font-bold">
                  {t.detected}
                </div>
                <h3 className="font-display font-black text-xl mb-4">{t.saleDetected}</h3>

                <div className="p-4 rounded-2xl bg-[var(--card)] border-2 border-[var(--acc)] shadow-md space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-[var(--acc)] uppercase font-bold">{t.item}</span>
                      <div className="font-display font-bold text-base">{detectedItem.name}</div>
                      <div className="text-xs text-[rgba(var(--fgRGB),0.6)]">{t.qty}: {detectedItem.qty}</div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono text-[rgba(var(--fgRGB),0.5)] uppercase">{t.total}</span>
                      <div className="font-display font-black text-xl text-[var(--acc)]">
                        {formatMoney(detectedItem.total)}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[rgba(var(--lineRGB),0.08)] flex items-center justify-between text-xs">
                    <span className="text-[rgba(var(--fgRGB),0.6)]">{t.payment}</span>
                    <span className="font-bold px-2 py-0.5 rounded-md bg-[rgba(29,200,255,0.15)] text-[#1DC8FF]">
                      {detectedItem.rail}
                    </span>
                  </div>
                </div>

                <div className="mt-3 p-3 rounded-xl bg-[rgba(255,183,3,0.1)] border border-[rgba(255,183,3,0.25)] text-[11px] text-[var(--warnFg)]">
                  {t.aiCorrected} <em>«{R.heard}»</em> → <strong className="text-[var(--fg)]">{R.real}</strong>
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <button
                  onClick={() => setScreen('pay')}
                  className="w-full h-14 rounded-xl font-display font-bold text-sm tracking-wide shadow-lg flex items-center justify-center gap-2"
                  style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}
                >
                  {t.collectPay} {formatMoney(detectedItem.total)} →
                </button>
                <button
                  onClick={() => setScreen('home')}
                  className="w-full py-2.5 text-xs text-[rgba(var(--fgRGB),0.6)] hover:underline text-center"
                >
                  {t.restartOrder}
                </button>
              </div>
            </div>
          )}

          {/* SCREEN 4: PAY */}
          {screen === 'pay' && detectedItem && (
            <div className="flex-1 p-5 flex flex-col justify-between">
              <div>
                <div className="text-center mb-5">
                  <span className="text-[10px] font-mono uppercase text-[rgba(var(--fgRGB),0.5)]">{t.toPay}</span>
                  <div className="font-display font-black text-3xl text-[var(--acc)]">
                    {formatMoney(detectedItem.total)}
                  </div>
                  <p className="text-xs text-[rgba(var(--fgRGB),0.6)]">{detectedItem.name} ({detectedItem.qty})</p>
                </div>

                <div className="text-[11px] font-mono uppercase tracking-wider text-[rgba(var(--fgRGB),0.5)] mb-2">
                  {t.chooseRail}
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  {R.rails.map((rail) => (
                    <button
                      key={rail.n}
                      onClick={() => handleExecutePayment(rail.n)}
                      className="p-3.5 rounded-xl border border-[rgba(var(--lineRGB),0.12)] bg-[var(--card)] hover:border-[var(--acc)] text-left transition flex flex-col justify-between min-h-[78px]"
                    >
                      <span className="w-3 h-3 rounded-full mb-1" style={{ background: rail.c }} />
                      <div>
                        <div className="font-display font-bold text-sm">{rail.n}</div>
                        <div className="text-[10px] text-[rgba(var(--fgRGB),0.5)]">{t.instapay}</div>
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
                {t.back}
              </button>
            </div>
          )}

          {/* SCREEN 5: RECEIPT */}
          {screen === 'receipt' && detectedItem && (
            <div className="flex-1 p-5 flex flex-col justify-between overflow-y-auto">
              <div className="p-5 rounded-2xl bg-[var(--paper)] text-[#171A1F] shadow-xl space-y-3 font-mono">
                <div className="text-center pb-2 border-b border-dashed border-slate-400">
                  <h4 className="font-display font-black text-base">{R.store}</h4>
                  <p className="text-[10px] text-slate-600">{R.area}, {R.city} · {R.phone}</p>
                  <p className="text-[9px] text-slate-500">Receipt #{Math.floor(1000 + Math.random() * 9000)}</p>
                </div>

                <div className="py-2 border-b border-dashed border-slate-400 space-y-1 text-xs">
                  <div className="flex justify-between font-bold">
                    <span>{detectedItem.name}</span>
                    <span>{formatMoney(detectedItem.total)}</span>
                  </div>
                  <div className="text-[10px] text-slate-600">{detectedItem.qty} × {formatMoney(detectedItem.unitPrice)}</div>
                  <div className="text-[10px] text-emerald-700 font-bold">Paid via {selectedRail}</div>
                </div>

                <div className="flex justify-between items-baseline pt-1">
                  <span className="text-xs uppercase font-bold">TOTAL PAID</span>
                  <span className="font-display font-black text-xl text-slate-900">{formatMoney(detectedItem.total)}</span>
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <button
                  onClick={handleSendWa}
                  className={`w-full h-12 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition ${invoiceSentWa ? 'bg-emerald-600 text-white' : 'bg-[#25D366] text-slate-950 shadow-md'}`}
                >
                  {invoiceSentWa ? t.waSent : t.sendWa}
                </button>
                <button
                  onClick={() => { setScreen('home'); setInvoiceSentWa(false); }}
                  className="w-full h-12 rounded-xl bg-[var(--raise)] text-xs font-bold text-[var(--fg)]"
                >
                  {t.newSale}
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {/* ════ BOTTOM NAVIGATION ════ */}
      <div className="shrink-0 bg-[var(--card)] border-t border-[rgba(var(--lineRGB),0.09)] px-2 py-1.5 flex items-center justify-around z-30">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;
          return (
            <button
              key={item.id}
              onClick={() => { setActiveNav(item.id); setScreen('home'); }}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition relative ${isActive ? 'text-[var(--acc)]' : 'text-[rgba(var(--fgRGB),0.45)] hover:text-[rgba(var(--fgRGB),0.7)]'}`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white"
                    style={{ background: 'var(--acc)' }}>
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[9px] font-semibold">{item.label}</span>
              {isActive && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full" style={{ background: 'var(--acc)' }} />}
            </button>
          );
        })}
      </div>
    </div>
  );
};
