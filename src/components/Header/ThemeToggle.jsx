// src/components/Header/ThemeToggle.jsx

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../contexts/LanguageContext';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg transition bg-border/30 hover:bg-border/50 text-text"
      aria-label={theme === 'dark' ? t('theme.enableLight') : t('theme.enableDark')}
      title={theme === 'dark' ? t('theme.light') : t('theme.dark')}
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-yellow-400 transition-transform duration-500 rotate-0 hover:rotate-90" />
      ) : (
        <Moon className="w-5 h-5 transition-transform duration-500 rotate-0 hover:-rotate-12" />
      )}
    </button>
  );
};
