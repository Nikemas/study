import PropTypes from 'prop-types';

export const SectionHeader = ({ title, subtitle, action }) => (
  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
    <div>
      <h2 className="text-3xl font-bold font-display text-text">{title}</h2>
      {subtitle && <p className="text-sm text-muted mt-1 max-w-xl">{subtitle}</p>}
    </div>
    {action && <div>{action}</div>}
  </div>
);

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  action: PropTypes.node
};
