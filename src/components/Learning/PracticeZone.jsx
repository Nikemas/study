import React, { useState } from 'react';
import { X, AlertCircle, Send } from 'lucide-react';
import { CodeEditor } from '../Knowledge/CodeEditor';
import { useLearningProgress } from '../../contexts/LearningProgressContext';
import { evaluatePracticeTask } from '../../services/practiceEvaluationService';

const PracticeZone = ({ task, stageId, substageId, onClose }) => {
  const { completeSubstage, getSubstageProgress } = useLearningProgress();
  const [code, setCode] = useState(task.starterCode || '');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [result, setResult] = useState(null);

  const progress = getSubstageProgress(stageId, substageId);
  const attemptsLeft = task.maxAttempts - (progress?.practiceAttempts || 0);

  const handleSubmit = async () => {
    if (attemptsLeft <= 0) {
      alert('Вы использовали все попытки');
      return;
    }

    setIsEvaluating(true);
    setResult(null);

    try {
      // Оценить код через AI
      const evaluationResult = await evaluatePracticeTask(code, task);

      setResult(evaluationResult);

      // Если прошел проверку, отметить как завершенный
      if (evaluationResult.score >= task.passScore) {
        completeSubstage(stageId, substageId, evaluationResult.score);
      }
    } catch (error) {
      console.error('Evaluation error:', error);
      setResult({
        score: 0,
        passed: false,
        feedback: 'Произошла ошибка при проверке кода. Попробуйте еще раз.'
      });
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="practice-zone">
      {/* Заголовок */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {task.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Сложность: <span className="capitalize">{task.difficulty === 'easy' ? 'Легко' : task.difficulty === 'medium' ? 'Средне' : 'Сложно'}</span>
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Сценарий */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r mb-6">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Задание</h4>
        <p className="text-gray-800 dark:text-gray-200">
          {task.scenario}
        </p>
      </div>

      {/* Требования */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Требования:</h4>
        <ul className="space-y-2">
          {task.requirements.map((req, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">•</span>
              <span className="text-gray-700 dark:text-gray-300">{req}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Подсказки */}
      {task.hints && task.hints.length > 0 && (
        <details className="mb-6 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <summary className="cursor-pointer p-3 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 font-medium rounded-lg">
            Подсказки (нажмите, чтобы раскрыть)
          </summary>
          <ul className="p-4 space-y-2">
            {task.hints.map((hint, index) => (
              <li key={index} className="text-sm text-gray-700 dark:text-gray-300">
                💡 {hint}
              </li>
            ))}
          </ul>
        </details>
      )}

      {/* Редактор кода */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold text-gray-900 dark:text-white">Ваш код:</h4>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Осталось попыток: {attemptsLeft}
          </span>
        </div>

        <CodeEditor
          value={code}
          onChange={setCode}
          language={task.language}
          height="400px"
        />
      </div>

      {/* Результат проверки */}
      {result && (
        <div className={`mb-6 p-4 rounded-lg border-2 ${
          result.passed
            ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
            : 'border-red-500 bg-red-50 dark:bg-red-900/20'
        }`}>
          <div className="flex items-start gap-3">
            <AlertCircle className={`w-6 h-6 flex-shrink-0 ${
              result.passed ? 'text-green-600' : 'text-red-600'
            }`} />
            <div className="flex-1">
              <h5 className={`font-bold text-lg mb-2 ${
                result.passed ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'
              }`}>
                {result.passed ? '✅ Отлично! Задание выполнено!' : '❌ Задание не выполнено'}
              </h5>

              <p className="text-lg font-semibold mb-3">
                Оценка: <span className={result.passed ? 'text-green-600' : 'text-red-600'}>
                  {result.score}%
                </span>
              </p>

              <div className="text-gray-800 dark:text-gray-200">
                <h6 className="font-semibold mb-2">Обратная связь:</h6>
                <p className="whitespace-pre-wrap">{result.feedback}</p>
              </div>

              {result.suggestions && result.suggestions.length > 0 && (
                <div className="mt-3">
                  <h6 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">
                    Рекомендации:
                  </h6>
                  <ul className="list-disc list-inside space-y-1">
                    {result.suggestions.map((suggestion, index) => (
                      <li key={index} className="text-sm text-gray-700 dark:text-gray-300">
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Кнопки */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          Закрыть
        </button>

        <button
          onClick={handleSubmit}
          disabled={isEvaluating || attemptsLeft <= 0}
          className={`
            px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2
            ${isEvaluating || attemptsLeft <= 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
            }
          `}
        >
          {isEvaluating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Проверка...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Отправить на проверку
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PracticeZone;
