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
      role: 'Store CEO',
      tenant: t.name,
      subdomain: t.subdomain,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      destination: '/ceo/dashboard'
    })),
    // Clerks from store
    ...clerks.map(c => ({
      id: c.id,
      name: c.name,
      email: c.email,
      role: 'Store Clerk',
      tenant: 'Apex Electronics & Retail Ltd',
      subdomain: 'apex',
      avatar: c.avatar,
      destination: '/clerk/catalog'
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-indigo-400" />
            Support User Impersonation Console
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Diagnostic tool allowing Master Admins to simulate live customer environments
          </p>
        </div>

        {impersonatedUser && (
          <button
            onClick={exitImpersonation}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl transition"
          >
            Exit Active Impersonation
          </button>
        )}
      </div>

      {/* Search Input */}
      <div className="relative w-full max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search user name, email, store, or role..."
          className="w-full pl-9 pr-3 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
        />
      </div>

      {/* Users Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">User Identity</th>
                <th className="py-3 px-4">Store Tenant</th>
                <th className="py-3 px-4">Access Tier</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredUsers.map(user => {
                const isCurrent = impersonatedUser?.name === user.name;

                return (
                  <tr key={user.id} className="hover:bg-slate-800/50 transition">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-xl object-cover border border-slate-700" />
                        <div>
                          <div className="font-bold text-white text-xs">{user.name}</div>
                          <div className="text-[11px] text-slate-400 font-mono">{user.email}</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="text-slate-200 font-medium">{user.tenant}</div>
                      <div className="text-[10px] text-indigo-400 font-mono">{user.subdomain}.momotill.io</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          user.role === 'Store CEO'
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                            : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleImpersonate(user)}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 ml-auto transition shadow-sm ${
                          isCurrent
                            ? 'bg-amber-500 text-slate-950 font-black'
                            : 'bg-slate-800 hover:bg-indigo-600 text-white border border-slate-700 hover:border-indigo-500'
                        }`}
                      >
                        <LogIn className="w-3.5 h-3.5" />
                        <span>{isCurrent ? 'Currently Active' : `Login As ${user.role.split(' ')[1]}`}</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
