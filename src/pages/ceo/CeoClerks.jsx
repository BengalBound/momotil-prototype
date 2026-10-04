import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  UserPlus,
  Shield,
  Check,
  X,
  Edit2,
  Trash2,
  Power,
  Phone,
  Mail,
  Clock,
  Sparkles
} from 'lucide-react';

export const CeoClerks = () => {
  const { clerks, addClerk, updateClerkPermissions, toggleClerkStatus, addToast } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingClerk, setEditingClerk] = useState(null);

  // New Clerk Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [shift, setShift] = useState('Morning (08:00 - 16:00)');
  const [permissions, setPermissions] = useState({
    accView: true,
    accApprove: false,
    accPrice: false,
    accTeam: false,
    accExport: false
  });

  const permissionLabels = {
    accView: { label: 'View Reports', desc: 'Can view store summary & day stats' },
    accApprove: { label: 'Self-Approve', desc: 'Can approve discounts without CEO' },
    accPrice: { label: 'Edit Prices', desc: 'Can modify item catalog prices at POS' },
    accTeam: { label: 'Team Lead', desc: 'Can view other clerks shifts & metrics' },
    accExport: { label: 'Export Data', desc: 'Can download CSV financial reports' }
  };

  const handleCreateClerk = (e) => {
    e.preventDefault();
    if (!name || !phone) return;

    addClerk({
      name,
      email: email || `${name.toLowerCase().replace(' ', '.')}@apexretail.ng`,
      phone,
      shift,
      pin: '123456',
      permissions
    });

    setName('');
    setEmail('');
    setPhone('');
    setPermissions({
      accView: true,
      accApprove: false,
      accPrice: false,
      accTeam: false,
      accExport: false
    });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header & Add Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Clerk & Staff Management
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Role-based access control (RBAC), shift schedules & till privileges
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add New Clerk</span>
        </button>
      </div>

      {/* Clerks Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Clerk Profile</th>
                <th className="py-3 px-4">Contact Info</th>
                <th className="py-3 px-4">Shift & Sales Today</th>
                <th className="py-3 px-4">Access Permissions</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {clerks.map(clerk => (
                <tr key={clerk.id} className="hover:bg-slate-50/60 transition">
                  {/* Profile */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={clerk.avatar}
                        alt={clerk.name}
                        className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                      />
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{clerk.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">ID: {clerk.id}</div>
                      </div>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="py-3.5 px-4 space-y-0.5">
                    <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                      <Phone className="w-3 h-3 text-slate-400" />
                      <span>{clerk.phone}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                      <Mail className="w-3 h-3 text-slate-400" />
                      <span>{clerk.email}</span>
                    </div>
                  </td>

                  {/* Shift & Sales */}
                  <td className="py-3.5 px-4 space-y-1">
                    <div className="flex items-center gap-1 text-slate-700 font-medium">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{clerk.shift}</span>
                    </div>
                    <div className="text-slate-500 text-[11px]">
                      Today: <strong className="text-emerald-600">${clerk.salesToday.toFixed(2)}</strong> ({clerk.ordersToday} orders)
                    </div>
                  </td>

                  {/* Permissions Pills (Clickable to Toggle!) */}
                  <td className="py-3.5 px-4">
                    <div className="flex flex-wrap gap-1.5 max-w-xs">
                      {Object.keys(permissionLabels).map(permKey => {
                        const isGranted = clerk.permissions?.[permKey];
                        return (
                          <button
                            key={permKey}
                            onClick={() => updateClerkPermissions(clerk.id, permKey, !isGranted)}
                            className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold transition flex items-center gap-1 border ${
                              isGranted
                                ? 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200'
                                : 'bg-slate-100 border-slate-200 text-slate-400 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200'
                            }`}
                            title={`Click to toggle: ${permissionLabels[permKey].desc}`}
                          >
                            <span>{permKey}</span>
                            {isGranted ? <Check className="w-2.5 h-2.5 text-blue-600" /> : <X className="w-2.5 h-2.5 text-slate-400" />}
                          </button>
                        );
                      })}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        clerk.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${clerk.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                      {clerk.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => toggleClerkStatus(clerk.id)}
                      className={`p-1.5 rounded-lg border text-xs font-semibold transition ${
                        clerk.status === 'Active'
                          ? 'border-rose-200 text-rose-600 hover:bg-rose-50'
                          : 'border-emerald-200 text-emerald-600 hover:bg-emerald-50'
                      }`}
                      title={clerk.status === 'Active' ? 'Deactivate Clerk' : 'Activate Clerk'}
                    >
                      <Power className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Clerk Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-slate-900 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-blue-100 text-blue-600">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base">Provision New Clerk</h3>
                  <p className="text-xs text-slate-500">Configure POS terminal credentials</p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateClerk} className="py-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Samuel Adekunle"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+234 800 000 0000"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Shift Schedule</label>
                  <select
                    value={shift}
                    onChange={(e) => setShift(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                  >
                    <option>Morning (08:00 - 16:00)</option>
                    <option>Evening (14:00 - 22:00)</option>
                    <option>Full Day (Supervisor)</option>
                    <option>Weekend Shift</option>
                  </select>
                </div>
              </div>

              {/* Permission toggles */}
              <div>
                <label className="block font-semibold text-slate-700 mb-2">Assign Permissions</label>
                <div className="space-y-2 border border-slate-200 rounded-xl p-3 bg-slate-50">
                  {Object.keys(permissionLabels).map(permKey => (
                    <label
                      key={permKey}
                      className="flex items-center justify-between cursor-pointer hover:bg-slate-100 p-1.5 rounded-lg transition"
                    >
                      <div>
                        <div className="font-bold text-slate-800 text-[11px] font-mono">
                          {permKey} &bull; {permissionLabels[permKey].label}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {permissionLabels[permKey].desc}
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={permissions[permKey]}
                        onChange={(e) => setPermissions({ ...permissions, [permKey]: e.target.checked })}
                        className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                      />
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-sm"
                >
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
