import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  UserCheck,
  Search,
  LogIn,
  Shield,
  Building,
  Smartphone,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export const AdminImpersonation = () => {
  const navigate = useNavigate();
  const { tenants, clerks, impersonate, impersonatedUser, exitImpersonation } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  // Assemble list of users across all tenants
  const allUsers = [
    // CEOs from tenants
    ...tenants.map(t => ({
      id: `usr-ceo-${t.id}`,
      name: t.owner,
      email: t.email,
      role: 'Store CEO / Patron',
      tenant: t.name,
      subdomain: t.subdomain,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      destination: '/manager'
    })),
    // Managers & Clerks from store
    ...clerks.map(c => ({
      id: c.id,
      name: c.name,
      email: c.email,
      role: 'Store Clerk',
      tenant: 'Auto Pièces Kouassi',
      subdomain: 'autopieces',
      avatar: c.avatar,
      destination: '/vendeur'
    }))
  ];

  const filteredUsers = allUsers.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.tenant.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleImpersonate = (user) => {
    impersonate(user);
    navigate(user.destination);
  };

  const inputStyle = {
    background: 'var(--card)',
    border: '1px solid rgba(var(--lineRGB), 0.12)',
    color: 'var(--fg)',
    borderRadius: '14px',
    padding: '8px 12px 8px 34px',
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
            <UserCheck className="w-5 h-5 text-[var(--acc)]" />
            <span>Support User Impersonation Console</span>
          </h2>
          <p className="text-xs mt-0.5" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>
            Diagnostic tool allowing Master Admins to simulate live customer and clerk POS environments
          </p>
        </div>

        {impersonatedUser && (
          <button
            onClick={exitImpersonation}
            className="px-4 py-2 font-bold text-xs rounded-xl transition cursor-pointer"
            style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}
          >
            Exit Active Impersonation
          </button>
        )}
      </div>

      {/* Search Input */}
      <div className="relative w-full max-w-md">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(var(--fgRGB),0.4)' }} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search user name, email, store, or role..."
          style={inputStyle}
        />
      </div>

      {/* Users Table */}
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
                <th className="py-3 px-4">User Identity</th>
                <th className="py-3 px-4">Role / Access Tier</th>
                <th className="py-3 px-4">Tenant Store Name</th>
                <th className="py-3 px-4">Subdomain Schema</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr
                  key={user.id}
                  className="border-b transition hover:bg-[var(--raise)]"
                  style={{ borderColor: 'rgba(var(--lineRGB),0.05)' }}
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                      <div>
                        <div className="font-bold text-xs" style={{ color: 'var(--fg)' }}>{user.name}</div>
                        <div className="text-[10px]" style={{ color: 'rgba(var(--fgRGB),0.4)' }}>{user.email}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-bold border"
                      style={{
                        background: user.role.includes('CEO') ? 'var(--accSoft)' : 'var(--sunken)',
                        color: user.role.includes('CEO') ? 'var(--acc)' : 'rgba(var(--fgRGB),0.7)',
                        borderColor: 'rgba(var(--lineRGB),0.1)'
                      }}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-medium" style={{ color: 'var(--fg)' }}>
                    {user.tenant}
                  </td>

                  <td className="py-3.5 px-4 font-mono text-[11px]" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>
                    {user.subdomain}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleImpersonate(user)}
                      className="px-3 py-1.5 rounded-xl font-bold text-xs inline-flex items-center gap-1.5 transition active:scale-95 cursor-pointer shadow-sm"
                      style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}
                    >
                      <LogIn className="w-3.5 h-3.5" />
                      <span>Impersonate</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
