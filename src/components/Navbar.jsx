'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Overview');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBuyOpen, setIsBuyOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [supportIssue, setSupportIssue] = useState('');
  const [supportSubmitted, setSupportSubmitted] = useState(false);

  const [hasTradeIn, setHasTradeIn] = useState(false);
  const [tradeInBrand, setTradeInBrand] = useState('Apple');
  const [tradeInModel, setTradeInModel] = useState('AirPods Pro (2nd gen)');
  const [tradeInCondition, setTradeInCondition] = useState('Good');

  const [selectedFinish, setSelectedFinish] = useState('Space Black');
  const [quantity, setQuantity] = useState(1);

  const finishes = [
    { id: 'Space Black', name: 'Space Black', img: '/black.png', price: 249, bg: 'bg-black' },
    { id: 'Silver White', name: 'Silver White', img: '/white.png', price: 249, bg: 'bg-black' },
  ];

  const [cartItems, setCartItems] = useState([]);

  const navLinks = [
    { name: 'Overview', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Support', targetId: 'support-modal' },
  ];

  const handleNavClick = (name, path, targetId) => {
    setActiveTab(name);
    if (path) {
      router.push(path);
    } else if (targetId === 'support-modal') {
      setIsSupportOpen(true);
    }
  };

  const updateCartQty = (id, delta) => {
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

  const getTradeInValue = () => {
    if (!hasTradeIn) return 0;
    if (tradeInCondition === 'Flawless') return 60;
    if (tradeInCondition === 'Good') return 45;
    if (tradeInCondition === 'Fair') return 25;
    return 45;
  };

  const tradeInDiscountPerUnit = getTradeInValue();
  const selectedFinishObj = finishes.find(f => f.id === selectedFinish) || finishes[0];
  const baseSubtotal = selectedFinishObj.price * quantity;
  const totalTradeInDiscount = hasTradeIn ? tradeInDiscountPerUnit : 0;
  const calculatedTotalPrice = Math.max(0, baseSubtotal - totalTradeInDiscount);

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const cartSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && searchQuery.trim() !== '') {
      setIsSearchOpen(false);
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <>
      <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-auto">
        <nav className="w-full max-w-4xl backdrop-blur-xl bg-black/50 border border-white/15 rounded-full px-5 py-2.5 flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-all duration-300 hover:border-white/25">
          
          <button 
            onClick={() => router.push('/')}
            className="flex items-center gap-2.5 text-left cursor-pointer group"
          >
            <svg className="w-4 h-4 fill-white opacity-90 group-hover:scale-110 transition-transform" viewBox="0 0 170 170">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.13-1.9-14.36-6.1-3.3-2.62-7.25-7.3-11.87-14.02-6.53-9.58-11.72-20.24-15.57-32-3.85-11.75-5.78-23.23-5.78-34.43 0-14.12 3.42-26.01 10.26-35.67 6.83-9.66 15.62-14.62 26.36-14.88 4.8 0 10.02 1.25 15.67 3.75 5.65 2.5 9.47 3.82 11.45 3.96 1.83 0 5.86-1.38 12.08-4.14 6.22-2.77 11.66-4.04 16.32-3.82 12.83.67 22.84 5.56 30.04 14.68-11.45 6.93-17.06 16.59-16.83 28.98.23 9.8 4.04 17.9 11.43 24.3 7.39 6.4 16.27 10.08 26.65 11.04-2.6 7.63-6.13 15.35-10.59 23.16z"/>
            </svg>
            <span className="text-xs md:text-sm font-semibold tracking-wider text-white flex items-center gap-1.5">
              EARPODS PRO <span className="text-[10px] tracking-normal font-medium text-gray-400 uppercase bg-white/10 px-1.5 py-0.5 rounded-md border border-white/10">Max</span>
            </span>
          </button>

          <div className="hidden md:flex items-center gap-1 bg-white/[0.06] border border-white/10 rounded-full p-1 shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeTab === link.name;
              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.name, link.path, link.targetId)}
                  className={`text-xs px-4 py-1.5 rounded-full font-medium transition-all duration-300 cursor-pointer ${
                    isActive ? 'text-white bg-white/20 shadow-md backdrop-blur-md' : 'text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <button onClick={() => setIsSearchOpen(true)} aria-label="Search" className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all cursor-pointer">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <button onClick={() => setIsCartOpen(true)} aria-label="Cart" className="relative p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all cursor-pointer">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-blue-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center ring-2 ring-black animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            <button onClick={() => setIsBuyOpen(true)} className="bg-white text-black text-xs font-semibold px-4 py-1.5 rounded-full hover:bg-gray-200 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-lg shadow-white/10">
              Buy
            </button>
          </div>

        </nav>
      </header>

      {/* SEARCH MODAL */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/70 backdrop-blur-md">
          <div className="w-full max-w-xl bg-[#1c1c1e] border border-white/20 rounded-2xl p-4 shadow-2xl relative">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search Vision Pro, EarPods, Case and press Enter..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchSubmit}
                autoFocus
                className="w-full bg-transparent text-white placeholder-gray-500 text-sm focus:outline-none"
              />
              <button onClick={() => setIsSearchOpen(false)} className="text-xs bg-white/10 text-gray-300 px-2.5 py-1 rounded-md cursor-pointer">ESC</button>
            </div>
            <p className="text-[11px] text-gray-500 mt-2 text-center">Type item name (e.g. Vision Pro) and hit Enter to search</p>
          </div>
        </div>
      )}
    </>
  );
}