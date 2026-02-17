// src/components/Knowledge/MaterialDetailView.jsx

import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { X, CheckCircle2, BookOpen, MessageCircle } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../contexts/LanguageContext';
import { isMaterialComplete, markMaterialComplete, markMaterialIncomplete } from '../../services/progressService';
import { generateId } from '../../utils/generateId';
import { ChatInput } from '../Chat/ChatInput';
import { Message } from '../Chat/Message';
import { LoadingIndicator } from '../Chat/LoadingIndicator';
import { useChat } from '../../hooks/useChat';

const CATEGORY_CONFIG = {
  python: { label: 'PY', colorClass: 'text-blue-400', bgClass: 'from-blue-600/20 to-yellow-500/20', borderClass: 'border-blue-500/20' },
  javascript: { label: 'JS', colorClass: 'text-yellow-400', bgClass: 'from-yellow-400/20 to-orange-500/20', borderClass: 'border-yellow-500/20' },
  html: { label: 'HTML', colorClass: 'text-orange-400', bgClass: 'from-orange-500/20 to-red-500/20', borderClass: 'border-orange-500/20' },
  css: { label: 'CSS', colorClass: 'text-indigo-400', bgClass: 'from-indigo-500/20 to-blue-500/20', borderClass: 'border-indigo-500/20' },
  react: { label: 'RE', colorClass: 'text-cyan-400', bgClass: 'from-cyan-500/20 to-blue-500/20', borderClass: 'border-cyan-500/20' }
};

