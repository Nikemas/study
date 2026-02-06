import PropTypes from 'prop-types';
import { cn } from '../../utils/themeUtils';

export const Input = ({ className, ...props }) => (
  <input
    className={cn(
      'w-full rounded-md border border-border bg-surface px-4 py-2.5 text-sm text-text placeholder:text-muted focus-ring',
      className
    )}
    {...props}
  />
);

Input.propTypes = {
  className: PropTypes.string
};
