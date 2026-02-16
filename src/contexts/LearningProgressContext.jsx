import React, { createContext, useContext, useState, useEffect } from 'react';
import { LEARNING_STAGES } from '../data/v2';
import * as storageService from '../services/storageService';

const LearningProgressContext = createContext();

export const useLearningProgress = () => {
  const context = useContext(LearningProgressContext);
  if (!context) {
    throw new Error('useLearningProgress must be used within LearningProgressProvider');
  }
  return context;
};

export const LearningProgressProvider = ({ children }) => {
  const [userProgress, setUserProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  // Инициализация прогресса
  useEffect(() => {
    initializeProgress();
  }, []);

  const initializeProgress = () => {
    let progress = storageService.getUserProgress();

    if (!progress) {
      // Создать новый прогресс
      progress = createInitialProgress();
      storageService.saveUserProgress(progress);
    }

    setUserProgress(progress);
    setLoading(false);
  };

  const createInitialProgress = () => {
    return {
      userId: 'user-' + Date.now(),
      currentStage: 'html',
      stages: LEARNING_STAGES.map((stage, index) => ({
        stageId: stage.id,
        status: index === 0 ? 'in_progress' : 'locked',
        completionPercentage: 0,
        startedAt: index === 0 ? new Date().toISOString() : null,
        completedAt: null,
        substages: stage.substages.map((substage, subIndex) => ({
          substageId: substage.id,
          status: index === 0 && subIndex === 0 ? 'in_progress' : 'locked',
          materialRead: false,
          practiceAttempts: 0,
          practiceScore: 0,
          quizScore: null,
          timeSpent: 0,
          completedAt: null
        })),
        achievements: []
      })),
      stats: {
        totalTimeSpent: 0,
        totalXP: 0,
        level: 1,
        streak: 0,
        completedPractices: 0
      }
    };
  };

  const updateSubstageProgress = (stageId, substageId, updates) => {
    setUserProgress(prev => {
      const newProgress = { ...prev };
      const stageIndex = newProgress.stages.findIndex(s => s.stageId === stageId);

      if (stageIndex === -1) return prev;

      const substageIndex = newProgress.stages[stageIndex].substages
        .findIndex(s => s.substageId === substageId);

      if (substageIndex === -1) return prev;

      newProgress.stages[stageIndex].substages[substageIndex] = {
        ...newProgress.stages[stageIndex].substages[substageIndex],
        ...updates
      };

      // Пересчитать прогресс этапа
      recalculateStageProgress(newProgress, stageId);

      // Сохранить
      storageService.saveUserProgress(newProgress);

      return newProgress;
    });
  };

  const completeSubstage = (stageId, substageId, score = null) => {
    updateSubstageProgress(stageId, substageId, {
      status: 'completed',
      completedAt: new Date().toISOString(),
      practiceScore: score || 100
    });

    // Проверить разблокировку следующего подэтапа
    unlockNextSubstage(stageId, substageId);
  };

  const markMaterialAsRead = (stageId, substageId) => {
    updateSubstageProgress(stageId, substageId, {
      materialRead: true,
      status: 'completed',
      completedAt: new Date().toISOString()
    });

    // Разблокировать следующий подэтап
    unlockNextSubstage(stageId, substageId);
  };

  const unlockNextSubstage = (stageId, currentSubstageId) => {
    const stage = LEARNING_STAGES.find(s => s.id === stageId);
    if (!stage) return;

    const currentIndex = stage.substages.findIndex(s => s.id === currentSubstageId);

    if (currentIndex < stage.substages.length - 1) {
      const nextSubstageId = stage.substages[currentIndex + 1].id;

      updateSubstageProgress(stageId, nextSubstageId, {
        status: 'in_progress'
      });
    }
  };

  const recalculateStageProgress = (progress, stageId) => {
    const stageIndex = progress.stages.findIndex(s => s.stageId === stageId);
    if (stageIndex === -1) return;

    const stage = progress.stages[stageIndex];
    const completedCount = stage.substages.filter(s => s.status === 'completed').length;
    const totalCount = stage.substages.length;

    stage.completionPercentage = totalCount > 0
      ? Math.round((completedCount / totalCount) * 100)
      : 0;

    // Если этап завершен на 100%, разблокировать следующий
    if (stage.completionPercentage === 100) {
      stage.status = 'completed';
      stage.completedAt = new Date().toISOString();

      // Разблокировать следующий этап
      if (stageIndex < progress.stages.length - 1) {
        progress.stages[stageIndex + 1].status = 'in_progress';
        progress.stages[stageIndex + 1].startedAt = new Date().toISOString();

        // Разблокировать первый подэтап следующего этапа
        if (progress.stages[stageIndex + 1].substages.length > 0) {
          progress.stages[stageIndex + 1].substages[0].status = 'in_progress';
        }

        progress.currentStage = progress.stages[stageIndex + 1].stageId;
      }
    } else if (stage.completionPercentage >= 80 && stageIndex < progress.stages.length - 1) {
      // Разблокировать следующий этап при 80% завершении
      if (progress.stages[stageIndex + 1].status === 'locked') {
        progress.stages[stageIndex + 1].status = 'in_progress';
        progress.stages[stageIndex + 1].startedAt = new Date().toISOString();

        // Разблокировать первый подэтап следующего этапа
        if (progress.stages[stageIndex + 1].substages.length > 0) {
          progress.stages[stageIndex + 1].substages[0].status = 'in_progress';
        }
      }
    }
  };

  const getStageProgress = (stageId) => {
    if (!userProgress) return null;
    return userProgress.stages.find(s => s.stageId === stageId);
  };

  const getSubstageProgress = (stageId, substageId) => {
    const stage = getStageProgress(stageId);
    if (!stage) return null;
    return stage.substages.find(s => s.substageId === substageId);
  };

  const value = {
    userProgress,
    loading,
    updateSubstageProgress,
    completeSubstage,
    markMaterialAsRead,
    getStageProgress,
    getSubstageProgress,
    initializeProgress
  };

  return (
    <LearningProgressContext.Provider value={value}>
      {children}
    </LearningProgressContext.Provider>
  );
};
