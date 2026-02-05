// src/components/Chat/ChatView.jsx

import { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Message } from './Message';
import { ChatInput } from './ChatInput';
import { LoadingIndicator } from './LoadingIndicator';
import { useSettings } from '../../contexts/SettingsContext';

export const ChatView = ({ messages, loading, onSend, onRate }) => {
  const messagesEndRef = useRef(null);
  const { playSound } = useSettings();
  const prevMessagesLength = useRef(messages.length);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

    // Play sound for new messages
    if (messages.length > prevMessagesLength.current) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'user') {
        playSound('message');
      } else {
        playSound('receive');
      }
      prevMessagesLength.current = messages.length;
    }
  }, [messages, playSound]);

  return (
    <div className="h-full flex flex-col relative">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto w-full max-w-4xl mx-auto px-4 pb-40 md:pb-32">
        <div className="flex flex-col gap-4 md:gap-10 py-4">
          {messages.map((msg) => (
            <Message key={msg.id} message={msg} onRate={onRate} />
          ))}
          {loading && <LoadingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Fixed Input at Bottom */}
      <div className="fixed bottom-20 md:bottom-8 left-0 right-0 px-4 flex flex-col items-center z-40 pointer-events-none">
        <div className="w-full max-w-3xl pointer-events-auto">
          <ChatInput onSend={onSend} loading={loading} />
        </div>
      </div>
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
