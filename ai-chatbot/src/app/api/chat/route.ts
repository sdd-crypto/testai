import { NextRequest, NextResponse } from 'next/server';
import { Message, getPerplexityCompletion } from '@/utils/perplexity';

export async function POST(req: NextRequest) {
  try {
    const { messages, temperature = 0.7, max_tokens = 4000 } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages are required and must be an array' },
        { status: 400 }
      );
    }

    const response = await getPerplexityCompletion(
      messages,
      temperature,
      max_tokens
    );

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error in chat API route:', error);
    return NextResponse.json(
      { error: 'Failed to get AI response' },
      { status: 500 }
    );
  }
}