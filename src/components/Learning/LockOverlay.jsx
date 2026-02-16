import React from 'react';
import { Lock } from 'lucide-react';

const LockOverlay = ({ reason, requirement }) => {
  return (
    <div className="lock-overlay bg-white dark:bg-gray-800 rounded-lg shadow-md p-12">
      <div className="text-center max-w-md mx-auto">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full mb-6">
          <Lock className="w-10 h-10 text-gray-400" />
        </div>

        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Этап заблокирован
        </h3>

        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {reason}
        </p>

        {requirement && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r text-left">
            <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
              Требование:
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {requirement}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LockOverlay;
