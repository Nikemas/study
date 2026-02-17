// src/contexts/GamificationContext.jsx
// Контекст для системы геймификации (XP, уровни, достижения)

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  getGamificationData,
  saveGamificationData,
  getAchievements,
  saveAchievements
} from '../services/storageService';
import {
  LEVEL_CONFIG,
  XP_REWARDS,
  ACHIEVEMENTS_CONFIG,
  getDefaultGamificationData
} from '../config/gamificationConfig';

import { useSettings } from './SettingsContext';

const GamificationContext = createContext(null);

export const GamificationProvider = ({ children, onAchievementUnlock }) => {
  const { playSound } = useSettings();
  const [gamification, setGamification] = useState(() =>
    getGamificationData() || getDefaultGamificationData()
  );
  const [unlockedAchievements, setUnlockedAchievements] = useState(() =>
    getAchievements()
  );

  const calculateLevel = useCallback((xp) => {
    const levelData = LEVEL_CONFIG.thresholds
      .slice()
      .reverse()
      .find(l => xp >= l.minXP);
    return levelData || LEVEL_CONFIG.thresholds[0];
  }, []);

  const currentLevelData = calculateLevel(gamification.xp);

  const levelProgress = (() => {
    const { minXP, maxXP } = currentLevelData;
    if (maxXP === Infinity) return 100;
    const progressXP = gamification.xp - minXP;
    const levelRange = maxXP - minXP;
    return Math.min(100, Math.round((progressXP / levelRange) * 100));
  })();

  const checkAchievements = useCallback((stats, level) => {
    const newAchievements = [];

    ACHIEVEMENTS_CONFIG.forEach(achievement => {
      const isUnlocked = unlockedAchievements.includes(achievement.id);
      if (!isUnlocked && achievement.condition(stats, level)) {
        newAchievements.push(achievement);
      }
    });

    if (newAchievements.length > 0) {
      const newUnlockedIds = [
        ...unlockedAchievements,
        ...newAchievements.map(a => a.id)
      ];
      setUnlockedAchievements(newUnlockedIds);
      saveAchievements(newUnlockedIds);

      playSound('unlock');

      newAchievements.forEach(achievement => {
        onAchievementUnlock?.(achievement);
      });
    }
  }, [unlockedAchievements, onAchievementUnlock, playSound]);

  const addXP = useCallback((type) => {
    const xpAmount = XP_REWARDS[type] || 0;
    if (xpAmount === 0) return;

    setGamification(prev => {
      const statKey = type === 'MESSAGE' ? 'messages'
        : type === 'LESSON' ? 'lessons'
          : type === 'TEST' ? 'tests'
            : type === 'PRACTICE_ATTEMPT' ? 'practiceAttempts'
              : type === 'PRACTICE_PASS' ? 'practicePasses'
                : type === 'STAGE_COMPLETE' ? 'stages'
            : null;

      const newStats = statKey
        ? { ...prev.stats, [statKey]: (prev.stats[statKey] || 0) + 1 }
        : prev.stats;

      const newXP = prev.xp + xpAmount;
      const newLevelData = calculateLevel(newXP);

      const newData = {
        ...prev,
        xp: newXP,
        level: newLevelData.level,
        stats: newStats,
      };

      saveGamificationData(newData);

      setTimeout(() => checkAchievements(newStats, newLevelData.level), 0);

      return newData;
    });
  }, [calculateLevel, checkAchievements]);

  useEffect(() => {
    saveGamificationData(gamification);
  }, [gamification]);

  const value = {
    xp: gamification.xp,
    level: currentLevelData.level,
    levelTitle: currentLevelData.title,
    levelProgress,
    stats: gamification.stats,
    unlockedAchievements,
    allAchievements: ACHIEVEMENTS_CONFIG,
    addXP,
  };

  return (
    <GamificationContext.Provider value={value}>
      {children}
    </GamificationContext.Provider>
  );
};

export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification must be used within GamificationProvider');
  }
  return context;
};
