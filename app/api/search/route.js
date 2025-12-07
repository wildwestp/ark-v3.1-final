// ARK Bundle Hub - Search API Route
// Handles product search using Anthropic Claude API

import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Initialize Anthropic client
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    // Call Claude API with web search enabled
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      tools: [
        {
          type: 'web_search_20250305',
          name: 'web_search'
        }
      ],
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    // Extract text content from response
    let responseText = '';
    for (const block of message.content) {
      if (block.type === 'text') {
        responseText += block.text;
      }
    }

    // Return the response
    return NextResponse.json({
      success: true,
      data: responseText
    });

  } catch (error) {
    console.error('API Error:', error);
    
    // Handle rate limit errors specifically
    if (error.type === 'rate_limit_error') {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded',
          message: 'Too many requests. Please wait 60 seconds and try again.',
          type: 'rate_limit_error',
          retryAfter: 60
        },
        { status: 429 }
      );
    }
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error.message,
        type: error.type || 'unknown'
      },
      { status: 500 }
    );
  }
}
