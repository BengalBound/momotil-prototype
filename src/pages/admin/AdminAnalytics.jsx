import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  BarChart3,
  TrendingUp,
  Globe2,
  Users,
  Building2,
  DollarSign,
  Smartphone,
  ShieldCheck
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { GLOBAL_ANALYTICS } from '../../data/mockData';

export const AdminAnalytics = () => {
  const { tenants } = useApp();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-400" />
            Global Platform SaaS Analytics
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Aggregated metrics, tenant growth curve, and cross-border GMV telemetry
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold">
            Platform MRR: {GLOBAL_ANALYTICS.monthlyRecurringRevenue}
          </span>
        </div>
      </div>

      {/* Metric Cards (Deliverable 3.B) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span>TOTAL TENANTS</span>
            <Building2 className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{GLOBAL_ANALYTICS.totalTenants} Stores</div>
          <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{GLOBAL_ANALYTICS.growthRate} MoM expansion</span>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span>TOTAL PLATFORM GMV</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">{GLOBAL_ANALYTICS.totalGMV}</div>
          <div className="text-[11px] text-slate-400">Processed across all active stores</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span>PLATFORM USERS</span>
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black text-white font-mono">{GLOBAL_ANALYTICS.totalPlatformUsers.toLocaleString()}</div>
          <div className="text-[11px] text-purple-300">CEOs, Clerks & Supervisors</div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-2">
          <div className="flex justify-between items-center text-slate-400 text-xs">
            <span>CONNECTED POS TERMINALS</span>
            <Smartphone className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl font-black text-blue-400 font-mono">{GLOBAL_ANALYTICS.activeTerminals} Live</div>
          <div className="text-[11px] text-blue-300">Active Flutter mobile apps</div>
        </div>
      </div>

      {/* Growth Chart (Tenants & SaaS Revenue) */}
      <div className="bg-slate-900 border border-slate-800 p-5 sm:p-6 rounded-2xl shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="font-bold text-base text-white">SaaS Revenue Growth & Tenant Expansion</h3>
            <p className="text-xs text-slate-400">Monthly recurring software subscriptions</p>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={GLOBAL_ANALYTICS.growthData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAdminRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: '#090d16', borderColor: '#1e293b', borderRadius: '12px', color: '#f8fafc', fontSize: '12px' }}
                formatter={(val) => [`$${val}`, 'Monthly Subscription MRR']}
              />
              <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2.5} fillOpacity={1} fill="url(#colorAdminRev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Geographic Distribution (Deliverable 3.B) */}
      <div className="bg-slate-900 border border-slate-800 p-5 sm:p-6 rounded-2xl shadow-sm space-y-4">
        <div>
          <h3 className="font-bold text-base text-white flex items-center gap-2">
            <Globe2 className="w-5 h-5 text-indigo-400" />
            Geographic Distribution & Multi-Market Share
          </h3>
          <p className="text-xs text-slate-400">Regional deployment footprint across Sub-Saharan Africa & beyond</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {GLOBAL_ANALYTICS.geoDistribution.map(geo => (
            <div key={geo.country} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-sm text-white">
                  <span className="text-xl">{geo.flag}</span>
                  <span>{geo.country}</span>
                </div>
                <span className="font-mono text-xs font-bold text-indigo-400">{geo.share}</span>
              </div>

              <div className="flex justify-between text-xs text-slate-400 font-mono">
                <span>{geo.tenants} Tenants</span>
                <span className="text-white font-bold">{geo.gmv} GMV</span>
              </div>

              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-500 h-full rounded-full"
                  style={{ width: geo.share }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
