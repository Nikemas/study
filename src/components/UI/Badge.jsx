import PropTypes from 'prop-types';
import { cn } from '../../utils/themeUtils';

export const Badge = ({ className, variant = 'default', children }) => {
  const variants = {
    default: 'bg-border/30 text-text',
    success: 'bg-success/20 text-success',
    warning: 'bg-warning/20 text-warning',
    danger: 'bg-danger/20 text-danger',
    accent: 'bg-accent/20 text-accent'
  };

  return (
    <span className={cn('inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold', variants[variant], className)}>
      {children}
    </span>
  );
};

Badge.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(['default', 'success', 'warning', 'danger', 'accent']),
  children: PropTypes.node
};
