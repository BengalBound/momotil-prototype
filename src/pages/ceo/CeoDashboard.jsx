import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  DollarSign, ShoppingCart, Users, AlertTriangle,
  TrendingUp, ArrowRight, CheckCircle2, CheckSquare,
  BarChart3, Package, Sparkles, ArrowUpRight
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';
import { SALES_7DAYS } from '../../data/mockData';

export const CeoDashboard = () => {
  const navigate = useNavigate();
  const { transactions, clerks, products, currentRegion, formatMoney, teamClerks } = useApp();
  const R = currentRegion;

  const lowStockCount = products.filter(p => p.stock <= 5).length;
  const activeClerksCount = clerks.filter(c => c.status === 'Active').length;
  const pendingApprovals = transactions.filter(t => t.status === 'Pending');
  const todayTransactions = transactions.slice(0, 6);
  const topProducts = products.slice(0, 4);

  const totalStoreSales = (teamClerks || []).reduce((sum, c) => sum + (c.salesToday || 0), 0);

  const kpis = [
    {
      label: "Today's Revenue",
      value: formatMoney(totalStoreSales || R.today),
      sub: '+14.2% vs yesterday',
      subOk: true,
      icon: DollarSign,
      iconBg: 'rgba(255,106,19,0.14)',
      iconColor: 'var(--acc)'
    },
    {
      label: "Today's Orders",
      value: '42',
      sub: '+8 vs daily avg',
      subOk: true,
      icon: ShoppingCart,
      iconBg: 'rgba(10,123,79,0.14)',
      iconColor: 'var(--ok)'
    },
    {
      label: 'Active Clerks',
      value: `${activeClerksCount} / ${clerks.length}`,
      sub: '2 Morning · 1 Evening',
      subOk: false,
      icon: Users,
      iconBg: 'rgba(var(--fgRGB),0.07)',
      iconColor: 'rgba(var(--fgRGB),0.6)'
    },
    {
      label: 'Low Stock Alert',
      value: lowStockCount,
      sub: 'SKUs need restock',
      subOk: false,
      isWarn: true,
      icon: AlertTriangle,
      iconBg: 'rgba(255,138,138,0.14)',
      iconColor: 'var(--bad)',
      onClick: () => navigate('/ceo/inventory')
    }
  ];

  return (
    <div className="space-y-6">
      {/* Pending Approvals Banner */}
      {pendingApprovals.length > 0 && (
        <div
          className="rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          style={{ background: 'rgba(255,183,3,0.1)', border: '1px solid rgba(255,183,3,0.25)' }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl" style={{ background: 'rgba(255,183,3,0.2)', color: 'var(--warn)' }}>
              <CheckSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm" style={{ color: 'var(--fg)' }}>
                {pendingApprovals.length} Transactions Require Patron Approval
              </h4>
              <p className="text-xs" style={{ color: 'rgba(var(--fgRGB),0.6)' }}>
                High-value orders (&gt; threshold) or manual price overrides need authorization.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/ceo/approvals')}
            className="px-4 py-2 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition shrink-0"
            style={{ background: 'var(--warn)', color: '#1a0e00' }}
          >
            Review Queue ({pendingApprovals.length})
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div
              key={i}
              onClick={kpi.onClick}
              className={`p-5 rounded-2xl border flex items-center justify-between transition ${kpi.onClick ? 'cursor-pointer hover:scale-[1.02]' : ''}`}
              style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.08)' }}
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'rgba(var(--fgRGB),0.45)' }}>
                  {kpi.label}
                </span>
                <div className="text-2xl font-black mt-1" style={{ color: kpi.isWarn ? 'var(--bad)' : 'var(--fg)' }}>
                  {kpi.value}
                </div>
                <div className="flex items-center gap-1 text-[11px] font-semibold mt-1"
                  style={{ color: kpi.subOk ? 'var(--ok)' : 'rgba(var(--fgRGB),0.5)' }}>
                  {kpi.subOk && <TrendingUp className="w-3 h-3" />}
                  <span>{kpi.sub}</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: kpi.iconBg, color: kpi.iconColor }}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Sales Trend Chart */}
      <div className="p-5 sm:p-6 rounded-2xl border" style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.08)' }}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
          <div>
            <h3 className="font-bold text-base" style={{ color: 'var(--fg)' }}>Weekly Revenue & Order Volume</h3>
            <p className="text-xs mt-0.5" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>Live POS transaction stream across all store tills</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full inline-block" style={{ background: 'var(--acc)' }} />
              <span style={{ color: 'rgba(var(--fgRGB),0.6)' }}>Revenue</span>
            </div>
            <button
              onClick={() => navigate('/ceo/analytics')}
              className="text-xs font-semibold flex items-center gap-1"
              style={{ color: 'var(--acc)' }}
            >
              Full Analytics <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={SALES_7DAYS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF6A13" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#FF6A13" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(var(--lineRGB),0.07)" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'rgba(var(--fgRGB),0.4)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'rgba(var(--fgRGB),0.4)' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  borderColor: 'rgba(var(--lineRGB),0.15)',
                  borderRadius: '12px',
                  color: 'var(--fg)',
                  fontSize: '12px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
                }}
                formatter={(val) => [`$${val}`, 'Revenue']}
              />
              <Area type="monotone" dataKey="sales" stroke="#FF6A13" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions + Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transactions Table */}
        <div className="lg:col-span-2 rounded-2xl border p-5" style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.08)' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-base" style={{ color: 'var(--fg)' }}>Recent Transactions</h3>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>Real-time till orders & payment logs</p>
            </div>
            <button
              onClick={() => navigate('/ceo/analytics')}
              className="text-xs font-semibold flex items-center gap-1 transition hover:opacity-80"
              style={{ color: 'var(--acc)' }}
            >
              <span>View all</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b text-[10px] font-bold uppercase tracking-wider"
                  style={{ borderColor: 'rgba(var(--lineRGB),0.08)', color: 'rgba(var(--fgRGB),0.4)' }}>
                  <th className="py-2.5 px-2">Order ID</th>
                  <th className="py-2.5 px-2">Clerk</th>
                  <th className="py-2.5 px-2 hidden sm:table-cell">Customer</th>
                  <th className="py-2.5 px-2 hidden sm:table-cell">Payment</th>
                  <th className="py-2.5 px-2">Status</th>
                  <th className="py-2.5 px-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {todayTransactions.map((tx, i) => (
                  <tr key={tx.id}
                    className="border-b transition hover:opacity-80"
                    style={{ borderColor: 'rgba(var(--lineRGB),0.05)' }}>
                    <td className="py-3 px-2 font-mono font-bold text-[11px]" style={{ color: 'var(--acc)' }}>{tx.id}</td>
                    <td className="py-3 px-2 font-semibold" style={{ color: 'var(--fg)' }}>{tx.clerkName}</td>
                    <td className="py-3 px-2 hidden sm:table-cell truncate max-w-[100px]" style={{ color: 'rgba(var(--fgRGB),0.6)' }}>{tx.customerName}</td>
                    <td className="py-3 px-2 hidden sm:table-cell" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>{tx.paymentMethod}</td>
                    <td className="py-3 px-2">
                      {tx.status === 'Approved' || tx.status === 'Completed' ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
                          style={{ background: 'rgba(87,217,163,0.15)', color: 'var(--ok)' }}>
                          <CheckCircle2 className="w-3 h-3" />
                          Done
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold animate-pulse"
                          style={{ background: 'rgba(255,183,3,0.15)', color: 'var(--warn)' }}>
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-2 text-right font-black" style={{ color: 'var(--fg)' }}>${tx.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="rounded-2xl border p-5 flex flex-col" style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.08)' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-base" style={{ color: 'var(--fg)' }}>Top Products</h3>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>Highest volume today</p>
            </div>
            <button onClick={() => navigate('/ceo/inventory')}
              className="text-xs font-semibold hover:opacity-80" style={{ color: 'var(--acc)' }}>
              Inventory &gt;
            </button>
          </div>

          <div className="space-y-4 flex-1">
            {topProducts.map((p, idx) => (
              <div key={p.id} className="flex items-center gap-3">
                <span className="w-5 text-center font-bold text-xs shrink-0" style={{ color: 'rgba(var(--fgRGB),0.35)' }}>
                  #{idx + 1}
                </span>
                <img src={p.image} alt={p.name}
                  className="w-10 h-10 rounded-xl object-cover shrink-0"
                  style={{ border: '1px solid rgba(var(--lineRGB),0.08)' }} />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold truncate" style={{ color: 'var(--fg)' }}>{p.name}</div>
                  <div className="flex justify-between text-[11px] mt-0.5" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>
                    <span>${p.price.toFixed(2)}</span>
                    <span className="font-mono">Stock: {p.stock}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full mt-1.5 overflow-hidden" style={{ background: 'rgba(var(--lineRGB),0.1)' }}>
                    <div
                      className="h-full rounded-full transition-all"
                      style={{ width: `${Math.min(100, (p.stock / 30) * 100)}%`, background: 'var(--acc)' }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 mt-4 border-t" style={{ borderColor: 'rgba(var(--lineRGB),0.08)' }}>
            <button
              onClick={() => navigate('/ceo/inventory')}
              className="w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition hover:opacity-80"
              style={{ background: 'var(--raise)', color: 'rgba(var(--fgRGB),0.8)', border: '1px solid rgba(var(--lineRGB),0.1)' }}
            >
              <Package className="w-4 h-4" />
              Manage Complete Inventory
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Approve Transactions', icon: CheckSquare, path: '/ceo/approvals', badge: pendingApprovals.length },
          { label: 'Analytics & Reports', icon: BarChart3, path: '/ceo/analytics' },
          { label: 'Inventory Control', icon: Package, path: '/ceo/inventory' },
          { label: 'Team Management', icon: Users, path: '/ceo/clerks' }
        ].map((action, i) => {
          const Icon = action.icon;
          return (
            <button
              key={i}
              onClick={() => navigate(action.path)}
              className="p-4 rounded-2xl border text-left transition hover:scale-[1.02] relative"
              style={{ background: 'var(--raise)', borderColor: 'rgba(var(--lineRGB),0.1)' }}
            >
              {action.badge > 0 && (
                <span className="absolute top-3 right-3 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center text-white"
                  style={{ background: 'var(--warn)' }}>
                  {action.badge}
                </span>
              )}
              <Icon className="w-5 h-5 mb-2" style={{ color: 'var(--acc)' }} />
              <div className="text-xs font-semibold" style={{ color: 'var(--fg)' }}>{action.label}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
