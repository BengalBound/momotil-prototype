import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Package,
  CheckSquare,
  Bell,
  Menu,
  X,
  Store,
  ChevronDown,
  Smartphone,
  ShieldCheck,
  Search,
  ExternalLink
} from 'lucide-react';

export const CeoLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { transactions, clerks } = useApp();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pendingApprovalsCount = transactions.filter(t => t.status === 'Pending').length;

  const navLinks = [
    { label: 'Dashboard', path: '/ceo/dashboard', icon: LayoutDashboard },
    { label: 'Clerk Management', path: '/ceo/clerks', icon: Users, badge: clerks.filter(c => c.status === 'Active').length },
    { label: 'Analytics & Reports', path: '/ceo/analytics', icon: BarChart3 },
    { label: 'Inventory Control', path: '/ceo/inventory', icon: Package },
    {
      label: 'Transaction Approvals',
      path: '/ceo/approvals',
      icon: CheckSquare,
      badge: pendingApprovalsCount > 0 ? pendingApprovalsCount : null,
      badgeColor: 'bg-amber-500 text-white'
    },
  ];

  const mobileAppLink = { label: 'CEO Mobile App', path: '/ceo/mobile', icon: Smartphone };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row text-slate-800">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-slate-900 text-slate-200 border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Logo & Store Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center text-white font-black text-base shadow-sm">
                M
              </div>
              <div>
                <div className="font-bold text-sm text-white tracking-tight flex items-center gap-1.5">
                  <span>MoMoTill</span>
                  <span className="text-[10px] bg-purple-500/20 text-purple-300 border border-purple-500/30 px-1.5 py-0.2 rounded font-semibold">
                    CEO Portal
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 truncate max-w-[130px]">
                  Apex Electronics Ltd
                </div>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-2">
              Store Operations
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
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </div>
                  {link.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        link.badgeColor || 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* CEO Mobile App shortcut */}
          <div className="px-3 pb-2 space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-2">
              Bound OS Mobile
            </div>
            <button
              onClick={() => { navigate('/manager'); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                location.pathname === '/manager'
                  ? 'bg-[var(--acc)] text-[var(--onAcc)] font-bold shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Smartphone className="w-4 h-4 text-[var(--acc)]" />
                <span>Manager &amp; Patron</span>
              </div>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[var(--accSoft)] text-[var(--acc)] border border-[rgba(var(--lineRGB),0.12)]">
                BOUND OS
              </span>
            </button>

            <button
              onClick={() => { navigate('/vendeur'); setSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                location.pathname === '/vendeur'
                  ? 'bg-[var(--acc)] text-[var(--onAcc)] font-bold shadow-sm'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Smartphone className="w-4 h-4 text-blue-400" />
                <span>Vendeur Mobile</span>
              </div>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300">
                CLERK
              </span>
            </button>
          </div>
        </div>


        {/* Bottom Store Profile / Switcher */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/40 space-y-2">
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-800/60 border border-slate-800">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="Frank Louis Ohachosim"
              className="w-8 h-8 rounded-lg object-cover border border-purple-400"
            />
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-white truncate">Frank Louis Ohachosim</div>
              <div className="text-[10px] text-purple-300">Store CEO &bull; apex</div>
            </div>
          </div>

          <button
            onClick={() => navigate('/clerk/catalog')}
            className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-blue-300 hover:text-blue-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition border border-slate-700"
          >
            <Smartphone className="w-3.5 h-3.5" />
            Open Clerk POS App
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-6 py-3 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <h1 className="text-base sm:text-lg font-bold text-slate-900">
                Store Operations Dashboard
              </h1>
              <p className="text-xs text-slate-500 hidden sm:block">
                Apex Electronics & Retail Ltd &bull; Downtown Branch #01
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Pending Approvals Bell Alert */}
            <button
              onClick={() => navigate('/ceo/approvals')}
              className="relative p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
              title="Transaction Approvals"
            >
              <Bell className="w-4 h-4" />
              {pendingApprovalsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs animate-bounce">
                  {pendingApprovalsCount}
                </span>
              )}
            </button>

            {/* CEO Badge */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <span className="text-xs font-semibold text-slate-700 hidden md:block">
                Frank Louis Ohachosim
              </span>
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-600 to-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                FO
              </div>
            </div>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
