import React from 'react';
import { ProductSalesAnalyticsView } from '../../components/analytics/ProductSalesAnalyticsView';
import { PAYMENT_METHODS_DATA } from '../../data/mockData';

export const CeoAnalytics = () => {
  return (
    <div className="space-y-6">
      {/* ── Core Graph Analytics Engine with Vendor & Product Filters ── */}
      <ProductSalesAnalyticsView
        role="owner"
        title="Store Sales & Product Graph Analytics"
        subtitle="Complete owner overview: see which products sell more, track revenue generation, and filter by any vendor or product."
      />

      {/* ── Multi-Channel Payment Methods Breakdown ── */}
      <div className="p-5 rounded-2xl border" style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.08)' }}>
        <h3 className="font-bold text-base mb-0.5" style={{ color: 'var(--fg)' }}>
          Payment Method Acceptance Share
        </h3>
        <p className="text-xs mb-5" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>
          Mobile Money (MoMo / Wave / Orange) vs Card and Cash terminal transaction volume
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PAYMENT_METHODS_DATA.map(m => (
            <div
              key={m.name}
              className="p-4 rounded-2xl border space-y-2"
              style={{ background: 'var(--raise)', borderColor: 'rgba(var(--lineRGB),0.08)' }}
            >
              <div className="flex justify-between items-center text-xs font-semibold" style={{ color: 'rgba(var(--fgRGB),0.7)' }}>
                <span>{m.name}</span>
                <span className="font-mono" style={{ color: 'rgba(var(--fgRGB),0.45)' }}>{m.count} tx</span>
              </div>
              <div className="text-2xl font-black" style={{ color: 'var(--fg)' }}>{m.percentage}%</div>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(var(--lineRGB),0.1)' }}>
                <div className="h-full rounded-full transition-all" style={{ width: `${m.percentage}%`, backgroundColor: m.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
