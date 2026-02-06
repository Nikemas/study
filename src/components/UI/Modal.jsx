import PropTypes from 'prop-types';
import { cn } from '../../utils/themeUtils';

export const Modal = ({ isOpen, onClose, children, className }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className={cn('w-full max-w-3xl rounded-lg bg-surface text-text shadow-card border border-border', className)}>
        {children}
      </div>
      <button className="sr-only" onClick={onClose} aria-label="Close modal" />
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string
};
