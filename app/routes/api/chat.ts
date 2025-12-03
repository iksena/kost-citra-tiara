import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'
import { AI_SYSTEM_PROMPT } from '../../lib/kost.data'

export const Route = createFileRoute('/api/chat')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json()
          const { messages } = body

          const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
              'Content-Type': 'application/json',
              'HTTP-Referer': process.env.SITE_URL || 'http://localhost:3000',
              'X-Title': 'Kost Citra & Tiara',
            },
            body: JSON.stringify({
              model: 'x-ai/grok-4.1-fast:free',
              messages: [
                {
                  role: 'system',
                  content: AI_SYSTEM_PROMPT,
                },
                ...messages,
              ],
              max_tokens: 512,
              temperature: 0.7,
            }),
          })

          if (!response.ok) {
            throw new Error(`OpenRouter API error: ${response.status}`)
          }

          const data = await response.json()
          const assistantMessage = data.choices[0].message.content

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
