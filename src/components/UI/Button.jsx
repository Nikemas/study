import PropTypes from 'prop-types';
import { cn } from '../../utils/themeUtils';

const variants = {
  primary: 'bg-primary text-white hover:brightness-110 shadow-card',
  secondary: 'bg-surface text-text border border-border hover:bg-border/40',
  ghost: 'bg-transparent text-text hover:bg-border/30',
};

const sizes = {
  sm: 'px-3 py-2 text-xs',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-base'
};

export const Button = ({
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  disabled,
  ...props
}) => (
  <button
    type={type}
    disabled={disabled}
    className={cn(
      'inline-flex items-center justify-center gap-2 rounded-md font-semibold transition focus-ring disabled:opacity-50 disabled:pointer-events-none',
      variants[variant],
      sizes[size],
      className
    )}
    {...props}
  />
);

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
};
