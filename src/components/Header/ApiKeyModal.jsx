// src/components/Header/ApiKeyModal.jsx

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { X, Eye, EyeOff, Key, Volume2, VolumeX } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../contexts/LanguageContext';
import { useSettings } from '../../contexts/SettingsContext';
import { getApiKey, saveApiKey } from '../../services/aiService';

export const ApiKeyModal = ({ isOpen, onClose }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const { enabled, toggleSound } = useSettings();
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

  const isDark = theme === 'dark';

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 ${isDark ? 'bg-black/80' : 'bg-black/60'
          } backdrop-blur-md`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-md rounded-2xl shadow-2xl ${isDark ? 'glass-card' : 'light-glass-card'
          } p-6 animate-slideUp z-10`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="api-key-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl ${isDark ? 'bg-indigo-500/10 border border-indigo-500/20' : 'bg-indigo-100 border border-indigo-200'
              } flex items-center justify-center`}>
              <Key className={`w-5 h-5 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
            </div>
            <h2
              id="api-key-modal-title"
              className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} font-display`}
            >
              {t('apiKey.title')}
            </h2>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-xl transition ${isDark
              ? 'hover:bg-white/5 text-gray-400 hover:text-white'
              : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
              }`}
            aria-label={t('common.close')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Description */}
        <p className={`mb-6 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {t('apiKey.description')}
        </p>

        {/* Input */}
        <div className="relative mb-6">
          <input
            type={showKey ? 'text' : 'password'}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder={t('apiKey.placeholder')}
            className={`w-full px-4 py-3 pr-12 rounded-xl border transition ${isDark
              ? 'bg-white/5 border-white/10 text-white placeholder-gray-500 focus:border-indigo-500/50'
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-indigo-500'
              } focus:outline-none focus:ring-2 focus:ring-indigo-500/20`}
          />
          <button
            type="button"
            onClick={() => setShowKey(!showKey)}
            className={`absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition ${isDark ? 'text-gray-400 hover:text-gray-300 hover:bg-white/5' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            aria-label={showKey ? t('apiKey.hideKey') : t('apiKey.showKey')}
          >
            {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {/* Link to get key */}
        <p className={`mb-6 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {t('apiKey.getKeyText')}{' '}
          <a
            href="https://console.groq.com/keys"
            target="_blank"
            rel="noopener noreferrer"
            className={`${isDark ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'
              } underline font-medium`}
          >
            console.groq.com
          </a>
        </p>

        {/* Sound Settings */}
        <div className={`mb-6 p-4 rounded-xl flex items-center justify-between ${isDark ? 'bg-white/5' : 'bg-gray-50'
          }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${isDark ? 'bg-white/5 text-gray-300' : 'bg-white text-gray-600 shadow-sm'
              }`}>
              {enabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </div>
            <div>
              <div className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('settings.sound') || 'Sound Effects'}
              </div>
              <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {enabled ? (t('settings.on') || 'On') : (t('settings.off') || 'Off')}
              </div>
            </div>
          </div>

          <button
            onClick={toggleSound}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${enabled ? 'bg-indigo-600' : (isDark ? 'bg-gray-700' : 'bg-gray-200')
              }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
            />
          </button>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleClear}
            className={`flex-1 px-4 py-2.5 rounded-xl font-medium transition ${isDark
              ? 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
              : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200'
              }`}
          >
            {t('apiKey.clear')}
          </button>
          <button
            onClick={handleSave}
            className="flex-1 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition shadow-lg shadow-indigo-500/20"
          >
            {t('apiKey.save')}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

ApiKeyModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};
