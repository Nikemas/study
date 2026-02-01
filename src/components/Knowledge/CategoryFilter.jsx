// src/components/Knowledge/CategoryFilter.jsx

import { useTheme } from '../../hooks/useTheme';
import { COURSE_DATA } from '../../data/courseData';

export const CategoryFilter = ({ selectedCategory, onSelectCategory }) => {
  const { theme } = useTheme();

  const getButtonClass = (isActive) => {
    if (isActive) {
      return 'bg-indigo-600 text-white shadow-lg';
    }
    return theme === 'dark'
      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
      : 'bg-gray-100 text-gray-700 hover:bg-gray-200';
  };

  return (
    <nav className="flex gap-2 mb-6 flex-wrap" role="tablist" aria-label="Фильтр по категориям">
      <button
        onClick={() => onSelectCategory('all')}
        className={`px-4 py-2 rounded-lg transition ${getButtonClass(selectedCategory === 'all')}`}
        role="tab"
        aria-selected={selectedCategory === 'all'}
        aria-controls="materials-list"
      >
        Все курсы
      </button>

      {COURSE_DATA.courses.map((course) => (
        <button
          key={course.id}
          onClick={() => onSelectCategory(course.id)}
          className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${getButtonClass(selectedCategory === course.id)}`}
          role="tab"
          aria-selected={selectedCategory === course.id}
          aria-controls="materials-list"
        >
          <span className="text-lg" role="img" aria-label={course.name}>
            {course.icon}
          </span>
          <span>{course.name}</span>
        </button>
      ))}
    </nav>
  );
};
