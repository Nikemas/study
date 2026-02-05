// src/config/gamificationConfig.js
// Конфигурация системы геймификации
import { ACHIEVEMENTS_CONFIG } from '../data/achievements';

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

export { ACHIEVEMENTS_CONFIG };

export const getDefaultGamificationData = () => ({
  xp: 0,
  level: 1,
  stats: {
    messages: 0,
    lessons: 0,
    tests: 0,
  },
});
