// src/components/Chat/MessageRating.jsx

import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

export const MessageRating = ({ rating, onRate }) => {
  const { theme } = useTheme();

  const getButtonClass = (type) => {
    const isActive = rating === type;
    const activeColor = type === 'up' ? 'text-green-500' : 'text-red-500';
    const inactiveColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';
    return `p-1 rounded hover:bg-opacity-20 hover:bg-white transition ${isActive ? activeColor : inactiveColor}`;
  };

  return (
    <div className="flex gap-2" role="group" aria-label="Оценка ответа">
      <button
        onClick={() => onRate('up')}
        className={getButtonClass('up')}
        title="Полезный ответ"
        aria-label="Отметить как полезный"
        aria-pressed={rating === 'up'}
      >
        <ThumbsUp className="w-4 h-4" aria-hidden="true" />
      </button>
      <button
        onClick={() => onRate('down')}
        className={getButtonClass('down')}
        title="Не помог"
        aria-label="Отметить как неполезный"
        aria-pressed={rating === 'down'}
      >
        <ThumbsDown className="w-4 h-4" aria-hidden="true" />
      </button>
    </div>
  );
};
