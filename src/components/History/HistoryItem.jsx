// src/components/History/HistoryItem.jsx

import { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { MessageSquare, Trash2 } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../contexts/LanguageContext';

export const HistoryItem = memo(({ chat, onLoad, onDelete }) => {
  const { theme } = useTheme();
  const { t, language } = useLanguage();
  const [showConfirm, setShowConfirm] = useState(false);
  const isDark = theme === 'dark';

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
    <article
      className={`group relative ${
        isDark ? 'glass-card' : 'light-glass-card'
      } rounded-2xl p-6 hover-lift hover:shadow-glow transition-all duration-300 cursor-pointer overflow-hidden`}
      onClick={() => onLoad(chat.id)}
      role="listitem"
    >
      {/* Hover Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="flex items-center justify-between gap-4 relative z-10">
        {/* Icon and Content */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {/* Icon */}
          <div className={`w-12 h-12 rounded-xl ${
            isDark
              ? 'bg-indigo-500/10 border border-indigo-500/20'
              : 'bg-indigo-100 border border-indigo-200'
          } flex items-center justify-center flex-shrink-0 ${
            isDark ? 'shadow-[0_0_15px_rgba(99,102,241,0.15)]' : ''
          }`}>
            <MessageSquare className="w-5 h-5 text-indigo-400" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className={`text-sm font-semibold ${
              isDark ? 'text-white' : 'text-gray-900'
            } mb-1 truncate group-hover:text-indigo-400 transition-colors`}>
              {chat.title}
            </h3>
            <p className={`text-xs ${
              isDark ? 'text-gray-500' : 'text-gray-600'
            }`}>
              {chat.messages.length} {t('history.messages')} • {' '}
              {new Date(chat.timestamp).toLocaleDateString(
                language === 'ky' ? 'ky-KG' : language === 'en' ? 'en-US' : 'ru-RU',
                {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                }
              )}
            </p>
          </div>
        </div>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className={`p-2 rounded-lg opacity-0 group-hover:opacity-100 transition flex-shrink-0 ${
            showConfirm
              ? 'opacity-100 bg-red-600 text-white'
              : isDark
              ? 'hover:bg-red-900/20 text-gray-400 hover:text-red-400'
              : 'hover:bg-red-50 text-gray-500 hover:text-red-600'
          }`}
          title={showConfirm ? t('history.deleteHint') : t('history.deleteChat')}
          aria-label={showConfirm ? t('history.confirmDelete') : t('history.deleteChat')}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </article>
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
