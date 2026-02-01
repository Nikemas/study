// src/utils/themeUtils.js
// Утилиты для работы с темой - устраняют дублирование className

export const themeClasses = {
  // Фоны
  bg: (theme) => (theme === 'dark' ? 'bg-gray-800' : 'bg-white'),
  bgPrimary: (theme) => (theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'),
  bgSecondary: (theme) => (theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'),
  bgHover: (theme) => (theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'),
  bgGradient: (theme) =>
    theme === 'dark'
      ? 'bg-gray-900'
      : 'bg-gradient-to-br from-blue-50 to-indigo-100',

  // Тексты
  text: (theme) => (theme === 'dark' ? 'text-white' : 'text-gray-800'),
  textSecondary: (theme) => (theme === 'dark' ? 'text-gray-300' : 'text-gray-600'),
  textMuted: (theme) => (theme === 'dark' ? 'text-gray-400' : 'text-gray-500'),

  // Границы
  border: (theme) => (theme === 'dark' ? 'border-gray-700' : 'border-gray-200'),
  borderSecondary: (theme) => (theme === 'dark' ? 'border-gray-600' : 'border-gray-300'),

  // Комбинированные
  card: (theme) =>
    theme === 'dark'
      ? 'bg-gray-800 border-gray-700'
      : 'bg-white border-gray-200',
  input: (theme) =>
    theme === 'dark'
      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
      : 'bg-white border-gray-300 text-gray-800 placeholder-gray-500',
};

// Хелпер для объединения классов
export const cn = (...classes) => classes.filter(Boolean).join(' ');
