// src/components/History/HistoryView.jsx

import PropTypes from 'prop-types';
import { History as HistoryIcon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../contexts/LanguageContext';
import { HistoryItem } from './HistoryItem';

export const HistoryView = ({ chatHistory, onLoadChat, onDeleteChat }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();

  const isDark = theme === 'dark';

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto w-full max-w-4xl mx-auto px-4 pb-10">
        {/* Header */}
        <div className="mb-8">
          <h2 className={`text-3xl font-bold ${
            isDark ? 'text-white' : 'text-gray-900'
          } mb-2 font-display`}>
            {t('history.title')}
          </h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
            {t('history.subtitle') || 'View and manage your conversation history'}
          </p>
        </div>

        {chatHistory.length === 0 ? (
          <div className={`text-center py-12 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            <HistoryIcon className="w-16 h-16 mx-auto mb-4 opacity-30" aria-hidden="true" />
            <p className="text-lg">{t('history.empty')}</p>
            <p className="text-sm mt-2">
              {t('history.emptyHint')}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4" role="list" aria-label={t('history.listLabel')}>
            {chatHistory.map((chat) => (
              <HistoryItem
                key={chat.id}
                chat={chat}
                onLoad={onLoadChat}
                onDelete={onDeleteChat}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

HistoryView.propTypes = {
  chatHistory: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      messages: PropTypes.array.isRequired,
      timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
    })
  ).isRequired,
  onLoadChat: PropTypes.func.isRequired,
  onDeleteChat: PropTypes.func.isRequired
};
