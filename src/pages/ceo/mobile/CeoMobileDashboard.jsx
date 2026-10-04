import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../../context/AppContext';
import {
  DollarSign, ShoppingCart, Users, AlertTriangle,
  TrendingUp, CheckSquare, ArrowRight, CheckCircle2,
  Package, Clock
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import { SALES_7DAYS } from '../../../data/mockData';

export const CeoMobileDashboard = () => {
  const navigate = useNavigate();
  const { transactions, clerks, products } = useApp();

  const pendingApprovals = transactions.filter(t => t.status === 'Pending');
  const lowStock = products.filter(p => p.stock <= 5);
  const activeClerks = clerks.filter(c => c.status === 'Active');
  const recentTxns = transactions.slice(0, 4);

  return (
    <div className="p-4 space-y-4">
      {/* Greeting */}
      <div className="pt-1">
        <h1 className="text-base font-black text-slate-900">Good evening, Frank 👋</h1>
        <p className="text-xs text-slate-500">Apex Electronics &bull; Today, Oct 3 2026</p>
      </div>

      {/* Pending Approval Alert */}
      {pendingApprovals.length > 0 && (
        <div
          onClick={() => navigate('/ceo/mobile/approvals')}
          className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 flex items-center gap-3 cursor-pointer hover:bg-amber-100 transition"
        >
          <div className="p-2 rounded-xl bg-amber-100 text-amber-700 shrink-0">
            <CheckSquare className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-xs text-amber-900">{pendingApprovals.length} orders need your approval</div>
            <div className="text-[11px] text-amber-700">Tap to review &amp; authorize</div>
          </div>
          <ArrowRight className="w-4 h-4 text-amber-700 shrink-0" />
        </div>
      )}

      {/* KPI 2×2 Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Today's Sales</span>
            <DollarSign className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-xl font-black text-slate-900">$2,450</div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-0.5 flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" /> +14.2%
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Orders</span>
            <ShoppingCart className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-xl font-black text-slate-900">42</div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">+8 vs avg</div>
        </div>

        <div
          className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-xs cursor-pointer hover:border-blue-300 transition"
          onClick={() => navigate('/ceo/mobile/clerks')}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Active Clerks</span>
            <Users className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-xl font-black text-slate-900">{activeClerks.length}<span className="text-xs font-normal text-slate-400">/{clerks.length}</span></div>
          <div className="text-[10px] text-slate-500 mt-0.5">On shift now</div>
        </div>

        <div
          className="bg-white rounded-2xl border border-slate-200 p-3.5 shadow-xs cursor-pointer hover:border-rose-300 transition"
          onClick={() => navigate('/ceo/mobile/inventory')}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Low Stock</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-xl font-black text-rose-600">{lowStock.length}</div>
          <div className="text-[10px] text-rose-500 mt-0.5 font-semibold">SKUs need restock</div>
        </div>
      </div>

      {/* Mini Sales Sparkline */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-bold text-xs text-slate-900">Weekly Sales Trend</h3>
            <p className="text-[10px] text-slate-500">Last 7 days revenue</p>
          </div>
          <span className="text-xs font-black text-blue-600">$14,530</span>
        </div>
        <div className="h-28">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={SALES_7DAYS} margin={{ top: 5, right: 0, left: -40, bottom: 0 }}>
              <defs>
                <linearGradient id="mobileGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '10px', fontSize: '10px', color: '#f8fafc' }}
                formatter={(v) => [`$${v}`, 'Revenue']}
              />
              <Area type="monotone" dataKey="sales" stroke="#7c3aed" strokeWidth={2} fill="url(#mobileGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
          <h3 className="font-bold text-xs text-slate-900">Recent Transactions</h3>
          <span className="text-[10px] text-blue-600 font-semibold">{transactions.length} total</span>
        </div>
        <div className="divide-y divide-slate-100">
          {recentTxns.map(tx => (
            <div key={tx.id} className="flex items-center justify-between px-4 py-3">
              <div className="min-w-0">
                <div className="font-bold text-[11px] text-slate-900 font-mono">{tx.id}</div>
                <div className="text-[10px] text-slate-500 truncate">{tx.customerName} &bull; {tx.clerkName}</div>
              </div>
              <div className="text-right shrink-0 ml-3">
                <div className="font-black text-xs text-slate-900">${tx.total.toFixed(2)}</div>
                <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                  tx.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                  tx.status === 'Approved' || tx.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                  'bg-rose-100 text-rose-800'
                }`}>
                  {tx.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
