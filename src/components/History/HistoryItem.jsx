// src/components/History/HistoryItem.jsx

import { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { MessageSquare, Trash2 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

export const HistoryItem = memo(({ chat, onLoad, onDelete }) => {
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
    <article
      className="group relative surface-card p-4 md:p-6 hover-lift transition-all duration-300 cursor-pointer overflow-hidden"
      onClick={() => onLoad(chat.id)}
      role="listitem"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="flex items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="w-12 h-12 rounded-lg bg-primary/10 border border-border flex items-center justify-center flex-shrink-0">
            <MessageSquare className="w-5 h-5 text-primary" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-text mb-1 truncate group-hover:text-primary transition-colors">
              {chat.title}
            </h3>
            <p className="text-xs text-muted">
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

        <button
          onClick={handleDelete}
          className={`p-2 rounded-lg md:opacity-0 md:group-hover:opacity-100 transition flex-shrink-0 ${showConfirm
            ? 'opacity-100 bg-danger text-white'
            : 'hover:bg-danger/10 text-muted hover:text-danger'
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
