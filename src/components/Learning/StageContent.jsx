import React, { useState } from 'react';
import SubstageCard from './SubstageCard';
import MaterialViewer from './MaterialViewer';
import PracticeZone from './PracticeZone';
import LockOverlay from './LockOverlay';
import { Clock, BookOpen } from 'lucide-react';

const StageContent = ({ stage, stageProgress }) => {
  const [selectedSubstage, setSelectedSubstage] = useState(null);

  if (!stage || !stageProgress) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-12">
        Выберите этап для просмотра
      </div>
    );
  }

  const isLocked = stageProgress.status === 'locked';

  if (isLocked) {
    return (
      <LockOverlay
        reason="Этот этап пока недоступен"
        requirement="Завершите предыдущий этап минимум на 80%"
      />
    );
  }

  const completedCount = stageProgress.substages.filter(s => s.status === 'completed').length;
  const totalCount = stage.substages.length;

  return (
    <div className="stage-content">
      {/* Заголовок этапа */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-start gap-4">
          <div className="text-5xl">{stage.icon}</div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
              {stage.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {stage.description}
            </p>

            {/* Прогресс */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span className="font-medium">Прогресс этапа</span>
                <span>{stageProgress.completionPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  className={`${stage.color} h-3 rounded-full transition-all duration-300`}
                  style={{ width: `${stageProgress.completionPercentage}%` }}
                />
              </div>
            </div>

            {/* Статистика */}
            <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>Завершено: {completedCount} из {totalCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Примерное время: ~{stage.estimatedHours} часов</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Список подэтапов */}
      <div className="substages-list space-y-3 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Подэтапы
        </h3>

        {stage.substages.map((substage, index) => {
          const substageProgress = stageProgress.substages[index];

          return (
            <SubstageCard
              key={substage.id}
              substage={substage}
              progress={substageProgress}
              onSelect={() => setSelectedSubstage(substage)}
              isSelected={selectedSubstage?.id === substage.id}
            />
          );
        })}
      </div>

      {/* Просмотр материала или практика */}
      {selectedSubstage && (
        <div className="substage-viewer bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          {selectedSubstage.type === 'theory' && (
            <MaterialViewer
              substage={selectedSubstage}
              stageId={stage.id}
              onClose={() => setSelectedSubstage(null)}
            />
          )}

          {selectedSubstage.type === 'practice' && (
            <PracticeZone
              task={selectedSubstage.practice}
              stageId={stage.id}
              substageId={selectedSubstage.id}
              onClose={() => setSelectedSubstage(null)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default StageContent;
