// src/services/aiService.js
// AI сервис с поддержкой Groq API

import { AI_CONFIG } from '../config/aiConfig';
import { createSystemPrompt } from '../config/systemPrompt';
import { buildContextFromKnowledge } from './contextBuilder';
import { getGroqApiKey, saveGroqApiKey } from './storageService';

export const API_ERROR_CODES = {
  API_KEY_NOT_FOUND: 'errors.apiKeyNotFound',
  INVALID_API_KEY: 'errors.invalidApiKey',
  RATE_LIMIT: 'errors.rateLimitExceeded',
  SERVER_UNAVAILABLE: 'errors.serverUnavailable',
  API_ERROR: 'errors.apiError',
  INVALID_RESPONSE: 'errors.invalidResponse'
};

export const getApiKey = () => {
  return getGroqApiKey() || process.env.REACT_APP_GROQ_API_KEY || '';
};

export const saveApiKey = (key) => {
  saveGroqApiKey(key);
};

export const hasApiKey = () => {
  return Boolean(getApiKey());
};

export const sendMessageToAI = async (question, conversationHistory, language = 'ru', contextOptions = {}) => {
  const apiKey = getApiKey();

  if (!apiKey) {
    const error = new Error(API_ERROR_CODES.API_KEY_NOT_FOUND);
    error.code = API_ERROR_CODES.API_KEY_NOT_FOUND;
    throw error;
  }

  const context = buildContextFromKnowledge(question, contextOptions);
  const systemPrompt = createSystemPrompt(context, language);

  const messages = [
    { role: 'system', content: systemPrompt },
    ...conversationHistory,
    { role: 'user', content: question }
  ];

  const response = await fetch(AI_CONFIG.apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: AI_CONFIG.model,
      messages: messages,
      max_tokens: AI_CONFIG.maxTokens,
      temperature: AI_CONFIG.temperature
    })
  });

  if (!response.ok) {
    await response.json().catch(() => ({}));

    let errorCode;
    if (response.status === 401) {
      errorCode = API_ERROR_CODES.INVALID_API_KEY;
    } else if (response.status === 429) {
      errorCode = API_ERROR_CODES.RATE_LIMIT;
    } else if (response.status >= 500) {
      errorCode = API_ERROR_CODES.SERVER_UNAVAILABLE;
    } else {
      errorCode = API_ERROR_CODES.API_ERROR;
    }

    const error = new Error(errorCode);
    error.code = errorCode;
    throw error;
  }

  const data = await response.json();

  if (!data.choices || !data.choices.length || !data.choices[0].message) {
    const error = new Error(API_ERROR_CODES.INVALID_RESPONSE);
    error.code = API_ERROR_CODES.INVALID_RESPONSE;
    throw error;
  }

  return data.choices[0].message.content;
};
