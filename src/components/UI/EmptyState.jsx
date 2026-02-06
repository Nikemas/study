import PropTypes from 'prop-types';

export const EmptyState = ({ icon, title, subtitle }) => (
  <div className="text-center py-12 text-muted">
    {icon && <div className="flex justify-center mb-4 text-muted">{icon}</div>}
    <p className="text-lg font-semibold text-text">{title}</p>
    {subtitle && <p className="text-sm mt-2 text-muted">{subtitle}</p>}
  </div>
);

EmptyState.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string
};
