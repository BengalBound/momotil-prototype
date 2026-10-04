import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Search, Plus, ShoppingCart, Check, Tag, Sparkles, AlertCircle } from 'lucide-react';

export const ClerkCatalog = () => {
  const navigate = useNavigate();
  const { products, addToCart, cart } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Electronics', 'Clothing', 'Food', 'Beverages'];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.barcode.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const cartTotalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotalPrice = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  const getProductCartQty = (productId) => {
    const item = cart.find(i => i.product.id === productId);
    return item ? item.qty : 0;
  };

  return (
    <div className="p-4 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products, brands, or barcode..."
          className="w-full pl-9 pr-4 py-2 bg-white rounded-2xl border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition shadow-xs"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
          >
            Clear
          </button>
        )}
      </div>

      {/* Categories Horizontal Scroll */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none select-none">
        {categories.map(cat => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-3 pb-8">
        {filteredProducts.map(product => {
          const inCartQty = getProductCartQty(product.id);
          const isLowStock = product.stock <= 5 && product.stock > 0;
          const isOutOfStock = product.stock <= 0;

          return (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between group"
            >
              <div className="relative aspect-square overflow-hidden bg-slate-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  loading="lazy"
                />

                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  <span className="bg-slate-900/75 backdrop-blur-xs text-white text-[9px] font-semibold px-1.5 py-0.5 rounded-md">
                    {product.category}
                  </span>
                  {isLowStock && (
                    <span className="bg-amber-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow-xs">
                      Only {product.stock} left
                    </span>
                  )}
                  {isOutOfStock && (
                    <span className="bg-rose-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow-xs">
                      Out of stock
                    </span>
                  )}
                </div>

                {inCartQty > 0 && (
                  <div className="absolute top-2 right-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                    {inCartQty} in cart
                  </div>
                )}
              </div>

              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-xs text-slate-900 line-clamp-2 leading-tight">
                    {product.name}
                  </h3>
                  <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                    Stock: {product.stock}
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="font-bold text-sm text-blue-600">
                    ${product.price.toFixed(2)}
                  </div>
                  <button
                    onClick={() => addToCart(product, 1)}
                    disabled={isOutOfStock}
                    className={`p-2 rounded-xl flex items-center justify-center transition ${
                      isOutOfStock
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : inCartQty > 0
                        ? 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                    }`}
                    title="Add to Cart"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xs text-slate-500">No products matched "{searchQuery}"</p>
        </div>
      )}

      {/* Floating Bottom Cart Bar */}
      {cartTotalCount > 0 && (
        <div className="fixed bottom-14 left-4 right-4 z-30">
          <button
            onClick={() => navigate('/clerk/cart')}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center justify-between animate-in slide-in-from-bottom-2 hover:brightness-105 transition"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center">
                <ShoppingCart className="w-4 h-4 text-white" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold">{cartTotalCount} items in cart</div>
                <div className="text-[10px] text-blue-100">Ready to checkout</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-extrabold">${cartTotalPrice.toFixed(2)}</div>
              <div className="text-[10px] font-medium text-blue-100">Review &gt;</div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
};
