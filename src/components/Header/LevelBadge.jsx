import { memo, useState } from 'react';
import { Star } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useGamification } from '../../contexts/GamificationContext';
import { AchievementsList } from '../Gamification/AchievementsList';

export const LevelBadge = memo(() => {
  const { theme } = useTheme();
  const { level, levelTitle, levelProgress, xp } = useGamification();
  const [showAchievements, setShowAchievements] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setShowAchievements(true)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition hover:scale-105 active:scale-95 text-left ${
          theme === 'dark'
            ? 'bg-[#0f1a30] border border-white/10 hover:border-indigo-400/50'
            : 'bg-gray-100 border border-gray-200 hover:border-indigo-300'
        }`}
        aria-label={`Level ${level}: ${levelTitle}, ${xp} XP. Open achievements.`}
      >
        <div className="relative">
          <Star
            className={`w-5 h-5 ${level >= 5 ? 'text-yellow-500' : 'text-indigo-500'}`}
            fill="currentColor"
            aria-hidden="true"
          />
          <span className="absolute -top-1 -right-1 text-[10px] font-bold bg-indigo-600 text-white rounded-full w-4 h-4 flex items-center justify-center">
            {level}
          </span>
        </div>

        <div className="hidden sm:flex flex-col min-w-[96px]">
          <span className={`${theme === 'dark' ? 'text-slate-200' : 'text-gray-700'} text-xs font-semibold`}>
            {levelTitle}
          </span>
          <div className={`${theme === 'dark' ? 'bg-slate-700/70' : 'bg-gray-300'} h-1.5 rounded-full overflow-hidden mt-0.5`}>
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
      </button>

      <AchievementsList
        isOpen={showAchievements}
        onClose={() => setShowAchievements(false)}
      />
    </>
  );
});

LevelBadge.displayName = 'LevelBadge';
