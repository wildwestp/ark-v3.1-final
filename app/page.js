'use client';

import { useState, useEffect } from 'react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Home() {
  // ============================================================================
  // CORE STATE
  // ============================================================================
  const [mounted, setMounted] = useState(false);
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useState(false);
  const [tab, setTab] = useState('search');
  const [toast, setToast] = useState(null);
  
  // Search state
  const [category, setCategory] = useState('');
  const [keyword, setKeyword] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Collection state
  const [savedProducts, setSavedProducts] = useState([]);
  const [bundles, setBundles] = useState([]);
  const [competitors, setCompetitors] = useState([]);
  const [priceHistory, setPriceHistory] = useState({});
  const [bsrHistory, setBsrHistory] = useState({});
  
  // UI state
  const [showDebug, setShowDebug] = useState(false);
  const [debugLogs, setDebugLogs] = useState([]);
  const [showBundleAI, setShowBundleAI] = useState(false);
  const [bundleSuggestion, setBundleSuggestion] = useState('');
  const [showFilters, setShowFilters] = useState(true);
  const [showCharts, setShowCharts] = useState(false);
  const [selectedChart, setSelectedChart] = useState(null);
  
  // Filters
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    minMargin: '',
    maxBSR: '',
    minReviews: '',
    minRating: '',
    sortBy: 'profit'
  });

  // ============================================================================
  // MASSIVE CATEGORY EXPANSION - 50+ CATEGORIES
  // ============================================================================
  const categories = [
    // YOUR SHOP BUNDLES
    {
      id: 'alpha-performance',
      name: '💪 Alpha Performance',
      icon: '🏋️',
      description: 'Fitness & Gym Equipment',
      searches: [
        'gym equipment bundle',
        'resistance bands set',
        'fitness gear pack',
        'workout accessories',
        'exercise equipment kit',
        'home gym essentials',
        'strength training gear',
        'fitness starter pack'
      ]
    },
    {
      id: 'executive-grooming',
      name: '✂️ Executive Grooming',
      icon: '💼',
      description: "Men's Grooming & Care",
      searches: [
        'mens grooming kit',
        'beard care set',
        'shaving kit premium',
        'cologne gift set',
        'skincare men bundle',
        'grooming essentials',
        'barber tools kit',
        'mens personal care'
      ]
    },
    {
      id: 'tactical-edc',
      name: '🔦 Tactical EDC',
      icon: '⚔️',
      description: 'Everyday Carry & Survival',
      searches: [
        'edc gear bundle',
        'tactical flashlight',
        'survival kit',
        'multi tool set',
        'pocket knife combo',
        'everyday carry essentials',
        'tactical accessories',
        'emergency preparedness'
      ]
    },
    {
      id: 'home-gym',
      name: '🏠 Home Gym Starter',
      icon: '🎯',
      description: 'Home Fitness Equipment',
      searches: [
        'home gym equipment',
        'adjustable dumbbells',
        'yoga mat set',
        'jump rope fitness',
        'foam roller',
        'workout bench',
        'kettlebell set',
        'exercise ball'
      ]
    },
    {
      id: 'desk-commander',
      name: '🖥️ Desk Commander',
      icon: '💻',
      description: 'Office & Productivity',
      searches: [
        'desk organizer set',
        'cable management',
        'monitor stand',
        'keyboard accessories',
        'desk accessories bundle',
        'office organization',
        'productivity tools',
        'workspace essentials'
      ]
    },
    {
      id: 'weekend-warrior',
      name: '⛺ Weekend Warrior',
      icon: '🏕️',
      description: 'Outdoor & Adventure',
      searches: [
        'camping gear bundle',
        'hiking essentials',
        'outdoor adventure kit',
        'camping accessories',
        'survival gear pack',
        'backpacking equipment',
        'outdoor tools',
        'adventure gear set'
      ]
    },
    {
      id: 'gentleman-whiskey',
      name: '🥃 Gentleman\'s Whiskey',
      icon: '🎩',
      description: 'Bar & Spirits',
      searches: [
        'whiskey stones set',
        'bar accessories',
        'cocktail kit',
        'whiskey glass set',
        'bar tools bundle',
        'decanter set',
        'mixology kit',
        'bourbon accessories'
      ]
    },
    {
      id: 'tech-essentials',
      name: '📱 Tech Essentials',
      icon: '⚡',
      description: 'Electronics & Gadgets',
      searches: [
        'tech accessories bundle',
        'phone accessories',
        'charging station',
        'cable organizer set',
        'tech gifts',
        'gadget bundle',
        'electronics accessories',
        'mobile accessories kit'
      ]
    },

    // AMAZON FBA CATEGORIES - 42 MORE!
    {
      id: 'kitchen-dining',
      name: '🍽️ Kitchen & Dining',
      icon: '👨‍🍳',
      description: 'Cookware & Kitchen Tools',
      searches: [
        'kitchen gadgets',
        'cookware set',
        'bakeware bundle',
        'kitchen utensils',
        'cooking tools',
        'kitchen accessories'
      ]
    },
    {
      id: 'home-garden',
      name: '🏡 Home & Garden',
      icon: '🌱',
      description: 'Home Decor & Gardening',
      searches: [
        'garden tools',
        'outdoor decor',
        'planters set',
        'home decor',
        'wall art',
        'decorative items'
      ]
    },
    {
      id: 'sports-outdoors',
      name: '⚽ Sports & Outdoors',
      icon: '🏃',
      description: 'Athletic & Outdoor Gear',
      searches: [
        'camping gear',
        'hiking equipment',
        'sports accessories',
        'outdoor activities',
        'athletic gear',
        'fitness equipment'
      ]
    },
    {
      id: 'toys-games',
      name: '🎮 Toys & Games',
      icon: '🧸',
      description: 'Kids Toys & Board Games',
      searches: [
        'board games',
        'educational toys',
        'puzzles set',
        'kids toys',
        'family games',
        'learning toys'
      ]
    },
    {
      id: 'electronics',
      name: '📱 Electronics',
      icon: '💻',
      description: 'Tech Accessories',
      searches: [
        'phone accessories',
        'headphones',
        'chargers bundle',
        'cables pack',
        'tech gadgets',
        'electronics accessories'
      ]
    },
    {
      id: 'beauty-personal',
      name: '💄 Beauty & Personal Care',
      icon: '💅',
      description: 'Cosmetics & Skincare',
      searches: [
        'skincare set',
        'makeup organizer',
        'hair tools',
        'beauty accessories',
        'cosmetic bundle',
        'personal care'
      ]
    },
    {
      id: 'office-products',
      name: '📝 Office Products',
      icon: '✏️',
      description: 'Stationery & Supplies',
      searches: [
        'desk supplies',
        'planners bundle',
        'office organizers',
        'stationery set',
        'writing tools',
        'desk accessories'
      ]
    },
    {
      id: 'automotive',
      name: '🚗 Automotive',
      icon: '🔧',
      description: 'Car Accessories',
      searches: [
        'car accessories',
        'cleaning supplies',
        'car organizers',
        'auto tools',
        'vehicle accessories',
        'car care products'
      ]
    },
    {
      id: 'baby-products',
      name: '👶 Baby Products',
      icon: '🍼',
      description: 'Baby Care Essentials',
      searches: [
        'baby essentials',
        'nursery decor',
        'feeding supplies',
        'baby care',
        'infant accessories',
        'newborn bundle'
      ]
    },
    {
      id: 'health-household',
      name: '🏥 Health & Household',
      icon: '💊',
      description: 'Wellness & Storage',
      searches: [
        'first aid kit',
        'wellness products',
        'storage containers',
        'health accessories',
        'household items',
        'organization solutions'
      ]
    },
    {
      id: 'pet-supplies',
      name: '🐾 Pet Supplies',
      icon: '🐶',
      description: 'Pet Care Products',
      searches: [
        'pet grooming',
        'dog toys',
        'cat accessories',
        'pet training',
        'pet care bundle',
        'animal supplies'
      ]
    },
    {
      id: 'arts-crafts',
      name: '🎨 Arts & Crafts',
      icon: '✂️',
      description: 'Creative Supplies',
      searches: [
        'craft supplies',
        'art materials',
        'painting set',
        'craft tools',
        'creative bundle',
        'art accessories'
      ]
    },
    {
      id: 'clothing-shoes',
      name: '👕 Clothing & Shoes',
      icon: '👟',
      description: 'Fashion Accessories',
      searches: [
        'accessories bundle',
        'fashion items',
        'jewelry organizer',
        'clothing accessories',
        'shoe care',
        'wardrobe essentials'
      ]
    },
    {
      id: 'books',
      name: '📚 Books',
      icon: '📖',
      description: 'Book Bundles & Sets',
      searches: [
        'book bundle',
        'book series',
        'reading collection',
        'book set',
        'literature pack',
        'bestseller bundle'
      ]
    },
    {
      id: 'tools-home',
      name: '🔨 Tools & Home Improvement',
      icon: '🛠️',
      description: 'Hardware & Tools',
      searches: [
        'tool set',
        'hardware kit',
        'home improvement',
        'power tools',
        'hand tools',
        'tool organizer'
      ]
    },
    {
      id: 'grocery-gourmet',
      name: '🛒 Grocery & Gourmet',
      icon: '🍴',
      description: 'Food & Beverage',
      searches: [
        'gourmet gift set',
        'snack bundle',
        'coffee accessories',
        'food storage',
        'kitchen storage',
        'pantry organizer'
      ]
    },
    {
      id: 'industrial-scientific',
      name: '🔬 Industrial & Scientific',
      icon: '⚗️',
      description: 'Lab & Industrial',
      searches: [
        'lab equipment',
        'safety gear',
        'industrial tools',
        'scientific supplies',
        'lab accessories',
        'measuring tools'
      ]
    },
    {
      id: 'luggage-travel',
      name: '🧳 Luggage & Travel',
      icon: '✈️',
      description: 'Travel Gear',
      searches: [
        'packing cubes',
        'travel accessories',
        'luggage organizer',
        'travel essentials',
        'carry-on accessories',
        'travel bundle'
      ]
    },
    {
      id: 'musical-instruments',
      name: '🎸 Musical Instruments',
      icon: '🎹',
      description: 'Music Accessories',
      searches: [
        'guitar accessories',
        'music equipment',
        'instrument care',
        'audio accessories',
        'music gear',
        'instrument bundle'
      ]
    },
    {
      id: 'jewelry',
      name: '💎 Jewelry',
      icon: '💍',
      description: 'Jewelry & Accessories',
      searches: [
        'jewelry organizer',
        'jewelry set',
        'accessories bundle',
        'jewelry storage',
        'jewelry care',
        'fashion jewelry'
      ]
    },
    {
      id: 'handmade',
      name: '🎁 Handmade',
      icon: '🖐️',
      description: 'Artisan Products',
      searches: [
        'handmade gift',
        'artisan bundle',
        'craft gift set',
        'handcrafted items',
        'unique gifts',
        'handmade accessories'
      ]
    },
    {
      id: 'video-games',
      name: '🎮 Video Games',
      icon: '🕹️',
      description: 'Gaming Accessories',
      searches: [
        'gaming accessories',
        'controller gear',
        'gaming setup',
        'gamer bundle',
        'console accessories',
        'gaming equipment'
      ]
    },
    {
      id: 'appliances',
      name: '🔌 Appliances',
      icon: '🏠',
      description: 'Home Appliances',
      searches: [
        'small appliances',
        'kitchen appliances',
        'home appliances',
        'appliance bundle',
        'household appliances',
        'appliance accessories'
      ]
    },
    {
      id: 'camera-photo',
      name: '📷 Camera & Photo',
      icon: '📸',
      description: 'Photography Gear',
      searches: [
        'camera accessories',
        'photography bundle',
        'camera gear',
        'photo equipment',
        'camera tools',
        'photography kit'
      ]
    },
    {
      id: 'cell-phones',
      name: '📱 Cell Phones',
      icon: '📲',
      description: 'Mobile Accessories',
      searches: [
        'phone case bundle',
        'mobile accessories',
        'phone protection',
        'smartphone gear',
        'phone accessories',
        'mobile bundle'
      ]
    },
    {
      id: 'computers',
      name: '💻 Computers',
      icon: '🖥️',
      description: 'PC Accessories',
      searches: [
        'computer accessories',
        'pc gear',
        'laptop accessories',
        'computer bundle',
        'tech accessories',
        'pc equipment'
      ]
    },
    {
      id: 'software',
      name: '💿 Software',
      icon: '📀',
      description: 'Digital Products',
      searches: [
        'software bundle',
        'digital tools',
        'productivity software',
        'software package',
        'digital bundle',
        'app bundle'
      ]
    },
    {
      id: 'watches',
      name: '⌚ Watches',
      icon: '⏰',
      description: 'Watch Accessories',
      searches: [
        'watch accessories',
        'watch storage',
        'watch care',
        'smartwatch gear',
        'watch bundle',
        'timepiece accessories'
      ]
    },
    {
      id: 'collectibles',
      name: '🏆 Collectibles',
      icon: '🎪',
      description: 'Collectible Items',
      searches: [
        'collectible set',
        'limited edition',
        'collector bundle',
        'rare items',
        'collectible pack',
        'special edition'
      ]
    },
    {
      id: 'wine',
      name: '🍷 Wine',
      icon: '🍇',
      description: 'Wine Accessories',
      searches: [
        'wine accessories',
        'wine tools',
        'wine gift set',
        'wine storage',
        'sommelier tools',
        'wine bundle'
      ]
    },
    {
      id: 'seasonal',
      name: '🎄 Seasonal',
      icon: '🎃',
      description: 'Holiday & Seasonal',
      searches: [
        'holiday decor',
        'seasonal items',
        'festive bundle',
        'holiday accessories',
        'seasonal decor',
        'celebration items'
      ]
    },
    {
      id: 'party-supplies',
      name: '🎉 Party Supplies',
      icon: '🎈',
      description: 'Party & Events',
      searches: [
        'party decorations',
        'party supplies',
        'celebration bundle',
        'party accessories',
        'event supplies',
        'party pack'
      ]
    },
    {
      id: 'wedding',
      name: '💒 Wedding',
      icon: '💐',
      description: 'Wedding Supplies',
      searches: [
        'wedding decorations',
        'bridal accessories',
        'wedding bundle',
        'ceremony supplies',
        'wedding essentials',
        'bridal gift'
      ]
    },
    {
      id: 'motorcycle',
      name: '🏍️ Motorcycle',
      icon: '🛵',
      description: 'Motorcycle Gear',
      searches: [
        'motorcycle accessories',
        'riding gear',
        'bike accessories',
        'motorcycle bundle',
        'rider equipment',
        'motorcycle tools'
      ]
    },
    {
      id: 'rv-parts',
      name: '🚐 RV Parts',
      icon: '🏕️',
      description: 'RV Accessories',
      searches: [
        'rv accessories',
        'camping gear',
        'rv supplies',
        'rv bundle',
        'motorhome accessories',
        'travel trailer gear'
      ]
    },
    {
      id: 'boat-marine',
      name: '⛵ Boat & Marine',
      icon: '🚤',
      description: 'Marine Equipment',
      searches: [
        'boat accessories',
        'marine gear',
        'boating equipment',
        'marine bundle',
        'nautical accessories',
        'boat supplies'
      ]
    },
    {
      id: 'patio-lawn',
      name: '🌿 Patio & Lawn',
      icon: '🪴',
      description: 'Outdoor Living',
      searches: [
        'patio accessories',
        'lawn care',
        'outdoor furniture',
        'garden bundle',
        'patio decor',
        'outdoor essentials'
      ]
    },
    {
      id: 'hunting-fishing',
      name: '🎣 Hunting & Fishing',
      icon: '🏹',
      description: 'Outdoor Sports',
      searches: [
        'fishing gear',
        'hunting accessories',
        'outdoor sports',
        'fishing bundle',
        'hunting equipment',
        'angler supplies'
      ]
    },
    {
      id: 'equestrian',
      name: '🐴 Equestrian',
      icon: '🏇',
      description: 'Horse Riding Gear',
      searches: [
        'horse accessories',
        'riding equipment',
        'equestrian gear',
        'horse care',
        'stable supplies',
        'riding bundle'
      ]
    },
    {
      id: 'cycling',
      name: '🚴 Cycling',
      icon: '🚲',
      description: 'Bike Accessories',
      searches: [
        'bike accessories',
        'cycling gear',
        'bicycle equipment',
        'cycling bundle',
        'bike tools',
        'cyclist essentials'
      ]
    }
  ];

  // ============================================================================
  // EFFECTS
  // ============================================================================
  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      setAuth(localStorage.getItem('ark_auth') === 'true');
    }
  }, []);

  useEffect(() => {
    if (auth && typeof window !== 'undefined') {
      fetch('/api/search?action=saved')
        .then(res => res.json())
        .then(data => setSavedProducts(data.products || []))
        .catch(() => {});
      
      fetch('/api/search?action=competitors')
        .then(res => res.json())
        .then(data => setCompetitors(data.competitors || []))
        .catch(() => {});
        
      const savedBundles = localStorage.getItem('ark_bundles');
      if (savedBundles) {
        try {
          setBundles(JSON.parse(savedBundles));
        } catch (e) {}
      }
    }
  }, [auth]);

  // ============================================================================
  // FUNCTIONS
  // ============================================================================
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const addLog = (message, data = null) => {
    const log = {
      time: new Date().toLocaleTimeString(),
      message,
      data
    };
    setDebugLogs(prev => [log, ...prev].slice(0, 20));
  };

  const login = (e) => {
    e.preventDefault();
    if (password === 'arkglobal2024') {
      localStorage.setItem('ark_auth', 'true');
      setAuth(true);
      showToast('Welcome to ARK Scanner! 🚀');
    } else {
      alert('❌ Wrong password!');
      setPassword('');
    }
  };

  const logout = () => {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('ark_auth');
      setAuth(false);
      setTab('search');
      showToast('Logged out successfully');
    }
  };

  const searchProducts = async () => {
    if (!category) {
      setError('Please select a category first');
      return;
    }

    setLoading(true);
    setError('');
    setProducts([]);
    addLog('🔍 Starting search', { category, keyword, filters });

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'search',
          category,
          keyword,
          filters
        })
      });

      const data = await response.json();
      
      if (data.products && data.products.length > 0) {
        setProducts(data.products);
        addLog('✅ Search complete', { count: data.products.length });
        showToast(`Found ${data.products.length} products! 🎯`);
      } else {
        setError('No products found for this search');
        addLog('⚠️ No products found');
      }
    } catch (err) {
      setError('Search failed: ' + err.message);
      addLog('❌ Search error', err);
    } finally {
      setLoading(false);
    }
  };

  const saveProduct = async (product) => {
    try {
      await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'save',
          product
        })
      });
      setSavedProducts(prev => [...prev, product]);
      showToast('💾 Product saved!');
      addLog('💾 Product saved', { title: product.title });
    } catch (err) {
      console.error(err);
      showToast('❌ Failed to save');
    }
  };

  const trackCompetitor = async (asin) => {
    try {
      await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'competitor',
          operation: 'add',
          asin
        })
      });
      setCompetitors(prev => [...prev, { asin, added_at: new Date().toISOString() }]);
      showToast('👁️ Added to watchlist!');
      addLog('👁️ Competitor tracked', { asin });
    } catch (err) {
      console.error(err);
      showToast('❌ Failed to track');
    }
  };

  const generateBundleIdea = async () => {
    if (products.length < 2) {
      alert('Need at least 2 products to generate bundle ideas!');
      return;
    }

    setShowBundleAI(true);
    setBundleSuggestion('🤖 Analyzing products and generating creative bundle ideas...');

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'bundle-ai',
          products: products.slice(0, 5),
          category
        })
      });

      const data = await response.json();
      setBundleSuggestion(data.suggestion || 'Could not generate suggestions. Try again!');
      addLog('🤖 Bundle AI complete');
    } catch (err) {
      setBundleSuggestion('❌ Error generating suggestions. Please try again.');
      addLog('❌ Bundle AI error', err);
    }
  };

  const applyFilters = () => {
    if (!products || products.length === 0) return [];
    
    let filtered = [...products];
    
    if (filters.minPrice) {
      filtered = filtered.filter(p => p.price >= parseFloat(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(p => p.price <= parseFloat(filters.maxPrice));
    }
    if (filters.minMargin) {
      filtered = filtered.filter(p => {
        const margin = ((p.price - p.supplier_price) / p.price) * 100;
        return margin >= parseFloat(filters.minMargin);
      });
    }
    if (filters.maxBSR && filtered[0]?.bsr) {
      filtered = filtered.filter(p => p.bsr && p.bsr <= parseInt(filters.maxBSR));
    }
    if (filters.minReviews && filtered[0]?.reviews) {
      filtered = filtered.filter(p => p.reviews && p.reviews >= parseInt(filters.minReviews));
    }
    if (filters.minRating && filtered[0]?.rating) {
      filtered = filtered.filter(p => p.rating && p.rating >= parseFloat(filters.minRating));
    }

    // Sort
    if (filters.sortBy === 'profit') {
      filtered.sort((a, b) => {
        const profitA = a.price - a.supplier_price - (a.price * 0.15);
        const profitB = b.price - b.supplier_price - (b.price * 0.15);
        return profitB - profitA;
      });
    } else if (filters.sortBy === 'margin') {
      filtered.sort((a, b) => {
        const marginA = ((a.price - a.supplier_price) / a.price) * 100;
        const marginB = ((b.price - b.supplier_price) / b.price) * 100;
        return marginB - marginA;
      });
    } else if (filters.sortBy === 'bsr' && filtered[0]?.bsr) {
      filtered.sort((a, b) => (a.bsr || 999999) - (b.bsr || 999999));
    }

    return filtered;
  };

  const filteredProducts = applyFilters();

  // ============================================================================
  // RENDER
  // ============================================================================
  if (!mounted) return null;

  if (!auth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,138,0,0.1),transparent_50%)]"></div>
        <form onSubmit={login} className="relative bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-orange-500/20 max-w-md w-full shadow-2xl backdrop-blur">
          <div className="text-center mb-8">
            <div className="inline-block bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 p-5 rounded-2xl mb-4 shadow-2xl transform hover:scale-105 transition">
              <span className="text-4xl font-black text-white">ARK</span>
            </div>
            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-2">
              Bundle Scanner
            </h1>
            <p className="text-orange-400 font-bold text-lg">V6.0 ULTIMATE EDITION</p>
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-400">
              <span className="px-3 py-1 bg-orange-500/10 rounded-full border border-orange-500/20">50+ Categories</span>
              <span className="px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">AI Powered</span>
              <span className="px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">$0.50/mo</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-500 transition"
                placeholder="Enter your password"
                autoFocus
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 hover:from-orange-500 hover:via-orange-600 hover:to-orange-500 rounded-xl font-bold text-white text-lg transition shadow-lg hover:shadow-orange-500/50 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              🚀 Launch Scanner
            </button>
          </div>

          <p className="mt-6 text-center text-xs text-gray-500">
            The most powerful FBA product research tool
          </p>
        </form>
      </div>
    );
  }

  const savedCount = savedProducts?.length || 0;
  const bundleCount = bundles?.length || 0;
  const watchCount = competitors?.length || 0;
  const selectedCategory = categories.find(c => c.id === category);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 animate-slide-in-right">
          <div className="bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-4 rounded-xl shadow-2xl border border-green-400/20 flex items-center gap-3">
            <div className="text-2xl">✅</div>
            <div className="font-semibold">{toast}</div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-gradient-to-r from-orange-600/90 via-orange-500/90 to-orange-600/90 border-b border-orange-400/20 shadow-2xl">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-white via-orange-100 to-orange-200 p-4 rounded-2xl shadow-xl transform hover:rotate-6 transition">
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-orange-600 to-orange-800">ARK</span>
              </div>
              <div>
                <h1 className="text-3xl font-black text-white drop-shadow-lg">Bundle Scanner V6 Ultimate</h1>
                <p className="text-orange-100 text-sm font-semibold flex items-center gap-2 mt-1">
                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  {categories.length} Categories • Advanced Filters • AI Powered • Real-time Tracking
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur rounded-xl text-sm font-bold transition shadow-lg hover:shadow-xl border border-white/20 flex items-center gap-2"
            >
              <span>🚪</span>
              <span>Logout</span>
            </button>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setTab('search')}
              className={'px-8 py-3 rounded-xl font-bold transition transform hover:scale-105 shadow-lg flex items-center gap-2 ' + 
                (tab === 'search' 
                  ? 'bg-white text-orange-600 shadow-xl' 
                  : 'bg-orange-700/50 text-white hover:bg-orange-600/50 border border-orange-400/20')}
            >
              <span className="text-xl">🔍</span>
              <span>Search</span>
            </button>
            <button
              onClick={() => setTab('saved')}
              className={'px-8 py-3 rounded-xl font-bold transition transform hover:scale-105 shadow-lg flex items-center gap-2 ' + 
                (tab === 'saved' 
                  ? 'bg-white text-orange-600 shadow-xl' 
                  : 'bg-orange-700/50 text-white hover:bg-orange-600/50 border border-orange-400/20')}
            >
              <span className="text-xl">💾</span>
              <span>Saved</span>
              {savedCount > 0 && (
                <span className="px-2 py-1 bg-orange-500 text-white text-xs rounded-full font-black">{savedCount}</span>
              )}
            </button>
            <button
              onClick={() => setTab('bundles')}
              className={'px-8 py-3 rounded-xl font-bold transition transform hover:scale-105 shadow-lg flex items-center gap-2 ' + 
                (tab === 'bundles' 
                  ? 'bg-white text-orange-600 shadow-xl' 
                  : 'bg-orange-700/50 text-white hover:bg-orange-600/50 border border-orange-400/20')}
            >
              <span className="text-xl">📦</span>
              <span>Bundles</span>
              {bundleCount > 0 && (
                <span className="px-2 py-1 bg-orange-500 text-white text-xs rounded-full font-black">{bundleCount}</span>
              )}
            </button>
            <button
              onClick={() => setTab('competitors')}
              className={'px-8 py-3 rounded-xl font-bold transition transform hover:scale-105 shadow-lg flex items-center gap-2 ' + 
                (tab === 'competitors' 
                  ? 'bg-white text-orange-600 shadow-xl' 
                  : 'bg-orange-700/50 text-white hover:bg-orange-600/50 border border-orange-400/20')}
            >
              <span className="text-xl">👁️</span>
              <span>Watch</span>
              {watchCount > 0 && (
                <span className="px-2 py-1 bg-orange-500 text-white text-xs rounded-full font-black">{watchCount}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative container mx-auto px-4 py-8">
        {tab === 'search' && (
          <div>
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3 mb-6">
              <button
                onClick={() => setShowDebug(!showDebug)}
                className="px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 rounded-lg transition text-sm font-semibold shadow-lg border border-gray-600 flex items-center gap-2"
              >
                <span>{showDebug ? '🔍 Hide Debug' : '🔍 Debug'}</span>
              </button>
              <button
                onClick={generateBundleIdea}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-500 hover:to-purple-600 rounded-lg transition text-sm font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                disabled={products.length < 2}
              >
                <span>🤖 Bundle AI</span>
                {products.length >= 2 && <span className="text-xs">({products.length} products)</span>}
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 rounded-lg transition text-sm font-semibold shadow-lg flex items-center gap-2"
              >
                <span>{showFilters ? '🎯 Hide Filters' : '🎯 Show Filters'}</span>
              </button>
            </div>

            {/* Search Form */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 mb-8 shadow-2xl border border-gray-700/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="text-4xl">🔍</div>
                <div>
                  <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                    Product Search
                  </h2>
                  <p className="text-gray-400 text-sm">Find profitable products across {categories.length} categories</p>
                </div>
              </div>
              
              {/* Category Selection */}
              <div className="mb-6">
                <label className="block text-sm font-bold mb-3 text-gray-300 flex items-center gap-2">
                  <span>📂</span>
                  <span>Category</span>
                  <span className="text-orange-400">({categories.length} available)</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white font-semibold transition hover:border-gray-600"
                >
                  <option value="">🎯 Choose a category...</option>
                  <optgroup label="🏪 YOUR SHOP BUNDLES">
                    {categories.slice(0, 8).map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.icon} {cat.name} - {cat.description}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="📦 AMAZON FBA CATEGORIES">
                    {categories.slice(8).map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.icon} {cat.name}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {selectedCategory && (
                <div className="mb-6 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{selectedCategory.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-orange-400 mb-1">{selectedCategory.name}</h3>
                      <p className="text-sm text-gray-400 mb-2">{selectedCategory.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedCategory.searches.slice(0, 4).map((search, i) => (
                          <span key={i} className="text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-300">
                            {search}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Keyword Input */}
              <div className="mb-6">
                <label className="block text-sm font-bold mb-3 text-gray-300 flex items-center gap-2">
                  <span>🔤</span>
                  <span>Keyword</span>
                  <span className="text-gray-500 font-normal">(Optional - refine your search)</span>
                </label>
                <input
                  type="text"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="w-full px-4 py-4 bg-gray-800/50 border border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white font-semibold transition hover:border-gray-600"
                  placeholder="e.g., premium, deluxe, professional, bundle, kit..."
                />
              </div>

              {/* Advanced Filters */}
              {showFilters && (
                <div className="mb-6 p-6 bg-gray-800/30 rounded-xl border border-gray-700/50">
                  <h3 className="font-bold text-orange-400 mb-4 flex items-center gap-2">
                    <span>🎯</span>
                    <span>Advanced Filters</span>
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-2">Min Price ($)</label>
                      <input
                        type="number"
                        placeholder="10"
                        value={filters.minPrice}
                        onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-2">Max Price ($)</label>
                      <input
                        type="number"
                        placeholder="100"
                        value={filters.maxPrice}
                        onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-2">Min Margin (%)</label>
                      <input
                        type="number"
                        placeholder="30"
                        value={filters.minMargin}
                        onChange={(e) => setFilters({...filters, minMargin: e.target.value})}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-2">Max BSR</label>
                      <input
                        type="number"
                        placeholder="50000"
                        value={filters.maxBSR}
                        onChange={(e) => setFilters({...filters, maxBSR: e.target.value})}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-2">Min Reviews</label>
                      <input
                        type="number"
                        placeholder="10"
                        value={filters.minReviews}
                        onChange={(e) => setFilters({...filters, minReviews: e.target.value})}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 mb-2">Min Rating</label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="4.0"
                        value={filters.minRating}
                        onChange={(e) => setFilters({...filters, minRating: e.target.value})}
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-xs font-semibold text-gray-400 mb-2">Sort By</label>
                    <select
                      value={filters.sortBy}
                      onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                      className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="profit">💰 Highest Profit</option>
                      <option value="margin">📊 Best Margin</option>
                      <option value="bsr">📈 Lowest BSR</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Search Button */}
              <button
                onClick={searchProducts}
                disabled={loading || !category}
                className="w-full py-5 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 hover:from-orange-500 hover:via-orange-600 hover:to-orange-500 rounded-xl font-black text-xl transition disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-orange-500/50 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Searching Products...</span>
                  </>
                ) : (
                  <>
                    <span>🚀</span>
                    <span>Search Products</span>
                  </>
                )}
              </button>

              {error && (
                <div className="mt-6 p-4 bg-red-900/30 border border-red-500/30 rounded-xl flex items-start gap-3">
                  <div className="text-2xl">⚠️</div>
                  <div>
                    <h4 className="font-bold text-red-400 mb-1">Search Error</h4>
                    <p className="text-red-300 text-sm">{error}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Results */}
            {filteredProducts.length > 0 && (
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">📊</div>
                    <div>
                      <h3 className="text-2xl font-black text-white">
                        Found {filteredProducts.length} Products
                      </h3>
                      {filteredProducts.length !== products.length && (
                        <p className="text-gray-400 text-sm">Filtered from {products.length} total results</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product, i) => {
                    const profit = product.price - product.supplier_price - (product.price * 0.15);
                    const margin = ((product.price - product.supplier_price) / product.price) * 100;
                    const profitColor = profit > 15 ? 'text-green-400' : profit > 8 ? 'text-yellow-400' : 'text-red-400';
                    const marginColor = margin > 40 ? 'text-green-400' : margin > 25 ? 'text-yellow-400' : 'text-red-400';
                    
                    return (
                      <div 
                        key={i} 
                        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-5 border border-gray-700/50 hover:border-orange-500/50 transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20 group"
                      >
                        <h4 className="font-bold text-white mb-4 line-clamp-2 group-hover:text-orange-400 transition">
                          {product.title}
                        </h4>
                        
                        <div className="space-y-3 mb-5">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-sm font-semibold">Amazon Price:</span>
                            <span className="text-green-400 font-black text-lg">${product.price.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-sm font-semibold">Supplier Cost:</span>
                            <span className="text-blue-400 font-black text-lg">${product.supplier_price.toFixed(2)}</span>
                          </div>
                          <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-sm font-semibold">Est. Profit:</span>
                            <span className={`${profitColor} font-black text-xl`}>
                              ${profit.toFixed(2)}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400 text-sm font-semibold">Margin:</span>
                            <span className={`${marginColor} font-black text-lg`}>
                              {margin.toFixed(1)}%
                            </span>
                          </div>
                          {product.bsr && (
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400 text-sm font-semibold">BSR:</span>
                              <span className="text-purple-400 font-bold">
                                #{product.bsr.toLocaleString()}
                              </span>
                            </div>
                          )}
                          {product.reviews && (
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400 text-sm font-semibold">Reviews:</span>
                              <span className="text-yellow-400 font-bold">
                                ⭐ {product.reviews.toLocaleString()}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={() => saveProduct(product)}
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-600 rounded-xl text-sm font-bold transition shadow-lg transform hover:scale-105 flex items-center justify-center gap-2"
                          >
                            <span>💾</span>
                            <span>Save</span>
                          </button>
                          <button
                            onClick={() => trackCompetitor(product.asin || `ASIN${i}`)}
                            className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 rounded-xl text-sm font-bold transition shadow-lg transform hover:scale-105 flex items-center justify-center gap-2"
                          >
                            <span>👁️</span>
                            <span>Watch</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Bundle AI Modal */}
            {showBundleAI && (
              <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 max-w-3xl w-full border border-gray-700 shadow-2xl">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">🤖</div>
                      <div>
                        <h3 className="text-2xl font-black text-white">Bundle AI Suggestions</h3>
                        <p className="text-gray-400 text-sm">AI-powered bundle recommendations</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowBundleAI(false)}
                      className="text-gray-400 hover:text-white text-2xl font-bold w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-700 transition"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="bg-gray-800/50 rounded-xl p-6 mb-6 max-h-96 overflow-y-auto border border-gray-700">
                    <pre className="whitespace-pre-wrap text-sm text-gray-300 leading-relaxed">
                      {bundleSuggestion}
                    </pre>
                  </div>
                  
                  <button
                    onClick={() => setShowBundleAI(false)}
                    className="w-full py-4 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-600 rounded-xl font-bold text-white transition shadow-lg transform hover:scale-105"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {tab === 'saved' && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="text-4xl">💾</div>
              <div>
                <h2 className="text-3xl font-black text-white">Saved Products</h2>
                <p className="text-gray-400 text-sm">{savedCount} products in your collection</p>
              </div>
            </div>
            
            {savedProducts.length === 0 ? (
              <div className="text-center py-20 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700/50">
                <div className="text-6xl mb-4">📭</div>
                <p className="text-gray-400 text-xl font-semibold mb-2">No saved products yet</p>
                <p className="text-gray-500 text-sm">Search and save your favorite products to see them here!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {savedProducts.map((product, i) => {
                  const profit = product.price - product.supplier_price - (product.price * 0.15);
                  const margin = ((product.price - product.supplier_price) / product.price) * 100;
                  
                  return (
                    <div 
                      key={i} 
                      className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-5 border border-gray-700/50 hover:border-green-500/50 transition-all transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20"
                    >
                      <h3 className="font-bold text-white mb-4 line-clamp-2">{product.title}</h3>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400 font-semibold">Amazon:</span>
                          <span className="text-green-400 font-black">${product.price.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400 font-semibold">Supplier:</span>
                          <span className="text-blue-400 font-black">${product.supplier_price.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400 font-semibold">Profit:</span>
                          <span className="text-orange-400 font-black">${profit.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400 font-semibold">Margin:</span>
                          <span className="text-purple-400 font-black">{margin.toFixed(1)}%</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <a 
                          href={product.amazon_url} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 px-3 py-2 bg-gradient-to-r from-yellow-600 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 rounded-lg text-xs text-center font-bold transition shadow-lg"
                        >
                          🛒 View
                        </a>
                        <button 
                          onClick={() => {
                            setSavedProducts(prev => prev.filter((_, idx) => idx !== i));
                            showToast('Product removed! 🗑️');
                          }}
                          className="px-3 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 rounded-lg text-xs transition shadow-lg font-bold"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {tab === 'bundles' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="text-4xl">📦</div>
                <div>
                  <h2 className="text-3xl font-black text-white">My Bundles</h2>
                  <p className="text-gray-400 text-sm">{bundleCount} bundle ideas</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  const name = prompt('Bundle name?');
                  if (name) {
                    const newBundle = {
                      id: Date.now(),
                      name,
                      products: [],
                      created: new Date().toISOString()
                    };
                    const updated = [...bundles, newBundle];
                    setBundles(updated);
                    localStorage.setItem('ark_bundles', JSON.stringify(updated));
                    showToast('Bundle created! 📦');
                  }
                }}
                className="px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-600 rounded-xl font-bold transition shadow-lg flex items-center gap-2"
              >
                <span>➕</span>
                <span>Create Bundle</span>
              </button>
            </div>
            
            {bundles.length === 0 ? (
              <div className="text-center py-20 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700/50">
                <div className="text-6xl mb-4">📦</div>
                <p className="text-gray-400 text-xl font-semibold mb-2">No bundles yet</p>
                <p className="text-gray-500 text-sm">Create your first bundle to organize products!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {bundles.map((bundle, i) => (
                  <div 
                    key={bundle.id || i} 
                    className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700/50 hover:border-orange-500/50 transition-all"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-2xl font-black text-white mb-2 flex items-center gap-2">
                          <span>📦</span>
                          <span>{bundle.name}</span>
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <span>📊</span>
                            <span>{bundle.products?.length || 0} products</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <span>📅</span>
                            <span>{new Date(bundle.created).toLocaleDateString()}</span>
                          </span>
                        </div>
                      </div>
                      <button 
                        onClick={() => {
                          if (confirm(`Delete "${bundle.name}"?`)) {
                            const updated = bundles.filter((_, idx) => idx !== i);
                            setBundles(updated);
                            localStorage.setItem('ark_bundles', JSON.stringify(updated));
                            showToast('Bundle deleted! 🗑️');
                          }
                        }}
                        className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 rounded-xl transition shadow-lg font-bold flex items-center gap-2"
                      >
                        <span>🗑️</span>
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'competitors' && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="text-4xl">👁️</div>
              <div>
                <h2 className="text-3xl font-black text-white">Watching Competitors</h2>
                <p className="text-gray-400 text-sm">{watchCount} products being monitored</p>
              </div>
            </div>
            
            {competitors.length === 0 ? (
              <div className="text-center py-20 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700/50">
                <div className="text-6xl mb-4">👁️</div>
                <p className="text-gray-400 text-xl font-semibold mb-2">No competitors tracked</p>
                <p className="text-gray-500 text-sm">Click 👁️ Watch on products to monitor them here!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {competitors.map((comp, i) => (
                  <div 
                    key={comp.id || i} 
                    className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-5 border border-gray-700/50 hover:border-blue-500/50 transition-all flex justify-between items-center"
                  >
                    <div className="flex-1">
                      <p className="font-bold text-white text-lg mb-1">ASIN: {comp.asin}</p>
                      <p className="text-sm text-gray-400 flex items-center gap-2">
                        <span>📅</span>
                        <span>Added: {new Date(comp.added_at).toLocaleDateString()}</span>
                      </p>
                    </div>
                    <button 
                      onClick={async () => {
                        try {
                          await fetch('/api/search', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ 
                              action: 'competitor', 
                              operation: 'remove', 
                              asin: comp.asin 
                            })
                          });
                          setCompetitors(prev => prev.filter((_, idx) => idx !== i));
                          showToast('Removed from watchlist! 🗑️');
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 rounded-xl transition shadow-lg font-bold flex items-center gap-2"
                    >
                      <span>🗑️</span>
                      <span>Remove</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Debug Panel */}
        {showDebug && (
          <div className="fixed bottom-6 right-6 w-96 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-gray-700 shadow-2xl max-h-96 overflow-hidden z-50">
            <div className="p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
              <span className="font-bold flex items-center gap-2">
                <span>🔍</span>
                <span>Debug Logs</span>
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setDebugLogs([])}
                  className="text-xs px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded-lg transition font-semibold"
                >
                  Clear
                </button>
                <button
                  onClick={() => setShowDebug(false)}
                  className="text-xs px-3 py-1 bg-red-600 hover:bg-red-500 rounded-lg transition font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
            <div className="p-4 space-y-2 max-h-80 overflow-y-auto">
              {debugLogs.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-4">No logs yet</p>
              ) : (
                debugLogs.map((log, i) => (
                  <div key={i} className="text-xs bg-gray-800/50 p-3 rounded-xl border border-gray-700">
                    <div className="text-gray-400 mb-1 font-semibold">{log.time}</div>
                    <div className="text-white font-bold mb-1">{log.message}</div>
                    {log.data && (
                      <pre className="text-gray-400 text-xs overflow-x-auto mt-2 p-2 bg-black/30 rounded">
                        {JSON.stringify(log.data, null, 2)}
                      </pre>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 text-center text-gray-500 text-sm border-t border-gray-800 pt-8">
          <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-2">
            ARK Bundle Scanner V6.0 - The Ultimate Edition
          </p>
          <p className="mb-2">
            <span className="text-orange-400 font-semibold">{categories.length}</span> Categories • 
            <span className="text-blue-400 font-semibold"> Advanced Filters</span> • 
            <span className="text-green-400 font-semibold"> Real-time Tracking</span> • 
            <span className="text-purple-400 font-semibold"> AI Powered</span>
          </p>
          <p className="text-orange-400 font-bold">
            💰 Still only ~$0.50/month vs competitors at $19-99/month (97% savings!)
          </p>
        </div>
      </div>
    </div>
  );
}
