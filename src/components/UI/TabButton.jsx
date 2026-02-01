// src/components/UI/TabButton.jsx

import { useTheme } from '../../hooks/useTheme';

export const TabButton = ({ active, onClick, icon, label }) => {
  const { theme } = useTheme();

  const baseClasses = 'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition';
  const activeClasses = 'bg-indigo-600 text-white shadow-lg';
  const inactiveClasses = theme === 'dark'
    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
    : 'bg-gray-100 text-gray-700 hover:bg-gray-200';

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${active ? activeClasses : inactiveClasses}`}
      aria-current={active ? 'page' : undefined}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};
