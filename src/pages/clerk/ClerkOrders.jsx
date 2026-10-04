import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Clock, CheckCircle2, AlertCircle, Eye, Printer, ChevronRight, X, Calendar } from 'lucide-react';

export const ClerkOrders = () => {
  const { transactions, addToast } = useApp();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredOrders = transactions.filter(t => {
    if (statusFilter === 'All') return true;
    return t.status.toLowerCase() === statusFilter.toLowerCase();
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
      case 'Completed':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Approved</span>;
      case 'Pending':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 animate-pulse">Pending CEO</span>;
      case 'Rejected':
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">Rejected</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800">{status}</span>;
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900">Order History</h2>
          <p className="text-xs text-slate-500">Frontline POS transactions</p>
        </div>
        <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-xl">
          {filteredOrders.length} orders
        </span>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1.5 p-1 bg-slate-200/60 rounded-xl text-xs">
        {['All', 'Completed', 'Pending', 'Approved'].map(st => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`flex-1 py-1.5 rounded-lg font-semibold transition ${
              statusFilter === st
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-2.5 pb-6">
        {filteredOrders.map(order => (
          <div
            key={order.id}
            onClick={() => setSelectedOrder(order)}
            className="p-3 bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-blue-400 transition cursor-pointer flex items-center justify-between group"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs text-slate-900">{order.id}</span>
                {getStatusBadge(order.status)}
              </div>
              <div className="text-xs text-slate-600 font-medium">
                {order.customerName} &bull; <span className="text-slate-400">{order.itemsCount} items</span>
              </div>
              <div className="text-[10px] text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{order.timestamp || order.date}</span>
                <span>&bull;</span>
                <span className="text-slate-500">{order.paymentMethod}</span>
              </div>
            </div>

            <div className="text-right flex items-center gap-2">
              <div>
                <div className="font-bold text-sm text-slate-900">${order.total.toFixed(2)}</div>
                <span className="text-[10px] text-blue-600 group-hover:underline">View details</span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition" />
            </div>
          </div>
        ))}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-sm w-full p-5 text-slate-900 shadow-2xl animate-in slide-in-from-bottom-5 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-mono font-bold text-base text-slate-900">{selectedOrder.id}</h3>
                  {getStatusBadge(selectedOrder.status)}
                </div>
                <p className="text-xs text-slate-400">{selectedOrder.date}</p>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs">
              {/* Customer and Clerk */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Customer:</span>
                  <span className="font-semibold text-slate-900">{selectedOrder.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Contact:</span>
                  <span className="font-mono text-slate-900">{selectedOrder.customerPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Processed by:</span>
                  <span className="font-semibold text-slate-900">{selectedOrder.clerkName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payment:</span>
                  <span className="font-semibold text-blue-600">{selectedOrder.paymentMethod}</span>
                </div>
              </div>

              {/* Items List */}
              <div>
                <h4 className="font-bold text-slate-800 mb-2">Order Line Items</h4>
                <div className="space-y-2 border-t border-b border-slate-100 py-2">
                  {selectedOrder.items?.map((it, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs">
                      <div>
                        <span className="font-semibold text-slate-900">{it.name}</span>
                        <div className="text-[10px] text-slate-400">Qty: {it.qty} &times; ${it.price.toFixed(2)}</div>
                      </div>
                      <span className="font-bold text-slate-900">
                        ${(it.price * it.qty).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Grand Total */}
              <div className="flex justify-between items-center pt-1 text-sm font-bold">
                <span className="text-slate-700">Total Charged:</span>
                <span className="text-base text-blue-600">${selectedOrder.total.toFixed(2)}</span>
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex gap-2">
                <button
                  onClick={() => {
                    addToast('Print Triggered', `Re-printing receipt for ${selectedOrder.id}`, 'info');
                  }}
                  className="flex-1 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 font-semibold text-xs flex items-center justify-center gap-1.5 text-slate-700 transition"
                >
                  <Printer className="w-4 h-4 text-slate-500" />
                  Print Receipt
                </button>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="flex-1 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition"
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
