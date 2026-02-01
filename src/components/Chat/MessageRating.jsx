// src/components/Chat/MessageRating.jsx

import { ThumbsUp, ThumbsDown } from 'lucide-react';

export const MessageRating = ({ rating, onRate, theme }) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onRate('up')}
        className={`p-1 rounded hover:bg-opacity-20 hover:bg-white transition ${
          rating === 'up' ? 'text-green-500' : theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}
        title="Полезный ответ"
      >
        <ThumbsUp className="w-4 h-4" />
      </button>
      <button
        onClick={() => onRate('down')}
        className={`p-1 rounded hover:bg-opacity-20 hover:bg-white transition ${
          rating === 'down' ? 'text-red-500' : theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}
        title="Не помог"
      >
        <ThumbsDown className="w-4 h-4" />
      </button>
    </div>
  );
};