// src/services/storageService.js
// Service for working with localStorage

const STORAGE_KEYS = {
  THEME: 'app_theme',
  CHAT_HISTORY: 'chat_history',
  CURRENT_CHAT: 'current_chat_id',
  LANGUAGE: 'app_language',
  GAMIFICATION: 'app_gamification',
  ACHIEVEMENTS: 'app_achievements',
};

// Theme
export const saveTheme = (theme) => {
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
};

export const getTheme = () => {
  return localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
};

// Chat history
export const saveChatHistory = (history) => {
  localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(history));
};

export const getChatHistory = () => {
  try {
    const history = localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    console.error('Ошибка при чтении истории чатов:', error);
    return [];
  }
};

export const saveCurrentChatId = (chatId) => {
  localStorage.setItem(STORAGE_KEYS.CURRENT_CHAT, chatId);
};

export const getCurrentChatId = () => {
  return localStorage.getItem(STORAGE_KEYS.CURRENT_CHAT);
};

export const clearStorage = () => {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
};

// Language
export const saveLanguage = (language) => {
  localStorage.setItem(STORAGE_KEYS.LANGUAGE, language);
};

export const getLanguage = () => {
  return localStorage.getItem(STORAGE_KEYS.LANGUAGE) || 'ru';
};

// Gamification
export const saveGamificationData = (data) => {
  localStorage.setItem(STORAGE_KEYS.GAMIFICATION, JSON.stringify(data));
};

export const getGamificationData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.GAMIFICATION);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Ошибка при чтении данных геймификации:', error);
    return null;
  }
};

// Achievements
export const saveAchievements = (achievements) => {
  localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
};

export const getAchievements = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Ошибка при чтении достижений:', error);
    return [];
  }
};
