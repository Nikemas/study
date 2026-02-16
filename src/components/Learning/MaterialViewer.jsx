import React, { useState } from 'react';
import { X, CheckCircle, ChevronRight } from 'lucide-react';
import { useLearningProgress } from '../../contexts/LearningProgressContext';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const MaterialViewer = ({ substage, stageId, onClose }) => {
  const { markMaterialAsRead, getSubstageProgress } = useLearningProgress();
  const [showFullContent, setShowFullContent] = useState(false);

  const material = substage.materials && substage.materials.length > 0
    ? substage.materials[0]
    : null;

  const progress = getSubstageProgress(stageId, substage.id);
  const isCompleted = progress?.status === 'completed';

  if (!material) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-12">
        Материал отсутствует
      </div>
    );
  }

  const handleComplete = () => {
    markMaterialAsRead(stageId, substage.id);
  };

  return (
    <div className="material-viewer">
      {/* Заголовок */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {material.topic}
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            {substage.type === 'theory' ? 'Теоретический материал' : 'Материал'}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Краткое содержание */}
      <div className="prose dark:prose-invert max-w-none mb-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r">
          <p className="text-gray-800 dark:text-gray-200 m-0">
            {material.content}
          </p>
        </div>
      </div>

      {/* Детальное содержание */}
      {material.detailedContent && (
        <div className="mb-6">
          <button
            onClick={() => setShowFullContent(!showFullContent)}
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-3"
          >
            <ChevronRight className={`w-5 h-5 transition-transform ${showFullContent ? 'rotate-90' : ''}`} />
            {showFullContent ? 'Свернуть' : 'Показать подробное описание'}
          </button>

          {showFullContent && (
            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown>{material.detailedContent}</ReactMarkdown>
            </div>
          )}
        </div>
      )}

      {/* Примеры кода */}
      {material.examples && material.examples.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Примеры
          </h4>

          <div className="space-y-6">
            {material.examples.map((example, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                  <h5 className="font-medium text-gray-900 dark:text-white">
                    {example.title}
                  </h5>
                </div>

                <div className="relative">
                  <SyntaxHighlighter
                    language="html"
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      borderRadius: 0,
                      fontSize: '0.875rem'
                    }}
                  >
                    {example.code}
                  </SyntaxHighlighter>
                </div>

                {example.explanation && (
                  <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {example.explanation}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Ключевые моменты */}
      {material.keyPoints && material.keyPoints.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Ключевые моменты
          </h4>

          <ul className="space-y-2">
            {material.keyPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Кнопка завершения */}
      <div className="flex justify-end pt-6 border-t border-gray-200 dark:border-gray-700">
        {isCompleted ? (
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Материал изучен</span>
          </div>
        ) : (
          <button
            onClick={handleComplete}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Отметить как изученное
          </button>
        )}
      </div>
    </div>
  );
};

export default MaterialViewer;
