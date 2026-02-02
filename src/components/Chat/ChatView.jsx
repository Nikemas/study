// src/components/Chat/ChatView.jsx

import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../../hooks/useTheme';
import { themeClasses } from '../../utils/themeUtils';
import { Message } from './Message';
import { ChatInput } from './ChatInput';
import { LoadingIndicator } from './LoadingIndicator';

export const ChatView = ({ messages, loading, onSend, onRate }) => {
  const { theme } = useTheme();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="max-w-5xl mx-auto h-full flex flex-col p-4">
      {/* Messages Area */}
      <div
        className={`flex-1 overflow-y-auto mb-4 p-4 ${themeClasses.bg(theme)} rounded-lg shadow-sm`}
      >
        {messages.map((msg) => (
          <Message key={msg.id} message={msg} onRate={onRate} />
        ))}
        {loading && <LoadingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput onSend={onSend} loading={loading} />
    </div>
  );
};

ChatView.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
  onSend: PropTypes.func.isRequired,
  onRate: PropTypes.func.isRequired
};
