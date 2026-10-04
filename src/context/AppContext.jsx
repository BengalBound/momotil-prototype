import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_PRODUCTS,
  INITIAL_CLERKS,
  INITIAL_TRANSACTIONS,
  INITIAL_TENANTS,
  INITIAL_FEATURE_FLAGS
} from '../data/mockData';
import {
  STORE_MANAGERS,
  INITIAL_TEAM_CLERKS,
  INITIAL_TASKS,
  INITIAL_INVENTORY_REQUESTS,
  INITIAL_FIELD_REQUESTS,
  INITIAL_AI_TICKETS,
  INITIAL_CHAT_MESSAGES,
  INITIAL_PRICING_SETTINGS
} from '../data/teamData';
import { REGIONS, GLOBAL_COUNTRIES, BN_DIGITS } from '../data/regionConfig';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Load state from localStorage or initial data
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('momotill_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [clerks, setClerks] = useState(() => {
    const saved = localStorage.getItem('momotill_clerks');
    return saved ? JSON.parse(saved) : INITIAL_CLERKS;
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('momotill_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [tenants, setTenants] = useState(() => {
    const saved = localStorage.getItem('momotill_tenants');
    return saved ? JSON.parse(saved) : INITIAL_TENANTS;
  });

  const [featureFlags, setFeatureFlags] = useState(() => {
    const saved = localStorage.getItem('momotill_flags');
    return saved ? JSON.parse(saved) : INITIAL_FEATURE_FLAGS;
  });

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('momotill_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentClerk, setCurrentClerk] = useState(() => {
    const saved = localStorage.getItem('momotill_current_clerk');
    return saved ? JSON.parse(saved) : INITIAL_CLERKS[0]; // Amara by default for quick presentation demo
  });

  // Store Management & Team Structure (1 Patron, 2 Managers, 6 Clerks in 2 Teams)
  const [managers, setManagers] = useState(() => {
    const saved = localStorage.getItem('momotill_managers');
    return saved ? JSON.parse(saved) : STORE_MANAGERS;
  });

  const [teamClerks, setTeamClerks] = useState(() => {
    const saved = localStorage.getItem('momotill_team_clerks');
    return saved ? JSON.parse(saved) : INITIAL_TEAM_CLERKS;
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('momotill_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [inventoryRequests, setInventoryRequests] = useState(() => {
    const saved = localStorage.getItem('momotill_inv_requests');
    return saved ? JSON.parse(saved) : INITIAL_INVENTORY_REQUESTS;
  });

  const [fieldRequests, setFieldRequests] = useState(() => {
    const saved = localStorage.getItem('momotill_field_requests');
    return saved ? JSON.parse(saved) : INITIAL_FIELD_REQUESTS;
  });

  const [aiTickets, setAiTickets] = useState(() => {
    const saved = localStorage.getItem('momotill_ai_tickets');
    return saved ? JSON.parse(saved) : INITIAL_AI_TICKETS;
  });

  const [chatMessages, setChatMessages] = useState(() => {
    const saved = localStorage.getItem('momotill_chat_msgs');
    return saved ? JSON.parse(saved) : INITIAL_CHAT_MESSAGES;
  });

  const [pricingSettings, setPricingSettings] = useState(() => {
    const saved = localStorage.getItem('momotill_pricing');
    return saved ? JSON.parse(saved) : INITIAL_PRICING_SETTINGS;
  });

  const [impersonatedUser, setImpersonatedUser] = useState(null);
  const [isOffline, setIsOffline] = useState(false);
  const [offlinePendingQueue, setOfflinePendingQueue] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [mobileFrameMode, setMobileFrameMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [theme, setTheme] = useState(() => localStorage.getItem('bound_theme') || 'dark');
  const [regionCode, setRegionCode] = useState(() => localStorage.getItem('bound_region') || 'en');
  const [language, setLanguage] = useState(() => localStorage.getItem('bound_lang') || 'en');

  // Active region data
  const currentRegion = REGIONS[regionCode] || REGIONS.en;

  // Apply theme and region CSS variables to html root
  useEffect(() => {
    localStorage.setItem('bound_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('bound_region', regionCode);
    const R = currentRegion;
    const rootStyle = document.documentElement.style;
    rootStyle.setProperty('--acc', R.acc);
    rootStyle.setProperty('--acc2', R.acc2);
    rootStyle.setProperty('--accSoft', R.accSoft);
    rootStyle.setProperty('--nfont', R.font);
    rootStyle.setProperty('--flag', R.flag);
  }, [regionCode, currentRegion]);

  useEffect(() => {
    localStorage.setItem('bound_lang', language);
  }, [language]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Regional formatters
  const formatMoney = (amount) => {
    const R = currentRegion;
    let s = String(Math.round(amount)).replace(/\B(?=(\d{3})+(?!\d))/g, R.sep);
    if (R.bn && language === 'bn') {
      s = s.replace(/[0-9]/g, d => BN_DIGITS[d]);
    }
    return R.pre ? `${R.curr} ${s}` : `${s} ${R.curr}`;
  };

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('momotill_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('momotill_clerks', JSON.stringify(clerks));
  }, [clerks]);

  useEffect(() => {
    localStorage.setItem('momotill_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('momotill_tenants', JSON.stringify(tenants));
  }, [tenants]);

  useEffect(() => {
    localStorage.setItem('momotill_flags', JSON.stringify(featureFlags));
  }, [featureFlags]);

  useEffect(() => {
    localStorage.setItem('momotill_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (currentClerk) {
      localStorage.setItem('momotill_current_clerk', JSON.stringify(currentClerk));
    } else {
      localStorage.removeItem('momotill_current_clerk');
    }
  }, [currentClerk]);

  // Audio helper
  const playSoundEffect = (type = 'add') => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'add') {
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.12); // A5
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
      } else if (type === 'success') {
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, audioCtx.currentTime + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, audioCtx.currentTime + 0.2); // G5
        gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.35);
      }
    } catch (e) {
      // AudioContext fallback
    }
  };

  // Toast Notification dispatcher
  const addToast = (title, message, type = 'info') => {
    const id = Date.now() + Math.random().toString(36).substr(2, 5);
    const newToast = { id, title, message, type };
    setToasts(prev => [newToast, ...prev].slice(0, 4));

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Cart operations
  const addToCart = (product, qty = 1) => {
    if (product.stock <= 0) {
      addToast('Out of Stock', `${product.name} is currently out of stock.`, 'error');
      return false;
    }

    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, qty: Math.min(product.stock, item.qty + qty) }
            : item
        );
      } else {
        return [...prev, { product, qty: Math.min(product.stock, qty) }];
      }
    });

    playSoundEffect('add');
    addToast('Item Added', `${product.name} added to cart`, 'success');
    return true;
  };

  const updateCartQty = (productId, qty) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, qty } : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Checkout & Order Creation
  const processCheckout = async (orderInfo) => {
    const total = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);
    const orderId = 'TXN-' + Math.floor(1000 + Math.random() * 9000);

    const requiresApproval = total > 800 || orderInfo.discountApplied;

    const newTransaction = {
      id: orderId,
      clerkName: currentClerk ? currentClerk.name : 'Amara Okonkwo',
      customerName: orderInfo.customerName || 'Walk-in Customer',
      customerPhone: orderInfo.customerPhone || 'N/A',
      itemsCount: cart.reduce((sum, item) => sum + item.qty, 0),
      items: cart.map(i => ({ name: i.product.name, qty: i.qty, price: i.product.price })),
      total: Number(total.toFixed(2)),
      paymentMethod: orderInfo.paymentMethod || 'Mobile Money (MoMo)',
      status: requiresApproval ? 'Pending' : 'Completed',
      requiresApproval,
      approvalReason: requiresApproval ? (total > 800 ? 'High-value transaction > $800' : 'Clerk manual discount override') : null,
      timestamp: 'Just now',
      date: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };

    if (isOffline) {
      setOfflinePendingQueue(prev => [...prev, newTransaction]);
      addToast('Offline Order Saved', `Order ${orderId} saved locally. Will auto-sync when online.`, 'warning');
    } else {
      // Deduct inventory
      setProducts(prev =>
        prev.map(prod => {
          const cartItem = cart.find(c => c.product.id === prod.id);
          if (cartItem) {
            return { ...prod, stock: Math.max(0, prod.stock - cartItem.qty) };
          }
          return prod;
        })
      );
      setTransactions(prev => [newTransaction, ...prev]);
    }

    clearCart();
    playSoundEffect('success');
    return newTransaction;
  };

  // Sync Offline Queue
  const syncOfflineData = () => {
    if (offlinePendingQueue.length === 0) {
      addToast('Synced', 'All transactions are up to date.', 'info');
      return;
    }
    setTransactions(prev => [...offlinePendingQueue, ...prev]);
    const count = offlinePendingQueue.length;
    setOfflinePendingQueue([]);
    setIsOffline(false);
    addToast('Sync Complete', `Successfully uploaded ${count} queued transactions to cloud server.`, 'success');
  };

  // Clerk actions
  const addClerk = (newClerkData) => {
    const newClerk = {
      id: 'clk-' + (100 + clerks.length + 1),
      salesToday: 0,
      ordersToday: 0,
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&auto=format&fit=crop&q=80',
      ...newClerkData
    };
    setClerks(prev => [newClerk, ...prev]);
    addToast('Clerk Created', `${newClerk.name} added to store team`, 'success');
  };

  const updateClerkPermissions = (clerkId, permissionKey, value) => {
    setClerks(prev =>
      prev.map(c =>
        c.id === clerkId
          ? { ...c, permissions: { ...c.permissions, [permissionKey]: value } }
          : c
      )
    );
    addToast('Permissions Updated', 'Clerk access rights adjusted successfully.', 'info');
  };

  const toggleClerkStatus = (clerkId) => {
    setClerks(prev =>
      prev.map(c =>
        c.id === clerkId
          ? { ...c, status: c.status === 'Active' ? 'Inactive' : 'Active' }
          : c
      )
    );
  };

  // Transaction Approvals
  const approveTransaction = (txnId) => {
    setTransactions(prev =>
      prev.map(t => (t.id === txnId ? { ...t, status: 'Approved', requiresApproval: false } : t))
    );
    addToast('Transaction Approved', `Order #${txnId} has been authorized by CEO`, 'success');
  };

  const rejectTransaction = (txnId, reason = 'Price or payment discrepancy') => {
    setTransactions(prev =>
      prev.map(t => (t.id === txnId ? { ...t, status: 'Rejected', rejectionReason: reason } : t))
    );
    addToast('Transaction Rejected', `Order #${txnId} was rejected: ${reason}`, 'warning');
  };

  // Product Inventory Actions
  const addProduct = (prodData) => {
    const newProd = {
      id: 'prod-' + (products.length + 1),
      barcode: '880609' + Math.floor(1000000 + Math.random() * 9000000),
      ...prodData
    };
    setProducts(prev => [newProd, ...prev]);
    addToast('Product Added', `${newProd.name} added to catalog`, 'success');
  };

  const restockProduct = (prodId, amount = 10) => {
    setProducts(prev =>
      prev.map(p =>
        p.id === prodId ? { ...p, stock: p.stock + Number(amount) } : p
      )
    );
    addToast('Stock Updated', `Restocked item with +${amount} units`, 'success');
  };

  // Tenant SaaS Actions
  const createTenant = (tenantData) => {
    const newTenant = {
      id: 'tnt-' + String(tenants.length + 1).padStart(3, '0'),
      clerksCount: 1,
      todaySales: '$0.00',
      monthlyRevenue: '$0.00',
      createdDate: new Date().toISOString().substring(0, 10),
      status: 'Active',
      fullDomain: `${tenantData.subdomain}.momotill.io`,
      ...tenantData
    };
    setTenants(prev => [newTenant, ...prev]);
    addToast('Tenant Deployed', `${newTenant.name} (${newTenant.fullDomain}) initialized!`, 'success');
  };

  const toggleTenantStatus = (tenantId) => {
    setTenants(prev =>
      prev.map(t =>
        t.id === tenantId
          ? { ...t, status: t.status === 'Active' ? 'Suspended' : 'Active' }
          : t
      )
    );
  };

  // Impersonate User
  const impersonate = (user) => {
    setImpersonatedUser(user);
    addToast('Impersonation Active', `Simulating session as ${user.name} (${user.role})`, 'warning');
  };

  const exitImpersonation = () => {
    setImpersonatedUser(null);
    addToast('Exited Impersonation', 'Restored Master Admin administrative privileges.', 'info');
  };

  // Toggle Feature Flag
  const toggleFeatureFlag = (key) => {
    setFeatureFlags(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    addToast('Feature Flag Toggled', `${key} is now ${!featureFlags[key] ? 'ENABLED' : 'DISABLED'}`, 'info');
  };

  // Reset to initial mock data
  const resetAllData = () => {
    localStorage.removeItem('momotill_products');
    localStorage.removeItem('momotill_clerks');
    localStorage.removeItem('momotill_transactions');
    localStorage.removeItem('momotill_tenants');
    localStorage.removeItem('momotill_flags');
    localStorage.removeItem('momotill_cart');
    localStorage.removeItem('momotill_current_clerk');

    setProducts(INITIAL_PRODUCTS);
    setClerks(INITIAL_CLERKS);
    setTransactions(INITIAL_TRANSACTIONS);
    setTenants(INITIAL_TENANTS);
    setFeatureFlags(INITIAL_FEATURE_FLAGS);
    setCart([]);
    setCurrentClerk(INITIAL_CLERKS[0]);
    setIsOffline(false);
    setOfflinePendingQueue([]);
    setImpersonatedUser(null);

    addToast('Data Reset', 'All demonstration state reset to pristine defaults.', 'success');
  };

  // Store Team & Task Actions
  const assignTask = (taskData) => {
    const newTask = {
      id: 'tsk-' + Date.now(),
      status: 'To Do',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ...taskData
    };
    setTasks(prev => [newTask, ...prev]);
    playSoundEffect('success');
    addToast('Task Assigned', `Assigned to ${taskData.assignedTo} (${taskData.team})`, 'success');
    return newTask;
  };

  const updateTaskStatus = (taskId, newStatus, proofPhoto = null) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === taskId
          ? {
              ...t,
              status: newStatus,
              proofPhoto: proofPhoto || t.proofPhoto,
              completedAt: newStatus === 'Completed' ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : t.completedAt
            }
          : t
      )
    );
    playSoundEffect(newStatus === 'Completed' ? 'success' : 'add');
    addToast('Task Updated', `Task marked as "${newStatus}"`, 'info');
  };

  // Inventory Requests Actions (Clerks propose, Managers & Patron approve)
  const submitInventoryRequest = (reqData) => {
    const newReq = {
      id: 'REQ-INV-' + Math.floor(100 + Math.random() * 900),
      status: 'Pending',
      timestamp: 'Just now',
      ...reqData
    };
    setInventoryRequests(prev => [newReq, ...prev]);
    playSoundEffect('success');
    addToast('Stock Update Requested', 'Submitted for Manager & Patron approval', 'info');
    return newReq;
  };

  const approveInventoryRequest = (reqId) => {
    const req = inventoryRequests.find(r => r.id === reqId);
    if (!req) return;
    setInventoryRequests(prev =>
      prev.map(r => (r.id === reqId ? { ...r, status: 'Approved' } : r))
    );
    // Update product stock in catalog if matching item exists
    setProducts(prev =>
      prev.map(p => {
        if (p.name.toLowerCase() === req.productName.toLowerCase() || p.sku === req.sku) {
          return { ...p, stock: Number(req.requestedStock) };
        }
        return p;
      })
    );
    playSoundEffect('success');
    addToast('Inventory Approved', `Stock for ${req.productName} updated to ${req.requestedStock} units`, 'success');
  };

  const rejectInventoryRequest = (reqId, reason = 'Discrepancy in count') => {
    setInventoryRequests(prev =>
      prev.map(r => (r.id === reqId ? { ...r, status: 'Rejected', rejectionReason: reason } : r))
    );
    addToast('Request Rejected', `Inventory request rejected: ${reason}`, 'warning');
  };

  // Field Requests Actions (Escalated to Patron)
  const submitFieldRequest = (reqData) => {
    const newReq = {
      id: 'FLD-' + Math.floor(100 + Math.random() * 900),
      status: 'Pending',
      time: 'Just now',
      ...reqData
    };
    setFieldRequests(prev => [newReq, ...prev]);
    playSoundEffect('success');
    addToast('Field Request Escalated', 'Sent to Patron approval queue', 'info');
  };

  const approveFieldRequest = (reqId) => {
    setFieldRequests(prev =>
      prev.map(r => (r.id === reqId ? { ...r, status: 'Approved' } : r))
    );
    playSoundEffect('success');
    addToast('Field Request Approved', 'Action authorized by Patron', 'success');
  };

  const rejectFieldRequest = (reqId) => {
    setFieldRequests(prev =>
      prev.map(r => (r.id === reqId ? { ...r, status: 'Rejected' } : r))
    );
    addToast('Field Request Rejected', 'Declined by Patron', 'warning');
  };

  // AI Tickets Actions
  const resolveAiTicket = (ticketId, actionTaken = 'Auto-reorder initiated') => {
    setAiTickets(prev =>
      prev.map(t => (t.id === ticketId ? { ...t, status: 'Resolved', actionTaken } : t))
    );
    playSoundEffect('success');
    addToast('AI Ticket Resolved', actionTaken, 'success');
  };

  // Chat Actions
  const sendChatMessage = (msgData) => {
    const newMsg = {
      id: 'msg-' + Date.now(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      ...msgData
    };
    setChatMessages(prev => [...prev, newMsg]);
    playSoundEffect('add');
    return newMsg;
  };

  // Pricing & Commissions Settings
  const updatePricingSettings = (newSettings) => {
    setPricingSettings(prev => ({ ...prev, ...newSettings }));
    addToast('Pricing Updated', 'Store markup & commission settings updated', 'success');
  };

  const reassignClerkTeam = (clerkId, newTeam, newManagerId, newManagerName) => {
    setTeamClerks(prev =>
      prev.map(c =>
        c.id === clerkId
          ? { ...c, team: newTeam, managerId: newManagerId, managerName: newManagerName }
          : c
      )
    );
    addToast('Team Reassigned', `Clerk moved to ${newTeam} under ${newManagerName}`, 'info');
  };

  return (
    <AppContext.Provider
      value={{
        products,
        addProduct,
        restockProduct,
        cart,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        processCheckout,
        clerks,
        addClerk,
        updateClerkPermissions,
        toggleClerkStatus,
        transactions,
        approveTransaction,
        rejectTransaction,
        tenants,
        createTenant,
        toggleTenantStatus,
        featureFlags,
        toggleFeatureFlag,
        currentClerk,
        setCurrentClerk,
        impersonatedUser,
        impersonate,
        exitImpersonation,
        isOffline,
        setIsOffline,
        offlinePendingQueue,
        syncOfflineData,
        toasts,
        addToast,
        removeToast,
        mobileFrameMode,
        setMobileFrameMode,
        soundEnabled,
        setSoundEnabled,
        theme,
        setTheme,
        toggleTheme,
        regionCode,
        setRegionCode,
        currentRegion,
        formatMoney,
        language,
        setLanguage,
        resetAllData,
        playSoundEffect,
        // Team, Roles, Tasks & Approvals
        managers,
        setManagers,
        teamClerks,
        setTeamClerks,
        tasks,
        assignTask,
        updateTaskStatus,
        inventoryRequests,
        submitInventoryRequest,
        approveInventoryRequest,
        rejectInventoryRequest,
        fieldRequests,
        submitFieldRequest,
        approveFieldRequest,
        rejectFieldRequest,
        aiTickets,
        resolveAiTicket,
        chatMessages,
        sendChatMessage,
        pricingSettings,
        updatePricingSettings,
        reassignClerkTeam
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
