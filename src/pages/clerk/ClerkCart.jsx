import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  CreditCard,
  Banknote,
  Smartphone,
  CheckCircle2,
  Printer,
  Volume2,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ClerkCart = () => {
  const navigate = useNavigate();
  const { cart, updateCartQty, removeFromCart, clearCart, processCheckout, addToast } = useApp();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Mobile Money (MTN MoMo)');
  const [customerName, setCustomerName] = useState('Chief Obinna Eze');
  const [customerPhone, setCustomerPhone] = useState('+234 803 111 2233');
  const [cashTendered, setCashTendered] = useState('');
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const tax = subtotal * 0.05; // 5% VAT / Sales tax
  const total = subtotal + tax;

  const paymentOptions = [
    { id: 'Mobile Money (MTN MoMo)', label: 'MTN MoMo', icon: Smartphone, color: 'text-amber-500 bg-amber-50 border-amber-200' },
    { id: 'Mobile Money (M-Pesa)', label: 'M-Pesa', icon: Smartphone, color: 'text-emerald-500 bg-emerald-50 border-emerald-200' },
    { id: 'Card (POS Terminal)', label: 'Card / POS', icon: CreditCard, color: 'text-blue-500 bg-blue-50 border-blue-200' },
    { id: 'Cash', label: 'Cash', icon: Banknote, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  ];

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsProcessingOrder(true);

    setTimeout(async () => {
      const order = await processCheckout({
        customerName,
        customerPhone,
        paymentMethod,
        discountApplied: false
      });

      setIsProcessingOrder(false);
      setCompletedOrder(order);

      // Trigger Confetti Celebration!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}

      // Play audio confirmation
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        const msg = new SpeechSynthesisUtterance(`Order ${order.id} confirmed. Total: ${order.total} dollars.`);
        window.speechSynthesis.speak(msg);
      }
    }, 600);
  };

  const calculatedChange = cashTendered ? Math.max(0, Number(cashTendered) - total) : 0;

  if (completedOrder) {
    return (
      <div className="p-5 flex flex-col items-center justify-center min-h-[550px] text-center animate-in zoom-in-95">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h2 className="text-xl font-black text-slate-900">Order Confirmed!</h2>
        <p className="text-xs text-slate-500 mt-1">Transaction #{completedOrder.id}</p>

        {completedOrder.requiresApproval && (
          <div className="mt-3 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-xl text-amber-800 text-[11px] font-semibold">
            ⏳ Forwarded to Store CEO for high-value authorization
          </div>
        )}

        {/* Digital Thermal Receipt Preview */}
        <div className="w-full bg-white border border-slate-200 rounded-2xl p-4 my-5 text-left text-xs font-mono shadow-xs space-y-2">
          <div className="text-center font-bold text-slate-900 border-b pb-2">
            MOMOTILL PORTABLE POS<br />
            <span className="text-[10px] text-slate-500 font-normal">Apex Electronics Ltd</span>
          </div>

          <div className="text-[11px] text-slate-600 space-y-0.5">
            <div className="flex justify-between">
              <span>Date:</span> <span>{completedOrder.date}</span>
            </div>
            <div className="flex justify-between">
              <span>Clerk:</span> <span>{completedOrder.clerkName}</span>
            </div>
            <div className="flex justify-between">
              <span>Customer:</span> <span>{completedOrder.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span>Payment:</span> <span>{completedOrder.paymentMethod}</span>
            </div>
          </div>

          <div className="border-t border-dashed pt-2 space-y-1">
            {completedOrder.items.map((it, idx) => (
              <div key={idx} className="flex justify-between text-[11px]">
                <span className="truncate pr-2">{it.qty}x {it.name}</span>
                <span className="shrink-0">${(it.price * it.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-300 pt-2 flex justify-between font-bold text-sm text-slate-900">
            <span>TOTAL:</span>
            <span>${completedOrder.total.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full">
          <button
            onClick={() => {
              addToast('Thermal Printer', 'Receipt sent to Bluetooth thermal printer', 'info');
            }}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            Print Receipt
          </button>

          <button
            onClick={() => {
              setCompletedOrder(null);
              setIsCheckingOut(false);
              navigate('/clerk/catalog');
            }}
            className="flex-1 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-sm"
          >
            New Order &gt;
          </button>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="p-6 flex flex-col items-center justify-center min-h-[500px] text-center">
        <div className="w-20 h-20 rounded-3xl bg-blue-50 text-blue-500 flex items-center justify-center mb-4">
          <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
        </div>
        <h3 className="text-base font-bold text-slate-900">Your Cart is Empty</h3>
        <p className="text-xs text-slate-500 max-w-xs mt-1 mb-5">
          Scan barcodes, use AI voice commands, or select products from the catalog to build an order.
        </p>
        <button
          onClick={() => navigate('/clerk/catalog')}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 transition shadow-sm"
        >
          <span>Browse Products</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900">Current Cart</h2>
          <p className="text-xs text-slate-500">{cart.length} unique items</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear All
        </button>
      </div>

      {/* Cart Items List */}
      <div className="space-y-2.5">
        {cart.map(({ product, qty }) => (
          <div
            key={product.id}
            className="p-3 bg-white rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-14 h-14 rounded-xl object-cover border border-slate-100 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-semibold text-slate-900 truncate">{product.name}</h4>
              <div className="text-xs font-bold text-blue-600 mt-0.5">
                ${product.price.toFixed(2)}
              </div>
            </div>

            {/* Qty controls */}
            <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-xl border border-slate-200 shrink-0">
              <button
                onClick={() => updateCartQty(product.id, qty - 1)}
                className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 transition"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-6 text-center text-xs font-bold text-slate-800 font-mono">
                {qty}
              </span>
              <button
                onClick={() => updateCartQty(product.id, qty + 1)}
                className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Running Total Calculation */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2 text-xs">
        <div className="flex justify-between text-slate-500">
          <span>Subtotal</span>
          <span className="font-semibold text-slate-800">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-slate-500">
          <span>Estimated VAT (5%)</span>
          <span className="font-semibold text-slate-800">${tax.toFixed(2)}</span>
        </div>
        <div className="border-t border-slate-100 pt-2 flex justify-between text-sm font-black text-slate-900">
          <span>Grand Total</span>
          <span className="text-blue-600">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <button
        onClick={() => setIsCheckingOut(true)}
        className="w-full py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition"
      >
        <span>Proceed to Checkout</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      {/* Checkout Modal / Bottom Sheet */}
      {isCheckingOut && (
        <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-t-3xl sm:rounded-3xl max-w-sm w-full p-5 text-slate-900 shadow-2xl animate-in slide-in-from-bottom-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-black text-base text-slate-900">Confirm & Pay</h3>
                <p className="text-xs text-slate-500">Order Total: <strong className="text-blue-600">${total.toFixed(2)}</strong></p>
              </div>
              <button
                onClick={() => setIsCheckingOut(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handlePlaceOrder} className="py-4 space-y-4 text-xs">
              {/* Customer info */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Customer Name</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Customer full name"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Mobile Money / Contact Phone</label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+234 803 111 2233"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                />
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1.5">Payment Method</label>
                <div className="grid grid-cols-2 gap-2">
                  {paymentOptions.map(opt => {
                    const isSelected = paymentMethod === opt.id;
                    const Icon = opt.icon;
                    return (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => setPaymentMethod(opt.id)}
                        className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/70 text-blue-900 font-bold ring-1 ring-blue-600'
                            : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                        <span className="truncate">{opt.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Cash Calculator if Cash chosen */}
              {paymentMethod === 'Cash' && (
                <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-emerald-900">Cash Received:</span>
                    <input
                      type="number"
                      value={cashTendered}
                      onChange={(e) => setCashTendered(e.target.value)}
                      placeholder={`$${Math.ceil(total)}`}
                      className="w-24 px-2 py-1 bg-white border border-emerald-300 rounded-lg text-right font-bold text-xs"
                    />
                  </div>
                  {cashTendered && (
                    <div className="flex justify-between text-emerald-950 font-bold border-t border-emerald-200 pt-1">
                      <span>Change Due:</span>
                      <span>${calculatedChange.toFixed(2)}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessingOrder}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition disabled:opacity-75"
              >
                {isProcessingOrder ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Processing Payment...</span>
                  </>
                ) : (
                  <>
                    <span>Place Order (${total.toFixed(2)})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
