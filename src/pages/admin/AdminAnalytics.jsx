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
    <div className="space-y-6 select-none" style={{ color: 'var(--fg)' }}>
      {/* Header */}
      <div
        className="p-5 rounded-3xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
        style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.08)' }}
      >
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: 'var(--fg)' }}>
            <BarChart3 className="w-5 h-5 text-[var(--acc)]" />
            <span>Global Platform SaaS Analytics</span>
          </h2>
          <p className="text-xs mt-0.5" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>
            Aggregated metrics, tenant growth curve, and cross-border GMV telemetry
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span
            className="px-3.5 py-1.5 rounded-xl border text-xs font-mono font-bold"
            style={{ background: 'var(--accSoft)', color: 'var(--acc)', borderColor: 'rgba(var(--lineRGB),0.12)' }}
          >
            Platform MRR: {GLOBAL_ANALYTICS.monthlyRecurringRevenue}
          </span>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          className="p-5 rounded-3xl border space-y-2"
          style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.08)' }}
        >
          <div className="flex justify-between items-center text-xs" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>
            <span className="font-bold tracking-wider">TOTAL TENANTS</span>
            <Building2 className="w-4 h-4 text-[var(--acc)]" />
          </div>
          <div className="text-2xl font-black font-mono" style={{ color: 'var(--fg)' }}>
            {GLOBAL_ANALYTICS.totalTenants} Stores
          </div>
          <div className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{GLOBAL_ANALYTICS.growthRate} MoM expansion</span>
          </div>
        </div>

        <div
          className="p-5 rounded-3xl border space-y-2"
          style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.08)' }}
        >
          <div className="flex justify-between items-center text-xs" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>
            <span className="font-bold tracking-wider">TOTAL PLATFORM GMV</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">
            {GLOBAL_ANALYTICS.totalGMV}
          </div>
          <div className="text-[11px]" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>
            Processed across all active stores
          </div>
        </div>

        <div
          className="p-5 rounded-3xl border space-y-2"
          style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.08)' }}
        >
          <div className="flex justify-between items-center text-xs" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>
            <span className="font-bold tracking-wider">PLATFORM USERS</span>
            <Users className="w-4 h-4 text-[var(--acc)]" />
          </div>
          <div className="text-2xl font-black font-mono" style={{ color: 'var(--fg)' }}>
            {GLOBAL_ANALYTICS.totalPlatformUsers.toLocaleString()}
          </div>
          <div className="text-[11px]" style={{ color: 'var(--acc)' }}>
            CEOs, Clerks & Supervisors
          </div>
        </div>

        <div
          className="p-5 rounded-3xl border space-y-2"
          style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.08)' }}
        >
          <div className="flex justify-between items-center text-xs" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>
            <span className="font-bold tracking-wider">CONNECTED POS TERMINALS</span>
            <Smartphone className="w-4 h-4 text-[#10B981]" />
          </div>
          <div className="text-2xl font-black font-mono text-[#10B981]">
            {GLOBAL_ANALYTICS.activeTerminals} Live
          </div>
          <div className="text-[11px] text-emerald-400">
            Active Flutter &amp; Web POS apps
          </div>
        </div>
      </div>

      {/* Growth Chart */}
      <div
        className="p-5 sm:p-6 rounded-3xl border shadow-sm"
        style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.08)' }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="font-bold text-base" style={{ color: 'var(--fg)' }}>
              SaaS Revenue Growth & Tenant Expansion
            </h3>
            <p className="text-xs" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>
              Monthly recurring software subscriptions
            </p>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={GLOBAL_ANALYTICS.growthData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAdminRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF6A13" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#FF6A13" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(var(--lineRGB), 0.08)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'rgba(var(--fgRGB), 0.5)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'rgba(var(--fgRGB), 0.5)' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'var(--card)',
                  borderColor: 'rgba(var(--lineRGB), 0.15)',
                  borderRadius: '16px',
                  color: 'var(--fg)',
                  fontSize: '12px'
                }}
                formatter={(val) => [`$${val}`, 'Monthly Subscription MRR']}
              />
              <Area type="monotone" dataKey="revenue" stroke="#FF6A13" strokeWidth={2.5} fillOpacity={1} fill="url(#colorAdminRev)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Geographic Distribution */}
      <div
        className="p-5 sm:p-6 rounded-3xl border shadow-sm space-y-4"
        style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.08)' }}
      >
        <div>
          <h3 className="font-bold text-base flex items-center gap-2" style={{ color: 'var(--fg)' }}>
            <Globe2 className="w-5 h-5 text-[var(--acc)]" />
            <span>Geographic Distribution & Multi-Market Share</span>
          </h3>
          <p className="text-xs" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>
            Regional deployment footprint across Sub-Saharan Africa & beyond
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {GLOBAL_ANALYTICS.geoDistribution.map(geo => (
            <div
              key={geo.country}
              className="p-4 rounded-2xl border space-y-2"
              style={{ background: 'var(--sunken)', borderColor: 'rgba(var(--lineRGB),0.06)' }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-sm" style={{ color: 'var(--fg)' }}>
                  <span className="text-xl">{geo.flag}</span>
                  <span>{geo.country}</span>
                </div>
                <span className="font-mono text-xs font-bold text-[var(--acc)]">{geo.share}</span>
              </div>

              <div className="flex justify-between text-xs font-mono" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>
                <span>{geo.tenants} Tenants</span>
                <span className="font-bold" style={{ color: 'var(--fg)' }}>{geo.gmv} GMV</span>
              </div>

              <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(var(--lineRGB),0.1)' }}>
                <div
                  className="h-full rounded-full"
                  style={{ width: geo.share, background: 'var(--acc)' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
