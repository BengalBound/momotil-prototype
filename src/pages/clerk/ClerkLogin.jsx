import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Phone, Lock, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export const ClerkLogin = () => {
  const navigate = useNavigate();
  const { clerks, setCurrentClerk, addToast } = useApp();

  const [phone, setPhone] = useState('+234 802 345 6789');
  const [otp, setOtp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState('phone'); // 'phone' | 'otp'

  const handleRequestOtp = (e) => {
    e.preventDefault();
    if (!phone) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('otp');
      addToast('OTP Sent', 'Demo verification code is 123456', 'info');
    }, 450);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (!otp) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const matched = clerks.find(c => c.status === 'Active') || clerks[0];
      setCurrentClerk(matched);
      addToast('Welcome Back', `Logged in as ${matched.name}`, 'success');
      navigate('/clerk/catalog');
    }, 500);
  };

  const handleQuickLoginAs = (clerk) => {
    setCurrentClerk(clerk);
    addToast('Authenticated', `Active clerk: ${clerk.name}`, 'success');
    navigate('/clerk/catalog');
  };

  return (
    <div className="min-h-full flex flex-col justify-between p-6 bg-gradient-to-b from-white via-slate-50 to-blue-50/40">
      <div className="pt-6">
        {/* BengalBound Logo & Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 via-blue-700 to-indigo-700 flex items-center justify-center text-white shadow-xl shadow-blue-500/25 mb-3">
            <span className="text-2xl font-black tracking-tight">BB</span>
          </div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
            BengalBound Technologies
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-2">MoMoTill POS</h1>
          <p className="text-xs text-slate-500 mt-0.5">Store Clerk Terminal Authentication</p>
        </div>

        {/* Login Form */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          {step === 'phone' ? (
            <form onSubmit={handleRequestOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Clerk Mobile Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+234 802 345 6789"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 font-mono transition"
                    required
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">SMS one-time passcode will be simulated</p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition shadow-sm disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Send Verification Code</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-700">Enter 6-digit OTP</label>
                  <button
                    type="button"
                    onClick={() => setOtp('123456')}
                    className="text-[11px] text-blue-600 hover:underline font-semibold flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    Auto-fill (123456)
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="123456"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm font-mono tracking-widest text-center focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition shadow-sm disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Verify & Open POS</span>
                    <ShieldCheck className="w-4 h-4" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setStep('phone')}
                className="w-full text-center text-[11px] text-slate-400 hover:text-slate-600"
              >
                Change Phone Number
              </button>
            </form>
          )}
        </div>

        {/* Demo Fast Switcher for Presentation */}
        <div className="mt-6">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 text-center">
            Or Click a Demo Clerk:
          </div>
          <div className="grid grid-cols-2 gap-2">
            {clerks.slice(0, 4).map(c => (
              <button
                key={c.id}
                onClick={() => handleQuickLoginAs(c)}
                className="flex items-center gap-2 p-2 rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/50 transition text-left"
              >
                <img src={c.avatar} alt={c.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-slate-900 truncate">{c.name.split(' ')[0]}</div>
                  <div className="text-[10px] text-slate-500 truncate">{c.phone}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pt-4 border-t border-slate-200/60 text-[10px] text-slate-400">
        MoMoTill SaaS Engine &bull; BengalBound &copy; 2026
      </div>
    </div>
  );
};
