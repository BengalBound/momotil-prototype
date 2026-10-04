import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sliders,
  ToggleLeft,
  ToggleRight,
  ShieldAlert,
  Server,
  Save,
  CheckCircle2,
  RefreshCw,
  Cpu,
  Layers,
  Database
} from 'lucide-react';

export const AdminConfig = () => {
  const { featureFlags, toggleFeatureFlag, addToast } = useApp();

  // Platform default settings state
  const [commissionRate, setCommissionRate] = useState('1.5');
  const [trialDays, setTrialDays] = useState('14');
  const [maxFreeClerks, setMaxFreeClerks] = useState('2');
  const [maxBasicClerks, setMaxBasicClerks] = useState('6');
  const [maxProClerks, setMaxProClerks] = useState('25');

  const flagDescriptions = [
    {
      key: 'voiceOrderEntry',
      title: 'Speech-to-Text Voice Ordering',
      tier: 'AI Layer',
      desc: 'Clerk speaks item names in POS app, system parses and matches catalog SKU.'
    },
    {
      key: 'visionBarcodeScan',
      title: 'Vision OCR & Barcode Scanning',
      tier: 'AI Layer',
      desc: 'Enables mobile camera viewfinder with real-time barcode and invoice OCR parsing.'
    },
    {
      key: 'offlineSqliteSync',
      title: 'Offline-First SQLite Cache & Queue',
      tier: 'Storage',
      desc: 'Allows transactions in zero-connectivity areas with background replay queue.'
    },
    {
      key: 'momoWebhookAutoReconcile',
      title: 'Mobile Money Webhook Auto-Reconciliation',
      tier: 'Core Payments',
      desc: 'Auto-listens for Wave, MTN MoMo, and Orange Money IPN callbacks to verify customer deposits.'
    },
    {
      key: 'instantThermalReceipts',
      title: 'Bluetooth ESC/POS Thermal Printing',
      tier: 'Hardware',
      desc: 'Dispatches 58mm/80mm receipt templates directly to handheld mobile printers.'
    },
    {
      key: 'aiDemandForecasting',
      title: 'AI Stock Depletion Forecasting',
      tier: 'Beta Feature',
      desc: 'Predicts running out of high-velocity items 48 hours in advance using time-series.'
    },
    {
      key: 'multiCurrencySwitching',
      title: 'Multi-Currency Support (XOF, NGN, KES, GHS, BDT, USD)',
      tier: 'Localization',
      desc: 'Real-time FX conversion for cross-border African merchant billing.'
    }
  ];

  const handleSaveDefaults = (e) => {
    e.preventDefault();
    addToast('Configuration Saved', 'Global platform SaaS parameters updated.', 'success');
  };

  const inputStyle = {
    background: 'var(--sunken)',
    border: '1px solid rgba(var(--lineRGB), 0.12)',
    color: 'var(--fg)',
    borderRadius: '12px',
    padding: '8px 12px',
    fontSize: '12px',
    width: '100%',
    outline: 'none'
  };

  return (
    <div className="space-y-6 select-none" style={{ color: 'var(--fg)' }}>
      {/* Header */}
      <div
        className="p-5 rounded-3xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm"
        style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.08)' }}
      >
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: 'var(--fg)' }}>
            <Sliders className="w-5 h-5 text-[var(--acc)]" />
            <span>System Configuration &amp; Feature Flags</span>
          </h2>
          <p className="text-xs mt-0.5" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>
            Global switches, engine parameters &amp; platform resilience controls
          </p>
        </div>

        {/* Maintenance Switch */}
        <div
          className="flex items-center gap-3 p-2.5 px-4 rounded-2xl border"
          style={{ background: 'var(--sunken)', borderColor: 'rgba(var(--lineRGB),0.08)' }}
        >
          <div>
            <div className="text-xs font-bold" style={{ color: 'var(--fg)' }}>Maintenance Mode</div>
            <div className="text-[10px]" style={{ color: 'rgba(var(--fgRGB),0.45)' }}>Lock merchant POS access</div>
          </div>
          <button
            onClick={() => toggleFeatureFlag('maintenanceMode')}
            className={`p-1 rounded-full transition cursor-pointer ${
              featureFlags.maintenanceMode ? 'text-rose-500' : 'text-slate-500'
            }`}
          >
            {featureFlags.maintenanceMode ? (
              <ToggleRight className="w-8 h-8 fill-current" />
            ) : (
              <ToggleLeft className="w-8 h-8" />
            )}
          </button>
        </div>
      </div>

      {/* Feature Flags Grid */}
      <div
        className="p-5 sm:p-6 rounded-3xl border shadow-sm space-y-4"
        style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.08)' }}
      >
        <div>
          <h3 className="font-bold text-base flex items-center gap-2" style={{ color: 'var(--fg)' }}>
            <Cpu className="w-5 h-5 text-[var(--acc)]" />
            <span>Global Feature Flags (Zero-Downtime Rollout)</span>
          </h3>
          <p className="text-xs" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>
            Toggle modules system-wide without rebuilding or redeploying client containers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {flagDescriptions.map(flag => {
            const isEnabled = featureFlags[flag.key] ?? false;

            return (
              <div
                key={flag.key}
                className="p-4 rounded-2xl border flex items-start justify-between gap-3 transition hover:border-[rgba(var(--lineRGB),0.2)]"
                style={{ background: 'var(--sunken)', borderColor: 'rgba(var(--lineRGB),0.06)' }}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs" style={{ color: 'var(--fg)' }}>{flag.title}</span>
                    <span
                      className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded"
                      style={{ background: 'var(--raise)', color: 'var(--acc)' }}
                    >
                      {flag.tier}
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed" style={{ color: 'rgba(var(--fgRGB),0.55)' }}>
                    {flag.desc}
                  </p>
                </div>

                <button
                  onClick={() => toggleFeatureFlag(flag.key)}
                  className={`p-1 rounded-full shrink-0 transition cursor-pointer ${
                    isEnabled ? 'text-emerald-400' : 'text-slate-500'
                  }`}
                  title={isEnabled ? 'Disable Feature' : 'Enable Feature'}
                >
                  {isEnabled ? (
                    <ToggleRight className="w-7 h-7 fill-current" />
                  ) : (
                    <ToggleLeft className="w-7 h-7" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Default SaaS Tier Caps */}
      <div
        className="p-5 sm:p-6 rounded-3xl border shadow-sm space-y-4"
        style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.08)' }}
      >
        <div>
          <h3 className="font-bold text-base flex items-center gap-2" style={{ color: 'var(--fg)' }}>
            <Database className="w-5 h-5 text-[var(--acc)]" />
            <span>SaaS Plan Limits &amp; Infrastructure Quotas</span>
          </h3>
          <p className="text-xs" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>
            Enforce terminal limits per subscription tier across all tenant schemas
          </p>
        </div>

        <form onSubmit={handleSaveDefaults} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold mb-1" style={{ color: 'rgba(var(--fgRGB),0.7)' }}>Free Plan Max Clerks</label>
              <input
                type="number"
                value={maxFreeClerks}
                onChange={e => setMaxFreeClerks(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div>
              <label className="block font-semibold mb-1" style={{ color: 'rgba(var(--fgRGB),0.7)' }}>Growth Plan Max Clerks</label>
              <input
                type="number"
                value={maxBasicClerks}
                onChange={e => setMaxBasicClerks(e.target.value)}
                style={inputStyle}
              />
            </div>

            <div>
              <label className="block font-semibold mb-1" style={{ color: 'rgba(var(--fgRGB),0.7)' }}>Enterprise Max Clerks</label>
              <input
                type="number"
                value={maxProClerks}
                onChange={e => setMaxProClerks(e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>

          <div className="flex justify-end pt-2 border-t" style={{ borderColor: 'rgba(var(--lineRGB),0.06)' }}>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition active:scale-95 cursor-pointer shadow-md"
              style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}
            >
              <Save className="w-4 h-4" />
              <span>Save Configuration</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
