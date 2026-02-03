// src/components/UI/SkeletonCard.jsx
// Skeleton для карточки

import { memo } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { Skeleton } from './Skeleton';

export const SkeletonCard = memo(() => {
  const { theme } = useTheme();

  return (
    <div
      className={`p-4 rounded-lg border ${
        theme === 'dark'
          ? 'border-gray-700 bg-gray-800'
          : 'border-gray-200 bg-white'
      }`}
      aria-busy="true"
      aria-label="Загрузка..."
    >
      <div className="flex items-start gap-3">
        <Skeleton variant="circular" width={48} height={48} />
        <div className="flex-1 space-y-2">
          <Skeleton width="60%" height={16} />
          <Skeleton width="100%" height={12} />
          <Skeleton width="80%" height={12} />
        </div>
      </div>
    </div>
  );
});

SkeletonCard.displayName = 'SkeletonCard';
