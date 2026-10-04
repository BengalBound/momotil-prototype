import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  CheckCircle2, XCircle, Send,
  LayoutDashboard, Bell, MessageSquare, User,
  Package, TrendingUp, Camera, Plus, Sparkles,
  AlertTriangle, BarChart3, RefreshCw
} from 'lucide-react';

// ── i18n strings ────────────────────────────────────────────────────────────
const T = {
  en: {
    manager: 'Manager', patron: 'Owner',
    dash: 'Dashboard', approvals: 'Approvals', team: 'Team', pricing: 'Pricing', inventory: 'Inventory',
    todaySales: "Today's Sales", toApprove: 'Pending', clerks: 'Clerks',
    dayOpen: 'OPEN', dayClosed: 'CLOSED',
    closeDay: 'CLOSE THE DAY', openDay: 'REOPEN REGISTER',
    registerStatus: 'Register Status',
    fieldTasks: 'Field Tasks', assignTo: 'Assign task to',
    taskStatus: 'Status', send: 'Send',
    pendingApprovals: 'Pending Approvals',
    noPending: 'No pending approvals. All clear.',
    approve: 'Approve', reject: 'Reject',
    permMatrix: 'Permission Matrix (RBAC):',
    view: 'View', validate: 'Approve', price: 'Price', teamPerm: 'Team', exportPerm: 'Export',
    margins: 'Prices & Margins (Owner)',
    stock: 'Stock', cost: 'Cost', margin: 'Margin',
    addInventory: 'Add Inventory',
    addManual: 'Manual Entry', addPhoto: 'Photo (1 item)', addShelf: 'Shelf Scan', addInvoice: 'Invoice OCR',
    aiPowered: 'AI auto-fills name, description & image from the web',
    lowStockAlert: 'Low Stock Alert',
    reorderRequest: 'AI Reorder Request',
    weeklyReport: 'Weekly AI Report',
    dashboard: 'Home', notifications: 'Alerts', chat: 'Chat', profile: 'Profile',
  },
  fr: {
    manager: 'Manager', patron: 'Patron',
    dash: 'Tableau de bord', approvals: 'Approbations', team: 'Équipe', pricing: 'Prix', inventory: 'Inventaire',
    todaySales: 'Ventes Jour', toApprove: 'À Valider', clerks: 'Vendeurs',
    dayOpen: 'OUVERT', dayClosed: 'CLÔTURÉ',
    closeDay: 'CLÔTURER LA JOURNÉE', openDay: 'RÉOUVRIR LA CAISSE',
    registerStatus: 'Statut de la Caisse',
    fieldTasks: 'Tâches Terrain', assignTo: 'Assigner une tâche à',
    send: 'Envoyer',
    pendingApprovals: 'Ventes en Attente',
    noPending: 'Aucune vente en attente. Tout traité.',
    approve: 'Approuver', reject: 'Rejeter',
    permMatrix: 'Matrice de Permissions (RBAC) :',
    view: 'Voir', validate: 'Valider', price: 'Prix', teamPerm: 'Équipe', exportPerm: 'Export',
    margins: 'Prix & Marges (Patron)',
    stock: 'Stock', cost: 'Coût', margin: 'Marge',
    addInventory: 'Ajouter Inventaire',
    addManual: 'Saisie Manuelle', addPhoto: 'Photo (1 article)', addShelf: 'Scan Rayon', addInvoice: 'OCR Facture',
    aiPowered: "L'IA complète automatiquement nom, description & image depuis internet",
    lowStockAlert: 'Alerte Stock Faible',
    reorderRequest: 'Réapprovisionnement IA',
    weeklyReport: 'Rapport Hebdo IA',
    dashboard: 'Accueil', notifications: 'Alertes', chat: 'Chat', profile: 'Profil',
  },
  bn: {
    manager: 'ম্যানেজার', patron: 'মালিক',
    dash: 'ড্যাশবোর্ড', approvals: 'অনুমোদন', team: 'টিম', pricing: 'মূল্য', inventory: 'ইনভেন্টরি',
    todaySales: 'আজকের বিক্রয়', toApprove: 'অপেক্ষমাণ', clerks: 'কর্মীরা',
    dayOpen: 'খোলা', dayClosed: 'বন্ধ',
    closeDay: 'দিন বন্ধ করুন', openDay: 'রেজিস্টার পুনরায় খুলুন',
    registerStatus: 'রেজিস্টার স্ট্যাটাস',
    fieldTasks: 'মাঠের কাজ', assignTo: 'কাজ দিন',
    send: 'পাঠান',
    pendingApprovals: 'অনুমোদনের অপেক্ষায়',
    noPending: 'কোনো অনুমোদন নেই। সব পরিষ্কার।',
    approve: 'অনুমোদন', reject: 'প্রত্যাখ্যান',
    permMatrix: 'অনুমতি ম্যাট্রিক্স:',
    view: 'দেখুন', validate: 'অনুমোদন', price: 'মূল্য', teamPerm: 'টিম', exportPerm: 'রপ্তানি',
    margins: 'মূল্য ও মার্জিন',
    stock: 'স্টক', cost: 'খরচ', margin: 'মার্জিন',
    addInventory: 'ইনভেন্টরি যোগ করুন',
    addManual: 'ম্যানুয়াল এন্ট্রি', addPhoto: 'ছবি (১ পণ্য)', addShelf: 'তাক স্ক্যান', addInvoice: 'ইনভয়েস OCR',
    aiPowered: 'AI স্বয়ংক্রিয়ভাবে ইন্টারনেট থেকে নাম, বিবরণ ও ছবি যোগ করে',
    lowStockAlert: 'কম স্টক সতর্কতা',
    reorderRequest: 'AI পুনরায় অর্ডার অনুরোধ',
    weeklyReport: 'সাপ্তাহিক AI রিপোর্ট',
    dashboard: 'হোম', notifications: 'বিজ্ঞপ্তি', chat: 'চ্যাট', profile: 'প্রোফাইল',
  }
};

