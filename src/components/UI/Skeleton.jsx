// src/components/UI/Skeleton.jsx
// Базовый компонент Skeleton для загрузки

import { memo } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '../../hooks/useTheme';

export const Skeleton = memo(({ className = '', variant = 'text', width, height }) => {
  const { theme } = useTheme();

  const baseClasses = `animate-pulse rounded ${
    theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
  }`;

  const variantClasses = {
    text: 'h-4 w-full',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const style = {
    width: width || undefined,
    height: height || undefined,
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
});

Skeleton.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['text', 'circular', 'rectangular']),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Skeleton.displayName = 'Skeleton';
