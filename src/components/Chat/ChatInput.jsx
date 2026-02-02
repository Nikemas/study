// src/components/Chat/ChatInput.jsx

import { useState } from 'react';
import PropTypes from 'prop-types';
import { Send, Trash2 } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../contexts/LanguageContext';
import { themeClasses } from '../../utils/themeUtils';
import { LIMITS } from '../../constants';

export const ChatInput = ({ onSend, onClear, loading }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [input, setInput] = useState('');

  const handleSend = () => {
    const trimmedInput = input.trim();
    if (trimmedInput && !loading && trimmedInput.length <= LIMITS.MAX_MESSAGE_LENGTH) {
      onSend(trimmedInput);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={`${themeClasses.card(theme)} border rounded-lg shadow-md p-4`}>
      <div className="flex gap-2 mb-2">
        <label htmlFor="chat-input" className="sr-only">
          {t('chat.inputLabel')}
        </label>
        <input
          id="chat-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t('chat.placeholder')}
          maxLength={LIMITS.MAX_MESSAGE_LENGTH}
          className={`flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition ${themeClasses.input(theme)}`}
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition flex items-center gap-2 shadow-sm"
          aria-label={t('chat.sendLabel')}
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">{t('chat.send')}</span>
        </button>
        <button
          onClick={onClear}
          className={`px-4 py-3 rounded-lg transition ${
            theme === 'dark'
              ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
          }`}
          title={t('chat.newChat')}
          aria-label={t('chat.newChatLabel')}
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      <div className={`text-xs ${themeClasses.textMuted(theme)}`}>
        {t('chat.examples')}
      </div>
    </div>
  );
};

ChatInput.propTypes = {
  onSend: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};
