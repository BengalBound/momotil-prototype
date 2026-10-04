import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UserPlus, Store, Users, Package, Mic, ShoppingCart,
  TrendingUp, Bell, RefreshCw, ChevronRight, CheckCircle2,
  Camera, Sparkles, Smartphone, Globe, ArrowRight, BarChart3,
  AlertTriangle, FileText
} from 'lucide-react';

const FLOW_STEPS = [
  {
    id: 1,
    phase: 'Onboarding',
    icon: UserPlus,
    color: '#2563EB',
    title: 'Sign Up & Choose Region',
    who: 'Business Owner',
    badge: '👑 Owner',
    desc: 'The owner signs up, selects their country (Côte d\'Ivoire, Sénégal, Bangladesh, or English/Global). BOUND OS instantly adapts the language, currency, and payment rails — no configuration needed.',
    details: [
      '✅ Select region → language auto-detected',
      '✅ Currency & payment rails configured instantly',
      '✅ Choose plan: Starter, Growth, or Enterprise',
      '✅ Store is live in under 2 minutes',
    ],
    screens: ['/#/signup'],
    screenLabel: 'See Signup →',
  },
  {
    id: 2,
    phase: 'Owner Setup',
    icon: Store,
    color: '#FF6A13',
    title: 'Owner Configures Store',
    who: 'Owner / Patron',
    badge: '👑 Owner',
    desc: 'The owner uses the Owner mobile app (Manager & Patron) to set up pricing, add initial inventory, and configure the store. They can add products manually, by photographing a single item, scanning a shelf, or taking a photo of a supplier invoice — AI fills in the rest automatically.',
    details: [
      '📦 Manual entry: type name, price, stock',
      '📷 Photo (1 item): AI identifies product → auto-fills description + image from the web',
      '📸 Shelf scan: detect 5–10 products at once from a single photo',
      '🧾 Invoice OCR: photograph supplier invoice → AI extracts all items, quantities & prices',
      '🤖 Powered by Gemini Vision + Google Search API',
    ],
    screens: ['/#/manager'],
    screenLabel: 'See Owner App →',
  },
  {
    id: 3,
    phase: 'Team Setup',
    icon: Users,
    color: '#059669',
    title: 'Owner Creates Manager Account',
    who: 'Owner → Manager',
    badge: '👑→👔',
    desc: 'The owner invites a manager from the Owner app. The manager gets a dedicated login with configurable permissions (approve sales, manage pricing, view analytics, export reports, manage team).',
    details: [
      '👔 Manager receives invite via WhatsApp / SMS',
      '🔐 Owner sets RBAC permissions per manager',
      '📊 Manager sees: sales, approvals, team tasks',
      '🚫 Owner-only: pricing, margins, export, full analytics',
    ],
    screens: ['/#/manager'],
    screenLabel: 'See Manager App →',
  },
  {
    id: 4,
    phase: 'Clerk Setup',
    icon: Mic,
    color: '#7C3AED',
    title: 'Manager Creates Sales Clerks',
    who: 'Manager',
    badge: '👔 Manager',
    desc: 'The manager creates clerk accounts directly from the app. Each clerk gets a phone number login and a mobile POS app. No training needed — the app is voice-first in the clerk\'s native language.',
    details: [
      '🎤 Clerk speaks in French, Wolof, Bengali, Dioula, English…',
      '🤖 AI extracts product name, qty, and price from speech',
      '💡 AI auto-corrects misheard product names against inventory',
      '📱 Works offline — syncs when connectivity restored',
    ],
    screens: ['/#/vendeur'],
    screenLabel: 'See Clerk App →',
  },
  {
    id: 5,
    phase: 'Inventory',
    icon: Package,
    color: '#0891B2',
    title: 'Add & Manage Inventory',
    who: 'Manager or Owner',
    badge: '👑 / 👔',
    desc: 'Both managers and owners can add inventory through multiple methods. The AI-powered inventory system checks stock levels continuously and alerts when items need restocking.',
    details: [
      '📦 Add single product by photo → AI fetches image + description',
      '📸 Photograph shelf → AI detects up to 10 products at once',
      '🧾 Photograph invoice → AI reads every line item and quantity',
      '📊 AI monitors stock daily, generates low-stock alerts',
      '🤖 AI requests reorder permission from owner/manager automatically',
    ],
    screens: ['/#/manager'],
    screenLabel: 'Try Inventory →',
  },
  {
    id: 6,
    phase: 'Selling',
    icon: ShoppingCart,
    color: '#FF6A13',
    title: 'Clerk Makes a Sale by Voice',
    who: 'Sales Clerk',
    badge: '🎤 Clerk',
    desc: 'The clerk simply speaks the sale aloud — "I sold 3 oil filters at 2,500 FCFA, customer paid on Wave." The AI transcribes, extracts intent, cross-references inventory, and creates the order. The clerk selects the payment rail and the receipt is sent via WhatsApp.',
    details: [
      '🎤 Clerk speaks in any supported language or dialect',
      '🧠 AI: transcribe → extract → verify → confirm',
      '💡 Correction: AI auto-fixes misheard product names',
      '💳 Payment rails: Wave, MTN MoMo, bKash, Card, Cash…',
      '📱 Receipt via WhatsApp in 1 tap',
      '📵 Offline: orders saved in SQLite, synced automatically',
    ],
    screens: ['/#/vendeur'],
    screenLabel: 'Try Voice Sale →',
  },
  {
    id: 7,
    phase: 'Approvals',
    icon: CheckCircle2,
    color: '#059669',
    title: 'Manager Approves High-Value Sales',
    who: 'Manager or Owner',
    badge: '👔 / 👑',
    desc: 'When a sale exceeds a threshold or includes a manual discount, it requires approval. The manager or owner receives a push notification and can approve or reject with one tap — from anywhere.',
    details: [
      '🔔 Real-time push notification to manager/owner',
      '📋 Full transaction detail shown (items, amount, payment method)',
      '✅ One-tap approve or ❌ reject with reason',
      '📊 All decisions logged in audit trail',
    ],
    screens: ['/#/manager'],
    screenLabel: 'See Approvals →',
  },
  {
    id: 8,
    phase: 'Analytics',
    icon: BarChart3,
    color: '#7C3AED',
    title: 'AI Analytics, Reports & Projections',
    who: 'Owner / Manager',
    badge: '📊 AI',
    desc: 'Every week, the AI generates a business report covering sales trends, top products, clerk performance, and revenue projections. It also flags anomalies and recommends actions automatically.',
    details: [
      '📊 Daily/weekly revenue dashboard',
      '🏆 Top-selling products & worst performers',
      '👥 Per-clerk performance tracking',
      '📈 Revenue projections based on historical trends',
      '📉 Anomaly detection: unusual discounts or voids',
      '📬 Weekly PDF report sent to owner via WhatsApp/email',
    ],
    screens: ['/#/ceo/analytics'],
    screenLabel: 'See Analytics →',
  },
  {
    id: 9,
    phase: 'Reordering',
    icon: AlertTriangle,
    color: '#F59E0B',
    title: 'AI Monitors Stock & Requests Reorder',
    who: 'AI → Manager/Owner',
    badge: '🤖 AI Agent',
    desc: 'When inventory falls below a configurable threshold, the AI automatically creates a reorder request and sends it to the manager or owner for approval. Once approved, it generates the supplier order and logs it.',
    details: [
      '📦 Stock threshold breach → AI alert triggered',
      '🤖 AI suggests reorder quantity based on sales velocity',
      '📲 Push notification to owner + manager for approval',
      '✅ One-tap approve → supplier order generated',
      '📊 Reorder history tracked in analytics',
    ],
    screens: ['/#/manager'],
    screenLabel: 'See Alerts →',
  },
];

