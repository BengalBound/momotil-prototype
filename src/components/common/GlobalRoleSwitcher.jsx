import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Smartphone,
  LayoutDashboard,
  ShieldAlert,
  Globe,
  RefreshCw,
  Wifi,
  WifiOff,
  Sun,
  Moon,
  Sparkles,
  UserCheck,
  ChevronDown
} from 'lucide-react';
import { REGIONS, GLOBAL_COUNTRIES } from '../../data/regionConfig';

export const GlobalRoleSwitcher = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    isOffline,
    setIsOffline,
    syncOfflineData,
    offlinePendingQueue,
    resetAllData,
    theme,
    toggleTheme,
    regionCode,
    setRegionCode,
    currentRegion,
    language,
    setLanguage,
    impersonatedUser,
    exitImpersonation
  } = useApp();

  const [showDemoModal, setShowDemoModal] = useState(false);

  const isVendeurMobile = location.pathname.startsWith('/vendeur') || location.pathname.startsWith('/clerk');
  const isCeoMobile = location.pathname.startsWith('/ceo/mobile') || location.pathname.startsWith('/manager');
  const isCeoWeb = location.pathname.startsWith('/ceo') && !isCeoMobile;
  const isAdmin = location.pathname.startsWith('/admin');
  const isLanding = location.pathname === '/';

  const regionsList = [
    { code: 'ci', label: 'CI', flag: REGIONS.ci.flag, title: "Côte d'Ivoire (Abidjan)" },
    { code: 'sn', label: 'SN', flag: REGIONS.sn.flag, title: 'Sénégal (Dakar)' },
    { code: 'bd', label: 'BD', flag: REGIONS.bd.flag, title: 'বাংলাদেশ (Dhaka)' }
  ];

  return (
    <>
      {/* ── Top Prototype Chrome Bar matching BoundOS ── */}
      <header className="sticky top-0 z-[60] bg-[rgba(var(--bgRGB),0.94)] backdrop-blur-md border-b border-[rgba(var(--lineRGB),0.09)] select-none">
        {/* Tricolor Top Bar Accent (BoundOS signature) */}
        <div
          className="h-1 w-full"
          style={{
            background: 'linear-gradient(90deg, var(--acc) 0 34%, #F3EEE4 34% 67%, var(--acc2) 67%)'
          }}
        />

        {/* Impersonation Banner if active */}
        {impersonatedUser && (
          <div className="bg-amber-500 text-slate-950 font-semibold px-4 py-1.5 flex items-center justify-between animate-pulse text-xs">
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4" />
              <span>Session: <strong>{impersonatedUser.name}</strong> ({impersonatedUser.role} @ {impersonatedUser.tenant})</span>
            </div>
            <button
              onClick={exitImpersonation}
              className="bg-slate-900 text-white text-[11px] px-2.5 py-0.5 rounded hover:bg-slate-800 transition"
            >
              Quitter
            </button>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-3 sm:px-5 py-2 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Logo & Platform Tag */}
          <div className="flex items-center gap-3">
            <div
              onClick={() => navigate('/')}
              className="cursor-pointer flex items-baseline gap-1.5 font-display font-extrabold tracking-tight hover:opacity-85 transition"
            >
              <span className="text-lg">BOUND</span>
              <span className="font-mono text-[10px] tracking-widest text-[var(--acc)] font-bold uppercase">
                OS
              </span>
            </div>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold tracking-wider bg-[var(--accSoft)] text-[var(--acc)] border border-[rgba(var(--lineRGB),0.12)]">
              {currentRegion.country}
            </span>
          </div>

          {/* Navigation Tabs (Landing, Vendeur Mobile, Manager/Patron Mobile, CEO Web, Master Admin) */}
          <nav className="flex items-center gap-1 overflow-x-auto p-1 rounded-xl bg-[var(--card)] border border-[rgba(var(--lineRGB),0.08)]">
            <button
              onClick={() => navigate('/')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${
                isLanding
                  ? 'bg-[var(--acc)] text-[var(--onAcc)] font-bold shadow-xs'
                  : 'text-[rgba(var(--fgRGB),0.7)] hover:text-[var(--fg)] hover:bg-[var(--raise)]'
              }`}
            >
              Overview
            </button>

            {/* Vendeur Mobile (Tier 1) */}
            <button
              onClick={() => navigate('/vendeur')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${
                isVendeurMobile
                  ? 'bg-[var(--acc)] text-[var(--onAcc)] font-bold shadow-xs'
                  : 'text-[rgba(var(--fgRGB),0.7)] hover:text-[var(--fg)] hover:bg-[var(--raise)]'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Vendeur Mobile</span>
            </button>

            {/* Manager & Patron Mobile (Tier 2 Mobile) */}
            <button
              onClick={() => navigate('/manager')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${
                isCeoMobile
                  ? 'bg-[var(--acc)] text-[var(--onAcc)] font-bold shadow-xs'
                  : 'text-[rgba(var(--fgRGB),0.7)] hover:text-[var(--fg)] hover:bg-[var(--raise)]'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-[var(--acc)]" />
              <span>Manager &amp; Patron</span>
            </button>

            {/* CEO Web Dashboard */}
            <button
              onClick={() => navigate('/ceo/dashboard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${
                isCeoWeb
                  ? 'bg-[var(--acc)] text-[var(--onAcc)] font-bold shadow-xs'
                  : 'text-[rgba(var(--fgRGB),0.7)] hover:text-[var(--fg)] hover:bg-[var(--raise)]'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>CEO Web</span>
            </button>

            {/* Master Admin (Tier 3) */}
            <button
              onClick={() => navigate('/admin/tenants')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${
                isAdmin
                  ? 'bg-[var(--acc)] text-[var(--onAcc)] font-bold shadow-xs'
                  : 'text-[rgba(var(--fgRGB),0.7)] hover:text-[var(--fg)] hover:bg-[var(--raise)]'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Master Admin</span>
            </button>
          </nav>

          {/* Region Chips & Controls */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Country Selector Chips */}
            <div className="flex items-center gap-1">
              {regionsList.map(r => (
                <button
                  key={r.code}
                  onClick={() => setRegionCode(r.code)}
                  title={r.title}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border transition ${
                    regionCode === r.code
                      ? 'bg-[var(--raise)] border-[var(--acc)] text-[var(--fg)]'
                      : 'bg-transparent border-[rgba(var(--lineRGB),0.15)] text-[rgba(var(--fgRGB),0.6)] hover:text-[var(--fg)]'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full shadow-inner block"
                    style={{ background: r.flag }}
                  />
                  <span>{r.label}</span>
                </button>
              ))}
            </div>

            {/* Light / Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-full border border-[rgba(var(--lineRGB),0.15)] text-[rgba(var(--fgRGB),0.7)] hover:text-[var(--fg)] hover:bg-[var(--raise)] transition"
              title="Basculer Mode Clair / Sombre"
            >
              {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-700" />}
            </button>

            {/* Offline Simulation Switcher */}
            <button
              onClick={() => {
                if (isOffline && offlinePendingQueue.length > 0) {
                  syncOfflineData();
                } else {
                  setIsOffline(!isOffline);
                }
              }}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border flex items-center gap-1.5 transition ${
                isOffline
                  ? 'bg-[rgba(255,183,3,0.15)] border-[var(--warn)] text-[var(--warnFg)] animate-pulse'
                  : 'bg-[rgba(10,123,79,0.12)] border-[rgba(10,123,79,0.3)] text-[var(--ok)]'
              }`}
              title="Test du mode hors ligne (SQLite local)"
            >
              {isOffline ? <WifiOff className="w-3 h-3" /> : <Wifi className="w-3 h-3" />}
              <span className="hidden sm:inline">
                {isOffline ? `Hors ligne (${offlinePendingQueue.length})` : 'En ligne'}
              </span>
            </button>

            {/* Presentation Guide Modal */}
            <button
              onClick={() => setShowDemoModal(true)}
              className="px-2.5 py-1 rounded-full bg-[var(--raise)] border border-[rgba(var(--lineRGB),0.15)] text-[var(--fg)] font-semibold flex items-center gap-1 hover:border-[var(--acc)] transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-[var(--acc)]" />
              <span className="hidden sm:inline">Guide</span>
            </button>
          </div>
        </div>
      </header>

      {/* Presentation Tour Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeUp">
          <div className="bg-[var(--card)] border border-[rgba(var(--lineRGB),0.15)] rounded-3xl max-w-2xl w-full p-6 text-[var(--fg)] shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between pb-4 border-b border-[rgba(var(--lineRGB),0.1)]">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center font-display font-black text-lg"
                  style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}
                >
                  B
                </div>
                <div>
                  <h3 className="text-base font-display font-bold">BOUND OS · Guide de Présentation</h3>
                  <p className="text-xs text-[rgba(var(--fgRGB),0.55)]">« Le pays d'abord. Le logiciel ensuite. »</p>
                </div>
              </div>
              <button
                onClick={() => setShowDemoModal(false)}
                className="p-1 rounded-full text-[rgba(var(--fgRGB),0.5)] hover:text-[var(--fg)]"
              >
                ✕
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs sm:text-sm text-[rgba(var(--fgRGB),0.85)] leading-relaxed">
              <p>
                Bienvenue sur <strong>BOUND OS</strong>. Le pays sélectionné (Côte d'Ivoire, Sénégal, Bangladesh) contrôle instantanément la langue, les devises (FCFA, ৳), les moyens de paiement mobiles (Wave, Orange, MTN, bKash), le catalogue et la mission locale.
              </p>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-[var(--raise)] border border-[rgba(var(--lineRGB),0.08)]">
                  <strong className="text-[var(--acc)] block mb-1">📱 Vendeur Mobile (Tier 1)</strong>
                  <ul className="text-xs space-y-1 list-disc list-inside text-[rgba(var(--fgRGB),0.7)]">
                    <li>2 touches par vente, zéro clavier obligatoire</li>
                    <li>Reconnaissance vocale en Nouchi, Dioula, Wolof, Bangla</li>
                    <li>Reçu thermique avec envoi direct sur WhatsApp</li>
                    <li>File d'attente hors-ligne SQLite</li>
                  </ul>
                </div>

                <div className="p-3.5 rounded-2xl bg-[var(--raise)] border border-[rgba(var(--lineRGB),0.08)]">
                  <strong className="text-[var(--acc2)] block mb-1">👔 Manager &amp; Patron (Tier 2)</strong>
                  <ul className="text-xs space-y-1 list-disc list-inside text-[rgba(var(--fgRGB),0.7)]">
                    <li>Pas d'ordinateur requis : 100% sur mobile</li>
                    <li>Clôture de caisse quotidienne en 1 clic</li>
                    <li>Validation des transactions et remises</li>
                    <li>Gestion des permissions d'équipe (RBAC)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[rgba(var(--lineRGB),0.1)] flex justify-end">
              <button
                onClick={() => setShowDemoModal(false)}
                className="px-5 py-2.5 rounded-xl font-display font-bold text-xs shadow-md"
                style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}
              >
                Commencer l'exploration
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
