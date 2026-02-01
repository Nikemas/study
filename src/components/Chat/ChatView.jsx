// src/components/Chat/ChatView.jsx

import { useRef, useEffect } from 'react';
import { Message } from './Message';
import { ChatInput } from './ChatInput';
import { LoadingIndicator } from './LoadingIndicator';

export const ChatView = ({
  messages,
  loading,
  onSend,
  onClear,
  onRate,
  theme
}) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="max-w-5xl mx-auto h-full flex flex-col p-4">
      {/* Messages Area */}
      <div
        className={`flex-1 overflow-y-auto mb-4 p-4 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        } rounded-lg shadow-sm`}
      >
        {messages.map((msg) => (
          <Message key={msg.id} message={msg} theme={theme} onRate={onRate} />
        ))}
        {loading && <LoadingIndicator theme={theme} />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput
        onSend={onSend}
        onClear={onClear}
        loading={loading}
        theme={theme}
      />
    </div>
  );
};