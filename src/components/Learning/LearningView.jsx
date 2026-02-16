import React, { useState } from 'react';
import { LEARNING_STAGES } from '../../data/v2';
import { useLearningProgress } from '../../contexts/LearningProgressContext';
import StageNavigator from './StageNavigator';
import StageContent from './StageContent';

const LearningView = () => {
  const { userProgress, loading } = useLearningProgress();
  const [selectedStageId, setSelectedStageId] = useState(
    userProgress?.currentStage || 'html'
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Загрузка...</p>
        </div>
      </div>
    );
  }

  if (!userProgress) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-600">
          <p>Ошибка загрузки прогресса</p>
        </div>
      </div>
    );
  }

  const selectedStage = LEARNING_STAGES.find(s => s.id === selectedStageId);
  const stageProgress = userProgress.stages.find(s => s.stageId === selectedStageId);

  return (
    <div className="learning-view max-w-7xl mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
          Обучение фронтенд-разработке
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Пошаговое изучение веб-разработки от основ до продвинутых тем
        </p>
      </div>

      <StageNavigator
        stages={LEARNING_STAGES}
        selectedStageId={selectedStageId}
        onSelectStage={setSelectedStageId}
        userProgress={userProgress}
      />

      <StageContent
        stage={selectedStage}
        stageProgress={stageProgress}
      />
    </div>
  );
};

export default LearningView;
