// app/utils/chat.ts
import { createServerFn } from '@tanstack/react-start/server';
import { AI_SYSTEM_PROMPT } from '../lib/kost.data';

type ChatMessage = { role: 'user' | 'assistant' | 'system'; content: string };

export const sendMessageToGrok = createServerFn('POST', async (history: ChatMessage[]) => {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) throw new Error("Missing API Key");

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://kostcitratiara.com", // Required by OpenRouter
    },
    body: JSON.stringify({
      // Using the specific free model requested
      model: "x-ai/grok-4.1-fast:free", 
      messages: [
        { role: "system", content: AI_SYSTEM_PROMPT },
        ...history
      ],
      temperature: 0.7,
      max_tokens: 200,
    }),
  });

  const data = await response.json();
  return data.choices[0]?.message?.content || "Maaf Kak, Mbak Citra lagi error nih.";
});
