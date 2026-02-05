import React from 'react';
import PropTypes from 'prop-types';
import { MessageSquare, History, Database } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export const MobileNavigation = ({ activeTab, setActiveTab }) => {
    const { theme } = useTheme();

    const navItems = [
        { id: 'chat', label: 'Чат', icon: MessageSquare },
        { id: 'history', label: 'История', icon: History },
        { id: 'knowledge', label: 'База знаний', icon: Database },
    ];

    return (
        <nav
            className={`fixed bottom-0 left-0 right-0 z-50 border-t pb-safe pt-2 px-4 md:hidden transition-colors duration-300 backdrop-blur-lg ${theme === 'dark'
                    ? 'bg-gray-900/90 border-gray-800'
                    : 'bg-white/90 border-gray-200'
                }`}
        >
            <div className="flex justify-around items-center h-14">
                {navItems.map((item) => {
                    const isActive = activeTab === item.id;
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${isActive
                                    ? 'text-indigo-600 dark:text-indigo-400'
                                    : theme === 'dark'
                                        ? 'text-gray-500 hover:text-gray-300'
                                        : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            <Icon
                                className={`w-6 h-6 transition-transform duration-200 ${isActive ? 'scale-110' : ''
                                    }`}
                                strokeWidth={isActive ? 2.5 : 2}
                            />
                            <span className="text-[10px] font-medium leading-none">
                                {item.label}
                            </span>
                            {isActive && (
                                <span className="absolute -top-px left-1/2 -translate-x-1/2 w-8 h-1 bg-indigo-600 dark:bg-indigo-400 rounded-b-full shadow-[0_0_8px_rgba(79,70,229,0.5)]" />
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
