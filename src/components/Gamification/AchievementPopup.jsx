// src/components/Gamification/AchievementPopup.jsx
// Popup уведомление о разблокировке достижения

import { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Trophy, X } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export const AchievementPopup = memo(({ achievement, onClose }) => {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));

    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300);
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={`fixed top-20 right-4 z-[100] transform transition-all duration-300 ${
        isVisible
          ? 'translate-x-0 opacity-100'
          : 'translate-x-full opacity-0'
      }`}
      role="alert"
      aria-live="assertive"
    >
      <div
        className={`flex items-center gap-4 p-4 rounded-xl shadow-2xl border max-w-sm ${
          theme === 'dark'
            ? 'bg-gray-800 border-yellow-500/50'
            : 'bg-white border-yellow-400'
        }`}
      >
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-lg">
          <span className="text-2xl" role="img" aria-hidden="true">
            {achievement.icon}
          </span>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-1 text-yellow-500 mb-0.5">
            <Trophy className="w-4 h-4" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-wide">
              Достижение разблокировано!
            </span>
          </div>
          <h4 className={`font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {achievement.title}
          </h4>
          <p className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {achievement.description}
          </p>
        </div>

        <button
          onClick={handleClose}
          className={`p-1 rounded-full transition ${
            theme === 'dark'
              ? 'hover:bg-gray-700 text-gray-400'
              : 'hover:bg-gray-100 text-gray-500'
          }`}
          aria-label="Закрыть уведомление"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
});

AchievementPopup.propTypes = {
  achievement: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

AchievementPopup.displayName = 'AchievementPopup';
