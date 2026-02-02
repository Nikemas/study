// src/contexts/LanguageContext.jsx
import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { getLanguage, saveLanguage } from '../services/storageService';
import { translations } from '../locales';

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => getLanguage());

  useEffect(() => {
    saveLanguage(language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((lang) => {
    if (translations[lang]) {
      setLanguageState(lang);
    }
  }, []);

  // Translation function for UI strings
  const t = useCallback((key) => {
    const keys = key.split('.');
    let value = translations[language]?.ui;

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }

    return value || key;
  }, [language]);

  // Get course data for current language
  const courseData = useMemo(() => {
    const courses = translations[language]?.courses;
    if (!courses) return null;

    return {
      title: courses.title,
      courses: courses.courses.map(c => ({
        ...c,
        icon: getCourseIcon(c.id),
        color: getCourseColor(c.id)
      })),
      materials: Object.fromEntries(
        Object.entries(courses.materials).map(([category, materials]) => [
          category,
          materials.map(m => ({ ...m, category }))
        ])
      ),
      faq: courses.faq,
      initialMessage: courses.initialMessage
    };
  }, [language]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    t,
    courseData
  }), [language, setLanguage, t, courseData]);

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

// Helper functions for course icons and colors
function getCourseIcon(id) {
  const icons = {
    python: '🐍',
    javascript: '⚡',
    html: '📄',
    css: '🎨',
    react: '⚛️'
  };
  return icons[id] || '📚';
}

function getCourseColor(id) {
  const colors = {
    python: 'bg-blue-500',
    javascript: 'bg-yellow-500',
    html: 'bg-orange-500',
    css: 'bg-purple-500',
    react: 'bg-cyan-500'
  };
  return colors[id] || 'bg-gray-500';
}
