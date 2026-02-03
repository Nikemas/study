// src/components/UI/Toast.jsx
// Компонент Toast-уведомления

import { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { CheckCircle, XCircle, Info, Trophy, X } from 'lucide-react';

const TOAST_ICONS = {
  success: CheckCircle,
  error: XCircle,
  info: Info,
  achievement: Trophy,
};

const TOAST_STYLES = {
  success: {
    bg: 'bg-green-500',
    border: 'border-green-600',
  },
  error: {
    bg: 'bg-red-500',
    border: 'border-red-600',
  },
  info: {
    bg: 'bg-blue-500',
    border: 'border-blue-600',
  },
  achievement: {
    bg: 'bg-gradient-to-r from-yellow-400 to-orange-500',
    border: 'border-yellow-500',
  },
};

export const Toast = memo(({ toast, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);
  const Icon = TOAST_ICONS[toast.type] || Info;
  const styles = TOAST_STYLES[toast.type] || TOAST_STYLES.info;

  useEffect(() => {
    requestAnimationFrame(() => setIsVisible(true));
  }, []);

  const handleRemove = () => {
    setIsVisible(false);
    setTimeout(() => onRemove(toast.id), 200);
  };

  return (
    <div
      className={`flex items-center gap-3 p-4 rounded-lg shadow-lg border transform transition-all duration-200 text-white ${
        styles.bg
      } ${styles.border} ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
      role="alert"
      aria-live="polite"
    >
      <Icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
      <span className="flex-1 text-sm font-medium">{toast.message}</span>
      <button
        onClick={handleRemove}
        className="p-1 rounded-full hover:bg-white/20 transition"
        aria-label="Закрыть уведомление"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
});

Toast.propTypes = {
  toast: PropTypes.shape({
    id: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['success', 'error', 'info', 'achievement']),
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
};

Toast.displayName = 'Toast';
