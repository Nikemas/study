import React from 'react';
import { Lock, CheckCircle, Circle } from 'lucide-react';

const StageNavigator = ({ stages, selectedStageId, onSelectStage, userProgress }) => {
  const getStageStatus = (stageId) => {
    const progress = userProgress.stages.find(s => s.stageId === stageId);
    return progress?.status || 'locked';
  };

  const getStageCompletion = (stageId) => {
    const progress = userProgress.stages.find(s => s.stageId === stageId);
    return progress?.completionPercentage || 0;
  };

  const getStatusIcon = (status) => {
    if (status === 'completed') {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    } else if (status === 'in_progress') {
      return <Circle className="w-5 h-5 text-blue-500" />;
    } else {
      return <Lock className="w-5 h-5 text-gray-400" />;
    }
  };

  return (
    <div className="stage-navigator mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Карта обучения
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {stages.map((stage, index) => {
          const status = getStageStatus(stage.id);
          const completion = getStageCompletion(stage.id);
          const isSelected = selectedStageId === stage.id;
          const isLocked = status === 'locked';

          return (
            <button
              key={stage.id}
              onClick={() => !isLocked && onSelectStage(stage.id)}
              disabled={isLocked}
              className={`
                stage-card p-4 rounded-lg border-2 transition-all duration-200
                ${isSelected
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                }
                ${isLocked
                  ? 'opacity-50 cursor-not-allowed'
                  : 'cursor-pointer hover:shadow-md'
                }
              `}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-3xl">{stage.icon}</span>
                {getStatusIcon(status)}
              </div>

              <h3 className="font-semibold text-sm mb-1 text-gray-900 dark:text-white text-left">
                Этап {index + 1}
              </h3>

              <p className="text-xs text-gray-600 dark:text-gray-400 mb-2 text-left">
                {stage.title}
              </p>

              {!isLocked && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                    <span>Прогресс</span>
                    <span>{completion}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${completion}%` }}
                    />
                  </div>
                </div>
              )}

              {isLocked && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Заблокирован
                </p>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StageNavigator;
