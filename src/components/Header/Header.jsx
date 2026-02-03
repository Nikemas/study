// src/components/Header/Header.jsx

import PropTypes from 'prop-types';
import { Book, MessageSquare, Database, History, Settings } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { TabButton } from '../UI/TabButton';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSelector } from './LanguageSelector';
import { LevelBadge } from './LevelBadge';
import { themeClasses } from '../../utils/themeUtils';

export const Header = ({ activeTab, setActiveTab }) => {
  const { theme } = useTheme();

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 backdrop-blur-md ${theme === 'dark'
          ? 'bg-gray-900/80 border-gray-800'
          : 'bg-white/80 border-gray-200'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3 min-w-fit">
            <div className="bg-primary p-2 rounded-lg shadow-lg shadow-primary/20">
              <Book className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className={`text-lg font-bold leading-tight ${themeClasses.text(theme)}`}>
                AI Platform
              </h1>
              <p className={`text-sm ${themeClasses.textMuted(theme)}`}>
                AI-помощник по веб-разработке
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 flex justify-center overflow-x-auto no-scrollbar mx-2">
            <div className="flex gap-1 p-1 bg-gray-100/50 dark:bg-gray-800/50 rounded-xl">
              <TabButton
                active={activeTab === 'chat'}
                onClick={() => setActiveTab('chat')}
                icon={<MessageSquare className="w-4 h-4" />}
                label="Чат"
              />

              <TabButton
                active={activeTab === 'history'}
                onClick={() => setActiveTab('history')}
                icon={<History className="w-4 h-4" />}
                label="История"
              />

              <TabButton
                active={activeTab === 'knowledge'}
                onClick={() => setActiveTab('knowledge')}
                icon={<Database className="w-4 h-4" />}
                label="База знаний"
              />
            </div>
          </nav>

          {/* Actions */}
          <nav className="flex gap-2 items-center min-w-fit">
            <LevelBadge />
            <LanguageSelector />
            <ThemeToggle />
            <button
              className={`p-2 rounded-lg transition ${theme === 'dark'
                  ? 'hover:bg-gray-800 text-gray-400 hover:text-white'
                  : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}
              aria-label="Настройки"
            >
              <Settings className="w-5 h-5" />
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  activeTab: PropTypes.oneOf(['chat', 'history', 'knowledge']).isRequired,
  setActiveTab: PropTypes.func.isRequired
};
