// src/services/storageService.js
// Сервис для работы с localStorage

const STORAGE_KEYS = {
  THEME: 'app_theme',
  CHAT_HISTORY: 'chat_history',
  CURRENT_CHAT: 'current_chat_id'
};

// Тема
export const saveTheme = (theme) => {
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
};

export const getTheme = () => {
  return localStorage.getItem(STORAGE_KEYS.THEME) || 'light';
};

// История чатов
export const saveChatHistory = (history) => {
  localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(history));
};

export const getChatHistory = () => {
  const history = localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY);
  return history ? JSON.parse(history) : [];
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