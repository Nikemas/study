// src/components/Chat/Message.jsx

import { memo } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { useTheme } from '../../hooks/useTheme';
import { formatTime } from '../../utils/formatters';
import { CodeBlock } from './CodeBlock';
import { MessageRating } from './MessageRating';

export const Message = memo(({ message, onRate }) => {
  const { theme } = useTheme();
  const isUser = message.role === 'user';

  const handleRate = (value) => {
    onRate(message.id, value);
  };

  const messageClasses = isUser
    ? 'bg-indigo-600 text-white'
    : theme === 'dark'
    ? 'bg-gray-800 text-gray-100 border border-gray-700'
    : 'bg-gray-100 text-gray-800';

  return (
    <article
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-slideIn`}
      aria-label={isUser ? 'Ваше сообщение' : 'Ответ ассистента'}
    >
      <div className={`max-w-[85%] rounded-lg p-4 shadow-sm ${messageClasses}`}>
        <div className="prose prose-sm max-w-none">
          {isUser ? (
            <p className="whitespace-pre-wrap m-0">{message.content}</p>
          ) : (
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <CodeBlock
                      language={match[1]}
                      value={String(children).replace(/\n$/, '')}
                      {...props}
                    />
                  ) : (
                    <code
                      className={`${
                        theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
                      } px-1 py-0.5 rounded text-sm`}
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
                p({ children }) {
                  return <p className="my-2">{children}</p>;
                },
                ul({ children }) {
                  return <ul className="my-2 ml-4">{children}</ul>;
                },
                ol({ children }) {
                  return <ol className="my-2 ml-4">{children}</ol>;
                }
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>

        <div className="flex items-center justify-between mt-2 text-xs opacity-70">
          <span>{formatTime(message.timestamp)}</span>
          {!isUser && <MessageRating rating={message.rating} onRate={handleRate} />}
        </div>
      </div>
    </article>
  );
});

Message.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.string.isRequired,
    role: PropTypes.oneOf(['user', 'assistant']).isRequired,
    content: PropTypes.string.isRequired,
    timestamp: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    rating: PropTypes.oneOf(['up', 'down', null]),
    error: PropTypes.bool
  }).isRequired,
  onRate: PropTypes.func.isRequired
};
