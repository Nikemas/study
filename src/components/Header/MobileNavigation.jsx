import React from 'react';
import PropTypes from 'prop-types';
import { MessageSquare, History, Database, LayoutDashboard } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { TABS } from '../../constants';

export const MobileNavigation = ({ activeTab, setActiveTab }) => {
    const { t } = useLanguage();

    const navItems = [
        { id: TABS.DASHBOARD, label: t('tabs.dashboard'), icon: LayoutDashboard },
        { id: TABS.CHAT, label: t('tabs.chat'), icon: MessageSquare },
        { id: TABS.HISTORY, label: t('tabs.history'), icon: History },
        { id: TABS.KNOWLEDGE, label: t('tabs.knowledge'), icon: Database },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 border-t pb-safe pt-2 px-4 md:hidden transition-colors duration-300 backdrop-blur-lg bg-surface/90 border-border">
            <div className="flex justify-around items-center h-14">
                {navItems.map((item) => {
                    const isActive = activeTab === item.id;
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${isActive
                                    ? 'text-primary'
                                    : 'text-muted hover:text-text'
                                }`}
                        >
                            <Icon
                                className={`w-6 h-6 transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}
                                strokeWidth={isActive ? 2.5 : 2}
                            />
                            <span className="text-[10px] font-medium leading-none">
                                {item.label}
                            </span>
                            {isActive && (
                                <span className="absolute -top-px left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-b-full shadow-[0_0_8px_rgba(255,122,0,0.5)]" />
                            )}
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};

MobileNavigation.propTypes = {
    activeTab: PropTypes.string.isRequired,
    setActiveTab: PropTypes.func.isRequired,
};
