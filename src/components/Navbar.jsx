'use client';
import { useState } from 'react';

export default function Navbar() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBuyOpen, setIsBuyOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Multi-select finish state (array of IDs)
  const [selectedFinishes, setSelectedFinishes] = useState(['Space Black']);

  // Finishes Data
  const finishes = [
    {
      id: 'Space Black',
      name: 'Space Black',
      img: '/black.png',
      price: 249,
      bg: 'bg-black',
    },
    {
      id: 'Silver White',
      name: 'Silver White',
      img: '/white.png',
      price: 249,
      bg: 'bg-black',
    },
  ];

  // Cart State
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'EarPods Pro Max', color: 'Space Black', price: 249, qty: 1, img: '/black.png' }
  ]);

  // Nav Links
  const navLinks = [
    { name: 'Overview', targetId: 'hero' },
    { name: 'Tech Specs', targetId: 'acoustics' },
    { name: 'Compare', targetId: 'anc' },
    { name: 'Support', targetId: 'components' },
  ];

  // Card Selection & Deselection Toggle Handler
  const handleToggleFinish = (id) => {
    if (selectedFinishes.includes(id)) {
      setSelectedFinishes(prev => prev.filter(item => item !== id));
    } else {
      setSelectedFinishes(prev => [...prev, id]);
    }
  };

  // Smooth Scroll Helper
  const handleNavClick = (name, targetId) => {
    setActiveTab(name);
    if (targetId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Cart Actions
  const updateQty = (id, delta) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newQty = item.qty + delta;
          return newQty > 0 ? { ...item, qty: newQty } : item;
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const calculatedTotalPrice = selectedFinishes.length * 249;

  return (
    <>
      {/* NAVBAR HEADER */}
      <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-auto">
        <nav className="w-full max-w-4xl backdrop-blur-xl bg-black/50 border border-white/15 rounded-full px-5 py-2.5 flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-all duration-300 hover:border-white/25">
          
          {/* Logo & Title */}
          <button 
            onClick={() => handleNavClick('Overview', 'hero')}
            className="flex items-center gap-2.5 text-left cursor-pointer group"
          >
            <svg className="w-4 h-4 fill-white opacity-90 group-hover:scale-110 transition-transform" viewBox="0 0 170 170">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.13-1.9-14.36-6.1-3.3-2.62-7.25-7.3-11.87-14.02-6.53-9.58-11.72-20.24-15.57-32-3.85-11.75-5.78-23.23-5.78-34.43 0-14.12 3.42-26.01 10.26-35.67 6.83-9.66 15.62-14.62 26.36-14.88 4.8 0 10.02 1.25 15.67 3.75 5.65 2.5 9.47 3.82 11.45 3.96 1.83 0 5.86-1.38 12.08-4.14 6.22-2.77 11.66-4.04 16.32-3.82 12.83.67 22.84 5.56 30.04 14.68-11.45 6.93-17.06 16.59-16.83 28.98.23 9.8 4.04 17.9 11.43 24.3 7.39 6.4 16.27 10.08 26.65 11.04-2.6 7.63-6.13 15.35-10.59 23.16zM119.22 31.06c0-7.38 2.65-14.38 7.96-21 5.3-6.62 12.01-10.36 20.12-11.23.23.95.35 1.83.35 2.64 0 7.37-2.72 14.4-8.15 21.09-5.43 6.69-12.21 10.42-20.35 11.19-.07-.72-.11-1.61-.11-2.69z"/>
            </svg>
            <span className="text-xs md:text-sm font-semibold tracking-wider text-white flex items-center gap-1.5">
              EARPODS PRO <span className="text-[10px] tracking-normal font-medium text-gray-400 uppercase bg-white/10 px-1.5 py-0.5 rounded-md border border-white/10">Max</span>
            </span>
          </button>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1 bg-white/[0.06] border border-white/10 rounded-full p-1 shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeTab === link.name;
              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.name, link.targetId)}
                  className={`text-xs px-4 py-1.5 rounded-full font-medium transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'text-white bg-white/20 shadow-md backdrop-blur-md'
                      : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 md:gap-3">
            <button 
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <button 
              onClick={() => setIsCartOpen(true)}
              aria-label="Cart"
              className="relative p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-blue-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-black animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            <button 
              onClick={() => setIsBuyOpen(true)}
              className="bg-white text-black text-xs font-semibold px-4 py-1.5 rounded-full hover:bg-gray-200 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg shadow-white/10"
            >
              Buy
            </button>
          </div>

        </nav>
      </header>

      {/* 1. SEARCH MODAL */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/70 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-xl bg-[#1c1c1e] border border-white/20 rounded-2xl p-4 shadow-2xl relative">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search EarPods Pro Max, ANC, Spatial Audio..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full bg-transparent text-white placeholder-gray-500 text-sm focus:outline-none"
              />
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="text-xs bg-white/10 hover:bg-white/20 text-gray-300 px-2.5 py-1 rounded-md cursor-pointer"
              >
                ESC
              </button>
            </div>

            <div className="mt-4 space-y-2">
              <p className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Quick Suggestions</p>
              <div className="flex flex-wrap gap-2">
                {['Active Noise Cancellation', 'Spatial Audio', 'Battery Life', 'Tech Specs', 'Compare Models'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="text-xs bg-white/5 hover:bg-white/15 text-gray-300 px-3 py-1.5 rounded-full border border-white/10 cursor-pointer transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-[#161617] border-l border-white/10 h-full p-6 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  Your Bag <span className="text-xs font-normal text-gray-400">({cartCount} items)</span>
                </h3>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 text-gray-400 hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-16 text-gray-500">
                  Your bag is empty.
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between bg-white/5 p-3.5 rounded-xl border border-white/10">
                      <div>
                        <h4 className="text-sm font-semibold text-white">{item.name}</h4>
                        <p className="text-xs text-gray-400">{item.color}</p>
                        <p className="text-sm font-medium text-white mt-1">${item.price}</p>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-black/40 rounded-lg px-2 py-1 border border-white/10 text-xs">
                          <button onClick={() => updateQty(item.id, -1)} className="text-gray-400 hover:text-white cursor-pointer">-</button>
                          <span className="text-white font-bold">{item.qty}</span>
                          <button onClick={() => updateQty(item.id, 1)} className="text-gray-400 hover:text-white cursor-pointer">+</button>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-xs text-red-400 hover:text-red-300 cursor-pointer">
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="border-t border-white/10 pt-4 space-y-3">
                <div className="flex justify-between text-sm text-gray-300">
                  <span>Subtotal</span>
                  <span className="font-bold text-white">${cartSubtotal}</span>
                </div>
                <button 
                  onClick={() => alert('Proceeding to Checkout...')}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold py-3 rounded-full transition-all cursor-pointer shadow-lg shadow-blue-600/30"
                >
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. BUY MODAL - CLEAN CARD TYPE WITH BALANCED IMAGE SIZES */}
      {isBuyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#1c1c1e] border border-white/20 rounded-3xl p-6 shadow-2xl relative space-y-6">
            <button 
              onClick={() => setIsBuyOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer text-lg p-1 transition-colors"
            >
              ✕
            </button>

            <div>
              <span className="text-xs font-bold text-blue-400 tracking-wider uppercase">Order Now</span>
              <h2 className="text-2xl font-bold text-white mt-1">EarPods Pro Max</h2>
              <p className="text-sm text-gray-400">Tap card to select or deselect finish options.</p>
            </div>

            {/* Cards Grid */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-gray-300 block">Finish Options</label>
              <div className="grid grid-cols-2 gap-5">
                {finishes.map((finish) => {
                  const isSelected = selectedFinishes.includes(finish.id);
                  return (
                    <button
                      key={finish.id}
                      onClick={() => handleToggleFinish(finish.id)}
                      className={`relative w-full aspect-[6/7] rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer group border-2 ${finish.bg} ${
                        isSelected
                          ? 'border-blue-500 ring-4 ring-blue-500/30 scale-[1.02] shadow-2xl shadow-blue-500/25'
                          : 'border-white/10 hover:border-white/40 hover:scale-[1.03] opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={finish.img}
                        alt={finish.name}
                        className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                      <div 
                        className={`absolute inset-0 transition-opacity duration-300 ${
                          isSelected 
                            ? 'bg-blue-500/10' 
                            : 'bg-black/10 group-hover:bg-transparent'
                        }`} 
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Total & Action Button */}
            <div className="flex items-center justify-between border-t border-white/10 pt-4">
              <div>
                <p className="text-xs text-gray-400">Total Price</p>
                <p className="text-2xl font-extrabold text-white">${calculatedTotalPrice}.00</p>
              </div>
              <button 
                disabled={selectedFinishes.length === 0}
                onClick={() => {
                  const newItems = selectedFinishes.map(id => {
                    const finishObj = finishes.find(f => f.id === id);
                    return {
                      id: Date.now() + Math.random(),
                      name: 'EarPods Pro Max',
                      color: finishObj.name,
                      price: finishObj.price,
                      qty: 1,
                      img: finishObj.img
                    };
                  });

                  setCartItems(prev => [...prev, ...newItems]);
                  setIsBuyOpen(false);
                  setIsCartOpen(true);
                }}
                className={`font-semibold text-sm px-6 py-3 rounded-full transition-all shadow-xl ${
                  selectedFinishes.length > 0 
                    ? 'bg-white text-black hover:bg-gray-200 cursor-pointer active:scale-95' 
                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}
              >
                Add ({selectedFinishes.length}) to Bag
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
