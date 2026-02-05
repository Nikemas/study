import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { X, Lock, Trophy } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useGamification } from '../../contexts/GamificationContext';
import { useLanguage } from '../../contexts/LanguageContext';

export const AchievementsList = ({ isOpen, onClose }) => {
    const { theme } = useTheme();
    const { t } = useLanguage();
    const { allAchievements, unlockedAchievements } = useGamification();

    if (!isOpen) return null;

    const isDark = theme === 'dark';

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className={`absolute inset-0 ${isDark ? 'bg-black/80' : 'bg-black/60'
                    } backdrop-blur-md`}
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal */}
            <div
                className={`relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl shadow-2xl ${isDark ? 'glass-card' : 'light-glass-card'
                    } animate-slideUp z-10`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="achievements-modal-title"
            >
                {/* Header */}
                <div className={`flex items-center justify-between p-6 border-b ${isDark ? 'border-white/10' : 'border-gray-200'
                    }`}>
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl ${isDark ? 'bg-yellow-500/10 border border-yellow-500/20' : 'bg-yellow-100 border border-yellow-200'
                            } flex items-center justify-center`}>
                            <Trophy className={`w-5 h-5 ${isDark ? 'text-yellow-400' : 'text-yellow-600'}`} />
                        </div>
                        <div>
                            <h2
                                id="achievements-modal-title"
                                className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} font-display`}
                            >
                                {t('achievements.title') || 'Achievements'}
                            </h2>
                            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                {unlockedAchievements.length} / {allAchievements.length} {t('achievements.unlocked') || 'Unlocked'}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className={`p-2 rounded-xl transition ${isDark
                            ? 'hover:bg-white/5 text-gray-400 hover:text-white'
                            : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                            }`}
                        aria-label="Close"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content (Scrollable) */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {allAchievements.map((achievement) => {
                            const isUnlocked = unlockedAchievements.includes(achievement.id);

                            // Try to get translation, fallback to data object
                            // Note: We use the achievement.id which matches keys in ui.js
                            const titleKey = `achievements.items.${achievement.id}.title`;
                            const descKey = `achievements.items.${achievement.id}.description`;

                            const title = t(titleKey) === titleKey ? achievement.title : t(titleKey) || achievement.title;
                            const description = t(descKey) === descKey ? achievement.description : t(descKey) || achievement.description;

                            return (
                                <div
                                    key={achievement.id}
                                    className={`relative p-4 rounded-xl border transition-all ${isUnlocked
                                        ? isDark
                                            ? 'bg-white/5 border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.1)]'
                                            : 'bg-white border-indigo-200 shadow-sm'
                                        : isDark
                                            ? 'bg-white/5 border-white/5 opacity-60'
                                            : 'bg-gray-50 border-gray-200 opacity-60'
                                        }`}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${isUnlocked
                                            ? isDark ? 'bg-indigo-500/10' : 'bg-indigo-50'
                                            : isDark ? 'bg-gray-800' : 'bg-gray-200'
                                            } ${!isUnlocked && 'grayscale'}`}>
                                            {isUnlocked ? achievement.icon : <Lock className="w-5 h-5 text-gray-400" />}
                                        </div>

                                        <div>
                                            <h3 className={`font-bold mb-1 ${isUnlocked
                                                ? isDark ? 'text-white' : 'text-gray-900'
                                                : isDark ? 'text-gray-400' : 'text-gray-500'
                                                }`}>
                                                {title}
                                            </h3>
                                            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'
                                                }`}>
                                                {description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

AchievementsList.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};
