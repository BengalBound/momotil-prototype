import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Package, Plus, Search, AlertTriangle, RefreshCw, X, Camera, Sparkles
} from 'lucide-react';

export const CeoInventory = () => {
  const { products, addProduct, restockProduct, addToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [addMode, setAddMode] = useState('manual'); // 'manual' | 'ai'
  const [aiProcessing, setAiProcessing] = useState(false);
  const [aiResult, setAiResult] = useState(null);

  // New Product Form
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Electronics');
  const [price, setPrice] = useState('');
  const [costPrice, setCostPrice] = useState('');
  const [stock, setStock] = useState('20');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80');

  const categories = ['All', 'Electronics', 'Clothing', 'Food', 'Beverages', 'Auto Parts'];

  const filteredProducts = products.filter(p => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.barcode?.includes(searchQuery);
    return matchesCat && matchesSearch;
  });

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!name || !price) return;
    addProduct({
      name, category, price: Number(price),
      costPrice: costPrice ? Number(costPrice) : Number(price) * 0.7,
      stock: Number(stock) || 10, minStock: 5, image,
      description: 'Added via CEO inventory console.'
    });
    setName(''); setPrice(''); setCostPrice(''); setStock('20');
    setShowAddModal(false);
  };

  const handleAiScan = (mode) => {
    setAiProcessing(true);
    setAiResult(null);
    setTimeout(() => {
      setAiProcessing(false);
      setAiResult({
        name: mode === 'invoice' ? 'Synthetic Engine Oil 5L (Mobil 1)' : 'Premium Brake Disc Set',
        sku: 'SKU-AI-' + Math.floor(Math.random() * 9000 + 1000),
        stock: mode === 'invoice' ? 24 : 8,
        price: mode === 'invoice' ? 4200 : 12500,
        description: 'AI-matched from product database. Verified against distributor catalog.',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&auto=format&fit=crop'
      });
    }, 2000);
  };

  const confirmAiProduct = () => {
    if (!aiResult) return;
    addProduct({ name: aiResult.name, price: aiResult.price, stock: aiResult.stock, category: 'Auto Parts', sku: aiResult.sku });
    setAiResult(null);
    setShowAddModal(false);
    addToast('SKU Added', `${aiResult.name} added to inventory.`, 'success');
  };

  const inputStyle = {
    background: 'var(--sunken)', border: '1px solid rgba(var(--lineRGB),0.12)',
    color: 'var(--fg)', borderRadius: '10px', padding: '8px 12px', fontSize: '12px', width: '100%', outline: 'none'
  };

  const lowStockCount = products.filter(p => p.stock <= 5).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl border p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.08)' }}>
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: 'var(--fg)' }}>
            <Package className="w-5 h-5" style={{ color: 'var(--acc)' }} />
            Stock & Inventory Control
          </h2>
          <p className="text-xs mt-0.5" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>
            Real-time stock levels, AI-assisted inventory & profit margins
          </p>
        </div>

        <div className="flex items-center gap-2">
          {lowStockCount > 0 && (
            <span className="px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1"
              style={{ background: 'rgba(255,138,138,0.15)', color: 'var(--bad)', border: '1px solid rgba(255,138,138,0.25)' }}>
              <AlertTriangle className="w-3 h-3" />
              {lowStockCount} Low Stock
            </span>
          )}
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition hover:opacity-90"
            style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}
          >
            <Plus className="w-4 h-4" />
            Add Product SKU
          </button>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="rounded-2xl border p-4 flex flex-col sm:flex-row items-center gap-3"
        style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.08)' }}>
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(var(--fgRGB),0.4)' }} />
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by SKU name, barcode..."
            style={{ ...inputStyle, paddingLeft: '36px' }} />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {categories.map(cat => (
            <button key={cat} onClick={() => setSelectedCategory(cat)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition"
              style={{
                background: selectedCategory === cat ? 'var(--acc)' : 'var(--raise)',
                color: selectedCategory === cat ? 'var(--onAcc)' : 'rgba(var(--fgRGB),0.6)',
                border: '1px solid rgba(var(--lineRGB),0.08)'
              }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory Table */}
      <div className="rounded-2xl border overflow-hidden" style={{ background: 'var(--card)', borderColor: 'rgba(var(--lineRGB),0.08)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b text-[10px] font-bold uppercase tracking-wider"
                style={{ background: 'var(--raise)', borderColor: 'rgba(var(--lineRGB),0.08)', color: 'rgba(var(--fgRGB),0.4)' }}>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4 hidden sm:table-cell">Category</th>
                <th className="py-3 px-4">Selling Price</th>
                <th className="py-3 px-4 hidden md:table-cell">Cost / Margin</th>
                <th className="py-3 px-4">Stock Level</th>
                <th className="py-3 px-4 text-right">Restock</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(prod => {
                const isLowStock = prod.stock <= 5;
                const margin = prod.price > 0
                  ? (((prod.price - (prod.costPrice || prod.price * 0.7)) / prod.price) * 100).toFixed(0)
                  : 0;
                return (
                  <tr key={prod.id} className="border-b transition" style={{ borderColor: 'rgba(var(--lineRGB),0.05)' }}>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img src={prod.image} alt={prod.name} className="w-10 h-10 rounded-xl object-cover shrink-0"
                          style={{ border: '1px solid rgba(var(--lineRGB),0.1)' }} />
                        <div>
                          <div className="font-bold" style={{ color: 'var(--fg)' }}>{prod.name}</div>
                          <div className="text-[10px] font-mono" style={{ color: 'rgba(var(--fgRGB),0.4)' }}>
                            {prod.barcode || prod.sku || 'SKU-XXXXX'}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 hidden sm:table-cell">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold"
                        style={{ background: 'rgba(var(--lineRGB),0.08)', color: 'rgba(var(--fgRGB),0.7)' }}>
                        {prod.category}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 font-black font-mono" style={{ color: 'var(--fg)' }}>
                      ${prod.price.toFixed(2)}
                    </td>

                    <td className="py-3.5 px-4 hidden md:table-cell">
                      <div className="font-mono" style={{ color: 'rgba(var(--fgRGB),0.6)' }}>
                        ${(prod.costPrice || prod.price * 0.7).toFixed(2)}
                      </div>
                      <div className="text-[10px] font-bold" style={{ color: 'var(--ok)' }}>{margin}% margin</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-black font-mono text-sm" style={{ color: isLowStock ? 'var(--bad)' : 'var(--fg)' }}>
                          {prod.stock}
                        </span>
                        {isLowStock && (
                          <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[9px] font-bold"
                            style={{ background: 'rgba(255,138,138,0.15)', color: 'var(--bad)' }}>
                            <AlertTriangle className="w-2.5 h-2.5" />
                            Low
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button onClick={() => restockProduct(prod.id, 10)}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold transition hover:opacity-80 flex items-center gap-1 ml-auto"
                        style={{ background: 'var(--accSoft)', color: 'var(--acc)', border: '1px solid rgba(255,106,19,0.2)' }}>
                        <RefreshCw className="w-3 h-3" />
                        +10
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(var(--bgRGB),0.85)', backdropFilter: 'blur(8px)' }}>
          <div className="rounded-3xl max-w-md w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
            style={{ background: 'var(--card)', border: '1px solid rgba(var(--lineRGB),0.12)' }}>
            <div className="flex items-center justify-between pb-4 mb-4 border-b" style={{ borderColor: 'rgba(var(--lineRGB),0.08)' }}>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl" style={{ background: 'var(--accSoft)', color: 'var(--acc)' }}>
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base" style={{ color: 'var(--fg)' }}>Add New SKU</h3>
                  <p className="text-xs" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>Syncs across all clerk POS terminals</p>
                </div>
              </div>
              <button onClick={() => { setShowAddModal(false); setAiResult(null); setAiProcessing(false); }}
                style={{ color: 'rgba(var(--fgRGB),0.5)' }}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mode Switcher */}
            <div className="flex gap-2 mb-4 p-1 rounded-xl" style={{ background: 'var(--raise)' }}>
              {['manual', 'ai'].map(m => (
                <button key={m} onClick={() => { setAddMode(m); setAiResult(null); setAiProcessing(false); }}
                  className="flex-1 py-1.5 rounded-lg text-xs font-semibold transition"
                  style={{ background: addMode === m ? 'var(--acc)' : 'transparent', color: addMode === m ? 'var(--onAcc)' : 'rgba(var(--fgRGB),0.6)' }}>
                  {m === 'manual' ? '✏️ Manual Entry' : '✨ AI Photo / Invoice'}
                </button>
              ))}
            </div>

            {addMode === 'ai' ? (
              <div className="space-y-3">
                <p className="text-xs" style={{ color: 'rgba(var(--fgRGB),0.6)' }}>
                  AI will auto-fill product name, description & image from the internet.
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { label: 'Photo (1 item)', icon: Camera, mode: 'photo' },
                    { label: 'Photo Shelf (5-10)', icon: Camera, mode: 'shelf' },
                    { label: 'Invoice OCR', icon: Sparkles, mode: 'invoice' },
                    { label: 'Manual Entry', icon: Package, mode: 'switch_manual' }
                  ].map(opt => {
                    const Icon = opt.icon;
                    return (
                      <button key={opt.mode}
                        onClick={() => opt.mode === 'switch_manual' ? setAddMode('manual') : handleAiScan(opt.mode)}
                        className="p-3 rounded-xl text-xs font-semibold text-center transition hover:opacity-80"
                        style={{ background: 'var(--raise)', border: '1px solid rgba(var(--lineRGB),0.1)', color: 'rgba(var(--fgRGB),0.7)' }}>
                        <Icon className="w-5 h-5 mx-auto mb-1" style={{ color: 'var(--acc)' }} />
                        {opt.label}
                      </button>
                    );
                  })}
                </div>

                {aiProcessing && (
                  <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background: 'var(--accSoft)' }}>
                    <div className="w-4 h-4 border-2 rounded-full animate-spin" style={{ borderColor: 'var(--acc)', borderTopColor: 'transparent' }} />
                    <span className="text-xs font-semibold" style={{ color: 'var(--acc)' }}>AI analyzing image & fetching product data...</span>
                  </div>
                )}

                {aiResult && (
                  <div className="rounded-xl p-3 space-y-2" style={{ background: 'var(--raise)', border: '1px solid rgba(var(--lineRGB),0.1)' }}>
                    <div className="flex items-center gap-3">
                      <img src={aiResult.image} alt={aiResult.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <div className="font-bold text-xs" style={{ color: 'var(--fg)' }}>{aiResult.name}</div>
                        <div className="text-[10px]" style={{ color: 'rgba(var(--fgRGB),0.5)' }}>{aiResult.sku}</div>
                        <div className="text-[10px]" style={{ color: 'var(--ok)' }}>
                          ${aiResult.price} · Stock: {aiResult.stock}
                        </div>
                      </div>
                    </div>
                    <p className="text-[10px]" style={{ color: 'rgba(var(--fgRGB),0.55)' }}>{aiResult.description}</p>
                    <div className="flex gap-2 pt-1">
                      <button onClick={confirmAiProduct}
                        className="flex-1 py-2 rounded-xl text-xs font-bold transition hover:opacity-90"
                        style={{ background: 'var(--ok)', color: 'var(--bg)' }}>
                        ✓ Confirm & Add SKU
                      </button>
                      <button onClick={() => setAiResult(null)}
                        className="py-2 px-3 rounded-xl text-xs font-bold"
                        style={{ color: 'rgba(var(--fgRGB),0.5)' }}>
                        Rescan
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold mb-1" style={{ color: 'rgba(var(--fgRGB),0.7)' }}>Product Title</label>
                  <input type="text" required value={name} onChange={e => setName(e.target.value)}
                    placeholder="e.g. Premium Brake Disc Set" style={inputStyle} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold mb-1" style={{ color: 'rgba(var(--fgRGB),0.7)' }}>Category</label>
                    <select value={category} onChange={e => setCategory(e.target.value)} style={inputStyle}>
                      <option>Electronics</option>
                      <option>Clothing</option>
                      <option>Food</option>
                      <option>Beverages</option>
                      <option>Auto Parts</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold mb-1" style={{ color: 'rgba(var(--fgRGB),0.7)' }}>Initial Stock</label>
                    <input type="number" value={stock} onChange={e => setStock(e.target.value)} placeholder="25" style={inputStyle} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold mb-1" style={{ color: 'rgba(var(--fgRGB),0.7)' }}>Retail Price ($)</label>
                    <input type="number" step="0.01" required value={price} onChange={e => setPrice(e.target.value)}
                      placeholder="49.99" style={inputStyle} />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1" style={{ color: 'rgba(var(--fgRGB),0.7)' }}>Cost Price ($)</label>
                    <input type="number" step="0.01" value={costPrice} onChange={e => setCostPrice(e.target.value)}
                      placeholder="30.00" style={inputStyle} />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button type="button" onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 rounded-xl font-semibold transition hover:opacity-80"
                    style={{ border: '1px solid rgba(var(--lineRGB),0.15)', color: 'rgba(var(--fgRGB),0.7)' }}>
                    Cancel
                  </button>
                  <button type="submit"
                    className="px-4 py-2 rounded-xl font-semibold transition hover:opacity-90"
                    style={{ background: 'var(--acc)', color: 'var(--onAcc)' }}>
                    Save & Publish SKU
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
