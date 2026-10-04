import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UserPlus, Store, Users, Package, Mic, ShoppingCart,
  TrendingUp, Bell, RefreshCw, ChevronRight, CheckCircle2,
  Camera, Sparkles, Smartphone, Globe, ArrowRight, BarChart3,
  AlertTriangle, FileText, Play, Pause, Volume2, VolumeX,
  RotateCcw, FastForward, Sliders, ShieldCheck, CheckSquare, Layers
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
    desc: 'The store owner signs up and selects their operating country (Côte d\'Ivoire, Sénégal, Bangladesh, or Global English). BOUND OS immediately adapts currency, local languages, tax rules, and mobile money payment rails with zero manual config.',
    audioText: 'Step one: Instant Onboarding. The business owner registers and selects their target region. BOUND OS automatically adapts local currency, multilingual voice support, and mobile money rails such as Wave, MTN MoMo, Orange Money, or bKash in under two minutes.',
    details: [
      '✅ Multi-tenant isolation with custom tenant subdomain',
      '✅ Currency & localized payment rails auto-configured (Wave, MTN, OM)',
      '✅ Tiered subscription setup: Starter, Growth, or Enterprise',
      '✅ Instant database deployment ready for store operations',
    ],
    screens: ['/#/signup'],
    screenLabel: 'See Signup →',
  },
  {
    id: 2,
    phase: 'Owner Setup',
    icon: Store,
    color: '#FF6A13',
    title: 'Configure Per-Product Pricing & Commissions',
    who: 'Owner / Patron',
    badge: '👑 Owner',
    desc: 'The owner opens the Patron interface to configure per-product wholesale costs, retail prices, and clerk commission rates with interactive steppers. The system dynamically projects total estimated monthly profit in real-time.',
    audioText: 'Step two: Store Configuration and Pricing. The store owner sets wholesale costs, retail prices, and clerk commission percentages for every product. As prices or commissions are adjusted with quick steppers, the platform recalculates unit margins and estimated monthly profits instantly.',
    details: [
      '📊 Per-product cost, price, and commission steppers with instant profit calculation',
      '💰 Real-time Est. Monthly Profit projection card (e.g. 98,252 FCFA)',
      '⚙️ Store-wide markup rules and manager approval thresholds',
      '👑 Exclusive Owner/Patron authority over profit margins',
    ],
    screens: ['/#/manager'],
    screenLabel: 'See Owner Pricing →',
  },
  {
    id: 3,
    phase: 'Team Setup',
    icon: Users,
    color: '#059669',
    title: 'Owner Creates Manager Accounts (Alpha & Beta)',
    who: 'Owner → Managers',
    badge: '👑→👔',
    desc: 'The owner creates two store manager accounts: Manager 1 for Team Alpha and Manager 2 for Team Beta. Each manager receives dedicated credentials and role-based permissions for day-to-day operations and clerk supervision.',
    audioText: 'Step three: Store Hierarchy and Management. The owner deploys two dedicated store managers: one overseeing Team Alpha and another leading Team Beta. Each manager receives granular role-based permissions to supervise sales, assign tasks, and authorize transactions.',
    details: [
      '👔 Store structure: 1 Owner (Patron) + 2 Store Managers (Alpha & Beta)',
      '🔐 Granular RBAC permissions: transaction approvals, shift close, task dispatch',
      '📱 Dedicated Manager mobile app with live KPI feeds',
      '🚫 Guardrails: only Patron can alter pricing models or download global accounting audits',
    ],
    screens: ['/#/manager'],
    screenLabel: 'See Manager App →',
  },
  {
    id: 4,
    phase: 'Clerk Setup',
    icon: Mic,
    color: '#7C3AED',
    title: 'Managers Onboard Up to 6 Sales Clerks',
    who: 'Managers → Clerks',
    badge: '👔 Manager',
    desc: 'Managers dispatch up to six sales clerks divided across Team Alpha and Team Beta. Clerks receive mobile PIN logins with a voice-first interface that eliminates computer literacy barriers.',
    audioText: 'Step four: Sales Clerk Onboarding. Managers create accounts for up to six sales clerks divided into teams. Clerks receive a mobile terminal with voice-first input, enabling anyone to register sales naturally in their native dialect without typing or keyboard skills.',
    details: [
      '👥 Up to 6 clerks assigned across Team Alpha and Team Beta',
      '🎤 Voice recognition tuned for local accents (French, Wolof, Dioula, Bengali, English)',
      '📱 Simple PIN login on any budget smartphone',
      '📵 Offline operation: sales store locally in SQLite during connectivity drops',
    ],
    screens: ['/#/vendeur'],
    screenLabel: 'See Clerk App →',
  },
  {
    id: 5,
    phase: 'AI Inventory',
    icon: Package,
    color: '#0891B2',
    title: 'AI Multi-Mode Inventory Scanning',
    who: 'Manager or Owner',
    badge: '🤖 AI Vision',
    desc: 'Inventory can be added through three automated AI vision modes: photographing a single item, scanning a shelf with 5–10 items at once, or photographing a supplier paper invoice for OCR extraction and web catalog matching.',
    audioText: 'Step five: AI-Powered Inventory Scanning. Adding inventory is effortless. Managers can snap a photo of a single item, photograph an entire store shelf to detect five to ten products at once, or snap an invoice photo. Google Gemini AI reads line items, descriptions, and web images automatically.',
    details: [
      '📸 Photo (1 item): AI identifies product, auto-fetches image & description from internet',
      '📦 Shelf Scan: Computer vision detects 5–10 visible products in one photo',
      '🧾 Invoice OCR: Photographed supplier receipt parsed into catalog items & quantities',
      '⚡ Automated stock alerts and discrepancy flagging',
    ],
    screens: ['/#/ceo/inventory'],
    screenLabel: 'Try AI Inventory →',
  },
  {
    id: 6,
    phase: 'Selling',
    icon: ShoppingCart,
    color: '#FF6A13',
    title: 'Voice-First POS Sales & Quick Barcode Scan',
    who: 'Sales Clerk',
    badge: '🎤 Clerk',
    desc: 'Clerks speak natural sales aloud — "Sold 3 Toyota oil filters, paid with Wave." AI parses item quantities, validates inventory, records commission, and pushes mobile money prompt or instant WhatsApp receipt.',
    audioText: 'Step six: Frontline Voice Sales. During busy market hours, the clerk simply speaks the order into their phone. The AI transcribes the voice, confirms the items against active stock, registers the clerk commission, and triggers a mobile money push payment.',
    details: [
      '🗣️ Natural speech parsing with fuzzy auto-correction for misheard parts',
      '📷 Instant camera barcode scanning for packaged merchandise',
      '💳 One-tap Mobile Money push rails (Wave QR, MTN MoMo, Orange Money USSD)',
      '📲 Instant WhatsApp digital receipt dispatch to customer mobile phone',
    ],
    screens: ['/#/vendeur'],
    screenLabel: 'Try Voice Sale →',
  },
  {
    id: 7,
    phase: 'Approvals & Tasks',
    icon: CheckCircle2,
    color: '#059669',
    title: 'Task Dispatch, Team Chat & Transaction Approvals',
    who: 'Managers & Patron',
    badge: '👔 / 👑',
    desc: 'Managers assign daily tasks to clerks with status tracking, communicate through voice-enabled team chat with photo attachments, and approve clerk inventory change requests and high-value orders.',
    audioText: 'Step seven: Field Tasks and Approvals. Managers assign daily store tasks to clerks and track completion history in real time. If a clerk proposes a stock adjustment or applies an override discount, a push approval ticket notifies the manager for one-tap authorization.',
    details: [
      '📋 Daily task creation & clerk task history with completion proof photos',
      '💬 Integrated team chat with voice audio notes and camera photo attachments',
      '🛡️ Pending approval queue for clerk stock modifications & discount overrides',
      '👥 Team who-sold-what analytics comparing Team Alpha vs. Team Beta',
    ],
    screens: ['/#/manager'],
    screenLabel: 'See Approvals & Tasks →',
  },
  {
    id: 8,
    phase: 'Stock Reorder',
    icon: AlertTriangle,
    color: '#F59E0B',
    title: 'AI Stock Monitoring & Automated Reorder Permissions',
    who: 'AI Agent → Manager/Owner',
    badge: '🤖 AI Agent',
    desc: 'AI continuously monitors inventory turnover. When safety thresholds are breached, the AI drafts an automated supplier replenishment order and requests owner/manager authorization before dispatching.',
    audioText: 'Step eight: Intelligent Reordering. The system continuously tracks sales velocity. When stock drops below safety thresholds, AI automatically generates a restock proposal with suggested order quantities and asks the manager or owner for approval before placing the order.',
    details: [
      '📉 Automated low-stock trigger based on real-time sales depletion rates',
      '🤖 Smart restock calculation factoring lead time and historical demand velocity',
      '📲 In-app approval ticket sent to manager and patron with one-click reorder',
      '📦 Automated vendor purchase order generation with audit tracking',
    ],
    screens: ['/#/manager'],
    screenLabel: 'See Reorder Tickets →',
  },
  {
    id: 9,
    phase: 'Intelligence',
    icon: BarChart3,
    color: '#7C3AED',
    title: 'Weekly AI Analytics, Reports & Growth Projections',
    who: 'Owner & CEO Web',
    badge: '📊 AI Insights',
    desc: 'Every week, the AI compiles a business health report highlighting top-performing clerks, fastest-moving SKUs, gross margin trends, and 30-day revenue projections with CSV/JSON exports.',
    audioText: 'Step nine: Weekly Intelligence and Projections. Every week, the platform generates automated executive intelligence: revenue breakdown by payment method, clerk performance rankings, profit margin distribution, and machine-learning projections for the month ahead.',
    details: [
      '📈 Recharts orange-accented financial dashboards and revenue trajectories',
      '🏆 Who-sold-what breakdown by clerk, team, and margin contribution',
      '🔮 Predictive demand forecasting and revenue projections for next 30 days',
      '📥 One-click data export to CSV or accounting-compatible formats',
    ],
    screens: ['/#/ceo/analytics'],
    screenLabel: 'See Analytics & Web →',
  },
];

