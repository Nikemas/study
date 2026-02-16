import React from 'react';
import { CheckCircle, Lock, Circle, BookOpen, Code } from 'lucide-react';

const SubstageCard = ({ substage, progress, onSelect, isSelected }) => {
  const isLocked = progress.status === 'locked';
  const isCompleted = progress.status === 'completed';
  const isInProgress = progress.status === 'in_progress';

  const getStatusIcon = () => {
    if (isCompleted) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    } else if (isInProgress) {
      return <Circle className="w-5 h-5 text-blue-500" />;
    } else {
      return <Lock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getTypeIcon = () => {
    if (substage.type === 'theory') {
      return <BookOpen className="w-5 h-5 text-purple-500" />;
    } else if (substage.type === 'practice') {
      return <Code className="w-5 h-5 text-orange-500" />;
    }
    return null;
  };

  return (
    <button
      onClick={() => !isLocked && onSelect()}
      disabled={isLocked}
      className={`
        substage-card w-full p-4 rounded-lg border-2 transition-all duration-200 text-left
        ${isSelected
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
          : 'border-gray-200 dark:border-gray-700'
        }
        ${isLocked
          ? 'opacity-50 cursor-not-allowed'
          : 'cursor-pointer hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md'
        }
      `}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 pt-1">
          {getStatusIcon()}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {getTypeIcon()}
            <h4 className="font-semibold text-gray-900 dark:text-white">
              {substage.order}. {substage.title}
            </h4>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
            <span className="capitalize">
              {substage.type === 'theory' ? 'Теория' : 'Практика'}
            </span>
            <span>•</span>
            <span>~{substage.estimatedMinutes} мин</span>

            {isCompleted && progress.practiceScore > 0 && (
              <>
                <span>•</span>
                <span className="text-green-600 dark:text-green-400 font-medium">
                  Оценка: {progress.practiceScore}%
                </span>
              </>
            )}
          </div>
        </div>

        {isLocked && (
          <div className="flex-shrink-0 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
            Заблокировано
          </div>
        )}
      </div>
    </button>
  );
};

export default SubstageCard;
