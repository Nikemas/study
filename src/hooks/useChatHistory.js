// src/hooks/useChatHistory.js
// Хук для управления историей чатов

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  saveChatHistory,
  getChatHistory,
  saveCurrentChatId,
  getCurrentChatId
} from '../services/storageService';
import { LIMITS } from '../constants';

export const useChatHistory = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const historyRef = useRef([]);

  useEffect(() => {
    const history = getChatHistory();
    const chatId = getCurrentChatId();
    setChatHistory(history);
    historyRef.current = history;
    setCurrentChatId(chatId);
  }, []);

  const saveChat = useCallback((messages) => {
    if (messages.length <= 1) return;

    const chat = {
      id: currentChatId || Date.now(),
      title: messages[1]?.content.slice(0, 50) || 'Новый диалог',
      messages: messages,
      timestamp: new Date().toISOString()
    };

    setChatHistory(prev => {
      const newHistory = [
        chat,
        ...prev.filter(c => c.id !== chat.id)
      ].slice(0, LIMITS.MAX_CHATS);

      historyRef.current = newHistory;
      saveChatHistory(newHistory);

      if (!currentChatId) {
        setCurrentChatId(chat.id);
        saveCurrentChatId(chat.id);
      }

      return newHistory;
    });
  }, [currentChatId]);

  const loadChat = useCallback((chatId) => {
    const chat = historyRef.current.find(c => c.id === chatId);
    if (chat) {
      setCurrentChatId(chatId);
      saveCurrentChatId(chatId);
      return chat.messages;
    }
    return null;
  }, []);

  const startNewChat = useCallback(() => {
    setCurrentChatId(null);
    saveCurrentChatId(null);
  }, []);

  const deleteChat = useCallback((chatId) => {
    setChatHistory(prev => {
      const newHistory = prev.filter(c => c.id !== chatId);
      historyRef.current = newHistory;
      saveChatHistory(newHistory);

      if (currentChatId === chatId) {
        startNewChat();
      }

      return newHistory;
    });
  }, [currentChatId, startNewChat]);

  return {
    chatHistory,
    currentChatId,
    saveChat,
    loadChat,
    startNewChat,
    deleteChat
  };
};
