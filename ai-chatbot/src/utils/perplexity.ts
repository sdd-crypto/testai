import axios from 'axios';

export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatCompletionRequest {
  model: string;
  messages: Message[];
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

export interface ChatCompletionResponse {
  id: string;
  choices: {
    index: number;
    message: Message;
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export async function getPerplexityCompletion(
  messages: Message[],
  temperature: number = 0.7,
  max_tokens: number = 4000
): Promise<string> {
  try {
    const response = await axios.post<ChatCompletionResponse>(
      'https://api.perplexity.ai/chat/completions',
      {
        model: process.env.PERPLEXITY_MODEL || 'sonar-pro',
        messages,
        temperature,
        max_tokens,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling Perplexity API:', error);
    throw new Error('Failed to get response from AI');
  }
}

// Function to handle streaming responses
export async function* streamPerplexityCompletion(
  messages: Message[],
  temperature: number = 0.7,
  max_tokens: number = 4000
): AsyncGenerator<string> {
  try {
    const response = await axios.post(
      'https://api.perplexity.ai/chat/completions',
      {
        model: process.env.PERPLEXITY_MODEL || 'sonar-pro',
        messages,
        temperature,
        max_tokens,
        stream: true,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        },
        responseType: 'stream',
      }
    );

    for await (const chunk of response.data) {
      const lines = chunk.toString().split('\n').filter(Boolean);
      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6);
          if (data === '[DONE]') return;
          try {
            const parsed = JSON.parse(data);
            if (parsed.choices[0]?.delta?.content) {
              yield parsed.choices[0].delta.content;
            }
          } catch (e) {
            console.error('Error parsing streaming response:', e);
          }
        }
      }
    }
  } catch (error) {
    console.error('Error streaming from Perplexity API:', error);
    throw new Error('Failed to stream response from AI');
  }
}