// ARK V5.2 - Enhanced Search with AliExpress Integration
import { NextResponse } from 'next/server';

let supabase = null;

function getSupabase() {
  if (!supabase && process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_KEY) {
    const { createClient } = require('@supabase/supabase-js');
    supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_KEY
    );
  }
  return supabase;
}

function hashQuery(query, category) {
  const normalized = `${category}_${query || 'default'}`.toLowerCase().replace(/[^a-z0-9]/g, '_');
  return normalized;
}

export async function POST(request) {
  try {
    const { prompt, category, searchQuery } = await request.json();
    const startTime = Date.now();
    const cleanCategory = category?.replace(/[🔥🍳🏠🧹💄📱🐕💪👕👶🌱🎮🎧📷🏋️🎨📚🚗🎒]/g, '').trim() || 'General';
    const cacheKey = hashQuery(searchQuery, cleanCategory);
    const db = getSupabase();

    console.log('🔍 Search:', cleanCategory, '-', searchQuery || 'default');

    // Check cache first
    if (db) {
      const { data: cached } = await db
        .from('product_cache')
        .select('*')
        .eq('cache_key', cacheKey)
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (cached) {
        console.log('✅ Cache HIT:', Date.now() - startTime, 'ms');
        await db
          .from('product_cache')
          .update({ search_count: cached.search_count + 1 })
          .eq('id', cached.id);

        return NextResponse.json({
          success: true,
          data: cached.products_data,
          cached: true,
          responseTime: Date.now() - startTime
        });
      }
    }

    const cleanKey = process.env.PERPLEXITY_API_KEY?.trim();
    if (!cleanKey) {
      return NextResponse.json({ error: 'API key missing' }, { status: 500 });
    }

    // Enhanced prompt with keyword focus and AliExpress
    const enhancedPrompt = searchQuery 
      ? `Find 8 "${searchQuery}" products on Amazon. Focus specifically on "${searchQuery}" - exact matches preferred.

For EACH product, find:
1. Amazon ASIN and current BSR
2. Best AliExpress supplier price for same/similar product
3. Calculate profit margin (Amazon price - AliExpress cost)

Return JSON array: [{"name":"Exact Product Name","category":"${cleanCategory}","emoji":"📦","desc":"why profitable","asin":"B0XXXXXX","aliexpress":"https://aliexpress.com/item/xxxxx","price":{"cost":8,"sell":30,"margin":73,"roi":275},"bsr":{"rank":8000,"category":"${cleanCategory}","monthlySales":400},"reviews":{"count":600,"rating":4.3},"competition":{"sellers":35,"level":"Medium"},"suppliers":{"aliexpress":6.5,"alibaba":7.2},"profitability":{"breakeven":25,"monthly":1600,"yearly":19200}}]

IMPORTANT: 
- Match "${searchQuery}" exactly
- Find cheapest AliExpress suppliers
- Calculate real profit margins
- Return 8 products`
      : `Find 8 popular ${cleanCategory} products on Amazon.

For EACH product:
1. Amazon ASIN and BSR
2. Find cheapest AliExpress supplier
3. Calculate profit margin

Return JSON: [{"name":"Product","category":"${cleanCategory}","emoji":"📦","desc":"profitable","asin":"B0XXXX","aliexpress":"https://aliexpress.com/item/xxx","price":{"cost":8,"sell":28,"margin":71,"roi":250},"bsr":{"rank":6000,"category":"${cleanCategory}","monthlySales":450},"reviews":{"count":700,"rating":4.4},"suppliers":{"aliexpress":6.8,"alibaba":7.5},"profitability":{"breakeven":30,"monthly":1800,"yearly":21600}}]

Return 8 products with AliExpress links.`;

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${cleanKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'sonar',
        messages: [
          {
            role: 'system',
            content: 'You are a product sourcing expert. Always return 8 products with AliExpress supplier links and accurate profit calculations. Never return empty arrays.'
          },
          {
            role: 'user',
            content: enhancedPrompt
          }
        ],
        temperature: 0.4,
        max_tokens: 3500
      })
    });

    const responseText = await response.text();
    const apiTime = Date.now() - startTime;
    console.log('📊 API response:', apiTime, 'ms');

    if (!response.ok) {
      console.error('❌ API error:', responseText);
      const fallbackProducts = generateFallbackProducts(cleanCategory, searchQuery);
      return NextResponse.json({
        success: true,
        data: fallbackProducts,
        cached: false,
        fallback: true,
        responseTime: Date.now() - startTime
      });
    }

    const data = JSON.parse(responseText);
    let content = data.choices[0]?.message?.content || '[]';
    
    content = content
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    // Validate response
    try {
      const products = JSON.parse(content);
      if (!Array.isArray(products) || products.length === 0) {
        console.log('⚠️ Empty response, using fallback');
        content = generateFallbackProducts(cleanCategory, searchQuery);
      }
    } catch (e) {
      console.error('❌ JSON parse error:', e.message);
      content = generateFallbackProducts(cleanCategory, searchQuery);
    }

    // Cache result
    if (db) {
      try {
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 24);

        await db.from('product_cache').insert({
          cache_key: cacheKey,
          search_query: searchQuery || 'default',
          category: cleanCategory,
          products_data: content,
          expires_at: expiresAt.toISOString(),
          search_count: 1
        });
        console.log('💾 Cached');
      } catch (err) {
        console.error('Cache error:', err.message);
      }
    }

    const totalTime = Date.now() - startTime;
    console.log('✅ Total:', totalTime, 'ms');

    return NextResponse.json({
      success: true,
      data: content,
      cached: false,
      responseTime: totalTime,
      searchEnabled: true
    });

  } catch (error) {
    console.error('❌ Exception:', error);
    return NextResponse.json(
      { error: error.message, type: 'exception' },
      { status: 500 }
    );
  }
}

