import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CheckSquare, CheckCircle2, XCircle, AlertTriangle,
  X, ShieldAlert
} from 'lucide-react';

export const CeoApprovals = () => {
  const { transactions, approveTransaction, rejectTransaction } = useApp();
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
      <div className="rounded-2xl border p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.08)' }}>
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: 'var(--fg)' }}>
            <CheckSquare className="w-5 h-5" style={{ color: 'var(--warn)' }} />
            Transaction Approval Queue
          </h2>
          <p className="text-xs mt-0.5" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>
            Patron/Manager authorization for high-value purchases & price overrides
          </p>
        </div>

        <span className="px-3 py-1.5 rounded-xl text-xs font-bold w-fit"
          style={{ background: 'rgba(255,183,3,0.15)', color: 'var(--warn)', border: '1px solid rgba(255,183,3,0.25)' }}>
          {pendingTransactions.length} Pending Actions
        </span>
      </div>

      {/* Pending Items */}
      <div className="space-y-4">
        <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'rgba(var(--fgRGB),0.4)' }}>
          Awaiting Authorization Decision
        </div>

        {pendingTransactions.length === 0 ? (
          <div className="rounded-2xl border p-8 text-center space-y-3" style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.08)' }}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto" style={{ background: 'rgba(87,217,163,0.15)', color: 'var(--ok)' }}>
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-sm" style={{ color: 'var(--fg)' }}>Queue is Clear!</h4>
            <p className="text-xs max-w-sm mx-auto" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>
              No orders currently pending authorization. Place a high-value order in the Clerk POS App to test this queue.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingTransactions.map(txn => (
              <div key={txn.id} className="p-5 rounded-2xl space-y-4 relative overflow-hidden"
                style={{ background: 'var(--card)', border: '2px solid rgba(255,183,3,0.5)' }}>
                <div className="absolute top-0 right-0 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-bl-xl"
                  style={{ background: 'var(--warn)', color: '#1a0e00' }}>
                  Needs Approval
                </div>

                <div className="flex items-start justify-between pr-24">
                  <div>
                    <span className="font-mono font-black text-base" style={{ color: 'var(--fg)' }}>{txn.id}</span>
                    <div className="text-xs mt-0.5" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>
                      Clerk: <strong style={{ color: 'var(--fg)' }}>{txn.clerkName}</strong>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-black font-mono" style={{ color: 'var(--acc)' }}>
                      ${txn.total.toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Reason */}
                <div className="p-3 rounded-xl text-xs space-y-1" style={{ background: 'rgba(255,183,3,0.1)', border: '1px solid rgba(255,183,3,0.25)' }}>
                  <div className="flex items-center gap-1.5 font-bold" style={{ color: 'var(--warn)' }}>
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>Trigger Reason:</span>
                  </div>
                  <p className="text-[11px] leading-relaxed" style={{ color: 'rgba(var(--fgRGB),0.7)' }}>
                    {txn.approvalReason || 'High-value basket size exceeding standard limit'}
                  </p>
                </div>

                {/* Line Items */}
                <div className="border-t pt-3 space-y-1 text-xs" style={{ borderColor: 'rgba(var(--lineRGB),0.08)' }}>
                  <div className="text-[10px] uppercase font-bold" style={{ color: 'rgba(var(--fgRGB),0.4)' }}>Order Contents:</div>
                  {txn.items?.map((it, idx) => (
                    <div key={idx} className="flex justify-between" style={{ color: 'rgba(var(--fgRGB),0.7)' }}>
                      <span>{it.qty}x {it.name}</span>
                      <span className="font-mono font-semibold" style={{ color: 'var(--fg)' }}>${(it.price * it.qty).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex items-center gap-2 border-t" style={{ borderColor: 'rgba(var(--lineRGB),0.08)' }}>
                  <button
                    onClick={() => approveTransaction(txn.id)}
                    className="flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition hover:opacity-90"
                    style={{ background: 'var(--ok)', color: 'var(--bg)' }}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Approve Order
                  </button>
                  <button
                    onClick={() => setRejectModalTxn(txn)}
                    className="flex-1 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition hover:opacity-90"
                    style={{ background: 'rgba(255,138,138,0.15)', color: 'var(--bad)', border: '1px solid rgba(255,138,138,0.3)' }}
                  >
                    <XCircle className="w-4 h-4" />
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Authorization History */}
      <div className="rounded-2xl border p-5 space-y-4" style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.08)' }}>
        <h3 className="font-bold text-base" style={{ color: 'var(--fg)' }}>Recent Authorization History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b text-[10px] font-bold uppercase tracking-wider"
                style={{ borderColor: 'rgba(var(--lineRGB),0.08)', color: 'rgba(var(--fgRGB),0.4)' }}>
                <th className="py-2.5 px-2">Order ID</th>
                <th className="py-2.5 px-2">Clerk</th>
                <th className="py-2.5 px-2 hidden sm:table-cell">Customer</th>
                <th className="py-2.5 px-2">Amount</th>
                <th className="py-2.5 px-2">Decision</th>
                <th className="py-2.5 px-2 text-right hidden sm:table-cell">Date</th>
              </tr>
            </thead>
            <tbody>
              {pastApprovals.map(t => (
                <tr key={t.id} className="border-b transition" style={{ borderColor: 'rgba(var(--lineRGB),0.05)' }}>
                  <td className="py-3 px-2 font-mono font-bold" style={{ color: 'var(--acc)' }}>{t.id}</td>
                  <td className="py-3 px-2 font-semibold" style={{ color: 'var(--fg)' }}>{t.clerkName}</td>
                  <td className="py-3 px-2 hidden sm:table-cell" style={{ color: 'rgba(var(--fgRGB),0.6)' }}>{t.customerName}</td>
                  <td className="py-3 px-2 font-black font-mono" style={{ color: 'var(--fg)' }}>${t.total.toFixed(2)}</td>
                  <td className="py-3 px-2">
                    {t.status === 'Approved' ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                        style={{ background: 'rgba(87,217,163,0.15)', color: 'var(--ok)' }}>
                        Authorized
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                        style={{ background: 'rgba(255,138,138,0.15)', color: 'var(--bad)' }}>
                        Rejected
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-2 text-right font-mono hidden sm:table-cell" style={{ color: 'rgba(var(--fgRGB),0.4)' }}>{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Rejection Modal */}
      {rejectModalTxn && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4"
          style={{ background: 'rgba(var(--bgRGB),0.85)', backdropFilter: 'blur(8px)' }}>
          <div className="rounded-3xl max-w-sm w-full p-5 shadow-2xl"
            style={{ background: 'var(--card)', border: '1px solid rgba(var(--lineRGB),0.12)' }}>
            <div className="flex items-center justify-between pb-3 mb-4 border-b" style={{ borderColor: 'rgba(var(--lineRGB),0.08)' }}>
              <h3 className="font-bold text-base flex items-center gap-1.5" style={{ color: 'var(--bad)' }}>
                <XCircle className="w-5 h-5" />
                Reject {rejectModalTxn.id}
              </h3>
              <button onClick={() => setRejectModalTxn(null)} style={{ color: 'rgba(var(--fgRGB),0.5)' }}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmReject} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1" style={{ color: 'rgba(var(--fgRGB),0.7)' }}>
                  Reason for Rejection (sent to Clerk terminal):
                </label>
                <select value={rejectReason} onChange={e => setRejectReason(e.target.value)} style={inputStyle}>
                  <option>Price discount exceeds authorized threshold</option>
                  <option>Customer identity verification failed</option>
                  <option>Suspected fraudulent payment transaction</option>
                  <option>Insufficient stock reserved for trade client</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setRejectModalTxn(null)}
                  className="px-4 py-2 rounded-xl font-semibold transition hover:opacity-80"
                  style={{ border: '1px solid rgba(var(--lineRGB),0.15)', color: 'rgba(var(--fgRGB),0.7)' }}>
                  Cancel
                </button>
                <button type="submit"
                  className="px-4 py-2 rounded-xl font-semibold transition hover:opacity-90"
                  style={{ background: 'var(--bad)', color: 'white' }}>
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