export const HowItWorksPage = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(null);

  // ── Audio Narration State ────────────────────────────────────────────────
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0); // 0 to 9 (0: intro, 1-9: steps)
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const [hasSpeechSupport, setHasSpeechSupport] = useState(true);
  const speechRef = useRef(null);

  // Check speech synthesis support
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setHasSpeechSupport(true);
    } else {
      setHasSpeechSupport(false);
    }

    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const introAudioText =
    "Welcome to BOUND OS, the portable multi-tenant SaaS point-of-sale platform built by BengalBound. Here is a complete audio tour of how the system works, starting from initial merchant sign-up, through owner store pricing, manager and clerk team creation, AI multi-mode inventory scanning, voice-first frontline sales, and automated weekly business analytics.";

  // Speak specific text
  const speakStep = (index, rate = playbackRate) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    if (isMuted) return;

    const textToSpeak = index === 0 ? introAudioText : FLOW_STEPS[index - 1].audioText;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = rate;
    utterance.pitch = 1.0;

    // Try finding an English or clear voice
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('David')));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.onend = () => {
      // Auto-advance to next step if playing tour
      if (index < FLOW_STEPS.length) {
        const nextIndex = index + 1;
        setCurrentAudioIndex(nextIndex);
        setActiveStep(nextIndex);
        speakStep(nextIndex, rate);
      } else {
        setIsPlayingAudio(false);
      }
    };

    utterance.onerror = () => {
      setIsPlayingAudio(false);
    };

    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

  const handleTogglePlayAudio = () => {
    if (isPlayingAudio) {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setIsPlayingAudio(false);
    } else {
      speakStep(currentAudioIndex, playbackRate);
    }
  };

  const handleSelectAudioStep = (index) => {
    setCurrentAudioIndex(index);
    setActiveStep(index === 0 ? null : index);
    if (isPlayingAudio) {
      speakStep(index, playbackRate);
    }
  };

  const handleNextAudioStep = () => {
    const next = Math.min(FLOW_STEPS.length, currentAudioIndex + 1);
    setCurrentAudioIndex(next);
    setActiveStep(next === 0 ? null : next);
    if (isPlayingAudio) speakStep(next, playbackRate);
  };

  const handlePrevAudioStep = () => {
    const prev = Math.max(0, currentAudioIndex - 1);
    setCurrentAudioIndex(prev);
    setActiveStep(prev === 0 ? null : prev);
    if (isPlayingAudio) speakStep(prev, playbackRate);
  };

  const handleCycleSpeed = () => {
    const rates = [1.0, 1.25, 1.5];
    const currentIndex = rates.indexOf(playbackRate);
    const nextRate = rates[(currentIndex + 1) % rates.length];
    setPlaybackRate(nextRate);
    if (isPlayingAudio) {
      speakStep(currentAudioIndex, nextRate);
    }
  };

  const handleToggleMute = () => {
    if (!isMuted) {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      setIsMuted(true);
      setIsPlayingAudio(false);
    } else {
      setIsMuted(false);
    }
  };

  return (
    <div className="min-h-screen select-none" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      {/* ── Top Hero Section ── */}
      <div className="relative overflow-hidden border-b" style={{ borderColor: 'rgba(var(--lineRGB),0.08)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[380px] rounded-full opacity-[0.08] blur-3xl"
            style={{ background: 'var(--acc)' }}
          />
        </div>

        <div className="max-w-4xl mx-auto px-6 py-12 text-center relative">
          <div
            className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 rounded-full text-xs font-bold border"
            style={{ background: 'var(--accSoft)', borderColor: 'rgba(var(--lineRGB),0.12)', color: 'var(--acc)' }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Platform Walkthrough & Audio Guide</span>
          </div>

          <h1 className="font-display font-black text-3xl sm:text-5xl tracking-tight mb-3">
            How BOUND OS Works
          </h1>

          <p className="text-sm sm:text-base max-w-2xl mx-auto leading-relaxed" style={{ color: 'rgba(var(--fgRGB),0.6)' }}>
            The complete operational blueprint: from signup and regional pricing to owner-manager delegation, AI multi-item inventory vision, voice-first frontline sales, and predictive analytics.
          </p>

          {/* Quick CTA Actions */}
          <div className="flex items-center justify-center gap-3 mt-6 flex-wrap">
            <button
              onClick={handleTogglePlayAudio}
              className="px-5 py-2.5 rounded-xl font-display font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition active:scale-95 cursor-pointer"
              style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}
            >
              {isPlayingAudio ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Pause Voice Tour</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Listen to Project Audio</span>
                </>
              )}
            </button>

            <button
              onClick={() => navigate('/signup')}
              className="px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm border transition hover:bg-[var(--raise)] cursor-pointer"
              style={{ borderColor: 'rgba(var(--lineRGB),0.14)', color: 'var(--fg)' }}
            >
              Sign Up Now →
            </button>
          </div>
        </div>
      </div>

      {/* ── Interactive Audio Player Bar (Sticky) ── */}
      <div
        className="sticky top-12 z-40 backdrop-blur-md border-b px-4 py-3"
        style={{
          background: 'rgba(var(--cardRGB, 20, 24, 33), 0.92)',
          borderColor: 'rgba(var(--lineRGB), 0.12)'
        }}
      >
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Audio Status & Waveform */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleTogglePlayAudio}
              className="w-9 h-9 rounded-full flex items-center justify-center text-white transition shadow-md active:scale-90 cursor-pointer"
              style={{ background: isPlayingAudio ? '#10B981' : 'var(--acc)' }}
              title={isPlayingAudio ? 'Pause Narration' : 'Play Narration'}
            >
              {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[var(--fg)]">
                  {currentAudioIndex === 0
                    ? 'Audio Tour: Introduction'
                    : `Phase ${currentAudioIndex}: ${FLOW_STEPS[currentAudioIndex - 1].title}`}
                </span>
                {isPlayingAudio && (
                  <div className="flex items-end gap-0.5 h-3">
                    <span className="w-1 bg-[#10B981] animate-bounce h-2 rounded-full" />
                    <span className="w-1 bg-[#10B981] animate-bounce h-3 rounded-full delay-75" />
                    <span className="w-1 bg-[#10B981] animate-bounce h-1.5 rounded-full delay-150" />
                  </div>
                )}
              </div>
              <p className="text-[10px] text-[rgba(var(--fgRGB),0.5)] line-clamp-1 max-w-sm sm:max-w-md">
                {currentAudioIndex === 0 ? introAudioText : FLOW_STEPS[currentAudioIndex - 1].audioText}
              </p>
            </div>
          </div>

          {/* Player Controls (Prev, Next, Speed, Mute) */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevAudioStep}
              disabled={currentAudioIndex === 0}
              className="px-2.5 py-1 rounded-lg text-xs font-bold border disabled:opacity-30 transition hover:bg-[var(--raise)] cursor-pointer"
              style={{ borderColor: 'rgba(var(--lineRGB),0.12)' }}
              title="Previous Step"
            >
              ← Prev
            </button>

            <span className="text-[11px] font-mono text-[rgba(var(--fgRGB),0.6)] px-1">
              {currentAudioIndex}/{FLOW_STEPS.length}
            </span>

            <button
              onClick={handleNextAudioStep}
              disabled={currentAudioIndex === FLOW_STEPS.length}
              className="px-2.5 py-1 rounded-lg text-xs font-bold border disabled:opacity-30 transition hover:bg-[var(--raise)] cursor-pointer"
              style={{ borderColor: 'rgba(var(--lineRGB),0.12)' }}
              title="Next Step"
            >
              Next →
            </button>

            <button
              onClick={handleCycleSpeed}
              className="px-2 py-1 rounded-lg text-[10px] font-bold font-mono border transition hover:bg-[var(--raise)] cursor-pointer"
              style={{ borderColor: 'rgba(var(--lineRGB),0.12)', color: 'var(--acc)' }}
              title="Playback speed"
            >
              {playbackRate}x
            </button>

            <button
              onClick={handleToggleMute}
              className="p-1.5 rounded-lg border text-[rgba(var(--fgRGB),0.6)] hover:text-[var(--fg)] hover:bg-[var(--raise)] transition cursor-pointer"
              style={{ borderColor: 'rgba(var(--lineRGB),0.12)' }}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-rose-500" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Hierarchy Role Badges ── */}
      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {[
            { badge: '👑 1 Owner (Patron)', desc: 'Store setup, per-product pricing & commissions, accounting audit', color: 'var(--acc)' },
            { badge: '👔 2 Managers', desc: 'Team Alpha & Beta leads, task dispatch, approval processing', color: '#059669' },
            { badge: '🎤 Up to 6 Clerks', desc: 'Frontline voice POS, barcode scans, stock change requests', color: '#7C3AED' },
            { badge: '🤖 Gemini AI Agent', desc: 'Shelf OCR, invoice parsing, restock triggers & projections', color: '#0891B2' },
          ].map((r, i) => (
            <div
              key={i}
              className="p-3 rounded-2xl border text-xs space-y-1 transition hover:border-[rgba(var(--lineRGB),0.2)]"
              style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.08)' }}
            >
              <div className="font-bold flex items-center gap-1.5" style={{ color: r.color }}>
                <span>{r.badge}</span>
              </div>
              <p className="text-[11px] leading-snug" style={{ color: 'rgba(var(--fgRGB),0.55)' }}>
                {r.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Flow Steps List ── */}
      <div className="max-w-4xl mx-auto px-6 pb-20 space-y-4">
        {FLOW_STEPS.map((step) => {
          const Icon = step.icon;
          const isOpen = activeStep === step.id;
          const isCurrentlyNarrated = isPlayingAudio && currentAudioIndex === step.id;

          return (
            <div
              key={step.id}
              id={`step-card-${step.id}`}
              className="rounded-3xl border overflow-hidden transition-all duration-200"
              style={{
                background: 'var(--card)',
                borderColor: isCurrentlyNarrated
                  ? 'var(--acc)'
                  : isOpen
                  ? step.color
                  : 'rgba(var(--lineRGB),0.08)',
                boxShadow: isCurrentlyNarrated ? '0 0 20px rgba(var(--accRGB, 255, 106, 19), 0.25)' : 'none'
              }}
            >
              {/* Step Card Header */}
              <div className="p-5 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setActiveStep(isOpen ? null : step.id)}
                  className="flex items-center gap-4 text-left flex-1 min-w-0 cursor-pointer"
                >
                  {/* Number & Icon */}
                  <div className="flex items-center gap-3 shrink-0">
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-md text-white font-bold"
                      style={{ background: step.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black"
                      style={{ background: 'rgba(var(--lineRGB),0.08)', color: 'rgba(var(--fgRGB),0.6)' }}
                    >
                      {step.id}
                    </div>
                  </div>

                  {/* Title & Metadata */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-display font-bold text-sm sm:text-base text-[var(--fg)]">
                        {step.title}
                      </span>
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{ background: 'rgba(var(--lineRGB),0.08)', color: 'rgba(var(--fgRGB),0.65)' }}
                      >
                        {step.badge}
                      </span>
                      {isCurrentlyNarrated && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[var(--accSoft)] text-[var(--acc)] animate-pulse">
                          Speaking...
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] font-mono mt-0.5" style={{ color: 'rgba(var(--fgRGB),0.4)' }}>
                      PHASE {step.id} · {step.phase}
                    </div>
                  </div>
                </button>

                {/* Audio Trigger for this Step + Expand Chevron */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectAudioStep(step.id);
                      speakStep(step.id, playbackRate);
                    }}
                    className="p-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition hover:bg-[var(--raise)] active:scale-95 cursor-pointer"
                    style={{ borderColor: 'rgba(var(--lineRGB),0.12)', color: 'var(--acc)' }}
                    title={`Listen to Phase ${step.id}`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Listen</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveStep(isOpen ? null : step.id)}
                    className="p-2 rounded-xl text-[rgba(var(--fgRGB),0.4)] hover:text-[var(--fg)] cursor-pointer"
                  >
                    <ChevronRight className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Expanded Card Details */}
              {isOpen && (
                <div className="px-5 pb-5 space-y-4 border-t" style={{ borderColor: 'rgba(var(--lineRGB),0.06)' }}>
                  <p className="text-xs sm:text-sm pt-4 leading-relaxed" style={{ color: 'rgba(var(--fgRGB),0.7)' }}>
                    {step.desc}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-2">
                    {step.details.map((d, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-xs px-3 py-2.5 rounded-xl border"
                        style={{ background: 'var(--sunken)', borderColor: 'rgba(var(--lineRGB),0.06)' }}
                      >
                        <span className="flex-1 font-medium" style={{ color: 'rgba(var(--fgRGB),0.85)' }}>
                          {d}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 flex-wrap pt-2">
                    {step.screens.map((path, i) => (
                      <button
                        key={i}
                        onClick={() => navigate(path)}
                        className="px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
                        style={{ background: step.color, color: '#fff' }}
                      >
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

      {/* ── Footer CTA ── */}
      <div className="border-t" style={{ borderColor: 'rgba(var(--lineRGB),0.08)' }}>
        <div className="max-w-4xl mx-auto px-6 py-14 text-center">
          <h2 className="font-display font-black text-2xl sm:text-3xl mb-2">
            Ready to Experience BOUND OS?
          </h2>
          <p className="text-xs sm:text-sm mb-6 max-w-md mx-auto" style={{ color: 'rgba(var(--fgRGB),0.55)' }}>
            Experience voice transactions, multi-tier team management, and computer vision inventory live in your browser.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <button
              onClick={() => navigate('/signup')}
              className="px-6 py-3 rounded-2xl font-display font-bold text-sm flex items-center gap-2 shadow-xl cursor-pointer"
              style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}
            >
              Deploy Store Free <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/manager')}
              className="px-6 py-3 rounded-2xl font-semibold text-sm border hover:bg-[var(--raise)] transition cursor-pointer"
              style={{ borderColor: 'rgba(var(--lineRGB),0.15)', color: 'var(--fg)' }}
            >
              Open Owner &amp; Manager App
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
