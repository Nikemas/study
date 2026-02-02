// src/components/Header/ApiKeyModal.jsx

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { X, Eye, EyeOff, Key } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../contexts/LanguageContext';
import { getApiKey, saveApiKey } from '../../services/aiService';
import { themeClasses } from '../../utils/themeUtils';

export const ApiKeyModal = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setApiKey(getApiKey());
    }
  }, [isOpen]);

  const handleSave = () => {
    saveApiKey(apiKey.trim());
    onClose();
  };

  const handleClear = () => {
    setApiKey('');
    saveApiKey('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-md rounded-lg shadow-xl ${themeClasses.card(theme)} border p-6`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="api-key-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Key className={`w-5 h-5 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} />
            <h2
              id="api-key-modal-title"
              className={`text-lg font-semibold ${themeClasses.text(theme)}`}
            >
              {t('apiKey.title')}
            </h2>
          </div>
          <button
            onClick={onClose}
            className={`p-1 rounded-lg transition ${
              theme === 'dark'
                ? 'hover:bg-gray-700 text-gray-400'
                : 'hover:bg-gray-100 text-gray-500'
            }`}
            aria-label={t('common.close')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Description */}
        <p className={`mb-4 text-sm ${themeClasses.textMuted(theme)}`}>
          {t('apiKey.description')}
        </p>

        {/* Input */}
        <div className="relative mb-4">
          <input
            type={showKey ? 'text' : 'password'}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder={t('apiKey.placeholder')}
            className={`w-full px-4 py-2 pr-10 rounded-lg border transition ${themeClasses.input(theme)} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
          />
          <button
            type="button"
            onClick={() => setShowKey(!showKey)}
            className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded ${
              theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
            }`}
            aria-label={showKey ? t('apiKey.hideKey') : t('apiKey.showKey')}
          >
            {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {/* Link to get key */}
        <p className={`mb-4 text-sm ${themeClasses.textMuted(theme)}`}>
          {t('apiKey.getKeyText')}{' '}
          <a
            href="https://console.groq.com/keys"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-500 hover:text-indigo-600 underline"
          >
            console.groq.com
          </a>
        </p>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleClear}
            className={`flex-1 px-4 py-2 rounded-lg transition ${
              theme === 'dark'
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {t('apiKey.clear')}
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition"
          >
            {t('apiKey.save')}
          </button>
        </div>
      </div>
    </div>
  );
};

ApiKeyModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};
