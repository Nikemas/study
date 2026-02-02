// src/hooks/useChat.js
// Хук для управления чатом с AI

import { useState, useEffect, useMemo } from 'react';
import { sendMessageToAI } from '../services/aiService';
import { AI_CONFIG } from '../config/aiConfig';
import { generateId } from '../utils/generateId';
import { ROLES } from '../constants';

const createInitialMessage = (content) => ({
  role: ROLES.ASSISTANT,
  content,
  timestamp: new Date(),
  id: 'initial-message'
});

export const useChat = (onSaveChat, language = 'ru', initialMessageContent, t) => {
  const initialMessage = useMemo(
    () => createInitialMessage(initialMessageContent),
    [initialMessageContent]
  );

  const [messages, setMessages] = useState([initialMessage]);
  const [loading, setLoading] = useState(false);

  // Update initial message when language changes
  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1 && prev[0].id === 'initial-message') {
        return [createInitialMessage(initialMessageContent)];
      }
      return prev;
    });
  }, [initialMessageContent]);

  const sendMessage = async (userQuestion) => {
    if (!userQuestion.trim() || loading) return;

    const userMessage = {
      role: ROLES.USER,
      content: userQuestion,
      timestamp: new Date(),
      id: generateId()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setLoading(true);

    try {
      const conversationHistory = newMessages
        .slice(-AI_CONFIG.maxHistoryMessages)
        .map(msg => ({
          role: msg.role,
          content: msg.content
        }));

      const aiResponseText = await sendMessageToAI(userQuestion, conversationHistory, language);

      const aiResponse = {
        role: ROLES.ASSISTANT,
        content: aiResponseText,
        timestamp: new Date(),
        id: generateId()
      };

      const finalMessages = [...newMessages, aiResponse];
      setMessages(finalMessages);

      if (onSaveChat) {
        onSaveChat(finalMessages);
      }
    } catch (error) {
      // Если ошибка имеет код локализации, используем t() для перевода
      const errorContent = error.code && error.code.startsWith('errors.')
        ? t(error.code)
        : t('errors.apiError');

      const errorMessage = {
        role: ROLES.ASSISTANT,
        content: errorContent,
        timestamp: new Date(),
        id: generateId(),
        error: true
      };
      setMessages([...newMessages, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    setMessages([createInitialMessage(initialMessageContent)]);
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
