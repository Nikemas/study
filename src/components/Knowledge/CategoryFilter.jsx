// src/components/Knowledge/CategoryFilter.jsx

import PropTypes from 'prop-types';
import { LayoutGrid } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../contexts/LanguageContext';

export const CategoryFilter = ({ selectedCategory, onSelectCategory, courses }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';

  const getButtonClass = (isActive) => {
    if (isActive) {
      return isDark
        ? 'bg-white/10 text-white border border-white/5 shadow-sm'
        : 'bg-indigo-100 text-indigo-700 border border-indigo-200 shadow-sm';
    }
    return isDark
      ? 'text-gray-400 hover:text-white hover:bg-white/5'
      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100';
  };

  return (
    <nav className="flex flex-col gap-1" role="tablist" aria-label={t('knowledge.filterLabel')}>
      <button
        onClick={() => onSelectCategory('all')}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${getButtonClass(selectedCategory === 'all')}`}
        role="tab"
        aria-selected={selectedCategory === 'all'}
        aria-controls="materials-list"
      >
        <LayoutGrid className="w-5 h-5 text-indigo-400" />
        <span className="text-sm font-medium">{t('knowledge.allCourses')}</span>
      </button>

      {courses.map((course) => (
        <button
          key={course.id}
          onClick={() => onSelectCategory(course.id)}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${getButtonClass(selectedCategory === course.id)}`}
          role="tab"
          aria-selected={selectedCategory === course.id}
          aria-controls="materials-list"
        >
          <span className="text-xl" role="img" aria-label={course.name}>
            {course.icon}
          </span>
          <span className="text-sm font-medium">{course.name}</span>
        </button>
      ))}
    </nav>
  );
};

CategoryFilter.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  onSelectCategory: PropTypes.func.isRequired,
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired
    })
  ).isRequired
};
