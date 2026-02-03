// src/components/Header/LevelBadge.jsx
// Бейдж уровня пользователя с прогресс-баром

import { memo } from 'react';
import { Star } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useGamification } from '../../contexts/GamificationContext';

export const LevelBadge = memo(() => {
  const { theme } = useTheme();
  const { level, levelTitle, levelProgress, xp } = useGamification();

  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition ${
        theme === 'dark'
          ? 'bg-gray-800 border border-gray-700'
          : 'bg-gray-100 border border-gray-200'
      }`}
      role="status"
      aria-label={`Уровень ${level}: ${levelTitle}, ${xp} XP`}
    >
      <div className="relative">
        <Star
          className={`w-5 h-5 ${
            level >= 5 ? 'text-yellow-500' : 'text-indigo-500'
          }`}
          fill="currentColor"
          aria-hidden="true"
        />
        <span
          className="absolute -top-1 -right-1 text-xs font-bold bg-indigo-600 text-white rounded-full w-4 h-4 flex items-center justify-center"
        >
          {level}
        </span>
      </div>

      <div className="flex flex-col min-w-[80px]">
        <span className={`text-xs font-medium ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {levelTitle}
        </span>

        <div className={`h-1.5 rounded-full overflow-hidden ${
          theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'
        }`}>
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
            style={{ width: `${levelProgress}%` }}
            role="progressbar"
            aria-valuenow={levelProgress}
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>
      </div>
    </div>
  );
});

LevelBadge.displayName = 'LevelBadge';
