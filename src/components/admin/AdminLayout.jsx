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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row">
      {/* Mobile Drawer Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Admin Dark Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-slate-900 border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center text-white font-black text-sm shadow-md shadow-indigo-500/20">
                <ShieldAlert className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-sm text-white flex items-center gap-1.5">
                  <span>MoMoTill</span>
                  <span className="text-[10px] bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-1.5 py-0.2 rounded font-mono font-semibold">
                    TIER 3
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">Master Admin Console</div>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Infrastructure Health Status */}
          <div className="p-3 mx-3 my-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-1.5">
            <div className="flex items-center justify-between text-slate-400 font-mono text-[10px]">
              <span>CLUSTER: KVM4 VPS</span>
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                ONLINE
              </span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium flex justify-between">
              <span>Podman Containers:</span>
              <span className="font-mono text-indigo-400">6 Active</span>
            </div>
            <div className="text-[11px] text-slate-300 font-medium flex justify-between">
              <span>Active Tenants:</span>
              <span className="font-mono text-emerald-400">{tenants.filter(t => t.status === 'Active').length} / {tenants.length}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-2">
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
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </div>
                  {link.count !== undefined && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                      {link.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Platform Info */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/80 space-y-2">
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
            <div>
              <div className="font-bold text-slate-200">BengalBound SaaS</div>
              <div className="text-[10px] text-slate-400">v1.0-KVM4 Multi-tenant</div>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>

          <div className="grid grid-cols-2 gap-2 text-center text-xs">
            <button
              onClick={() => navigate('/ceo/dashboard')}
              className="py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-purple-300 text-[11px] font-semibold transition border border-slate-700 truncate"
            >
              CEO View &gt;
            </button>
            <button
              onClick={() => navigate('/clerk/catalog')}
              className="py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-blue-300 text-[11px] font-semibold transition border border-slate-700 truncate"
            >
              Clerk View &gt;
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-30 px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <h1 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Global SaaS Platform Oversight</span>
              </h1>
              <p className="text-xs text-slate-400 hidden sm:block">
                Master Administrator &bull; BengalBound Multi-tenant Engine
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
              <div className="text-xs font-bold text-white">Super Admin</div>
              <div className="text-[10px] text-slate-400 font-mono">admin@bengalbound.dev</div>
            </div>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-black text-xs flex items-center justify-center border border-indigo-400/40 shadow-sm">
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
