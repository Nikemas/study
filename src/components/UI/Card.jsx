import PropTypes from 'prop-types';
import { cn } from '../../utils/themeUtils';

export const Card = ({ className, children, variant = 'surface', ...props }) => {
  const variants = {
    surface: 'surface-card',
    glass: 'glass-card',
    soft: 'bg-border/20 border border-border'
  };

  return (
    <div className={cn('rounded-lg p-4', variants[variant], className)} {...props}>
      {children}
    </div>
  );
};

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  variant: PropTypes.oneOf(['surface', 'glass', 'soft'])
};
