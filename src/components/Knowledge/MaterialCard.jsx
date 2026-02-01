// src/components/Knowledge/MaterialCard.jsx

import { Book } from 'lucide-react';

export const MaterialCard = ({ material, theme }) => {
  // Определяем эмодзи по категории
  const getCategoryEmoji = (category) => {
    const emojiMap = {
      python: '🐍',
      javascript: '⚡',
      html: '📄',
      css: '🎨',
      react: '⚛️'
    };
    return emojiMap[category] || '📚';
  };

  return (
    <div
      className={`border rounded-lg p-4 transition hover:shadow-md ${
        theme === 'dark'
          ? 'border-gray-700 hover:border-indigo-500 bg-gray-800'
          : 'border-gray-200 hover:border-indigo-300 bg-white'
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`p-2 rounded-lg ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
          }`}
        >
          <span className="text-2xl">{getCategoryEmoji(material.category)}</span>
        </div>
        <div className="flex-1">
          <h4
            className={`font-semibold mb-2 ${
              theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
            }`}
          >
            {material.topic}
          </h4>
          <p
            className={`text-sm leading-relaxed ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            {material.content}
          </p>
        </div>
      </div>
    </div>
  );
};