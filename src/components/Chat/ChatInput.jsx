// src/components/Chat/ChatInput.jsx

import { useState } from 'react';
import { Send, Trash2 } from 'lucide-react';

export const ChatInput = ({ onSend, onClear, loading, theme }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !loading) {
      onSend(input);
      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className={`${
        theme === 'dark'
          ? 'bg-gray-800 border-gray-700'
          : 'bg-white border-gray-200'
      } border rounded-lg shadow-md p-4`}
    >
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Задайте вопрос по курсу..."
          className={`flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${
            theme === 'dark'
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
          }`}
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition flex items-center gap-2 shadow-sm"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Отправить</span>
        </button>
        <button
          onClick={onClear}
          className={`px-4 py-3 rounded-lg transition ${
            theme === 'dark'
              ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
          title="Новый диалог"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <div
        className={`text-xs ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
        }`}
      >
        Примеры: "Что такое useState?", "Как работает flex?", "Объясни async/await"
      </div>
    </div>
  );
};