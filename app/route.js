// ARK V5.1 - Debug Route (Version 2)
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { prompt } = await request.json();
    
    console.log('🔍 ARK V2: Starting search...');
    console.log('🔑 Key exists:', !!process.env.PERPLEXITY_API_KEY);
    console.log('🔑 Key length:', process.env.PERPLEXITY_API_KEY?.length);
    console.log('🔑 Key starts with pplx:', process.env.PERPLEXITY_API_KEY?.startsWith('pplx'));
    console.log('🔑 Key first 10 chars:', process.env.PERPLEXITY_API_KEY?.substring(0, 10));

    if (!process.env.PERPLEXITY_API_KEY) {
      return NextResponse.json(
        { error: 'PERPLEXITY_API_KEY not found' },
        { status: 500 }
      );
    }

    // Clean the key (remove any whitespace)
    const cleanKey = process.env.PERPLEXITY_API_KEY.trim();
    console.log('🧹 Cleaned key length:', cleanKey.length);

    console.log('📡 Calling Perplexity...');

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${cleanKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-large-128k-online',
        messages: [
          {
            role: 'system',
            content: 'Return only valid JSON arrays. No markdown.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000,
        top_p: 0.9,
        stream: false
      })
    });

    console.log('📊 Status:', response.status);
    console.log('📊 Status Text:', response.statusText);
    console.log('📊 Headers:', Object.fromEntries(response.headers.entries()));

    // Get response as text first to see what we're getting
    const responseText = await response.text();
    console.log('📝 Raw response:', responseText.substring(0, 200));

    if (!response.ok) {
      console.error('❌ API Error:', responseText);
      
      return NextResponse.json(
        {
          error: `Perplexity Error (${response.status})`,
          details: responseText,
          debug: {
            status: response.status,
            statusText: response.statusText,
            hasKey: !!process.env.PERPLEXITY_API_KEY,
            keyLength: cleanKey.length,
            keyStart: cleanKey.substring(0, 10),
            responsePreview: responseText.substring(0, 500)
          }
        },
        { status: 500 }
      );
    }

    // Parse the JSON
    let data;
    try {
      data = JSON.parse(responseText);
      console.log('✅ JSON parsed successfully');
    } catch (parseError) {
      console.error('❌ JSON Parse Error:', parseError.message);
      return NextResponse.json(
        {
          error: 'Failed to parse Perplexity response',
          details: parseError.message,
          rawResponse: responseText.substring(0, 500)
        },
        { status: 500 }
      );
    }

    let content = data.choices[0]?.message?.content || '[]';
    content = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    console.log('✅ Success!');

    return NextResponse.json({
      success: true,
      data: content,
      cached: false,
      searchEnabled: true,
      version: 2
    });

  } catch (error) {
    console.error('❌ Caught Exception:', error);
    return NextResponse.json(
      {
        error: error.message,
        stack: error.stack,
        type: 'exception'
      },
      { status: 500 }
    );
  }
}
