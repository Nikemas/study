// src/components/Header/Header.jsx

import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Book, MessageSquare, Database, History, Settings, Trophy } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../contexts/LanguageContext';
import { TabButton } from '../UI/TabButton';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSelector } from './LanguageSelector';
import { ApiKeyModal } from './ApiKeyModal';
import { themeClasses } from '../../utils/themeUtils';
import { getOverallStats } from '../../services/progressService';
import { getAllMaterials, getAllQuizIds } from '../../data/courseData';

export const Header = ({ activeTab, setActiveTab, progressKey = 0 }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const isDark = theme === 'dark';

  const overallStats = useMemo(() => {
    const allMaterials = getAllMaterials();
    const allQuizIds = getAllQuizIds();
    return getOverallStats(allMaterials, allQuizIds);
  }, [progressKey]);

  return (
    <header
      className={`${themeClasses.card(theme)} shadow-md border-b transition-colors`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Top row with language selector */}
        <div className="flex items-center justify-end mb-3">
          <LanguageSelector />
        </div>

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

          {/* Progress indicator */}
          <div className={`hidden sm:flex items-center gap-3 px-4 py-2 rounded-lg ${
            isDark ? 'bg-gray-700/50' : 'bg-gray-100'
          }`}>
            <Trophy size={18} className={overallStats.overallProgress === 100 ? 'text-yellow-500' : isDark ? 'text-gray-400' : 'text-gray-500'} />
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className={`text-xs ${themeClasses.textSecondary(theme)}`}>
                  {t('progress.overall')}
                </span>
                <span className={`text-sm font-bold ${
                  overallStats.overallProgress === 100
                    ? 'text-green-500'
                    : isDark ? 'text-indigo-400' : 'text-indigo-600'
                }`}>
                  {overallStats.overallProgress}%
                </span>
              </div>
              <div className={`w-24 h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-gray-600' : 'bg-gray-200'}`}>
                <div
                  className={`h-full transition-all duration-500 ${
                    overallStats.overallProgress === 100 ? 'bg-green-500' : 'bg-indigo-600'
                  }`}
                  style={{ width: `${overallStats.overallProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex gap-2 items-center flex-wrap">
            <ThemeToggle />

            <button
              onClick={() => setIsApiKeyModalOpen(true)}
              className={`p-2 rounded-lg transition ${
                theme === 'dark'
                  ? 'bg-gray-700 hover:bg-gray-600'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
              aria-label={t('apiKey.settings')}
              title={t('apiKey.settings')}
            >
              <Settings className={`w-5 h-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`} />
            </button>

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

      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
      />
    </header>
  );
};

Header.propTypes = {
  activeTab: PropTypes.oneOf(['chat', 'history', 'knowledge']).isRequired,
  setActiveTab: PropTypes.func.isRequired,
  progressKey: PropTypes.number
};
