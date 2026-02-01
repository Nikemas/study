// src/hooks/useChatHistory.js
// Хук для управления историей чатов

import { useState, useEffect } from 'react';
import { 
  saveChatHistory, 
  getChatHistory, 
  saveCurrentChatId, 
  getCurrentChatId 
} from '../services/storageService';

export const useChatHistory = () => {
  const [chatHistory, setChatHistory] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);

  useEffect(() => {
    const history = getChatHistory();
    const chatId = getCurrentChatId();
    setChatHistory(history);
    setCurrentChatId(chatId);
  }, []);

  const saveChat = (messages) => {
    if (messages.length <= 1) return; // Не сохраняем пустые чаты

    const chat = {
      id: currentChatId || Date.now(),
      title: messages[1]?.content.slice(0, 50) || 'Новый диалог',
      messages: messages,
      timestamp: new Date().toISOString()
    };

    const newHistory = [
      chat,
      ...chatHistory.filter(c => c.id !== chat.id)
    ].slice(0, 10); // Храним максимум 10 чатов

    setChatHistory(newHistory);
    saveChatHistory(newHistory);
    
    if (!currentChatId) {
      setCurrentChatId(chat.id);
      saveCurrentChatId(chat.id);
    }
  };

  const loadChat = (chatId) => {
    const chat = chatHistory.find(c => c.id === chatId);
    if (chat) {
      setCurrentChatId(chatId);
      saveCurrentChatId(chatId);
      return chat.messages;
    }
    return null;
  };

  const startNewChat = () => {
    setCurrentChatId(null);
    saveCurrentChatId(null);
  };

  const deleteChat = (chatId) => {
    const newHistory = chatHistory.filter(c => c.id !== chatId);
    setChatHistory(newHistory);
    saveChatHistory(newHistory);
    
    if (currentChatId === chatId) {
      startNewChat();
    }
  };

  return {
    chatHistory,
    currentChatId,
    saveChat,
    loadChat,
    startNewChat,
    deleteChat
  };
};