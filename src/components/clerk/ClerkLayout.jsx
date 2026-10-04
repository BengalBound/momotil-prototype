import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  ShoppingBag,
  ShoppingCart,
  Clock,
  User,
  Mic,
  ScanBarcode,
  WifiOff,
  RefreshCw,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { VoiceModal } from '../common/VoiceModal';
import { BarcodeModal } from '../common/BarcodeModal';

export const ClerkLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    cart,
    currentClerk,
    setCurrentClerk,
    isOffline,
    syncOfflineData,
    offlinePendingQueue,
    mobileFrameMode,
    currentRegion
  } = useApp();

  const R = currentRegion;

  const [isVoiceOpen, setIsVoiceOpen] = useState(false);
  const [isBarcodeOpen, setIsBarcodeOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const cartTotalCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const navItems = [
    { label: 'Catalog', path: '/clerk/catalog', icon: ShoppingBag },
    { label: 'Cart', path: '/clerk/cart', icon: ShoppingCart, badge: cartTotalCount },
    { label: 'Orders', path: '/clerk/orders', icon: Clock },
    { label: 'Profile', path: '#profile', icon: User, action: () => setShowProfileModal(true) },
  ];

  const content = (
    <div className="flex flex-col h-full bg-slate-50 text-slate-900 relative">
      {/* Smartphone Notch if in frame */}
      {mobileFrameMode && (
        <div className="mobile-notch">
          <div className="mobile-notch-camera" />
        </div>
      )}

      {/* Simulated Phone Status Bar */}
      <div className={`px-6 pt-3 pb-1 flex items-center justify-between text-[11px] font-semibold text-slate-700 bg-white select-none ${mobileFrameMode ? 'pt-6' : ''}`}>
        <span>9:41</span>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] bg-slate-100 px-1 py-0.2 rounded font-mono">5G</span>
          <div className="w-5 h-2.5 border border-slate-700 rounded-sm p-0.5 flex items-center">
            <div className="h-full bg-slate-850 w-4/5 rounded-xs" />
          </div>
        </div>
      </div>

      {/* Top App Bar */}
      <header className="px-4 py-3 bg-[var(--card)] border-b border-[rgba(var(--lineRGB),0.09)] flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center font-display font-bold text-sm text-[var(--onAcc)] shadow-sm"
            style={{ background: 'var(--acc)' }}
          >
            {R.clerkInit || 'B'}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-bold text-sm tracking-tight text-[var(--fg)]">
                {R.store}
              </span>
              <span
                className="w-3.5 h-3.5 rounded-full inline-block shrink-0 shadow-inner"
                style={{ background: R.flag }}
                title={R.country}
              />
            </div>
            <div className="text-[11px] text-[rgba(var(--fgRGB),0.6)] truncate max-w-[150px]">
              {R.area}, {R.city} · <span className="font-semibold text-[var(--acc)]">{currentClerk ? currentClerk.name : R.clerk}</span>
            </div>
          </div>
        </div>

        {/* Action icons: AI Voice, Barcode Scanner */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsVoiceOpen(true)}
            className="p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition relative"
            title="Voice Order Entry"
          >
            <Mic className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-600 rounded-full animate-ping" />
          </button>

          <button
            onClick={() => setIsBarcodeOpen(true)}
            className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
            title="Barcode / Vision Scan"
          >
            <ScanBarcode className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Offline Mode Banner (Deliverable 1.F) */}
      {isOffline && (
        <div className="bg-amber-500 text-slate-950 px-4 py-2 flex items-center justify-between text-xs font-semibold shadow-xs animate-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <WifiOff className="w-4 h-4 shrink-0" />
            <span>Offline Mode - Changes will sync ({offlinePendingQueue.length} queued)</span>
          </div>
          {offlinePendingQueue.length > 0 && (
            <button
              onClick={syncOfflineData}
              className="flex items-center gap-1 px-2 py-0.5 bg-slate-900 text-white rounded text-[11px] hover:bg-slate-800 transition"
            >
              <RefreshCw className="w-3 h-3" />
              Sync
            </button>
          )}
        </div>
      )}

      {/* Main Screen Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        {children}
      </main>

      {/* Bottom Nav Bar (Deliverable 1.B) */}
      <nav className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2 flex items-center justify-around z-40">
        {navItems.map(item => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <button
              key={item.label}
              onClick={() => {
                if (item.action) {
                  item.action();
                } else {
                  navigate(item.path);
                }
              }}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition relative ${
                isActive ? 'text-blue-600 font-semibold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                {item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Profile / Clerk Switcher Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-[130] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-sm w-full p-5 text-slate-900 shadow-2xl animate-in slide-in-from-bottom-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base">Store Clerk Profile</h3>
              <button
                onClick={() => setShowProfileModal(false)}
                className="text-xs text-slate-400 hover:text-slate-700"
              >
                Close
              </button>
            </div>

            {currentClerk ? (
              <div className="py-4 space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={currentClerk.avatar}
                    alt={currentClerk.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-blue-500 shadow-sm"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900">{currentClerk.name}</h4>
                    <p className="text-xs text-slate-500">{currentClerk.phone}</p>
                    <span className="inline-block mt-1 text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-semibold">
                      Shift: {currentClerk.shift}
                    </span>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-xs space-y-1.5">
                  <div className="flex justify-between text-slate-600">
                    <span>Today's Sales:</span>
                    <strong className="text-slate-900">${currentClerk.salesToday.toFixed(2)}</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Orders Completed:</span>
                    <strong className="text-slate-900">{currentClerk.ordersToday}</strong>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Store Tenant:</span>
                    <strong className="text-blue-600">Apex Electronics Ltd</strong>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setShowProfileModal(false);
                    navigate('/clerk/login');
                  }}
                  className="w-full py-2.5 rounded-xl border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
                >
                  <LogOut className="w-4 h-4" />
                  Switch Clerk / Logout
                </button>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* Voice & Barcode modals */}
      <VoiceModal isOpen={isVoiceOpen} onClose={() => setIsVoiceOpen(false)} />
      <BarcodeModal isOpen={isBarcodeOpen} onClose={() => setIsBarcodeOpen(false)} />
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-45px)] bg-slate-900/10 flex items-center justify-center p-0 sm:p-6 lg:p-8">
      {mobileFrameMode ? (
        <div className="mobile-device-frame">
          {content}
        </div>
      ) : (
        <div className="w-full max-w-md h-[820px] bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
          {content}
        </div>
      )}
    </div>
  );
};
