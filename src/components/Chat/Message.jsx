// src/components/Chat/Message.jsx

import ReactMarkdown from 'react-markdown';
import { formatTime } from '../../utils/formatters';
import { CodeBlock } from './CodeBlock';
import { MessageRating } from './MessageRating';

export const Message = ({ message, theme, onRate }) => {
  const isUser = message.role === 'user';

  const handleRate = (value) => {
    onRate(message.id, value);
  };

  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-slideIn`}
    >
      <div
        className={`max-w-[85%] rounded-lg p-4 shadow-sm ${
          isUser
            ? 'bg-indigo-600 text-white'
            : theme === 'dark'
            ? 'bg-gray-800 text-gray-100 border border-gray-700'
            : 'bg-gray-100 text-gray-800'
        }`}
      >
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
                      theme={theme}
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

          {!isUser && (
            <MessageRating
              rating={message.rating}
              onRate={handleRate}
              theme={theme}
            />
          )}
        </div>
      </div>
    </div>
  );
};