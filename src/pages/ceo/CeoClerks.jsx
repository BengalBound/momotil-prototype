import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users, UserPlus, Check, X, Power, Phone, Mail, Clock, Shield, ChevronDown
} from 'lucide-react';

export const CeoClerks = () => {
  const { clerks, addClerk, updateClerkPermissions, toggleClerkStatus, addToast, teamClerks } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [expandedClerk, setExpandedClerk] = useState(null);

  // New Clerk Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [shift, setShift] = useState('Morning (08:00 - 16:00)');
  const [permissions, setPermissions] = useState({
    accView: true, accApprove: false, accPrice: false, accTeam: false, accExport: false
  });

  const permissionLabels = {
    accView: { label: 'View Reports', desc: 'Can view store summary & day stats' },
    accApprove: { label: 'Self-Approve', desc: 'Can approve discounts without Patron' },
    accPrice: { label: 'Edit Prices', desc: 'Can modify item catalog prices at POS' },
    accTeam: { label: 'Team Lead', desc: 'Can view other clerks shifts & metrics' },
    accExport: { label: 'Export Data', desc: 'Can download CSV financial reports' }
  };

  const handleCreateClerk = (e) => {
    e.preventDefault();
    if (!name || !phone) return;
    addClerk({
      name, email: email || `${name.toLowerCase().replace(' ', '.')}@boundos.store`,
      phone, shift, pin: '123456', permissions
    });
    setName(''); setEmail(''); setPhone('');
    setPermissions({ accView: true, accApprove: false, accPrice: false, accTeam: false, accExport: false });
    setShowAddModal(false);
  };

  // Use teamClerks if available (richer data), fallback to clerks
  const displayClerks = (teamClerks && teamClerks.length > 0) ? teamClerks : clerks;

  const inputStyle = {
    background: 'var(--sunken)',
    border: '1px solid rgba(var(--lineRGB),0.12)',
    color: 'var(--fg)',
    borderRadius: '10px',
    padding: '8px 12px',
    fontSize: '12px',
    width: '100%',
    outline: 'none'
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.08)' }}>
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: 'var(--fg)' }}>
            <Users className="w-5 h-5" style={{ color: 'var(--acc)' }} />
            Clerk & Staff Management
          </h2>
          <p className="text-xs mt-0.5" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>
            Role-based access control (RBAC), shift schedules & till privileges
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition hover:opacity-90"
          style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}
        >
          <UserPlus className="w-4 h-4" />
          Add New Clerk
        </button>
      </div>

      {/* Store Teams Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { team: 'Team Alpha', manager: 'Marc Traoré', shift: 'Morning', color: 'var(--acc)' },
          { team: 'Team Beta', manager: 'Fatou Sarr', shift: 'Evening', color: 'var(--ok)' }
        ].map((tm, i) => {
          const teamMembers = displayClerks.filter(c => c.team === tm.team || (!c.team && i === 0));
          const totalSales = teamMembers.reduce((s, c) => s + (c.salesToday || 0), 0);
          return (
            <div key={i} className="p-4 rounded-2xl border" style={{ background: 'var(--raise)', borderColor: 'rgba(var(--lineRGB),0.1)' }}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-bold text-sm" style={{ color: 'var(--fg)' }}>{tm.team}</div>
                  <div className="text-[11px]" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>
                    {tm.shift} · Mgr: {tm.manager}
                  </div>
                </div>
                <span className="w-3 h-3 rounded-full" style={{ background: tm.color }} />
              </div>
              <div className="flex gap-4 text-xs">
                <div>
                  <div className="font-black text-xl" style={{ color: tm.color }}>${totalSales.toFixed(0)}</div>
                  <div style={{ color: 'rgba(var(--fgRGB),0.45)' }}>Today Sales</div>
                </div>
                <div>
                  <div className="font-black text-xl" style={{ color: 'var(--fg)' }}>{teamMembers.length}</div>
                  <div style={{ color: 'rgba(var(--fgRGB),0.45)' }}>Clerks</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Clerks Table */}
      <div className="rounded-2xl border overflow-hidden" style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.08)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b text-[10px] font-bold uppercase tracking-wider"
                style={{ background: 'var(--raise)', borderColor: 'rgba(var(--lineRGB),0.08)', color: 'rgba(var(--fgRGB),0.4)' }}>
                <th className="py-3 px-4">Clerk Profile</th>
                <th className="py-3 px-4 hidden md:table-cell">Contact</th>
                <th className="py-3 px-4">Sales Today</th>
                <th className="py-3 px-4 hidden lg:table-cell">Permissions</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayClerks.map(clerk => (
                <tr key={clerk.id || clerk.name}
                  className="border-b transition"
                  style={{ borderColor: 'rgba(var(--lineRGB),0.05)' }}>
                  {/* Profile */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      {clerk.avatar ? (
                        <img src={clerk.avatar} alt={clerk.name} className="w-9 h-9 rounded-xl object-cover shrink-0"
                          style={{ border: '1px solid rgba(var(--lineRGB),0.1)' }} />
                      ) : (
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0"
                          style={{ background: 'var(--accSoft)', color: 'var(--acc)' }}>
                          {clerk.name?.charAt(0)}
                        </div>
                      )}
                      <div>
                        <div className="font-bold" style={{ color: 'var(--fg)' }}>{clerk.name}</div>
                        <div className="text-[10px] font-mono" style={{ color: 'rgba(var(--fgRGB),0.35)' }}>
                          {clerk.team || 'Team Alpha'} · {clerk.shift?.split('(')[0].trim() || 'Morning'}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="py-3.5 px-4 space-y-0.5 hidden md:table-cell">
                    <div className="flex items-center gap-1.5" style={{ color: 'rgba(var(--fgRGB),0.7)' }}>
                      <Phone className="w-3 h-3" style={{ color: 'rgba(var(--fgRGB),0.35)' }} />
                      <span>{clerk.phone || '—'}</span>
                    </div>
                    {clerk.email && (
                      <div className="flex items-center gap-1.5 text-[11px]" style={{ color: 'rgba(var(--fgRGB),0.4)' }}>
                        <Mail className="w-3 h-3" />
                        <span className="truncate max-w-[140px]">{clerk.email}</span>
                      </div>
                    )}
                  </td>

                  {/* Sales */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold" style={{ color: 'var(--ok)' }}>
                      ${(clerk.salesToday || 0).toFixed(2)}
                    </div>
                    <div style={{ color: 'rgba(var(--fgRGB),0.45)' }}>
                      {clerk.ordersToday || 0} orders
                    </div>
                  </td>

                  {/* Permissions */}
                  <td className="py-3.5 px-4 hidden lg:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {Object.keys(permissionLabels).map(permKey => {
                        const isGranted = clerk.permissions?.[permKey];
                        return (
                          <button
                            key={permKey}
                            onClick={() => updateClerkPermissions && updateClerkPermissions(clerk.id, permKey, !isGranted)}
                            className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold transition"
                            style={{
                              background: isGranted ? 'rgba(255,106,19,0.15)' : 'rgba(var(--lineRGB),0.07)',
                              color: isGranted ? 'var(--acc)' : 'rgba(var(--fgRGB),0.35)',
                              border: `1px solid ${isGranted ? 'rgba(255,106,19,0.3)' : 'rgba(var(--lineRGB),0.1)'}`
                            }}
                          >
                            {permKey}
                          </button>
                        );
                      })}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold"
                      style={{
                        background: clerk.status === 'Active' ? 'rgba(87,217,163,0.15)' : 'rgba(var(--lineRGB),0.07)',
                        color: clerk.status === 'Active' ? 'var(--ok)' : 'rgba(var(--fgRGB),0.5)'
                      }}>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: clerk.status === 'Active' ? 'var(--ok)' : 'rgba(var(--fgRGB),0.4)' }} />
                      {clerk.status || 'Active'}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    {toggleClerkStatus && (
                      <button
                        onClick={() => toggleClerkStatus(clerk.id)}
                        className="p-1.5 rounded-lg border text-xs font-semibold transition"
                        style={{
                          borderColor: clerk.status === 'Active' ? 'rgba(255,138,138,0.3)' : 'rgba(87,217,163,0.3)',
                          color: clerk.status === 'Active' ? 'var(--bad)' : 'var(--ok)'
                        }}
                        title={clerk.status === 'Active' ? 'Deactivate' : 'Activate'}
                      >
                        <Power className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Clerk Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: 'rgba(var(--bgRGB),0.85)', backdropFilter: 'blur(8px)' }}>
          <div className="rounded-3xl max-w-md w-full p-6 shadow-2xl" style={{ background: 'var(--card)', border: '1px solid rgba(var(--lineRGB),0.12)' }}>
            <div className="flex items-center justify-between pb-4 mb-4 border-b" style={{ borderColor: 'rgba(var(--lineRGB),0.08)' }}>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl" style={{ background: 'var(--accSoft)', color: 'var(--acc)' }}>
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base" style={{ color: 'var(--fg)' }}>Provision New Clerk</h3>
                  <p className="text-xs" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>Configure POS terminal credentials</p>
                </div>
              </div>
              <button onClick={() => setShowAddModal(false)} style={{ color: 'rgba(var(--fgRGB),0.5)' }}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateClerk} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1" style={{ color: 'rgba(var(--fgRGB),0.7)' }}>Full Name</label>
                <input type="text" required value={name} onChange={e => setName(e.target.value)}
                  placeholder="e.g. Samuel Adekunle" style={inputStyle} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1" style={{ color: 'rgba(var(--fgRGB),0.7)' }}>Phone</label>
                  <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)}
                    placeholder="+234 800..." style={inputStyle} />
                </div>
                <div>
                  <label className="block font-semibold mb-1" style={{ color: 'rgba(var(--fgRGB),0.7)' }}>Shift</label>
                  <select value={shift} onChange={e => setShift(e.target.value)} style={inputStyle}>
                    <option>Morning (08:00 - 16:00)</option>
                    <option>Evening (14:00 - 22:00)</option>
                    <option>Full Day (Supervisor)</option>
                    <option>Weekend Shift</option>
                  </select>
                </div>
              </div>

              {/* Permissions */}
              <div>
                <label className="block font-semibold mb-2" style={{ color: 'rgba(var(--fgRGB),0.7)' }}>Assign Permissions</label>
                <div className="space-y-2 rounded-xl p-3" style={{ background: 'var(--raise)', border: '1px solid rgba(var(--lineRGB),0.1)' }}>
                  {Object.keys(permissionLabels).map(permKey => (
                    <label key={permKey} className="flex items-center justify-between cursor-pointer p-1.5 rounded-lg transition hover:opacity-80">
                      <div>
                        <div className="font-bold text-[11px] font-mono" style={{ color: 'var(--fg)' }}>
                          {permKey} · {permissionLabels[permKey].label}
                        </div>
                        <div className="text-[10px]" style={{ color: 'rgba(var(--fgRGB),0.45)' }}>
                          {permissionLabels[permKey].desc}
                        </div>
                      </div>
                      <input type="checkbox" checked={permissions[permKey]}
                        onChange={e => setPermissions({ ...permissions, [permKey]: e.target.checked })}
                        className="w-4 h-4 rounded" style={{ accentColor: 'var(--acc)' }}
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl font-semibold text-xs transition hover:opacity-80"
                  style={{ border: '1px solid rgba(var(--lineRGB),0.15)', color: 'rgba(var(--fgRGB),0.7)' }}>
                  Cancel
                </button>
                <button type="submit"
                  className="px-4 py-2 rounded-xl font-semibold text-xs transition hover:opacity-90"
                  style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}>
                  Save & Provision Clerk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
