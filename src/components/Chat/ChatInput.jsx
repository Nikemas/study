// src/components/Chat/ChatInput.jsx

import { useState } from 'react';
import PropTypes from 'prop-types';
import { Send, Plus } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../contexts/LanguageContext';
import { LIMITS } from '../../constants';

export const ChatInput = ({ onSend, loading }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const isDark = theme === 'dark';

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
    <div>
      {/* Input Container with Gradient Glow */}
      <div className="relative group">
        <div className={`absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl ${
          isDark ? 'opacity-20 group-hover:opacity-40' : 'opacity-10 group-hover:opacity-20'
        } blur transition duration-500`} />

        <div className={`relative flex items-center ${
          isDark ? 'glass-input' : 'bg-white border border-gray-300'
        } rounded-2xl p-2 transition-all duration-300`}>
          {/* Add Button */}
          <button
            type="button"
            className={`p-2 ${
              isDark ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            } transition-colors rounded-xl`}
            aria-label="Add attachment"
          >
            <Plus className="w-5 h-5" />
          </button>

          {/* Input Field */}
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
            className={`w-full bg-transparent border-none ${
              isDark ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'
            } focus:ring-0 text-sm py-3 px-2 font-light focus:outline-none`}
            disabled={loading}
          />

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className={`p-2 ${
              isDark
                ? 'bg-white text-black hover:bg-gray-200 shadow-lg shadow-white/10'
                : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-500/20'
            } rounded-xl transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed`}
            aria-label={t('chat.sendLabel')}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Helper Text */}
      <p className={`text-center text-[10px] ${
        isDark ? 'text-gray-600' : 'text-gray-500'
      } mt-3 font-medium tracking-wide`}>
        {t('chat.disclaimer') || 'AI can make mistakes. Consider checking important information.'}
      </p>
    </div>
  );
};

ChatInput.propTypes = {
  onSend: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};
