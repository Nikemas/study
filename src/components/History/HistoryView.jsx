// src/components/History/HistoryView.jsx

import { HistoryItem } from './HistoryItem';
import { History as HistoryIcon } from 'lucide-react';

export const HistoryView = ({ chatHistory, onLoadChat, onDeleteChat, theme }) => {
  return (
    <div className="max-w-5xl mx-auto h-full overflow-y-auto p-4">
      <div
        className={`${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        } rounded-lg shadow-sm p-6`}
      >
        <div className="flex items-center gap-3 mb-6">
          <HistoryIcon
            className={`w-6 h-6 ${
              theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
            }`}
          />
          <h2
            className={`text-2xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}
          >
            История диалогов
          </h2>
        </div>

        {chatHistory.length === 0 ? (
          <div
            className={`text-center py-12 ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            <HistoryIcon className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="text-lg">История диалогов пуста</p>
            <p className="text-sm mt-2">
              Начните новый диалог, и он появится здесь
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {chatHistory.map((chat) => (
              <HistoryItem
                key={chat.id}
                chat={chat}
                onLoad={onLoadChat}
                onDelete={onDeleteChat}
                theme={theme}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};