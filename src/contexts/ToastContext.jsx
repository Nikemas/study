// src/contexts/ToastContext.jsx
// Контекст для управления Toast-уведомлениями

import { createContext, useContext, useState, useCallback } from 'react';
import { generateId } from '../utils/generateId';

const ToastContext = createContext(null);

const TOAST_DURATION = {
  success: 3000,
  error: 5000,
  info: 4000,
  achievement: 6000,
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const addToast = useCallback((message, type = 'info', options = {}) => {
    const id = generateId();
    const duration = options.duration || TOAST_DURATION[type] || 4000;

    const toast = {
      id,
      message,
      type,
      ...options,
    };

    setToasts(prev => [...prev, toast]);

    if (!options.persistent) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, [removeToast]);

  const success = useCallback((message, options) =>
    addToast(message, 'success', options), [addToast]);

  const error = useCallback((message, options) =>
    addToast(message, 'error', options), [addToast]);

  const info = useCallback((message, options) =>
    addToast(message, 'info', options), [addToast]);

  const value = {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    info,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};
