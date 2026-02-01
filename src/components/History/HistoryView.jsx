// src/components/History/HistoryView.jsx

import PropTypes from 'prop-types';
import { History as HistoryIcon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { themeClasses } from '../../utils/themeUtils';
import { HistoryItem } from './HistoryItem';

export const HistoryView = ({ chatHistory, onLoadChat, onDeleteChat }) => {
  const { theme } = useTheme();

  return (
    <div className="max-w-5xl mx-auto h-full overflow-y-auto p-4">
      <section className={`${themeClasses.bg(theme)} rounded-lg shadow-sm p-6`}>
        <div className="flex items-center gap-3 mb-6">
          <HistoryIcon
            className={`w-6 h-6 ${
              theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
            }`}
            aria-hidden="true"
          />
          <h2 className={`text-2xl font-bold ${themeClasses.text(theme)}`}>
            История диалогов
          </h2>
        </div>

        {chatHistory.length === 0 ? (
          <div className={`text-center py-12 ${themeClasses.textSecondary(theme)}`}>
            <HistoryIcon className="w-16 h-16 mx-auto mb-4 opacity-30" aria-hidden="true" />
            <p className="text-lg">История диалогов пуста</p>
            <p className="text-sm mt-2">
              Начните новый диалог, и он появится здесь
            </p>
          </div>
        ) : (
          <div className="space-y-3" role="list" aria-label="Список диалогов">
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
      </section>
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
