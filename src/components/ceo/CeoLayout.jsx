import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard, Users, BarChart3, Package, CheckSquare,
  Bell, Menu, X, Smartphone, TrendingUp
} from 'lucide-react';

export const CeoLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { transactions, clerks, currentRegion, formatMoney } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const R = currentRegion;
  const pendingCount = transactions.filter(t => t.status === 'Pending').length;

  const navLinks = [
    { label: 'Dashboard', path: '/ceo/dashboard', icon: LayoutDashboard },
    { label: 'Clerk Management', path: '/ceo/clerks', icon: Users, badge: clerks.filter(c => c.status === 'Active').length },
    { label: 'Analytics & Reports', path: '/ceo/analytics', icon: BarChart3 },
    { label: 'Inventory Control', path: '/ceo/inventory', icon: Package },
    { label: 'Approvals', path: '/ceo/approvals', icon: CheckSquare, badge: pendingCount > 0 ? pendingCount : null, badgeWarn: true },
  ];

  const mobileLinks = [
    { label: 'Manager & Patron App', path: '/manager', sub: 'BOUND OS · Owner/Mgr', accent: true },
    { label: 'Vendeur Mobile App', path: '/vendeur', sub: 'BOUND OS · Clerk POS', accent: false },
  ];

  return (
    <div className="min-h-screen flex flex-col lg:flex-row" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      {/* Sidebar Backdrop */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 lg:hidden"
          style={{ background: 'rgba(var(--bgRGB), 0.75)', backdropFilter: 'blur(4px)' }} />
      )}

      {/* ── Sidebar ── */}
      <aside className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 flex flex-col justify-between border-r transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.1)' }}>
        <div>
          {/* Logo */}
          <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'rgba(var(--lineRGB),0.08)' }}>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center font-display font-black text-base shadow-md"
                style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}>
                B
              </div>
              <div>
                <div className="font-display font-bold text-sm tracking-tight flex items-center gap-1.5">
                  <span>BOUND OS</span>
                  <span className="text-[10px] px-1.5 rounded font-semibold"
                    style={{ background: 'var(--accSoft)', color: 'var(--acc)' }}>
                    CEO
                  </span>
                </div>
                <div className="text-[11px] truncate max-w-[130px]" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>
                  {R.store}
                </div>
              </div>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Today snapshot */}
          <div className="mx-3 mt-3 p-3 rounded-xl border" style={{ background: 'var(--raise)', borderColor: 'rgba(var(--lineRGB),0.07)' }}>
            <div className="text-[9px] font-mono uppercase tracking-wider mb-1" style={{ color: 'rgba(var(--fgRGB),0.45)' }}>Today · {R.city}</div>
            <div className="font-display font-black text-lg tracking-tight">{formatMoney(R.today)}</div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[10px]" style={{ color: 'rgba(var(--fgRGB),0.55)' }}>{R.salesToday} sales</span>
              {pendingCount > 0 && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'var(--accSoft)', color: 'var(--acc)' }}>
                  {pendingCount} pending
                </span>
              )}
            </div>
          </div>

          {/* Nav Links */}
          <nav className="p-3 space-y-1 mt-2">
            <div className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5" style={{ color: 'rgba(var(--fgRGB),0.4)' }}>
              Store Operations
            </div>
            {navLinks.map(link => {
              const isActive = location.pathname === link.path;
              const Icon = link.icon;
              return (
                <button key={link.path}
                  onClick={() => { navigate(link.path); setSidebarOpen(false); }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition"
                  style={{
                    background: isActive ? 'var(--acc)' : 'transparent',
                    color: isActive ? 'var(--onAcc)' : 'rgba(var(--fgRGB),0.65)',
                  }}>
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </div>
                  {link.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{
                        background: isActive ? 'rgba(0,0,0,0.2)' : link.badgeWarn ? 'rgba(255,183,3,0.18)' : 'var(--raise)',
                        color: isActive ? 'var(--onAcc)' : link.badgeWarn ? 'var(--warn)' : 'rgba(var(--fgRGB),0.7)',
                      }}>
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Mobile App Links */}
          <div className="px-3 pb-2">
            <div className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5" style={{ color: 'rgba(var(--fgRGB),0.4)' }}>
              BOUND OS Mobile
            </div>
            {mobileLinks.map(link => {
              const isActive = location.pathname === link.path;
              return (
                <button key={link.path}
                  onClick={() => { navigate(link.path); setSidebarOpen(false); }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition mb-1"
                  style={{
                    background: isActive ? 'var(--accSoft)' : 'transparent',
                    color: isActive ? 'var(--acc)' : 'rgba(var(--fgRGB),0.6)',
                  }}>
                  <div className="flex items-center gap-2.5">
                    <Smartphone className="w-4 h-4" style={{ color: link.accent ? 'var(--acc)' : 'rgba(var(--fgRGB),0.5)' }} />
                    <span>{link.label}</span>
                  </div>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{ background: 'var(--raise)', color: 'rgba(var(--fgRGB),0.5)', border: '1px solid rgba(var(--lineRGB),0.1)' }}>
                    {link.sub}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Profile */}
        <div className="p-3 border-t" style={{ borderColor: 'rgba(var(--lineRGB),0.08)' }}>
          <div className="flex items-center gap-2.5 p-2.5 rounded-xl border" style={{ background: 'var(--raise)', borderColor: 'rgba(var(--lineRGB),0.08)' }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm text-white shrink-0"
              style={{ background: 'var(--acc)' }}>
              {R.owner?.split(' ').map(w => w[0]).join('').slice(0, 2) || 'FO'}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold truncate">{R.owner}</div>
              <div className="text-[10px] truncate" style={{ color: 'var(--acc)' }}>Store Owner · {R.code}</div>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="sticky top-0 z-30 px-4 sm:px-6 py-3 flex items-center justify-between border-b"
          style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.08)' }}>
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg transition"
              style={{ color: 'rgba(var(--fgRGB),0.6)' }}>
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base sm:text-lg font-display font-bold">
                {navLinks.find(n => n.path === location.pathname)?.label || 'CEO Portal'}
              </h1>
              <p className="text-xs hidden sm:block" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>
                {R.store} · {R.area}, {R.city}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Flag */}
            <span className="w-5 h-5 rounded-full shrink-0 hidden sm:inline-block" style={{ background: R.flag }} />

            {/* Pending Bell */}
            <button onClick={() => navigate('/ceo/approvals')}
              className="relative p-2 rounded-xl border transition"
              style={{ borderColor: 'rgba(var(--lineRGB),0.1)', color: 'rgba(var(--fgRGB),0.6)' }}>
              <Bell className="w-4 h-4" />
              {pendingCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce"
                  style={{ background: 'var(--acc)' }}>
                  {pendingCount}
                </span>
              )}
            </button>

            {/* Avatar */}
            <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white shadow-sm"
              style={{ background: 'var(--acc)' }}>
              {R.owner?.split(' ').map(w => w[0]).join('').slice(0, 2) || 'FO'}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
