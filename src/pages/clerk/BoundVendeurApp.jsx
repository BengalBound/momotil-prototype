import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Mic, Camera, ShoppingCart, CheckCircle2,
  LayoutDashboard, Bell, MessageSquare, User,
  Package, ChevronRight, Wifi, WifiOff, RefreshCw,
  CheckSquare, Sparkles, Send, Paperclip, Clock,
  Search, ArrowRight, X, AlertTriangle, Play,
  Pause, RotateCcw, ScanLine, FileText, Image as ImageIcon
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
    scanShelf: 'AI Vision & Scan',
    ocrDoc: 'Photo · Invoice · Barcode',
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
    back: '← Back',
    receipt: 'Receipt',
    sendWa: 'Send Receipt via WhatsApp',
    waSent: '✓ WhatsApp Receipt Sent!',
    newSale: 'New Sale',
    instapay: 'Instant USSD Push',
    dashboard: 'Home',
    tasks: 'Tasks',
    inventory: 'Inventory',
    chat: 'Chat',
    profile: 'Profile',
    customerMatch: 'Match Customer Product / Photo',
    scanBarcode: 'Scan Barcode',
    scanProduct: 'Take Product Photo',
    scanInvoice: 'Take Invoice Photo',
    proposeUpdate: 'Propose Stock Update (Needs Approval)',
  },
  fr: {
    today: "Aujourd'hui",
    online: '● En ligne',
    offline: '⚡ Mode Hors Ligne (SQLite)',
    syncAuto: 'Synchro Auto →',
    sales: 'ventes',
    sellVoice: 'VENDRE EN VOCAL',
    speakIn: 'Parlez en',
    scanShelf: 'Vision IA & Scanner',
    ocrDoc: 'Photo · Facture · Code-barres',
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
    tasks: 'Tâches',
    inventory: 'Inventaire',
    chat: 'Chat',
    profile: 'Profil',
    customerMatch: 'Identifier Produit / Photo Client',
    scanBarcode: 'Scanner Code-barres',
    scanProduct: 'Photo Article',
    scanInvoice: 'Photo Facture',
    proposeUpdate: 'Proposer Mise à Jour Stock (Validation)',
  },
  bn: {
    today: 'আজকের',
    online: '● অনলাইন',
    offline: '⚡ অফলাইন মোড (SQLite)',
    syncAuto: 'অটো-সিঙ্ক →',
    sales: 'বিক্রয়',
    sellVoice: 'ভয়েসে বিক্রি করুন',
    speakIn: 'বলুন',
    scanShelf: 'AI ভিশন ও স্ক্যান',
    ocrDoc: 'ছবি · চালান · বারকোড',
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
    tasks: 'কাজসমূহ',
    inventory: 'ইনভেন্টরি',
    chat: 'চ্যাট',
    profile: 'প্রোফাইল',
    customerMatch: 'গ্রাহকের পণ্য / ছবি মেলান',
    scanBarcode: 'বারকোড স্ক্যান',
    scanProduct: 'পণ্যের ছবি নিন',
    scanInvoice: 'চালানের ছবি নিন',
    proposeUpdate: 'স্টক আপডেট প্রস্তাব (অনুমোদন লাগবে)',
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
    products,
    tasks,
    updateTaskStatus,
    inventoryRequests,
    submitInventoryRequest,
    chatMessages,
    sendChatMessage
  } = useApp();

  const R = currentRegion;
  const t = getT(R.lang);

  // Screen states: 'home' | 'listen' | 'confirm' | 'pay' | 'receipt'
  const [screen, setScreen] = useState('home');
  // Bottom nav tabs: 'dashboard' | 'tasks' | 'inventory' | 'chat' | 'profile'
  const [activeNav, setActiveNav] = useState('dashboard');
  const [spokenWordsIndex, setSpokenWordsIndex] = useState(0);
  const [detectedItem, setDetectedItem] = useState(null);
  const [selectedRail, setSelectedRail] = useState(R.rails[0].n);
  const [invoiceSentWa, setInvoiceSentWa] = useState(false);
  const [todayRevenue, setTodayRevenue] = useState(R.today);
  const [salesCount, setSalesCount] = useState(R.salesToday);

  // Modernized Vision & Scan Modal state
  const [showScanModal, setShowScanModal] = useState(false);
  const [scanMode, setScanMode] = useState(null); // 'customer_match' | 'product_photo' | 'invoice_photo' | 'barcode'
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [catalogSearch, setCatalogSearch] = useState('');

  // Propose Stock Update Modal state
  const [showProposeModal, setShowProposeModal] = useState(false);
  const [proposeProduct, setProposeProduct] = useState(null);
  const [proposeQty, setProposeQty] = useState('');
  const [proposeReason, setProposeReason] = useState('');

  // Chat Mode: 'team' | 'ai'
  const [chatMode, setChatMode] = useState('team');
  const [chatText, setChatText] = useState('');
  const [aiChatHistory, setAiChatHistory] = useState([
    {
      from: 'ai',
      text: `Hello! I'm your Bound OS Store AI Assistant. Ask me about product stock, shelf locations, prices, or store policies.`
    }
  ]);
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [audioSeconds, setAudioSeconds] = useState(0);

  // Clerk's assigned tasks
  const myTasks = tasks.filter(tsk => tsk.team === 'Team Alpha' || tsk.assignedTo.includes('Amara') || tsk.assignedTo === R.clerk);

  // ── Voice Sale Handlers ──────────────────────────────────────────────────
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

  // ── Modernized Vision & Scan Trigger ─────────────────────────────────────
  const triggerScanAction = (mode) => {
    setScanMode(mode);
    setIsScanning(true);
    setScanResult(null);

    setTimeout(() => {
      setIsScanning(false);
      if (mode === 'customer_match') {
        // Customer brought physical item or photo on phone
        setScanResult({
          type: 'customer_match',
          confidence: '98.4%',
          name: 'Bosch Premium Brake Pads (Set of 4)',
          sku: 'BRK-BSH-EN',
          inStock: true,
          stockQty: 14,
          shelfLocation: 'Shelf A-3 (Top Row)',
          price: 4500,
          image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=300&auto=format&fit=crop',
          description: 'High friction ceramic formulation. Exact OEM replacement for customer query.'
        });
      } else if (mode === 'barcode') {
        setScanResult({
          type: 'barcode',
          barcode: '8806091234561',
          name: 'Premium Oil Filter',
          sku: 'OIL-FLT-EN',
          inStock: true,
          stockQty: 24,
          shelfLocation: 'Shelf B-1',
          price: 1250,
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&auto=format&fit=crop'
        });
      } else if (mode === 'invoice_photo') {
        setScanResult({
          type: 'invoice_photo',
          supplier: 'SOGEA Automotive Dist.',
          invoiceNo: 'INV-8892',
          itemsDetected: 3,
          lineItems: [
            { name: 'Synthetic Oil 5L', qty: 10, unitCost: 18.50 },
            { name: 'Spark Plugs NGK', qty: 25, unitCost: 4.20 },
            { name: 'Brake Pads Bosch', qty: 8, unitCost: 28.00 }
          ]
        });
      } else {
        setScanResult({
          type: 'product_photo',
          name: 'NGK Platinum Spark Plugs',
          sku: 'NGK-PLT-04',
          inStock: true,
          stockQty: 42,
          shelfLocation: 'Drawer C-2',
          price: 1200,
          image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=300&auto=format&fit=crop'
        });
      }
      playSoundEffect('success');
    }, 1800);
  };

  // Handle Propose Stock Update
  const handleProposeSubmit = (e) => {
    e.preventDefault();
    if (!proposeQty || !proposeProduct) return;

    submitInventoryRequest({
      clerkName: R.clerk,
      team: 'Team Alpha',
      productName: proposeProduct.name,
      sku: proposeProduct.sku || 'SKU-001',
      currentStock: proposeProduct.stock,
      requestedStock: Number(proposeQty),
      reason: proposeReason.trim() || 'Physical audit discrepancy found by clerk.',
      image: proposeProduct.image
    });

    setShowProposeModal(false);
    setProposeProduct(null);
    setProposeQty('');
    setProposeReason('');
  };

  // ── AI Assistant Chat Handler ────────────────────────────────────────────
  const handleSendAiQuery = (queryText) => {
    const text = queryText || chatText;
    if (!text.trim()) return;

    setAiChatHistory(prev => [...prev, { from: 'user', text }]);
    setChatText('');

    setTimeout(() => {
      const lower = text.toLowerCase();
      let answer = '';
      if (lower.includes('bosch') || lower.includes('brake')) {
        answer = `✓ Yes! We have 14 units of Bosch Brake Pads in stock on Shelf A-3. Price is ${formatMoney(4500)}.`;
      } else if (lower.includes('oil') || lower.includes('filter')) {
        answer = `✓ We currently have 24 units of Premium Oil Filter in stock on Shelf B-1. Retail price is ${formatMoney(1250)}.`;
      } else if (lower.includes('discount') || lower.includes('limit')) {
        answer = `💡 Maximum clerk discount without manager authorization is 10%. Any sale over ${formatMoney(800)} or custom discount will automatically route to Manager Marc for 1-click approval.`;
      } else if (lower.includes('sold') || lower.includes('sales')) {
        answer = `📊 Great job! You have completed ${salesCount} sales today totaling ${formatMoney(todayRevenue)}. Your estimated commission today is ${formatMoney(todayRevenue * 0.035)}.`;
      } else {
        answer = `I checked our inventory database: item is recognized. You can take a photo of the product or barcode to auto-match availability.`;
      }
      setAiChatHistory(prev => [...prev, { from: 'ai', text: answer }]);
      playSoundEffect('success');
    }, 600);
  };

  // Send Team Chat
  const handleSendTeamChat = (e) => {
    if (e) e.preventDefault();
    if (!chatText.trim()) return;

    sendChatMessage({
      sender: R.clerk,
      role: 'Sales Clerk',
      team: 'Team Alpha',
      text: chatText.trim(),
      self: true
    });
    setChatText('');
  };

  // Voice Note Recording
  const handleVoiceNoteToggle = () => {
    if (!isRecordingAudio) {
      setIsRecordingAudio(true);
      setAudioSeconds(0);
      const timer = setInterval(() => setAudioSeconds(s => s + 1), 1000);
      setTimeout(() => {
        clearInterval(timer);
        setIsRecordingAudio(false);
        sendChatMessage({
          sender: R.clerk,
          role: 'Sales Clerk',
          team: 'Team Alpha',
          isVoice: true,
          audioDuration: '0:05',
          text: `🎙️ Voice Note (0:05): "Customer asking about availability of 5L synthetic oil."`,
          self: true
        });
      }, 3000);
    }
  };

  // Bottom navigation items
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: t.dashboard },
    { id: 'tasks', icon: CheckSquare, label: t.tasks, badge: myTasks.filter(t => t.status !== 'Completed').length },
    { id: 'inventory', icon: Package, label: t.inventory },
    { id: 'chat', icon: MessageSquare, label: t.chat },
    { id: 'profile', icon: User, label: t.profile },
  ];

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
              {R.area} · <span className="font-semibold text-[var(--acc)]">{R.clerk} (Team Alpha)</span>
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
          className="mx-4 mt-2 px-3 py-2 rounded-xl bg-[rgba(255,183,3,0.14)] border border-[rgba(255,183,3,0.35)] flex items-center justify-between text-xs cursor-pointer shrink-0"
        >
          <div className="flex items-center gap-2 text-[var(--warn)]">
            <span className="w-2 h-2 rounded-full bg-[var(--warn)] animate-ping" />
            <span className="font-bold text-[11px]">{t.offline}</span>
          </div>
          <span className="text-[10px] font-mono text-[var(--warnFg)] underline">{t.syncAuto}</span>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* ── MODAL: MODERN VISION & SCAN SYSTEM ── */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      {showScanModal && (
        <div className="absolute inset-0 bg-[rgba(var(--bgRGB),0.97)] z-50 flex flex-col p-4 overflow-y-auto">
          <div className="flex items-center justify-between pb-3 border-b border-[rgba(var(--lineRGB),0.1)]">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-[var(--acc)]" />
              <h3 className="font-display font-black text-sm">Bound OS Vision & Scanner</h3>
            </div>
            <button
              onClick={() => { setShowScanModal(false); setScanResult(null); setScanMode(null); }}
              className="text-xs p-1 text-[rgba(var(--fgRGB),0.5)] hover:text-[var(--fg)]"
            >
              ✕ Close
            </button>
          </div>

          {!scanMode && (
            <div className="space-y-3 pt-3">
              <div className="text-xs font-bold text-[rgba(var(--fgRGB),0.7)]">
                Choose Camera & Vision Ingestion Mode:
              </div>

              {/* 1. Customer Brought Product / Photo on Phone */}
              <button
                onClick={() => triggerScanAction('customer_match')}
                className="w-full p-4 rounded-2xl bg-gradient-to-r from-blue-600/15 via-[var(--card)] to-[var(--card)] border-2 border-[var(--acc)] text-left flex items-center gap-3.5 transition active:scale-[0.98]"
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}>
                  <Search className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-display font-black text-sm text-[var(--acc)]">
                    🔍 {t.customerMatch}
                  </div>
                  <div className="text-[11px] text-[rgba(var(--fgRGB),0.65)] mt-0.5">
                    Customer brought an item or photo on phone — AI checks if in stock & locates shelf
                  </div>
                </div>
              </button>

              {/* 2. Single Product Photo */}
              <button
                onClick={() => triggerScanAction('product_photo')}
                className="w-full p-3.5 rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.08)] hover:border-[var(--acc)] text-left flex items-center gap-3 transition"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--accSoft)' }}>
                  <ImageIcon className="w-5 h-5 text-[var(--acc)]" />
                </div>
                <div>
                  <div className="font-display font-bold text-xs">{t.scanProduct}</div>
                  <div className="text-[10px] text-[rgba(var(--fgRGB),0.5)]">Identify individual part specs, pricing & stock count</div>
                </div>
              </button>

              {/* 3. Barcode Viewfinder */}
              <button
                onClick={() => triggerScanAction('barcode')}
                className="w-full p-3.5 rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.08)] hover:border-[var(--acc)] text-left flex items-center gap-3 transition"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--accSoft)' }}>
                  <ScanLine className="w-5 h-5 text-[var(--acc)]" />
                </div>
                <div>
                  <div className="font-display font-bold text-xs">{t.scanBarcode}</div>
                  <div className="text-[10px] text-[rgba(var(--fgRGB),0.5)]">EAN-13, UPC & QR barcode scanner</div>
                </div>
              </button>

              {/* 4. Invoice Photo */}
              <button
                onClick={() => triggerScanAction('invoice_photo')}
                className="w-full p-3.5 rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.08)] hover:border-[var(--acc)] text-left flex items-center gap-3 transition"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--accSoft)' }}>
                  <FileText className="w-5 h-5 text-[var(--acc)]" />
                </div>
                <div>
                  <div className="font-display font-bold text-xs">{t.scanInvoice}</div>
                  <div className="text-[10px] text-[rgba(var(--fgRGB),0.5)]">Supplier invoice OCR line-item extraction</div>
                </div>
              </button>
            </div>
          )}

          {/* Scanning Simulation */}
          {scanMode && isScanning && (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center py-12">
              <div className="relative w-48 h-48 rounded-2xl overflow-hidden border-2 border-[var(--acc)] bg-black/40 flex items-center justify-center">
                <div className="absolute inset-x-0 h-1 bg-[var(--acc)] shadow-lg animate-bounce" />
                <Camera className="w-10 h-10 text-[var(--acc)] opacity-70" />
              </div>
              <div className="font-display font-bold text-sm">Gemini Vision Scanning…</div>
              <div className="text-xs text-[rgba(var(--fgRGB),0.55)] max-w-xs">
                Comparing customer visual features against local store inventory database…
              </div>
            </div>
          )}

          {/* Scan Results */}
          {scanMode && !isScanning && scanResult && (
            <div className="space-y-3 pt-3">
              {scanResult.type === 'customer_match' && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[var(--ok)] flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Match Found ({scanResult.confidence})</span>
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--ok)]/15 text-[var(--ok)] font-bold">
                      IN STOCK
                    </span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[var(--card)] border-2 border-[var(--acc)] space-y-3">
                    <img src={scanResult.image} alt={scanResult.name} className="w-full h-32 object-cover rounded-xl" />
                    <div>
                      <h4 className="font-display font-bold text-sm">{scanResult.name}</h4>
                      <p className="text-[11px] text-[rgba(var(--fgRGB),0.65)] mt-1">{scanResult.description}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-[var(--raise)]">
                        <span className="text-[10px] text-[rgba(var(--fgRGB),0.5)] block">Store Stock</span>
                        <span className="font-bold text-[var(--ok)]">{scanResult.stockQty} units available</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-[var(--raise)]">
                        <span className="text-[10px] text-[rgba(var(--fgRGB),0.5)] block">Retail Price</span>
                        <span className="font-bold text-[var(--acc)]">{formatMoney(scanResult.price)}</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 text-xs flex items-center gap-2">
                      <span>📍 Location:</span>
                      <strong>{scanResult.shelfLocation}</strong>
                    </div>

                    <button
                      onClick={() => {
                        addToCart({ name: scanResult.name, price: scanResult.price, id: 'matched-prod' });
                        setShowScanModal(false);
                        setScanResult(null);
                        setScanMode(null);
                        addToast('Added to Basket', `${scanResult.name} added to cart`, 'success');
                      }}
                      className="w-full py-3 rounded-xl font-bold text-xs shadow-md"
                      style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}
                    >
                      🛒 Add to Cart ({formatMoney(scanResult.price)})
                    </button>
                  </div>
                </div>
              )}

              {scanResult.type === 'barcode' && (
                <div className="p-4 rounded-2xl bg-[var(--card)] border-2 border-[var(--acc)] space-y-3 text-xs">
                  <div className="font-bold text-[var(--ok)]">✓ Barcode Decoded: {scanResult.barcode}</div>
                  <div className="font-display font-bold text-sm">{scanResult.name}</div>
                  <div className="flex justify-between">
                    <span>Stock: {scanResult.stockQty} units</span>
                    <span className="font-bold text-[var(--acc)]">{formatMoney(scanResult.price)}</span>
                  </div>
                  <button
                    onClick={() => {
                      addToCart({ name: scanResult.name, price: scanResult.price, id: 'barcode-prod' });
                      setShowScanModal(false);
                      setScanResult(null);
                      setScanMode(null);
                      addToast('Added to Cart', `${scanResult.name} added`, 'success');
                    }}
                    className="w-full py-2.5 rounded-xl font-bold"
                    style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}
                  >
                    Add to Cart
                  </button>
                </div>
              )}

              {scanResult.type === 'invoice_photo' && (
                <div className="p-4 rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.1)] space-y-3 text-xs">
                  <div className="font-bold text-sm">Invoice OCR: {scanResult.invoiceNo}</div>
                  <div className="text-[10px] text-[rgba(var(--fgRGB),0.55)]">Supplier: {scanResult.supplier}</div>
                  <div className="space-y-1.5 pt-1">
                    {scanResult.lineItems.map((li, idx) => (
                      <div key={idx} className="flex justify-between p-2 rounded-lg bg-[var(--raise)]">
                        <span>{li.name} (×{li.qty})</span>
                        <span className="font-mono">{formatMoney(li.unitCost * li.qty)}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      setShowScanModal(false);
                      setScanResult(null);
                      setScanMode(null);
                      addToast('Invoice Processed', 'Line items queued for manager stock verification', 'success');
                    }}
                    className="w-full py-2.5 rounded-xl font-bold bg-[var(--acc)] text-white"
                  >
                    Send to Manager for Ingestion
                  </button>
                </div>
              )}

              <button
                onClick={() => { setScanResult(null); setScanMode(null); }}
                className="w-full py-2 text-xs text-[rgba(var(--fgRGB),0.5)] text-center hover:underline"
              >
                Scan Another Item
              </button>
            </div>
          )}
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* ── MODAL: PROPOSE INVENTORY UPDATE ── */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      {showProposeModal && proposeProduct && (
        <div className="absolute inset-0 bg-[rgba(var(--bgRGB),0.97)] z-50 flex flex-col p-4 overflow-y-auto">
          <div className="flex items-center justify-between pb-3 border-b border-[rgba(var(--lineRGB),0.1)]">
            <h3 className="font-display font-bold text-sm">{t.proposeUpdate}</h3>
            <button
              onClick={() => { setShowProposeModal(false); setProposeProduct(null); }}
              className="text-xs p-1 text-[rgba(var(--fgRGB),0.5)] hover:text-[var(--fg)]"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleProposeSubmit} className="space-y-3 pt-3 text-xs">
            <div className="p-3 rounded-xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.08)]">
              <div className="font-bold">{proposeProduct.name}</div>
              <div className="text-[10px] text-[rgba(var(--fgRGB),0.55)]">Current Recorded Stock: {proposeProduct.stock} units</div>
            </div>

            <div>
              <label className="text-[11px] font-bold block mb-1">Actual Physical Count Found:</label>
              <input
                type="number"
                value={proposeQty}
                onChange={e => setProposeQty(e.target.value)}
                placeholder="e.g. 18"
                className="w-full px-3 py-2 text-xs rounded-xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.1)] text-[var(--fg)] focus:outline-none focus:border-[var(--acc)]"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-bold block mb-1">Reason for Adjustment:</label>
              <textarea
                value={proposeReason}
                onChange={e => setProposeReason(e.target.value)}
                rows={3}
                placeholder="e.g. Found 4 unboxed units in storage rack B / Box damaged during transport"
                className="w-full px-3 py-2 text-xs rounded-xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.1)] text-[var(--fg)] focus:outline-none focus:border-[var(--acc)]"
                required
              />
            </div>

            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 text-[11px]">
              ⚠️ This update will be sent to <strong>Manager Marc</strong> and <strong>Patron</strong> for verification before catalog stock changes.
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-xs"
              style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}
            >
              Submit for Manager Approval
            </button>
          </form>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* ── SCREEN 1: DASHBOARD / SELL ── */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      {activeNav === 'dashboard' && (
        <>
          {screen === 'home' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Revenue Hero */}
              <div className="p-4 rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.08)] shadow-sm">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[rgba(var(--fgRGB),0.5)] mb-1">
                  <span>{t.today} · {R.clerk} (Team Alpha)</span>
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

              {/* Big Voice Action Button */}
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

              {/* Secondary Camera & Payment Tiles */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setShowScanModal(true)}
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

              {/* Recent Sales List */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-[rgba(var(--fgRGB),0.5)] uppercase tracking-wider font-mono">
                  {t.recentSales}
                </div>
                {R.sales.map((sale, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.07)] flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold">{sale.item}</div>
                      <div className="text-[10px] text-[rgba(var(--fgRGB),0.5)] font-mono">
                        {sale.time} · {sale.rail} · {sale.buyer.name}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">{formatMoney(sale.amount)}</div>
                      <div className="text-[10px] text-[var(--ok)] font-mono">{t.paid}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SCREEN 2: VOICE LISTENING */}
          {screen === 'listen' && (
            <div className="flex-1 flex flex-col justify-between p-6 bg-[var(--bg)]">
              <div className="text-center pt-8 space-y-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--acc)] font-bold">
                  {t.listening} {R.langs}
                </span>
                <p className="text-xs text-[rgba(var(--fgRGB),0.6)]">{t.aiModel}</p>
              </div>

              <div className="flex flex-col items-center gap-6 my-auto">
                <div className="w-24 h-24 rounded-full flex items-center justify-center animate-pulse"
                  style={{ background: 'var(--accSoft)' }}>
                  <Mic className="w-12 h-12 text-[var(--acc)]" />
                </div>
                <div className="flex flex-wrap justify-center gap-2 max-w-xs text-center font-display font-bold text-lg min-h-[4rem]">
                  {R.words.slice(0, spokenWordsIndex).map((word, idx) => (
                    <span key={idx} className="animate-fadeUp text-[var(--fg)]">{word}</span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setScreen('home')}
                className="w-full py-3 rounded-xl bg-[var(--raise)] text-xs font-bold text-[rgba(var(--fgRGB),0.7)]"
              >
                {t.cancel}
              </button>
            </div>
          )}

          {/* SCREEN 3: ORDER CONFIRMATION */}
          {screen === 'confirm' && detectedItem && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="text-center pt-2">
                <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--ok)] font-bold">
                  {t.detected}
                </span>
                <h3 className="font-display font-black text-xl">{t.saleDetected}</h3>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.1)] space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-[rgba(var(--fgRGB),0.5)]">{t.item}</span>
                    <div className="font-display font-bold text-base">{detectedItem.name}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-mono text-[rgba(var(--fgRGB),0.5)]">{t.qty}</span>
                    <div className="font-bold text-base">{detectedItem.qty}</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-[rgba(var(--lineRGB),0.07)] flex justify-between items-baseline">
                  <span className="text-xs text-[rgba(var(--fgRGB),0.6)]">{t.total}</span>
                  <span className="font-display font-black text-2xl text-[var(--acc)]">
                    {formatMoney(detectedItem.total)}
                  </span>
                </div>

                <div className="text-[11px] text-[rgba(var(--fgRGB),0.6)]">
                  {t.payment} <strong className="text-[var(--fg)]">{detectedItem.rail}</strong>
                </div>

                {R.heard && (
                  <div className="text-[11px] p-2 rounded-xl bg-[var(--raise)] text-[rgba(var(--fgRGB),0.75)]">
                    {t.aiCorrected} « {R.heard} » → <strong>{R.real}</strong>
                  </div>
                )}
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => setScreen('pay')}
                  className="w-full h-12 rounded-xl font-display font-bold text-sm shadow-md"
                  style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}
                >
                  {t.collectPay}
                </button>
                <button
                  onClick={() => setScreen('home')}
                  className="w-full py-2.5 text-xs text-[rgba(var(--fgRGB),0.6)] text-center"
                >
                  {t.restartOrder}
                </button>
              </div>
            </div>
          )}

          {/* SCREEN 4: PAYMENT SELECTION */}
          {screen === 'pay' && detectedItem && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-[rgba(var(--fgRGB),0.5)]">{t.toPay}</span>
                <div className="font-display font-black text-3xl text-[var(--acc)]">
                  {formatMoney(detectedItem.total)}
                </div>
                <div className="text-xs text-[rgba(var(--fgRGB),0.6)] mt-1">{t.chooseRail}</div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {R.rails.map((rail, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleExecutePayment(rail.n)}
                    className="p-3.5 rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.08)] hover:border-[var(--acc)] text-left flex flex-col justify-between h-20 transition active:scale-95"
                  >
                    <span className="w-3 h-3 rounded-full" style={{ background: rail.c }} />
                    <span className="font-display font-bold text-xs">{rail.n}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setScreen('confirm')}
                className="w-full py-2.5 text-xs text-[rgba(var(--fgRGB),0.6)] text-center"
              >
                {t.back}
              </button>
            </div>
          )}

          {/* SCREEN 5: RECEIPT */}
          {screen === 'receipt' && detectedItem && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="text-center pt-2">
                <div className="w-12 h-12 rounded-full mx-auto flex items-center justify-center text-white mb-2"
                  style={{ background: 'var(--ok)' }}>
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--ok)] font-bold">
                  {t.paid}
                </span>
                <h3 className="font-display font-black text-xl">{t.receipt}</h3>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.09)] space-y-2 text-xs">
                <div className="flex justify-between font-mono text-[10px] text-[rgba(var(--fgRGB),0.5)]">
                  <span>{R.store}</span>
                  <span>#{Math.floor(1000 + Math.random() * 9000)}</span>
                </div>
                <div className="font-bold text-sm">{detectedItem.name}</div>
                <div className="flex justify-between text-[rgba(var(--fgRGB),0.6)]">
                  <span>{detectedItem.qty}</span>
                  <span>{formatMoney(detectedItem.total)}</span>
                </div>
                <div className="pt-2 border-t border-[rgba(var(--lineRGB),0.08)] flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-[var(--acc)]">{formatMoney(detectedItem.total)}</span>
                </div>
              </div>

              <div className="space-y-2 pt-2">
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

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* ── SCREEN 2: TASKS TAB ── */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      {activeNav === 'tasks' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <div className="flex justify-between items-center mb-1">
            <div>
              <h3 className="font-display font-bold text-sm">Assigned Tasks</h3>
              <p className="text-[10px] text-[rgba(var(--fgRGB),0.55)]">Directives from Manager Marc & Patron</p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--accSoft)] text-[var(--acc)] font-bold">
              {myTasks.filter(t => t.status !== 'Completed').length} Pending
            </span>
          </div>

          {myTasks.map(tsk => (
            <div key={tsk.id} className="p-3.5 rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.08)] space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-xs">{tsk.title}</h4>
                  <div className="text-[10px] text-[rgba(var(--fgRGB),0.5)]">Assigned by: {tsk.assignedBy}</div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                  tsk.status === 'Completed'
                    ? 'bg-emerald-500/20 text-emerald-500'
                    : 'bg-amber-500/20 text-amber-500'
                }`}>
                  {tsk.status}
                </span>
              </div>

              {tsk.description && (
                <p className="text-[11px] text-[rgba(var(--fgRGB),0.7)] bg-[var(--raise)] p-2 rounded-xl">
                  {tsk.description}
                </p>
              )}

              <div className="flex items-center justify-between text-[10px] pt-1">
                <span className="font-mono text-[rgba(var(--fgRGB),0.4)]">Due: {tsk.dueDate}</span>
                {tsk.status !== 'Completed' ? (
                  <button
                    onClick={() => updateTaskStatus(tsk.id, 'Completed')}
                    className="px-3 py-1 rounded-lg text-xs font-bold bg-[var(--ok)] text-white shadow-xs"
                  >
                    ✓ Mark Done
                  </button>
                ) : (
                  <span className="text-[var(--ok)] font-bold text-[10px]">✓ Done at {tsk.completedAt || '11:45'}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* ── SCREEN 3: INVENTORY & STOCK UPDATE TAB ── */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      {activeNav === 'inventory' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-display font-bold text-sm">Store Catalog & Stock</h3>
              <p className="text-[10px] text-[rgba(var(--fgRGB),0.55)]">Live stock with approval workflow</p>
            </div>
            <button
              onClick={() => setShowScanModal(true)}
              className="px-2.5 py-1 rounded-lg text-xs font-bold bg-[var(--acc)] text-white flex items-center gap-1 shadow-xs"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Vision Scan</span>
            </button>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[rgba(var(--fgRGB),0.4)]" />
            <input
              type="text"
              value={catalogSearch}
              onChange={e => setCatalogSearch(e.target.value)}
              placeholder="Search product name or SKU…"
              className="w-full pl-8 pr-3 py-2 text-xs rounded-xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.1)] text-[var(--fg)] focus:outline-none focus:border-[var(--acc)]"
            />
          </div>

          {/* Product Items List */}
          <div className="space-y-2">
            {products
              .filter(p => p.name.toLowerCase().includes(catalogSearch.toLowerCase()) || (p.sku && p.sku.toLowerCase().includes(catalogSearch.toLowerCase())))
              .slice(0, 10)
              .map(p => (
                <div key={p.id} className="p-3 rounded-xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.07)] flex items-center justify-between text-xs">
                  <div className="min-w-0 pr-2">
                    <div className="font-bold truncate">{p.name}</div>
                    <div className="text-[10px] font-mono text-[rgba(var(--fgRGB),0.5)]">
                      {p.sku || p.barcode || 'SKU-001'} · <strong className="text-[var(--acc)]">{formatMoney(p.price)}</strong>
                    </div>
                    <span className={`inline-block px-1.5 py-0.2 rounded-full text-[9px] font-bold mt-1 ${
                      p.stock > 10 ? 'bg-emerald-500/15 text-emerald-500' : 'bg-amber-500/15 text-amber-500'
                    }`}>
                      {p.stock} in stock
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 shrink-0">
                    <button
                      onClick={() => {
                        setProposeProduct(p);
                        setProposeQty(String(p.stock));
                        setShowProposeModal(true);
                      }}
                      className="px-2 py-1 rounded-lg text-[10px] font-bold bg-[var(--raise)] text-[var(--acc)] border border-[rgba(var(--lineRGB),0.1)] hover:bg-[var(--acc)] hover:text-white transition"
                    >
                      Update Stock
                    </button>
                    <button
                      onClick={() => {
                        addToCart(p);
                        addToast('Added', `${p.name} added to cart`, 'success');
                      }}
                      className="px-2 py-1 rounded-lg text-[10px] font-bold bg-[var(--acc)] text-white"
                    >
                      + Cart
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* ── SCREEN 4: CHAT (TEAM CHAT & AI ASSISTANT) ── */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      {activeNav === 'chat' && (
        <div className="flex-1 flex flex-col p-4 overflow-hidden bg-[var(--bg)]">
          {/* Mode Switcher */}
          <div className="flex p-1 rounded-xl bg-[var(--raise)] text-xs font-bold mb-2 shrink-0">
            <button
              onClick={() => setChatMode('team')}
              className={`flex-1 py-1.5 rounded-lg transition text-center ${chatMode === 'team' ? 'bg-[var(--card)] text-[var(--acc)] shadow-xs' : 'text-[rgba(var(--fgRGB),0.5)]'}`}
            >
              👥 Team Chat (Manager Marc)
            </button>
            <button
              onClick={() => setChatMode('ai')}
              className={`flex-1 py-1.5 rounded-lg transition text-center flex items-center justify-center gap-1 ${chatMode === 'ai' ? 'bg-[var(--card)] text-purple-400 shadow-xs' : 'text-[rgba(var(--fgRGB),0.5)]'}`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Assistant</span>
            </button>
          </div>

          {/* TEAM CHAT VIEW */}
          {chatMode === 'team' && (
            <>
              <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
                {chatMessages.map(m => (
                  <div key={m.id} className={`flex ${m.self ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl text-xs ${
                      m.self
                        ? 'rounded-br-sm text-[var(--onAcc)]'
                        : 'bg-[var(--card)] border border-[rgba(var(--lineRGB),0.08)] text-[var(--fg)] rounded-bl-sm'
                    }`} style={m.self ? { background: 'var(--acc)' } : {}}>
                      {!m.self && <div className="font-bold text-[10px] text-[var(--acc)] mb-0.5">{m.sender}</div>}
                      {m.image && (
                        <img src={m.image} alt="Attachment" className="w-full h-24 object-cover rounded-lg mb-1.5 border border-white/20" />
                      )}
                      <div>{m.text}</div>
                      <div className={`text-[9px] font-mono mt-1 ${m.self ? 'text-[rgba(0,0,0,0.4)]' : 'text-[rgba(var(--fgRGB),0.4)]'}`}>{m.time}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Chips */}
              <div className="flex gap-1.5 py-2 overflow-x-auto shrink-0 scrollbar-none">
                {['Need stock check 🔍', 'Customer waiting ⏱️', 'Cash drawer low 💵', 'Manager approval needed ⚠️'].map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => setChatText(chip)}
                    className="px-2.5 py-1 rounded-full text-[10px] bg-[var(--raise)] text-[rgba(var(--fgRGB),0.7)] whitespace-nowrap border border-[rgba(var(--lineRGB),0.07)]"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Input Bar with Camera & Voice */}
              <form onSubmit={handleSendTeamChat} className="pt-2 flex items-center gap-2 shrink-0 border-t border-[rgba(var(--lineRGB),0.08)]">
                <button
                  type="button"
                  onClick={() => {
                    sendChatMessage({
                      sender: R.clerk,
                      role: 'Sales Clerk',
                      team: 'Team Alpha',
                      text: '📷 Photo of customer product inquiry',
                      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&auto=format&fit=crop',
                      self: true
                    });
                    addToast('Photo Sent', 'Product image sent to manager', 'info');
                  }}
                  className="p-2 rounded-xl bg-[var(--raise)] text-[rgba(var(--fgRGB),0.7)] hover:text-[var(--acc)]"
                  title="Send Camera Photo"
                >
                  <Camera className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={handleVoiceNoteToggle}
                  className={`p-2 rounded-xl transition ${isRecordingAudio ? 'bg-rose-500 text-white animate-pulse' : 'bg-[var(--raise)] text-[rgba(var(--fgRGB),0.7)] hover:text-[var(--acc)]'}`}
                  title="Hold to Record Voice Note"
                >
                  <Mic className="w-4 h-4" />
                </button>

                <input
                  value={chatText}
                  onChange={e => setChatText(e.target.value)}
                  placeholder={isRecordingAudio ? `Recording voice note (${audioSeconds}s)…` : "Message manager…"}
                  className="flex-1 px-3 py-2 text-xs rounded-xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.1)] text-[var(--fg)] focus:outline-none focus:border-[var(--acc)]"
                />

                <button
                  type="submit"
                  className="p-2 rounded-xl text-xs font-bold"
                  style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          )}

          {/* AI ASSISTANT CHAT VIEW */}
          {chatMode === 'ai' && (
            <>
              <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
                {aiChatHistory.map((m, idx) => (
                  <div key={idx} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-3 rounded-2xl text-xs ${
                      m.from === 'user'
                        ? 'rounded-br-sm text-white bg-purple-600'
                        : 'bg-[var(--card)] border border-purple-500/20 text-[var(--fg)] rounded-bl-sm'
                    }`}>
                      {m.from === 'ai' && (
                        <div className="flex items-center gap-1 text-[10px] font-bold text-purple-400 mb-1">
                          <Sparkles className="w-3 h-3" />
                          <span>Bound OS Store AI</span>
                        </div>
                      )}
                      <div>{m.text}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Quick Query Chips */}
              <div className="flex gap-1.5 py-2 overflow-x-auto shrink-0 scrollbar-none">
                {[
                  'Do we have Bosch brake pads in stock?',
                  'What is our discount limit?',
                  'How much did I sell today?'
                ].map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendAiQuery(chip)}
                    className="px-2.5 py-1 rounded-full text-[10px] bg-purple-500/10 text-purple-300 border border-purple-500/20 whitespace-nowrap hover:bg-purple-500/20 transition"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* AI Query Input */}
              <form
                onSubmit={e => { e.preventDefault(); handleSendAiQuery(); }}
                className="pt-2 flex items-center gap-2 shrink-0 border-t border-[rgba(var(--lineRGB),0.08)]"
              >
                <input
                  value={chatText}
                  onChange={e => setChatText(e.target.value)}
                  placeholder="Ask AI about products, stock, or rules…"
                  className="flex-1 px-3 py-2 text-xs rounded-xl bg-[var(--card)] border border-purple-500/30 text-[var(--fg)] focus:outline-none focus:border-purple-400"
                />
                <button
                  type="submit"
                  className="p-2 rounded-xl text-xs font-bold bg-purple-600 text-white shadow-sm"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          )}
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* ── SCREEN 5: PROFILE TAB ── */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      {activeNav === 'profile' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <div className="p-4 rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.08)] flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center font-display font-black text-xl text-[var(--onAcc)] shadow-lg"
              style={{ background: 'var(--acc)' }}
            >
              {R.clerkInit}
            </div>
            <div>
              <div className="font-display font-bold text-base">{R.clerk}</div>
              <div className="text-xs text-[rgba(var(--fgRGB),0.55)]">{R.store}</div>
              <div className="text-[11px] text-[var(--acc)] font-mono mt-0.5">
                Team Alpha · Supervisor: Marc Traoré
              </div>
            </div>
          </div>

          {[
            { label: "Today's Personal Sales", value: formatMoney(todayRevenue), accent: true },
            { label: 'Commission Earned (3.5%)', value: formatMoney(todayRevenue * 0.035), accent: true },
            { label: 'Orders Completed', value: `${salesCount} transactions` },
            { label: 'Assigned Team', value: 'Team Alpha (Morning Shift)' },
            { label: 'Terminal Mode', value: 'Offline SQLite Capable' },
            { label: 'Languages Supported', value: R.langs }
          ].map((row, i) => (
            <div key={i} className="px-4 py-3 rounded-xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.07)] flex justify-between items-center text-xs">
              <span className="text-[rgba(var(--fgRGB),0.55)]">{row.label}</span>
              <span className={`font-bold ${row.accent ? 'text-[var(--acc)]' : ''}`}>{row.value}</span>
            </div>
          ))}
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* ── BOTTOM NAVIGATION BAR ── */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      <div className="shrink-0 bg-[var(--card)] border-t border-[rgba(var(--lineRGB),0.09)] px-2 py-1.5 flex items-center justify-around z-30">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;
          return (
            <button
              key={item.id}
              onClick={() => { setActiveNav(item.id); setScreen('home'); }}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition relative ${
                isActive ? 'text-[var(--acc)]' : 'text-[rgba(var(--fgRGB),0.45)] hover:text-[rgba(var(--fgRGB),0.7)]'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {item.badge > 0 && (
                  <span
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white"
                    style={{ background: 'var(--acc)' }}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[9px] font-semibold">{item.label}</span>
              {isActive && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full" style={{ background: 'var(--acc)' }} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
