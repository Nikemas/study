
import { Moon, Sun } from 'lucide-react';

export const ThemeToggle = ({ theme, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className={`p-2 rounded-lg transition ${
        theme === 'dark'
          ? 'bg-gray-700 hover:bg-gray-600'
          : 'bg-gray-100 hover:bg-gray-200'
      }`}
      title={theme === 'dark' ? 'Светлая тема' : 'Темная тема'}
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-yellow-400" />
      ) : (
        <Moon className="w-5 h-5 text-gray-700" />
      )}
    </button>
  );
};