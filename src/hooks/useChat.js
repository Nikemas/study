// src/hooks/useChat.js
// Хук для управления чатом с AI

import { useState } from 'react';
import { sendMessageToAI } from '../services/aiService';
import { AI_CONFIG } from '../config/aiConfig';
import { INITIAL_MESSAGE } from '../data/courseData';

export const useChat = (onSaveChat) => {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (userQuestion) => {
    if (!userQuestion.trim() || loading) return;

    const userMessage = {
      role: 'user',
      content: userQuestion,
      timestamp: new Date(),
      id: Date.now()
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
        role: 'assistant',
        content: aiResponseText,
        timestamp: new Date(),
        id: Date.now() + 1
      };

      const finalMessages = [...newMessages, aiResponse];
      setMessages(finalMessages);
      
      // Сохраняем в историю
      if (onSaveChat) {
        onSaveChat(finalMessages);
      }
    } catch (error) {
      const errorMessage = {
        role: 'assistant',
        content: 'Извините, произошла ошибка при обработке запроса. Проверьте API ключ в .env файле.',
        timestamp: new Date(),
        id: Date.now() + 1,
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