import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Plus,
  Search,
  ExternalLink,
  Power,
  ShieldCheck,
  Globe,
  DollarSign,
  Users,
  Check,
  X,
  Sparkles,
  AlertCircle
} from 'lucide-react';

export const AdminTenants = () => {
  const { tenants, createTenant, toggleTenantStatus, impersonate } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);

  // New Tenant Form state
  const [storeName, setStoreName] = useState('');
  const [subdomain, setSubdomain] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [plan, setPlan] = useState('Basic');
  const [region, setRegion] = useState('Abidjan, Côte d\'Ivoire');

  // Real-time subdomain check
  const cleanSubdomain = subdomain.toLowerCase().replace(/[^a-z0-9-]/g, '');
  const isSubdomainTaken = tenants.some(t => t.subdomain.toLowerCase() === cleanSubdomain.toLowerCase());
  const isSubdomainValid = cleanSubdomain.length >= 3 && !isSubdomainTaken;

  const filteredTenants = tenants.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.subdomain.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.owner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!isSubdomainValid || !storeName || !ownerName) return;

    createTenant({
      name: storeName,
      subdomain: cleanSubdomain,
      owner: ownerName,
      email: ownerEmail || `${cleanSubdomain}@pos-client.com`,
      plan,
      region
    });

    setStoreName('');
    setSubdomain('');
    setOwnerName('');
    setOwnerEmail('');
    setShowCreateModal(false);
  };

  const getPlanBadge = (p) => {
    switch (p) {
      case 'Pro':
        return (
          <span
            className="px-2.5 py-0.5 rounded-full text-[10px] font-bold border"
            style={{ background: 'var(--accSoft)', color: 'var(--acc)', borderColor: 'rgba(var(--lineRGB),0.15)' }}
          >
            Pro ($99/mo)
          </span>
        );
      case 'Basic':
        return (
          <span
            className="px-2.5 py-0.5 rounded-full text-[10px] font-bold border"
            style={{ background: 'rgba(37,99,235,0.12)', color: '#3B82F6', borderColor: 'rgba(37,99,235,0.25)' }}
          >
            Basic ($29/mo)
          </span>
        );
      default:
        return (
          <span
            className="px-2.5 py-0.5 rounded-full text-[10px] font-bold border"
            style={{ background: 'var(--sunken)', color: 'rgba(var(--fgRGB),0.5)', borderColor: 'rgba(var(--lineRGB),0.1)' }}
          >
            Free Tier
          </span>
        );
    }
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
            <Building2 className="w-5 h-5 text-[var(--acc)]" />
            <span>Tenant Organizations Management</span>
          </h2>
          <p className="text-xs mt-0.5" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>
            Provision, monitor, and regulate multi-tenant POS store instances on KVM4
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition active:scale-95 cursor-pointer"
          style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}
        >
          <Plus className="w-4 h-4" />
          <span>Provision New Tenant</span>
        </button>
      </div>

      {/* Search and Summary */}
      <div
        className="flex flex-col sm:flex-row items-center justify-between gap-3 border p-4 rounded-3xl"
        style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.08)' }}
      >
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(var(--fgRGB),0.4)' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stores, subdomains, owner names..."
            style={{ ...inputStyle, paddingLeft: '34px' }}
          />
        </div>

        <div className="flex items-center gap-4 text-xs font-mono" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>
          <span>Total Stores: <strong style={{ color: 'var(--fg)' }}>{tenants.length}</strong></span>
          <span>Active: <strong className="text-emerald-400">{tenants.filter(t => t.status === 'Active').length}</strong></span>
          <span>Suspended: <strong className="text-rose-400">{tenants.filter(t => t.status === 'Suspended').length}</strong></span>
        </div>
      </div>

      {/* Tenants Table */}
      <div
        className="border rounded-3xl overflow-hidden shadow-sm"
        style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.08)' }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr
                className="border-b text-[10px] font-bold uppercase tracking-wider"
                style={{ background: 'var(--raise)', borderColor: 'rgba(var(--lineRGB),0.08)', color: 'rgba(var(--fgRGB),0.45)' }}
              >
                <th className="py-3 px-4">Store Name & Subdomain</th>
                <th className="py-3 px-4">Owner & Region</th>
                <th className="py-3 px-4">Subscription Plan</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Monthly GMV</th>
                <th className="py-3 px-4">Clerks</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTenants.map(tenant => (
                <tr
                  key={tenant.id}
                  className="border-b transition hover:bg-[var(--raise)]"
                  style={{ borderColor: 'rgba(var(--lineRGB),0.05)' }}
                >
                  {/* Name & Subdomain */}
                  <td className="py-3.5 px-4">
                    <div>
                      <div
                        className="font-bold text-sm cursor-pointer hover:underline"
                        style={{ color: 'var(--fg)' }}
                        onClick={() => setSelectedTenant(tenant)}
                      >
                        {tenant.name}
                      </div>
                      <div className="font-mono text-[10px] text-[var(--acc)]">
                        {tenant.subdomain}.momotill.io
                      </div>
                    </div>
                  </td>

                  {/* Owner & Region */}
                  <td className="py-3.5 px-4">
                    <div className="font-semibold" style={{ color: 'var(--fg)' }}>{tenant.owner}</div>
                    <div className="text-[10px]" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>{tenant.region}</div>
                  </td>

                  {/* Plan */}
                  <td className="py-3.5 px-4">
                    {getPlanBadge(tenant.plan)}
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        tenant.status === 'Active'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${tenant.status === 'Active' ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                      {tenant.status}
                    </span>
                  </td>

                  {/* GMV */}
                  <td className="py-3.5 px-4 font-mono font-bold" style={{ color: 'var(--fg)' }}>
                    {tenant.monthlyRevenue}
                  </td>

                  {/* Clerks */}
                  <td className="py-3.5 px-4">
                    <span
                      className="px-2 py-0.5 rounded-md font-mono text-[11px] font-bold"
                      style={{ background: 'var(--sunken)', color: 'rgba(var(--fgRGB),0.75)' }}
                    >
                      {tenant.clerksCount} POS
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => impersonate({
                          name: tenant.owner,
                          role: 'Store CEO',
                          tenant: tenant.name
                        })}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-bold border transition hover:bg-[var(--raise)] cursor-pointer"
                        style={{ borderColor: 'rgba(var(--lineRGB),0.12)', color: 'var(--acc)' }}
                        title="Impersonate Owner"
                      >
                        Impersonate
                      </button>

                      <button
                        onClick={() => toggleTenantStatus(tenant.id)}
                        className={`p-1.5 rounded-lg border transition cursor-pointer ${
                          tenant.status === 'Active'
                            ? 'text-rose-400 border-rose-500/20 hover:bg-rose-500/10'
                            : 'text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/10'
                        }`}
                        title={tenant.status === 'Active' ? 'Suspend Tenant' : 'Activate Tenant'}
                      >
                        <Power className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Provision Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div
            className="rounded-3xl border max-w-md w-full p-6 shadow-2xl space-y-4"
            style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.12)' }}
          >
            <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'rgba(var(--lineRGB),0.08)' }}>
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[var(--acc)]" />
                <h3 className="font-bold text-base" style={{ color: 'var(--fg)' }}>Provision Store Tenant</h3>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="hover:text-[var(--fg)]" style={{ color: 'rgba(var(--fgRGB),0.4)' }}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1" style={{ color: 'rgba(var(--fgRGB),0.7)' }}>Store Name</label>
                <input
                  type="text"
                  required
                  value={storeName}
                  onChange={e => setStoreName(e.target.value)}
                  placeholder="e.g. Abidjan Supermarket"
                  style={inputStyle}
                />
              </div>

              <div>
                <label className="block font-semibold mb-1" style={{ color: 'rgba(var(--fgRGB),0.7)' }}>Subdomain</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    required
                    value={subdomain}
                    onChange={e => setSubdomain(e.target.value)}
                    placeholder="abidjan-market"
                    style={{ ...inputStyle, borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
                  />
                  <span
                    className="px-3 py-2 border border-l-0 text-[11px] font-mono whitespace-nowrap"
                    style={{ background: 'var(--raise)', borderColor: 'rgba(var(--lineRGB),0.12)', color: 'rgba(var(--fgRGB),0.5)', borderTopRightRadius: '12px', borderBottomRightRadius: '12px' }}
                  >
                    .momotill.io
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-semibold mb-1" style={{ color: 'rgba(var(--fgRGB),0.7)' }}>Owner Name</label>
                  <input
                    type="text"
                    required
                    value={ownerName}
                    onChange={e => setOwnerName(e.target.value)}
                    placeholder="Awa Kouassi"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1" style={{ color: 'rgba(var(--fgRGB),0.7)' }}>Region</label>
                  <input
                    type="text"
                    value={region}
                    onChange={e => setRegion(e.target.value)}
                    placeholder="Abidjan, CI"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1" style={{ color: 'rgba(var(--fgRGB),0.7)' }}>Subscription Tier</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Free', 'Basic', 'Pro'].map(p => (
                    <button
                      type="button"
                      key={p}
                      onClick={() => setPlan(p)}
                      className="p-2 rounded-xl border text-center transition cursor-pointer"
                      style={{
                        background: plan === p ? 'var(--acc)' : 'var(--sunken)',
                        color: plan === p ? 'var(--onAcc)' : 'rgba(var(--fgRGB),0.6)',
                        borderColor: plan === p ? 'var(--acc)' : 'rgba(var(--lineRGB),0.1)'
                      }}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t" style={{ borderColor: 'rgba(var(--lineRGB),0.06)' }}>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl border font-semibold text-xs cursor-pointer hover:bg-[var(--raise)]"
                  style={{ borderColor: 'rgba(var(--lineRGB),0.12)', color: 'rgba(var(--fgRGB),0.6)' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!isSubdomainValid}
                  className="px-4 py-2 rounded-xl font-bold text-xs disabled:opacity-50 cursor-pointer shadow-md"
                  style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}
                >
                  Deploy Tenant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tenant Detail Drawer */}
      {selectedTenant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div
            className="border rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4"
            style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.12)' }}
          >
            <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'rgba(var(--lineRGB),0.08)' }}>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base" style={{ color: 'var(--fg)' }}>{selectedTenant.name}</h3>
                  {getPlanBadge(selectedTenant.plan)}
                </div>
                <div className="text-xs font-mono mt-0.5" style={{ color: 'var(--acc)' }}>
                  https://{selectedTenant.fullDomain}
                </div>
              </div>
              <button onClick={() => setSelectedTenant(null)} className="hover:text-[var(--fg)]" style={{ color: 'rgba(var(--fgRGB),0.4)' }}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-2 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl border" style={{ background: 'var(--sunken)', borderColor: 'rgba(var(--lineRGB),0.06)' }}>
                  <span className="text-[11px]" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>Store Owner:</span>
                  <div className="font-bold text-sm" style={{ color: 'var(--fg)' }}>{selectedTenant.owner}</div>
                  <div className="text-[10px]" style={{ color: 'rgba(var(--fgRGB),0.4)' }}>{selectedTenant.email}</div>
                </div>
                <div className="p-3 rounded-2xl border" style={{ background: 'var(--sunken)', borderColor: 'rgba(var(--lineRGB),0.06)' }}>
                  <span className="text-[11px]" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>Monthly GMV:</span>
                  <div className="font-bold text-sm text-emerald-400 font-mono">{selectedTenant.monthlyRevenue}</div>
                  <div className="text-[10px]" style={{ color: 'rgba(var(--fgRGB),0.4)' }}>Today: {selectedTenant.todaySales}</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl border space-y-1.5" style={{ background: 'var(--sunken)', borderColor: 'rgba(var(--lineRGB),0.06)' }}>
                <div className="font-semibold" style={{ color: 'var(--fg)' }}>Technical Isolation Specs:</div>
                <div className="text-[11px] font-mono space-y-1" style={{ color: 'rgba(var(--fgRGB),0.6)' }}>
                  <div>• Database Schema: <code>{selectedTenant.subdomain}_schema</code></div>
                  <div>• API Gateway Route: <code>/tenants/{selectedTenant.subdomain}/*</code></div>
                  <div>• Active POS Terminals: <strong>{selectedTenant.clerksCount}</strong></div>
                  <div>• Provisioned Date: {selectedTenant.createdDate}</div>
                </div>
              </div>

              <div className="pt-2 flex justify-between gap-2 border-t" style={{ borderColor: 'rgba(var(--lineRGB),0.06)' }}>
                <button
                  onClick={() => {
                    impersonate({
                      name: tenant.owner || selectedTenant.owner,
                      role: 'Store CEO',
                      tenant: selectedTenant.name
                    });
                    setSelectedTenant(null);
                  }}
                  className="px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
                  style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Impersonate Store CEO</span>
                </button>

                <button
                  onClick={() => setSelectedTenant(null)}
                  className="px-4 py-2 rounded-xl border font-semibold text-xs cursor-pointer hover:bg-[var(--raise)]"
                  style={{ borderColor: 'rgba(var(--lineRGB),0.12)', color: 'rgba(var(--fgRGB),0.6)' }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
