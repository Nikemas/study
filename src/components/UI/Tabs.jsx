import PropTypes from 'prop-types';
import { cn } from '../../utils/themeUtils';

export const Tabs = ({ items, value, onChange, className }) => (
  <div className={cn('inline-flex gap-2 p-1 rounded-md bg-border/30', className)} role="tablist">
    {items.map(item => (
      <button
        key={item.value}
        onClick={() => onChange(item.value)}
        className={cn(
          'px-4 py-2 text-sm font-semibold rounded-md transition focus-ring',
          value === item.value ? 'bg-primary text-white shadow-soft' : 'text-text hover:bg-border/40'
        )}
        role="tab"
        aria-selected={value === item.value}
      >
        <span className="inline-flex items-center gap-2">
          {item.icon}
          {item.label}
        </span>
      </button>
    ))}
  </div>
);

Tabs.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    icon: PropTypes.node
  })).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string
};
