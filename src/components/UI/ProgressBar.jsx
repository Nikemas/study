import PropTypes from 'prop-types';

export const ProgressBar = ({ value }) => (
  <div className="h-2 w-full rounded-full bg-border/40 overflow-hidden">
    <div
      className="h-full bg-primary transition-all"
      style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
    />
  </div>
);

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired
};