export const HowItWorksPage = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(null);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      {/* Hero */}
      <div className="relative overflow-hidden border-b" style={{ borderColor: 'rgba(var(--lineRGB),0.08)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-[0.07] blur-3xl"
            style={{ background: 'var(--acc)' }} />
        </div>
        <div className="max-w-4xl mx-auto px-6 py-16 text-center relative">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full text-xs font-bold border"
            style={{ background: 'var(--accSoft)', borderColor: 'rgba(var(--lineRGB),0.1)', color: 'var(--acc)' }}>
            <Sparkles className="w-3.5 h-3.5" /> Complete Platform Walkthrough
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl tracking-tight mb-4">
            How BOUND OS Works
          </h1>
          <p className="text-base max-w-xl mx-auto" style={{ color: 'rgba(var(--fgRGB),0.55)' }}>
            From sign-up to your first sale — a complete journey through every tier of the platform, from owner to manager to sales clerk.
          </p>
          <div className="flex items-center justify-center gap-3 mt-6 flex-wrap">
            <button onClick={() => navigate('/signup')}
              className="px-5 py-2.5 rounded-xl font-display font-bold text-sm flex items-center gap-2"
              style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}>
              Start Free Trial <ArrowRight className="w-4 h-4" />
            </button>
            <button onClick={() => navigate('/')}
              className="px-5 py-2.5 rounded-xl font-semibold text-sm border"
              style={{ borderColor: 'rgba(var(--lineRGB),0.12)', color: 'rgba(var(--fgRGB),0.7)' }}>
              ← Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* Role Legend */}
      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="flex flex-wrap gap-3 justify-center">
          {[
            { badge: '👑 Owner', desc: 'Full control — pricing, reports, all approvals' },
            { badge: '👔 Manager', desc: 'Day-to-day ops, approvals, team tasks' },
            { badge: '🎤 Clerk', desc: 'Voice-first selling, no keyboard needed' },
            { badge: '🤖 AI Agent', desc: 'Inventory, analytics & auto-alerts' },
          ].map((r, i) => (
            <div key={i} className="px-4 py-2 rounded-2xl border text-xs flex items-center gap-2"
              style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.08)' }}>
              <span className="font-bold">{r.badge}</span>
              <span style={{ color: 'rgba(var(--fgRGB),0.5)' }}>{r.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Flow Steps */}
      <div className="max-w-4xl mx-auto px-6 pb-20 space-y-4">
        {FLOW_STEPS.map((step, idx) => {
          const Icon = step.icon;
          const isOpen = activeStep === step.id;
          return (
            <div key={step.id}
              className="rounded-3xl border overflow-hidden transition-all"
              style={{ background: 'var(--card)', borderColor: isOpen ? step.color : 'rgba(var(--lineRGB),0.08)' }}>

              {/* Step Header */}
              <button
                onClick={() => setActiveStep(isOpen ? null : step.id)}
                className="w-full p-5 flex items-center gap-4 text-left transition"
              >
                {/* Number + Icon */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-md"
                    style={{ background: step.color, color: '#fff' }}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black"
                    style={{ background: 'rgba(var(--lineRGB),0.08)', color: 'rgba(var(--fgRGB),0.5)' }}>
                    {step.id}
                  </div>
                </div>

                {/* Title */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-display font-bold text-base">{step.title}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(var(--lineRGB),0.07)', color: 'rgba(var(--fgRGB),0.55)' }}>
                      {step.badge}
                    </span>
                  </div>
                  <div className="text-[11px] font-mono mt-0.5" style={{ color: 'rgba(var(--fgRGB),0.4)' }}>
                    PHASE {step.id} · {step.phase}
                  </div>
                </div>

                {/* Expand chevron */}
                <ChevronRight className={`w-5 h-5 shrink-0 transition-transform ${isOpen ? 'rotate-90' : ''}`}
                  style={{ color: 'rgba(var(--fgRGB),0.35)' }} />
              </button>

              {/* Expanded Content */}
              {isOpen && (
                <div className="px-5 pb-5 space-y-4 border-t" style={{ borderColor: 'rgba(var(--lineRGB),0.06)' }}>
                  <p className="text-sm pt-4" style={{ color: 'rgba(var(--fgRGB),0.65)', lineHeight: 1.7 }}>
                    {step.desc}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-2">
                    {step.details.map((d, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs px-3 py-2 rounded-xl"
                        style={{ background: 'var(--raise)' }}>
                        <span className="flex-1" style={{ color: 'rgba(var(--fgRGB),0.75)' }}>{d}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 flex-wrap pt-1">
                    {step.screens.map((path, i) => (
                      <button key={i} onClick={() => navigate(path)}
                        className="px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
                        style={{ background: step.color, color: '#fff' }}>
                        {step.screenLabel} <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* CTA Footer */}
      <div className="border-t" style={{ borderColor: 'rgba(var(--lineRGB),0.08)' }}>
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="font-display font-black text-3xl mb-3">Ready to Get Started?</h2>
          <p className="text-sm mb-8" style={{ color: 'rgba(var(--fgRGB),0.55)' }}>
            Set up your store in under 2 minutes. No training. No keyboard. Just speak.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button onClick={() => navigate('/signup')}
              className="px-8 py-3.5 rounded-2xl font-display font-bold text-base flex items-center gap-2 shadow-xl"
              style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}>
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </button>
            <button onClick={() => navigate('/')}
              className="px-8 py-3.5 rounded-2xl font-semibold text-base border"
              style={{ borderColor: 'rgba(var(--lineRGB),0.15)', color: 'rgba(var(--fgRGB),0.7)' }}>
              View Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
