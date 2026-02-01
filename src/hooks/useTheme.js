// src/hooks/useTheme.js
// Хук для управления темой

import { useState, useEffect } from 'react';
import { saveTheme, getTheme } from '../services/storageService';

export const useTheme = () => {
  const [theme, setTheme] = useState(getTheme());

  useEffect(() => {
    saveTheme(theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return { theme, toggleTheme, setTheme };
};