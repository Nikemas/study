// src/components/History/HistoryView.jsx

import PropTypes from 'prop-types';
import { History as HistoryIcon } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { HistoryItem } from './HistoryItem';
import { SectionHeader } from '../UI/SectionHeader';
import { EmptyState } from '../UI/EmptyState';

export const HistoryView = ({ chatHistory, onLoadChat, onDeleteChat }) => {
  const { t } = useLanguage();

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto w-full max-w-4xl mx-auto px-4 pb-10">
        <SectionHeader
          title={t('history.title')}
          subtitle={t('history.subtitle') || 'View and manage your conversation history'}
        />

        {chatHistory.length === 0 ? (
          <EmptyState
            icon={<HistoryIcon className="w-16 h-16 opacity-30" aria-hidden="true" />}
            title={t('history.empty')}
            subtitle={t('history.emptyHint')}
          />
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
