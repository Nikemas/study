// src/hooks/useChat.js
// Хук для управления чатом с AI

import { useState } from 'react';
import { sendMessageToAI } from '../services/aiService';
import { AI_CONFIG } from '../config/aiConfig';
import { INITIAL_MESSAGE } from '../data/courseData';
import { generateId } from '../utils/generateId';
import { ROLES } from '../constants';
import { useGamification } from '../contexts/GamificationContext';

export const useChat = (onSaveChat) => {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [loading, setLoading] = useState(false);
  const { addXP } = useGamification();

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

      const aiResponseText = await sendMessageToAI(userQuestion, conversationHistory);

      const aiResponse = {
        role: ROLES.ASSISTANT,
        content: aiResponseText,
        timestamp: new Date(),
        id: generateId()
      };

      const finalMessages = [...newMessages, aiResponse];
      setMessages(finalMessages);

      // Начисляем XP за отправку сообщения
      addXP('MESSAGE');

      if (onSaveChat) {
        onSaveChat(finalMessages);
      }
    } catch (error) {
      const errorContent = error.message.includes('API ключ')
        ? error.message
        : error.message.includes('лимит')
        ? 'Превышен лимит запросов. Подождите немного и попробуйте снова.'
        : error.message.includes('Некорректный ответ')
        ? 'Получен некорректный ответ от сервера. Попробуйте повторить запрос.'
        : error.message.includes('недоступен')
        ? error.message
        : `Ошибка: ${error.message}`;

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
    setMessages([INITIAL_MESSAGE]);
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
