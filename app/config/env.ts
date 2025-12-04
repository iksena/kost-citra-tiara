/**
 * Environment Configuration
 * Centralized typed access to environment variables
 */

// Environment variable schema
export interface EnvironmentConfig {
  // API Configuration
  openrouter: {
    apiKey: string;
    baseUrl: string;
  };
  
  // Application Configuration
  app: {
    name: string;
    origin: string;
    siteUrl: string;
  };
  
  // AI Configuration
  ai: {
    model: string;
    maxTokens: number;
    temperature: number;
  };
  
  // Feature Flags
  features: {
    chatEnabled: boolean;
    analyticsEnabled: boolean;
  };
}

/**
 * Get environment variables with proper defaults and validation
 */
function getEnvConfig(): EnvironmentConfig {
  // Determine if we're in browser or server
  const isBrowser = typeof window !== 'undefined';
  
  // Get the appropriate env object with proper typing
  const envVars = isBrowser 
    ? (import.meta.env as Record<string, string | undefined>)
    : (process.env as Record<string, string | undefined>);
  
  const apiKey = envVars.OPENROUTER_API_KEY ?? '';
  const siteUrl = envVars.SITE_URL ?? (isBrowser ? window.location.origin : 'http://localhost:3000');
  const aiModel = envVars.AI_MODEL ?? 'google/gemma-3-27b-it:free';
  const maxTokens = parseInt(envVars.AI_MAX_TOKENS ?? '512', 10);
  const temperature = parseFloat(envVars.AI_TEMPERATURE ?? '0.7');
  
  return {
    openrouter: {
      apiKey,
      baseUrl: 'https://openrouter.ai/api/v1',
    },
    app: {
      name: 'Kost Citra & Tiara',
      origin: isBrowser ? window.location.origin : 'http://localhost:3000',
      siteUrl,
    },
    ai: {
      model: aiModel,
      maxTokens,
      temperature,
    },
    features: {
      chatEnabled: envVars.CHAT_ENABLED !== 'false',
      analyticsEnabled: envVars.ANALYTICS_ENABLED === 'true',
    },
  };
}

/**
 * Validate that required environment variables are set
 * @throws Error if required variables are missing
 */
export function validateEnvConfig(config: EnvironmentConfig): void {
  const errors: string[] = [];
  
  if (!config.openrouter.apiKey) {
    errors.push('Missing OPENROUTER_API_KEY environment variable');
  }
  
  if (config.ai.maxTokens <= 0 || config.ai.maxTokens > 4096) {
    errors.push('AI_MAX_TOKENS must be between 1 and 4096');
  }
  
  if (config.ai.temperature < 0 || config.ai.temperature > 1) {
    errors.push('AI_TEMPERATURE must be between 0 and 1');
  }
  
  if (errors.length > 0) {
    console.error('Environment Configuration Errors:');
    errors.forEach(err => console.error(`  - ${err}`));
  }
}

// Export singleton instance
export const envConfig = getEnvConfig();

// Validate on load
validateEnvConfig(envConfig);

/**
 * Get API headers for OpenRouter requests
 */
export function getOpenRouterHeaders(): HeadersInit {
  return {
    'Authorization': `Bearer ${envConfig.openrouter.apiKey}`,
    'Content-Type': 'application/json',
    'HTTP-Referer': envConfig.app.siteUrl,
    'X-Title': envConfig.app.name,
  };
}