export const MaterialDetailView = ({ material, onClose, onProgressChange }) => {
  const { theme } = useTheme();
  const { language, t } = useLanguage();
  const [isCompleted, setIsCompleted] = useState(() => isMaterialComplete(material.id));
  const [showChat, setShowChat] = useState(false);
  const messagesEndRef = useRef(null);

  const isDark = theme === 'dark';
  const config = CATEGORY_CONFIG[material.category] || CATEGORY_CONFIG.python;

  const welcomeMessage = useMemo(() => ({
    id: generateId(),
    role: 'assistant',
    content: language === 'en'
      ? `Hi! I'll help you study the topic **"${material.topic}"**. Ask any questions about this topic — I'll explain in detail!`
      : language === 'ky'
        ? `Саламат! Сен **"${material.topic}"** темасын ?йр?н??г? жардамчы болом. Бул тема боюнча каалаган суроо бер — т?ш?нд?р?м!`
        : `Привет! Я помогу тебе изучить тему **"${material.topic}"**. Задавай любые вопросы по этой теме — объясню подробно!`,
    timestamp: new Date()
  }), [language, material.topic]);

  const { messages, loading, sendMessage, updateMessageRating } = useChat({
    initialMessages: [welcomeMessage],
    language,
    t,
    contextOptions: { activeCategory: material.category, activeTopic: material.topic },
    resetKey: material.id
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleToggleComplete = useCallback(() => {
    if (isCompleted) {
      markMaterialIncomplete(material.id);
      setIsCompleted(false);
    } else {
      markMaterialComplete(material.id);
      setIsCompleted(true);
    }
    if (onProgressChange) onProgressChange();
  }, [isCompleted, material.id, onProgressChange]);

  const handleRate = useCallback((messageId, rating) => {
    updateMessageRating(messageId, rating);
  }, [updateMessageRating]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className={`w-full max-w-7xl lg:h-[90vh] h-full ${isDark ? 'glass' : 'light-glass'} rounded-3xl shadow-2xl flex flex-col overflow-hidden`}>
        <div className={`flex items-center justify-between p-5 border-b ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
          <div className="flex items-center gap-3">
            <div className={`min-w-11 h-11 px-3 rounded-xl bg-gradient-to-br ${config.bgClass} border ${config.borderClass} flex items-center justify-center`}>
              <span className={`text-xs font-bold tracking-wider ${config.colorClass}`}>{config.label}</span>
            </div>
            <div>
              <h2 className={`text-xl font-bold font-display ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {material.topic}
              </h2>
              <p className={`text-xs uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                {material.category}
              </p>
            </div>
          </div>

          {isCompleted && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-success/20 text-success border border-success/30">
              {t('progress.completed')}
            </span>
          )}

          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition-colors ${isDark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}
          >
            <X className={isDark ? 'text-gray-400' : 'text-gray-600'} size={22} />
          </button>
        </div>

        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          <div className={`${showChat ? 'lg:w-1/2 w-full' : 'w-full'} flex flex-col transition-all duration-300 min-w-0`}>
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              <div className={`p-5 rounded-2xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-200'}`}>
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className={config.colorClass} size={18} />
                  <h3 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('material.description')}</h3>
                </div>
                <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {material.content}
                </p>
              </div>

              {material.detailedContent && (
                <div className={`p-5 rounded-2xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-200'}`}>
                  <h3 className={`text-base font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('material.detailedStudy')}</h3>
                  <div className={`space-y-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {material.detailedContent.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className="leading-relaxed">{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}

              {material.examples?.length > 0 && (
                <div className={`p-5 rounded-2xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-200'}`}>
                  <h3 className={`text-base font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('material.examples')}</h3>
                  <div className="space-y-4">
                    {material.examples.map((example, idx) => (
                      <div key={idx} className={`rounded-xl overflow-hidden border ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                        {example.title && (
                          <div className={`px-4 py-2 text-xs font-semibold ${isDark ? 'bg-white/5 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
                            {example.title}
                          </div>
                        )}
                        <pre className={`p-4 text-sm overflow-x-auto whitespace-pre ${isDark ? 'bg-black/40 text-green-400' : 'bg-gray-900 text-green-300'}`}>
                          <code>{example.code}</code>
                        </pre>
                        {example.explanation && (
                          <div className={`px-4 py-2 text-xs ${isDark ? 'bg-white/3 text-gray-400' : 'bg-gray-50 text-gray-600'}`}>
                            Note: {example.explanation}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {material.keyPoints?.length > 0 && (
                <div className={`p-5 rounded-2xl ${isDark ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-200'}`}>
                  <h3 className={`text-base font-semibold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('material.keyPoints')}</h3>
                  <ul className="space-y-2">
                    {material.keyPoints.map((point, idx) => (
                      <li key={idx} className={`flex items-start gap-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        <span className={`mt-0.5 ${config.colorClass}`}>•</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className={`p-5 border-t ${isDark ? 'border-white/10 bg-white/3' : 'border-gray-200 bg-white/60'}`}>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowChat(prev => !prev)}
                  className={`flex-1 py-2.5 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 text-sm ${showChat
                      ? 'bg-primary text-white hover:brightness-110'
                      : isDark
                        ? 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/10'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                    }`}
                >
                  <MessageCircle size={18} />
                  {showChat ? t('material.hideAI') : t('material.askAI')}
                </button>

                <button
                  onClick={handleToggleComplete}
                  className={`flex-1 py-2.5 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 text-sm ${isCompleted
                      ? 'bg-success text-white hover:brightness-110 shadow-lg shadow-green-600/25'
                      : 'bg-primary text-white hover:brightness-110 shadow-lg shadow-primary/25'
                    }`}
                >
                  <CheckCircle2 size={18} />
                  {isCompleted ? t('material.completed') : t('material.markComplete')}
                </button>
              </div>
            </div>
          </div>

          {showChat && (
            <div className={`lg:w-1/2 w-full border-t lg:border-t-0 lg:border-l ${isDark ? 'border-white/10' : 'border-gray-200'} flex flex-col min-w-0`}>
              <div className={`p-4 border-b ${isDark ? 'border-white/10 bg-white/3' : 'border-gray-200 bg-white/60'}`}>
                <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{t('material.aiHelper')}</h3>
                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{t('material.askQuestionAbout')} "{material.topic}"</p>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <div className="flex flex-col gap-4">
                  {messages.map((msg) => (
                    <Message key={msg.id} message={msg} onRate={handleRate} />
                  ))}
                  {loading && <LoadingIndicator />}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              <div className={`p-3 border-t ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                <ChatInput onSend={sendMessage} loading={loading} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

MaterialDetailView.propTypes = {
  material: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    topic: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    detailedContent: PropTypes.string,
    examples: PropTypes.array,
    keyPoints: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onProgressChange: PropTypes.func
};

