import React, { useState, useMemo } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  CheckCircle2, XCircle, Send,
  LayoutDashboard, Bell, MessageSquare, User,
  Package, TrendingUp, Camera, Plus, Sparkles,
  AlertTriangle, BarChart3, RefreshCw, Users,
  Sliders, FileText, Download, CheckSquare,
  Clock, ArrowUpRight, ShieldCheck, ChevronRight,
  Filter, HelpCircle, Phone, Award, DollarSign
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
    whoSoldWhat: 'Who Sold What',
    taskHistory: 'Task History',
    aiTickets: 'AI Tickets',
    fieldRequests: 'Field Requests',
    exportSales: 'Export Sales',
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
    whoSoldWhat: 'Qui a Vendu Quoi',
    taskHistory: 'Historique des Tâches',
    aiTickets: 'Tickets IA',
    fieldRequests: 'Demandes Terrain',
    exportSales: 'Exporter Ventes',
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
    whoSoldWhat: 'কে কী বিক্রি করেছে',
    taskHistory: 'কাজের ইতিহাস',
    aiTickets: 'AI টিকিট',
    fieldRequests: 'মাঠের অনুরোধ',
    exportSales: 'বিক্রয় রপ্তানি',
  }
};

const getT = (lang) => T[lang] || T.en;

