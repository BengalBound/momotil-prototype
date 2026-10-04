import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Users, Phone, Clock, Check, X, Power } from 'lucide-react';

export const CeoMobileClerks = () => {
  const { clerks, toggleClerkStatus, updateClerkPermissions } = useApp();

  const permLabels = { accView: 'View', accApprove: 'Approve', accPrice: 'Price', accTeam: 'Team', accExport: 'Export' };

  return (
    <div className="p-4 space-y-4 pb-8">
      <div>
        <h2 className="text-sm font-black text-slate-900">Store Team</h2>
        <p className="text-[11px] text-slate-500">{clerks.filter(c => c.status === 'Active').length} active clerks on shift</p>
      </div>

      <div className="space-y-3">
        {clerks.map(clerk => (
          <div key={clerk.id} className="bg-white rounded-2xl border border-slate-200 shadow-xs p-4 space-y-3">
            {/* Clerk header */}
            <div className="flex items-center gap-3">
              <img src={clerk.avatar} alt={clerk.name} className="w-12 h-12 rounded-2xl object-cover border-2 border-slate-200" />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-sm text-slate-900 truncate">{clerk.name}</div>
                <div className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {clerk.shift}
                </div>
                <div className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Phone className="w-3 h-3" /> {clerk.phone}
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-xs font-black text-emerald-600">${clerk.salesToday.toFixed(0)}</div>
                <div className="text-[10px] text-slate-400">{clerk.ordersToday} orders</div>
                <button
                  onClick={() => toggleClerkStatus(clerk.id)}
                  className={`mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    clerk.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {clerk.status}
                </button>
              </div>
            </div>

            {/* Permissions chips — tap to toggle */}
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 mb-1.5">Access Permissions (tap to toggle):</div>
              <div className="flex flex-wrap gap-1.5">
                {Object.keys(permLabels).map(key => {
                  const granted = clerk.permissions?.[key];
                  return (
                    <button
                      key={key}
                      onClick={() => updateClerkPermissions(clerk.id, key, !granted)}
                      className={`flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold border transition ${
                        granted
                          ? 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200'
                          : 'bg-slate-100 border-slate-200 text-slate-400 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200'
                      }`}
                    >
                      {granted ? <Check className="w-2.5 h-2.5" /> : <X className="w-2.5 h-2.5" />}
                      {permLabels[key]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
