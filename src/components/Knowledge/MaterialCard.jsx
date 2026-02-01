// src/components/Knowledge/MaterialCard.jsx

import { memo } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../../hooks/useTheme';
import { themeClasses } from '../../utils/themeUtils';

const CATEGORY_EMOJI = {
  python: '🐍',
  javascript: '⚡',
  html: '📄',
  css: '🎨',
  react: '⚛️'
};

export const MaterialCard = memo(({ material }) => {
  const { theme } = useTheme();
  const emoji = CATEGORY_EMOJI[material.category] || '📚';

  return (
    <article
      className={`border rounded-lg p-4 transition hover:shadow-md ${
        theme === 'dark'
          ? 'border-gray-700 hover:border-indigo-500 bg-gray-800'
          : 'border-gray-200 hover:border-indigo-300 bg-white'
      }`}
      role="listitem"
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${themeClasses.bgSecondary(theme)}`}>
          <span className="text-2xl" role="img" aria-label={material.category}>
            {emoji}
          </span>
        </div>
        <div className="flex-1">
          <h3
            className={`font-semibold mb-2 ${
              theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
            }`}
          >
            {material.topic}
          </h3>
          <p className={`text-sm leading-relaxed ${themeClasses.textSecondary(theme)}`}>
            {material.content}
          </p>
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
  }).isRequired
};
