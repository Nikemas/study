// src/components/Chat/LoadingIndicator.jsx

import { Loader2 } from 'lucide-react';

export const LoadingIndicator = ({ theme }) => {
  return (
    <div className="flex justify-start mb-4 animate-fadeIn">
      <div
        className={`${
          theme === 'dark'
            ? 'bg-gray-800 border-gray-700'
            : 'bg-gray-100 border-gray-200'
        } border rounded-lg p-4 flex items-center gap-2 shadow-sm`}
      >
        <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
        <span
          className={`${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          } text-sm`}
        >
          AI думает...
        </span>
      </div>
    </div>
  );
};