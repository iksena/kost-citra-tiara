// app/utils/chat.ts
import { createServerFn } from '@tanstack/react-start/server';
import { AI_SYSTEM_PROMPT } from '../lib/kost.data';
import { envConfig, getOpenRouterHeaders } from '../config/env';

type ChatMessage = { role: 'user' | 'assistant' | 'system'; content: string };

interface OpenRouterResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

class APIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'APIError';
  }
}

const sendMessageToGrokFn = async (history: ChatMessage[]): Promise<string> => {
  if (!envConfig.openrouter.apiKey) {
    throw new APIError("Missing OPENROUTER_API_KEY environment variable");
  }

  const response = await fetch(`${envConfig.openrouter.baseUrl}/chat/completions`, {
    method: "POST",
    headers: getOpenRouterHeaders(),
    body: JSON.stringify({
      model: envConfig.ai.model,
      messages: [
        { role: "system", content: AI_SYSTEM_PROMPT },
        ...history
      ],
      temperature: envConfig.ai.temperature,
      max_tokens: envConfig.ai.maxTokens,
    }),
  });

  if (!response.ok) {
    throw new APIError(`OpenRouter API error: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as OpenRouterResponse;
  return data.choices[0]?.message?.content || "Maaf Kak, Mbak Citra lagi error nih.";
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
export const sendMessageToGrok = createServerFn('POST', sendMessageToGrokFn);
