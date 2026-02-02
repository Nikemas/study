// src/components/Chat/LoadingIndicator.jsx

import { Loader2 } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../contexts/LanguageContext';
import { themeClasses } from '../../utils/themeUtils';

export const LoadingIndicator = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();

  return (
    <div className="flex justify-start mb-4 animate-fadeIn" role="status" aria-live="polite">
      <div
        className={`${themeClasses.card(theme)} border rounded-lg p-4 flex items-center gap-2 shadow-sm`}
      >
        <Loader2 className="w-4 h-4 animate-spin text-indigo-600" aria-hidden="true" />
        <span className={`${themeClasses.textSecondary(theme)} text-sm`}>
          {t('chat.thinking')}
        </span>
      </div>
    </div>
  );
};
