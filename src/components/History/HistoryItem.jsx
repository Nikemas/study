// src/components/History/HistoryItem.jsx

import { MessageSquare, Trash2 } from 'lucide-react';

export const HistoryItem = ({ chat, onLoad, onDelete, theme }) => {
  return (
    <div
      className={`p-4 rounded-lg border transition group ${
        theme === 'dark'
          ? 'border-gray-700 hover:bg-gray-700 hover:border-indigo-500'
          : 'border-gray-200 hover:bg-gray-50 hover:border-indigo-300'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <button
          onClick={() => onLoad(chat.id)}
          className="flex-1 text-left"
        >
          <div className="flex items-center gap-2 mb-1">
            <MessageSquare className="w-4 h-4 text-indigo-500" />
            <span
              className={`font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}
            >
              {chat.title}
            </span>
          </div>
          <div
            className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            {chat.messages.length} сообщений •{' '}
            {new Date(chat.timestamp).toLocaleDateString('ru-RU', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}
          </div>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(chat.id);
          }}
          className={`p-2 rounded opacity-0 group-hover:opacity-100 transition ${
            theme === 'dark'
              ? 'hover:bg-red-900 text-gray-400 hover:text-red-400'
              : 'hover:bg-red-50 text-gray-500 hover:text-red-600'
          }`}
          title="Удалить диалог"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};