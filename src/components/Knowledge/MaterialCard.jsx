// src/components/Knowledge/MaterialCard.jsx

import { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { CheckCircle, Circle } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../contexts/LanguageContext';
import { themeClasses } from '../../utils/themeUtils';
import { isMaterialComplete, markMaterialComplete, markMaterialIncomplete } from '../../services/progressService';

const CATEGORY_EMOJI = {
  python: '🐍',
  javascript: '⚡',
  html: '📄',
  css: '🎨',
  react: '⚛️'
};

export const MaterialCard = memo(({ material, onProgressChange }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const emoji = CATEGORY_EMOJI[material.category] || '📚';
  const [isCompleted, setIsCompleted] = useState(() => isMaterialComplete(material.id));
  const isDark = theme === 'dark';

  const handleToggleComplete = useCallback((e) => {
    e.stopPropagation();
    if (isCompleted) {
      markMaterialIncomplete(material.id);
      setIsCompleted(false);
    } else {
      markMaterialComplete(material.id);
      setIsCompleted(true);
    }
    if (onProgressChange) {
      onProgressChange();
    }
  }, [isCompleted, material.id, onProgressChange]);

  return (
    <article
      className={`border rounded-lg p-4 transition hover:shadow-md ${
        isDark
          ? 'border-gray-700 hover:border-indigo-500 bg-gray-800'
          : 'border-gray-200 hover:border-indigo-300 bg-white'
      } ${isCompleted ? 'ring-2 ring-green-500/30' : ''}`}
      role="listitem"
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${themeClasses.bgSecondary(theme)}`}>
          <span className="text-2xl" role="img" aria-label={material.category}>
            {emoji}
          </span>
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3
              className={`font-semibold mb-2 ${
                isDark ? 'text-indigo-400' : 'text-indigo-600'
              }`}
            >
              {material.topic}
            </h3>
            <button
              onClick={handleToggleComplete}
              className={`flex-shrink-0 p-1 rounded-full transition ${
                isCompleted
                  ? 'text-green-500 hover:text-green-600'
                  : isDark ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-500'
              }`}
              title={isCompleted ? t('progress.markIncomplete') : t('progress.markComplete')}
              aria-label={isCompleted ? t('progress.markIncomplete') : t('progress.markComplete')}
            >
              {isCompleted ? <CheckCircle size={20} /> : <Circle size={20} />}
            </button>
          </div>
          <p className={`text-sm leading-relaxed ${themeClasses.textSecondary(theme)}`}>
            {material.content}
          </p>
          {isCompleted && (
            <span className={`inline-flex items-center gap-1 mt-2 text-xs font-medium ${
              isDark ? 'text-green-400' : 'text-green-600'
            }`}>
              <CheckCircle size={12} />
              {t('progress.completed')}
            </span>
          )}
        </div>
      </div>
    </article>
  );
});

MaterialCard.propTypes = {
  material: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    topic: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired
  }).isRequired,
  onProgressChange: PropTypes.func
};
