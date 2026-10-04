import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Download,
  Calendar,
  DollarSign,
  TrendingUp,
  PieChart as PieChartIcon,
  CreditCard,
  CheckCircle2,
  Filter
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { SALES_7DAYS, CATEGORY_REVENUE, PAYMENT_METHODS_DATA } from '../../data/mockData';

export const CeoAnalytics = () => {
  const { transactions, addToast } = useApp();
  const [dateRange, setDateRange] = useState('7d');

  // CSV Export function
  const handleExportCSV = () => {
    const headers = ['Transaction ID', 'Clerk Name', 'Customer Name', 'Payment Method', 'Status', 'Total ($)', 'Date'];
    const rows = transactions.map(t => [
      t.id,
      `"${t.clerkName}"`,
      `"${t.customerName}"`,
      `"${t.paymentMethod}"`,
      t.status,
      t.total.toFixed(2),
      t.date
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `momotill-sales-report-${dateRange}-${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast('CSV Exported', 'Downloaded sales report for current period.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Analytics Header with Date Range & Export */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Store Sales Analytics & Reports
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time multi-channel revenue, category margins & payment method breakdowns
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Date Range Picker */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            {[
              { id: 'today', label: 'Today' },
              { id: '7d', label: 'Last 7 Days' },
              { id: '30d', label: 'Last 30 Days' },
              { id: 'ytd', label: 'YTD' }
            ].map(r => (
              <button
                key={r.id}
                onClick={() => setDateRange(r.id)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                  dateRange === r.id
                    ? 'bg-white text-blue-600 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* Export CSV button (Deliverable 2.C) */}
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Top Analytics Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Gross Sales</span>
          <div className="text-2xl font-black text-slate-900 mt-1">$28,490.00</div>
          <span className="text-[11px] font-semibold text-emerald-600">+18.5% compared to prev 7d</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Net Profit</span>
          <div className="text-2xl font-black text-blue-600 mt-1">$7,840.00</div>
          <span className="text-[11px] font-semibold text-slate-500">27.5% average gross margin</span>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Average Basket Size</span>
          <div className="text-2xl font-black text-purple-600 mt-1">$58.30</div>
          <span className="text-[11px] font-semibold text-emerald-600">+4.2% upselling rate</span>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Trend Chart (2 cols) */}
        <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-base text-slate-900">Revenue & Profit Margins</h3>
              <p className="text-xs text-slate-500">Historical performance by day</p>
            </div>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SALES_7DAYS} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#f8fafc', fontSize: '12px' }}
                  formatter={(val, name) => [`$${val}`, name === 'sales' ? 'Revenue' : 'Profit']}
                />
                <Legend />
                <Bar dataKey="sales" name="Sales Revenue" fill="#2563eb" radius={[6, 6, 0, 0]} />
                <Bar dataKey="profit" name="Net Profit" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Revenue Breakdown (1 col PieChart) */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-base text-slate-900">Revenue by Category</h3>
            <p className="text-xs text-slate-500 mb-4">Product category volume distribution</p>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={CATEGORY_REVENUE}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {CATEGORY_REVENUE.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#f8fafc', fontSize: '12px' }}
                    formatter={(val) => [`${val}%`, 'Share']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2 mt-2">
              {CATEGORY_REVENUE.map(cat => (
                <div key={cat.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-slate-700 font-medium">{cat.name}</span>
                  </div>
                  <div className="font-mono font-bold text-slate-900">
                    {cat.amount} ({cat.value}%)
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods Breakdown */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
        <h3 className="font-bold text-base text-slate-900 mb-1">Payment Method Acceptance Share</h3>
        <p className="text-xs text-slate-500 mb-5">MoMo integration dominance across portable POS terminals</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PAYMENT_METHODS_DATA.map(m => (
            <div key={m.name} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
                <span>{m.name}</span>
                <span className="font-mono text-slate-500">{m.count}</span>
              </div>
              <div className="text-2xl font-black text-slate-900">{m.percentage}%</div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${m.percentage}%`, backgroundColor: m.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
