// src/services/aiService.js
// AI сервис с поддержкой Groq API

import { AI_CONFIG } from '../config/aiConfig';
import { createSystemPrompt } from '../config/systemPrompt';
import { buildContextFromKnowledge } from './contextBuilder';

export const sendMessageToAI = async (question, conversationHistory) => {
  const apiKey = process.env.REACT_APP_GROQ_API_KEY;

  if (!apiKey) {
    throw new Error(
      'API ключ не найден! Создайте файл .env и добавьте: REACT_APP_GROQ_API_KEY=ваш-ключ'
    );
  }

  const context = buildContextFromKnowledge(question);
  const systemPrompt = createSystemPrompt(context);

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
    const errorData = await response.json().catch(() => ({}));

    if (response.status === 401) {
      throw new Error('Неверный API ключ Groq');
    } else if (response.status === 429) {
      throw new Error('Превышен лимит запросов Groq');
    } else if (response.status >= 500) {
      throw new Error('Сервер временно недоступен. Попробуйте позже.');
    } else {
      throw new Error(errorData.error?.message || 'Ошибка при обращении к Groq');
    }
  }

  const data = await response.json();

  if (!data.choices || !data.choices.length || !data.choices[0].message) {
    throw new Error('Некорректный ответ от API');
  }

  return data.choices[0].message.content;
};
