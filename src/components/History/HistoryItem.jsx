// src/components/History/HistoryItem.jsx

import { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { MessageSquare, Trash2 } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../contexts/LanguageContext';
import { themeClasses } from '../../utils/themeUtils';

export const HistoryItem = memo(({ chat, onLoad, onDelete }) => {
  const { theme } = useTheme();
  const { t, language } = useLanguage();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = (e) => {
    e.stopPropagation();
    if (showConfirm) {
      onDelete(chat.id);
      setShowConfirm(false);
    } else {
      setShowConfirm(true);
      setTimeout(() => setShowConfirm(false), 3000);
    }
  };

  return (
    <div
      className={`p-4 rounded-lg border transition group ${
        theme === 'dark'
          ? 'border-gray-700 hover:bg-gray-700 hover:border-indigo-500'
          : 'border-gray-200 hover:bg-gray-50 hover:border-indigo-300'
      }`}
      role="listitem"
    >
      <div className="flex items-start justify-between gap-4">
        <button
          onClick={() => onLoad(chat.id)}
          className="flex-1 text-left"
          aria-label={`${t('history.openChat')}: ${chat.title}`}
        >
          <div className="flex items-center gap-2 mb-1">
            <MessageSquare className="w-4 h-4 text-indigo-500" aria-hidden="true" />
            <span className={`font-semibold ${themeClasses.text(theme)}`}>
              {chat.title}
            </span>
          </div>
          <div className={`text-sm ${themeClasses.textSecondary(theme)}`}>
            {chat.messages.length} {t('history.messages')} •{' '}
            {new Date(chat.timestamp).toLocaleDateString(language === 'ky' ? 'ky-KG' : language === 'en' ? 'en-US' : 'ru-RU', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}
          </div>
        </button>

        <button
          onClick={handleDelete}
          className={`p-2 rounded opacity-0 group-hover:opacity-100 transition ${
            showConfirm
              ? 'opacity-100 bg-red-600 text-white'
              : theme === 'dark'
              ? 'hover:bg-red-900 text-gray-400 hover:text-red-400'
              : 'hover:bg-red-50 text-gray-500 hover:text-red-600'
          }`}
          title={showConfirm ? t('history.deleteHint') : t('history.deleteChat')}
          aria-label={showConfirm ? t('history.confirmDelete') : t('history.deleteChat')}
        >
          <Trash2 className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
});

HistoryItem.propTypes = {
  chat: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    messages: PropTypes.array.isRequired,
    timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
  }).isRequired,
  onLoad: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};
