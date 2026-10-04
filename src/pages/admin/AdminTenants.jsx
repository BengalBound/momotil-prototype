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
  const [region, setRegion] = useState('Lagos, Nigeria');

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
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">Pro ($99/mo)</span>;
      case 'Basic':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">Basic ($29/mo)</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700">Free Tier</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Building2 className="w-5 h-5 text-indigo-400" />
            Tenant Organizations Management
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Provision, monitor, and regulate multi-tenant POS store instances
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Provision New Tenant</span>
        </button>
      </div>

      {/* Search and Summary */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-4 rounded-2xl">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stores, subdomains, owner names..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
          <span>Total Stores: <strong className="text-white">{tenants.length}</strong></span>
          <span>Active: <strong className="text-emerald-400">{tenants.filter(t => t.status === 'Active').length}</strong></span>
          <span>Suspended: <strong className="text-rose-400">{tenants.filter(t => t.status === 'Suspended').length}</strong></span>
        </div>
      </div>

      {/* Tenants Table (Deliverable 3.A) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Store Name & Subdomain</th>
                <th className="py-3 px-4">Owner & Region</th>
                <th className="py-3 px-4">Subscription Plan</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Monthly GMV</th>
                <th className="py-3 px-4">Clerks</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredTenants.map(tenant => (
                <tr key={tenant.id} className="hover:bg-slate-800/50 transition">
                  {/* Name & Subdomain */}
                  <td className="py-3.5 px-4">
                    <div>
                      <div className="font-bold text-white text-sm hover:text-indigo-300 transition cursor-pointer" onClick={() => setSelectedTenant(tenant)}>
                        {tenant.name}
                      </div>
                      <div className="text-[11px] text-indigo-400 font-mono flex items-center gap-1 mt-0.5">
                        <Globe className="w-3 h-3" />
                        <span>{tenant.fullDomain}</span>
                      </div>
                    </div>
                  </td>

                  {/* Owner */}
                  <td className="py-3.5 px-4">
                    <div className="text-slate-200 font-medium">{tenant.owner}</div>
                    <div className="text-[11px] text-slate-400">{tenant.region}</div>
                  </td>

                  {/* Plan */}
                  <td className="py-3.5 px-4">
                    {getPlanBadge(tenant.plan)}
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        tenant.status === 'Active'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${tenant.status === 'Active' ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                      {tenant.status}
                    </span>
                  </td>

                  {/* Revenue */}
                  <td className="py-3.5 px-4 font-mono font-bold text-white">
                    {tenant.monthlyRevenue}
                  </td>

                  {/* Clerks */}
                  <td className="py-3.5 px-4 font-mono text-slate-300">
                    {tenant.clerksCount} POS
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedTenant(tenant)}
                        className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-medium border border-slate-700"
                        title="Inspect Tenant"
                      >
                        Inspect
                      </button>

                      <button
                        onClick={() => toggleTenantStatus(tenant.id)}
                        className={`p-1.5 rounded-lg border text-xs transition ${
                          tenant.status === 'Active'
                            ? 'border-rose-800/80 text-rose-400 hover:bg-rose-950/50'
                            : 'border-emerald-800/80 text-emerald-400 hover:bg-emerald-950/50'
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

      {/* Provision Tenant Modal with Live Subdomain Checker */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 text-white shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">Provision New SaaS Store</h3>
                  <p className="text-xs text-slate-400">Automated schema isolation on KVM4</p>
                </div>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="py-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Business Store Name</label>
                <input
                  type="text"
                  required
                  value={storeName}
                  onChange={(e) => {
                    setStoreName(e.target.value);
                    if (!subdomain) {
                      setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''));
                    }
                  }}
                  placeholder="e.g. Zenith Tech Mart"
                  className="w-full px-3 py-2 bg-slate-950 rounded-xl border border-slate-800 text-xs focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
                />
              </div>

              {/* Subdomain Checker (Deliverable 3.A) */}
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Tenant Subdomain
                </label>
                <div className="flex items-center rounded-xl border border-slate-800 bg-slate-950 overflow-hidden focus-within:ring-2 focus-within:ring-indigo-500/30 focus-within:border-indigo-500">
                  <input
                    type="text"
                    required
                    value={cleanSubdomain}
                    onChange={(e) => setSubdomain(e.target.value)}
                    placeholder="zenith"
                    className="w-full px-3 py-2 bg-transparent text-xs font-mono text-white focus:outline-none"
                  />
                  <span className="px-3 py-2 bg-slate-800/80 text-slate-400 text-xs font-mono border-l border-slate-800">
                    .momotill.io
                  </span>
                </div>

                {/* Subdomain status indicator */}
                {cleanSubdomain.length > 0 && (
                  <div className="mt-1.5 flex items-center gap-1.5 text-[11px]">
                    {isSubdomainValid ? (
                      <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                        <Check className="w-3.5 h-3.5" />
                        Domain available: https://{cleanSubdomain}.momotill.io
                      </span>
                    ) : isSubdomainTaken ? (
                      <span className="text-rose-400 flex items-center gap-1 font-semibold">
                        <X className="w-3.5 h-3.5" />
                        Subdomain "{cleanSubdomain}" is already registered.
                      </span>
                    ) : (
                      <span className="text-amber-400">Must be at least 3 characters.</span>
                    )}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Owner Name</label>
                  <input
                    type="text"
                    required
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    placeholder="Frank Louis Ohachosim"
                    className="w-full px-3 py-2 bg-slate-950 rounded-xl border border-slate-800 text-xs focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Country / Region</label>
                  <input
                    type="text"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    placeholder="Lagos, Nigeria"
                    className="w-full px-3 py-2 bg-slate-950 rounded-xl border border-slate-800 text-xs focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Subscription Tier</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Free', 'Basic', 'Pro'].map(p => (
                    <button
                      type="button"
                      key={p}
                      onClick={() => setPlan(p)}
                      className={`p-2 rounded-xl border text-center transition ${
                        plan === p
                          ? 'border-indigo-500 bg-indigo-500/20 text-white font-bold ring-1 ring-indigo-500'
                          : 'border-slate-800 bg-slate-950 text-slate-400 hover:bg-slate-800'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!isSubdomainValid}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs disabled:opacity-50 shadow-md"
                >
                  Provision & Deploy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tenant Detail Drawer / Modal */}
      {selectedTenant && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 text-white shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg text-white">{selectedTenant.name}</h3>
                  {getPlanBadge(selectedTenant.plan)}
                </div>
                <div className="text-xs text-indigo-400 font-mono mt-0.5">
                  https://{selectedTenant.fullDomain}
                </div>
              </div>
              <button
                onClick={() => setSelectedTenant(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-[11px]">Store Owner:</span>
                  <div className="font-bold text-sm text-slate-100">{selectedTenant.owner}</div>
                  <div className="text-[10px] text-slate-500">{selectedTenant.email}</div>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 text-[11px]">Monthly GMV:</span>
                  <div className="font-bold text-sm text-emerald-400 font-mono">{selectedTenant.monthlyRevenue}</div>
                  <div className="text-[10px] text-slate-500">Today: {selectedTenant.todaySales}</div>
                </div>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 space-y-2">
                <div className="font-semibold text-slate-300">Technical Isolation Specs:</div>
                <div className="text-slate-400 text-[11px] space-y-1 font-mono">
                  <div>&bull; Database Schema: <code>{selectedTenant.subdomain}_schema</code></div>
                  <div>&bull; API Gateway Route: <code>/tenants/{selectedTenant.subdomain}/*</code></div>
                  <div>&bull; Active Portable POS Terminals: <strong>{selectedTenant.clerksCount}</strong></div>
                  <div>&bull; Provisioned Date: {selectedTenant.createdDate}</div>
                </div>
              </div>

              <div className="pt-2 flex justify-between gap-2">
                <button
                  onClick={() => {
                    impersonate({
                      name: selectedTenant.owner,
                      role: 'Store CEO',
                      tenant: selectedTenant.name
                    });
                    setSelectedTenant(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Impersonate Store CEO
                </button>

                <button
                  onClick={() => setSelectedTenant(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs"
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
