export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5256/api';

export const TOKEN_KEY = 'ai_startup_coach_token';

export const PROVIDERS = [
  { id: 'openai', name: 'OpenAI (GPT-4o)' },
  { id: 'gemini', name: 'Google Gemini (1.5 Flash)' },
  { id: 'claude', name: 'Anthropic Claude (3 Haiku)' },
  { id: 'groq', name: 'Groq (Llama 3 8B)' },
];
