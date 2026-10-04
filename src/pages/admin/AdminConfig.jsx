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
  const [maxBasicClerks, setMaxBasicClerks] = useState('5');
  const [maxProClerks, setMaxProClerks] = useState('25');

  const flagDescriptions = [
    {
      key: 'voiceOrderEntry',
      title: 'Speech-to-Text Voice Ordering',
      tier: 'AI Layer',
      desc: 'Clerk speaks item names in Flutter POS app, system parses and matches catalog SKU.'
    },
    {
      key: 'visionBarcodeScan',
      title: 'Vision OCR & Barcode Scanning',
      tier: 'AI Layer',
      desc: 'Enables mobile camera viewfinder with real-time barcode / receipt parsing.'
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
      desc: 'Auto-listens for MTN, Airtel, and M-Pesa IPN callbacks to verify customer deposits.'
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
      title: 'Multi-Currency Support (NGN, KES, GHS, USD)',
      tier: 'Localization',
      desc: 'Real-time FX conversion for cross-border African merchant billing.'
    }
  ];

  const handleSaveDefaults = (e) => {
    e.preventDefault();
    addToast('Configuration Saved', 'Global platform SaaS parameters updated.', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-indigo-400" />
            System Configuration & Feature Flags
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Global switches, engine parameters & platform resilience controls
          </p>
        </div>

        {/* Maintenance Switch (Deliverable 3.C) */}
        <div className="flex items-center gap-3 bg-slate-950 p-2.5 px-4 rounded-xl border border-slate-800">
          <div>
            <div className="text-xs font-bold text-white">Maintenance Mode</div>
            <div className="text-[10px] text-slate-400">Lock merchant POS access</div>
          </div>
          <button
            onClick={() => toggleFeatureFlag('maintenanceMode')}
            className={`p-1 rounded-full transition ${
              featureFlags.maintenanceMode ? 'text-rose-500' : 'text-slate-600'
            }`}
          >
            {featureFlags.maintenanceMode ? (
              <ToggleRight className="w-7 h-7" />
            ) : (
              <ToggleLeft className="w-7 h-7" />
            )}
          </button>
        </div>
      </div>

      {/* Feature Flags Module (Deliverable 3.C) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-indigo-400" />
              Dynamic SaaS Feature Toggles
            </h3>
            <p className="text-xs text-slate-400">Instantly activate or disable features across all active tenant stores</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {flagDescriptions.map(flag => {
            const isEnabled = featureFlags[flag.key];

            return (
              <div
                key={flag.key}
                onClick={() => toggleFeatureFlag(flag.key)}
                className={`p-4 rounded-2xl border transition cursor-pointer flex items-start justify-between gap-3 ${
                  isEnabled
                    ? 'bg-indigo-950/20 border-indigo-500/40 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-white">{flag.title}</span>
                    <span className="text-[9px] uppercase font-mono px-1.5 py-0.2 rounded bg-slate-800 text-indigo-300">
                      {flag.tier}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {flag.desc}
                  </p>
                </div>

                <div className={`p-1 rounded-full shrink-0 ${isEnabled ? 'text-indigo-400' : 'text-slate-600'}`}>
                  {isEnabled ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Default Settings Form (Deliverable 3.C) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-sm">
        <h3 className="font-bold text-base text-white mb-1 flex items-center gap-2">
          <Layers className="w-4 h-4 text-indigo-400" />
          Default Tenant Provisioning Rules
        </h3>
        <p className="text-xs text-slate-400 mb-5">
          Baseline parameters assigned when a new tenant registers via the public landing page
        </p>

        <form onSubmit={handleSaveDefaults} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              Platform Transaction Commission (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={commissionRate}
              onChange={(e) => setCommissionRate(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:ring-2 focus:ring-indigo-500/30"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              Free Trial Duration (Days)
            </label>
            <input
              type="number"
              value={trialDays}
              onChange={(e) => setTrialDays(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:ring-2 focus:ring-indigo-500/30"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">
              Max Clerks (Basic Plan)
            </label>
            <input
              type="number"
              value={maxBasicClerks}
              onChange={(e) => setMaxBasicClerks(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:ring-2 focus:ring-indigo-500/30"
            />
          </div>

          <div className="sm:col-span-3 pt-2 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-indigo-600/30 transition"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save System Parameters</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
