// src/config/gamificationConfig.js
// Конфигурация системы геймификации

export const LEVEL_CONFIG = {
  thresholds: [
    { level: 1, minXP: 0, maxXP: 100, title: 'Новичок' },
    { level: 2, minXP: 100, maxXP: 300, title: 'Ученик' },
    { level: 3, minXP: 300, maxXP: 600, title: 'Практик' },
    { level: 4, minXP: 600, maxXP: 1000, title: 'Знаток' },
    { level: 5, minXP: 1000, maxXP: 1500, title: 'Эксперт' },
    { level: 6, minXP: 1500, maxXP: 2100, title: 'Мастер' },
    { level: 7, minXP: 2100, maxXP: 2800, title: 'Гуру' },
    { level: 8, minXP: 2800, maxXP: Infinity, title: 'Легенда' },
  ],
};

export const XP_REWARDS = {
  MESSAGE: 1,
  LESSON: 10,
  TEST: 20,
};

export const ACHIEVEMENTS_CONFIG = [
  {
    id: 'first_message',
    title: 'Первый шаг',
    description: 'Отправь своё первое сообщение',
    icon: '💬',
    condition: (stats) => stats.messages >= 1,
  },
  {
    id: 'curious',
    title: 'Любопытный',
    description: 'Отправь 10 сообщений',
    icon: '🔍',
    condition: (stats) => stats.messages >= 10,
  },
  {
    id: 'active_learner',
    title: 'Активный ученик',
    description: 'Отправь 50 сообщений',
    icon: '📚',
    condition: (stats) => stats.messages >= 50,
  },
  {
    id: 'communicator',
    title: 'Коммуникатор',
    description: 'Отправь 100 сообщений',
    icon: '🗣️',
    condition: (stats) => stats.messages >= 100,
  },
  {
    id: 'first_lesson',
    title: 'Начинающий',
    description: 'Изучи свой первый урок',
    icon: '🎓',
    condition: (stats) => stats.lessons >= 1,
  },
  {
    id: 'lesson_master',
    title: 'Ученик мастера',
    description: 'Изучи 5 уроков',
    icon: '📖',
    condition: (stats) => stats.lessons >= 5,
  },
  {
    id: 'first_test',
    title: 'Испытатель',
    description: 'Пройди свой первый тест',
    icon: '✅',
    condition: (stats) => stats.tests >= 1,
  },
  {
    id: 'level_5',
    title: 'Опытный',
    description: 'Достигни 5 уровня',
    icon: '⭐',
    condition: (stats, level) => level >= 5,
  },
];

export const getDefaultGamificationData = () => ({
  xp: 0,
  level: 1,
  stats: {
    messages: 0,
    lessons: 0,
    tests: 0,
  },
});
