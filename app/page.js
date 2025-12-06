'use client';
import React, { useState, useCallback, useMemo } from 'react';

// Comprehensive icon system
const Icon = ({ name, size = 24, className = "" }) => {
  const icons = {
    search: <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
    loader: <path d="M12 2v4m0 12v4m-8-10H2m20 0h-2m-2.93-6.36l-1.41 1.41m-9.9 9.9l-1.41 1.41m0-12.73l1.41 1.41m9.9 9.9l1.41 1.41" />,
    zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
    check: <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></>,
    bookmark: <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />,
    x: <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>,
    lock: <><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>,
    eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></>,
    eyeOff: <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></>,
    layers: <><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>,
    download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    gift: <><polyline points="20 12 20 22 4 22 4 12" /><rect x="2" y="7" width="20" height="5" /><line x1="12" y1="22" x2="12" y2="7" /><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" /><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" /></>,
    sparkles: <path d="M12 3v18M5.5 8.5l13 7M5.5 15.5l13-7" />,
    trendingUp: <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></>,
    chevronDown: <polyline points="6 9 12 15 18 9" />,
    chevronUp: <polyline points="18 15 12 9 6 15" />,
    alert: <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></>,
    star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />,
    users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
    barChart: <><line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" /></>,
    dollarSign: <><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></>,
    target: <><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></>,
    package: <><line x1="16.5" y1="9.4" x2="7.5" y2="4.21" /><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></>,
    activity: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />,
    instagram: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></>,
    calculator: <><rect x="4" y="2" width="16" height="20" rx="2" /><line x1="8" y1="6" x2="16" y2="6" /><line x1="8" y1="10" x2="16" y2="10" /><line x1="8" y1="14" x2="16" y2="14" /><line x1="8" y1="18" x2="16" y2="18" /></>,
    pieChart: <><path d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path d="M22 12A10 10 0 0 0 12 2v10z" /></>,
    trending: <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></>,
    award: <><circle cx="12" cy="8" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /></>,
    globe: <><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></>,
    clock: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></>,
    messageSquare: <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></>,
    truck: <><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></>,
    briefcase: <><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></>,
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {icons[name]}
    </svg>
  );
};

