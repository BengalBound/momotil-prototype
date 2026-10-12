import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp, Package, Users, DollarSign, Award,
  Sparkles, CheckCircle2, ChevronRight, ChevronDown, Search, X,
  ArrowUpRight, BarChart3, Zap, Filter, Calendar, UserCheck,
  Flame, ArrowUpDown, Check, RefreshCw, Sliders, Settings2
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area,
  XAxis, YAxis, Tooltip
} from 'recharts';
import {
  calculateProductSalesAnalytics,
  EXTENDED_TRANSACTIONS
} from '../../data/salesAnalyticsData';

export const MobileProductSalesAnalytics = ({
  role = 'vendor', // 'vendor' | 'manager' | 'owner'
  vendorLock = null, // Fixed clerk name if vendor (e.g., "Amara Okonkwo")
  managerTeam = null, // e.g., "Team Alpha" | "Team Beta"
  title = null
}) => {
  const {
    transactions,
    products,
    currentRegion,
    formatMoney,
    teamClerks,
    pricingSettings,
    updatePricingSettings
  } = useApp();

  const R = currentRegion;

  // ── Store Commission Policy Configuration ────────────────────────────────
  const isCommissionActive = pricingSettings?.commissionEnabled !== false && Number(pricingSettings?.clerkCommissionRate ?? 5) > 0;
  const activeCommissionRate = isCommissionActive ? Number(pricingSettings?.clerkCommissionRate ?? 5) : 0;

  // ── Mobile Navigation & View States ───────────────────────────────────────
  // Primary view tabs: 'leaderboard' (Which products sell more) | 'trends' (Chart & velocity) | 'team' (Who sold what)
  const [activeTab, setActiveTab] = useState('leaderboard');
  const [timeRange, setTimeRange] = useState('7d'); // 'today' | '7d' | '30d'
  const [selectedVendor, setSelectedVendor] = useState(vendorLock || 'all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState('all');
  const [sortMetric, setSortMetric] = useState('units'); // 'units' | 'revenue'
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [showFilterDrawer, setShowFilterDrawer] = useState(null); // 'vendor' | 'category' | null
  const [showCommissionModal, setShowCommissionModal] = useState(false);

  // Available vendor list
  const availableClerks = useMemo(() => {
    if (role === 'vendor') return [];
    const base = teamClerks && teamClerks.length > 0 ? teamClerks : [
      { id: 'clk-101', name: 'Amara Okonkwo', team: 'Team Alpha' },
      { id: 'clk-102', name: 'Kwame Mensah', team: 'Team Alpha' },
      { id: 'clk-103', name: 'Zainab Bello', team: 'Team Alpha' },
      { id: 'clk-104', name: 'Emmanuel Acheampong', team: 'Team Beta' },
      { id: 'clk-105', name: 'Fatima Al-Hassan', team: 'Team Beta' },
      { id: 'clk-106', name: 'Blessing Nwosu', team: 'Team Beta' }
    ];
    if (role === 'manager' && managerTeam) {
      return base.filter(c => c.team === managerTeam);
    }
    return base;
  }, [role, managerTeam, teamClerks]);

  // Categories list
  const categories = useMemo(() => {
    const set = new Set();
    products.forEach(p => { if (p.category) set.add(p.category); });
    EXTENDED_TRANSACTIONS.forEach(t => {
      (t.items || []).forEach(i => { if (i.category) set.add(i.category); });
    });
    return Array.from(set);
  }, [products]);

  // Analytics calculation with dynamic store commission policy
  const effectiveVendor = role === 'vendor' ? (vendorLock || selectedVendor) : selectedVendor;
  const analyticsData = useMemo(() => {
    return calculateProductSalesAnalytics(transactions, {
      vendor: effectiveVendor,
      product: selectedProduct,
      timeRange,
      managerTeam: role === 'manager' && selectedVendor === 'all' ? managerTeam : null,
      commissionEnabled: isCommissionActive,
      commissionRate: activeCommissionRate
    });
  }, [transactions, effectiveVendor, selectedProduct, timeRange, role, managerTeam, isCommissionActive, activeCommissionRate]);

  const {
    kpis,
    productsByUnits,
    productsByRevenue,
    timeline,
    vendorBreakdown
  } = analyticsData;

  // Filtered and sorted products list
  const filteredProducts = useMemo(() => {
    const base = sortMetric === 'revenue' ? productsByRevenue : productsByUnits;
    if (selectedCategory === 'all') return base;
    return base.filter(p => p.category === selectedCategory);
  }, [sortMetric, productsByRevenue, productsByUnits, selectedCategory]);

  // Max value for visual relative progress bars
  const maxMetricValue = useMemo(() => {
    if (filteredProducts.length === 0) return 1;
    return sortMetric === 'revenue'
      ? Math.max(...filteredProducts.map(p => p.totalRevenue), 1)
      : Math.max(...filteredProducts.map(p => p.unitsSold), 1);
  }, [filteredProducts, sortMetric]);

  // Simplified timeline for mobile Area Chart
  const mobileTimelineData = useMemo(() => {
    return timeline.slice(-7).map(t => ({
      label: t.displayLabel,
      revenue: Math.round(t.revenue),
      units: t.units
    }));
  }, [timeline]);

  const activeVendorDisplayName = role === 'vendor'
    ? (vendorLock || R.clerk)
    : selectedVendor === 'all'
      ? (role === 'manager' ? `${managerTeam || 'Team'} All` : 'All Vendors')
      : selectedVendor;

  const hasActiveFilters = (role !== 'vendor' && selectedVendor !== 'all') || selectedCategory !== 'all' || selectedProduct !== 'all';

  return (
    <div className="space-y-3 pb-16 select-none text-xs animate-fadeIn relative">
      {/* ── 1. NATIVE MOBILE HEADER CARD & HERO METRIC ── */}
      <div className="p-4 rounded-3xl bg-gradient-to-b from-[var(--card)] to-[var(--raise)] border border-[rgba(var(--lineRGB),0.1)] shadow-sm space-y-3">
        {/* Role & Time Range Row */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0 shadow-sm"
              style={{
                background: role === 'owner' ? '#F59E0B' : role === 'manager' ? '#3B82F6' : '#10B981'
              }}
            />
            <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-[rgba(var(--fgRGB),0.6)] truncate">
              {role === 'owner' ? '👑 Owner' : role === 'manager' ? `👔 ${managerTeam || 'Manager'}` : `🟢 ${activeVendorDisplayName}`}
            </span>
          </div>

          {/* Time Filter Segmented Switcher */}
          <div className="flex items-center p-0.5 rounded-full bg-[rgba(var(--bgRGB),0.6)] border border-[rgba(var(--lineRGB),0.1)] shrink-0">
            {[
              { id: 'today', label: 'Today' },
              { id: '7d', label: '7D' },
              { id: '30d', label: '30D' }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setTimeRange(t.id)}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition ${
                  timeRange === t.id
                    ? 'bg-[var(--acc)] text-[var(--onAcc)] shadow-xs'
                    : 'text-[rgba(var(--fgRGB),0.55)] hover:text-[var(--fg)]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Hero Revenue Display */}
        <div className="pt-1">
          <div className="text-[10px] uppercase font-bold tracking-wider text-[rgba(var(--fgRGB),0.45)]">
            {role === 'vendor' ? 'My Gross Sales' : role === 'manager' ? `${managerTeam || 'Team'} Shift Sales` : 'Store Total Gross Sales'}
          </div>
          <div className="flex items-baseline justify-between gap-2 mt-0.5">
            <div className="font-display font-black text-3xl tracking-tight text-[var(--fg)]">
              {formatMoney(kpis.totalRevenue)}
            </div>
            <div className="flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{kpis.totalUnitsSold} items</span>
            </div>
          </div>
        </div>

        {/* Tailored Secondary Metrics */}
        {role === 'vendor' ? (
          isCommissionActive ? (
            /* Commission Card (Only shown if store operates with commission) */
            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm shadow-inner">
                  💰
                </div>
                <div>
                  <div className="text-[9px] uppercase font-bold text-[rgba(var(--fgRGB),0.55)]">
                    My Commission Earned
                  </div>
                  <div className="font-display font-black text-sm text-emerald-400">
                    {formatMoney(kpis.totalProfit * (activeCommissionRate / 100))}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-[var(--card)] text-[rgba(var(--fgRGB),0.7)] border border-[rgba(var(--lineRGB),0.1)]">
                  {activeCommissionRate}% rate
                </span>
                <div className="text-[9px] text-[rgba(var(--fgRGB),0.45)] mt-0.5">
                  {kpis.totalOrders} transactions
                </div>
              </div>
            </div>
          ) : (
            /* Flat Wage / Zero-Commission Mode Card for Vendor */
            <div className="p-3 rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.09)] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[var(--raise)] text-[var(--acc)] flex items-center justify-center font-bold text-sm">
                  🏷️
                </div>
                <div>
                  <div className="text-[9px] uppercase font-bold text-[rgba(var(--fgRGB),0.55)]">
                    Store Policy: Flat Wage Mode
                  </div>
                  <div className="font-display font-bold text-xs text-[var(--fg)]">
                    {kpis.totalOrders} Completed Orders ({kpis.totalUnitsSold} items)
                  </div>
                </div>
              </div>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[var(--raise)] text-[rgba(var(--fgRGB),0.6)] border border-[rgba(var(--lineRGB),0.08)]">
                Zero Commission
              </span>
            </div>
          )
        ) : (
          /* Manager & Owner Quick Metrics */
          <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[rgba(var(--lineRGB),0.07)] text-[10px]">
            <div className="p-2.5 rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.06)]">
              <span className="text-[rgba(var(--fgRGB),0.45)] block uppercase font-mono text-[9px]">Avg Order Value</span>
              <strong className="text-xs font-mono font-bold text-[var(--fg)]">{formatMoney(kpis.avgBasketValue)}</strong>
            </div>
            <div className="p-2.5 rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.06)]">
              <span className="text-[rgba(var(--fgRGB),0.45)] block uppercase font-mono text-[9px]">Profit Margin</span>
              <strong className="text-xs font-mono font-bold text-emerald-400">{kpis.profitMargin}% margin</strong>
            </div>
          </div>
        )}
      </div>

      {/* ── 2. MOBILE QUICK FILTER PILLS & OWNER COMMISSION TRIGGER ── */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none px-0.5">
        {/* Store Owner Quick Commission Policy Pill */}
        {role === 'owner' && (
          <button
            onClick={() => setShowCommissionModal(true)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border whitespace-nowrap transition active:scale-95 ${
              isCommissionActive
                ? 'bg-amber-500/15 text-amber-400 border-amber-500/30 shadow-xs'
                : 'bg-[var(--card)] text-[rgba(var(--fgRGB),0.6)] border-[rgba(var(--lineRGB),0.12)]'
            }`}
          >
            <span>💰</span>
            <span>Comm: {isCommissionActive ? `${activeCommissionRate}%` : 'Off (0%)'}</span>
            <Sliders className="w-3 h-3 opacity-60" />
          </button>
        )}

        {/* Vendor Selector Pill (Manager & Owner) */}
        {role !== 'vendor' && (
          <button
            onClick={() => setShowFilterDrawer(showFilterDrawer === 'vendor' ? null : 'vendor')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-bold border whitespace-nowrap transition active:scale-95 ${
              selectedVendor !== 'all'
                ? 'bg-[var(--acc)] text-[var(--onAcc)] border-[var(--acc)] shadow-xs'
                : 'bg-[var(--card)] text-[rgba(var(--fgRGB),0.75)] border-[rgba(var(--lineRGB),0.12)]'
            }`}
          >
            <Users className="w-3 h-3" />
            <span className="max-w-[110px] truncate">
              {selectedVendor === 'all' ? 'All Vendors' : selectedVendor.split(' ')[0]}
            </span>
            <ChevronDown className="w-3 h-3 opacity-60" />
          </button>
        )}

        {/* Category Selector Pill */}
        <button
          onClick={() => setShowFilterDrawer(showFilterDrawer === 'category' ? null : 'category')}
          className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-bold border whitespace-nowrap transition active:scale-95 ${
            selectedCategory !== 'all'
              ? 'bg-[var(--acc)] text-[var(--onAcc)] border-[var(--acc)] shadow-xs'
              : 'bg-[var(--card)] text-[rgba(var(--fgRGB),0.75)] border-[rgba(var(--lineRGB),0.12)]'
          }`}
        >
          <Package className="w-3 h-3" />
          <span className="max-w-[110px] truncate">
            {selectedCategory === 'all' ? 'All Categories' : selectedCategory}
          </span>
          <ChevronDown className="w-3 h-3 opacity-60" />
        </button>

        {/* Clear Filters Button (If filtered) */}
        {hasActiveFilters && (
          <button
            onClick={() => {
              setSelectedVendor(vendorLock || 'all');
              setSelectedCategory('all');
              setSelectedProduct('all');
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full text-[10px] font-bold bg-[var(--badSoft)] text-[var(--bad)] border border-[var(--bad)]/20 whitespace-nowrap"
          >
            <X className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* ── Filter Dropdown Drawer ── */}
      {showFilterDrawer && (
        <div className="p-3 rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.15)] shadow-md space-y-2 animate-fadeIn">
          <div className="flex items-center justify-between pb-1 border-b border-[rgba(var(--lineRGB),0.08)]">
            <span className="font-bold text-[11px] uppercase tracking-wider text-[rgba(var(--fgRGB),0.6)]">
              {showFilterDrawer === 'vendor' ? 'Select Vendor / Clerk' : 'Select Category'}
            </span>
            <button
              onClick={() => setShowFilterDrawer(null)}
              className="p-1 text-[rgba(var(--fgRGB),0.5)] hover:text-[var(--fg)]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5 max-h-36 overflow-y-auto pt-1">
            {showFilterDrawer === 'vendor' ? (
              <>
                <button
                  onClick={() => { setSelectedVendor('all'); setShowFilterDrawer(null); }}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold transition border ${
                    selectedVendor === 'all'
                      ? 'bg-[var(--acc)] text-[var(--onAcc)] border-[var(--acc)]'
                      : 'bg-[var(--raise)] text-[rgba(var(--fgRGB),0.7)] border-[rgba(var(--lineRGB),0.08)]'
                  }`}
                >
                  👥 All Clerks
                </button>
                {availableClerks.map(c => (
                  <button
                    key={c.id || c.name}
                    onClick={() => { setSelectedVendor(c.name); setShowFilterDrawer(null); }}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold transition border ${
                      selectedVendor === c.name
                        ? 'bg-[var(--acc)] text-[var(--onAcc)] border-[var(--acc)]'
                        : 'bg-[var(--raise)] text-[rgba(var(--fgRGB),0.7)] border-[rgba(var(--lineRGB),0.08)]'
                    }`}
                  >
                    👤 {c.name}
                  </button>
                ))}
              </>
            ) : (
              <>
                <button
                  onClick={() => { setSelectedCategory('all'); setShowFilterDrawer(null); }}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold transition border ${
                    selectedCategory === 'all'
                      ? 'bg-[var(--acc)] text-[var(--onAcc)] border-[var(--acc)]'
                      : 'bg-[var(--raise)] text-[rgba(var(--fgRGB),0.7)] border-[rgba(var(--lineRGB),0.08)]'
                  }`}
                >
                  All Categories
                </button>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); setShowFilterDrawer(null); }}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold transition border ${
                      selectedCategory === cat
                        ? 'bg-[var(--acc)] text-[var(--onAcc)] border-[var(--acc)]'
                        : 'bg-[var(--raise)] text-[rgba(var(--fgRGB),0.7)] border-[rgba(var(--lineRGB),0.08)]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </>
            )}
          </div>
        </div>
      )}

      {/* ── 3. STORE OWNER COMMISSION CONFIGURATION MODAL ── */}
      {showCommissionModal && (
        <div className="p-4 rounded-3xl bg-[var(--card)] border-2 border-amber-500/30 shadow-xl space-y-3.5 animate-fadeIn">
          <div className="flex items-center justify-between pb-2 border-b border-[rgba(var(--lineRGB),0.08)]">
            <div className="flex items-center gap-2">
              <span className="text-base">💰</span>
              <div>
                <h4 className="font-display font-bold text-xs text-[var(--fg)]">Store Commission Settings</h4>
                <p className="text-[10px] text-[rgba(var(--fgRGB),0.5)]">Configure staff commission or set flat salary</p>
              </div>
            </div>
            <button
              onClick={() => setShowCommissionModal(false)}
              className="p-1 rounded-lg text-[rgba(var(--fgRGB),0.5)] hover:text-[var(--fg)]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Master Toggle */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[var(--raise)] border border-[rgba(var(--lineRGB),0.08)]">
            <div>
              <span className="font-bold text-xs text-[var(--fg)] block">Enable Sales Commission</span>
              <span className="text-[10px] text-[rgba(var(--fgRGB),0.5)]">
                {isCommissionActive ? 'Clerks earn commission on margin' : 'Disabled — Fixed wage store'}
              </span>
            </div>
            <button
              onClick={() => {
                updatePricingSettings({
                  commissionEnabled: !isCommissionActive,
                  clerkCommissionRate: isCommissionActive ? 0 : 5.0
                });
              }}
              className={`px-3 py-1.5 rounded-full text-[10px] font-bold transition flex items-center gap-1 ${
                isCommissionActive
                  ? 'bg-[var(--ok)] text-white shadow-xs'
                  : 'bg-[var(--card)] text-[rgba(var(--fgRGB),0.6)] border border-[rgba(var(--lineRGB),0.15)]'
              }`}
            >
              {isCommissionActive ? '✓ Active' : 'Off (Zero)'}
            </button>
          </div>

          {isCommissionActive ? (
            <div className="space-y-3 pt-1">
              {/* Stepper & Slider */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-[rgba(var(--fgRGB),0.6)]">Commission Percentage:</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updatePricingSettings({ clerkCommissionRate: Math.max(0, Number((activeCommissionRate - 0.5).toFixed(1))) })}
                      className="w-6 h-6 rounded-lg bg-[var(--raise)] text-xs font-bold border border-[rgba(var(--lineRGB),0.1)] active:scale-90"
                    >
                      −
                    </button>
                    <span className="font-display font-black text-sm text-[var(--ok)] min-w-[40px] text-center">
                      {activeCommissionRate}%
                    </span>
                    <button
                      onClick={() => updatePricingSettings({ clerkCommissionRate: Math.min(25, Number((activeCommissionRate + 0.5).toFixed(1))) })}
                      className="w-6 h-6 rounded-lg bg-[var(--raise)] text-xs font-bold border border-[rgba(var(--lineRGB),0.1)] active:scale-90"
                    >
                      +
                    </button>
                  </div>
                </div>

                <input
                  type="range"
                  min="0"
                  max="25"
                  step="0.5"
                  value={activeCommissionRate}
                  onChange={e => updatePricingSettings({ clerkCommissionRate: Number(e.target.value), commissionEnabled: Number(e.target.value) > 0 })}
                  className="w-full accent-[var(--ok)] cursor-pointer"
                />

                {/* Quick Presets */}
                <div className="flex items-center gap-1 pt-1">
                  {[0, 2.5, 5, 7.5, 10, 15].map(val => (
                    <button
                      key={val}
                      onClick={() => updatePricingSettings({ clerkCommissionRate: val, commissionEnabled: val > 0 })}
                      className={`flex-1 py-1 rounded-xl text-[10px] font-bold border transition ${
                        activeCommissionRate === val
                          ? 'bg-[var(--ok)] text-white border-[var(--ok)]'
                          : 'bg-[var(--raise)] text-[rgba(var(--fgRGB),0.6)] border-[rgba(var(--lineRGB),0.08)]'
                      }`}
                    >
                      {val === 0 ? '0%' : `${val}%`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Live Preview */}
              <div className="p-2.5 rounded-xl bg-[var(--raise)]/60 text-[10px] text-[rgba(var(--fgRGB),0.65)] space-y-1">
                <div className="flex justify-between">
                  <span>Gross Profit Pool:</span>
                  <strong className="text-[var(--fg)]">{formatMoney(kpis.totalProfit)}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Projected Clerk Commission:</span>
                  <strong className="text-emerald-400">{formatMoney(kpis.totalProfit * (activeCommissionRate / 100))}</strong>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-3 rounded-2xl bg-[var(--raise)] text-[10px] text-[rgba(var(--fgRGB),0.6)] leading-relaxed space-y-1">
              <p>💡 <strong>Zero-Commission Store:</strong> Staff earn a flat salary.</p>
              <p>Frontline clerks won’t see commission figures, and manager reports focus strictly on gross revenue and orders.</p>
            </div>
          )}

          <button
            onClick={() => setShowCommissionModal(false)}
            className="w-full py-2.5 rounded-xl bg-[var(--acc)] text-[var(--onAcc)] font-bold text-xs shadow-sm"
          >
            ✓ Done & Apply Policy
          </button>
        </div>
      )}

      {/* ── 4. MOBILE TAB NAVIGATION BAR (3 Clean Views) ── */}
      <div className="grid grid-cols-3 gap-1 p-1 rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.08)] text-[11px] font-bold">
        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`py-2 px-1 rounded-xl transition flex items-center justify-center gap-1.5 ${
            activeTab === 'leaderboard'
              ? 'bg-[var(--acc)] text-[var(--onAcc)] shadow-sm'
              : 'text-[rgba(var(--fgRGB),0.6)] hover:text-[var(--fg)]'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Products</span>
        </button>

        <button
          onClick={() => setActiveTab('trends')}
          className={`py-2 px-1 rounded-xl transition flex items-center justify-center gap-1.5 ${
            activeTab === 'trends'
              ? 'bg-[var(--acc)] text-[var(--onAcc)] shadow-sm'
              : 'text-[rgba(var(--fgRGB),0.6)] hover:text-[var(--fg)]'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Trends</span>
        </button>

        <button
          onClick={() => setActiveTab('team')}
          className={`py-2 px-1 rounded-xl transition flex items-center justify-center gap-1.5 ${
            activeTab === 'team'
              ? 'bg-[var(--acc)] text-[var(--onAcc)] shadow-sm'
              : 'text-[rgba(var(--fgRGB),0.6)] hover:text-[var(--fg)]'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>{role === 'vendor' ? 'My Rank' : 'Clerks'}</span>
        </button>
      </div>

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* ── VIEW 1: PRODUCTS LEADERBOARD ("Which Products Sell More") ── */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-2.5 animate-fadeIn">
          {/* Header & Metric Sort Selector */}
          <div className="flex items-center justify-between px-1">
            <div>
              <span className="font-display font-bold text-xs text-[var(--fg)]">
                Which Products Sell More
              </span>
              <span className="text-[10px] text-[rgba(var(--fgRGB),0.45)] block">
                {filteredProducts.length} items sold
              </span>
            </div>

            {/* Sort Metric Selector */}
            <div className="flex items-center gap-1 p-0.5 rounded-xl bg-[var(--raise)] border border-[rgba(var(--lineRGB),0.08)]">
              <button
                onClick={() => setSortMetric('units')}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold transition ${
                  sortMetric === 'units'
                    ? 'bg-[var(--acc)] text-[var(--onAcc)] shadow-xs'
                    : 'text-[rgba(var(--fgRGB),0.55)]'
                }`}
              >
                Units Sold
              </button>
              <button
                onClick={() => setSortMetric('revenue')}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold transition ${
                  sortMetric === 'revenue'
                    ? 'bg-[var(--acc)] text-[var(--onAcc)] shadow-xs'
                    : 'text-[rgba(var(--fgRGB),0.55)]'
                }`}
              >
                Revenue ($)
              </button>
            </div>
          </div>

          {/* Product Cards List */}
          {filteredProducts.length === 0 ? (
            <div className="p-8 rounded-3xl bg-[var(--card)] text-center text-[rgba(var(--fgRGB),0.4)] border border-[rgba(var(--lineRGB),0.06)]">
              <Package className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <div>No product sales match this filter.</div>
            </div>
          ) : (
            filteredProducts.map((p, idx) => {
              const isTop3 = idx < 3;
              const rankColor = idx === 0
                ? 'from-amber-400 to-amber-600 text-amber-950 font-black'
                : idx === 1
                  ? 'from-slate-300 to-slate-400 text-slate-900 font-bold'
                  : idx === 2
                    ? 'from-amber-700 to-amber-800 text-amber-100 font-bold'
                    : 'bg-[var(--raise)] text-[rgba(var(--fgRGB),0.6)] font-semibold';

              const metricVal = sortMetric === 'revenue' ? p.totalRevenue : p.unitsSold;
              const barPercentage = Math.round((metricVal / maxMetricValue) * 100);
              const isExpanded = expandedProduct === p.name;
              const displayMargin = p.marginPercent !== undefined ? p.marginPercent : Math.round((p.totalProfit / (p.totalRevenue || 1)) * 100);

              return (
                <div
                  key={p.name}
                  onClick={() => setExpandedProduct(isExpanded ? null : p.name)}
                  className={`p-3.5 rounded-2xl bg-[var(--card)] border transition active:scale-[0.99] cursor-pointer space-y-2.5 ${
                    isExpanded
                      ? 'border-[var(--acc)] shadow-md ring-1 ring-[var(--acc)]/30'
                      : 'border-[rgba(var(--lineRGB),0.08)] hover:border-[rgba(var(--lineRGB),0.18)] shadow-xs'
                  }`}
                >
                  {/* Top Row: Rank, Product Name & Gross Revenue */}
                  <div className="flex items-start gap-2.5">
                    {/* Rank Pill */}
                    <div className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs shrink-0 shadow-xs ${
                      isTop3 ? `bg-gradient-to-br ${rankColor}` : rankColor
                    }`}>
                      {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                    </div>

                    {/* Product Name & Category */}
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-xs text-[var(--fg)] truncate leading-snug">
                        {p.name}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-[rgba(var(--fgRGB),0.5)] mt-0.5">
                        <span className="px-1.5 py-0.2 rounded-md bg-[var(--raise)] font-mono">
                          {p.category}
                        </span>
                        <span>·</span>
                        <span>{p.unitsSold} units</span>
                      </div>
                    </div>

                    {/* Sales Revenue Number */}
                    <div className="text-right shrink-0">
                      <div className="font-display font-black text-xs text-[var(--fg)]">
                        {formatMoney(p.totalRevenue)}
                      </div>
                      <div className="text-[9px] font-mono text-emerald-400 font-semibold">
                        {displayMargin}% margin
                      </div>
                    </div>
                  </div>

                  {/* Horizontal Volume Bar */}
                  <div className="space-y-1">
                    <div className="h-2 rounded-full bg-[var(--raise)] overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${barPercentage}%`,
                          background: sortMetric === 'revenue'
                            ? 'linear-gradient(90deg, #10B981, #059669)'
                            : 'linear-gradient(90deg, #FF6A13, #EA580C)'
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[9px] text-[rgba(var(--fgRGB),0.45)]">
                      <span>{p.unitsSold} units sold</span>
                      <span>{barPercentage}% of peak</span>
                    </div>
                  </div>

                  {/* Expanded Product Breakdown Details */}
                  {isExpanded && (
                    <div className="pt-2 border-t border-[rgba(var(--lineRGB),0.07)] space-y-2 text-[10px] animate-fadeIn">
                      <div className="grid grid-cols-3 gap-1.5 text-center">
                        <div className="p-2 rounded-xl bg-[var(--raise)]">
                          <span className="text-[rgba(var(--fgRGB),0.45)] block text-[9px]">Avg Price</span>
                          <strong className="font-mono text-xs">{formatMoney(p.avgPrice)}</strong>
                        </div>
                        <div className="p-2 rounded-xl bg-[var(--raise)]">
                          <span className="text-[rgba(var(--fgRGB),0.45)] block text-[9px]">Total Profit</span>
                          <strong className="font-mono text-xs text-emerald-400">{formatMoney(p.totalProfit)}</strong>
                        </div>
                        <div className="p-2 rounded-xl bg-[var(--raise)]">
                          <span className="text-[rgba(var(--fgRGB),0.45)] block text-[9px]">Orders</span>
                          <strong className="font-mono text-xs">{p.transactionsCount}</strong>
                        </div>
                      </div>

                      {/* Who Sold This Product */}
                      {p.vendors && Object.keys(p.vendors).length > 0 && (
                        <div>
                          <span className="text-[9px] font-bold uppercase tracking-wider text-[rgba(var(--fgRGB),0.5)] block mb-1">
                            Who Sold This Product:
                          </span>
                          <div className="space-y-1">
                            {Object.entries(p.vendors).map(([vName, vUnits]) => (
                              <div key={vName} className="flex items-center justify-between px-2 py-1 rounded-lg bg-[var(--raise)]/60 text-[10px]">
                                <span className="font-semibold text-[rgba(var(--fgRGB),0.8)]">👤 {vName}</span>
                                <span className="font-mono font-bold text-[var(--acc)]">{vUnits} sold</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* ── VIEW 2: SALES TRENDS & TIMELINE VELOCITY ── */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'trends' && (
        <div className="space-y-3 animate-fadeIn">
          {/* Trend Area Chart Card */}
          <div className="p-4 rounded-3xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.09)] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-xs text-[var(--fg)] flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-[var(--acc)]" />
                  <span>Sales Revenue Flow</span>
                </div>
                <div className="text-[10px] text-[rgba(var(--fgRGB),0.5)]">
                  {timeRange === 'today' ? 'Hourly momentum today' : 'Daily sales momentum'}
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[var(--raise)] font-bold text-emerald-400">
                {formatMoney(kpis.totalRevenue)}
              </span>
            </div>

            {/* Mobile Native Area Chart (Height: 180px, proportioned, uncrowded) */}
            <div className="h-44 w-full min-w-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mobileTimelineData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="mobileTrendGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563EB" stopOpacity={0.45} />
                      <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="label"
                    tick={{ fontSize: 9, fill: 'rgba(243,238,228,0.5)' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 9, fill: 'rgba(243,238,228,0.5)' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      borderColor: 'rgba(255,255,255,0.12)',
                      borderRadius: '12px',
                      color: 'var(--fg)',
                      fontSize: '11px',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.3)'
                    }}
                    formatter={(val) => [formatMoney(val), 'Sales']}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#2563EB"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#mobileTrendGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Timeline Points List */}
          <div className="space-y-1.5">
            <span className="font-bold text-[11px] text-[rgba(var(--fgRGB),0.6)] px-1 uppercase tracking-wider block">
              Recent Velocity Breakdown
            </span>
            <div className="space-y-1">
              {timeline.slice(-5).reverse().map(item => (
                <div key={item.period} className="p-3 rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.07)] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span className="font-semibold text-xs text-[var(--fg)]">{item.displayLabel}</span>
                    <span className="text-[10px] text-[rgba(var(--fgRGB),0.5)]">({item.units} units sold)</span>
                  </div>
                  <strong className="font-mono text-xs font-bold text-emerald-400">
                    {formatMoney(item.revenue)}
                  </strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* ── VIEW 3: TEAM & VENDORS ("Who Sold What" / "My Rank") ── */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'team' && (
        <div className="space-y-2.5 animate-fadeIn">
          {role === 'vendor' ? (
            /* Vendor Personal Milestones & Target Card */
            <div className="space-y-3">
              <div className="p-4 rounded-3xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.08)] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs">🎯 Shift Quota Progress</span>
                  <span className="text-[10px] font-mono font-bold text-emerald-400">74% Reached</span>
                </div>
                <div className="h-3 rounded-full bg-[var(--raise)] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                    style={{ width: '74%' }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-[rgba(var(--fgRGB),0.5)]">
                  <span>Current: {formatMoney(kpis.totalRevenue)}</span>
                  <span>Target: {formatMoney(kpis.totalRevenue * 1.35)}</span>
                </div>
              </div>

              <div className="p-4 rounded-3xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.08)] space-y-2">
                <div className="font-bold text-xs text-[var(--fg)] flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-amber-500" />
                  <span>My Best Selling Product</span>
                </div>
                {kpis.topProductByUnits ? (
                  <div className="p-3 rounded-2xl bg-[var(--raise)] flex items-center justify-between">
                    <div>
                      <div className="font-bold text-xs text-[var(--fg)]">{kpis.topProductByUnits.name}</div>
                      <div className="text-[10px] text-[rgba(var(--fgRGB),0.5)]">{kpis.topProductByUnits.unitsSold} units sold</div>
                    </div>
                    <div className="font-mono font-bold text-xs text-emerald-400">
                      {formatMoney(kpis.topProductByUnits.totalRevenue)}
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-[rgba(var(--fgRGB),0.4)]">No sales recorded yet.</div>
                )}
              </div>
            </div>
          ) : (
            /* Owner & Manager Clerks Leaderboard */
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <span className="font-display font-bold text-xs text-[var(--fg)]">
                  Clerks Performance Leaderboard
                </span>
                <span className="text-[10px] text-[rgba(var(--fgRGB),0.5)]">
                  {vendorBreakdown.length} active
                </span>
              </div>

              {vendorBreakdown.map((v, idx) => {
                const isTop = idx === 0;
                return (
                  <div
                    key={v.name}
                    className="p-3.5 rounded-2xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.08)] space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-[var(--accSoft)] text-[var(--acc)] flex items-center justify-center font-bold text-xs">
                          {v.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-bold text-xs text-[var(--fg)] flex items-center gap-1.5">
                            <span>{v.name}</span>
                            {isTop && (
                              <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-amber-500/20 text-amber-400 font-bold">
                                👑 Top Earner
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-[rgba(var(--fgRGB),0.5)]">
                            {v.units} items · {v.orders} orders
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-display font-black text-xs text-[var(--fg)]">
                          {formatMoney(v.revenue)}
                        </div>
                        {isCommissionActive ? (
                          <div className="text-[9px] font-mono text-emerald-400 font-semibold">
                            Comm: {formatMoney(v.commission)}
                          </div>
                        ) : (
                          <div className="text-[9px] font-mono text-[rgba(var(--fgRGB),0.5)] font-semibold">
                            Avg: {formatMoney(v.revenue / (v.orders || 1))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Top Product by this Clerk & Quick Filter Button */}
                    <div className="pt-2 border-t border-[rgba(var(--lineRGB),0.06)] flex items-center justify-between text-[10px]">
                      <div className="truncate max-w-[190px] text-[rgba(var(--fgRGB),0.55)]">
                        <span className="font-semibold text-[rgba(var(--fgRGB),0.75)]">Top:</span> {v.topProduct}
                      </div>
                      <button
                        onClick={() => {
                          setSelectedVendor(v.name);
                          setActiveTab('leaderboard');
                        }}
                        className="px-2 py-0.5 rounded-lg bg-[var(--raise)] text-[var(--acc)] font-bold hover:bg-[var(--accSoft)] transition"
                      >
                        Filter Sales →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
