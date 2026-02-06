import PropTypes from 'prop-types';
import { Search, X } from 'lucide-react';
import { Input } from './Input';
import { IconButton } from './IconButton';

export const SearchInput = ({ value, onChange, placeholder }) => (
  <div className="relative w-full">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
    <Input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="pl-9 pr-9"
    />
    {value ? (
      <IconButton
        className="absolute right-1 top-1/2 -translate-y-1/2"
        size="sm"
        onClick={() => onChange({ target: { value: '' } })}
        aria-label="Clear search"
      >
        <X className="w-3 h-3" />
      </IconButton>
    ) : null}
  </div>
);

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};
