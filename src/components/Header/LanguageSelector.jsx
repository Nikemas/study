// src/components/Header/LanguageSelector.jsx

import { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../hooks/useTheme';
import { LANGUAGE_NAMES } from '../../constants';

export const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'ru', name: LANGUAGE_NAMES.ru, flag: '🇷🇺' },
    { code: 'en', name: LANGUAGE_NAMES.en, flag: '🇬🇧' },
    { code: 'ky', name: LANGUAGE_NAMES.ky, flag: '🇰🇬' }
  ];

  const currentLang = languages.find(l => l.code === language);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code) => {
    setLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-8 h-8 flex items-center justify-center rounded-lg transition ${theme === 'dark'
          ? 'hover:bg-white/5 text-gray-400 hover:text-white'
          : 'hover:bg-gray-200 text-gray-600 hover:text-gray-900'
        }`}
        aria-label={t('language.select')}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        title={currentLang?.name}
      >
        <Globe className="w-5 h-5" />
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 mt-2 py-1 w-36 rounded-xl shadow-xl border z-50 ${theme === 'dark'
            ? 'glass border-white/10'
            : 'light-glass border-gray-200'
          }`}
          role="listbox"
          aria-label={t('language.select')}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang.code)}
              className={`w-full px-3 py-2 text-left flex items-center gap-2 transition rounded-lg mx-1 ${language === lang.code
                ? theme === 'dark'
                  ? 'bg-primary/20 text-primary'
                  : 'bg-primary/10 text-primary'
                : theme === 'dark'
                  ? 'hover:bg-white/5 text-gray-300'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
              role="option"
              aria-selected={language === lang.code}
            >
              <span className="text-base">{lang.flag}</span>
              <span className="text-xs font-medium">{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
