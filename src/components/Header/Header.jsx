// src/components/Header/Header.jsx

import { useState } from 'react';
import PropTypes from 'prop-types';
import { Book, MessageSquare, Database, History, Settings, LayoutDashboard } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSelector } from './LanguageSelector';
import { ApiKeyModal } from './ApiKeyModal';
import { LevelBadge } from './LevelBadge';
import { Tabs } from '../UI/Tabs';
import { Button } from '../UI/Button';
import { TABS } from '../../constants';

export const Header = ({ activeTab, setActiveTab, onNewChat }) => {
  const { t } = useLanguage();
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);

  const tabItems = [
    { value: TABS.DASHBOARD, label: t('tabs.dashboard'), icon: <LayoutDashboard className="w-4 h-4" /> },
    { value: TABS.CHAT, label: t('tabs.chat'), icon: <MessageSquare className="w-4 h-4" /> },
    { value: TABS.HISTORY, label: t('tabs.history'), icon: <History className="w-4 h-4" /> },
    { value: TABS.KNOWLEDGE, label: t('tabs.knowledge'), icon: <Database className="w-4 h-4" /> }
  ];

  return (
    <>
      <header className="sticky top-0 z-50 border-b transition-colors duration-300 backdrop-blur-md bg-surface/80 border-border">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-fit">
              <Button
                onClick={() => { onNewChat(); setActiveTab(TABS.CHAT); }}
                className="rounded-md"
              >
                <Book className="w-5 h-5" />
                <span className="hidden sm:inline">{t('chat.newChat')}</span>
              </Button>

              <div className="hidden sm:block">
                <h1 className="text-lg font-bold leading-tight font-display text-text">
                  AI Platform
                </h1>
                <p className="text-sm text-muted">
                  {t('header.subtitle')}
                </p>
              </div>
            </div>

            <nav className="hidden md:flex flex-1 justify-center overflow-x-auto no-scrollbar mx-2">
              <Tabs items={tabItems} value={activeTab} onChange={setActiveTab} />
            </nav>

            <nav className="flex gap-1 md:gap-2 items-center min-w-fit">
              <LevelBadge />
              <LanguageSelector />
              <ThemeToggle />
              <button
                onClick={() => setIsApiKeyModalOpen(true)}
                className="p-2 rounded-full transition hover:bg-border/30 text-text"
                aria-label={t('apiKey.settings')}
              >
                <Settings className="w-5 h-5" />
              </button>
            </nav>
          </div>
        </div>
      </header>
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
      />
    </>
  );
};

Header.propTypes = {
  activeTab: PropTypes.oneOf([TABS.DASHBOARD, TABS.CHAT, TABS.HISTORY, TABS.KNOWLEDGE]).isRequired,
  setActiveTab: PropTypes.func.isRequired,
  onNewChat: PropTypes.func.isRequired
};
