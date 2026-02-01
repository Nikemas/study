// src/services/contextBuilder.js

import { COURSE_DATA, getMaterialsByCategory } from '../data/courseData';

export const buildContextFromKnowledge = (question) => {
  const lowerQuestion = question.toLowerCase();
  const relevantMaterials = [];

  // Определяем категорию по ключевым словам
  let detectedCategory = 'all';
  
  if (lowerQuestion.includes('python') || lowerQuestion.includes('список') || 
      lowerQuestion.includes('def') || lowerQuestion.includes('цикл')) {
    detectedCategory = 'python';
  } else if (lowerQuestion.includes('javascript') || lowerQuestion.includes('js') ||
             lowerQuestion.includes('async') || lowerQuestion.includes('promise')) {
    detectedCategory = 'javascript';
  } else if (lowerQuestion.includes('html') || lowerQuestion.includes('тег') ||
             lowerQuestion.includes('форм')) {
    detectedCategory = 'html';
  } else if (lowerQuestion.includes('css') || lowerQuestion.includes('flex') ||
             lowerQuestion.includes('grid') || lowerQuestion.includes('стил')) {
    detectedCategory = 'css';
  } else if (lowerQuestion.includes('react') || lowerQuestion.includes('jsx') ||
             lowerQuestion.includes('usestate') || lowerQuestion.includes('компонент')) {
    detectedCategory = 'react';
  }

  // Получаем материалы по категории
  const materials = getMaterialsByCategory(detectedCategory);
  
  // Ищем релевантные материалы
  materials.forEach(material => {
    const topicLower = material.topic.toLowerCase();
    const topicWords = topicLower.split(' ');
    
    if (lowerQuestion.includes(topicLower) || 
        topicWords.some(word => word.length > 3 && lowerQuestion.includes(word))) {
      relevantMaterials.push(material);
    }
  });

  // Проверяем FAQ
  const relevantFaq = COURSE_DATA.faq.filter(item => {
    const questionLower = item.question.toLowerCase();
    return lowerQuestion.includes(questionLower.slice(0, 15)) ||
           questionLower.includes(lowerQuestion.slice(0, 15));
  });

  let context = `Курс: ${COURSE_DATA.title}\n`;
  context += `Категория: ${detectedCategory.toUpperCase()}\n\n`;
  
  if (relevantMaterials.length > 0) {
    context += "📚 Релевантные материалы курса:\n";
    relevantMaterials.forEach(m => {
      context += `- ${m.topic}: ${m.content}\n\n`;
    });
  }

  if (relevantFaq.length > 0) {
    context += "❓ Из FAQ:\n";
    relevantFaq.forEach(f => {
      context += `В: ${f.question}\nО: ${f.answer}\n\n`;
    });
  }

  return context;
};