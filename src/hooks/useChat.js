// src/hooks/useChat.js
// Хук для управления чатом с AI

import { useState, useEffect, useMemo, useRef } from 'react';
import { sendMessageToAI } from '../services/aiService';
import { AI_CONFIG } from '../config/aiConfig';
import { generateId } from '../utils/generateId';
import { ROLES } from '../constants';
import { useGamification } from '../contexts/GamificationContext';

const createInitialMessage = (content) => ({
  role: ROLES.ASSISTANT,
  content: content || '',
  timestamp: new Date(),
  id: 'initial-message'
});

const normalizeOptions = (arg1, language, initialMessageContent, t, contextOptions) => {
  if (arg1 && typeof arg1 === 'object' && !Array.isArray(arg1)) {
    return {
      onSaveChat: arg1.onSaveChat,
      language: arg1.language || 'ru',
      initialMessageContent: arg1.initialMessageContent,
      initialMessages: arg1.initialMessages,
      t: arg1.t || ((key) => key),
      contextOptions: arg1.contextOptions || {},
      resetKey: arg1.resetKey
    };
  }

  return {
    onSaveChat: arg1,
    language: language || 'ru',
    initialMessageContent,
    t: t || ((key) => key),
    contextOptions: contextOptions || {},
    resetKey: undefined,
    initialMessages: undefined
  };
};

export const useChat = (arg1, language, initialMessageContent, t, contextOptions = {}) => {
  const options = normalizeOptions(arg1, language, initialMessageContent, t, contextOptions);
  const { onSaveChat, contextOptions: ctxOptions, initialMessages, resetKey } = options;
  const { addXP } = useGamification();

  const computedInitialMessages = useMemo(() => {
    if (initialMessages && initialMessages.length > 0) return initialMessages;
    return [createInitialMessage(options.initialMessageContent)];
  }, [initialMessages, options.initialMessageContent]);

  const [messages, setMessages] = useState(computedInitialMessages);
  const [loading, setLoading] = useState(false);
  const messagesRef = useRef(messages);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    if (resetKey !== undefined) {
      setMessages(computedInitialMessages);
    }
  }, [resetKey, computedInitialMessages]);

  useEffect(() => {
    if (initialMessages && initialMessages.length > 0) return;
    setMessages(prev => {
      if (prev.length === 1 && prev[0].id === 'initial-message') {
        return [createInitialMessage(options.initialMessageContent)];
      }
      return prev;
    });
  }, [options.initialMessageContent, initialMessages]);

  const sendMessage = async (userQuestion) => {
    if (!userQuestion.trim() || loading) return;

    const userMessage = {
      role: ROLES.USER,
      content: userQuestion,
      timestamp: new Date(),
      id: generateId()
    };

    const baseMessages = messagesRef.current;
    const newMessages = [...baseMessages, userMessage];
    setMessages(newMessages);
    setLoading(true);

    try {
      const conversationHistory = newMessages
        .slice(-AI_CONFIG.maxHistoryMessages)
        .map(msg => ({
          role: msg.role,
          content: msg.content
        }));

      const aiResponseText = await sendMessageToAI(userQuestion, conversationHistory, options.language, ctxOptions);

      const aiResponse = {
        role: ROLES.ASSISTANT,
        content: aiResponseText,
        timestamp: new Date(),
        id: generateId()
      };

      const finalMessages = [...newMessages, aiResponse];
      setMessages(finalMessages);

      addXP('MESSAGE');

      if (onSaveChat) {
        onSaveChat(finalMessages);
      }
    } catch (error) {
      const errorContent = error.code && error.code.startsWith('errors.')
        ? options.t(error.code)
        : options.t('errors.apiError');

      const errorMessage = {
        role: ROLES.ASSISTANT,
        content: errorContent,
        timestamp: new Date(),
        id: generateId(),
        error: true
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    setMessages(computedInitialMessages);
  };

  const loadMessages = (loadedMessages) => {
    setMessages(loadedMessages);
  };

  const updateMessageRating = (messageId, rating) => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId ? { ...msg, rating } : msg
      )
    );
  };

  return {
    messages,
    loading,
    sendMessage,
    clearHistory,
    loadMessages,
    updateMessageRating
  };
};
