import PropTypes from 'prop-types';

export const AppShell = ({ header, children, mobileNav }) => (
  <div className="app">
    <div className="flex flex-col h-screen mesh-gradient transition-colors relative overflow-hidden">
      {header}
      <main className="flex-1 overflow-hidden pt-20 md:pt-24 pb-24 md:pb-6 px-4 md:px-6">
        {children}
      </main>
      {mobileNav}
    </div>
  </div>
);

AppShell.propTypes = {
  header: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  mobileNav: PropTypes.node.isRequired
};
