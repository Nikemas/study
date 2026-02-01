// src/components/Knowledge/CategoryFilter.jsx

import { COURSE_DATA } from '../../data/courseData';

export const CategoryFilter = ({ selectedCategory, onSelectCategory, theme }) => {
  return (
    <div className="flex gap-2 mb-6 flex-wrap">
      <button
        onClick={() => onSelectCategory('all')}
        className={`px-4 py-2 rounded-lg transition ${
          selectedCategory === 'all'
            ? 'bg-indigo-600 text-white shadow-lg'
            : theme === 'dark'
            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Все курсы
      </button>

      {COURSE_DATA.courses.map((course) => (
        <button
          key={course.id}
          onClick={() => onSelectCategory(course.id)}
          className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${
            selectedCategory === course.id
              ? 'bg-indigo-600 text-white shadow-lg'
              : theme === 'dark'
              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <span className="text-lg">{course.icon}</span>
          <span>{course.name}</span>
        </button>
      ))}
    </div>
  );
};