import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp, BarChart3, Package, Users, DollarSign, Filter,
  Calendar, ArrowUpRight, Download, Sparkles, CheckCircle2,
  Layers, Award, Search, X, ChevronDown, ShoppingBag, Tag,
  PieChart as PieIcon, RefreshCw, Zap
} from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, AreaChart, Area,
  PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ComposedChart, Line
} from 'recharts';
import {
  calculateProductSalesAnalytics,
  CHART_COLORS,
  EXTENDED_TRANSACTIONS
} from '../../data/salesAnalyticsData';

export const ProductSalesAnalyticsView = ({
  role = 'owner', // 'owner' | 'manager' | 'vendor'
  vendorLock = null, // If vendor role, their fixed clerk name (e.g., "Amara Okonkwo")
  managerTeam = null, // e.g., "Team Alpha" | "Team Beta"
  isMobile = false,
  title = null,
  subtitle = null
}) => {
  const {
    transactions,
    products,
    currentRegion,
    formatMoney,
    teamClerks,
    addToast
  } = useApp();

  const R = currentRegion;

  // ── Filter State ──────────────────────────────────────────────────────────
  const [selectedVendor, setSelectedVendor] = useState(vendorLock || 'all');
  const [selectedProduct, setSelectedProduct] = useState('all');
  const [timeRange, setTimeRange] = useState('7d'); // 'today' | '7d' | '30d' | 'all'
  const [chartMetric, setChartMetric] = useState('both'); // 'both' | 'units' | 'revenue'
  const [searchQuery, setSearchQuery] = useState('');

  // Clerks available to filter by based on role
  const availableClerks = useMemo(() => {
    if (role === 'vendor' && vendorLock) {
      return [{ id: 'self', name: vendorLock, team: 'Personal' }];
    }
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
  }, [role, vendorLock, managerTeam, teamClerks]);

  // Unique product names for dropdown
  const productOptions = useMemo(() => {
    const names = new Set();
    products.forEach(p => names.add(p.name));
    EXTENDED_TRANSACTIONS.forEach(t => {
      (t.items || []).forEach(item => names.add(item.name));
    });
    return Array.from(names).sort();
  }, [products]);

  // Execute analytics calculations
  const effectiveVendor = role === 'vendor' ? (vendorLock || selectedVendor) : selectedVendor;
  const analyticsData = useMemo(() => {
    return calculateProductSalesAnalytics(transactions, {
      vendor: effectiveVendor,
      product: selectedProduct,
      timeRange,
      managerTeam: role === 'manager' && selectedVendor === 'all' ? managerTeam : null
    });
  }, [transactions, effectiveVendor, selectedProduct, timeRange, role, managerTeam]);

  const {
    kpis,
    productsByUnits,
    productsByRevenue,
    timeline,
    categoryBreakdown,
    vendorBreakdown,
    allProductsList
  } = analyticsData;

  // Filtered product list for table based on search
  const displayedProducts = useMemo(() => {
    const list = chartMetric === 'revenue' ? productsByRevenue : productsByUnits;
    if (!searchQuery.trim()) return list;
    const q = searchQuery.toLowerCase();
    return list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.topVendor.toLowerCase().includes(q)
    );
  }, [chartMetric, productsByRevenue, productsByUnits, searchQuery]);

  // Top products for charts (limit to top 7 for readability)
  const chartProducts = useMemo(() => {
    const source = chartMetric === 'revenue' ? productsByRevenue : productsByUnits;
    return source.slice(0, isMobile ? 5 : 8).map(p => ({
      name: p.name.length > 18 ? p.name.substring(0, 16) + '…' : p.name,
      fullName: p.name,
      unitsSold: p.unitsSold,
      revenue: Math.round(p.totalRevenue),
      avgPrice: Math.round(p.avgPrice),
      margin: p.marginPercent,
      topVendor: p.topVendor
    }));
  }, [chartMetric, productsByRevenue, productsByUnits, isMobile]);

  // Handle Export CSV
  const handleExportCSV = () => {
    const headers = ['Product Name', 'Category', 'Units Sold', 'Total Revenue', 'Avg Price', 'Margin (%)', 'Top Vendor'];
    const rows = allProductsList.map(p => [
      `"${p.name}"`,
      `"${p.category}"`,
      p.unitsSold,
      p.totalRevenue.toFixed(2),
      p.avgPrice.toFixed(2),
      p.marginPercent,
      `"${p.topVendor}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `momotill-analytics-${role}-${timeRange}-${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('Report Exported', 'Downloaded product sales data to CSV.', 'success');
  };

  // Reset filters
  const resetFilters = () => {
    if (role !== 'vendor') setSelectedVendor('all');
    setSelectedProduct('all');
    setTimeRange('7d');
    setSearchQuery('');
  };

  const isFiltered = (role !== 'vendor' && selectedVendor !== 'all') || selectedProduct !== 'all' || timeRange !== '7d';

  return (
    <div className={`space-y-4 select-none ${isMobile ? 'text-xs' : ''}`}>
      {/* ── Top Header & Role Indicator ── */}
      <div
        className="p-4 sm:p-5 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs"
        style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.09)' }}
      >
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full"
              style={{
                background: role === 'owner' ? 'rgba(245,158,11,0.15)' : role === 'manager' ? 'rgba(37,99,235,0.15)' : 'rgba(16,185,129,0.15)',
                color: role === 'owner' ? '#F59E0B' : role === 'manager' ? 'var(--acc)' : 'var(--ok)'
              }}
            >
              {role === 'owner' ? '👑 Owner Overview' : role === 'manager' ? `👔 ${managerTeam || 'Manager'} Analytics` : `📱 Vendor Personal Analytics`}
            </span>
            <span className="text-[10px] text-[rgba(var(--fgRGB),0.45)]">·</span>
            <span className="text-[10px] font-mono text-[rgba(var(--fgRGB),0.55)]">
              {timeRange === 'today' ? "Today's Live Feed" : timeRange === '7d' ? 'Last 7 Days' : timeRange === '30d' ? 'Last 30 Days' : 'All Historical'}
            </span>
          </div>

          <h2 className="text-base sm:text-lg font-bold font-display mt-1 flex items-center gap-2" style={{ color: 'var(--fg)' }}>
            <TrendingUp className="w-5 h-5 text-[var(--acc)] shrink-0" />
            <span>{title || 'Sales & Product Graph Analytics'}</span>
          </h2>
          <p className="text-xs text-[rgba(var(--fgRGB),0.55)] mt-0.5">
            {subtitle || (
              role === 'vendor'
                ? `Detailed breakdown of your products sold, revenue generated, and commissions.`
                : `Analyze which products are selling more, track sales revenue, and filter by vendor or product.`
            )}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          {isFiltered && (
            <button
              onClick={resetFilters}
              className="px-2.5 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1 transition"
              style={{ background: 'var(--raise)', borderColor: 'rgba(var(--lineRGB),0.15)', color: 'var(--acc)' }}
              title="Reset all filters"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}

          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition hover:opacity-90 shadow-xs"
            style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}
          >
            <Download className="w-3.5 h-3.5" />
            <span>CSV</span>
          </button>
        </div>
      </div>

      {/* ── Interactive Filter Controls Bar ── */}
      <div
        className="p-3.5 rounded-2xl border space-y-3"
        style={{ background: 'var(--raise)', borderColor: 'rgba(var(--lineRGB),0.08)' }}
      >
        <div className="flex items-center justify-between text-xs font-bold text-[rgba(var(--fgRGB),0.7)]">
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-[var(--acc)]" />
            <span>Interactive Filters</span>
          </div>
          <span className="text-[10px] font-mono text-[rgba(var(--fgRGB),0.45)]">
            Showing {kpis.totalOrders} transactions ({kpis.totalUnitsSold} items)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {/* Vendor Selector */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[rgba(var(--fgRGB),0.5)] flex items-center justify-between">
              <span>Vendor / Clerk</span>
              {role === 'vendor' && <span className="text-[9px] text-[var(--ok)] font-mono">Locked to you</span>}
            </label>
            <div className="relative">
              <select
                disabled={role === 'vendor'}
                value={effectiveVendor}
                onChange={(e) => setSelectedVendor(e.target.value)}
                className={`w-full py-2 pl-3 pr-8 rounded-xl text-xs font-semibold appearance-none border outline-none transition ${
                  role === 'vendor' ? 'opacity-85 cursor-not-allowed' : 'cursor-pointer hover:border-[var(--acc)]'
                }`}
                style={{
                  background: 'var(--card)',
                  borderColor: effectiveVendor !== 'all' ? 'var(--acc)' : 'rgba(var(--lineRGB),0.15)',
                  color: 'var(--fg)'
                }}
              >
                {role !== 'vendor' && <option value="all">👥 All Vendors ({availableClerks.length})</option>}
                {availableClerks.map(c => (
                  <option key={c.id || c.name} value={c.name}>
                    👤 {c.name} {c.team ? `(${c.team})` : ''}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[rgba(var(--fgRGB),0.4)]" />
            </div>
          </div>

          {/* Product Selector */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[rgba(var(--fgRGB),0.5)]">
              Product Focus
            </label>
            <div className="relative">
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className="w-full py-2 pl-3 pr-8 rounded-xl text-xs font-semibold appearance-none border outline-none transition cursor-pointer hover:border-[var(--acc)]"
                style={{
                  background: 'var(--card)',
                  borderColor: selectedProduct !== 'all' ? 'var(--acc)' : 'rgba(var(--lineRGB),0.15)',
                  color: 'var(--fg)'
                }}
              >
                <option value="all">📦 All Products ({productOptions.length})</option>
                {productOptions.map(pName => (
                  <option key={pName} value={pName}>
                    {pName}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-[rgba(var(--fgRGB),0.4)]" />
            </div>
          </div>

          {/* Time Range Selector */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-[rgba(var(--fgRGB),0.5)]">
              Timeframe
            </label>
            <div className="flex items-center gap-1 p-0.5 rounded-xl border" style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.12)' }}>
              {[
                { id: 'today', label: 'Today' },
                { id: '7d', label: '7 Days' },
                { id: '30d', label: '30 Days' },
                { id: 'all', label: 'All' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setTimeRange(t.id)}
                  className="flex-1 py-1.5 rounded-lg text-xs font-semibold transition"
                  style={{
                    background: timeRange === t.id ? 'var(--acc)' : 'transparent',
                    color: timeRange === t.id ? 'var(--onAcc)' : 'rgba(var(--fgRGB),0.6)'
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active Filter Chips Bar */}
        {isFiltered && (
          <div className="flex items-center gap-1.5 flex-wrap pt-1 text-[11px]">
            <span className="text-[rgba(var(--fgRGB),0.5)] font-mono text-[10px]">Active Filters:</span>
            {effectiveVendor !== 'all' && (
              <span className="px-2 py-0.5 rounded-md bg-[var(--card)] border border-[var(--acc)] text-[var(--acc)] font-bold flex items-center gap-1">
                <span>Vendor: {effectiveVendor}</span>
                {role !== 'vendor' && (
                  <button onClick={() => setSelectedVendor('all')} className="hover:opacity-75">✕</button>
                )}
              </span>
            )}
            {selectedProduct !== 'all' && (
              <span className="px-2 py-0.5 rounded-md bg-[var(--card)] border border-[var(--acc)] text-[var(--acc)] font-bold flex items-center gap-1">
                <span>Product: {selectedProduct}</span>
                <button onClick={() => setSelectedProduct('all')} className="hover:opacity-75">✕</button>
              </span>
            )}
            {timeRange !== '7d' && (
              <span className="px-2 py-0.5 rounded-md bg-[var(--card)] border border-[rgba(var(--lineRGB),0.15)] text-[rgba(var(--fgRGB),0.7)] font-semibold">
                Period: {timeRange}
              </span>
            )}
          </div>
        )}
      </div>

      {/* ── KPI Summary Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Total Revenue */}
        <div
          className="p-4 rounded-2xl border space-y-1 relative overflow-hidden"
          style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.08)' }}
        >
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[rgba(var(--fgRGB),0.45)]">
            <span>Sales Revenue</span>
            <DollarSign className="w-3.5 h-3.5 text-[var(--acc)]" />
          </div>
          <div className="text-xl sm:text-2xl font-black font-display tracking-tight text-[var(--fg)]">
            {formatMoney(kpis.totalRevenue)}
          </div>
          <div className="text-[10px] text-[rgba(var(--fgRGB),0.55)] flex items-center gap-1">
            <span>Margin: <strong className="text-[var(--ok)]">{kpis.profitMargin}%</strong></span>
            <span>·</span>
            <span>Avg Basket: <strong>{formatMoney(kpis.avgBasketValue)}</strong></span>
          </div>
        </div>

        {/* Units Sold */}
        <div
          className="p-4 rounded-2xl border space-y-1 relative overflow-hidden"
          style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.08)' }}
        >
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[rgba(var(--fgRGB),0.45)]">
            <span>Units Sold</span>
            <Package className="w-3.5 h-3.5 text-[var(--ok)]" />
          </div>
          <div className="text-xl sm:text-2xl font-black font-display tracking-tight text-[var(--ok)]">
            {kpis.totalUnitsSold} <span className="text-xs font-normal text-[rgba(var(--fgRGB),0.4)]">items</span>
          </div>
          <div className="text-[10px] text-[rgba(var(--fgRGB),0.55)]">
            Across {allProductsList.length} unique products
          </div>
        </div>

        {/* Top Product by Volume */}
        <div
          className="p-4 rounded-2xl border space-y-1 relative overflow-hidden"
          style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.08)' }}
        >
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[rgba(var(--fgRGB),0.45)]">
            <span>Top Volume Product</span>
            <Award className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="text-sm sm:text-base font-bold font-display truncate text-[var(--fg)]" title={kpis.topProductByUnits?.name}>
            {kpis.topProductByUnits ? kpis.topProductByUnits.name : 'None'}
          </div>
          <div className="text-[10px] font-bold text-amber-500">
            {kpis.topProductByUnits ? `${kpis.topProductByUnits.unitsSold} units sold (${formatMoney(kpis.topProductByUnits.totalRevenue)})` : 'No sales'}
          </div>
        </div>

        {/* Top Product by Revenue OR Commission (if vendor) */}
        <div
          className="p-4 rounded-2xl border space-y-1 relative overflow-hidden"
          style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.08)' }}
        >
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[rgba(var(--fgRGB),0.45)]">
            <span>{role === 'vendor' ? 'Est. Commission' : 'Top Revenue Product'}</span>
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          </div>
          {role === 'vendor' ? (
            <>
              <div className="text-xl sm:text-2xl font-black font-display text-purple-400">
                {formatMoney(kpis.totalProfit * 0.10)}
              </div>
              <div className="text-[10px] text-[rgba(var(--fgRGB),0.55)]">
                Based on 10% net profit commission
              </div>
            </>
          ) : (
            <>
              <div className="text-sm sm:text-base font-bold font-display truncate text-[var(--fg)]" title={kpis.topProductByRevenue?.name}>
                {kpis.topProductByRevenue ? kpis.topProductByRevenue.name : 'None'}
              </div>
              <div className="text-[10px] font-bold text-purple-400">
                {kpis.topProductByRevenue ? `${formatMoney(kpis.topProductByRevenue.totalRevenue)} (${kpis.topProductByRevenue.unitsSold} units)` : 'No sales'}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Main Graphs Section ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* ── GRAPH 1: PRODUCT COMPARISON (Units Sold & Revenue) ── */}
        <div
          className="lg:col-span-2 p-4 sm:p-5 rounded-2xl border space-y-4"
          style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.08)' }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-bold text-sm sm:text-base flex items-center gap-2" style={{ color: 'var(--fg)' }}>
                <BarChart3 className="w-4 h-4 text-[var(--acc)]" />
                <span>Product Performance Ranking</span>
              </h3>
              <p className="text-[11px] text-[rgba(var(--fgRGB),0.5)]">
                Comparing which products are selling more (units) vs revenue generated
              </p>
            </div>

            {/* Metric Mode Toggle */}
            <div className="flex items-center gap-1 p-0.5 rounded-xl border text-[11px] shrink-0"
              style={{ background: 'var(--raise)', borderColor: 'rgba(var(--lineRGB),0.1)' }}>
              {[
                { id: 'both', label: 'Units & Sales' },
                { id: 'units', label: 'Units Only' },
                { id: 'revenue', label: 'Sales ($)' }
              ].map(m => (
                <button
                  key={m.id}
                  onClick={() => setChartMetric(m.id)}
                  className="px-2.5 py-1 rounded-lg font-semibold transition"
                  style={{
                    background: chartMetric === m.id ? 'var(--acc)' : 'transparent',
                    color: chartMetric === m.id ? 'var(--onAcc)' : 'rgba(var(--fgRGB),0.6)'
                  }}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Chart Canvas */}
          <div className="h-64 sm:h-72 w-full min-w-0">
            {chartProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-xs text-[rgba(var(--fgRGB),0.4)]">
                <Package className="w-8 h-8 mb-2 opacity-50" />
                <span>No product transactions match the selected filters.</span>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={chartProducts}
                  margin={{ top: 10, right: isMobile ? 10 : 25, left: -10, bottom: isMobile ? 35 : 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.06)" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: isMobile ? 9 : 11, fill: 'rgba(243,238,228,0.55)' }}
                    angle={isMobile ? -30 : 0}
                    textAnchor={isMobile ? 'end' : 'middle'}
                    axisLine={false}
                    tickLine={false}
                    interval={0}
                  />
                  <YAxis
                    yAxisId="left"
                    tick={{ fontSize: 10, fill: 'rgba(243,238,228,0.5)' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  {chartMetric === 'both' && (
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      tick={{ fontSize: 10, fill: '#10B981' }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(val) => `$${val}`}
                    />
                  )}
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      borderColor: 'rgba(255,255,255,0.12)',
                      borderRadius: '14px',
                      color: 'var(--fg)',
                      fontSize: '11px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.4)'
                    }}
                    formatter={(val, name, props) => {
                      if (name === 'Units Sold') return [`${val} units`, 'Volume'];
                      if (name === 'Sales Revenue') return [formatMoney(val), 'Revenue'];
                      return [val, name];
                    }}
                    labelFormatter={(label, payload) => {
                      const item = payload && payload[0] && payload[0].payload;
                      return item ? `${item.fullName} · Top: ${item.topVendor}` : label;
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />

                  {(chartMetric === 'both' || chartMetric === 'units') && (
                    <Bar
                      yAxisId="left"
                      dataKey="unitsSold"
                      name="Units Sold"
                      fill="#FF6A13"
                      radius={[6, 6, 0, 0]}
                      barSize={isMobile ? 18 : 26}
                    />
                  )}

                  {chartMetric === 'both' && (
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="revenue"
                      name="Sales Revenue"
                      stroke="#10B981"
                      strokeWidth={3}
                      dot={{ r: 4, fill: '#10B981' }}
                      activeDot={{ r: 6 }}
                    />
                  )}

                  {chartMetric === 'revenue' && (
                    <Bar
                      yAxisId="left"
                      dataKey="revenue"
                      name="Sales Revenue"
                      fill="#10B981"
                      radius={[6, 6, 0, 0]}
                      barSize={isMobile ? 18 : 26}
                    />
                  )}
                </ComposedChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* ── GRAPH 2: CATEGORY SHARE DONUT CHART ── */}
        <div
          className="p-4 sm:p-5 rounded-2xl border flex flex-col justify-between"
          style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.08)' }}
        >
          <div>
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm sm:text-base flex items-center gap-2" style={{ color: 'var(--fg)' }}>
                <PieIcon className="w-4 h-4 text-purple-400" />
                <span>Sales Share by Category</span>
              </h3>
            </div>
            <p className="text-[11px] text-[rgba(var(--fgRGB),0.5)] mt-0.5">
              Revenue distribution across departments
            </p>
          </div>

          <div className="h-44 w-full my-2 min-w-0">
            {categoryBreakdown.length === 0 ? (
              <div className="h-full flex items-center justify-center text-xs text-[rgba(var(--fgRGB),0.4)]">
                No category data available
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={46}
                    outerRadius={68}
                    paddingAngle={4}
                    dataKey="revenue"
                  >
                    {categoryBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      borderColor: 'rgba(255,255,255,0.12)',
                      borderRadius: '12px',
                      color: 'var(--fg)',
                      fontSize: '11px'
                    }}
                    formatter={(val, name) => [formatMoney(val), name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Category List */}
          <div className="space-y-1.5 pt-1 border-t border-[rgba(var(--lineRGB),0.07)]">
            {categoryBreakdown.slice(0, 4).map(cat => (
              <div key={cat.name} className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                  <span className="truncate text-[rgba(var(--fgRGB),0.75)]">{cat.name}</span>
                </div>
                <div className="font-mono font-bold shrink-0 text-[var(--fg)]">
                  {formatMoney(cat.revenue)} <span className="text-[9px] text-[rgba(var(--fgRGB),0.4)] font-normal">({cat.percentage}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── GRAPH 3: SALES OVER TIME (Velocity Trend) ── */}
      <div
        className="p-4 sm:p-5 rounded-2xl border space-y-3"
        style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.08)' }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div>
            <h3 className="font-bold text-sm sm:text-base flex items-center gap-2" style={{ color: 'var(--fg)' }}>
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Sales Velocity Over Time</span>
            </h3>
            <p className="text-[11px] text-[rgba(var(--fgRGB),0.5)]">
              {timeRange === 'today' ? 'Hourly transactions and volume trajectory' : 'Daily sales performance trend'}
            </p>
          </div>
          <div className="text-[11px] font-mono text-[var(--acc)] font-bold">
            Total Revenue: {formatMoney(kpis.totalRevenue)}
          </div>
        </div>

        <div className="h-52 w-full min-w-0">
          {timeline.length === 0 ? (
            <div className="h-full flex items-center justify-center text-xs text-[rgba(var(--fgRGB),0.4)]">
              No timeline points for selected period.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeline} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="salesVelocityGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.06)" />
                <XAxis
                  dataKey="displayLabel"
                  tick={{ fontSize: 10, fill: 'rgba(243,238,228,0.5)' }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: 'rgba(243,238,228,0.5)' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(val) => `$${val}`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    borderColor: 'rgba(255,255,255,0.12)',
                    borderRadius: '12px',
                    color: 'var(--fg)',
                    fontSize: '11px'
                  }}
                  formatter={(val, name) => [
                    name === 'revenue' ? formatMoney(val) : `${val} items`,
                    name === 'revenue' ? 'Sales Revenue' : 'Units Sold'
                  ]}
                  labelFormatter={(lbl) => `Time: ${lbl}`}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  name="revenue"
                  stroke="#2563EB"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#salesVelocityGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* ── Vendor Performance Leaderboard (for Owner & Managers) ── */}
      {role !== 'vendor' && vendorBreakdown.length > 0 && (
        <div
          className="p-4 sm:p-5 rounded-2xl border space-y-3"
          style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.08)' }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm sm:text-base flex items-center gap-2" style={{ color: 'var(--fg)' }}>
                <Users className="w-4 h-4 text-[var(--acc)]" />
                <span>Vendor Sales Contribution Matrix</span>
              </h3>
              <p className="text-[11px] text-[rgba(var(--fgRGB),0.5)]">
                Breakdown of sales, units sold, and top product by clerk
              </p>
            </div>
            <span className="text-[10px] font-mono text-[rgba(var(--fgRGB),0.4)]">
              {vendorBreakdown.length} active sellers
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {vendorBreakdown.map((v, i) => {
              const isSelected = selectedVendor === v.name;
              return (
                <div
                  key={v.name}
                  onClick={() => setSelectedVendor(isSelected ? 'all' : v.name)}
                  className={`p-3 rounded-xl border transition cursor-pointer ${
                    isSelected ? 'ring-2 ring-[var(--acc)] border-[var(--acc)] bg-[var(--raise)]' : 'bg-[var(--raise)] hover:border-[rgba(var(--lineRGB),0.2)]'
                  }`}
                  style={{ borderColor: 'rgba(var(--lineRGB),0.08)' }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs"
                        style={{ background: 'var(--accSoft)', color: 'var(--acc)' }}
                      >
                        #{i + 1}
                      </div>
                      <div>
                        <div className="font-bold text-xs">{v.name}</div>
                        <div className="text-[10px] text-[rgba(var(--fgRGB),0.5)]">{v.orders} orders</div>
                      </div>
                    </div>
                    <span className="font-display font-black text-xs text-[var(--fg)]">
                      {formatMoney(v.revenue)}
                    </span>
                  </div>

                  <div className="mt-2 pt-2 border-t border-[rgba(var(--lineRGB),0.06)] flex items-center justify-between text-[10px]">
                    <span className="text-[rgba(var(--fgRGB),0.55)]">
                      Top: <strong className="text-[var(--fg)]">{v.topProduct.length > 15 ? v.topProduct.substring(0, 13) + '…' : v.topProduct}</strong>
                    </span>
                    <span className="font-semibold text-[var(--ok)]">
                      {v.units} units
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Product Leaderboard Table & Drilldown ── */}
      <div
        className="p-4 sm:p-5 rounded-2xl border space-y-3"
        style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.08)' }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-sm sm:text-base flex items-center gap-2" style={{ color: 'var(--fg)' }}>
              <Package className="w-4 h-4 text-[var(--acc)]" />
              <span>Which Products Are Selling More · Detailed Ledger</span>
            </h3>
            <p className="text-[11px] text-[rgba(var(--fgRGB),0.5)]">
              Ranked list of products with units sold, sales revenue, margins, and top seller
            </p>
          </div>

          {/* Table Search Input */}
          <div className="relative w-full sm:w-60">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(var(--fgRGB),0.4)]" />
            <input
              type="text"
              placeholder="Filter product by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl text-xs bg-[var(--raise)] border border-[rgba(var(--lineRGB),0.1)] outline-none focus:border-[var(--acc)]"
            />
          </div>
        </div>

        {/* Product Cards / Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[rgba(var(--lineRGB),0.08)] text-[10px] uppercase font-bold text-[rgba(var(--fgRGB),0.45)]">
                <th className="pb-2 pl-2">Product</th>
                <th className="pb-2 text-right">Units Sold</th>
                <th className="pb-2 text-right">Total Revenue</th>
                <th className="pb-2 text-right hidden sm:table-cell">Avg Price</th>
                <th className="pb-2 text-right hidden md:table-cell">Margin</th>
                <th className="pb-2 text-right pr-2">
                  {role === 'vendor' ? 'Commission' : 'Top Vendor'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(var(--lineRGB),0.05)]">
              {displayedProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-xs text-[rgba(var(--fgRGB),0.4)]">
                    No products match query "{searchQuery}".
                  </td>
                </tr>
              ) : (
                displayedProducts.map((p, idx) => {
                  const isFocused = selectedProduct === p.name;
                  return (
                    <tr
                      key={p.name}
                      onClick={() => setSelectedProduct(isFocused ? 'all' : p.name)}
                      className={`hover:bg-[var(--raise)] cursor-pointer transition ${
                        isFocused ? 'bg-[var(--accSoft)] font-bold' : ''
                      }`}
                    >
                      <td className="py-2.5 pl-2">
                        <div className="flex items-center gap-2">
                          <span className="w-5 font-mono text-[10px] text-[rgba(var(--fgRGB),0.4)]">
                            #{idx + 1}
                          </span>
                          <div>
                            <div className="font-semibold text-xs text-[var(--fg)] flex items-center gap-1.5">
                              <span>{p.name}</span>
                              {isFocused && (
                                <span className="px-1.5 py-0.2 rounded text-[9px] bg-[var(--acc)] text-white">Active</span>
                              )}
                            </div>
                            <span className="text-[10px] text-[rgba(var(--fgRGB),0.45)]">{p.category}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-2.5 text-right font-mono font-bold text-[var(--ok)]">
                        {p.unitsSold}
                        <div className="w-16 h-1 rounded-full bg-[var(--raise)] ml-auto mt-1 overflow-hidden hidden sm:block">
                          <div
                            className="h-full rounded-full bg-[var(--ok)]"
                            style={{ width: `${Math.min(100, (p.unitsSold / (kpis.totalUnitsSold || 1)) * 250)}%` }}
                          />
                        </div>
                      </td>
                      <td className="py-2.5 text-right font-display font-black text-[var(--fg)]">
                        {formatMoney(p.totalRevenue)}
                      </td>
                      <td className="py-2.5 text-right font-mono hidden sm:table-cell text-[rgba(var(--fgRGB),0.7)]">
                        {formatMoney(p.avgPrice)}
                      </td>
                      <td className="py-2.5 text-right font-mono hidden md:table-cell">
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-400 font-bold">
                          {p.marginPercent}%
                        </span>
                      </td>
                      <td className="py-2.5 text-right pr-2">
                        {role === 'vendor' ? (
                          <span className="font-mono text-[var(--acc)] font-bold">
                            {formatMoney(p.totalProfit * 0.10)}
                          </span>
                        ) : (
                          <span className="text-[11px] font-semibold text-[rgba(var(--fgRGB),0.75)]">
                            {p.topVendor}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── AI Insights Box ── */}
      <div
        className="p-4 rounded-2xl border space-y-2"
        style={{ background: 'var(--raise)', borderColor: 'rgba(var(--lineRGB),0.09)' }}
      >
        <div className="flex items-center gap-2 text-xs font-bold text-amber-500">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Real-Time AI Product Sales Intelligence</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
          <div className="p-3 rounded-xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.06)] space-y-1">
            <span className="text-[10px] font-mono uppercase text-[var(--acc)] font-bold">Volume Leader</span>
            <p className="text-[11px] text-[rgba(var(--fgRGB),0.75)]">
              {kpis.topProductByUnits ? (
                <><strong>{kpis.topProductByUnits.name}</strong> accounts for {kpis.topProductByUnits.shareOfUnits}% of all items sold.</>
              ) : 'No data.'}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.06)] space-y-1">
            <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold">Revenue Driver</span>
            <p className="text-[11px] text-[rgba(var(--fgRGB),0.75)]">
              {kpis.topProductByRevenue ? (
                <><strong>{kpis.topProductByRevenue.name}</strong> generated {kpis.topProductByRevenue.shareOfTotal}% of all gross revenue ({formatMoney(kpis.topProductByRevenue.totalRevenue)}).</>
              ) : 'No data.'}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.06)] space-y-1">
            <span className="text-[10px] font-mono uppercase text-purple-400 font-bold">
              {role === 'vendor' ? 'Your Commission' : 'Top Performer'}
            </span>
            <p className="text-[11px] text-[rgba(var(--fgRGB),0.75)]">
              {role === 'vendor' ? (
                <>You have generated estimated {formatMoney(kpis.totalProfit * 0.10)} commission this period.</>
              ) : (
                <><strong>{kpis.topVendor ? kpis.topVendor.name : 'N/A'}</strong> leads in overall sales volume with {kpis.topVendor ? formatMoney(kpis.topVendor.revenue) : '$0'}.</>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