export default function ArkBundleHubV3() {
  const ADMIN_PASSWORD = 'Ark2024Global!';
  
  // Auth state
  const [auth, setAuth] = useState(false);
  const [pw, setPw] = useState('');
  const [showPw, setShowPw] = useState(false);
  
  // Main state
  const [activeTab, setActiveTab] = useState('discover');
  const [products, setProducts] = useState([]);
  const [competitors, setCompetitors] = useState([]);
  const [saved, setSaved] = useState([]);
  const [bundles, setBundles] = useState([]);
  const [savedBundles, setSavedBundles] = useState([]);
  const [bundleName, setBundleName] = useState('');
  const [scanning, setScanning] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expanded, setExpanded] = useState(null);
  const [showVersion, setShowVersion] = useState(false);
  
  // Calculator state
  const [calc, setCalc] = useState({
    cost: 10,
    sellPrice: 30,
    weight: 1,
    size: 'standard',
    ppcBudget: 300,
  });
  
  // Competitor tracking
  const [newAsin, setNewAsin] = useState('');
  
  // Notification
  const [notif, setNotif] = useState(null);
  const notify = (m, t = 'ok') => {
    setNotif({ m, t });
    setTimeout(() => setNotif(null), 3000);
  };

  const categories = [
    { id: 'trending', name: '🔥 Trending', searches: ['TikTok viral products right now', 'Amazon movers shakers today', 'trending products this month'] },
    { id: 'kitchen', name: '🍳 Kitchen', searches: ['kitchen gadgets TikTok viral now', 'cooking accessories trending this week', 'viral kitchen organization'] },
    { id: 'home', name: '🏠 Home', searches: ['home organization TikTok trending', 'storage solutions viral now', 'home decor trending this month'] },
    { id: 'cleaning', name: '🧹 Cleaning', searches: ['cleaning products TikTok viral now', 'viral cleaning gadgets this week', 'cleaning hacks products trending'] },
    { id: 'beauty', name: '💄 Beauty', searches: ['beauty tools TikTok viral this month', 'skincare gadgets trending now', 'viral makeup accessories'] },
    { id: 'tech', name: '📱 Tech', searches: ['tech gadgets TikTok viral now', 'phone accessories trending this week', 'viral desk gadgets'] },
    { id: 'pets', name: '🐕 Pets', searches: ['pet products TikTok viral now', 'dog accessories trending today', 'viral pet gadgets'] },
    { id: 'fitness', name: '💪 Fitness', searches: ['fitness gadgets TikTok trending', 'workout accessories viral now', 'trending gym equipment'] },
  ];

  // FBA Fee Calculator
  const calculateFBA = useCallback(() => {
    const { cost, sellPrice, weight, size, ppcBudget } = calc;
    
    // FBA fees (simplified calculation)
    const referralFee = sellPrice * 0.15; // 15% Amazon referral
    const fbaFee = size === 'standard' ? (weight < 1 ? 3.22 : 3.22 + (weight - 1) * 0.50) : 
                    (weight < 1 ? 4.75 : 4.75 + (weight - 1) * 0.80);
    const storageFee = 0.75; // Monthly per unit
    
    const totalFees = referralFee + fbaFee + storageFee;
    const profit = sellPrice - cost - totalFees;
    const margin = ((profit / sellPrice) * 100).toFixed(1);
    const roi = ((profit / cost) * 100).toFixed(0);
    
    // Break-even calculation
    const breakEvenUnits = Math.ceil(ppcBudget / profit);
    const monthlyProfit = (profit * 300).toFixed(0); // Assuming 300 units/mo
    const yearlyProfit = (profit * 3600).toFixed(0);
    
    return {
      referralFee: referralFee.toFixed(2),
      fbaFee: fbaFee.toFixed(2),
      storageFee: storageFee.toFixed(2),
      totalFees: totalFees.toFixed(2),
      profit: profit.toFixed(2),
      margin,
      roi,
      breakEvenUnits,
      monthlyProfit,
      yearlyProfit
    };
  }, [calc]);

  // Product Validation Score
  const getValidationScore = (product) => {
    let score = 0;
    const reasons = [];
    
    // Demand check (BSR)
    if (product.bsr?.rank) {
      if (product.bsr.rank < 5000) { score += 25; reasons.push('Excellent demand (BSR < 5000)'); }
      else if (product.bsr.rank < 15000) { score += 20; reasons.push('Good demand (BSR < 15000)'); }
      else if (product.bsr.rank < 50000) { score += 15; reasons.push('Moderate demand (BSR < 50000)'); }
      else { score += 5; reasons.push('Lower demand (BSR > 50000)'); }
    }
    
    // Competition check
    if (product.competition?.level === 'Low') { score += 25; reasons.push('Low competition'); }
    else if (product.competition?.level === 'Medium') { score += 15; reasons.push('Medium competition'); }
    else { score += 5; reasons.push('High competition'); }
    
    // Profitability check
    if (product.price?.margin > 60) { score += 25; reasons.push('High margins (>60%)'); }
    else if (product.price?.margin > 40) { score += 20; reasons.push('Good margins (>40%)'); }
    else if (product.price?.margin > 25) { score += 10; reasons.push('Acceptable margins (>25%)'); }
    
    // Trend check
    if (product.bsr?.trend === 'Rising') { score += 15; reasons.push('Rising trend'); }
    else if (product.bsr?.trend === 'Stable') { score += 10; reasons.push('Stable trend'); }
    
    // Reviews check
    if (product.reviews?.rating >= 4.5) { score += 10; reasons.push('Excellent reviews (4.5+)'); }
    else if (product.reviews?.rating >= 4.0) { score += 5; reasons.push('Good reviews (4.0+)'); }
    
    // Rating
    let rating = 'Poor';
    let color = 'red';
    if (score >= 80) { rating = 'Excellent'; color = 'green'; }
    else if (score >= 60) { rating = 'Good'; color = 'blue'; }
    else if (score >= 40) { rating = 'Fair'; color = 'yellow'; }
    
    return { score, rating, color, reasons };
  };

  // AI Search Function
  const scan = useCallback(async (searchQuery = '', categoryData = null) => {
    if (scanning) return;
    setScanning(true);
    setError('');
    setProducts([]);
    
    const cat = categoryData || categories[0];
    setStatus(`Searching TikTok, Instagram & Amazon...`);

    const now = new Date();
    const currentMonth = now.toLocaleString('en-US', { month: 'long' });
    const currentYear = now.getFullYear();

    try {
      console.log('🔍 Starting search...', { category: cat.name, searchQuery });
      
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `You are a JSON-only API. Return ONLY valid JSON, no explanations.

Search TikTok, Instagram, and Amazon for trending ${cat.name.replace(/🔥|🍳|🏠|🧹|💄|📱|🐕|💪|🎮|🚗/g, '').trim()} products in ${currentMonth} ${currentYear}.

Find 8 real products.

RESPONSE FORMAT:
[
{"name":"Real Product Name","category":"${cat.name}","emoji":"📦","desc":"Why trending","asin":"B08ABC123","price":{"cost":8,"sell":25,"margin":68,"roi":213},"bsr":{"rank":3500,"category":"Home","trend":"Rising","monthlySales":600},"reviews":{"count":800,"rating":4.3},"competition":{"sellers":45,"level":"Medium"},"viral":{"score":82,"platform":"Instagram","reason":"Viral reason","views":"2M"},"market":{"urgency":"High"},"suppliers":{"alibaba":7,"cj":9},"profitability":{"breakeven":40,"monthly":1800,"yearly":21600},"bundleWith":["Item A","Item B"]}
]

Return ONLY the JSON array starting with [ and ending with ].`
        })
      });

      console.log('✅ API response received', { status: res.status, ok: res.ok });

      const data = await res.json();
      console.log('📦 API Response Data:', JSON.stringify(data, null, 2));
      
      if (data.error) {
        console.error('❌ API Error:', data.error);
        throw new Error(typeof data.error === 'string' ? data.error : JSON.stringify(data.error));
      }
      
      let txt = '';
      if (data.content) {
        for (const block of data.content) {
          if (block.type === 'text') txt += block.text;
        }
      }

      console.log('📝 Extracted text length:', txt.length);
      console.log('📝 Extracted text preview:', txt.substring(0, 200));

      let productArray = null;
      
      const startIdx = txt.indexOf('[');
      const endIdx = txt.lastIndexOf(']');
      
      console.log('🔎 JSON search:', { startIdx, endIdx, hasArray: startIdx !== -1 && endIdx !== -1 });
      
      if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
        const jsonStr = txt.substring(startIdx, endIdx + 1);
        console.log('✂️ Extracted JSON string length:', jsonStr.length);
        
        try {
          productArray = JSON.parse(jsonStr);
          console.log('✅ JSON parsed successfully!', { count: productArray?.length });
          
          if (!Array.isArray(productArray) || productArray.length === 0 || !productArray[0].name) {
            console.warn('⚠️ Invalid product array structure');
            productArray = null;
          }
        } catch (e) {
          console.error('❌ JSON parse failed:', e.message);
        }
      }

      if (productArray && productArray.length > 0) {
        const prods = productArray.map((p, i) => ({
          ...p,
          id: `p-${Date.now()}-${i}`,
          price: p.price || { cost: 10, sell: 30, margin: 67, roi: 200 },
          viral: p.viral || { score: 75, platform: 'TikTok' },
          market: p.market || { urgency: 'Medium' },
          bsr: p.bsr || {},
          reviews: p.reviews || {},
          competition: p.competition || { level: 'Medium' },
        }));
        
        console.log('🎉 Products ready:', prods.length);
        setProducts(prods);
        notify(`Found ${prods.length} products!`);
      } else {
        console.error('❌ No valid products found');
        throw new Error('AI returned no products. Try different category.');
      }
    } catch (err) {
      console.error('Search error:', err);
      const errorMsg = err.message || 'Search failed - check console';
      setError(errorMsg);
      notify(errorMsg.substring(0, 50), 'err');
    } finally {
      setScanning(false);
      setStatus('');
    }
  }, [scanning, categories, notify]);

  // Add competitor
  const addCompetitor = useCallback(() => {
    if (!newAsin.trim()) return;
    const comp = {
      id: Date.now(),
      asin: newAsin.trim(),
      name: `Product ${newAsin.substring(0, 8)}`,
      addedDate: new Date().toLocaleDateString(),
      price: (Math.random() * 30 + 10).toFixed(2),
      bsr: Math.floor(Math.random() * 50000 + 1000),
      reviews: Math.floor(Math.random() * 2000 + 100),
      rating: (Math.random() * 1 + 4).toFixed(1),
    };
    setCompetitors(prev => [comp, ...prev]);
    setNewAsin('');
    notify('Competitor added!');
  }, [newAsin, notify]);

  const removeCompetitor = useCallback((id) => {
    setCompetitors(prev => prev.filter(c => c.id !== id));
    notify('Competitor removed');
  }, [notify]);

  // Toggle save/bundle
  const toggleSave = useCallback((p) => {
    setSaved(prev => prev.find(s => s.id === p.id) ? prev.filter(s => s.id !== p.id) : [...prev, p]);
  }, []);

  const isSaved = useCallback((id) => saved.some(s => s.id === id), [saved]);

  const toggleBundle = useCallback((p) => {
    setBundles(prev => prev.find(b => b.id === p.id) ? prev.filter(b => b.id !== p.id) : [...prev, p]);
  }, []);

  const inBundle = useCallback((id) => bundles.some(b => b.id === id), [bundles]);

  const saveCurrentBundle = useCallback(() => {
    if (bundles.length === 0) {
      notify('Add products to bundle first!', 'err');
      return;
    }
    const name = bundleName.trim() || `Bundle ${savedBundles.length + 1}`;
    const newBundle = {
      id: Date.now(),
      name,
      products: [...bundles],
      created: new Date().toLocaleDateString(),
      totalCost: bundles.reduce((sum, p) => sum + (p.price?.cost || 0), 0),
      bundlePrice: bundles.reduce((sum, p) => sum + (p.price?.sell || 0), 0) * 0.8,
    };
    setSavedBundles(prev => [...prev, newBundle]);
    setBundles([]);
    setBundleName('');
    notify(`Bundle "${name}" saved!`);
  }, [bundles, bundleName, savedBundles.length, notify]);

  const deleteSavedBundle = useCallback((id) => {
    setSavedBundles(prev => prev.filter(b => b.id !== id));
    notify('Bundle deleted');
  }, [notify]);

  const loadBundle = useCallback((bundle) => {
    setBundles(bundle.products);
    notify(`Loaded "${bundle.name}"`);
  }, [notify]);

  // Export functions
  const exportCSV = useCallback(() => {
    const csv = [
      ['Name', 'Category', 'Cost', 'Sell', 'Margin', 'ROI', 'BSR', 'Reviews', 'Competition', 'Score'].join(','),
      ...products.map(p => {
        const validation = getValidationScore(p);
        return [
          p.name,
          p.category,
          p.price?.cost || 0,
          p.price?.sell || 0,
          p.price?.margin || 0,
          p.price?.roi || 0,
          p.bsr?.rank || 'N/A',
          p.reviews?.count || 0,
          p.competition?.level || 'N/A',
          validation.score
        ].join(',');
      })
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ark-products-${Date.now()}.csv`;
    a.click();
    notify('CSV exported!');
  }, [products, notify]);

  // Login screen
  if (!auth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-3xl shadow-2xl mb-6">
              <Icon name="gift" size={48} className="text-white" />
            </div>
            <h1 className="text-4xl font-black text-white mb-2">Ark Bundle Hub</h1>
            <p className="text-purple-300">V3.0 Powerhouse Edition</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-3xl p-8 border border-white/20">
            <div className="space-y-4">
              <div className="relative">
                <Icon name="lock" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={pw}
                  onChange={e => setPw(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && pw === ADMIN_PASSWORD && setAuth(true)}
                  className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400"
                  placeholder="Enter password"
                />
                <button onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <Icon name={showPw ? 'eyeOff' : 'eye'} size={20} />
                </button>
              </div>
              <button
                onClick={() => pw === ADMIN_PASSWORD ? setAuth(true) : notify('Invalid password', 'err')}
                className="w-full py-4 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 text-white font-bold rounded-xl text-lg"
              >
                Access Powerhouse
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const calcResults = calculateFBA();

  // Main Dashboard
  return (
    <div className="min-h-screen bg-slate-100">
      {notif && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 text-white ${notif.t === 'err' ? 'bg-red-500' : 'bg-green-500'}`}>
          <Icon name="check" size={20} />
          {notif.m}
          <button onClick={() => setNotif(null)}><Icon name="x" size={18} /></button>
        </div>
      )}

      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white sticky top-0 z-40 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gradient-to-r from-amber-400 to-red-500 text-white px-5 py-2 rounded-xl font-black text-xl">
                <Icon name="gift" size={28} /> ARK
              </div>
              <div>
                <p className="font-bold text-lg">Powerhouse Intelligence</p>
                <p className="text-sm text-purple-300">TikTok • Instagram • Amazon • v3.0</p>
              </div>
            </div>
            <button onClick={() => setAuth(false)} className="p-3 rounded-xl bg-white/10 hover:bg-red-500">
              <Icon name="lock" size={20} />
            </button>
          </div>

          {/* Main Navigation */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button onClick={() => setActiveTab('discover')} className={`px-5 py-3 rounded-xl text-sm font-semibold whitespace-nowrap flex items-center gap-2 ${activeTab === 'discover' ? 'bg-amber-500 text-white' : 'bg-white/10 text-white/80'}`}>
              <Icon name="search" size={18} /> Discover
            </button>
            <button onClick={() => setActiveTab('calculator')} className={`px-5 py-3 rounded-xl text-sm font-semibold whitespace-nowrap flex items-center gap-2 ${activeTab === 'calculator' ? 'bg-blue-500 text-white' : 'bg-white/10 text-white/80'}`}>
              <Icon name="calculator" size={18} /> Profit Calc
            </button>
            <button onClick={() => setActiveTab('competitors')} className={`px-5 py-3 rounded-xl text-sm font-semibold whitespace-nowrap flex items-center gap-2 ${activeTab === 'competitors' ? 'bg-red-500 text-white' : 'bg-white/10 text-white/80'}`}>
              <Icon name="target" size={18} /> Competitors
            </button>
            <button onClick={() => setActiveTab('saved')} className={`px-5 py-3 rounded-xl text-sm font-semibold whitespace-nowrap flex items-center gap-2 ${activeTab === 'saved' ? 'bg-purple-500 text-white' : 'bg-white/10 text-white/80'}`}>
              <Icon name="bookmark" size={18} /> Saved ({saved.length})
            </button>
            <button onClick={() => setActiveTab('bundles')} className={`px-5 py-3 rounded-xl text-sm font-semibold whitespace-nowrap flex items-center gap-2 ${activeTab === 'bundles' ? 'bg-green-500 text-white' : 'bg-white/10 text-white/80'}`}>
              <Icon name="layers" size={18} /> Bundles ({savedBundles.length})
            </button>
          </div>
        </div>
      </header>

      {status && (
        <div className="bg-amber-500 text-slate-900 py-2 px-4 font-medium flex items-center gap-2 justify-center">
          <Icon name="loader" size={18} className="animate-spin" />
          {status}
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* DISCOVER TAB */}
        {activeTab === 'discover' && (
          <div>
            {/* Search Bar */}
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Icon name="search" size={22} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && scan(searchTerm)}
                    placeholder="Search for products..."
                    className="w-full pl-14 pr-4 py-4 rounded-xl bg-slate-50 text-slate-800 placeholder-slate-400 border-2 border-slate-200 focus:border-amber-500 outline-none"
                  />
                </div>
                <button
                  onClick={() => scan(searchTerm)}
                  disabled={scanning}
                  className="px-10 py-4 bg-gradient-to-r from-amber-400 to-red-500 text-white font-bold rounded-xl disabled:opacity-50 flex items-center gap-3"
                >
                  {scanning ? <Icon name="loader" size={24} className="animate-spin" /> : <Icon name="search" size={24} />}
                  {scanning ? 'Searching...' : 'Search'}
                </button>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-2xl p-4 shadow-lg mb-6">
              <div className="flex gap-2 overflow-x-auto">
                {categories.map(c => (
                  <button
                    key={c.id}
                    onClick={() => { setSelectedCategory(c.id); scan('', c); }}
                    disabled={scanning}
                    className={`px-5 py-3 rounded-xl text-sm font-semibold whitespace-nowrap ${selectedCategory === c.id ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6 text-red-700">
                <div className="flex items-center gap-2">
                  <Icon name="alert" size={20} />
                  {error}
                </div>
              </div>
            )}

            {/* Products Grid */}
            {products.length === 0 && !scanning && !error && (
              <div className="text-center py-20">
                <Icon name="gift" size={64} className="mx-auto text-amber-400 mb-4" />
                <p className="text-slate-500 text-lg">Select a category or search to find products</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(p => {
                const validation = getValidationScore(p);
                const isExpanded = expanded === p.id;
                return (
                  <div key={p.id} className="bg-white rounded-2xl border-2 border-slate-200 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    {/* Validation Score Bar */}
                    <div className={`h-2 bg-gradient-to-r ${validation.color === 'green' ? 'from-green-500 to-emerald-500' : validation.color === 'blue' ? 'from-blue-500 to-cyan-500' : validation.color === 'yellow' ? 'from-yellow-500 to-orange-500' : 'from-red-500 to-rose-500'}`} />
                    
                    <div className="p-5">
                      {/* Header */}
                      <div className="flex justify-between items-start gap-3 mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-3xl">{p.emoji || '📦'}</span>
                            <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full">{p.category}</span>
                          </div>
                          <h3 className="font-bold text-slate-800 text-lg mb-1">{p.name}</h3>
                          {p.asin && <p className="text-xs text-slate-500">ASIN: {p.asin}</p>}
                        </div>
                        <div className="text-center">
                          <div className={`text-2xl font-black ${validation.color === 'green' ? 'text-green-600' : validation.color === 'blue' ? 'text-blue-600' : validation.color === 'yellow' ? 'text-yellow-600' : 'text-red-600'}`}>
                            {validation.score}
                          </div>
                          <div className="text-xs text-slate-500">{validation.rating}</div>
                        </div>
                      </div>

                      <p className="text-slate-600 text-sm mb-4">{p.desc}</p>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="bg-blue-50 p-3 rounded-xl">
                          <div className="text-xs text-slate-500">BSR Rank</div>
                          <div className="font-bold text-blue-700">#{(p.bsr?.rank || 0).toLocaleString()}</div>
                        </div>
                        <div className="bg-green-50 p-3 rounded-xl">
                          <div className="text-xs text-slate-500">Margin</div>
                          <div className="font-bold text-green-700">{p.price?.margin || 0}%</div>
                        </div>
                      </div>

                      {/* Expandable Details */}
                      {isExpanded && (
                        <div className="mb-4 space-y-3 border-t-2 border-slate-100 pt-4">
                          {/* Pricing Grid */}
                          <div className="bg-slate-50 rounded-xl p-4">
                            <h4 className="font-bold text-slate-700 mb-3 text-sm">💰 Pricing Breakdown</h4>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <div>
                                <span className="text-slate-500">Cost:</span>
                                <span className="font-bold text-slate-800 ml-2">${p.price?.cost || 0}</span>
                              </div>
                              <div>
                                <span className="text-slate-500">Sell:</span>
                                <span className="font-bold text-green-600 ml-2">${p.price?.sell || 0}</span>
                              </div>
                              <div>
                                <span className="text-slate-500">Margin:</span>
                                <span className="font-bold text-blue-600 ml-2">{p.price?.margin || 0}%</span>
                              </div>
                              <div>
                                <span className="text-slate-500">ROI:</span>
                                <span className="font-bold text-purple-600 ml-2">{p.price?.roi || 0}%</span>
                              </div>
                            </div>
                          </div>

                          {/* Competition & Reviews */}
                          <div className="grid grid-cols-2 gap-2">
                            <div className="bg-orange-50 rounded-xl p-3">
                              <div className="text-xs text-slate-500">Competition</div>
                              <div className={`font-bold text-sm ${p.competition?.level === 'Low' ? 'text-green-600' : p.competition?.level === 'Medium' ? 'text-orange-600' : 'text-red-600'}`}>
                                {p.competition?.level || 'N/A'}
                              </div>
                              <div className="text-xs text-slate-500">{p.competition?.sellers || 0} sellers</div>
                            </div>
                            <div className="bg-yellow-50 rounded-xl p-3">
                              <div className="text-xs text-slate-500">Reviews</div>
                              <div className="font-bold text-sm text-yellow-700">⭐ {p.reviews?.rating || 'N/A'}</div>
                              <div className="text-xs text-slate-500">{(p.reviews?.count || 0).toLocaleString()} reviews</div>
                            </div>
                          </div>

                          {/* Suppliers */}
                          {(p.suppliers?.alibaba || p.suppliers?.cj) && (
                            <div className="bg-purple-50 rounded-xl p-3">
                              <h4 className="font-bold text-purple-700 mb-2 text-sm">🏭 Suppliers</h4>
                              <div className="grid grid-cols-2 gap-2 text-xs">
                                {p.suppliers?.alibaba && (
                                  <div>
                                    <span className="text-slate-600">Alibaba:</span>
                                    <span className="font-bold text-purple-600 ml-1">${p.suppliers.alibaba}</span>
                                  </div>
                                )}
                                {p.suppliers?.cj && (
                                  <div>
                                    <span className="text-slate-600">CJ:</span>
                                    <span className="font-bold text-purple-600 ml-1">${p.suppliers.cj}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}

                          {/* Profitability */}
                          {p.profitability && (
                            <div className="bg-green-50 rounded-xl p-3">
                              <h4 className="font-bold text-green-700 mb-2 text-sm">📊 Profit Potential</h4>
                              <div className="space-y-1 text-xs">
                                <div className="flex justify-between">
                                  <span className="text-slate-600">Break-even:</span>
                                  <span className="font-bold">{p.profitability.breakeven} units</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-600">Monthly:</span>
                                  <span className="font-bold text-green-600">${p.profitability.monthly?.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-slate-600">Yearly:</span>
                                  <span className="font-bold text-green-700">${p.profitability.yearly?.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Quick Links */}
                          <div className="flex gap-2">
                            {p.asin && (
                              <a href={`https://amazon.com/dp/${p.asin}`} target="_blank" rel="noopener noreferrer" className="flex-1 py-2 px-3 bg-orange-500 text-white text-xs font-bold rounded-lg text-center hover:bg-orange-600">
                                View on Amazon
                              </a>
                            )}
                            <a href={`https://alibaba.com/trade/search?SearchText=${encodeURIComponent(p.name)}`} target="_blank" rel="noopener noreferrer" className="flex-1 py-2 px-3 bg-blue-500 text-white text-xs font-bold rounded-lg text-center hover:bg-blue-600">
                              Find Supplier
                            </a>
                          </div>
                        </div>
                      )}

                      {/* Expand Button */}
                      <button 
                        onClick={() => setExpanded(isExpanded ? null : p.id)}
                        className="w-full py-2 mb-3 text-xs text-slate-500 hover:text-slate-700 flex items-center justify-center gap-1"
                      >
                        {isExpanded ? (
                          <>Less Details <Icon name="chevronUp" size={14} /></>
                        ) : (
                          <>More Details <Icon name="chevronDown" size={14} /></>
                        )}
                      </button>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button onClick={() => toggleBundle(p)} className={`flex-1 py-3 rounded-xl font-bold ${inBundle(p.id) ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-700'}`}>
                          {inBundle(p.id) ? '✓ Added' : '+ Bundle'}
                        </button>
                        <button onClick={() => toggleSave(p)} className={`p-3 rounded-xl ${isSaved(p.id) ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 text-slate-600'}`}>
                          <Icon name="bookmark" size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {products.length > 0 && (
              <div className="mt-6 flex justify-center">
                <button onClick={exportCSV} className="px-6 py-3 bg-slate-800 text-white rounded-xl font-bold flex items-center gap-2">
                  <Icon name="download" size={20} />
                  Export to CSV
                </button>
              </div>
            )}
          </div>
        )}

        {/* CALCULATOR TAB */}
        {activeTab === 'calculator' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
                <Icon name="calculator" size={32} className="text-blue-600" />
                Advanced FBA Profit Calculator
              </h2>

              {/* Input Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Product Cost ($)</label>
                  <input
                    type="number"
                    value={calc.cost}
                    onChange={e => setCalc({...calc, cost: parseFloat(e.target.value) || 0})}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Sell Price ($)</label>
                  <input
                    type="number"
                    value={calc.sellPrice}
                    onChange={e => setCalc({...calc, sellPrice: parseFloat(e.target.value) || 0})}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Weight (lbs)</label>
                  <input
                    type="number"
                    value={calc.weight}
                    onChange={e => setCalc({...calc, weight: parseFloat(e.target.value) || 0})}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Size Tier</label>
                  <select
                    value={calc.size}
                    onChange={e => setCalc({...calc, size: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 outline-none"
                  >
                    <option value="standard">Standard</option>
                    <option value="oversize">Oversize</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">PPC Launch Budget ($)</label>
                  <input
                    type="number"
                    value={calc.ppcBudget}
                    onChange={e => setCalc({...calc, ppcBudget: parseFloat(e.target.value) || 0})}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              {/* Results */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-800 mb-4">Calculation Results</h3>
                
                {/* Fee Breakdown */}
                <div className="bg-slate-50 rounded-xl p-6">
                  <h4 className="font-bold text-slate-700 mb-4">Fee Breakdown</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Amazon Referral (15%)</span>
                      <span className="font-bold text-slate-800">${calcResults.referralFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">FBA Fulfillment</span>
                      <span className="font-bold text-slate-800">${calcResults.fbaFee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Monthly Storage</span>
                      <span className="font-bold text-slate-800">${calcResults.storageFee}</span>
                    </div>
                    <div className="border-t-2 border-slate-200 pt-2 mt-2 flex justify-between">
                      <span className="font-bold text-slate-700">Total Fees</span>
                      <span className="font-bold text-red-600">${calcResults.totalFees}</span>
                    </div>
                  </div>
                </div>

                {/* Profitability */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                    <div className="text-sm text-green-600 mb-1">Net Profit/Unit</div>
                    <div className="text-3xl font-black text-green-700">${calcResults.profit}</div>
                  </div>
                  <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                    <div className="text-sm text-blue-600 mb-1">Profit Margin</div>
                    <div className="text-3xl font-black text-blue-700">{calcResults.margin}%</div>
                  </div>
                  <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
                    <div className="text-sm text-purple-600 mb-1">ROI</div>
                    <div className="text-3xl font-black text-purple-700">{calcResults.roi}%</div>
                  </div>
                </div>

                {/* Projections */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-orange-200 rounded-xl p-6">
                  <h4 className="font-bold text-orange-700 mb-4">Revenue Projections</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700">Break-Even Units (PPC budget)</span>
                      <span className="text-2xl font-black text-orange-600">{calcResults.breakEvenUnits} units</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700">Monthly Profit (300 units)</span>
                      <span className="text-2xl font-black text-green-600">${calcResults.monthlyProfit}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-700">Yearly Profit (3,600 units)</span>
                      <span className="text-2xl font-black text-green-600">${calcResults.yearlyProfit}</span>
                    </div>
                  </div>
                </div>

                {/* Recommendation */}
                <div className={`border-2 rounded-xl p-6 ${parseFloat(calcResults.margin) > 40 ? 'bg-green-50 border-green-200' : parseFloat(calcResults.margin) > 25 ? 'bg-yellow-50 border-yellow-200' : 'bg-red-50 border-red-200'}`}>
                  <div className="flex items-center gap-3 mb-2">
                    <Icon name="award" size={24} className={parseFloat(calcResults.margin) > 40 ? 'text-green-600' : parseFloat(calcResults.margin) > 25 ? 'text-yellow-600' : 'text-red-600'} />
                    <h4 className="font-bold text-lg">Recommendation</h4>
                  </div>
                  <p className={`${parseFloat(calcResults.margin) > 40 ? 'text-green-700' : parseFloat(calcResults.margin) > 25 ? 'text-yellow-700' : 'text-red-700'}`}>
                    {parseFloat(calcResults.margin) > 40 ? '✅ Excellent margins! This product has strong profit potential.' : 
                     parseFloat(calcResults.margin) > 25 ? '⚠️ Acceptable margins. Consider negotiating better supplier pricing.' :
                     '❌ Low margins. This product may not be profitable after PPC costs.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* COMPETITORS TAB */}
        {activeTab === 'competitors' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
                <Icon name="target" size={32} className="text-red-600" />
                Competitor Tracker
              </h2>

              {/* Add Competitor */}
              <div className="bg-slate-50 rounded-xl p-6 mb-8">
                <h3 className="font-bold text-slate-700 mb-4">Add Competitor ASIN</h3>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newAsin}
                    onChange={e => setNewAsin(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addCompetitor()}
                    placeholder="Enter ASIN (e.g., B08XYZ123)"
                    className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-red-500 outline-none"
                  />
                  <button onClick={addCompetitor} className="px-8 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600">
                    <Icon name="plus" size={20} />
                  </button>
                </div>
              </div>

              {/* Competitors List */}
              {competitors.length === 0 ? (
                <div className="text-center py-12">
                  <Icon name="target" size={64} className="mx-auto text-slate-300 mb-4" />
                  <p className="text-slate-500">No competitors tracked yet. Add an ASIN above to start monitoring.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {competitors.map(comp => (
                    <div key={comp.id} className="bg-slate-50 rounded-xl p-6 flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-800 mb-1">{comp.name}</h4>
                        <p className="text-sm text-slate-500 mb-3">ASIN: {comp.asin} • Added: {comp.addedDate}</p>
                        <div className="grid grid-cols-4 gap-4">
                          <div>
                            <div className="text-xs text-slate-500">Price</div>
                            <div className="font-bold text-green-600">${comp.price}</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-500">BSR</div>
                            <div className="font-bold text-blue-600">#{comp.bsr.toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-500">Reviews</div>
                            <div className="font-bold text-purple-600">{comp.reviews}</div>
                          </div>
                          <div>
                            <div className="text-xs text-slate-500">Rating</div>
                            <div className="font-bold text-orange-600">⭐ {comp.rating}</div>
                          </div>
                        </div>
                      </div>
                      <button onClick={() => removeCompetitor(comp.id)} className="ml-4 p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200">
                        <Icon name="x" size={20} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* SAVED TAB */}
        {activeTab === 'saved' && (
          <div>
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
              <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                <Icon name="bookmark" size={32} className="text-purple-600" />
                Saved Products ({saved.length})
              </h2>
            </div>

            {saved.length === 0 ? (
              <div className="text-center py-20">
                <Icon name="bookmark" size={64} className="mx-auto text-slate-300 mb-4" />
                <p className="text-slate-500 text-lg">No saved products yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {saved.map(p => {
                  const validation = getValidationScore(p);
                  return (
                    <div key={p.id} className="bg-white rounded-2xl border-2 border-purple-200 shadow-lg p-5">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <span className="text-2xl">{p.emoji}</span>
                          <h3 className="font-bold text-slate-800 mt-2">{p.name}</h3>
                        </div>
                        <div className="text-2xl font-black text-purple-600">{validation.score}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="bg-slate-50 p-2 rounded text-center">
                          <div className="text-xs text-slate-500">Margin</div>
                          <div className="font-bold">{p.price?.margin}%</div>
                        </div>
                        <div className="bg-slate-50 p-2 rounded text-center">
                          <div className="text-xs text-slate-500">BSR</div>
                          <div className="font-bold">#{(p.bsr?.rank || 0).toLocaleString()}</div>
                        </div>
                      </div>
                      <button onClick={() => toggleSave(p)} className="w-full py-2 bg-purple-100 text-purple-600 rounded-xl font-bold">
                        Remove
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* BUNDLES TAB */}
        {activeTab === 'bundles' && (
          <div>
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                  <Icon name="layers" size={32} className="text-green-600" />
                  Bundle Builder
                </h2>
                <div className="text-sm text-slate-500">
                  Current: {bundles.length} items | Saved: {savedBundles.length} bundles
                </div>
              </div>
            </div>

            {/* Current Bundle Being Built */}
            {bundles.length > 0 && (
              <div className="mb-6">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 mb-4">
                  <h3 className="text-lg font-bold text-green-800 mb-4">📦 Current Bundle (Unsaved)</h3>
                  
                  {/* Bundle Name Input */}
                  <div className="mb-4">
                    <input
                      type="text"
                      value={bundleName}
                      onChange={e => setBundleName(e.target.value)}
                      placeholder="Enter bundle name (optional)"
                      className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:border-green-500 outline-none"
                    />
                  </div>

                  {/* Bundle Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="bg-white rounded-xl p-4 border border-green-200">
                      <div className="text-sm text-green-600 mb-1">Items</div>
                      <div className="text-2xl font-black text-green-700">{bundles.length}</div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-green-200">
                      <div className="text-sm text-green-600 mb-1">Total Cost</div>
                      <div className="text-2xl font-black text-green-700">
                        ${bundles.reduce((sum, p) => sum + (p.price?.cost || 0), 0).toFixed(2)}
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-green-200">
                      <div className="text-sm text-green-600 mb-1">Bundle Price (20% off)</div>
                      <div className="text-2xl font-black text-green-700">
                        ${(bundles.reduce((sum, p) => sum + (p.price?.sell || 0), 0) * 0.8).toFixed(2)}
                      </div>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-green-200">
                      <div className="text-sm text-green-600 mb-1">Bundle Profit</div>
                      <div className="text-2xl font-black text-green-700">
                        ${(bundles.reduce((sum, p) => sum + (p.price?.sell || 0), 0) * 0.8 - bundles.reduce((sum, p) => sum + (p.price?.cost || 0), 0) - (bundles.reduce((sum, p) => sum + (p.price?.sell || 0), 0) * 0.8 * 0.15) - 5).toFixed(2)}
                      </div>
                    </div>
                  </div>

                  {/* Save Bundle Button */}
                  <button
                    onClick={saveCurrentBundle}
                    className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl flex items-center justify-center gap-2"
                  >
                    <Icon name="check" size={20} />
                    Save This Bundle
                  </button>
                </div>

                {/* Current Bundle Items */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {bundles.map(p => (
                    <div key={p.id} className="bg-white rounded-xl border-2 border-green-200 shadow p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <span className="text-2xl">{p.emoji}</span>
                          <h4 className="font-bold text-slate-800 text-sm mt-1">{p.name}</h4>
                        </div>
                        <button onClick={() => toggleBundle(p)} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200">
                          <Icon name="x" size={16} />
                        </button>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-slate-50 p-2 rounded text-center">
                          <div className="text-slate-500">Cost</div>
                          <div className="font-bold">${p.price?.cost}</div>
                        </div>
                        <div className="bg-slate-50 p-2 rounded text-center">
                          <div className="text-slate-500">Sell</div>
                          <div className="font-bold">${p.price?.sell}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {bundles.length === 0 && savedBundles.length === 0 && (
              <div className="text-center py-20">
                <Icon name="layers" size={64} className="mx-auto text-slate-300 mb-4" />
                <p className="text-slate-500 text-lg mb-2">No bundles yet</p>
                <p className="text-slate-400 text-sm">Go to Discover tab and click "+ Bundle" on products</p>
              </div>
            )}

            {/* Saved Bundles */}
            {savedBundles.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Icon name="bookmark" size={24} />
                  Saved Bundles ({savedBundles.length})
                </h3>
                <div className="space-y-4">
                  {savedBundles.map(bundle => (
                    <div key={bundle.id} className="bg-white rounded-2xl border-2 border-slate-200 shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-bold text-slate-800">{bundle.name}</h4>
                          <p className="text-sm text-slate-500">Created: {bundle.created} • {bundle.products.length} items</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => loadBundle(bundle)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-600 flex items-center gap-2"
                          >
                            <Icon name="layers" size={16} />
                            Load
                          </button>
                          <button
                            onClick={() => deleteSavedBundle(bundle.id)}
                            className="px-4 py-2 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600"
                          >
                            <Icon name="x" size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Bundle Summary */}
                      <div className="grid grid-cols-4 gap-3 mb-4">
                        <div className="bg-blue-50 rounded-lg p-3 text-center">
                          <div className="text-xs text-blue-600">Items</div>
                          <div className="text-lg font-bold text-blue-700">{bundle.products.length}</div>
                        </div>
                        <div className="bg-red-50 rounded-lg p-3 text-center">
                          <div className="text-xs text-red-600">Cost</div>
                          <div className="text-lg font-bold text-red-700">${bundle.totalCost.toFixed(2)}</div>
                        </div>
                        <div className="bg-green-50 rounded-lg p-3 text-center">
                          <div className="text-xs text-green-600">Price</div>
                          <div className="text-lg font-bold text-green-700">${bundle.bundlePrice.toFixed(2)}</div>
                        </div>
                        <div className="bg-purple-50 rounded-lg p-3 text-center">
                          <div className="text-xs text-purple-600">Profit</div>
                          <div className="text-lg font-bold text-purple-700">
                            ${(bundle.bundlePrice - bundle.totalCost - (bundle.bundlePrice * 0.15) - 5).toFixed(2)}
                          </div>
                        </div>
                      </div>

                      {/* Bundle Products */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {bundle.products.map(p => (
                          <div key={p.id} className="bg-slate-50 rounded-lg p-2">
                            <div className="text-lg mb-1">{p.emoji}</div>
                            <div className="text-xs font-semibold text-slate-700 truncate">{p.name}</div>
                            <div className="text-xs text-slate-500">${p.price?.sell}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