export const BoundManagerPatronApp = () => {
  const {
    currentRegion,
    formatMoney,
    transactions,
    products,
    approveTransaction,
    rejectTransaction,
    addToast,
    playSoundEffect,
    addProduct,
    restockProduct,
    // Store Team & Roles
    managers,
    teamClerks,
    tasks,
    assignTask,
    updateTaskStatus,
    inventoryRequests,
    approveInventoryRequest,
    rejectInventoryRequest,
    fieldRequests,
    approveFieldRequest,
    rejectFieldRequest,
    aiTickets,
    resolveAiTicket,
    chatMessages,
    sendChatMessage,
    pricingSettings,
    updatePricingSettings,
    updateProductPriceAndCommission,
    reassignClerkTeam
  } = useApp();

  const R = currentRegion;
  const t = getT(R.lang);

  // Active Role: 'patron' | 'mgr-1' | 'mgr-2'
  const [activeRole, setActiveRole] = useState('mgr-1');
  const [selectedTab, setSelectedTab] = useState('dash');
  const [activeNav, setActiveNav] = useState('dashboard');
  const [dayClosed, setDayClosed] = useState(false);

  // Task form state
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskClerk, setNewTaskClerk] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('Normal');
  const [taskFilter, setTaskFilter] = useState('All'); // 'All' | 'Active' | 'Completed'

  // Chat input state
  const [chatInputText, setChatInputText] = useState('');
  const [chatAttachedImage, setChatAttachedImage] = useState(null);
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [voiceSeconds, setVoiceSeconds] = useState(0);

  // Inventory modal state
  const [showInventoryModal, setShowInventoryModal] = useState(false);
  const [inventoryMode, setInventoryMode] = useState(null);
  const [aiProcessing, setAiProcessing] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  // Identify active manager context
  const activeManager = managers.find(m => m.id === activeRole) || managers[0];
  const isPatron = activeRole === 'patron';

  // Filter clerks for current manager or all for patron
  const currentTeamClerks = isPatron
    ? teamClerks
    : teamClerks.filter(c => c.team === activeManager.team);

  // Calculate team sales
  const teamSalesTotal = currentTeamClerks.reduce((sum, c) => sum + (c.salesToday || 0), 0);
  const totalStoreSales = teamClerks.reduce((sum, c) => sum + (c.salesToday || 0), 0);

  // Approvals filtering
  const pendingSaleApprovals = transactions.filter(tr => tr.status === 'Pending');
  const pendingInvApprovals = inventoryRequests.filter(r => r.status === 'Pending');
  const pendingFieldRequests = fieldRequests.filter(f => f.status === 'Pending');

  const totalPendingApprovals = pendingSaleApprovals.length + pendingInvApprovals.length;
  const notifCount = totalPendingApprovals + pendingFieldRequests.length + aiTickets.filter(a => a.status === 'Open').length;

  // Handle Day Close
  const handleToggleDayClose = () => {
    setDayClosed(!dayClosed);
    playSoundEffect('add');
    addToast(
      dayClosed ? 'Register Reopened' : 'Day Closed',
      dayClosed ? 'Sales can continue.' : 'Shift register closed & summary sent to Owner.',
      'info'
    );
  };

  // Handle Task Assign
  const handleAssignTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const assignedClerkName = newTaskClerk || (currentTeamClerks[0]?.name || 'Amara Okonkwo');
    assignTask({
      title: newTaskTitle.trim(),
      description: newTaskDesc.trim() || 'Complete standard verification before shift close.',
      assignedTo: assignedClerkName,
      team: isPatron ? (teamClerks.find(c => c.name === assignedClerkName)?.team || 'Team Alpha') : activeManager.team,
      assignedBy: isPatron ? `${R.owner} (Owner)` : `${activeManager.name} (${activeManager.role})`,
      priority: newTaskPriority,
      dueDate: 'Today ' + new Date(Date.now() + 3 * 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    setNewTaskTitle('');
    setNewTaskDesc('');
    setNewTaskClerk('');
  };

  // Handle Export Simulation
  const handleExportData = (type) => {
    playSoundEffect('success');
    addToast(
      'Export Complete',
      `${type} successfully generated and downloaded as CSV.`,
      'success'
    );
  };

  // AI Inventory Simulation
  const handleAiInventory = (mode) => {
    setInventoryMode(mode);
    setAiProcessing(true);
    setAiResult(null);
    setTimeout(() => {
      setAiProcessing(false);
      setAiResult({
        name: R.ocr[0]?.name || 'Premium Auto Component',
        sku: R.ocr[0]?.sku || 'SKU-GEMINI-88',
        stock: R.ocr[0]?.stock || 18,
        price: R.ocr[0]?.price || 3500,
        description: 'AI verified match from online distributor database. High durability OEM grade.',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&auto=format&fit=crop'
      });
    }, 2000);
  };

  // Helper to format currency like "16 500 FCFA" (space separator)
  const formatFCFA = (val) => {
    if (val === undefined || val === null || isNaN(val)) return '0 FCFA';
    const rounded = Math.round(Number(val));
    const numStr = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return `${numStr} FCFA`;
  };

  // Pricing & Commission Product List (Prioritize Auto Parts / high margin items)
  const pricingProductList = useMemo(() => {
    return [...products].sort((a, b) => {
      const aAuto = a.category === 'Auto Parts' || a.id.includes('auto') ? 1 : 0;
      const bAuto = b.category === 'Auto Parts' || b.id.includes('auto') ? 1 : 0;
      return bAuto - aAuto;
    });
  }, [products]);

  // Dynamic Est. Monthly Profit calculation
  const estMonthlyProfit = useMemo(() => {
    return pricingProductList.reduce((sum, prod) => {
      const cost = Number(prod.costPrice || 0);
      const price = Number(prod.price || 0);
      const commission = Number(prod.commissionPercent ?? 5);
      const grossMargin = Math.max(0, price - cost);
      const commissionAmount = grossMargin * (commission / 100);
      const profitPerUnit = grossMargin - commissionAmount;
      const units = prod.monthlyEstimate || 15;
      return sum + (profitPerUnit * units);
    }, 0);
  }, [pricingProductList]);

  const handleAdjustPrice = (productId, delta) => {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;
    const currentPrice = Number(prod.price || 0);
    const minPrice = Number(prod.costPrice || 0);
    const newPrice = Math.max(minPrice, currentPrice + delta);
    updateProductPriceAndCommission(productId, { price: newPrice });
  };

  const handleAdjustCommission = (productId, delta) => {
    const prod = products.find(p => p.id === productId);
    if (!prod) return;
    const currentComm = Number(prod.commissionPercent ?? 5);
    const newComm = Math.min(50, Math.max(0, currentComm + delta));
    updateProductPriceAndCommission(productId, { commissionPercent: newComm });
  };

  const confirmAiProduct = () => {
    if (aiResult) {
      addProduct({
        name: aiResult.name,
        price: aiResult.price,
        stock: aiResult.stock,
        category: 'Auto Parts',
        sku: aiResult.sku,
        barcode: '880609' + Math.floor(1000000 + Math.random() * 9000000)
      });
      setShowInventoryModal(false);
      setAiResult(null);
      setInventoryMode(null);
    }
  };

  // Send Chat Message
  const handleSendChat = (e) => {
    if (e) e.preventDefault();
    if (!chatInputText.trim() && !chatAttachedImage) return;

    sendChatMessage({
      sender: isPatron ? `${R.owner} (Owner)` : activeManager.name,
      role: isPatron ? 'Owner' : activeManager.role,
      team: isPatron ? 'Storewide' : activeManager.team,
      text: chatInputText.trim() || '📷 Photo attachment',
      image: chatAttachedImage,
      self: true
    });

    setChatInputText('');
    setChatAttachedImage(null);
  };

  // Voice Note Simulation
  const toggleVoiceRecording = () => {
    if (!isRecordingVoice) {
      setIsRecordingVoice(true);
      setVoiceSeconds(0);
      const timer = setInterval(() => {
        setVoiceSeconds(s => s + 1);
      }, 1000);
      setTimeout(() => {
        clearInterval(timer);
        setIsRecordingVoice(false);
        sendChatMessage({
          sender: isPatron ? `${R.owner} (Owner)` : activeManager.name,
          role: isPatron ? 'Owner' : activeManager.role,
          team: isPatron ? 'Storewide' : activeManager.team,
          isVoice: true,
          audioDuration: '0:06',
          text: `🎙️ Voice Note (0:06): "Approved the inventory count. Good work team."`,
          self: true
        });
      }, 3500);
    }
  };

  // ── Sub-Tabs Definition ──────────────────────────────────────────────────
  const managerTabs = [
    { id: 'dash', label: t.dash, icon: LayoutDashboard },
    { id: 'whoSold', label: t.whoSoldWhat, icon: Users },
    { id: 'approvals', label: t.approvals, badge: totalPendingApprovals, icon: CheckCircle2 },
    { id: 'tasks', label: 'Tasks & History', icon: CheckSquare },
    { id: 'requests', label: 'Clerk Requests', badge: pendingInvApprovals.length, icon: MessageSquare },
    { id: 'export', label: 'Export', icon: Download },
    { id: 'inventory', label: t.inventory, icon: Package }
  ];

  const patronTabs = [
    { id: 'analytics', label: 'Analytics & AI', icon: TrendingUp },
    { id: 'tickets', label: t.aiTickets, badge: aiTickets.filter(a => a.status === 'Open').length, icon: Sparkles },
    { id: 'whoSoldAll', label: t.whoSoldWhat, icon: Users },
    { id: 'pricing', label: 'Pricing & Commissions', icon: Sliders },
    { id: 'team', label: 'Team & Roles', icon: ShieldCheck },
    { id: 'field', label: t.fieldRequests, badge: pendingFieldRequests.length, icon: AlertTriangle },
    { id: 'reports', label: 'Reports & Export', icon: FileText },
    { id: 'inventory', label: t.inventory, icon: Package }
  ];

  const currentTabs = isPatron ? patronTabs : managerTabs;

  // Bottom navigation items
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: t.dashboard },
    { id: 'notifications', icon: Bell, label: t.notifications, badge: notifCount },
    { id: 'chat', icon: MessageSquare, label: t.chat },
    { id: 'profile', icon: User, label: t.profile },
  ];

  return (
    <div className="flex flex-col h-full bg-[var(--bg)] text-[var(--fg)] relative select-none">
      {/* ── AI Inventory Modal ── */}
      {showInventoryModal && (
        <div className="absolute inset-0 bg-[rgba(var(--bgRGB),0.97)] z-50 flex flex-col p-4 overflow-y-auto">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-[rgba(var(--lineRGB),0.1)]">
            <h3 className="font-display font-black text-base flex items-center gap-2">
              <Package className="w-5 h-5 text-[var(--acc)]" />
              <span>{t.addInventory}</span>
            </h3>
            <button
              onClick={() => { setShowInventoryModal(false); setAiResult(null); setInventoryMode(null); }}
              className="text-[rgba(var(--fgRGB),0.5)] text-xs hover:text-[var(--fg)] p-1"
            >
              ✕ Close
            </button>
          </div>

          {!inventoryMode && (
            <div className="space-y-3">
              <p className="text-xs text-[rgba(var(--fgRGB),0.6)] flex items-center gap-1.5 p-2 rounded-xl bg-[var(--accSoft)] text-[var(--acc)]">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>{t.aiPowered}</span>
              </p>
              {[
                { id: 'manual', icon: Plus, label: t.addManual, desc: 'Type name, SKU, unit cost, and price manually' },
                { id: 'photo', icon: Camera, label: t.addPhoto, desc: 'Take photo of single item — Gemini identifies product and specs' },
                { id: 'shelf', icon: Camera, label: t.addShelf, desc: 'Scan shelf with 5–10 items visible at once' },
                { id: 'invoice', icon: FileText, label: t.addInvoice, desc: 'Photograph supplier paper invoice — auto-extracts line items' },
              ].map(opt => {
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleAiInventory(opt.id)}
                    className="w-full p-3.5 rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.08)] hover:border-[var(--acc)] text-left flex items-center gap-3 transition"
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'var(--accSoft)' }}>
                      <Icon className="w-5 h-5 text-[var(--acc)]" />
                    </div>
                    <div>
                      <div className="font-display font-bold text-sm">{opt.label}</div>
                      <div className="text-[10px] text-[rgba(var(--fgRGB),0.55)]">{opt.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {inventoryMode && aiProcessing && (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center py-10">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: 'var(--accSoft)' }}>
                <Sparkles className="w-8 h-8 text-[var(--acc)] animate-pulse" />
              </div>
              <div className="font-display font-bold text-base">Gemini Vision Ingestion Active…</div>
              <div className="text-xs text-[rgba(var(--fgRGB),0.6)] max-w-xs">
                Extracting SKU details, barcode checksum, and manufacturer catalogue metadata…
              </div>
              <div className="text-[10px] font-mono px-3 py-1 rounded-full bg-[var(--raise)] text-[var(--acc)]">
                Deepgram + Gemini 1.5 Flash Vision
              </div>
            </div>
          )}

          {inventoryMode && !aiProcessing && aiResult && (
            <div className="space-y-3">
              <div className="text-[10px] font-mono uppercase text-[var(--ok)] font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Product Recognized</span>
              </div>
              <div className="p-4 rounded-2xl bg-[var(--card)] border-2 border-[var(--acc)] space-y-3">
                <img
                  src={aiResult.image}
                  alt={aiResult.name}
                  className="w-full h-32 object-cover rounded-xl border border-[rgba(var(--lineRGB),0.08)]"
                />
                <div>
                  <div className="font-display font-bold text-base">{aiResult.name}</div>
                  <div className="text-xs text-[rgba(var(--fgRGB),0.6)] mt-1">{aiResult.description}</div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-[var(--raise)]">
                    <div className="font-bold text-[var(--acc)]">{formatMoney(aiResult.price)}</div>
                    <div className="text-[9px] text-[rgba(var(--fgRGB),0.5)]">Price</div>
                  </div>
                  <div className="p-2 rounded-xl bg-[var(--raise)]">
                    <div className="font-bold">{aiResult.stock}</div>
                    <div className="text-[9px] text-[rgba(var(--fgRGB),0.5)]">Stock</div>
                  </div>
                  <div className="p-2 rounded-xl bg-[var(--raise)]">
                    <div className="font-bold text-[10px]">{aiResult.sku}</div>
                    <div className="text-[9px] text-[rgba(var(--fgRGB),0.5)]">SKU</div>
                  </div>
                </div>
              </div>
              <button
                onClick={confirmAiProduct}
                className="w-full h-12 rounded-xl font-display font-bold text-sm shadow-md"
                style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}
              >
                ✓ Confirm & Add to Inventory
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── Top Role Selector Bar ── */}
      <div className="p-2.5 bg-[var(--card)] border-b border-[rgba(var(--lineRGB),0.08)] shrink-0">
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--raise)] text-xs font-bold">
          <button
            onClick={() => { setActiveRole('mgr-1'); setSelectedTab('dash'); }}
            className={`flex-1 py-1.5 px-2 rounded-lg transition text-center truncate ${activeRole === 'mgr-1' ? 'bg-[var(--card)] text-[var(--acc)] shadow-sm' : 'text-[rgba(var(--fgRGB),0.6)]'}`}
          >
            👔 Mgr 1 (Alpha)
          </button>
          <button
            onClick={() => { setActiveRole('mgr-2'); setSelectedTab('dash'); }}
            className={`flex-1 py-1.5 px-2 rounded-lg transition text-center truncate ${activeRole === 'mgr-2' ? 'bg-[var(--card)] text-[var(--acc)] shadow-sm' : 'text-[rgba(var(--fgRGB),0.6)]'}`}
          >
            👔 Mgr 2 (Beta)
          </button>
          <button
            onClick={() => { setActiveRole('patron'); setSelectedTab('analytics'); }}
            className={`flex-1 py-1.5 px-2 rounded-lg transition text-center truncate ${activeRole === 'patron' ? 'bg-[var(--card)] text-amber-500 shadow-sm' : 'text-[rgba(var(--fgRGB),0.6)]'}`}
          >
            👑 {t.patron} (Owner)
          </button>
        </div>

        {/* Identity & Scope Bar */}
        <div className="flex items-center justify-between mt-2 px-1 text-[11px]">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="w-2 h-2 rounded-full" style={{ background: isPatron ? '#F59E0B' : 'var(--acc)' }} />
            <span className="font-bold truncate">
              {isPatron ? `${R.owner} (Store Owner)` : `${activeManager.name} · ${activeManager.team}`}
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--raise)] text-[rgba(var(--fgRGB),0.6)]">
            {isPatron ? 'Storewide' : activeManager.shift.split('(')[0].trim()}
          </span>
        </div>
      </div>

      {/* ── Sub-Navigation Tabs Carousel ── */}
      <div className="flex items-center gap-1 overflow-x-auto px-3 py-2 bg-[var(--card)] border-b border-[rgba(var(--lineRGB),0.07)] shrink-0 scrollbar-none">
        {currentTabs.map(tab => {
          const Icon = tab.icon;
          const isActive = selectedTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.id === 'inventory') {
                  setShowInventoryModal(true);
                } else {
                  setSelectedTab(tab.id);
                }
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition relative ${
                isActive
                  ? 'bg-[var(--acc)] text-[var(--onAcc)] shadow-xs'
                  : 'text-[rgba(var(--fgRGB),0.6)] hover:text-[var(--fg)] hover:bg-[var(--raise)]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.badge > 0 && (
                <span className={`px-1.5 py-0.2 rounded-full text-[9px] font-bold ${isActive ? 'bg-white text-slate-900' : 'bg-[var(--acc)] text-white'}`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* ── TAB CONTENT ── */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* ── MANAGER VIEW 1: DASHBOARD & HOW ITEMS SOLD ── */}
        {!isPatron && selectedTab === 'dash' && (
          <>
            {/* Sales Card */}
            <div className="p-4 rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.08)] shadow-sm">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-[rgba(var(--fgRGB),0.5)] mb-1">
                <span>{activeManager.team} · Today's Sales</span>
                <span className={dayClosed ? 'text-[var(--bad)] font-bold' : 'text-[var(--ok)] font-bold'}>
                  {dayClosed ? 'CLOSED' : 'OPEN'}
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <div className="font-display font-black text-3xl tracking-tight">
                  {formatMoney(teamSalesTotal)}
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[var(--accSoft)] text-[var(--acc)]">
                  {currentTeamClerks.reduce((sum, c) => sum + (c.ordersToday || 0), 0)} orders
                </span>
              </div>

              {/* Close/Reopen Register Button */}
              <button
                onClick={handleToggleDayClose}
                className={`w-full mt-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  dayClosed
                    ? 'bg-[var(--ok)] text-white'
                    : 'bg-[var(--raise)] text-[var(--fg)] border border-[rgba(var(--lineRGB),0.1)]'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{dayClosed ? t.openDay : t.closeDay}</span>
              </button>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.08)]">
                <div className="text-[10px] text-[rgba(var(--fgRGB),0.5)]">Pending Approvals</div>
                <div className="text-xl font-bold mt-1 text-[var(--acc)]">{totalPendingApprovals}</div>
                <div className="text-[10px] text-[rgba(var(--fgRGB),0.4)] mt-0.5">Sales & Inventory</div>
              </div>
              <div className="p-3 rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.08)]">
                <div className="text-[10px] text-[rgba(var(--fgRGB),0.5)]">Active Clerks</div>
                <div className="text-xl font-bold mt-1 text-[var(--ok)]">{currentTeamClerks.length} Clerks</div>
                <div className="text-[10px] text-[rgba(var(--fgRGB),0.4)] mt-0.5">All Online</div>
              </div>
            </div>

            {/* "How Items Sold" Velocity Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-[var(--acc)]" />
                  <span>How Items Sold (Velocity Tracker)</span>
                </span>
                <span className="text-[10px] font-mono text-[rgba(var(--fgRGB),0.5)]">Today</span>
              </div>

              <div className="space-y-2">
                {[
                  { name: 'Premium Oil Filter', sku: 'OIL-FLT-EN', sold: 14, left: 16, rev: 175.00, trend: '+28%' },
                  { name: 'Bosch Brake Pads', sku: 'BRK-BSH-EN', sold: 9, left: 8, rev: 405.00, trend: '+42%' },
                  { name: 'NGK Spark Plugs ×4', sku: 'NGK-SPK-01', sold: 18, left: 24, rev: 216.00, trend: '+15%' },
                  { name: 'Air Filter Set', sku: 'AIR-FLT-02', sold: 13, left: 12, rev: 104.00, trend: '+8%' }
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.07)] flex items-center justify-between text-xs">
                    <div className="min-w-0">
                      <div className="font-bold truncate">{item.name}</div>
                      <div className="text-[10px] font-mono text-[rgba(var(--fgRGB),0.5)]">
                        {item.sku} · {item.left} in stock
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-bold text-[var(--acc)]">{item.sold} sold</div>
                      <div className="text-[10px] text-[var(--ok)] font-mono">{formatMoney(item.rev)} ({item.trend})</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── MANAGER VIEW 2: WHO SOLD WHAT (TEAM BREAKDOWN) ── */}
        {!isPatron && selectedTab === 'whoSold' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-display font-bold text-sm">Team Who Sold What</h4>
                <p className="text-[10px] text-[rgba(var(--fgRGB),0.55)]">{activeManager.team} · 3 Sales Clerks</p>
              </div>
              <button
                onClick={() => handleExportData('Team Sales Summary')}
                className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-[var(--raise)] border border-[rgba(var(--lineRGB),0.1)] flex items-center gap-1"
              >
                <Download className="w-3 h-3 text-[var(--acc)]" />
                <span>Export</span>
              </button>
            </div>

            {currentTeamClerks.map(clerk => (
              <div key={clerk.id} className="p-3.5 rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.08)] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <img src={clerk.avatar} alt={clerk.name} className="w-9 h-9 rounded-xl object-cover" />
                    <div>
                      <div className="font-bold text-xs">{clerk.name}</div>
                      <div className="text-[10px] text-[rgba(var(--fgRGB),0.5)]">{clerk.shift}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-display font-black text-sm text-[var(--acc)]">{formatMoney(clerk.salesToday)}</div>
                    <div className="text-[10px] text-[var(--ok)] font-mono">{clerk.ordersToday} orders · Comm: {formatMoney(clerk.commissionEarned)}</div>
                  </div>
                </div>

                {/* Items sold by this clerk */}
                <div className="pt-2 border-t border-[rgba(var(--lineRGB),0.06)] space-y-1">
                  <div className="text-[10px] font-mono uppercase text-[rgba(var(--fgRGB),0.45)]">Items Sold Today:</div>
                  {clerk.itemsSold?.map((it, i) => (
                    <div key={i} className="flex justify-between text-[11px] text-[rgba(var(--fgRGB),0.75)]">
                      <span>• {it.name} (×{it.qty})</span>
                      <span className="font-mono">{formatMoney(it.amount)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── MANAGER & PATRON APPROVALS TAB ── */}
        {selectedTab === 'approvals' && (
          <div className="space-y-4">
            {/* Sales Approvals Section */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-[rgba(var(--fgRGB),0.8)] flex items-center justify-between">
                <span>High-Value & Discount Approvals</span>
                <span className="text-[10px] font-mono text-[var(--acc)]">{pendingSaleApprovals.length} pending</span>
              </div>

              {pendingSaleApprovals.length === 0 ? (
                <div className="p-4 rounded-2xl bg-[var(--card)] text-center text-xs text-[rgba(var(--fgRGB),0.5)]">
                  ✓ No pending high-value orders. All caught up.
                </div>
              ) : (
                pendingSaleApprovals.map(txn => (
                  <div key={txn.id} className="p-3.5 rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.08)] space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-bold text-xs">Order #{txn.id}</div>
                        <div className="text-[10px] text-[rgba(var(--fgRGB),0.5)]">Clerk: {txn.clerkName}</div>
                      </div>
                      <div className="font-display font-black text-sm text-[var(--acc)]">{formatMoney(txn.total)}</div>
                    </div>
                    <div className="text-[11px] text-[var(--warn)] p-2 rounded-lg bg-[rgba(255,183,3,0.1)]">
                      ⚠️ {txn.approvalReason || 'Exceeds standard transaction limit'}
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => approveTransaction(txn.id)}
                        className="flex-1 py-1.5 rounded-xl text-xs font-bold text-white bg-[var(--ok)] hover:opacity-90"
                      >
                        ✓ Approve Sale
                      </button>
                      <button
                        onClick={() => rejectTransaction(txn.id)}
                        className="flex-1 py-1.5 rounded-xl text-xs font-bold text-[rgba(var(--fgRGB),0.6)] bg-[var(--raise)]"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Clerk Inventory Update Approvals Section */}
            <div className="space-y-2 pt-2 border-t border-[rgba(var(--lineRGB),0.08)]">
              <div className="text-xs font-bold text-[rgba(var(--fgRGB),0.8)] flex items-center justify-between">
                <span>Clerk Inventory Recount Requests</span>
                <span className="text-[10px] font-mono text-[var(--acc)]">{pendingInvApprovals.length} pending</span>
              </div>

              {pendingInvApprovals.length === 0 ? (
                <div className="p-4 rounded-2xl bg-[var(--card)] text-center text-xs text-[rgba(var(--fgRGB),0.5)]">
                  ✓ No inventory requests awaiting approval.
                </div>
              ) : (
                pendingInvApprovals.map(req => (
                  <div key={req.id} className="p-3.5 rounded-2xl bg-[var(--card)] border-2 border-[var(--accSoft)] space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-bold text-xs">{req.productName}</div>
                        <div className="text-[10px] text-[rgba(var(--fgRGB),0.5)]">
                          Proposed by <span className="font-semibold text-[var(--acc)]">{req.clerkName}</span> ({req.team})
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/20 text-amber-500">
                        Pending
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-center text-xs p-2 rounded-xl bg-[var(--raise)]">
                      <div>
                        <span className="text-[10px] text-[rgba(var(--fgRGB),0.5)] block">Current System</span>
                        <span className="font-bold">{req.currentStock} units</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[var(--acc)] block">Proposed Actual</span>
                        <span className="font-bold text-[var(--acc)]">{req.requestedStock} units</span>
                      </div>
                    </div>

                    <div className="text-[11px] text-[rgba(var(--fgRGB),0.7)] italic">
                      "{req.reason}"
                    </div>

                    <div className="flex gap-2 pt-1">
                      <button
                        onClick={() => approveInventoryRequest(req.id)}
                        className="flex-1 py-1.5 rounded-xl text-xs font-bold text-white bg-[var(--acc)] hover:opacity-90"
                      >
                        ✓ Approve & Update Stock
                      </button>
                      <button
                        onClick={() => rejectInventoryRequest(req.id)}
                        className="px-3 py-1.5 rounded-xl text-xs font-bold text-[rgba(var(--fgRGB),0.6)] bg-[var(--raise)]"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ── MANAGER VIEW 3: TASKS & TASK HISTORY ── */}
        {!isPatron && selectedTab === 'tasks' && (
          <div className="space-y-4">
            {/* Assign Task Form */}
            <form onSubmit={handleAssignTask} className="p-3.5 rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.08)] space-y-2.5">
              <div className="text-xs font-bold flex items-center gap-1.5 text-[var(--acc)]">
                <CheckSquare className="w-4 h-4" />
                <span>Assign Task to Clerk</span>
              </div>

              <input
                type="text"
                value={newTaskTitle}
                onChange={e => setNewTaskTitle(e.target.value)}
                placeholder="Task title (e.g. Audit shelf 4B, Count brake pads)"
                className="w-full px-3 py-2 text-xs rounded-xl bg-[var(--raise)] border border-[rgba(var(--lineRGB),0.1)] text-[var(--fg)] focus:outline-none focus:border-[var(--acc)]"
              />

              <div className="grid grid-cols-2 gap-2">
                <select
                  value={newTaskClerk}
                  onChange={e => setNewTaskClerk(e.target.value)}
                  className="px-2.5 py-1.5 text-xs rounded-xl bg-[var(--raise)] border border-[rgba(var(--lineRGB),0.1)] text-[var(--fg)] focus:outline-none"
                >
                  {currentTeamClerks.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>

                <select
                  value={newTaskPriority}
                  onChange={e => setNewTaskPriority(e.target.value)}
                  className="px-2.5 py-1.5 text-xs rounded-xl bg-[var(--raise)] border border-[rgba(var(--lineRGB),0.1)] text-[var(--fg)] focus:outline-none"
                >
                  <option value="Normal">Normal Priority</option>
                  <option value="High">🔥 High Priority</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded-xl text-xs font-bold shadow-sm"
                style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}
              >
                + Dispatch Task to {newTaskClerk || currentTeamClerks[0]?.name}
              </button>
            </form>

            {/* Task Filters */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold">{t.taskHistory}</span>
              <div className="flex gap-1 p-0.5 rounded-lg bg-[var(--raise)] text-[10px] font-bold">
                {['All', 'Active', 'Completed'].map(f => (
                  <button
                    key={f}
                    onClick={() => setTaskFilter(f)}
                    className={`px-2 py-0.5 rounded-md ${taskFilter === f ? 'bg-[var(--card)] text-[var(--acc)] shadow-xs' : 'text-[rgba(var(--fgRGB),0.5)]'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Tasks List */}
            <div className="space-y-2">
              {tasks
                .filter(tsk => {
                  if (taskFilter === 'Active') return tsk.status !== 'Completed';
                  if (taskFilter === 'Completed') return tsk.status === 'Completed';
                  return true;
                })
                .map(tsk => (
                  <div key={tsk.id} className="p-3 rounded-xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.07)] space-y-1.5">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-bold text-xs">{tsk.title}</div>
                        <div className="text-[10px] text-[rgba(var(--fgRGB),0.55)]">
                          To: <span className="font-semibold text-[var(--fg)]">{tsk.assignedTo}</span> · By: {tsk.assignedBy}
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                        tsk.status === 'Completed'
                          ? 'bg-emerald-500/20 text-emerald-500'
                          : tsk.status === 'In Progress'
                          ? 'bg-blue-500/20 text-blue-500'
                          : 'bg-amber-500/20 text-amber-500'
                      }`}>
                        {tsk.status}
                      </span>
                    </div>

                    {tsk.description && (
                      <p className="text-[11px] text-[rgba(var(--fgRGB),0.65)]">{tsk.description}</p>
                    )}

                    <div className="flex items-center justify-between text-[9px] font-mono text-[rgba(var(--fgRGB),0.4)] pt-1">
                      <span>Due: {tsk.dueDate}</span>
                      <span>{tsk.completedAt ? `Finished: ${tsk.completedAt}` : `Created: ${tsk.createdAt}`}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* ── MANAGER VIEW 4: CLERK REQUESTS INBOX ── */}
        {!isPatron && selectedTab === 'requests' && (
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm">Clerk Requests & Inquiries</h4>
            {fieldRequests.map(fr => (
              <div key={fr.id} className="p-3.5 rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.08)] space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-xs">{fr.from}</div>
                    <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-[var(--raise)] text-[var(--acc)]">
                      {fr.type}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[rgba(var(--fgRGB),0.4)]">{fr.time}</span>
                </div>
                <p className="text-xs text-[rgba(var(--fgRGB),0.8)]">"{fr.text}"</p>
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => addToast('Approved', 'Request acknowledged & forwarded', 'success')}
                    className="flex-1 py-1 rounded-lg text-[10px] font-bold bg-[var(--acc)] text-white"
                  >
                    ✓ Acknowledge
                  </button>
                  <button
                    onClick={() => addToast('Replied', 'Reply sent to clerk', 'info')}
                    className="flex-1 py-1 rounded-lg text-[10px] font-bold bg-[var(--raise)] text-[var(--fg)]"
                  >
                    Reply
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── MANAGER VIEW 5: EXPORT ── */}
        {!isPatron && selectedTab === 'export' && (
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm">Export Reports & Data</h4>
            <div className="grid grid-cols-1 gap-2.5">
              {[
                { title: 'Export Team Sales (CSV)', desc: 'Full line-item sales log for this shift' },
                { title: 'Export Sales by Team (CSV)', desc: 'Comparative performance between Alpha and Beta' },
                { title: 'Clerk Commission Statement', desc: 'Earnings per clerk based on approved formula' },
                { title: 'Inventory Velocity Audit', desc: 'Fastest-moving SKUs and reorder suggestions' }
              ].map((rep, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.08)] flex items-center justify-between">
                  <div>
                    <div className="font-bold text-xs">{rep.title}</div>
                    <div className="text-[10px] text-[rgba(var(--fgRGB),0.55)]">{rep.desc}</div>
                  </div>
                  <button
                    onClick={() => handleExportData(rep.title)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[var(--acc)] text-white flex items-center gap-1 shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>CSV</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═════════════════════════════════════════════════════════════════ */}
        {/* ── PATRON (OWNER) VIEW TABS ── */}
        {/* ═════════════════════════════════════════════════════════════════ */}

        {/* PATRON TAB 1: ANALYTICS & AI INSIGHTS */}
        {isPatron && selectedTab === 'analytics' && (
          <div className="space-y-4">
            {/* Store GMV Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-[var(--card)] to-[var(--card)] border border-amber-500/20">
              <div className="flex justify-between items-center text-[10px] font-mono uppercase text-amber-500 font-bold mb-1">
                <span>Total Store Revenue Today</span>
                <span>👑 Owner Overview</span>
              </div>
              <div className="font-display font-black text-3xl tracking-tight text-[var(--fg)]">
                {formatMoney(totalStoreSales)}
              </div>
              <div className="flex items-center gap-3 text-xs mt-2 text-[rgba(var(--fgRGB),0.6)]">
                <span>Net Margin: <strong className="text-[var(--ok)]">31.4%</strong></span>
                <span>•</span>
                <span>2 Teams Active</span>
                <span>•</span>
                <span>6 Clerks</span>
              </div>
            </div>

            {/* Team Alpha vs Team Beta Comparison Card */}
            <div className="p-3.5 rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.08)] space-y-2.5">
              <div className="text-xs font-bold flex justify-between">
                <span>Team Alpha vs Team Beta (Shift Comparison)</span>
                <span className="text-[10px] font-mono text-[var(--acc)]">Live</span>
              </div>

              {/* Progress bar comparison */}
              <div className="h-2 rounded-full bg-[var(--raise)] flex overflow-hidden">
                <div style={{ width: '56%', background: 'var(--acc)' }} title="Team Alpha 56%" />
                <div style={{ width: '44%', background: '#F59E0B' }} title="Team Beta 44%" />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 rounded-xl bg-[var(--raise)]">
                  <div className="text-[10px] text-[var(--acc)] font-bold">Team Alpha (Mgr Marc)</div>
                  <div className="font-display font-bold text-sm mt-0.5">
                    {formatMoney(teamClerks.filter(c => c.team === 'Team Alpha').reduce((s, c) => s + c.salesToday, 0))}
                  </div>
                  <div className="text-[9px] text-[rgba(var(--fgRGB),0.5)]">53 orders · Morning Shift</div>
                </div>

                <div className="p-2 rounded-xl bg-[var(--raise)]">
                  <div className="text-[10px] text-amber-500 font-bold">Team Beta (Mgr Fatou)</div>
                  <div className="font-display font-bold text-sm mt-0.5">
                    {formatMoney(teamClerks.filter(c => c.team === 'Team Beta').reduce((s, c) => s + c.salesToday, 0))}
                  </div>
                  <div className="text-[9px] text-[rgba(var(--fgRGB),0.5)]">40 orders · Evening Shift</div>
                </div>
              </div>
            </div>

            {/* AI Insights Engine */}
            <div className="space-y-2">
              <div className="text-xs font-bold flex items-center gap-1.5 text-purple-400">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Autonomous AI Insights & Projections</span>
              </div>

              {[
                { title: 'Demand Spike on Brake Pads', body: 'Sales increased by 42% over past 3 days. Recommend increasing supplier order by 20 units before Friday weekend rush.', type: 'Opportunity', color: 'var(--acc)' },
                { title: 'Top Upseller: Kwame Mensah', body: 'Kwame generated 38% higher basket value by attaching air filter bundles with spark plug purchases.', type: 'Performance', color: 'var(--ok)' },
                { title: 'Predicted Revenue Projection', body: 'Based on current velocity, store is on track to close month at $48,200 (+14% vs previous month).', type: 'Projection', color: '#F59E0B' }
              ].map((ins, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.07)] space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs" style={{ color: ins.color }}>{ins.title}</span>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[var(--raise)] text-[rgba(var(--fgRGB),0.6)]">
                      {ins.type}
                    </span>
                  </div>
                  <p className="text-[11px] text-[rgba(var(--fgRGB),0.7)] leading-relaxed">{ins.body}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PATRON TAB 2: AI TICKETS */}
        {isPatron && selectedTab === 'tickets' && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-display font-bold text-sm">Autonomous AI Tickets</h4>
                <p className="text-[10px] text-[rgba(var(--fgRGB),0.55)]">Automated incident & anomaly detection</p>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-500 font-bold">
                {aiTickets.filter(t => t.status === 'Open').length} Open
              </span>
            </div>

            {aiTickets.map(tkt => (
              <div key={tkt.id} className="p-3.5 rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.08)] space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono text-[var(--acc)] font-bold">{tkt.id}</span>
                    <h5 className="font-bold text-xs mt-0.5">{tkt.title}</h5>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    tkt.severity === 'Critical'
                      ? 'bg-rose-500/20 text-rose-500'
                      : tkt.severity === 'Warning'
                      ? 'bg-amber-500/20 text-amber-500'
                      : 'bg-emerald-500/20 text-emerald-500'
                  }`}>
                    {tkt.severity}
                  </span>
                </div>

                <div className="text-[11px] text-[rgba(var(--fgRGB),0.65)] bg-[var(--raise)] p-2 rounded-xl">
                  <strong>Impact:</strong> {tkt.impact}
                </div>

                <div className="text-[11px] text-[rgba(var(--fgRGB),0.75)]">
                  💡 <strong>AI Recommendation:</strong> {tkt.recommendation}
                </div>

                {tkt.status === 'Open' ? (
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => resolveAiTicket(tkt.id, 'Auto-reorder dispatched to vendor')}
                      className="flex-1 py-1.5 rounded-xl text-xs font-bold text-white bg-[var(--acc)]"
                    >
                      ✓ Execute Recommendation
                    </button>
                    <button
                      onClick={() => resolveAiTicket(tkt.id, 'Dismissed by Owner')}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[var(--raise)] text-[rgba(var(--fgRGB),0.6)]"
                    >
                      Dismiss
                    </button>
                  </div>
                ) : (
                  <div className="text-[10px] font-mono text-[var(--ok)] font-bold pt-1">
                    ✓ Resolved: {tkt.actionTaken || 'Executed'}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* PATRON TAB 3: WHO SOLD WHAT (ALL 6 CLERKS) */}
        {isPatron && selectedTab === 'whoSoldAll' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-display font-bold text-sm">Storewide Sales Roster</h4>
                <p className="text-[10px] text-[rgba(var(--fgRGB),0.55)]">All 6 Clerks across 2 Teams</p>
              </div>
              <button
                onClick={() => handleExportData('Complete Store Sales by Clerk')}
                className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-[var(--raise)] border border-[rgba(var(--lineRGB),0.1)] flex items-center gap-1"
              >
                <Download className="w-3 h-3 text-[var(--acc)]" />
                <span>Export CSV</span>
              </button>
            </div>

            {teamClerks.map(c => (
              <div key={c.id} className="p-3.5 rounded-xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.07)] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <img src={c.avatar} alt={c.name} className="w-9 h-9 rounded-xl object-cover" />
                  <div>
                    <div className="font-bold">{c.name}</div>
                    <div className="text-[10px] text-[rgba(var(--fgRGB),0.5)]">
                      {c.team} · Mgr: {c.managerName.split(' ')[0]}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-display font-black text-sm text-[var(--acc)]">{formatMoney(c.salesToday)}</div>
                  <div className="text-[10px] font-mono text-[var(--ok)]">{c.ordersToday} orders · Comm: {formatMoney(c.commissionEarned)}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PATRON TAB 4: PRICING & COMMISSIONS */}
        {isPatron && selectedTab === 'pricing' && (
          <div className="space-y-4">
            {/* Header */}
            <div>
              <h2 className="font-display font-black text-xl text-[var(--fg)] tracking-tight">
                Pricing & commission
              </h2>
            </div>

            {/* EST. MONTHLY PROFIT Card */}
            <div className="p-4 rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.08)] shadow-sm">
              <div className="text-[10px] font-bold tracking-widest text-[rgba(var(--fgRGB),0.5)] uppercase">
                EST. MONTHLY PROFIT
              </div>
              <div className="text-2xl font-black text-[#10B981] mt-1 tracking-tight">
                {formatFCFA(estMonthlyProfit)}
              </div>
            </div>

            {/* Product Cards List */}
            <div className="space-y-3">
              {pricingProductList.map(prod => {
                const cost = Number(prod.costPrice || 0);
                const price = Number(prod.price || 0);
                const commission = Number(prod.commissionPercent ?? 5);
                const grossMargin = Math.max(0, price - cost);
                const commissionAmount = grossMargin * (commission / 100);
                const profitPerUnit = Math.round(grossMargin - commissionAmount);

                return (
                  <div
                    key={prod.id}
                    className="p-4 rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.08)] space-y-3 shadow-sm hover:border-[rgba(var(--lineRGB),0.16)] transition"
                  >
                    <h4 className="font-bold text-sm text-[var(--fg)]">
                      {prod.name}
                    </h4>

                    <div className="grid grid-cols-3 gap-2 items-center">
                      {/* COST */}
                      <div className="space-y-1">
                        <div className="text-[9px] font-bold tracking-widest text-[rgba(var(--fgRGB),0.5)] uppercase">
                          COST
                        </div>
                        <div className="text-xs font-bold text-[var(--fg)]">
                          {formatFCFA(cost)}
                        </div>
                      </div>

                      {/* PRICE */}
                      <div className="space-y-1 text-center">
                        <div className="text-[9px] font-bold tracking-widest text-[rgba(var(--fgRGB),0.5)] uppercase">
                          PRICE
                        </div>
                        <div className="flex items-center justify-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleAdjustPrice(prod.id, -100)}
                            className="w-6 h-6 rounded-lg bg-[rgba(var(--fgRGB),0.06)] hover:bg-[rgba(var(--fgRGB),0.14)] border border-[rgba(var(--lineRGB),0.12)] flex items-center justify-center text-xs font-bold text-[var(--fg)] active:scale-90 transition cursor-pointer"
                            title="Decrease price"
                          >
                            −
                          </button>
                          <div className="text-[11px] font-bold text-[var(--fg)] leading-tight px-1 text-center whitespace-nowrap">
                            {formatFCFA(price)}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleAdjustPrice(prod.id, 100)}
                            className="w-6 h-6 rounded-lg bg-[rgba(var(--fgRGB),0.06)] hover:bg-[rgba(var(--fgRGB),0.14)] border border-[rgba(var(--lineRGB),0.12)] flex items-center justify-center text-xs font-bold text-[var(--fg)] active:scale-90 transition cursor-pointer"
                            title="Increase price"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* COMMISSION */}
                      <div className="space-y-1 text-right">
                        <div className="text-[9px] font-bold tracking-widest text-[rgba(var(--fgRGB),0.5)] uppercase">
                          COMMISSION
                        </div>
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => handleAdjustCommission(prod.id, -1)}
                            className="w-6 h-6 rounded-lg bg-[rgba(var(--fgRGB),0.06)] hover:bg-[rgba(var(--fgRGB),0.14)] border border-[rgba(var(--lineRGB),0.12)] flex items-center justify-center text-xs font-bold text-[var(--fg)] active:scale-90 transition cursor-pointer"
                            title="Decrease commission"
                          >
                            −
                          </button>
                          <div className="text-[11px] font-bold text-[var(--fg)] leading-tight px-1 min-w-[28px] text-center whitespace-nowrap">
                            {commission}%
                          </div>
                          <button
                            type="button"
                            onClick={() => handleAdjustCommission(prod.id, 1)}
                            className="w-6 h-6 rounded-lg bg-[rgba(var(--fgRGB),0.06)] hover:bg-[rgba(var(--fgRGB),0.14)] border border-[rgba(var(--lineRGB),0.12)] flex items-center justify-center text-xs font-bold text-[var(--fg)] active:scale-90 transition cursor-pointer"
                            title="Increase commission"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* PROFIT / UNIT */}
                    <div className="pt-2.5 border-t border-[rgba(var(--lineRGB),0.06)] flex items-center justify-between">
                      <span className="text-[9px] font-bold tracking-widest text-[rgba(var(--fgRGB),0.5)] uppercase">
                        PROFIT / UNIT
                      </span>
                      <span className="text-xs font-bold text-[#10B981]">
                        {formatFCFA(profitPerUnit)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Store Markup & Margin Rules (Collapsible Store Settings) */}
            <div className="p-4 rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.08)] space-y-3">
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[rgba(var(--fgRGB),0.5)] flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-amber-500" />
                <span>Global Store Markup & Approval Rules</span>
              </h4>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[rgba(var(--fgRGB),0.6)]">Default Retail Markup:</span>
                  <span className="font-bold text-[var(--acc)]">{pricingSettings.defaultMarkupPercent}%</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="60"
                  value={pricingSettings.defaultMarkupPercent}
                  onChange={e => updatePricingSettings({ defaultMarkupPercent: Number(e.target.value) })}
                  className="w-full accent-[var(--acc)] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[rgba(var(--fgRGB),0.6)]">Clerk Commission Rate:</span>
                  <span className="font-bold text-[var(--ok)]">{pricingSettings.clerkCommissionRate}%</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="0.5"
                  value={pricingSettings.clerkCommissionRate}
                  onChange={e => updatePricingSettings({ clerkCommissionRate: Number(e.target.value) })}
                  className="w-full accent-[var(--ok)] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[rgba(var(--fgRGB),0.6)]">Manager Approval Threshold:</span>
                  <span className="font-bold text-[var(--warn)]">{formatMoney(pricingSettings.approvalThreshold)}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="2000"
                  step="50"
                  value={pricingSettings.approvalThreshold}
                  onChange={e => updatePricingSettings({ approvalThreshold: Number(e.target.value) })}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}

        {/* PATRON TAB 5: MANAGE TEAM & ROLES */}
        {isPatron && selectedTab === 'team' && (
          <div className="space-y-4">
            {/* Store Hierarchy Summary */}
            <div className="p-3.5 rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.08)]">
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[rgba(var(--fgRGB),0.5)] mb-2">
                Store Organization Structure
              </h4>
              <div className="text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span>👑 Owner / Patron:</span>
                  <span className="font-bold">{R.owner} (1 user)</span>
                </div>
                <div className="flex justify-between">
                  <span>👔 Shift Managers:</span>
                  <span className="font-bold">2 Managers (Marc & Fatou)</span>
                </div>
                <div className="flex justify-between">
                  <span>📱 Frontline Clerks:</span>
                  <span className="font-bold">6 Clerks in 2 Teams</span>
                </div>
              </div>
            </div>

            {/* Team Managers List */}
            <div className="space-y-2">
              <span className="text-xs font-bold">Shift Managers (RBAC Level 2)</span>
              {managers.map(mgr => (
                <div key={mgr.id} className="p-3 rounded-xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.07)] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <img src={mgr.avatar} alt={mgr.name} className="w-9 h-9 rounded-xl object-cover" />
                    <div>
                      <div className="font-bold">{mgr.name}</div>
                      <div className="text-[10px] text-[var(--acc)] font-mono">{mgr.team} · Lead</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-[rgba(var(--fgRGB),0.5)]">{mgr.phone}</span>
                </div>
              ))}
            </div>

            {/* Team Clerks Reassignment */}
            <div className="space-y-2">
              <span className="text-xs font-bold">Assign Clerks to Teams</span>
              {teamClerks.map(c => (
                <div key={c.id} className="p-3 rounded-xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.07)] flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold">{c.name}</div>
                    <div className="text-[10px] text-[rgba(var(--fgRGB),0.5)]">Currently in {c.team}</div>
                  </div>
                  <button
                    onClick={() => {
                      const newT = c.team === 'Team Alpha' ? 'Team Beta' : 'Team Alpha';
                      const newMgr = managers.find(m => m.team === newT);
                      reassignClerkTeam(c.id, newT, newMgr.id, newMgr.name);
                    }}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-[var(--raise)] text-[var(--acc)] hover:bg-[var(--acc)] hover:text-white transition"
                  >
                    Move to {c.team === 'Team Alpha' ? 'Beta' : 'Alpha'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PATRON TAB 6: FIELD REQUESTS */}
        {isPatron && selectedTab === 'field' && (
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm">Requests from the Field</h4>
            {fieldRequests.map(fr => (
              <div key={fr.id} className="p-3.5 rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.08)] space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-xs">{fr.from}</div>
                    <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-[var(--raise)] text-[var(--acc)]">
                      {fr.type}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[rgba(var(--fgRGB),0.4)]">{fr.time}</span>
                </div>
                <p className="text-xs text-[rgba(var(--fgRGB),0.8)]">"{fr.text}"</p>
                {fr.status === 'Pending' ? (
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => approveFieldRequest(fr.id)}
                      className="flex-1 py-1 rounded-lg text-[10px] font-bold bg-[var(--ok)] text-white"
                    >
                      ✓ Approve Request
                    </button>
                    <button
                      onClick={() => rejectFieldRequest(fr.id)}
                      className="flex-1 py-1 rounded-lg text-[10px] font-bold bg-[var(--raise)] text-[var(--fg)]"
                    >
                      Decline
                    </button>
                  </div>
                ) : (
                  <div className="text-[10px] font-mono text-[var(--ok)] font-bold">
                    ✓ Status: {fr.status}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* PATRON TAB 7: REPORTS & EXPORT */}
        {isPatron && selectedTab === 'reports' && (
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm">Financial Reports & Exports</h4>
            <div className="space-y-2">
              {[
                { title: 'End-of-Day Register P&L Statement', desc: 'Cash vs MoMo rails, gross margin, tax' },
                { title: 'Weekly Store Performance Audit', desc: 'Sales breakdown by Team Alpha vs Team Beta' },
                { title: 'Clerk Payroll & Commission Export', desc: 'Commission tally for all 6 active clerks' },
                { title: 'Inventory Valuation & Tax Ledger', desc: 'Total asset inventory valuation by SKU' }
              ].map((r, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.07)] flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold">{r.title}</div>
                    <div className="text-[10px] text-[rgba(var(--fgRGB),0.5)]">{r.desc}</div>
                  </div>
                  <button
                    onClick={() => handleExportData(r.title)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[var(--acc)] text-white flex items-center gap-1 shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>CSV</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* ── NOTIFICATIONS / CHAT / PROFILE OVERLAYS ── */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      {activeNav === 'notifications' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[var(--bg)]">
          <div className="text-xs font-bold text-[rgba(var(--fgRGB),0.6)] uppercase font-mono">
            All Alerts ({notifCount})
          </div>
          {[
            { icon: '📦', title: t.lowStockAlert, msg: `${R.ocr[0]?.name} — ${R.ocr[0]?.stock} units left. Reorder?`, time: '5m ago', color: 'var(--warn)' },
            { icon: '🤖', title: t.reorderRequest, msg: `AI suggests reordering 20× ${R.ocr[1]?.name || 'Air Filter'}`, time: '1h ago', color: 'var(--acc)' },
            { icon: '📊', title: t.weeklyReport, msg: 'Your weekly analytics report is ready. Revenue up 14%.', time: '2h ago', color: 'var(--acc2)' },
            { icon: '✅', title: 'Pending Approval', msg: `${totalPendingApprovals} requests require authorization`, time: '10m ago', color: 'var(--bad)' },
          ].map((n, i) => (
            <div key={i} className="p-3.5 rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.07)] flex gap-3 items-start">
              <div className="text-xl shrink-0">{n.icon}</div>
              <div className="min-w-0 flex-1">
                <div className="font-bold text-xs" style={{ color: n.color }}>{n.title}</div>
                <div className="text-[11px] text-[rgba(var(--fgRGB),0.65)] mt-0.5">{n.msg}</div>
                <div className="text-[10px] font-mono text-[rgba(var(--fgRGB),0.4)] mt-1">{n.time}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeNav === 'chat' && (
        <div className="flex-1 flex flex-col p-4 bg-[var(--bg)] overflow-hidden">
          <div className="text-xs font-bold text-[rgba(var(--fgRGB),0.6)] uppercase font-mono mb-2 shrink-0">
            Store Communication Channel
          </div>

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
            {chatMessages.map(m => (
              <div key={m.id} className={`flex ${m.self ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-xs ${
                  m.self
                    ? 'rounded-br-sm text-[var(--onAcc)]'
                    : 'bg-[var(--card)] border border-[rgba(var(--lineRGB),0.08)] text-[var(--fg)] rounded-bl-sm'
                }`} style={m.self ? { background: 'var(--acc)' } : {}}>
                  {!m.self && <div className="font-bold text-[10px] text-[var(--acc)] mb-0.5">{m.sender} ({m.role})</div>}
                  {m.image && (
                    <img src={m.image} alt="Attachment" className="w-full h-24 object-cover rounded-lg mb-1.5 border border-[rgba(255,255,255,0.2)]" />
                  )}
                  <div>{m.text}</div>
                  <div className={`text-[9px] font-mono mt-1 ${m.self ? 'text-[rgba(0,0,0,0.4)]' : 'text-[rgba(var(--fgRGB),0.4)]'}`}>{m.time}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick chips */}
          <div className="flex gap-1.5 py-2 overflow-x-auto shrink-0 scrollbar-none">
            {['Count inventory', 'Customer price check', 'Need manager signature', 'Shift handoff OK'].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => setChatInputText(chip)}
                className="px-2.5 py-1 rounded-full text-[10px] bg-[var(--raise)] text-[rgba(var(--fgRGB),0.7)] hover:text-[var(--fg)] whitespace-nowrap border border-[rgba(var(--lineRGB),0.07)]"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Chat Input Bar with Camera & Voice */}
          <form onSubmit={handleSendChat} className="pt-2 flex items-center gap-2 shrink-0 border-t border-[rgba(var(--lineRGB),0.08)]">
            <button
              type="button"
              onClick={() => {
                setChatAttachedImage('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&auto=format&fit=crop');
                addToast('Photo Attached', 'Attached sample product photo to message', 'info');
              }}
              className="p-2 rounded-xl bg-[var(--raise)] text-[rgba(var(--fgRGB),0.7)] hover:text-[var(--acc)] transition"
              title="Attach Photo"
            >
              <Camera className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={toggleVoiceRecording}
              className={`p-2 rounded-xl transition ${isRecordingVoice ? 'bg-rose-500 text-white animate-pulse' : 'bg-[var(--raise)] text-[rgba(var(--fgRGB),0.7)] hover:text-[var(--acc)]'}`}
              title="Record Voice Note"
            >
              <Award className="w-4 h-4" />
            </button>

            <input
              value={chatInputText}
              onChange={e => setChatInputText(e.target.value)}
              className="flex-1 px-3 py-2 text-xs rounded-xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.1)] text-[var(--fg)] focus:outline-none focus:border-[var(--acc)]"
              placeholder={isRecordingVoice ? `Recording voice note (${voiceSeconds}s)…` : "Type message…"}
            />

            <button
              type="submit"
              className="p-2 rounded-xl text-xs font-bold"
              style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {activeNav === 'profile' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[var(--bg)]">
          <div className="p-4 rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.08)] flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center font-display font-black text-xl text-[var(--onAcc)] shadow-lg"
              style={{ background: isPatron ? '#F59E0B' : 'var(--acc)' }}
            >
              {isPatron ? R.owner?.slice(0, 2).toUpperCase() : activeManager.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="font-display font-bold text-base">
                {isPatron ? R.owner : activeManager.name}
              </div>
              <div className="text-xs text-[rgba(var(--fgRGB),0.55)]">{R.store}</div>
              <div className="text-[11px] font-mono text-[var(--acc)] mt-0.5">
                {isPatron ? '👑 Store Owner (Patron)' : `👔 ${activeManager.role} · ${activeManager.team}`}
              </div>
            </div>
          </div>

          {[
            { label: 'Store Name', value: R.store },
            { label: 'Active Plan', value: 'Growth Tier ($79/mo)' },
            { label: 'Total Clerks', value: '6 Staff members' },
            { label: 'Store Teams', value: 'Team Alpha & Team Beta' },
            { label: 'Currency', value: R.currLabel },
            { label: 'Region', value: `${R.city}, ${R.country}` },
          ].map((row, i) => (
            <div key={i} className="px-4 py-3 rounded-xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.07)] flex justify-between items-center text-xs">
              <span className="text-[rgba(var(--fgRGB),0.55)]">{row.label}</span>
              <span className="font-bold">{row.value}</span>
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
              onClick={() => setActiveNav(item.id)}
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
