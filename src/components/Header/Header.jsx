// src/components/Header/Header.jsx

import { useState } from 'react';
import PropTypes from 'prop-types';
import { Book, MessageSquare, Database, History, Settings, LayoutDashboard } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ThemeToggle } from './ThemeToggle';
import { LanguageSelector } from './LanguageSelector';
import { ApiKeyModal } from './ApiKeyModal';
import { LevelBadge } from './LevelBadge';
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
      <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-xl bg-[#121b31]/95">
        <div className="max-w-[1500px] mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-fit">
              <Button
                onClick={() => { onNewChat(); setActiveTab(TABS.CHAT); }}
                className="rounded-2xl bg-[#f7a641] hover:bg-[#ffb24f] text-white px-5 py-3 shadow-none"
              >
                <Book className="w-5 h-5" />
                <span className="hidden sm:inline">{t('chat.newChat')}</span>
              </Button>

              <div className="hidden sm:block">
                <h1 className="text-[36px] font-bold leading-tight font-display text-white">
                  AI Platform
                </h1>
                <p className="text-sm text-slate-300">
                  {t('header.subtitle')}
                </p>
              </div>
            </div>

            <nav className="hidden md:flex flex-1 justify-center overflow-x-auto no-scrollbar mx-2">
              <div className="inline-flex items-center gap-1 rounded-2xl bg-[#101a2f]/90 border border-white/10 p-1.5" role="tablist">
                {tabItems.map((item) => {
                  const active = activeTab === item.value;
                  return (
                    <button
                      key={item.value}
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveTab(item.value)}
                      className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                        active
                          ? 'bg-[#f7a641] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]'
                          : 'text-slate-200 hover:bg-white/10'
                      }`}
                    >
                      {item.icon}
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </nav>

            <nav className="flex gap-1 md:gap-2 items-center min-w-fit">
              <LevelBadge />
              <LanguageSelector />
              <ThemeToggle />
              <button
                onClick={() => setIsApiKeyModalOpen(true)}
                className="p-2 rounded-full transition hover:bg-white/10 text-white"
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
