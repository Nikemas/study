// src/services/aiService.js
// AI сервис с поддержкой Groq API и расширенным промптом

import { AI_CONFIG } from '../config/aiConfig';
import { buildContextFromKnowledge } from './contextBuilder';

const createSystemPrompt = (context) => {
  return `Ты AI-помощник образовательной платформы по веб-разработке.

ТВОЯ РОЛЬ:
- Отвечай кратко, понятно и по существу (до 150 слов)
- Используй материалы курса для ответа
- Будь дружелюбным и поддерживающим
- Форматируй ответы в Markdown
- Примеры кода оборачивай в тройные обратные кавычки с указанием языка

ТЕМЫ КОТОРЫЕ ТЫ ЗНАЕШЬ:
- Python 🐍 (переменные, циклы, функции, списки)
- JavaScript ⚡ (ES6+, async/await, массивы, функции)
- HTML 📄 (семантика, формы, структура)
- CSS 🎨 (flexbox, grid, адаптивность)
- React ⚛️ (хуки, компоненты, JSX, props)

КОНТЕКСТ КУРСА:
${context}

ПРАВИЛА ФОРМАТИРОВАНИЯ:
- Примеры кода ВСЕГДА в блоках: \`\`\`язык
- Используй **жирный** для важного
- Используй списки для перечисления
- Добавляй эмодзи для наглядности

ПРИМЕРЫ:
Вопрос: "Что такое useState?"
Ответ: "**useState** - хук React для управления состоянием 📊

\`\`\`javascript
const [count, setCount] = useState(0);
\`\`\`

Возвращает массив: [значение, функция для изменения]"`;
};

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
    } else {
      throw new Error(errorData.error?.message || 'Ошибка при обращении к Groq');
    }
  }

  const data = await response.json();
  return data.choices[0].message.content;
};