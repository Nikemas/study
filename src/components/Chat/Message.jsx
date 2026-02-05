// src/components/Chat/Message.jsx

import { memo } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { Bot, User } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../contexts/LanguageContext';
import { formatTime } from '../../utils/formatters';
import { CodeBlock } from './CodeBlock';
import { MessageRating } from './MessageRating';

export const Message = memo(({ message, onRate }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isUser = message.role === 'user';
  const isDark = theme === 'dark';

  const handleRate = (value) => {
    onRate(message.id, value);
  };

  if (isUser) {
    return (
      <article className="flex flex-row-reverse gap-2 md:gap-4 group animate-slideUp">
        {/* User Avatar */}
        <div className="flex-shrink-0 mt-1">
          <div className={`w-8 h-8 rounded-full ${isDark ? 'bg-white/10 border border-white/5' : 'bg-gray-200 border border-gray-300'
            } flex items-center justify-center`}>
            <User className={`w-4 h-4 ${isDark ? 'text-white' : 'text-gray-700'}`} />
          </div>
        </div>

        {/* User Message */}
        <div className="flex flex-col items-end gap-2 max-w-2xl">
          <div className={`${isDark ? 'glass border-primary/20 bg-primary/10' : 'bg-indigo-100 border border-indigo-200'
            } rounded-2xl rounded-tr-sm px-4 py-2 md:px-5 md:py-3 ${isDark ? 'shadow-glow-sm' : 'shadow-sm'}`}>
            <p className={`text-sm ${isDark ? 'text-white' : 'text-gray-900'} font-medium whitespace-pre-wrap`}>
              {message.content}
            </p>
          </div>
          <span className={`text-[10px] ${isDark ? 'text-gray-600' : 'text-gray-500'} mr-1`}>
            {formatTime(message.timestamp)}
          </span>
        </div>
      </article>
    );
  }

  return (
    <article className="flex gap-2 md:gap-4 group animate-slideUp">
      {/* AI Avatar */}
      <div className="flex-shrink-0 mt-1">
        <div className={`w-8 h-8 rounded-xl ${isDark ? 'bg-surface border border-white/10' : 'bg-indigo-100 border border-indigo-200'
          } flex items-center justify-center text-primary ${isDark ? 'shadow-glow-sm' : ''}`}>
          <Bot className="w-4 h-4" />
        </div>
      </div>

      {/* AI Message */}
      <div className="flex flex-col gap-2 max-w-3xl w-full">
        {/* Header */}
        <div className="flex items-baseline gap-2 mb-1">
          <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {t('chat.assistant')}
          </span>
          <span className={`text-[10px] ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            {formatTime(message.timestamp)}
          </span>
        </div>

        {/* Content */}
        <div className={`prose ${isDark ? 'prose-invert' : ''} max-w-none text-sm`}>
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
                    className={`${isDark
                        ? 'text-indigo-300 bg-indigo-500/10'
                        : 'text-indigo-700 bg-indigo-100'
                      } px-1.5 py-0.5 rounded text-xs font-mono`}
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              p({ children }) {
                return <p className={`leading-7 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>{children}</p>;
              },
              strong({ children }) {
                return <strong className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{children}</strong>;
              },
              ul({ children }) {
                return <ul className={`list-disc pl-4 space-y-1 mt-2 mb-4 ${isDark ? 'text-gray-400 marker:text-indigo-500' : 'text-gray-600 marker:text-indigo-600'
                  }`}>{children}</ul>;
              },
              ol({ children }) {
                return <ol className={`list-decimal pl-4 space-y-1 mt-2 mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>{children}</ol>;
              }
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <MessageRating rating={message.rating} onRate={handleRate} />
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
