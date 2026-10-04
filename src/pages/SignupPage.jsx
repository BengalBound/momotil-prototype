import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  ArrowRight, Check, Store, User, Globe, Phone,
  Lock, Sparkles, ChevronDown, Eye, EyeOff
} from 'lucide-react';
import { REGIONS, GLOBAL_COUNTRIES } from '../data/regionConfig';

const STEPS = [
  { id: 1, label: 'Region', icon: Globe },
  { id: 2, label: 'Store', icon: Store },
  { id: 3, label: 'Owner', icon: User },
  { id: 4, label: 'Done', icon: Check },
];

export const SignupPage = () => {
  const navigate = useNavigate();
  const { setRegionCode, addToast, createTenant } = useApp();

  const [step, setStep] = useState(1);
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({
    regionCode: 'en',
    storeName: '',
    storeType: 'Auto Parts',
    city: '',
    ownerName: '',
    phone: '',
    email: '',
    password: '',
    plan: 'starter',
  });

  const set = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const liveRegion = REGIONS[form.regionCode] || REGIONS.en;

  const plans = [
    { id: 'starter', name: 'Starter', price: liveRegion.curr === '$' ? '$29' : liveRegion.curr === '৳' ? '৳2,900' : '14 900 FCFA', per: '/mo', clerks: '1 Clerk', features: ['Voice POS', 'Basic Reports', 'Mobile App'] },
    { id: 'growth', name: 'Growth', price: liveRegion.curr === '$' ? '$79' : liveRegion.curr === '৳' ? '৳7,900' : '39 900 FCFA', per: '/mo', clerks: '5 Clerks', features: ['All Starter', 'AI Inventory', 'Analytics', 'Approvals'], recommended: true },
    { id: 'enterprise', name: 'Enterprise', price: 'Custom', per: '', clerks: 'Unlimited', features: ['All Growth', 'Multi-branch', 'API Access', 'Priority Support'] },
  ];

  const storeTypes = ['Auto Parts', 'Grocery', 'Pharmacy', 'Electronics', 'Clothing', 'Restaurant', 'Hardware', 'Other'];

  const handleFinish = () => {
    setRegionCode(form.regionCode);
    createTenant({
      name: form.storeName || `${form.ownerName}'s Store`,
      subdomain: (form.storeName || 'mystore').toLowerCase().replace(/\s+/g, '-'),
      plan: form.plan,
      country: liveRegion.country,
      region: form.regionCode.toUpperCase(),
    });
    addToast('🎉 Welcome to BOUND OS!', `${form.storeName || 'Your store'} is live. Let's make your first sale.`, 'success');
    navigate('/manager');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden"
      style={{ background: 'var(--bg)', color: 'var(--fg)' }}>

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-[0.06] blur-3xl"
          style={{ background: 'var(--acc)' }} />
      </div>

      {/* Logo */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 mb-2">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center font-display font-black text-xl shadow-lg"
            style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}>
            B
          </div>
          <span className="font-display font-black text-2xl tracking-tight">BOUND OS</span>
        </div>
        <p className="text-xs" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>
          "Country first. Software second." · Voice-First POS for Every Merchant
        </p>
      </div>

      {/* Step Progress */}
      <div className="flex items-center gap-0 mb-8 w-full max-w-sm">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const done = step > s.id;
          const active = step === s.id;
          return (
            <React.Fragment key={s.id}>
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                  style={{
                    background: done || active ? 'var(--acc)' : 'var(--raise)',
                    color: done || active ? 'var(--onAcc)' : 'rgba(var(--fgRGB),0.4)',
                  }}>
                  {done ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>
                <span className="text-[9px] font-mono uppercase"
                  style={{ color: active ? 'var(--acc)' : 'rgba(var(--fgRGB),0.35)' }}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="flex-1 h-0.5 mx-1 mt-[-12px]"
                  style={{ background: step > s.id ? 'var(--acc)' : 'rgba(var(--lineRGB),0.12)' }} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Card */}
      <div className="w-full max-w-sm rounded-3xl border p-6 shadow-2xl"
        style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.09)' }}>

        {/* ── STEP 1: Region & Plan ── */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <h2 className="font-display font-black text-xl">Choose Your Region</h2>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>
                We'll adapt language, currency & payment rails automatically
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {GLOBAL_COUNTRIES.filter(c => c.live).map(c => (
                <button key={c.code}
                  onClick={() => set('regionCode', c.code.toLowerCase())}
                  className="p-3 rounded-2xl border text-left transition"
                  style={{
                    background: form.regionCode === c.code.toLowerCase() ? 'var(--accSoft)' : 'var(--raise)',
                    borderColor: form.regionCode === c.code.toLowerCase() ? 'var(--acc)' : 'rgba(var(--lineRGB),0.08)',
                    color: 'var(--fg)',
                  }}>
                  <div className="w-5 h-3 rounded-xs mb-2 shrink-0" style={{ background: c.flag }} />
                  <div className="font-bold text-xs">{c.country}</div>
                  <div className="text-[10px] mt-0.5" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>{c.curr}</div>
                </button>
              ))}
              {/* English/Global */}
              <button onClick={() => set('regionCode', 'en')}
                className="p-3 rounded-2xl border text-left transition"
                style={{
                  background: form.regionCode === 'en' ? 'var(--accSoft)' : 'var(--raise)',
                  borderColor: form.regionCode === 'en' ? 'var(--acc)' : 'rgba(var(--lineRGB),0.08)',
                }}>
                <div className="w-5 h-3 rounded-xs mb-2" style={{ background: REGIONS.en.flag }} />
                <div className="font-bold text-xs">English (Global)</div>
                <div className="text-[10px] mt-0.5" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>USD · $</div>
              </button>
            </div>

            {/* Plan selector */}
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider mb-2" style={{ color: 'rgba(var(--fgRGB),0.45)' }}>
                Select Plan
              </div>
              <div className="space-y-2">
                {plans.map(plan => (
                  <button key={plan.id}
                    onClick={() => set('plan', plan.id)}
                    className="w-full p-3 rounded-xl border text-left transition flex items-center justify-between"
                    style={{
                      background: form.plan === plan.id ? 'var(--accSoft)' : 'var(--raise)',
                      borderColor: form.plan === plan.id ? 'var(--acc)' : 'rgba(var(--lineRGB),0.08)',
                    }}>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-sm">{plan.name}</span>
                        {plan.recommended && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                            style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}>
                            POPULAR
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] mt-0.5" style={{ color: 'rgba(var(--fgRGB),0.55)' }}>
                        {plan.clerks} · {plan.features.join(' · ')}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-display font-black text-base" style={{ color: 'var(--acc)' }}>{plan.price}</div>
                      <div className="text-[10px]" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>{plan.per}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button onClick={() => setStep(2)}
              className="w-full h-12 rounded-xl font-display font-bold text-sm flex items-center justify-center gap-2"
              style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}>
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* ── STEP 2: Store Details ── */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h2 className="font-display font-black text-xl">Your Store</h2>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>
                Tell us about your business in {liveRegion.city}
              </p>
            </div>

            {[
              { key: 'storeName', label: 'Store Name', placeholder: liveRegion.store },
              { key: 'city', label: 'City / Area', placeholder: `${liveRegion.area}, ${liveRegion.city}` },
            ].map(field => (
              <div key={field.key}>
                <label className="block text-[11px] font-mono uppercase tracking-wider mb-1.5"
                  style={{ color: 'rgba(var(--fgRGB),0.45)' }}>{field.label}</label>
                <input type="text" value={form[field.key]}
                  onChange={e => set(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full px-3 py-2.5 rounded-xl text-sm focus:outline-none transition"
                  style={{
                    background: 'var(--raise)',
                    border: '1px solid rgba(var(--lineRGB),0.1)',
                    color: 'var(--fg)',
                  }} />
              </div>
            ))}

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider mb-1.5"
                style={{ color: 'rgba(var(--fgRGB),0.45)' }}>Business Type</label>
              <div className="grid grid-cols-2 gap-2">
                {storeTypes.map(type => (
                  <button key={type} onClick={() => set('storeType', type)}
                    className="py-2 px-3 rounded-xl text-xs font-semibold border transition"
                    style={{
                      background: form.storeType === type ? 'var(--accSoft)' : 'var(--raise)',
                      borderColor: form.storeType === type ? 'var(--acc)' : 'rgba(var(--lineRGB),0.08)',
                      color: form.storeType === type ? 'var(--acc)' : 'rgba(var(--fgRGB),0.65)',
                    }}>
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setStep(1)} className="flex-1 h-11 rounded-xl text-xs font-bold border transition"
                style={{ background: 'var(--raise)', borderColor: 'rgba(var(--lineRGB),0.1)', color: 'rgba(var(--fgRGB),0.6)' }}>
                Back
              </button>
              <button onClick={() => setStep(3)}
                className="flex-1 h-11 rounded-xl font-display font-bold text-sm flex items-center justify-center gap-2"
                style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}>
                Next <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: Owner Account ── */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <h2 className="font-display font-black text-xl">Your Account</h2>
              <p className="text-xs mt-0.5" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>
                Create your owner login credentials
              </p>
            </div>

            {[
              { key: 'ownerName', label: 'Full Name', placeholder: liveRegion.owner, type: 'text' },
              { key: 'phone', label: 'Phone Number', placeholder: liveRegion.phone, type: 'tel' },
              { key: 'email', label: 'Email Address', placeholder: 'owner@store.com', type: 'email' },
            ].map(field => (
              <div key={field.key}>
                <label className="block text-[11px] font-mono uppercase tracking-wider mb-1.5"
                  style={{ color: 'rgba(var(--fgRGB),0.45)' }}>{field.label}</label>
                <input type={field.type} value={form[field.key]}
                  onChange={e => set(field.key, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full px-3 py-2.5 rounded-xl text-sm focus:outline-none transition"
                  style={{
                    background: 'var(--raise)',
                    border: '1px solid rgba(var(--lineRGB),0.1)',
                    color: 'var(--fg)',
                  }} />
              </div>
            ))}

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider mb-1.5"
                style={{ color: 'rgba(var(--fgRGB),0.45)' }}>Password</label>
              <div className="relative">
                <input type={showPass ? 'text' : 'password'} value={form.password}
                  onChange={e => set('password', e.target.value)}
                  placeholder="Min 8 characters"
                  className="w-full px-3 py-2.5 pr-10 rounded-xl text-sm focus:outline-none transition"
                  style={{
                    background: 'var(--raise)',
                    border: '1px solid rgba(var(--lineRGB),0.1)',
                    color: 'var(--fg)',
                  }} />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: 'rgba(var(--fgRGB),0.4)' }}>
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="p-3 rounded-xl flex items-start gap-2.5 text-xs" style={{ background: 'var(--accSoft)', color: 'rgba(var(--fgRGB),0.7)' }}>
              <Sparkles className="w-4 h-4 shrink-0 mt-0.5" style={{ color: 'var(--acc)' }} />
              <span>Your store will be active immediately. Add your first clerk in the Manager app to start selling.</span>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setStep(2)} className="flex-1 h-11 rounded-xl text-xs font-bold border transition"
                style={{ background: 'var(--raise)', borderColor: 'rgba(var(--lineRGB),0.1)', color: 'rgba(var(--fgRGB),0.6)' }}>
                Back
              </button>
              <button onClick={() => setStep(4)}
                className="flex-1 h-11 rounded-xl font-display font-bold text-sm flex items-center justify-center gap-2"
                style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}>
                Create Account <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 4: Done ── */}
        {step === 4 && (
          <div className="text-center space-y-5 py-2">
            <div className="w-20 h-20 rounded-3xl mx-auto flex items-center justify-center shadow-xl"
              style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}>
              <Check className="w-10 h-10" />
            </div>
            <div>
              <h2 className="font-display font-black text-2xl">You're Live! 🎉</h2>
              <p className="text-sm mt-1" style={{ color: 'rgba(var(--fgRGB),0.55)' }}>
                {form.storeName || 'Your store'} is ready on BOUND OS
              </p>
            </div>

            <div className="text-left space-y-2">
              {[
                { emoji: '👑', label: 'Owner App', desc: 'Manage your store, approve sales, see analytics', path: '/manager' },
                { emoji: '🎤', label: 'Vendeur App', desc: 'Your clerk sells by voice — no keyboard needed', path: '/vendeur' },
                { emoji: '💻', label: 'CEO Web Portal', desc: 'Full dashboard, reports, and team management', path: '/ceo/dashboard' },
              ].map((item, i) => (
                <button key={i} onClick={() => { handleFinish(); navigate(item.path); }}
                  className="w-full p-3.5 rounded-2xl border text-left flex items-center gap-3 transition"
                  style={{ background: 'var(--raise)', borderColor: 'rgba(var(--lineRGB),0.08)' }}>
                  <span className="text-xl">{item.emoji}</span>
                  <div className="min-w-0">
                    <div className="font-display font-bold text-sm">{item.label}</div>
                    <div className="text-[10px] truncate" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>{item.desc}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 shrink-0 ml-auto" style={{ color: 'var(--acc)' }} />
                </button>
              ))}
            </div>

            <button onClick={handleFinish}
              className="w-full h-12 rounded-xl font-display font-bold text-sm"
              style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}>
              Go to Manager App →
            </button>
          </div>
        )}
      </div>

      {/* Sign in link */}
      <p className="mt-6 text-xs" style={{ color: 'rgba(var(--fgRGB),0.4)' }}>
        Already have an account?{' '}
        <button onClick={() => navigate('/')} className="underline" style={{ color: 'var(--acc)' }}>
          Sign in
        </button>
      </p>
    </div>
  );
};
