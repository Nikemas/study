// src/components/Header/ThemeToggle.jsx

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg transition ${theme === 'dark'
          ? 'bg-gray-700 hover:bg-gray-600'
          : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
        }`}
      aria-label={theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему'}
      title={theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-yellow-400 transition-transform duration-500 rotate-0 hover:rotate-90" />
      ) : (
        <Moon className="w-5 h-5 transition-transform duration-500 rotate-0 hover:-rotate-12" />
      )}
    </button>
  );
};
