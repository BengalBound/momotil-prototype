import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  CheckCircle2, XCircle, ShieldAlert, CheckSquare,
  ChevronRight, X
} from 'lucide-react';

export const CeoMobileApprovals = () => {
  const { transactions, approveTransaction, rejectTransaction } = useApp();
  const [selectedTxn, setSelectedTxn] = useState(null);

  const pending = transactions.filter(t => t.status === 'Pending');
  const past = transactions.filter(t => t.status !== 'Pending').slice(0, 8);

  return (
    <div className="p-4 space-y-4 pb-8">
      <div>
        <h2 className="text-sm font-black text-slate-900">Transaction Approvals</h2>
        <p className="text-[11px] text-slate-500">{pending.length} orders awaiting CEO authorization</p>
      </div>

      {pending.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <p className="font-bold text-sm text-slate-800">All clear!</p>
          <p className="text-xs text-slate-500">No pending orders. You're all caught up.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {pending.map(txn => (
            <div key={txn.id} className="bg-white rounded-2xl border-2 border-amber-300 shadow-sm p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono font-black text-sm text-slate-900">{txn.id}</span>
                  <div className="text-[11px] text-slate-500 mt-0.5">Clerk: {txn.clerkName}</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-blue-600 font-mono">${txn.total.toFixed(2)}</div>
                  <span className="text-[9px] font-bold uppercase bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">Pending</span>
                </div>
              </div>

              {/* Reason */}
              <div className="text-[11px] text-amber-800 bg-amber-50 border border-amber-200 p-2.5 rounded-xl flex items-start gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-600" />
                <span>{txn.approvalReason}</span>
              </div>

              {/* Items preview */}
              <div className="text-[11px] text-slate-600 space-y-0.5">
                {txn.items?.slice(0, 2).map((it, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>{it.qty}× {it.name}</span>
                    <span className="font-mono">${(it.price * it.qty).toFixed(2)}</span>
                  </div>
                ))}
                {txn.items?.length > 2 && (
                  <div className="text-slate-400">+ {txn.items.length - 2} more items</div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => approveTransaction(txn.id)}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Approve
                </button>
                <button
                  onClick={() => rejectTransaction(txn.id, 'Rejected by CEO via mobile app')}
                  className="flex-1 py-2.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 text-xs font-bold flex items-center justify-center gap-1.5 transition"
                >
                  <XCircle className="w-4 h-4" />
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Past decisions */}
      {past.length > 0 && (
        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">Recent History</h3>
          <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
            {past.map(t => (
              <div key={t.id} className="flex items-center justify-between px-4 py-2.5">
                <div>
                  <span className="font-mono font-bold text-[11px] text-slate-800">{t.id}</span>
                  <div className="text-[10px] text-slate-400">{t.clerkName}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-black text-slate-900">${t.total.toFixed(2)}</span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full ${
                    t.status === 'Approved' || t.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                  }`}>
                    {t.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
