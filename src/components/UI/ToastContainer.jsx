// src/components/UI/ToastContainer.jsx
// Контейнер для Toast-уведомлений

import { memo } from 'react';
import { useToast } from '../../contexts/ToastContext';
import { Toast } from './Toast';

export const ToastContainer = memo(() => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm"
      aria-label="Уведомления"
    >
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  );
});

ToastContainer.displayName = 'ToastContainer';
