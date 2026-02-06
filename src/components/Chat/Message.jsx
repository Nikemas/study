// src/components/Chat/Message.jsx

import { memo } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { Bot, User } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { formatTime } from '../../utils/formatters';
import { CodeBlock } from './CodeBlock';
import { MessageRating } from './MessageRating';

export const Message = memo(({ message, onRate }) => {
  const { t } = useLanguage();
  const isUser = message.role === 'user';

  const handleRate = (value) => {
    onRate(message.id, value);
  };

  if (isUser) {
    return (
      <article className="flex flex-row-reverse gap-2 md:gap-4 group animate-slideUp">
        <div className="flex-shrink-0 mt-1">
          <div className="w-8 h-8 rounded-full bg-primary/15 border border-border flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </div>
        </div>

        <div className="flex flex-col items-end gap-2 max-w-2xl">
          <div className="bg-primary/15 border border-border rounded-2xl rounded-tr-sm px-4 py-2 md:px-5 md:py-3 shadow-soft">
            <p className="text-sm text-text font-medium whitespace-pre-wrap">
              {message.content}
            </p>
          </div>
          <span className="text-[10px] text-muted mr-1">
            {formatTime(message.timestamp)}
          </span>
        </div>
      </article>
    );
  }

  return (
    <article className="flex gap-2 md:gap-4 group animate-slideUp">
      <div className="flex-shrink-0 mt-1">
        <div className="w-8 h-8 rounded-xl bg-surface border border-border flex items-center justify-center">
          <Bot className="w-4 h-4 text-accent" />
        </div>
      </div>

      <div className="flex flex-col gap-2 max-w-3xl w-full">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-sm font-semibold text-text">
            {t('chat.assistant')}
          </span>
          <span className="text-[10px] text-muted">
            {formatTime(message.timestamp)}
          </span>
        </div>

        <div className="prose max-w-none text-sm text-text">
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
                    className="text-primary bg-primary/10 px-1.5 py-0.5 rounded text-xs font-mono"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              p({ children }) {
                return <p className="leading-7 text-text">{children}</p>;
              },
              strong({ children }) {
                return <strong className="font-semibold text-text">{children}</strong>;
              },
              ul({ children }) {
                return <ul className="list-disc pl-4 space-y-1 mt-2 mb-4 text-muted marker:text-primary">{children}</ul>;
              },
              ol({ children }) {
                return <ol className="list-decimal pl-4 space-y-1 mt-2 mb-4 text-muted">{children}</ol>;
              }
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>

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
