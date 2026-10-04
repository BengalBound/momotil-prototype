import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Download, TrendingUp, BarChart3, Sparkles
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { SALES_7DAYS, CATEGORY_REVENUE, PAYMENT_METHODS_DATA } from '../../data/mockData';

export const CeoAnalytics = () => {
  const { transactions, addToast } = useApp();
  const [dateRange, setDateRange] = useState('7d');

  const handleExportCSV = () => {
    const headers = ['Transaction ID', 'Clerk Name', 'Customer Name', 'Payment Method', 'Status', 'Total ($)', 'Date'];
    const rows = transactions.map(t => [
      t.id, `"${t.clerkName}"`, `"${t.customerName}"`, `"${t.paymentMethod}"`,
      t.status, t.total.toFixed(2), t.date
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `momotill-sales-${dateRange}-${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('CSV Exported', 'Downloaded sales report for current period.', 'success');
  };

  const summaryMetrics = [
    { label: 'Gross Sales', value: '$28,490.00', sub: '+18.5% vs prev 7d', ok: true, color: 'var(--acc)' },
    { label: 'Net Profit', value: '$7,840.00', sub: '27.5% average margin', ok: true, color: 'var(--ok)' },
    { label: 'Avg Basket Size', value: '$58.30', sub: '+4.2% upselling rate', ok: true, color: 'rgba(var(--fgRGB),0.8)' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.08)' }}>
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: 'var(--fg)' }}>
            <TrendingUp className="w-5 h-5" style={{ color: 'var(--acc)' }} />
            Store Analytics & Reports
          </h2>
          <p className="text-xs mt-0.5" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>
            Real-time multi-channel revenue, category margins & payment breakdowns
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center gap-1 p-1 rounded-xl border text-xs"
            style={{ background: 'var(--raise)', borderColor: 'rgba(var(--lineRGB),0.1)' }}>
            {[
              { id: 'today', label: 'Today' },
              { id: '7d', label: '7 Days' },
              { id: '30d', label: '30 Days' },
              { id: 'ytd', label: 'YTD' }
            ].map(r => (
              <button
                key={r.id}
                onClick={() => setDateRange(r.id)}
                className="px-3 py-1.5 rounded-lg font-semibold transition"
                style={{
                  background: dateRange === r.id ? 'var(--acc)' : 'transparent',
                  color: dateRange === r.id ? 'var(--onAcc)' : 'rgba(var(--fgRGB),0.6)'
                }}
              >
                {r.label}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2 rounded-xl font-semibold text-xs flex items-center gap-1.5 transition hover:opacity-90"
            style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {summaryMetrics.map((m, i) => (
          <div key={i} className="p-5 rounded-2xl border" style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.08)' }}>
            <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'rgba(var(--fgRGB),0.45)' }}>{m.label}</span>
            <div className="text-2xl font-black mt-1" style={{ color: m.color }}>{m.value}</div>
            <span className="text-[11px] font-semibold" style={{ color: 'var(--ok)' }}>{m.sub}</span>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <div className="lg:col-span-2 p-5 rounded-2xl border" style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.08)' }}>
          <div className="mb-4">
            <h3 className="font-bold text-base" style={{ color: 'var(--fg)' }}>Revenue & Profit Margins</h3>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>Historical performance by day</p>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SALES_7DAYS} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'rgba(243,238,228,0.45)' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: 'rgba(243,238,228,0.45)' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: 'var(--fg)', fontSize: '12px' }}
                  formatter={(val, name) => [`$${val}`, name === 'sales' ? 'Revenue' : 'Profit']}
                />
                <Legend wrapperStyle={{ fontSize: '11px', color: 'rgba(243,238,228,0.5)' }} />
                <Bar dataKey="sales" name="Sales Revenue" fill="#FF6A13" radius={[6, 6, 0, 0]} />
                <Bar dataKey="profit" name="Net Profit" fill="#57D9A3" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="p-5 rounded-2xl border flex flex-col" style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.08)' }}>
          <h3 className="font-bold text-base mb-0.5" style={{ color: 'var(--fg)' }}>Revenue by Category</h3>
          <p className="text-xs mb-4" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>Product category distribution</p>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={CATEGORY_REVENUE} cx="50%" cy="50%" innerRadius={50} outerRadius={75}
                  paddingAngle={4} dataKey="value">
                  {CATEGORY_REVENUE.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', color: 'var(--fg)', fontSize: '12px' }}
                  formatter={(val) => [`${val}%`, 'Share']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 mt-2">
            {CATEGORY_REVENUE.map(cat => (
              <div key={cat.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                  <span style={{ color: 'rgba(var(--fgRGB),0.7)' }}>{cat.name}</span>
                </div>
                <div className="font-mono font-bold" style={{ color: 'var(--fg)' }}>
                  {cat.amount} <span style={{ color: 'rgba(var(--fgRGB),0.45)' }}>({cat.value}%)</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="p-5 rounded-2xl border" style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.08)' }}>
        <h3 className="font-bold text-base mb-0.5" style={{ color: 'var(--fg)' }}>Payment Method Acceptance Share</h3>
        <p className="text-xs mb-5" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>MoMo integration dominance across portable POS terminals</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PAYMENT_METHODS_DATA.map(m => (
            <div key={m.name} className="p-4 rounded-2xl border space-y-2"
              style={{ background: 'var(--raise)', borderColor: 'rgba(var(--lineRGB),0.08)' }}>
              <div className="flex justify-between items-center text-xs font-semibold" style={{ color: 'rgba(var(--fgRGB),0.7)' }}>
                <span>{m.name}</span>
                <span className="font-mono" style={{ color: 'rgba(var(--fgRGB),0.45)' }}>{m.count} tx</span>
              </div>
              <div className="text-2xl font-black" style={{ color: 'var(--fg)' }}>{m.percentage}%</div>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(var(--lineRGB),0.1)' }}>
                <div className="h-full rounded-full transition-all" style={{ width: `${m.percentage}%`, backgroundColor: m.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Insights Panel */}
      <div className="p-5 rounded-2xl border" style={{ background: 'var(--raise)', borderColor: 'rgba(var(--lineRGB),0.1)' }}>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5" style={{ color: 'var(--acc)' }} />
          <h3 className="font-bold text-sm" style={{ color: 'var(--fg)' }}>AI Weekly Insights & Projections</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {[
            { title: 'Top Performer', body: 'Kwame Mensah leads this week with 21 transactions. Consider a performance bonus.', icon: '🏆' },
            { title: 'Stock Projection', body: 'Based on current sell-through, Brake Pads will hit zero in 6 days. Request reorder now.', icon: '📦' },
            { title: 'Revenue Forecast', body: 'Week-over-week trending at +18%. Monthly target of $100K is 94% likely to be met.', icon: '📈' },
          ].map((ins, i) => (
            <div key={i} className="p-4 rounded-xl border" style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.08)' }}>
              <div className="text-lg mb-1">{ins.icon}</div>
              <div className="font-bold mb-1" style={{ color: 'var(--fg)' }}>{ins.title}</div>
              <div style={{ color: 'rgba(var(--fgRGB),0.6)' }}>{ins.body}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