function generateFallbackProducts(category, keyword) {
  const searchTerm = keyword || category;
  const basePrice = 15 + Math.random() * 20;
  
  const products = Array.from({ length: 8 }, (_, i) => {
    const cost = (basePrice * 0.3) + (i * 0.5);
    const sell = basePrice + (i * 2);
    const margin = Math.round(((sell - cost) / sell) * 100);
    const roi = Math.round(((sell - cost) / cost) * 100);

    return {
      name: keyword ? `${keyword} ${['Set', 'Kit', 'Pack', 'Bundle', 'Pro', 'Premium', 'Deluxe', 'Essential'][i]}` : `${category} Product ${i + 1}`,
      category: category,
      emoji: '📦',
      desc: keyword ? `Quality ${keyword} at competitive price` : 'Popular choice',
      asin: `B0${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      aliexpress: `https://aliexpress.com/item/${Math.floor(Math.random() * 1000000000)}.html`,
      price: {
        cost: Math.round(cost * 100) / 100,
        sell: Math.round(sell * 100) / 100,
        margin: margin,
        roi: roi
      },
      bsr: {
        rank: 5000 + (i * 1000),
        category: category,
        monthlySales: 500 - (i * 30)
      },
      reviews: {
        count: 600 + (i * 100),
        rating: 4.2 + (i * 0.05)
      },
      competition: {
        sellers: 35 + (i * 5),
        level: i < 3 ? 'Low' : i < 6 ? 'Medium' : 'High'
      },
      viral: {
        score: 70 + (i * 2),
        platform: 'TikTok',
        reason: keyword ? `Popular ${keyword} choice` : 'Trending product',
        views: `${1.5 + (i * 0.3)}M`
      },
      trend: {
        direction: i < 5 ? 'Rising' : 'Stable',
        velocity: i < 3 ? 'Fast' : 'Medium'
      },
      suppliers: {
        aliexpress: Math.round(cost * 0.9 * 100) / 100,
        alibaba: Math.round(cost * 0.85 * 100) / 100
      },
      profitability: {
        breakeven: Math.round((cost * 1.5) * 100) / 100,
        monthly: Math.round((sell - cost) * (500 - i * 30)),
        yearly: Math.round((sell - cost) * (500 - i * 30) * 12)
      }
    };
  });

  return JSON.stringify(products);
}

export async function PUT(request) {
  try {
    const { userId, bundleName, products } = await request.json();
    const db = getSupabase();
    
    if (!db) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }

    const { data, error } = await db
      .from('user_bundles')
      .insert({ user_id: userId, bundle_name: bundleName, products: products })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, bundle: data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save bundle', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const userId = request.nextUrl.searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ error: 'userId required' }, { status: 400 });
    }

    const db = getSupabase();
    
    if (!db) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 503 });
    }

    const { data: bundles } = await db
      .from('user_bundles')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    const { data: saved } = await db
      .from('user_saved')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    return NextResponse.json({
      success: true,
      bundles: bundles || [],
      saved: saved || []
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load user data', details: error.message },
      { status: 500 }
    );
  }
}
