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
  ExternalLink
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
      addToast('Message Received', 'Thank you! BengalBound sales team will contact you shortly.', 'success');
    }, 500);
  };

  const features = [
    {
      icon: Mic,
      title: "Voice Order Entry",
      desc: "Speak naturally into any handheld terminal. Automated STT speech parsing instantly adds catalog items to the basket."
    },
    {
      icon: ScanBarcode,
      title: "Vision Product Scan",
      desc: "Computer vision and camera OCR barcode recognition identifies products in milliseconds with zero extra hardware."
    },
    {
      icon: WifiOff,
      title: "Offline Mode with Auto-Sync",
      desc: "Keep transacting even when network connectivity drops. Transactions store locally in SQLite and replay upon reconnect."
    },
    {
      icon: BarChart3,
      title: "Real-time Analytics",
      desc: "Live visibility into daily revenue, peak sales hours, clerk performance, and high-velocity inventory stock."
    },
    {
      icon: Layers,
      title: "Multi-tenant SaaS Architecture",
      desc: "Isolated schema-per-tenant isolation on robust KVM4 infrastructure with custom subdomain provisioning."
    },
    {
      icon: Sparkles,
      title: "AI-Powered Insights",
      desc: "Smart demand forecasting, basket affinity upselling suggestions, and automated transaction risk detection."
    }
  ];

  const pricingTiers = [
    {
      name: "Free Tier",
      price: "$0",
      period: "forever",
      desc: "Ideal for solo kiosks and micro-merchants starting out.",
      features: [
        "1 POS Terminal",
        "Up to 50 Products",
        "Basic Cash & MoMo Payments",
        "Standard Daily Reports",
        "Community Support"
      ],
      cta: "Start Free",
      popular: false
    },
    {
      name: "Basic Plan",
      price: "$29",
      period: "per month",
      desc: "Great for growing single-store retail and coffee shops.",
      features: [
        "Up to 5 POS Clerks",
        "Unlimited Catalog SKUs",
        "Full Mobile Money + Card POS",
        "Offline Mode & Sync",
        "Clerk Permission Controls",
        "Standard Email Support"
      ],
      cta: "Choose Basic",
      popular: true
    },
    {
      name: "Pro Plan",
      price: "$99",
      period: "per month",
      desc: "Built for multi-location businesses requiring advanced controls.",
      features: [
        "Unlimited POS Clerks & Branches",
        "AI Voice Order Entry",
        "Vision Barcode Scanning",
        "CEO Approval Workflows",
        "Advanced Analytics & CSV Export",
        "Dedicated Account Lead"
      ],
      cta: "Go Pro",
      popular: false
    }
  ];

  const testimonials = [
    {
      quote: "MoMoTill changed how our 5 supermarket outlets accept mobile money. Clerks take orders on phones twice as fast.",
      name: "Amina Al-Mansur",
      role: "Managing Director, Savannah Gourmet Supermarket",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
    },
    {
      quote: "The offline mode saved our operations during fiber outages in Downtown. When internet resumed, all 80 orders synced perfectly.",
      name: "Chinedu Okafor",
      role: "Founder, Lagos Tech & Gadgets",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80"
    },
    {
      quote: "The CEO dashboard gives me instant profit margin tracking from my phone while I'm traveling between branches.",
      name: "Gisele Umutoni",
      role: "Owner, Kigali Artisan Roastery",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Hero Section (Deliverable 4.A) */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-blue-900 via-slate-900 to-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(37,99,235,0.25),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(124,58,237,0.2),transparent_50%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Next-Generation Portable POS Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                The Future of <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">Point-of-Sale</span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Voice-powered, AI-enhanced, mobile-first POS system engineered for modern retailers, supermarkets, and frontline clerks across emerging markets.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => navigate('/signup')}
                  className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 flex items-center gap-2 transition hover:scale-105"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>Sign Up Free</span>
                </button>

                <button
                  onClick={() => navigate('/how-it-works')}
                  className="px-6 py-3.5 rounded-2xl bg-purple-600/80 hover:bg-purple-500 text-white font-bold text-sm shadow-xl shadow-purple-600/20 flex items-center gap-2 transition hover:scale-105"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>How It Works</span>
                </button>

                <button
                  onClick={() => navigate('/vendeur')}
                  className="px-5 py-3.5 rounded-2xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 hover:text-white font-bold text-sm border border-slate-700 flex items-center gap-2 transition"
                >
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  <span>Vendeur Mobile</span>
                </button>

                <button
                  onClick={() => navigate('/manager')}
                  className="px-5 py-3.5 rounded-2xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 hover:text-white font-bold text-sm border border-slate-700 flex items-center gap-2 transition"
                >
                  <Smartphone className="w-4 h-4 text-amber-400" />
                  <span>Manager &amp; Patron</span>
                </button>

                <button
                  onClick={() => navigate('/ceo/dashboard')}
                  className="px-5 py-3.5 rounded-2xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 hover:text-white font-bold text-sm border border-slate-700 flex items-center gap-2 transition"
                >
                  <span>CEO Web</span>
                </button>
              </div>

              {/* Feature pills */}
              <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>100% Offline Capable</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>MTN MoMo & M-Pesa Native</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Multi-Tenant Schema</span>
                </div>
              </div>
            </div>

            {/* Right Interactive Mockup Preview Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md bg-gradient-to-b from-slate-800/90 to-slate-900/90 border border-slate-700/80 rounded-3xl p-6 shadow-2xl backdrop-blur-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500" />
                    <span className="w-3 h-3 rounded-full bg-amber-500" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-xs font-mono text-slate-400 ml-2">MoMoTill v1.0</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">
                    3-Tier Live Demo
                  </span>
                </div>

                {/* Tier Selection Buttons in Hero Card */}
                <div className="space-y-2.5">
                  <div
                    onClick={() => navigate('/clerk/catalog')}
                    className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 cursor-pointer transition flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-blue-600 text-white">
                        <Smartphone className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-white group-hover:text-blue-400 transition">Tier 1: Store Clerk App</div>
                        <div className="text-xs text-slate-400">Flutter mobile catalog & voice checkout</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-1 transition" />
                  </div>

                  <div
                    onClick={() => navigate('/ceo/dashboard')}
                    className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 cursor-pointer transition flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-purple-600 text-white">
                        <BarChart3 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-white group-hover:text-purple-400 transition">Tier 2: Store CEO Portal</div>
                        <div className="text-xs text-slate-400">Inventory control & transaction approvals</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-400 group-hover:translate-x-1 transition" />
                  </div>

                  <div
                    onClick={() => navigate('/admin/tenants')}
                    className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 cursor-pointer transition flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-indigo-600 text-white">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-white group-hover:text-indigo-400 transition">Tier 3: Master Admin</div>
                        <div className="text-xs text-slate-400">Global SaaS tenant management</div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 group-hover:translate-x-1 transition" />
                  </div>
                </div>

                <div className="pt-2 text-center text-xs text-slate-400">
                  BengalBound Technologies &bull; Prepared for Frank Louis Ohachosim
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section (Deliverable 4.B) */}
      <section className="py-20 bg-white" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Cutting-Edge POS Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Engineered for Emerging Market Merchants
            </h2>
            <p className="text-base text-slate-600">
              Combining voice intelligence, offline resilience, and mobile money rails into an intuitive portable till.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="bg-slate-50 rounded-3xl p-6 border border-slate-200/80 hover:border-blue-300 hover:shadow-lg transition space-y-3 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-110 transition">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900">{feat.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section (Deliverable 4.C) */}
      <section className="py-20 bg-slate-100 border-t border-slate-200" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
              Predictable SaaS Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Flexible Tiers for Every Merchant Size
            </h2>
            <p className="text-base text-slate-600">
              Start free, scale smoothly to full enterprise oversight with dedicated cloud infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {pricingTiers.map((tier, idx) => (
              <div
                key={idx}
                className={`rounded-3xl p-8 transition flex flex-col justify-between ${
                  tier.popular
                    ? 'bg-slate-900 text-white shadow-2xl ring-2 ring-blue-500 scale-105 z-10'
                    : 'bg-white text-slate-900 border border-slate-200 shadow-sm'
                }`}
              >
                <div>
                  {tier.popular && (
                    <span className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-xl font-bold">{tier.name}</h3>
                  <p className={`text-xs mt-1 mb-4 ${tier.popular ? 'text-slate-400' : 'text-slate-500'}`}>
                    {tier.desc}
                  </p>

                  <div className="flex items-baseline gap-1 my-4">
                    <span className="text-4xl font-black tracking-tight">{tier.price}</span>
                    <span className={`text-xs ${tier.popular ? 'text-slate-400' : 'text-slate-500'}`}>
                      / {tier.period}
                    </span>
                  </div>

                  <ul className="space-y-3 my-6 text-xs">
                    {tier.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2.5">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 ${tier.popular ? 'text-blue-400' : 'text-emerald-500'}`} />
                        <span className={tier.popular ? 'text-slate-200' : 'text-slate-700'}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => {
                    addToast('Plan Selected', `Initiated signup flow for ${tier.name}.`, 'info');
                    navigate('/signup');
                  }}
                  className={`w-full py-3 rounded-2xl font-bold text-xs transition ${
                    tier.popular
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  {tier.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section (Deliverable 4.D) */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
              Merchant Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Trusted by Retail Pioneers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-slate-50 rounded-3xl p-6 border border-slate-200 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-3 border-t border-slate-200/60">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-slate-300" />
                  <div>
                    <div className="font-bold text-xs text-slate-900">{t.name}</div>
                    <div className="text-[11px] text-slate-500">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section (Deliverable 4.E) */}
      <section className="py-20 bg-slate-900 text-white" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Contact details */}
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30">
                Contact & Demo Request
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                Request a Custom Demonstration
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed max-w-md">
                Talk to our engineering leads at BengalBound Technologies to arrange on-site deployment, hardware procurement, or multi-tenant licensing.
              </p>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>contact@bengalbound.dev</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-blue-400" />
                  <span>+1 (800) 555-MOMO / +234 800 123 4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  <span>BengalBound Technologies Ltd.</span>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl">
              <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Frank Louis Ohachosim"
                    className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="frank@apexretail.ng"
                    className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Message / Requirements</label>
                  <textarea
                    rows={4}
                    required
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder="Tell us about your store footprint, clerk count, and hardware preferences..."
                    className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingContact}
                  className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition disabled:opacity-60"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmittingContact ? 'Submitting...' : 'Send Demo Request'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer (Deliverable 4.F) */}
      <footer className="py-8 bg-slate-950 border-t border-slate-900 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-white">
            <span className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs font-black">
              M
            </span>
            <span>MoMoTill Portable POS System</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#pricing" className="hover:text-white transition">Pricing</a>
            <a href="#contact" className="hover:text-white transition">Contact</a>
            <span className="hover:text-white cursor-pointer">Privacy</span>
          </div>

          <div>
            &copy; 2026 BengalBound Technologies. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
