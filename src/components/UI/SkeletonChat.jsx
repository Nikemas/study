// src/components/UI/SkeletonChat.jsx
// Skeleton для сообщений чата

import { memo } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../../hooks/useTheme';
import { Skeleton } from './Skeleton';

export const SkeletonChat = memo(({ count = 3 }) => {
  const { theme } = useTheme();

  return (
    <div className="space-y-4" aria-busy="true" aria-label="Загрузка сообщений...">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
        >
          <div
            className={`max-w-[70%] p-4 rounded-lg ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
            }`}
          >
            <div className="space-y-2">
              <Skeleton width={index % 2 === 0 ? '200px' : '150px'} height={14} />
              <Skeleton width={index % 2 === 0 ? '250px' : '180px'} height={14} />
              {index % 2 === 0 && <Skeleton width="180px" height={14} />}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

SkeletonChat.propTypes = {
  count: PropTypes.number,
};

SkeletonChat.displayName = 'SkeletonChat';
