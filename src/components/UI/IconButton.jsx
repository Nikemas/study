import PropTypes from 'prop-types';
import { cn } from '../../utils/themeUtils';

export const IconButton = ({
  variant = 'ghost',
  size = 'md',
  className,
  ...props
}) => {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const variants = {
    ghost: 'bg-transparent hover:bg-border/30 text-text',
    soft: 'bg-border/20 hover:bg-border/40 text-text',
    primary: 'bg-primary text-white hover:brightness-110'
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-full transition focus-ring',
        sizes[size],
        variants[variant],
        className
      )}
      {...props}
    />
  );
};

IconButton.propTypes = {
  variant: PropTypes.oneOf(['ghost', 'soft', 'primary']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string
};
