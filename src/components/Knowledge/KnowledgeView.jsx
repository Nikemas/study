// src/components/Knowledge/KnowledgeView.jsx

import { useState } from 'react';
import { Book } from 'lucide-react';
import { COURSE_DATA, getMaterialsByCategory } from '../../data/courseData';
import { CategoryFilter } from './CategoryFilter';
import { MaterialCard } from './MaterialCard';

export const KnowledgeView = ({ theme }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const materials = getMaterialsByCategory(selectedCategory);

  return (
    <div className="max-w-5xl mx-auto h-full overflow-y-auto p-4">
      <div
        className={`${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        } rounded-lg shadow-sm p-6`}
      >
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Book
              className={`w-6 h-6 ${
                theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
              }`}
            />
            <h2
              className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}
            >
              {COURSE_DATA.title}
            </h2>
          </div>
          <p
            className={`${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Изучайте веб-разработку от основ до продвинутых тем
          </p>
        </div>

        {/* Category Filter */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          theme={theme}
        />

        {/* Materials */}
        <div className="space-y-4">
          {materials.length === 0 ? (
            <div
              className={`text-center py-12 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              <Book className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p>Материалы не найдены</p>
            </div>
          ) : (
            materials.map((material) => (
              <MaterialCard
                key={material.id}
                material={material}
                theme={theme}
              />
            ))
          )}
        </div>

        {/* Stats */}
        <div
          className={`mt-6 pt-6 border-t ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          }`}
        >
          <div className="flex gap-6 text-sm">
            <div>
              <span
                className={`${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Всего курсов:
              </span>
              <span
                className={`ml-2 font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}
              >
                {COURSE_DATA.courses.length}
              </span>
            </div>
            <div>
              <span
                className={`${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Материалов:
              </span>
              <span
                className={`ml-2 font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}
              >
                {materials.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};