// src/services/storageService.js
// Service for working with localStorage

const STORAGE_KEYS = {
  THEME: 'app_theme',
  CHAT_HISTORY: 'chat_history',
  CURRENT_CHAT: 'current_chat_id',
  LANGUAGE: 'app_language',
  GAMIFICATION: 'app_gamification',
  ACHIEVEMENTS: 'app_achievements',
  SOUND_ENABLED: 'sound_enabled',
  GROQ_API_KEY: 'groq_api_key',
  PRACTICE_STATE: 'learning_practice_state',
  LEARNING_DATA_VERSION: 'learning_data_version',
  USER_PROGRESS_V2: 'user_progress_v2', // NEW: прогресс V2
  KNOWLEDGE_PROGRESS: 'knowledgeProgress', // V1 data
  PRACTICE_PROGRESS: 'practiceProgress', // V1 data
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
  if (chatId === null) {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_CHAT);
    return;
  }
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

// Sound settings
export const saveSoundEnabled = (value) => {
  localStorage.setItem(STORAGE_KEYS.SOUND_ENABLED, String(value));
};

export const getSoundEnabled = () => {
  const value = localStorage.getItem(STORAGE_KEYS.SOUND_ENABLED);
  return value === null ? true : value !== 'false';
};

// API key
export const saveGroqApiKey = (key) => {
  if (key) {
    localStorage.setItem(STORAGE_KEYS.GROQ_API_KEY, key);
  } else {
    localStorage.removeItem(STORAGE_KEYS.GROQ_API_KEY);
  }
};

export const getGroqApiKey = () => {
  return localStorage.getItem(STORAGE_KEYS.GROQ_API_KEY) || '';
};

// Practice state
export const savePracticeState = (state) => {
  localStorage.setItem(STORAGE_KEYS.PRACTICE_STATE, JSON.stringify(state));
};

export const getPracticeState = () => {
  try {
    const value = localStorage.getItem(STORAGE_KEYS.PRACTICE_STATE);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error('Failed to read practice state:', error);
    return null;
  }
};

// Learning data version
export const saveLearningDataVersion = (version) => {
  localStorage.setItem(STORAGE_KEYS.LEARNING_DATA_VERSION, String(version));
};

export const getLearningDataVersion = () => {
  const value = localStorage.getItem(STORAGE_KEYS.LEARNING_DATA_VERSION);
  return value ? Number(value) : null;
};

// V2: User Progress
export const saveUserProgress = (progress) => {
  localStorage.setItem(STORAGE_KEYS.USER_PROGRESS_V2, JSON.stringify(progress));
};

export const getUserProgress = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER_PROGRESS_V2);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error reading user progress V2:', error);
    return null;
  }
};

// V1: Knowledge Progress (for migration)
export const getV1KnowledgeProgress = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.KNOWLEDGE_PROGRESS);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error reading V1 knowledge progress:', error);
    return null;
  }
};

// V1: Practice Progress (for migration)
export const getV1PracticeProgress = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PRACTICE_PROGRESS);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error reading V1 practice progress:', error);
    return null;
  }
};
