import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CheckSquare,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  User,
  CreditCard,
  DollarSign,
  ChevronRight,
  X,
  ShieldAlert
} from 'lucide-react';

export const CeoApprovals = () => {
  const { transactions, approveTransaction, rejectTransaction, addToast } = useApp();
  const [selectedTxn, setSelectedTxn] = useState(null);
  const [rejectModalTxn, setRejectModalTxn] = useState(null);
  const [rejectReason, setRejectReason] = useState('Price discount exceeds authorized threshold');

  const pendingTransactions = transactions.filter(t => t.status === 'Pending');
  const pastApprovals = transactions.filter(t => t.status === 'Approved' || t.status === 'Rejected');

  const handleConfirmReject = (e) => {
    e.preventDefault();
    if (!rejectModalTxn) return;
    rejectTransaction(rejectModalTxn.id, rejectReason);
    setRejectModalTxn(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <CheckSquare className="w-5 h-5 text-amber-500" />
            Transaction Approval Queue
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Store CEO authorization for high-ticket purchases (&gt; $800) and clerk price overrides
          </p>
        </div>

        <span className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold w-fit">
          {pendingTransactions.length} Pending Actions
        </span>
      </div>

      {/* Pending Items Grid */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Awaiting CEO Decision
        </h3>

        {pendingTransactions.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm text-slate-800">Queue is Clear!</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No orders currently pending store manager or CEO approval. You can place a high-value order in the Clerk POS App to test this queue.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingTransactions.map(txn => (
              <div
                key={txn.id}
                className="bg-white p-5 rounded-2xl border-2 border-amber-400/80 shadow-md space-y-4 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 font-bold text-[10px] px-3 py-0.5 rounded-bl-xl uppercase tracking-wider">
                  Needs Approval
                </div>

                <div className="flex items-start justify-between pr-24">
                  <div>
                    <span className="font-mono font-black text-base text-slate-900">{txn.id}</span>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Clerk: <strong className="text-slate-700">{txn.clerkName}</strong>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-black text-blue-600 font-mono">
                      ${txn.total.toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Reason Banner */}
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-amber-900">
                    <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Trigger Reason:</span>
                  </div>
                  <p className="text-amber-800 text-[11px] leading-relaxed">
                    {txn.approvalReason || 'High-value basket size exceeding standard limit'}
                  </p>
                </div>

                {/* Line Items Preview */}
                <div className="border-t border-slate-100 pt-3 space-y-1 text-xs">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Order Contents:</div>
                  {txn.items?.map((it, idx) => (
                    <div key={idx} className="flex justify-between text-slate-700">
                      <span>{it.qty}x {it.name}</span>
                      <span className="font-mono font-semibold">${(it.price * it.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center gap-2 border-t border-slate-100">
                  <button
                    onClick={() => approveTransaction(txn.id)}
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve Order</span>
                  </button>

                  <button
                    onClick={() => setRejectModalTxn(txn)}
                    className="flex-1 py-2.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center gap-1.5 transition"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* History of Past Decisions */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
        <h3 className="font-bold text-base text-slate-900">Recent Authorization History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="border-b border-slate-200 text-slate-400 font-semibold uppercase">
              <tr>
                <th className="py-2.5 px-3">Order ID</th>
                <th className="py-2.5 px-3">Clerk</th>
                <th className="py-2.5 px-3">Customer</th>
                <th className="py-2.5 px-3">Amount</th>
                <th className="py-2.5 px-3">Decision</th>
                <th className="py-2.5 px-3 text-right">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pastApprovals.map(t => (
                <tr key={t.id} className="hover:bg-slate-50 transition">
                  <td className="py-3 px-3 font-mono font-bold text-slate-900">{t.id}</td>
                  <td className="py-3 px-3 text-slate-700">{t.clerkName}</td>
                  <td className="py-3 px-3 text-slate-600">{t.customerName}</td>
                  <td className="py-3 px-3 font-black text-slate-900 font-mono">${t.total.toFixed(2)}</td>
                  <td className="py-3 px-3">
                    {t.status === 'Approved' ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        Authorized by CEO
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                        Rejected
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-right text-slate-400 font-mono">{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rejection Modal */}
      {rejectModalTxn && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 text-slate-900 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-rose-600 flex items-center gap-1.5">
                <XCircle className="w-5 h-5" />
                Reject Transaction {rejectModalTxn.id}
              </h3>
              <button
                onClick={() => setRejectModalTxn(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmReject} className="py-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Reason for Rejection (sent to Clerk till):
                </label>
                <select
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-rose-500/20 focus:border-rose-600"
                >
                  <option>Price discount exceeds authorized threshold</option>
                  <option>Customer identity verification failed</option>
                  <option>Suspected fraudulent payment transaction</option>
                  <option>Insufficient stock reserved for trade client</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRejectModalTxn(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold shadow-sm"
                >
                  Confirm Rejection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
