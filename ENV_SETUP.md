# Environment Configuration Setup

This project uses a centralized, type-safe environment configuration system located in `app/config/env.ts`.

## Overview

The environment configuration provides:
- **Type-safe access** to all environment variables
- **Centralized configuration** for API keys, URLs, and model parameters
- **Default values** for optional settings
- **Validation** to ensure required variables are present

## Environment Variables

Copy `.env.example` to `.env.local` (for local development) or `.env` (for production) and fill in your values:

```bash
cp .env.example .env.local
```

### Required Variables

- **`OPENROUTER_API_KEY`** - Your OpenRouter API key from https://openrouter.ai/keys
  - This is required for all AI chat functionality

### Optional Variables

- **`SITE_URL`** - The URL where your application is hosted
  - Default: `http://localhost:3000`
  - Used for OpenRouter API headers

- **`AI_MODEL`** - The AI model to use
  - Default: `google/gemma-3-27b-it:free`
  - Available models:
    - `google/gemma-3-27b-it:free` - Fast, free Grok model
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

## Usage in Code

### Client-side (Browser)

```typescript
import { envConfig } from '@/config/env'

// Access configuration
const apiModel = envConfig.ai.model
const maxTokens = envConfig.ai.maxTokens
```

### Server-side (Node.js)

The same `envConfig` module works on both client and server:

```typescript
import { envConfig, getOpenRouterHeaders } from '@/config/env'

// Get API headers for requests
const headers = getOpenRouterHeaders()
// Returns: {
//   'Authorization': 'Bearer your_key',
//   'Content-Type': 'application/json',
//   'HTTP-Referer': 'your_site_url',
//   'X-Title': 'Kost Citra & Tiara'
// }

// Access config values
fetch(`${envConfig.openrouter.baseUrl}/chat/completions`, {
  headers: getOpenRouterHeaders(),
  body: JSON.stringify({
    model: envConfig.ai.model,
    max_tokens: envConfig.ai.maxTokens,
    temperature: envConfig.ai.temperature,
  })
})
```

## Configuration Structure

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
    model: AIModel   // Selected AI model
    maxTokens: number
    temperature: number
  }
  
  features: {
    chatEnabled: boolean
    analyticsEnabled: boolean
  }
}
```

## Validation

The configuration is automatically validated on load. If required variables are missing or invalid, warnings will be logged to the console:

```
Environment Configuration Errors:
  - Missing OPENROUTER_API_KEY environment variable
  - AI_TEMPERATURE must be between 0 and 1
```

## Type Safety

All environment variable access is type-safe through TypeScript interfaces:

```typescript
import { envConfig, AIModel } from '@/config/env'

// ✅ TypeScript knows these are the correct types
const model: AIModel = envConfig.ai.model
const tokens: number = envConfig.ai.maxTokens

// ❌ TypeScript will error on invalid properties
const invalid = envConfig.ai.invalidProperty  // Property does not exist
```

## Development vs Production

### Development (.env.local)
```
OPENROUTER_API_KEY=sk_test_your_dev_key
SITE_URL=http://localhost:3000
AI_TEMPERATURE=0.9  # More creative responses for testing
```

### Production (.env)
```
OPENROUTER_API_KEY=sk_your_prod_key
SITE_URL=https://kostcitratiara.com
AI_TEMPERATURE=0.7  # Balanced responses
```

## Troubleshooting

### "Missing OPENROUTER_API_KEY"

1. Ensure you have `.env.local` (development) or `.env` (production) file
2. Copy `.env.example` as a starting point
3. Get your API key from https://openrouter.ai/keys
4. Restart your development server

### "Unsafe assignment" TypeScript errors

These have been handled with proper type assertions in the config module. If you see new errors, ensure you're using the centralized `envConfig` export.

### Changes not taking effect

Environment variables are loaded at startup. You may need to:

1. Stop and restart your development server
2. Clear your browser cache
3. Check that the file is saved without trailing whitespace
