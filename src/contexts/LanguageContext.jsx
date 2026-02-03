// src/contexts/LanguageContext.jsx
// Контекст для управления языком приложения

import { createContext, useContext, useState, useCallback } from 'react';

const LanguageContext = createContext(null);

const STORAGE_KEY = 'app_language';

// Простые переводы для базовых элементов интерфейса
const translations = {
  ru: {
    'language.select': 'Выбрать язык',
    'chat.placeholder': 'Задайте вопрос по курсу...',
    'chat.send': 'Отправить',
    'chat.clear': 'Очистить',
    'history.title': 'История диалогов',
    'history.empty': 'История пуста',
    'knowledge.title': 'База знаний',
  },
  en: {
    'language.select': 'Select language',
    'chat.placeholder': 'Ask a question about the course...',
    'chat.send': 'Send',
    'chat.clear': 'Clear',
    'history.title': 'Chat History',
    'history.empty': 'History is empty',
    'knowledge.title': 'Knowledge Base',
  },
  ky: {
    'language.select': 'Тилди тандаңыз',
    'chat.placeholder': 'Курс боюнча суроо бериңиз...',
    'chat.send': 'Жөнөтүү',
    'chat.clear': 'Тазалоо',
    'history.title': 'Диалог тарыхы',
    'history.empty': 'Тарых бош',
    'knowledge.title': 'Билим базасы',
  },
};

const getStoredLanguage = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) || 'ru';
  } catch {
    return 'ru';
  }
};

const saveLanguage = (lang) => {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch (error) {
    console.error('Failed to save language:', error);
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(getStoredLanguage);

  const setLanguage = useCallback((lang) => {
    setLanguageState(lang);
    saveLanguage(lang);
  }, []);

  const t = useCallback((key) => {
    return translations[language]?.[key] || translations.ru[key] || key;
  }, [language]);

  const value = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};