const getT = (lang) => T[lang] || T.en;

export const BoundManagerPatronApp = () => {
  const {
    currentRegion,
    formatMoney,
    transactions,
    clerks,
    products,
    approveTransaction,
    rejectTransaction,
    updateClerkPermissions,
    addToast,
    playSoundEffect,
    addProduct,
    restockProduct
  } = useApp();

  const R = currentRegion;
  const t = getT(R.lang);

  const [activeRole, setActiveRole] = useState('manager');
  const [selectedTab, setSelectedTab] = useState('dash');
  const [activeNav, setActiveNav] = useState('dashboard');
  const [dayClosed, setDayClosed] = useState(false);
  const [assignedTaskText, setAssignedTaskText] = useState('');
  const [tasks, setTasks] = useState([
    { id: 1, text: `Count ${R.ocr[0]?.name} stock before 5pm`, status: 'In Progress', to: R.clerk },
    { id: 2, text: `Verify invoice #${Math.floor(1000 + Math.random() * 9000)} with client`, status: 'To Do', to: R.clerk }
  ]);
  const [showInventoryModal, setShowInventoryModal] = useState(false);
  const [inventoryMode, setInventoryMode] = useState(null); // 'manual' | 'photo' | 'shelf' | 'invoice'
  const [aiProcessing, setAiProcessing] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  const pendingApprovals = transactions.filter(t => t.status === 'Pending');
  const notifCount = pendingApprovals.length + 2;

  const handleToggleDayClose = () => {
    setDayClosed(!dayClosed);
    playSoundEffect('add');
    addToast(
      dayClosed ? 'Register Reopened' : 'Day Closed',
      dayClosed ? 'Sales can continue.' : 'Register closed and report sent to owner.',
      'info'
    );
  };

  const handleAssignTask = (e) => {
    e.preventDefault();
    if (!assignedTaskText.trim()) return;
    setTasks(prev => [
      { id: Date.now(), text: assignedTaskText.trim(), status: 'To Do', to: R.clerk },
      ...prev
    ]);
    setAssignedTaskText('');
    playSoundEffect('success');
    addToast('Task Assigned', `Sent to ${R.clerk} successfully.`, 'success');
  };

  const handleAiInventory = (mode) => {
    setInventoryMode(mode);
    setAiProcessing(true);
    setAiResult(null);
    setTimeout(() => {
      setAiProcessing(false);
      setAiResult({
        name: R.ocr[0]?.name || 'Auto-detected Product',
        sku: R.ocr[0]?.sku || 'SKU-AUTO-001',
        stock: R.ocr[0]?.stock || 12,
        price: R.ocr[0]?.price || 2500,
        description: 'Premium quality auto part. AI-verified description from manufacturer database.',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&auto=format&fit=crop'
      });
    }, 2200);
  };

  const confirmAiProduct = () => {
    if (aiResult) {
      addProduct({ name: aiResult.name, price: aiResult.price, stock: aiResult.stock, category: 'Auto Parts', sku: aiResult.sku, barcode: '' });
      setShowInventoryModal(false);
      setAiResult(null);
      setInventoryMode(null);
    }
  };

  // ── Bottom nav items ────────────────────────────────────────────────────
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: t.dashboard },
    { id: 'notifications', icon: Bell, label: t.notifications, badge: notifCount },
    { id: 'chat', icon: MessageSquare, label: t.chat },
    { id: 'profile', icon: User, label: t.profile },
  ];

  // ── Notification panel ──────────────────────────────────────────────────
  const NotificationsPanel = () => (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      <div className="text-[11px] font-mono uppercase tracking-wider text-[rgba(var(--fgRGB),0.45)] mb-1">
        {t.notifications}
      </div>
      {[
        { icon: '📦', title: t.lowStockAlert, msg: `${R.ocr[0]?.name} — ${R.ocr[0]?.stock} units left. Reorder?`, time: '5m ago', color: 'var(--warn)', action: true },
        { icon: '🤖', title: t.reorderRequest, msg: `AI suggests reordering 20× ${R.ocr[1]?.name || 'Air Filter'}`, time: '1h ago', color: 'var(--acc)', action: true },
        { icon: '📊', title: t.weeklyReport, msg: 'Your weekly analytics report is ready. Revenue up 12%.', time: '2h ago', color: 'var(--acc2)', action: false },
        { icon: '✅', title: 'Transaction Alert', msg: `${pendingApprovals.length} sales awaiting your approval`, time: '10m ago', color: 'var(--bad)', action: true },
      ].map((n, i) => (
        <div key={i} className="p-3.5 rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.07)]">
          <div className="flex gap-3 items-start">
            <div className="text-xl shrink-0">{n.icon}</div>
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-xs" style={{ color: n.color }}>{n.title}</div>
              <div className="text-[11px] text-[rgba(var(--fgRGB),0.65)] mt-0.5">{n.msg}</div>
              <div className="text-[10px] font-mono text-[rgba(var(--fgRGB),0.4)] mt-1">{n.time}</div>
            </div>
          </div>
          {n.action && (
            <div className="flex gap-2 mt-2">
              <button className="flex-1 py-1.5 rounded-lg text-[10px] font-bold" style={{ background: 'var(--accSoft)', color: 'var(--acc)' }}>
                {t.approve}
              </button>
              <button className="flex-1 py-1.5 rounded-lg text-[10px] font-bold bg-[var(--raise)] text-[rgba(var(--fgRGB),0.6)]">
                Dismiss
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  // ── Chat panel ──────────────────────────────────────────────────────────
  const ChatPanel = () => (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      <div className="text-[11px] font-mono uppercase tracking-wider text-[rgba(var(--fgRGB),0.45)] mb-1">{t.chat}</div>
      {[
        { from: R.clerk, msg: `Customer wants to pay the ${formatMoney(R.total)} order in installments. What should I do?`, time: '10:31', self: false },
        { from: 'You', msg: 'Tell them cash only for amounts over that. Approve the order then call me.', time: '10:33', self: true },
        { from: R.clerk, msg: 'Done ✓ Customer paid via ' + R.rail, time: '10:47', self: false },
      ].map((m, i) => (
        <div key={i} className={`flex ${m.self ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-[75%] p-3 rounded-2xl text-xs ${m.self ? 'rounded-br-sm text-[var(--onAcc)]' : 'bg-[var(--card)] border border-[rgba(var(--lineRGB),0.08)] text-[var(--fg)] rounded-bl-sm'}`}
            style={m.self ? { background: 'var(--acc)' } : {}}>
            {!m.self && <div className="font-bold text-[10px] text-[var(--acc)] mb-1">{m.from}</div>}
            <div>{m.msg}</div>
            <div className={`text-[9px] font-mono mt-1 ${m.self ? 'text-[rgba(0,0,0,0.4)]' : 'text-[rgba(var(--fgRGB),0.4)]'}`}>{m.time}</div>
          </div>
        </div>
      ))}
      <div className="pt-2 flex gap-2">
        <input className="flex-1 px-3 py-2 text-xs rounded-xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.1)] text-[var(--fg)] placeholder-[rgba(var(--fgRGB),0.4)] focus:outline-none focus:border-[var(--acc)]"
          placeholder="Message…" />
        <button className="px-3 py-2 rounded-xl text-xs font-bold" style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}>
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );

  // ── Profile panel ───────────────────────────────────────────────────────
  const ProfilePanel = () => (
    <div className="flex-1 overflow-y-auto p-4 space-y-3">
      <div className="p-4 rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.08)] flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center font-display font-black text-xl text-[var(--onAcc)] shadow-lg"
          style={{ background: 'var(--acc)' }}>
          {R.owner?.split(' ').map(w => w[0]).join('').slice(0, 2)}
        </div>
        <div>
          <div className="font-display font-bold text-base">{R.owner}</div>
          <div className="text-xs text-[rgba(var(--fgRGB),0.55)]">{R.store}</div>
          <div className="text-[11px] text-[var(--acc)] font-mono mt-0.5">
            {activeRole === 'patron' ? 'Owner' : 'Manager'} · {R.city}
          </div>
        </div>
      </div>
      {[
        { label: "Today's Revenue", value: formatMoney(R.today), accent: true },
        { label: 'Active Clerks', value: `${clerks.filter(c => c.status === 'Active').length} staff` },
        { label: 'Pending Approvals', value: `${pendingApprovals.length} orders` },
        { label: 'Region', value: `${R.city}, ${R.country}` },
        { label: 'Payment Rails', value: R.railShort },
        { label: 'Languages', value: R.langs },
      ].map((row, i) => (
        <div key={i} className="px-4 py-3 rounded-xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.07)] flex justify-between items-center text-xs">
          <span className="text-[rgba(var(--fgRGB),0.55)]">{row.label}</span>
          <span className={`font-bold ${row.accent ? 'text-[var(--acc)]' : ''}`}>{row.value}</span>
        </div>
      ))}
    </div>
  );

  // ── Inventory Add Modal ─────────────────────────────────────────────────
  const InventoryModal = () => (
    <div className="absolute inset-0 bg-[rgba(var(--bgRGB),0.95)] z-50 flex flex-col p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-black text-base">{t.addInventory}</h3>
        <button onClick={() => { setShowInventoryModal(false); setAiResult(null); setInventoryMode(null); }}
          className="text-[rgba(var(--fgRGB),0.5)] text-xs hover:text-[var(--fg)]">✕ Close</button>
      </div>

      {!inventoryMode && (
        <div className="space-y-3">
          <p className="text-xs text-[rgba(var(--fgRGB),0.55)] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[var(--acc)]" /> {t.aiPowered}
          </p>
          {[
            { id: 'manual', icon: Plus, label: t.addManual, desc: 'Type name, price, and stock manually' },
            { id: 'photo', icon: Camera, label: t.addPhoto, desc: 'Take a photo — AI identifies product & adds details' },
            { id: 'shelf', icon: Camera, label: t.addShelf, desc: 'Scan 5–10 visible products at once from a shelf photo' },
            { id: 'invoice', icon: Package, label: t.addInvoice, desc: 'Photograph supplier invoice — AI extracts all items & quantities' },
          ].map(opt => {
            const Icon = opt.icon;
            return (
              <button key={opt.id} onClick={() => handleAiInventory(opt.id)}
                className="w-full p-4 rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.08)] hover:border-[var(--acc)] text-left flex items-center gap-3 transition">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--accSoft)' }}>
                  <Icon className="w-5 h-5 text-[var(--acc)]" />
                </div>
                <div>
                  <div className="font-display font-bold text-sm">{opt.label}</div>
                  <div className="text-[10px] text-[rgba(var(--fgRGB),0.5)]">{opt.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {inventoryMode && aiProcessing && (
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: 'var(--accSoft)' }}>
            <Sparkles className="w-8 h-8 text-[var(--acc)] animate-pulse" />
          </div>
          <div className="font-display font-bold text-base">AI Processing…</div>
          <div className="text-xs text-[rgba(var(--fgRGB),0.55)]">
            {inventoryMode === 'photo' && 'Identifying product from photo…'}
            {inventoryMode === 'shelf' && 'Detecting multiple products on shelf…'}
            {inventoryMode === 'invoice' && 'Extracting items from invoice…'}
            {inventoryMode === 'manual' && 'Looking up product details…'}
          </div>
          <div className="text-[10px] font-mono text-[var(--acc)]">Gemini Vision · Google Search API</div>
        </div>
      )}

      {inventoryMode && !aiProcessing && aiResult && (
        <div className="space-y-3">
          <div className="text-[10px] font-mono uppercase text-[var(--ok)] font-bold">✓ AI DETECTED</div>
          <div className="p-4 rounded-2xl bg-[var(--card)] border-2 border-[var(--acc)] space-y-3">
            <img src={aiResult.image} alt={aiResult.name}
              className="w-full h-28 object-cover rounded-xl border border-[rgba(var(--lineRGB),0.08)]" />
            <div className="font-display font-bold text-base">{aiResult.name}</div>
            <div className="text-xs text-[rgba(var(--fgRGB),0.6)]">{aiResult.description}</div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-lg bg-[var(--raise)]">
                <div className="font-bold text-[var(--acc)]">{formatMoney(aiResult.price)}</div>
                <div className="text-[9px] text-[rgba(var(--fgRGB),0.5)]">Price</div>
              </div>
              <div className="p-2 rounded-lg bg-[var(--raise)]">
                <div className="font-bold">{aiResult.stock}</div>
                <div className="text-[9px] text-[rgba(var(--fgRGB),0.5)]">Stock</div>
              </div>
              <div className="p-2 rounded-lg bg-[var(--raise)]">
                <div className="font-bold text-[10px]">{aiResult.sku}</div>
                <div className="text-[9px] text-[rgba(var(--fgRGB),0.5)]">SKU</div>
              </div>
            </div>
          </div>
          <button onClick={confirmAiProduct}
            className="w-full h-12 rounded-xl font-display font-bold text-sm"
            style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}>
            ✓ Confirm & Add to Inventory
          </button>
          <button onClick={() => { setInventoryMode(null); setAiResult(null); }}
            className="w-full py-2.5 text-xs text-[rgba(var(--fgRGB),0.6)] text-center hover:underline">
            Try again
          </button>
        </div>
      )}
    </div>
  );

  const subTabs = [
    { id: 'dash', label: t.dash },
    { id: 'approvals', label: t.approvals, badge: pendingApprovals.length },
    { id: 'inventory', label: 'Inventory' },
    { id: 'team', label: t.team },
    ...(activeRole === 'patron' ? [{ id: 'pricing', label: t.pricing }] : []),
  ];

  return (
    <div className="flex flex-col h-full bg-[var(--bg)] text-[var(--fg)] relative select-none">
      {/* Inventory Modal */}
      {showInventoryModal && <InventoryModal />}

      {/* ── Role Switcher ── */}
      <div className="p-3 bg-[var(--card)] border-b border-[rgba(var(--lineRGB),0.08)] flex items-center gap-2 shrink-0">
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--raise)] text-xs font-bold flex-1">
          <button onClick={() => setActiveRole('manager')}
            className={`flex-1 py-1.5 rounded-lg transition ${activeRole === 'manager' ? 'bg-[var(--card)] text-[var(--fg)] shadow-sm' : 'text-[rgba(var(--fgRGB),0.5)]'}`}>
            👔 {t.manager}
          </button>
          <button onClick={() => setActiveRole('patron')}
            className={`flex-1 py-1.5 rounded-lg transition ${activeRole === 'patron' ? 'bg-[var(--card)] text-[var(--acc)] shadow-sm' : 'text-[rgba(var(--fgRGB),0.5)]'}`}>
            👑 {t.patron}
          </button>
        </div>
      </div>

      {/* ── Sub-navigation tabs ── */}
      <div className="px-3 py-2 bg-[var(--card)] border-b border-[rgba(var(--lineRGB),0.06)] flex items-center gap-1 overflow-x-auto text-[11px] font-semibold shrink-0">
        {subTabs.map(tab => (
          <button key={tab.id} onClick={() => setSelectedTab(tab.id)}
            className={`px-3 py-1.5 rounded-lg shrink-0 transition relative ${selectedTab === tab.id ? 'bg-[var(--raise)] text-[var(--acc)]' : 'text-[rgba(var(--fgRGB),0.5)]'}`}>
            {tab.label}
            {tab.badge > 0 && (
              <span className="ml-1 px-1.5 rounded-full text-[var(--onAcc)] text-[9px] font-bold"
                style={{ background: 'var(--acc)' }}>
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── Non-dashboard panels ── */}
      {activeNav === 'notifications' && <NotificationsPanel />}
      {activeNav === 'chat' && <ChatPanel />}
      {activeNav === 'profile' && <ProfilePanel />}

      {/* ── Main Dashboard Tabs ── */}
      {activeNav === 'dashboard' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">

          {/* TAB: DASHBOARD */}
          {selectedTab === 'dash' && (
            <>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-xs">{R.store}</div>
                  <div className="text-[10px] text-[rgba(var(--fgRGB),0.5)]">{R.owner} · {R.city}</div>
                </div>
                <span className="w-4 h-4 rounded-full shrink-0" style={{ background: R.flag }} />
              </div>

              {/* KPI Grid */}
              <div className="grid grid-cols-3 gap-2 text-center">
                {[
                  { label: t.todaySales, value: formatMoney(R.today), accent: false },
                  { label: t.toApprove, value: pendingApprovals.length, accent: true },
                  { label: t.clerks, value: clerks.length, accent: false },
                ].map((k, i) => (
                  <div key={i} className="p-3 rounded-xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.08)]">
                    <span className={`block font-display font-black text-sm tracking-tight ${k.accent ? 'text-[var(--acc)]' : ''}`}>{k.value}</span>
                    <span className="text-[9px] font-mono uppercase text-[rgba(var(--fgRGB),0.5)]">{k.label}</span>
                  </div>
                ))}
              </div>

              {/* Register Status */}
              <div className="p-3.5 rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.08)]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold">{t.registerStatus}</span>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${dayClosed ? 'bg-[rgba(255,106,19,0.15)] text-[var(--acc)]' : 'bg-[rgba(10,123,79,0.15)] text-[var(--acc2)]'}`}>
                    {dayClosed ? t.dayClosed : t.dayOpen}
                  </span>
                </div>
                <button onClick={handleToggleDayClose}
                  className="w-full py-2.5 rounded-xl font-display font-bold text-xs shadow-sm transition"
                  style={{ background: dayClosed ? 'var(--raise)' : 'var(--acc)', color: dayClosed ? 'var(--fg)' : 'var(--onAcc)' }}>
                  {dayClosed ? t.openDay : t.closeDay}
                </button>
              </div>

              {/* Quick Add Inventory CTA */}
              <button onClick={() => setShowInventoryModal(true)}
                className="w-full p-3.5 rounded-2xl border-2 border-dashed border-[rgba(var(--lineRGB),0.2)] hover:border-[var(--acc)] flex items-center gap-3 transition group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--accSoft)' }}>
                  <Package className="w-5 h-5 text-[var(--acc)]" />
                </div>
                <div className="text-left">
                  <div className="font-display font-bold text-sm">{t.addInventory}</div>
                  <div className="text-[10px] text-[rgba(var(--fgRGB),0.5)]">Manual · Photo · Shelf · Invoice OCR</div>
                </div>
                <Sparkles className="w-4 h-4 text-[var(--acc)] ml-auto opacity-60 group-hover:opacity-100 transition" />
              </button>

              {/* Field Tasks */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[rgba(var(--fgRGB),0.5)]">
                  <span>{t.fieldTasks}</span>
                  <span>{tasks.length}</span>
                </div>
                <form onSubmit={handleAssignTask} className="flex gap-2">
                  <input type="text" value={assignedTaskText} onChange={e => setAssignedTaskText(e.target.value)}
                    placeholder={`${t.assignTo} ${R.clerk}…`}
                    className="flex-1 px-3 py-2 rounded-xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.1)] text-xs text-[var(--fg)] placeholder-[rgba(var(--fgRGB),0.4)] focus:outline-none focus:border-[var(--acc)]" />
                  <button type="submit" className="px-3.5 py-2 rounded-xl text-xs font-bold"
                    style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
                <div className="space-y-1.5">
                  {tasks.map(task => (
                    <div key={task.id} className="p-3 rounded-xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.07)] flex items-center justify-between text-xs">
                      <div className="min-w-0 pr-2">
                        <div className="font-medium truncate">{task.text}</div>
                        <div className="text-[10px] text-[rgba(var(--fgRGB),0.5)]">For: {task.to}</div>
                      </div>
                      <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-md bg-[var(--raise)] text-[var(--acc)] shrink-0">
                        {task.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* TAB: APPROVALS */}
          {selectedTab === 'approvals' && (
            <div className="space-y-3">
              <div className="text-[11px] font-mono uppercase tracking-wider text-[rgba(var(--fgRGB),0.5)]">
                {t.pendingApprovals} ({pendingApprovals.length})
              </div>
              {pendingApprovals.length === 0 ? (
                <div className="p-8 text-center text-xs text-[rgba(var(--fgRGB),0.5)] rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.07)]">
                  {t.noPending}
                </div>
              ) : pendingApprovals.map(tx => (
                <div key={tx.id} className="p-4 rounded-2xl bg-[var(--card)] border-2 border-[var(--acc)] shadow-md space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono text-xs font-bold text-[var(--acc)]">{tx.id}</span>
                      <div className="font-display font-bold text-sm">{tx.customerName}</div>
                      <div className="text-[10px] text-[rgba(var(--fgRGB),0.5)]">Clerk: {tx.clerkName}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-display font-black text-lg">{formatMoney(tx.total)}</div>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-[rgba(255,183,3,0.15)] text-[var(--warn)]">
                        {tx.paymentMethod}
                      </span>
                    </div>
                  </div>
                  {tx.approvalReason && (
                    <div className="p-2 rounded-lg bg-[var(--raise)] text-[10px] text-[rgba(var(--fgRGB),0.7)] font-mono">
                      Reason: {tx.approvalReason}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <button onClick={() => approveTransaction(tx.id)}
                      className="flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                      style={{ background: 'var(--acc2)', color: '#fff' }}>
                      <CheckCircle2 className="w-3.5 h-3.5" /> {t.approve}
                    </button>
                    <button onClick={() => rejectTransaction(tx.id, 'Rejected by management')}
                      className="flex-1 py-2 rounded-xl text-xs font-bold bg-[rgba(255,138,138,0.15)] text-[var(--bad)] border border-[rgba(255,138,138,0.3)] flex items-center justify-center gap-1.5">
                      <XCircle className="w-3.5 h-3.5" /> {t.reject}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB: INVENTORY */}
          {selectedTab === 'inventory' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[rgba(var(--fgRGB),0.5)]">Stock Overview</div>
                <button onClick={() => setShowInventoryModal(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold"
                  style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}>
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>

              {/* AI Smart Alerts */}
              {products.filter(p => p.stock < 5).slice(0, 2).map(p => (
                <div key={p.id} className="p-3 rounded-xl bg-[rgba(255,183,3,0.08)] border border-[rgba(255,183,3,0.25)] flex items-center gap-3">
                  <AlertTriangle className="w-4 h-4 text-[var(--warn)] shrink-0" />
                  <div className="min-w-0 flex-1 text-xs">
                    <div className="font-bold text-[var(--warn)]">Low Stock: {p.name}</div>
                    <div className="text-[10px] text-[rgba(var(--fgRGB),0.55)]">{p.stock} units left · AI recommends reorder</div>
                  </div>
                  <button onClick={() => restockProduct(p.id, 20)}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-bold shrink-0"
                    style={{ background: 'var(--accSoft)', color: 'var(--acc)' }}>
                    Reorder
                  </button>
                </div>
              ))}

              {products.slice(0, 8).map(prod => (
                <div key={prod.id} className="p-3 rounded-xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.07)] flex items-center justify-between">
                  <div className="min-w-0 pr-2">
                    <div className="font-semibold text-xs truncate">{prod.name}</div>
                    <div className="text-[10px] text-[rgba(var(--fgRGB),0.5)] font-mono">
                      SKU: {prod.sku || 'N/A'} · Cat: {prod.category}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-display font-black text-xs text-[var(--acc)]">{formatMoney(prod.price)}</div>
                    <span className={`text-[9px] font-mono font-bold ${prod.stock < 5 ? 'text-[var(--warn)]' : 'text-[var(--acc2)]'}`}>
                      {prod.stock} units
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB: TEAM */}
          {selectedTab === 'team' && (
            <div className="space-y-3">
              <div className="text-[11px] font-mono uppercase tracking-wider text-[rgba(var(--fgRGB),0.5)]">
                Team & Permissions
              </div>
              {clerks.map(c => (
                <div key={c.id} className="p-3.5 rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.08)] space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <img src={c.avatar} alt={c.name}
                        className="w-10 h-10 rounded-xl object-cover border border-[rgba(var(--lineRGB),0.1)]" />
                      <div>
                        <div className="font-display font-bold text-xs">{c.name}</div>
                        <div className="text-[10px] text-[rgba(var(--fgRGB),0.5)]">{c.phone} · {c.shift}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[rgba(10,123,79,0.15)] text-[var(--acc2)]">
                      {c.status}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-[rgba(var(--lineRGB),0.06)]">
                    <span className="block text-[9px] font-mono uppercase text-[rgba(var(--fgRGB),0.4)] mb-1.5">
                      {t.permMatrix}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { key: 'accView', label: t.view },
                        { key: 'accApprove', label: t.validate },
                        { key: 'accPrice', label: t.price },
                        { key: 'accTeam', label: t.teamPerm },
                        { key: 'accExport', label: t.exportPerm },
                      ].map(p => {
                        const enabled = c.permissions?.[p.key];
                        return (
                          <button key={p.key} onClick={() => updateClerkPermissions(c.id, p.key, !enabled)}
                            className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold border transition ${enabled ? 'bg-[var(--accSoft)] border-[var(--acc)] text-[var(--acc)]' : 'bg-[var(--raise)] border-transparent text-[rgba(var(--fgRGB),0.4)]'}`}>
                            {enabled ? '✓ ' : '+ '}{p.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB: PRICING (PATRON ONLY) */}
          {selectedTab === 'pricing' && (
            <div className="space-y-3">
              <div className="text-[11px] font-mono uppercase tracking-wider text-[rgba(var(--fgRGB),0.5)]">
                {t.margins}
              </div>
              {products.slice(0, 6).map(prod => (
                <div key={prod.id} className="p-3 rounded-xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.07)] flex items-center justify-between">
                  <div className="min-w-0 pr-2">
                    <div className="font-semibold text-xs truncate">{prod.name}</div>
                    <div className="text-[10px] text-[rgba(var(--fgRGB),0.5)] font-mono">
                      {t.stock}: {prod.stock} · {t.cost}: {formatMoney(prod.costPrice || prod.price * 0.7)}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="font-display font-black text-xs text-[var(--acc)]">{formatMoney(prod.price)}</div>
                    <span className="text-[9px] font-mono text-[var(--acc2)] font-bold">
                      {t.margin}: {(((prod.price - (prod.costPrice || prod.price * 0.7)) / prod.price) * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      )}

      {/* ════ BOTTOM NAVIGATION ════ */}
      <div className="shrink-0 bg-[var(--card)] border-t border-[rgba(var(--lineRGB),0.09)] px-2 py-1.5 flex items-center justify-around z-30">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;
          return (
            <button key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition relative ${isActive ? 'text-[var(--acc)]' : 'text-[rgba(var(--fgRGB),0.45)] hover:text-[rgba(var(--fgRGB),0.7)]'}`}>
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
