// src/components/Header/Header.jsx

import PropTypes from 'prop-types';
import { Book, MessageSquare, Database, History } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { TabButton } from '../UI/TabButton';
import { ThemeToggle } from './ThemeToggle';
import { themeClasses } from '../../utils/themeUtils';

export const Header = ({ activeTab, setActiveTab }) => {
  const { theme } = useTheme();

  return (
    <header
      className={`${themeClasses.card(theme)} shadow-md border-b transition-colors`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg shadow-lg">
              <Book className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className={`text-xl font-bold ${themeClasses.text(theme)}`}>
                Образовательная платформа
              </h1>
              <p className={`text-sm ${themeClasses.textMuted(theme)}`}>
                AI-помощник по веб-разработке
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex gap-2 items-center flex-wrap">
            <ThemeToggle />

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
