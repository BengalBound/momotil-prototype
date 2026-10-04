import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  ShieldAlert,
  Building2,
  BarChart,
  Sliders,
  UserCheck,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  Server,
  Zap,
  Globe,
  Smartphone
} from 'lucide-react';

export const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tenants, featureFlags } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navLinks = [
    { label: 'Tenant Management', path: '/admin/tenants', icon: Building2, count: tenants.length },
    { label: 'Global Analytics', path: '/admin/analytics', icon: BarChart },
    { label: 'System Configuration', path: '/admin/config', icon: Sliders },
    { label: 'User Impersonation', path: '/admin/impersonation', icon: UserCheck },
  ];

  return (
    <div className="min-h-screen select-none flex flex-col lg:flex-row" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      {/* Mobile Drawer Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Admin Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 border-r flex flex-col justify-between transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
        style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.08)' }}
      >
        <div>
          {/* Header */}
          <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'rgba(var(--lineRGB),0.08)' }}>
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shadow-md"
                style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}
              >
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div>
                <div className="font-display font-bold text-sm flex items-center gap-1.5" style={{ color: 'var(--fg)' }}>
                  <span>BOUND OS</span>
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded font-mono font-semibold"
                    style={{ background: 'var(--accSoft)', color: 'var(--acc)' }}
                  >
                    TIER 3
                  </span>
                </div>
                <div className="text-[11px]" style={{ color: 'rgba(var(--fgRGB),0.45)' }}>Master Admin Console</div>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 hover:text-[var(--fg)]"
              style={{ color: 'rgba(var(--fgRGB),0.4)' }}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Infrastructure Health Status */}
          <div
            className="p-3 mx-3 my-3 rounded-2xl border text-xs space-y-1.5"
            style={{ background: 'var(--sunken)', borderColor: 'rgba(var(--lineRGB),0.06)' }}
          >
            <div className="flex items-center justify-between font-mono text-[10px]" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>
              <span>CLUSTER: KVM4 VPS</span>
              <span className="flex items-center gap-1 font-bold text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                ONLINE
              </span>
            </div>
            <div className="text-[11px] font-medium flex justify-between" style={{ color: 'rgba(var(--fgRGB),0.75)' }}>
              <span>Podman Containers:</span>
              <span className="font-mono font-bold" style={{ color: 'var(--acc)' }}>6 Active</span>
            </div>
            <div className="text-[11px] font-medium flex justify-between" style={{ color: 'rgba(var(--fgRGB),0.75)' }}>
              <span>Active Tenants:</span>
              <span className="font-mono font-bold text-emerald-400">
                {tenants.filter(t => t.status === 'Active').length} / {tenants.length}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider px-3 py-2" style={{ color: 'rgba(var(--fgRGB),0.4)' }}>
              SaaS Administration
            </div>
            {navLinks.map(link => {
              const isActive = location.pathname === link.path;
              const Icon = link.icon;

              return (
                <button
                  key={link.path}
                  onClick={() => {
                    navigate(link.path);
                    setSidebarOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer"
                  style={{
                    background: isActive ? 'var(--acc)' : 'transparent',
                    color: isActive ? 'var(--onAcc)' : 'rgba(var(--fgRGB),0.75)'
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </div>
                  {link.count !== undefined && (
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full"
                      style={{
                        background: isActive ? 'rgba(0,0,0,0.2)' : 'var(--sunken)',
                        color: isActive ? 'inherit' : 'rgba(var(--fgRGB),0.5)'
                      }}
                    >
                      {link.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Platform Info */}
        <div className="p-3 border-t space-y-2" style={{ borderColor: 'rgba(var(--lineRGB),0.08)', background: 'var(--card)' }}>
          <div
            className="p-2.5 rounded-xl border flex items-center justify-between text-xs"
            style={{ background: 'var(--sunken)', borderColor: 'rgba(var(--lineRGB),0.06)' }}
          >
            <div>
              <div className="font-bold text-xs" style={{ color: 'var(--fg)' }}>BengalBound SaaS</div>
              <div className="text-[10px]" style={{ color: 'rgba(var(--fgRGB),0.4)' }}>v1.0-KVM4 Multi-tenant</div>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>

          <div className="grid grid-cols-2 gap-2 text-center text-xs">
            <button
              onClick={() => navigate('/ceo/dashboard')}
              className="py-1.5 px-2 rounded-lg border text-[11px] font-semibold transition truncate cursor-pointer hover:bg-[var(--raise)]"
              style={{ borderColor: 'rgba(var(--lineRGB),0.1)', color: 'var(--acc)' }}
            >
              CEO Web →
            </button>
            <button
              onClick={() => navigate('/manager')}
              className="py-1.5 px-2 rounded-lg border text-[11px] font-semibold transition truncate cursor-pointer hover:bg-[var(--raise)]"
              style={{ borderColor: 'rgba(var(--lineRGB),0.1)', color: '#10B981' }}
            >
              Manager App →
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header
          className="backdrop-blur-md border-b sticky top-0 z-30 px-4 sm:px-6 py-3 flex items-center justify-between"
          style={{ background: 'rgba(var(--bgRGB), 0.94)', borderColor: 'rgba(var(--lineRGB),0.08)' }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-[var(--raise)] cursor-pointer"
              style={{ color: 'rgba(var(--fgRGB),0.5)' }}
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <h1 className="text-base sm:text-lg font-bold flex items-center gap-2" style={{ color: 'var(--fg)' }}>
                <span>Global SaaS Platform Oversight</span>
              </h1>
              <p className="text-xs hidden sm:block" style={{ color: 'rgba(var(--fgRGB),0.45)' }}>
                Master Administrator · Multi-Tenant Infrastructure Engine
              </p>
            </div>
          </div>

          {/* Maintenance Mode Warning if active */}
          {featureFlags.maintenanceMode && (
            <div className="bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs px-3 py-1 rounded-full font-bold animate-pulse flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>Platform Maintenance Mode Active</span>
            </div>
          )}

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold" style={{ color: 'var(--fg)' }}>Master Admin</div>
              <div className="text-[10px] font-mono" style={{ color: 'rgba(var(--fgRGB),0.4)' }}>admin@bengalbound.dev</div>
            </div>
            <div
              className="w-8 h-8 rounded-xl font-black text-xs flex items-center justify-center border shadow-xs"
              style={{ background: 'var(--acc)', color: 'var(--onAcc)', borderColor: 'rgba(var(--lineRGB),0.12)' }}
            >
              SA
            </div>
          </div>
        </header>

        {/* Body content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
