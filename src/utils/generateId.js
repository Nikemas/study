// src/utils/generateId.js
// Утилита для генерации уникальных ID

/**
 * Генерирует уникальный ID
 * Использует комбинацию timestamp и случайной строки
 */
export const generateId = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 11);
  return `${timestamp}-${random}`;
};
