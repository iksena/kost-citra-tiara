import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { AI_SYSTEM_PROMPT } from '../../lib/kost.data'
import { envConfig, getOpenRouterHeaders } from '../../config/env'

interface ChatMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

interface ChatRequest {
  messages: ChatMessage[]
}

interface OpenRouterResponse {
  choices: Array<{
    message: {
      content: string
    }
  }>
}

export const Route = createFileRoute('/api/chat')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          if (!envConfig.openrouter.apiKey) {
            return json(
              { error: 'Server configuration error: Missing API key' },
              { status: 500 }
            )
          }

          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const body = await request.json()
          const { messages } = body as ChatRequest

          const response = await fetch(`${envConfig.openrouter.baseUrl}/chat/completions`, {
            method: 'POST',
            headers: getOpenRouterHeaders(),
            body: JSON.stringify({
              model: envConfig.ai.model,
              messages: [
                {
                  role: 'system',
                  content: AI_SYSTEM_PROMPT,
                },
                ...messages,
              ],
              max_tokens: envConfig.ai.maxTokens,
              temperature: envConfig.ai.temperature,
            }),
          })

          if (!response.ok) {
            console.error('OpenRouter API response not ok:', await response.text())
            throw new Error(`OpenRouter API error: ${response.status}`)
          }

          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          const data = await response.json()
          const assistantMessage = (data as OpenRouterResponse).choices[0]?.message.content

          return json({ message: assistantMessage })
        } catch (error) {
          console.error('Chat API error:', error)
          return json(
            { error: 'Gagal memproses pesan. Silakan coba lagi.' },
            { status: 500 }
          )
        }
      },
    },
  },
})
