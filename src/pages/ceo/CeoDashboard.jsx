import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  DollarSign,
  ShoppingCart,
  Users,
  AlertTriangle,
  TrendingUp,
  ArrowUpRight,
  ArrowRight,
  Clock,
  CheckCircle2,
  CheckSquare
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { SALES_7DAYS } from '../../data/mockData';

export const CeoDashboard = () => {
  const navigate = useNavigate();
  const { transactions, clerks, products } = useApp();

  const lowStockCount = products.filter(p => p.stock <= 5).length;
  const activeClerksCount = clerks.filter(c => c.status === 'Active').length;
  const pendingApprovals = transactions.filter(t => t.status === 'Pending');

  const todayTransactions = transactions.slice(0, 6);

  // Top selling products mock
  const topProducts = products.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Pending Approvals Warning Banner if any */}
      {pendingApprovals.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800">
              <CheckSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-amber-950">
                {pendingApprovals.length} Transactions Require CEO Approval
              </h4>
              <p className="text-xs text-amber-700">
                High-value tech orders (&gt; $800) or manual price overrides require authorization.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/ceo/approvals')}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition shrink-0"
          >
            Review Queue ({pendingApprovals.length})
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* KPI Cards Grid (Deliverable 2.A) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Today's Sales */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Today's Sales
            </span>
            <div className="text-2xl font-black text-slate-900 mt-1">$2,450.00</div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+14.2% vs yesterday</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* Orders Today */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Today's Orders
            </span>
            <div className="text-2xl font-black text-slate-900 mt-1">42</div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+8 orders vs avg</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <ShoppingCart className="w-6 h-6" />
          </div>
        </div>

        {/* Active Clerks */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Active Clerks
            </span>
            <div className="text-2xl font-black text-slate-900 mt-1">
              {activeClerksCount} <span className="text-xs font-normal text-slate-400">/ {clerks.length}</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] font-semibold text-blue-600 mt-1">
              <span>2 Morning, 1 Evening</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Low Stock Items */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Low Stock Alert
            </span>
            <div className="text-2xl font-black text-rose-600 mt-1">
              {lowStockCount} <span className="text-xs font-normal text-slate-400">SKUs</span>
            </div>
            <button
              onClick={() => navigate('/ceo/inventory')}
              className="flex items-center gap-1 text-[11px] font-semibold text-rose-600 hover:underline mt-1"
            >
              <span>Restock needed &gt;</span>
            </button>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Sales Trend Chart (7 Days) */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="font-bold text-base text-slate-900">Weekly Revenue & Order Volume</h3>
            <p className="text-xs text-slate-500">Live POS transaction stream across all store tills</p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-600 inline-block" />
              <span className="text-slate-600 font-medium">Sales ($)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-purple-500 inline-block" />
              <span className="text-slate-600 font-medium">Orders</span>
            </div>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={SALES_7DAYS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#f8fafc', fontSize: '12px' }}
                formatter={(val) => [`$${val}`, 'Revenue']}
              />
              <Area type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSales)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Split Section: Recent Transactions & Top Selling Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Transactions Table (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-xs p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-base text-slate-900">Recent Transactions</h3>
              <p className="text-xs text-slate-500">Real-time till orders & payment logs</p>
            </div>
            <button
              onClick={() => navigate('/ceo/analytics')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              <span>View all transactions</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider">
                  <th className="py-2.5 px-3">Order ID</th>
                  <th className="py-2.5 px-3">Clerk</th>
                  <th className="py-2.5 px-3">Customer</th>
                  <th className="py-2.5 px-3">Payment</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {todayTransactions.map(tx => (
                  <tr key={tx.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-3 font-mono font-bold text-slate-900">{tx.id}</td>
                    <td className="py-3 px-3 text-slate-700 font-medium">{tx.clerkName}</td>
                    <td className="py-3 px-3 text-slate-600 truncate max-w-[120px]">{tx.customerName}</td>
                    <td className="py-3 px-3 text-slate-500">{tx.paymentMethod}</td>
                    <td className="py-3 px-3">
                      {tx.status === 'Approved' || tx.status === 'Completed' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          <CheckCircle2 className="w-3 h-3" />
                          {tx.status}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 animate-pulse">
                          Pending Approval
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right font-black text-slate-900">${tx.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products List (1 col) */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-base text-slate-900">Top Products</h3>
                <p className="text-xs text-slate-500">Highest volume items today</p>
              </div>
              <button
                onClick={() => navigate('/ceo/inventory')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700"
              >
                Inventory &gt;
              </button>
            </div>

            <div className="space-y-4">
              {topProducts.map((p, idx) => (
                <div key={p.id} className="flex items-center gap-3">
                  <span className="w-5 text-center font-bold text-xs text-slate-400">
                    #{idx + 1}
                  </span>
                  <img src={p.image} alt={p.name} className="w-10 h-10 rounded-xl object-cover border border-slate-100 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-900 truncate">{p.name}</div>
                    <div className="flex justify-between text-[11px] text-slate-500 mt-0.5">
                      <span>${p.price.toFixed(2)}</span>
                      <span className="text-slate-400 font-mono">Stock: {p.stock}</span>
                    </div>
                    {/* Visual Progress Bar */}
                    <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1 overflow-hidden">
                      <div
                        className="bg-blue-600 h-full rounded-full"
                        style={{ width: `${Math.min(100, (p.stock / 30) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 mt-4">
            <button
              onClick={() => navigate('/ceo/inventory')}
              className="w-full py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
            >
              Manage Complete Inventory
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
