// src/components/Chat/ChatInput.jsx

import { useState } from 'react';
import PropTypes from 'prop-types';
import { Send, Plus } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { LIMITS } from '../../constants';

export const ChatInput = ({ onSend, loading }) => {
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
    if (e.key === 'Escape') {
      setInput('');
    }
  };

  return (
    <div>
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent opacity-20 blur transition duration-500" />

        <div className="relative flex items-center bg-surface border border-border rounded-lg p-2 transition-all duration-300">
          <button
            type="button"
            className="p-2 text-muted hover:text-text hover:bg-border/30 transition-colors rounded-md"
            aria-label="Add attachment"
          >
            <Plus className="w-5 h-5" />
          </button>

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
            className="w-full bg-transparent border-none text-text placeholder:text-muted focus:ring-0 text-sm py-3 px-2 focus:outline-none"
            disabled={loading}
          />

          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="p-2 bg-primary text-white hover:brightness-110 rounded-md transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={t('chat.sendLabel')}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      <p className="text-center text-[10px] text-muted mt-3 font-medium tracking-wide">
        {t('chat.disclaimer') || 'AI can make mistakes. Consider checking important information.'}
      </p>
    </div>
  );
};

ChatInput.propTypes = {
  onSend: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};
