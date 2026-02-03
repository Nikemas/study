// src/components/Header/Header.jsx

import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Book, Settings, Trophy } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../contexts/LanguageContext';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSelector } from './LanguageSelector';
import { ApiKeyModal } from './ApiKeyModal';
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
    <>
      {/* Glow effect background */}
      {isDark && (
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-indigo-900/20 blur-[120px] rounded-full pointer-events-none z-0" />
      )}

      <header
        className={`fixed top-6 left-6 right-6 h-auto z-50 ${
          isDark ? 'glass' : 'light-glass'
        } rounded-2xl shadow-2xl transition-all`}
      >
        <div className="px-6 py-3">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* Left: Logo and Navigation */}
            <div className="flex items-center gap-4">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                  <Book className="w-4 h-4 text-white" />
                </div>
                <div className="hidden sm:block">
                  <h1 className={`text-sm font-semibold tracking-wide ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {t('header.title')}
                  </h1>
                </div>
              </div>

              {/* Divider */}
              <div className={`h-4 w-px ${isDark ? 'bg-white/10' : 'bg-gray-300'}`} />

              {/* Navigation Tabs */}
              <nav className={`flex items-center ${isDark ? 'bg-white/5' : 'bg-gray-200/50'} rounded-lg p-0.5`}>
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`px-3 py-1.5 text-xs font-medium transition-all rounded ${
                    activeTab === 'chat'
                      ? isDark
                        ? 'text-white bg-white/10 shadow-sm'
                        : 'text-gray-900 bg-white shadow-sm'
                      : isDark
                      ? 'text-gray-400 hover:text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {t('tabs.chat')}
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`px-3 py-1.5 text-xs font-medium transition-all rounded ${
                    activeTab === 'history'
                      ? isDark
                        ? 'text-white bg-white/10 shadow-sm'
                        : 'text-gray-900 bg-white shadow-sm'
                      : isDark
                      ? 'text-gray-400 hover:text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {t('tabs.history')}
                </button>
                <button
                  onClick={() => setActiveTab('knowledge')}
                  className={`px-3 py-1.5 text-xs font-medium transition-all rounded ${
                    activeTab === 'knowledge'
                      ? isDark
                        ? 'text-white bg-white/10 shadow-sm'
                        : 'text-gray-900 bg-white shadow-sm'
                      : isDark
                      ? 'text-gray-400 hover:text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {t('tabs.knowledge')}
                </button>
              </nav>
            </div>

            {/* Right: Progress, Actions, Language */}
            <div className="flex items-center gap-3">
              {/* Progress indicator */}
              <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full ${
                isDark ? 'border border-white/5 bg-white/5' : 'border border-gray-300 bg-gray-100'
              }`}>
                <Trophy size={16} className={overallStats.overallProgress === 100 ? 'text-amber-400' : 'text-primary'} />
                <span className={`text-xs font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {overallStats.overallProgress}% XP
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <ThemeToggle />

                <button
                  onClick={() => setIsApiKeyModalOpen(true)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg transition ${
                    isDark
                      ? 'hover:bg-white/5 text-gray-400 hover:text-white'
                      : 'hover:bg-gray-200 text-gray-600 hover:text-gray-900'
                  }`}
                  aria-label={t('apiKey.settings')}
                  title={t('apiKey.settings')}
                >
                  <Settings className="w-5 h-5" />
                </button>

                {/* Language Selector */}
                <LanguageSelector />
              </div>
            </div>
          </div>
        </div>

        <ApiKeyModal
          isOpen={isApiKeyModalOpen}
          onClose={() => setIsApiKeyModalOpen(false)}
        />
      </header>
    </>
  );
};

Header.propTypes = {
  activeTab: PropTypes.oneOf(['chat', 'history', 'knowledge']).isRequired,
  setActiveTab: PropTypes.func.isRequired,
  progressKey: PropTypes.number
};
