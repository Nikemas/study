// src/services/contextBuilder.js

import { COURSE_DATA, getMaterialsByCategory } from '../data/courseData';

// Маппинг категорий по ключевым словам
const CATEGORY_KEYWORDS = {
  python: ['python', 'питон', 'список', 'словар', 'def', 'цикл', 'print', 'import'],
  javascript: ['javascript', 'js', 'джаваскрипт', 'async', 'await', 'promise', 'const', 'let', 'var', 'function'],
  html: ['html', 'тег', 'разметка', 'форм', 'input', 'div', 'span', 'атрибут'],
  css: ['css', 'стил', 'flexbox', 'flex', 'grid', 'анимац', 'selector', 'селектор'],
  react: ['react', 'реакт', 'jsx', 'usestate', 'useeffect', 'компонент', 'хук', 'props', 'state'],
};

/**
 * Определяет категорию вопроса по ключевым словам
 */
const detectCategory = (question) => {
  const lowerQuestion = question.toLowerCase();

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(keyword => lowerQuestion.includes(keyword))) {
      return category;
    }
  }

  return 'all';
};

/**
 * Находит релевантные материалы для вопроса
 */
const findRelevantMaterials = (question, materials) => {
  const lowerQuestion = question.toLowerCase();

  return materials.filter(material => {
    const topicLower = material.topic.toLowerCase();
    const topicWords = topicLower.split(' ').filter(word => word.length > 3);

    return (
      lowerQuestion.includes(topicLower) ||
      topicWords.some(word => lowerQuestion.includes(word))
    );
  });
};

/**
 * Находит релевантные FAQ для вопроса
 */
const findRelevantFaq = (question) => {
  if (!COURSE_DATA.faq || !Array.isArray(COURSE_DATA.faq)) {
    return [];
  }

  const lowerQuestion = question.toLowerCase();
  const questionPrefix = lowerQuestion.slice(0, 15);

  return COURSE_DATA.faq.filter(item => {
    if (!item || !item.question) return false;
    const faqLower = item.question.toLowerCase();
    return (
      lowerQuestion.includes(faqLower.slice(0, 15)) ||
      faqLower.includes(questionPrefix)
    );
  });
};

/**
 * Строит контекст из базы знаний для AI
 * @param {string} question - Вопрос пользователя
 * @param {Object} options - Дополнительные опции
 * @param {string} options.activeCategory - Текущая активная категория из UI
 * @param {string} options.activeTopic - Текущая активная тема из UI
 */
export const buildContextFromKnowledge = (question, options = {}) => {
  const { activeCategory, activeTopic } = options;

  // Используем активную категорию из UI, если она задана, иначе определяем по вопросу
  const detectedCategory = activeCategory && activeCategory !== 'all'
    ? activeCategory
    : detectCategory(question);

  const materials = getMaterialsByCategory(detectedCategory);
  const relevantMaterials = findRelevantMaterials(question, materials);
  const relevantFaq = findRelevantFaq(question);

  let context = `Курс: ${COURSE_DATA.title}\n`;

  // Если пользователь находится в конкретной категории, подчёркиваем это
  if (activeCategory && activeCategory !== 'all') {
    context += `Пользователь изучает раздел: ${activeCategory.toUpperCase()}\n`;
  }

  // Если есть активная тема, добавляем её
  if (activeTopic) {
    context += `Текущая тема: ${activeTopic}\n`;
  }

  context += `Определённая категория вопроса: ${detectedCategory.toUpperCase()}\n\n`;

  if (relevantMaterials.length > 0) {
    context += 'Релевантные материалы курса:\n';
    relevantMaterials.forEach(m => {
      context += `- ${m.topic}: ${m.content}\n\n`;
    });
  }

  // Если активна категория, но нет релевантных материалов, добавим все материалы категории
  if (relevantMaterials.length === 0 && activeCategory && activeCategory !== 'all') {
    const categoryMaterials = getMaterialsByCategory(activeCategory).slice(0, 3);
    if (categoryMaterials.length > 0) {
      context += 'Материалы текущего раздела:\n';
      categoryMaterials.forEach(m => {
        context += `- ${m.topic}: ${m.content}\n\n`;
      });
    }
  }

  if (relevantFaq.length > 0) {
    context += 'Из FAQ:\n';
    relevantFaq.forEach(f => {
      context += `В: ${f.question}\nО: ${f.answer}\n\n`;
    });
  }

  return context;
};
