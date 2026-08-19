'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';

  const [cartItems, setCartItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  const productOptions = {
    1: ['Space Gray', 'Silver', 'Custom Light Seal'],
    2: ['Space Black', 'Silver White'],
    3: ['Standard White', 'Midnight Dark']
  };

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const products = [
    { id: 1, name: 'Vision Pro', price: 3499, img: '/vision-pro2.jpg', displayPrice: '$3,499' },
    { id: 2, name: 'EarPods Pro Max', price: 249, img: '/black.png', displayPrice: '$249' },
    { id: 3, name: 'Smart Charging Case', price: 59, img: '/white.png', displayPrice: '$59' },
  ];

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery)
  );

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setSelectedColor(productOptions[product.id][0]);
    setQuantity(1);
    setIsModalOpen(true);
  };

  const handleAddToCartConfirm = () => {
    if (!selectedProduct) return;

    const cartItemId = `${selectedProduct.id}-${selectedColor}`;
    const existingIndex = cartItems.findIndex(item => item.cartItemId === cartItemId);

    let updatedCart;
    if (existingIndex > -1) {
      updatedCart = cartItems.map((item, index) => 
        index === existingIndex ? { ...item, qty: item.qty + quantity } : item
      );
    } else {
      const newItem = {
        cartItemId: cartItemId,
        id: selectedProduct.id,
        name: selectedProduct.name,
        price: selectedProduct.price,
        img: selectedProduct.img,
        color: selectedColor,
        qty: quantity
      };
      updatedCart = [...cartItems, newItem];
    }

    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('storage'));

    setIsModalOpen(false);
    alert(`${selectedProduct.name} (${selectedColor}) added to your bag!`);
  };

  return (
    <main className="bg-black min-h-screen text-white pt-32 px-10 md:px-24 relative">
      <Navbar />
      
      <div className="max-w-6xl mx-auto pb-20">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-[0.2em] text-[#86868b] uppercase block mb-2">
            E-Commerce Store
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Explore Our Products'}
          </h1>
        </div>
        
        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-xl">No products found matching "{searchQuery}"</p>
            <a href="/products" className="inline-block mt-4 text-xs bg-white text-black px-4 py-2 rounded-full font-semibold">Clear Search</a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-[#111] p-6 rounded-3xl border border-white/10 hover:border-white/30 transition-all group flex flex-col justify-between">
                <div>
                  <div className={`bg-black/40 rounded-2xl mb-6 flex items-center justify-center border border-white/5 overflow-hidden ${
                    product.id === 1 ? 'h-48 p-0' : 'h-48 p-4'
                  }`}>
                    <img 
                      src={product.img} 
                      alt={product.name} 
                      className={`transition-transform duration-500 group-hover:scale-105 ${
                        product.id === 1 ? 'w-full h-full object-cover' : 'w-full h-full object-contain'
                      }`} 
                      onError={(e) => { e.target.src = 'https://placehold.co/400x400/111/fff?text=Image+Not+Found'; }}
                    />
                  </div>
                  <h2 className="text-xl font-semibold text-white">{product.name}</h2>
                  <p className="text-gray-400 text-sm mt-1">{product.displayPrice}</p>
                </div>
                <button 
                  onClick={() => handleOpenModal(product)}
                  className="w-full mt-6 bg-white text-black py-2.5 rounded-full font-medium text-sm hover:bg-gray-200 transition-all cursor-pointer shadow-lg active:scale-95"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CUSTOMIZATION MODAL */}
      {isModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#1c1c1e] border border-white/20 rounded-3xl p-6 shadow-2xl relative space-y-6">
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer text-lg p-1"
            >
              ✕
            </button>

            <div>
              <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">Customize Your Item</span>
              <h2 className="text-2xl font-bold text-white mt-1">{selectedProduct.name}</h2>
              <p className="text-sm text-gray-400">{selectedProduct.displayPrice}</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-300 block uppercase tracking-wide">Select Finish / Color</label>
              <div className="grid grid-cols-2 gap-2">
                {productOptions[selectedProduct.id].map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`text-xs py-2.5 px-3 rounded-xl border transition-all cursor-pointer font-medium ${
                      selectedColor === color 
                        ? 'bg-blue-600 border-blue-500 text-white shadow-md' 
                        : 'bg-black/40 border-white/10 text-gray-400 hover:border-white/30'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-300 block uppercase tracking-wide">Quantity</label>
              <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-xl p-2 w-max">
                <button 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))} 
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-white font-bold text-xs cursor-pointer"
                >
                  -
                </button>
                <span className="text-white font-bold px-4 text-sm">{quantity}</span>
                <button 
                  onClick={() => setQuantity(prev => prev + 1)} 
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-white font-bold text-xs cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">Total Amount</p>
                <p className="text-xl font-extrabold text-white">${selectedProduct.price * quantity}</p>
              </div>
              <button 
                onClick={handleAddToCartConfirm}
                className="bg-white text-black font-semibold text-sm px-6 py-3 rounded-full transition-all hover:bg-gray-200 cursor-pointer active:scale-95 shadow-xl"
              >
                Add to Bag
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}