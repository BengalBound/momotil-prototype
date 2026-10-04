import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Mic,
  ScanBarcode,
  WifiOff,
  BarChart3,
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Star,
  Smartphone,
  ShieldCheck,
  Send,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Volume2,
  Package,
  Users,
  Sliders,
  DollarSign,
  TrendingUp,
  FileText
} from 'lucide-react';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { addToast } = useApp();

  // Contact form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setIsSubmittingContact(true);
    setTimeout(() => {
      setIsSubmittingContact(false);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
      addToast('Message Received', 'Thank you! BengalBound team will contact you shortly.', 'success');
    }, 500);
  };

  const coreFeatures = [
    {
      icon: Mic,
      title: "Voice-First Order Entry",
      desc: "Speak naturally in local languages (French, Wolof, Dioula, Bengali, English). AI extracts items, quantities, and pricing in milliseconds."
    },
    {
      icon: Package,
      title: "AI Multi-Mode Inventory",
      desc: "Add inventory in seconds: photograph 1 item, scan a full shelf of 5–10 products, or photograph a supplier invoice for instant OCR."
    },
    {
      icon: Sliders,
      title: "Per-Product Pricing & Commission",
      desc: "Configure wholesale costs, unit prices, and clerk commissions per product with quick steppers and dynamic monthly profit estimation."
    },
    {
      icon: Users,
      title: "1 Owner + 2 Managers + 6 Clerks",
      desc: "Built-in operational hierarchy: 1 Patron, 2 Managers leading Team Alpha & Team Beta, and up to 6 sales clerks with dedicated task queues."
    },
    {
      icon: WifiOff,
      title: "Offline SQLite Resilience",
      desc: "Transactions store locally during internet drops. When connectivity returns, sales auto-sync seamlessly with zero data loss."
    },
    {
      icon: BarChart3,
      title: "Weekly AI Intelligence & Forecasts",
      desc: "Automated business reports, who-sold-what team rankings, inventory depletion warnings, and 30-day predictive revenue modeling."
    }
  ];

  const pricingTiers = [
    {
      name: "Free Tier",
      price: "$0",
      period: "forever",
      desc: "Ideal for solo kiosks and micro-merchants starting out.",
      features: [
        "1 POS Mobile Terminal",
        "Up to 50 Products",
        "Basic Cash & MoMo Payments",
        "Standard Daily Reports",
        "Community Support"
      ],
      cta: "Start Free",
      popular: false
    },
    {
      name: "Growth Plan",
      price: "$29",
      period: "per month",
      desc: "Designed for single retail stores with up to 6 clerks.",
      features: [
        "1 Owner + 2 Managers + 6 Clerks",
        "AI Voice POS & Camera Scanning",
        "AI Multi-Mode Inventory OCR",
        "Per-Product Pricing & Commissions",
        "Offline SQLite Auto-Sync",
        "Daily Manager Approvals"
      ],
      cta: "Choose Growth",
      popular: true
    },
    {
      name: "Enterprise Multi-Store",
      price: "$99",
      period: "per month",
      desc: "Built for multi-location businesses requiring Master Admin oversight.",
      features: [
        "Unlimited Stores & Tenants",
        "Tier 3 Master Admin Console",
        "Automated AI Restock Proposals",
        "Team Alpha vs Beta Leaderboards",
        "Custom Payment Rail Provisioning",
        "Dedicated Account Engineering"
      ],
      cta: "Go Enterprise",
      popular: false
    }
  ];

  const testimonials = [
    {
      quote: "The voice order entry and invoice OCR saved us hours every morning. Our clerks speak French and Wolof, and the app never misses an item.",
      name: "Awa Kouassi",
      role: "Owner, Auto Pièces Kouassi (Abidjan)",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
    },
    {
      quote: "The offline mode saved our operations during market fiber outages. When connection resumed, all 120 orders synced perfectly.",
      name: "Ibrahim Coulibaly",
      role: "Operations Manager, Sandaga Trading",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
    },
    {
      quote: "Having per-product pricing and commission steppers on my phone gives me total visibility into net profit before approving discounts.",
      name: "Frank Louis Ohachosim",
      role: "Managing Director, Apex Retail Group",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="min-h-screen select-none" style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b" style={{ borderColor: 'rgba(var(--lineRGB),0.08)' }}>
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[450px] rounded-full opacity-[0.09] blur-3xl"
            style={{ background: 'var(--acc)' }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Audio Tour Banner Link */}
            <div
              onClick={() => navigate('/how-it-works')}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold border transition hover:scale-105 cursor-pointer shadow-sm"
              style={{ background: 'var(--accSoft)', borderColor: 'rgba(var(--lineRGB),0.12)', color: 'var(--acc)' }}
            >
              <Volume2 className="w-4 h-4 animate-pulse" />
              <span>Listen to Interactive Audio Tour &amp; Workflow →</span>
            </div>

            <h1 className="font-display font-black text-4xl sm:text-6xl tracking-tight leading-tight">
              The Portable POS System for <span style={{ color: 'var(--acc)' }}>High-Growth Markets</span>
            </h1>

            <p className="text-base sm:text-xl font-normal leading-relaxed" style={{ color: 'rgba(var(--fgRGB),0.65)' }}>
              Voice-first order entry, computer vision AI inventory, per-product profit controls, and multi-tier store management engineered for modern retail.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => navigate('/signup')}
                className="px-6 py-3.5 rounded-2xl font-display font-bold text-sm shadow-xl flex items-center gap-2 transition hover:scale-105 active:scale-95 cursor-pointer"
                style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}
              >
                <span>Deploy Store Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/how-it-works')}
                className="px-6 py-3.5 rounded-2xl font-bold text-sm border flex items-center gap-2 transition hover:bg-[var(--raise)] cursor-pointer"
                style={{ borderColor: 'rgba(var(--lineRGB),0.14)', color: 'var(--fg)' }}
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>How It Works & Audio</span>
              </button>

              <button
                onClick={() => navigate('/manager')}
                className="px-5 py-3.5 rounded-2xl font-bold text-sm border flex items-center gap-2 transition hover:bg-[var(--raise)] cursor-pointer"
                style={{ borderColor: 'rgba(var(--lineRGB),0.14)', color: 'var(--fg)' }}
              >
                <Smartphone className="w-4 h-4 text-[var(--acc)]" />
                <span>Manager & Patron App</span>
              </button>
            </div>

            {/* Quick Metrics */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              {[
                { label: 'Store Structure', value: '1 Owner · 2 Mgrs · 6 Clerks' },
                { label: 'Payment Rails', value: 'Wave · MTN · OM · bKash' },
                { label: 'Inventory AI', value: 'Photo · Shelf · Invoice OCR' },
                { label: 'Offline Resilience', value: '100% SQLite Offline' }
              ].map((m, i) => (
                <div key={i} className="p-3 rounded-2xl border" style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.06)' }}>
                  <div className="text-xs sm:text-sm font-bold text-[var(--fg)]">{m.value}</div>
                  <div className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: 'rgba(var(--fgRGB),0.45)' }}>{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Interactive Prototype Quick Launcher ── */}
      <section className="py-12 border-b" style={{ borderColor: 'rgba(var(--lineRGB),0.08)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="font-display font-black text-2xl tracking-tight">Explore the 4 Prototype Layers</h2>
            <p className="text-xs text-[rgba(var(--fgRGB),0.6)] mt-1">Jump directly into any role in the 3-tier architecture</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'Vendeur Mobile',
                role: 'Tier 1: Clerk POS',
                desc: 'Voice sales, camera barcode scanner, task hub, and team audio chat.',
                path: '/vendeur',
                color: 'var(--acc)',
                badge: 'Frontline'
              },
              {
                title: 'Manager & Patron',
                role: 'Tier 2: Mobile Companion',
                desc: 'Role switcher (Patron vs Mgr 1/2), pricing steppers, task history, approvals.',
                path: '/manager',
                color: '#10B981',
                badge: 'Store Owner'
              },
              {
                title: 'CEO Web Platform',
                role: 'Tier 2: Web Dashboard',
                desc: 'Real-time financial charts, team rosters, AI invoice scanner, CSV export.',
                path: '/ceo/dashboard',
                color: '#3B82F6',
                badge: 'Management'
              },
              {
                title: 'Master Admin',
                role: 'Tier 3: SaaS Super Admin',
                desc: 'Multi-tenant cloud provisioning, KVM4 cluster health, user impersonation.',
                path: '/admin/tenants',
                color: '#8B5CF6',
                badge: 'Platform SaaS'
              }
            ].map((card, i) => (
              <div
                key={i}
                onClick={() => navigate(card.path)}
                className="p-5 rounded-3xl border transition hover:scale-[1.02] cursor-pointer flex flex-col justify-between space-y-4"
                style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.1)' }}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'var(--accSoft)', color: card.color }}>
                      {card.badge}
                    </span>
                    <span className="text-[10px] font-mono text-[rgba(var(--fgRGB),0.4)]">{card.role}</span>
                  </div>
                  <h3 className="font-display font-bold text-base text-[var(--fg)]">{card.title}</h3>
                  <p className="text-xs text-[rgba(var(--fgRGB),0.6)] mt-1.5 leading-relaxed">{card.desc}</p>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold pt-2 border-t" style={{ borderColor: 'rgba(var(--lineRGB),0.06)', color: card.color }}>
                  <span>Launch Experience</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Feature Highlights ── */}
      <section className="py-16 border-b" style={{ borderColor: 'rgba(var(--lineRGB),0.08)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display font-black text-3xl tracking-tight">
              Engineered for Real-World Retail
            </h2>
            <p className="text-sm text-[rgba(var(--fgRGB),0.6)] mt-2">
              Every feature designed to solve real operational bottlenecks: language barriers, internet drops, supply delays, and pricing governance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreFeatures.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <div
                  key={i}
                  className="p-6 rounded-3xl border space-y-3 transition hover:border-[rgba(var(--lineRGB),0.2)]"
                  style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.08)' }}
                >
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white" style={{ background: 'var(--acc)' }}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-base text-[var(--fg)]">{feat.title}</h3>
                  <p className="text-xs text-[rgba(var(--fgRGB),0.6)] leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SaaS Pricing Tiers ── */}
      <section className="py-16 border-b" id="pricing" style={{ borderColor: 'rgba(var(--lineRGB),0.08)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display font-black text-3xl tracking-tight">Predictable SaaS Pricing</h2>
            <p className="text-sm text-[rgba(var(--fgRGB),0.6)] mt-2">Deploy for a single corner store or scale across thousands of franchises</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingTiers.map((tier, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl border flex flex-col justify-between space-y-6 relative transition"
                style={{
                  background: 'var(--card)',
                  borderColor: tier.popular ? 'var(--acc)' : 'rgba(var(--lineRGB),0.08)',
                  boxShadow: tier.popular ? '0 0 25px rgba(var(--accRGB, 255, 106, 19), 0.15)' : 'none'
                }}
              >
                {tier.popular && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full text-white"
                    style={{ background: 'var(--acc)' }}
                  >
                    Recommended
                  </span>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="font-display font-bold text-lg text-[var(--fg)]">{tier.name}</h3>
                    <p className="text-xs text-[rgba(var(--fgRGB),0.55)] mt-1">{tier.desc}</p>
                  </div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-[var(--fg)]">{tier.price}</span>
                    <span className="text-xs text-[rgba(var(--fgRGB),0.45)]">/{tier.period}</span>
                  </div>

                  <div className="space-y-2 pt-2 border-t" style={{ borderColor: 'rgba(var(--lineRGB),0.06)' }}>
                    {tier.features.map((f, j) => (
                      <div key={j} className="flex items-center gap-2 text-xs text-[rgba(var(--fgRGB),0.75)]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => navigate('/signup')}
                  className="w-full py-3 rounded-2xl text-xs font-bold transition active:scale-95 cursor-pointer"
                  style={{
                    background: tier.popular ? 'var(--acc)' : 'var(--sunken)',
                    color: tier.popular ? 'var(--onAcc)' : 'var(--fg)',
                    border: tier.popular ? 'none' : '1px solid rgba(var(--lineRGB),0.12)'
                  }}
                >
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-16 border-b" style={{ borderColor: 'rgba(var(--lineRGB),0.08)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-display font-black text-3xl tracking-tight">Trusted by Retail Leaders</h2>
            <p className="text-sm text-[rgba(var(--fgRGB),0.6)] mt-2">See how merchants across Abidjan, Dakar, Lagos, and Dhaka power daily operations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl border space-y-4 flex flex-col justify-between"
                style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.08)' }}
              >
                <div className="space-y-3">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-[rgba(var(--fgRGB),0.7)] italic leading-relaxed">"{t.quote}"</p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t" style={{ borderColor: 'rgba(var(--lineRGB),0.06)' }}>
                  <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover" />
                  <div>
                    <div className="text-xs font-bold text-[var(--fg)]">{t.name}</div>
                    <div className="text-[10px] text-[rgba(var(--fgRGB),0.5)]">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Section ── */}
      <section className="py-16" id="contact">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div>
            <h2 className="font-display font-black text-3xl tracking-tight">Get in Touch with BengalBound</h2>
            <p className="text-sm text-[rgba(var(--fgRGB),0.6)] mt-2">Interested in custom white-label deployments or enterprise pilot programs?</p>
          </div>

          <form onSubmit={handleContactSubmit} className="max-w-md mx-auto space-y-3 text-left">
            <input
              type="text"
              required
              value={contactName}
              onChange={e => setContactName(e.target.value)}
              placeholder="Your full name"
              className="w-full px-4 py-3 rounded-2xl text-xs border outline-none"
              style={{ background: 'var(--sunken)', borderColor: 'rgba(var(--lineRGB),0.12)', color: 'var(--fg)' }}
            />
            <input
              type="email"
              required
              value={contactEmail}
              onChange={e => setContactEmail(e.target.value)}
              placeholder="Work email"
              className="w-full px-4 py-3 rounded-2xl text-xs border outline-none"
              style={{ background: 'var(--sunken)', borderColor: 'rgba(var(--lineRGB),0.12)', color: 'var(--fg)' }}
            />
            <textarea
              required
              rows={3}
              value={contactMessage}
              onChange={e => setContactMessage(e.target.value)}
              placeholder="Tell us about your store requirements..."
              className="w-full px-4 py-3 rounded-2xl text-xs border outline-none resize-none"
              style={{ background: 'var(--sunken)', borderColor: 'rgba(var(--lineRGB),0.12)', color: 'var(--fg)' }}
            />
            <button
              type="submit"
              disabled={isSubmittingContact}
              className="w-full py-3.5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition active:scale-95 cursor-pointer"
              style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}
            >
              <Send className="w-4 h-4" />
              <span>{isSubmittingContact ? 'Sending...' : 'Send Message'}</span>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
