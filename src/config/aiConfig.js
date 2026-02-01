// src/config/aiConfig.js

export const AI_CONFIG = {
  model: 'llama-3.3-70b-versatile', // Groq модель
  maxTokens: 1000,
  maxHistoryMessages: 6,
  maxResponseWords: 150,
  temperature: 0.7,
  apiUrl: 'https://api.groq.com/openai/v1/chat/completions'
};