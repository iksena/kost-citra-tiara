# Kost Citra & Tiara

A modern full-stack web application for a boarding house (kost) featuring an AI-powered chat assistant. Built with TanStack technologies including React Router, React Start, and integrated with OpenRouter AI API.

## Features

- **Responsive Design** - Mobile-first responsive layout with Tailwind CSS
- **AI Chat Widget** - Real-time chat powered by OpenRouter AI models
- **Image Carousel** - Beautiful image galleries with modal support
- **Interactive Map** - Leaflet-based map for location visualization
- **Type-Safe Configuration** - Centralized environment configuration with TypeScript support
- **Server-Side Rendering** - Full-stack app with SSR capabilities via TanStack React Start

## Project Structure

```
app/
├── components/          # React components
│   ├── ChatWidget.tsx   # AI chat interface
│   ├── ImageCarousel.tsx
│   ├── ImageModal.tsx
│   └── LeafletMap.tsx
├── config/
│   ├── env.ts           # Centralized environment configuration
│   └── env.examples.ts  # Usage examples
├── lib/
│   └── kost.data.ts     # Application data and constants
├── routes/              # File-based routing
│   ├── __root.tsx       # Root layout
│   ├── index.tsx        # Home page
│   └── api/
│       └── chat.ts      # AI chat API endpoint
├── utils/
│   └── chat.ts          # Chat utilities
└── styles/              # Global styles
```

## Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- OpenRouter API key from [https://openrouter.ai/keys](https://openrouter.ai/keys)

## Getting Started

### 1. Install Dependencies

```bash
bun install
```

### 2. Configure Environment Variables

Copy the example environment file and add your configuration:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your OpenRouter API key:

```env
OPENROUTER_API_KEY=your_api_key_here
```

### 3. Run Development Server

```bash
bun --bun run start
```

The application will be available at `http://localhost:3000`

### 4. Build for Production

```bash
bun --bun run build
```

## Environment Configuration

This project uses a centralized, type-safe environment configuration system located in `app/config/env.ts`.

### Required Variables

- **`OPENROUTER_API_KEY`** - Your OpenRouter API key from https://openrouter.ai/keys
  - Required for all AI chat functionality

### Optional Variables

- **`SITE_URL`** - The URL where your application is hosted
  - Default: `http://localhost:3000`
  - Used for OpenRouter API headers

- **`AI_MODEL`** - The AI model to use
  - Default: `x-ai/grok-4.1-fast:free`
  - Available models:
    - `x-ai/grok-4.1-fast:free` - Fast, free Grok model
    - `openai/gpt-4-turbo` - Advanced GPT-4
    - `anthropic/claude-3-opus` - Claude 3 Opus

- **`AI_MAX_TOKENS`** - Maximum tokens for AI responses
  - Default: `512`
  - Range: `1-4096`

- **`AI_TEMPERATURE`** - Temperature for AI response creativity
  - Default: `0.7`
  - Range: `0-1`
  - Lower values (0.0-0.3) = More deterministic
  - Higher values (0.7-1.0) = More creative

- **`CHAT_ENABLED`** - Enable/disable chat functionality
  - Default: `true`

- **`ANALYTICS_ENABLED`** - Enable/disable analytics
  - Default: `false`

### Usage in Code

```typescript
import { envConfig, getOpenRouterHeaders } from '@/config/env'

// Access configuration
const model = envConfig.ai.model
const maxTokens = envConfig.ai.maxTokens

// Get API headers for requests
const headers = getOpenRouterHeaders()

// Make API requests
fetch(`${envConfig.openrouter.baseUrl}/chat/completions`, {
  method: 'POST',
  headers: getOpenRouterHeaders(),
  body: JSON.stringify({
    model: envConfig.ai.model,
    messages: [...],
    max_tokens: envConfig.ai.maxTokens,
    temperature: envConfig.ai.temperature,
  })
})
```

### Configuration Structure

```typescript
interface EnvironmentConfig {
  openrouter: {
    apiKey: string
    baseUrl: string  // 'https://openrouter.ai/api/v1'
  }
  
  app: {
    name: string     // 'Kost Citra & Tiara'
    origin: string   // window.location.origin or localhost
    siteUrl: string  // Full site URL for API headers
  }
  
  ai: {
    model: AIModel
    maxTokens: number
    temperature: number
  }
  
  features: {
    chatEnabled: boolean
    analyticsEnabled: boolean
  }
}
```

## Testing

Run tests with:

```bash
bun --bun run test
```

This project uses [Vitest](https://vitest.dev/) for testing.

## Styling

This project uses [Tailwind CSS](https://tailwindcss.com/) for styling. Tailwind configuration is automatic via `@tailwindcss/vite`.

## Routing

This project uses [TanStack Router](https://tanstack.com/router) with file-based routing. Routes are defined as files in the `app/routes/` directory.

- Layout: `app/routes/__root.tsx`
- Home page: `app/routes/index.tsx`
- API routes: `app/routes/api/*.ts`

## API Endpoints

### POST /api/chat

Send a message to the AI chat assistant.

**Request:**
```json
{
  "messages": [
    { "role": "user", "content": "Hello!" }
  ]
}
```

**Response:**
```json
{
  "message": "AI response here"
}
```

## Troubleshooting

### Missing API Key

1. Ensure you have `.env.local` file in the root directory
2. Copy `.env.example` as a starting point
3. Add your OpenRouter API key from https://openrouter.ai/keys
4. Restart your development server

### Changes not taking effect

Environment variables are loaded at startup:

1. Stop and restart your development server
2. Clear your browser cache
3. Check that the `.env.local` file is saved correctly

### Chat not working

- Verify your OpenRouter API key is valid and has sufficient credits
- Check that `CHAT_ENABLED=true` in your environment
- Review the browser console and server logs for error messages

## Technologies Used

- **Framework**: [React](https://react.dev/)
- **Routing**: [TanStack Router](https://tanstack.com/router)
- **Server**: [TanStack React Start](https://tanstack.com/react-start)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Package Manager**: [Bun](https://bun.sh/)
- **Testing**: [Vitest](https://vitest.dev/)
- **Maps**: [Leaflet](https://leafletjs.com/)
- **AI API**: [OpenRouter](https://openrouter.ai/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

## Learn More

- [TanStack Documentation](https://tanstack.com)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenRouter API](https://openrouter.ai/docs)

## License

MIT
