import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard, Users, CheckSquare, Package,
  Bell, X, Smartphone, ExternalLink, ChevronRight
} from 'lucide-react';
import { VoiceModal } from '../common/VoiceModal';

export const CeoMobileLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { transactions, currentRegion } = useApp();
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);

  const R = currentRegion;
  const pendingCount = transactions.filter(t => t.status === 'Pending').length;

  const navItems = [
    { label: 'Dashboard', path: '/ceo/mobile/dashboard', icon: LayoutDashboard },
    { label: 'Approvals', path: '/ceo/mobile/approvals', icon: CheckSquare, badge: pendingCount || null },
    { label: 'Clerks', path: '/ceo/mobile/clerks', icon: Users },
    { label: 'Inventory', path: '/ceo/mobile/inventory', icon: Package },
  ];

  return (
    <div className="min-h-[calc(100vh-45px)] bg-slate-900/10 flex items-center justify-center p-0 sm:p-6 lg:p-8">
      {/* Mobile device simulation */}
      <div className="w-full max-w-sm h-[820px] bg-slate-50 rounded-3xl shadow-2xl shadow-slate-900/40 overflow-hidden border border-slate-200 flex flex-col relative"
        style={{ boxShadow: '0 30px 70px -15px rgba(0,0,0,0.4), 0 0 0 1.5px #e2e8f0' }}
      >
        {/* Status bar */}
        <div className="px-5 pt-3 pb-1 flex items-center justify-between text-[11px] font-semibold text-slate-700 bg-white select-none">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] bg-slate-100 px-1 py-0.2 rounded font-mono">4G</span>
            <div className="w-5 h-2.5 border border-slate-700 rounded-sm p-0.5 flex items-center">
              <div className="h-full bg-slate-850 w-4/5 rounded-xs" />
            </div>
          </div>
        </div>

        {/* App Header */}
        <header className="px-4 py-3 bg-[var(--card)] border-b border-[rgba(var(--lineRGB),0.09)] flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center font-display font-bold text-sm text-[var(--onAcc)] shadow-sm"
              style={{ background: 'var(--acc)' }}
            >
              👑
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-sm tracking-tight text-[var(--fg)]">
                  {R.store}
                </span>
                <span
                  className="w-3.5 h-3.5 rounded-full inline-block shrink-0 shadow-inner"
                  style={{ background: R.flag }}
                />
              </div>
              <div className="text-[11px] text-[rgba(var(--fgRGB),0.6)]">
                {R.owner} (CEO &bull; {R.city})
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Approvals Alert Bell */}
            {pendingCount > 0 && (
              <button
                onClick={() => navigate('/ceo/mobile/approvals')}
                className="relative p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-200"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {pendingCount}
                </span>
              </button>
            )}

            {/* Switch to web portal */}
            <button
              onClick={() => navigate('/ceo/dashboard')}
              className="p-2 rounded-xl bg-slate-100 text-slate-600 border border-slate-200"
              title="Switch to full web dashboard"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto pb-20">
          {children}
        </main>

        {/* Bottom Nav */}
        <nav className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 flex items-center justify-around z-40">
          {navItems.map(item => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition relative ${
                  isActive ? 'text-purple-600' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                  {item.badge && (
                    <span className="absolute -top-1.5 -right-2.5 bg-amber-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] tracking-tight">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <VoiceModal isOpen={isVoiceOpen} onClose={() => setIsVoiceOpen(false)} />
      </div>
    </div>
  );
};
