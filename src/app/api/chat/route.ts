import { NextRequest, NextResponse } from 'next/server';

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const { messages, systemPrompt } = await request.json();

    if (!Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages format' }, { status: 400 });
    }

    const openRouterApiKey = process.env.OPENROUTER_API_KEY;
    if (!openRouterApiKey) {
      return NextResponse.json({ error: 'OpenRouter API key not configured' }, { status: 500 });
    }

    // Construct the messages array with system prompt
    // If messages is empty, we're starting the conversation - add a starter prompt
    let formattedMessages: ChatMessage[] = [
      { role: 'system', content: systemPrompt || 'You are an emergency dispatcher training system.' }
    ];
    
    // If there are existing messages, add them; otherwise add a system instruction to start
    if (messages.length === 0) {
      formattedMessages.push({
        role: 'user',
        content: 'Start the conversation by calling emergency services as your character would.'
      });
    } else {
      formattedMessages.push(...messages);
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openRouterApiKey}`,
        'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || '',
        'X-Title': 'Emergency Simulation Training'
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-20b:free',
        messages: formattedMessages,
        max_tokens: 1000,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json({ error: `OpenRouter API error: ${error}` }, { status: response.status });
    }

    const data = await response.json();
    
    return NextResponse.json({
      message: data.choices[0]?.message?.content || 'No response from model'
    });
  } catch (error) {
    console.error('Error calling OpenRouter API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

