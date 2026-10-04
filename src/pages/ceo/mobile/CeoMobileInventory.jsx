import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Package, AlertTriangle, Search, Plus } from 'lucide-react';

export const CeoMobileInventory = () => {
  const { products, restockProduct } = useApp();
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('All');

  const categories = ['All', 'Electronics', 'Clothing', 'Food', 'Beverages'];

  const filtered = products.filter(p => {
    const matchCat = cat === 'All' || p.category === cat;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.barcode.includes(search);
    return matchCat && matchSearch;
  });

  const lowCount = filtered.filter(p => p.stock <= 5).length;

  return (
    <div className="p-4 space-y-4 pb-8">
      <div>
        <h2 className="text-sm font-black text-slate-900">Inventory Control</h2>
        <p className="text-[11px] text-slate-500">{lowCount > 0 ? `⚠️ ${lowCount} SKUs at low stock` : 'All stock levels healthy'}</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search SKU or barcode..."
          className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500/20"
        />
      </div>

      {/* Category pills */}
      <div className="flex gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold whitespace-nowrap transition ${
              cat === c ? 'bg-purple-600 text-white' : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Products list */}
      <div className="space-y-2.5">
        {filtered.map(prod => {
          const isLow = prod.stock > 0 && prod.stock <= 5;
          const isOut = prod.stock <= 0;
          const margin = prod.costPrice ? (((prod.price - prod.costPrice) / prod.price) * 100).toFixed(0) : null;

          return (
            <div key={prod.id} className={`bg-white rounded-2xl border shadow-xs p-3.5 flex items-center gap-3 ${isLow || isOut ? 'border-rose-200' : 'border-slate-200'}`}>
              <img src={prod.image} alt={prod.name} className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-100" />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-xs text-slate-900 line-clamp-1">{prod.name}</div>
                <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                  ${prod.price.toFixed(2)} {margin && <span className="text-emerald-500 font-bold">• {margin}% margin</span>}
                </div>
                {/* Stock bar */}
                <div className="flex items-center gap-1.5 mt-1.5">
                  <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${isOut ? 'bg-rose-500' : isLow ? 'bg-amber-500' : 'bg-emerald-500'}`}
                      style={{ width: `${Math.min(100, (prod.stock / 30) * 100)}%` }}
                    />
                  </div>
                  <span className={`text-[10px] font-bold font-mono ${isOut ? 'text-rose-600' : isLow ? 'text-amber-600' : 'text-slate-700'}`}>
                    {prod.stock} left
                  </span>
                </div>
              </div>
              <button
                onClick={() => restockProduct(prod.id, 10)}
                className={`shrink-0 flex flex-col items-center gap-0.5 px-2.5 py-2 rounded-xl text-[10px] font-bold border transition ${
                  isLow || isOut
                    ? 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                +10
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
