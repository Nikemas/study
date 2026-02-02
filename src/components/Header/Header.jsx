// src/components/Header/Header.jsx

import PropTypes from 'prop-types';
import { Book, MessageSquare, Database, History } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../contexts/LanguageContext';
import { TabButton } from '../UI/TabButton';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSelector } from './LanguageSelector';
import { themeClasses } from '../../utils/themeUtils';

export const Header = ({ activeTab, setActiveTab }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();

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
                {t('header.title')}
              </h1>
              <p className={`text-sm ${themeClasses.textMuted(theme)}`}>
                {t('header.subtitle')}
              </p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex gap-2 items-center flex-wrap">
            <LanguageSelector />
            <ThemeToggle />

            <TabButton
              active={activeTab === 'chat'}
              onClick={() => setActiveTab('chat')}
              icon={<MessageSquare className="w-4 h-4" />}
              label={t('tabs.chat')}
            />

            <TabButton
              active={activeTab === 'history'}
              onClick={() => setActiveTab('history')}
              icon={<History className="w-4 h-4" />}
              label={t('tabs.history')}
            />

            <TabButton
              active={activeTab === 'knowledge'}
              onClick={() => setActiveTab('knowledge')}
              icon={<Database className="w-4 h-4" />}
              label={t('tabs.knowledge')}
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
