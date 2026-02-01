// src/components/Knowledge/KnowledgeView.jsx

import { useState } from 'react';
import { Book } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { themeClasses } from '../../utils/themeUtils';
import { COURSE_DATA, getMaterialsByCategory } from '../../data/courseData';
import { CategoryFilter } from './CategoryFilter';
import { MaterialCard } from './MaterialCard';

export const KnowledgeView = () => {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const materials = getMaterialsByCategory(selectedCategory);

  return (
    <div className="max-w-5xl mx-auto h-full overflow-y-auto p-4">
      <section className={`${themeClasses.bg(theme)} rounded-lg shadow-sm p-6`}>
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Book
              className={`w-6 h-6 ${
                theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'
              }`}
              aria-hidden="true"
            />
            <h2 className={`text-2xl font-bold ${themeClasses.text(theme)}`}>
              {COURSE_DATA.title}
            </h2>
          </div>
          <p className={themeClasses.textSecondary(theme)}>
            Изучайте веб-разработку от основ до продвинутых тем
          </p>
        </div>

        {/* Category Filter */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Materials */}
        <div className="space-y-4" role="list" aria-label="Учебные материалы">
          {materials.length === 0 ? (
            <div className={`text-center py-12 ${themeClasses.textSecondary(theme)}`}>
              <Book className="w-16 h-16 mx-auto mb-4 opacity-30" aria-hidden="true" />
              <p>Материалы не найдены</p>
            </div>
          ) : (
            materials.map((material) => (
              <MaterialCard key={material.id} material={material} />
            ))
          )}
        </div>

        {/* Stats */}
        <div className={`mt-6 pt-6 border-t ${themeClasses.border(theme)}`}>
          <div className="flex gap-6 text-sm">
            <div>
              <span className={themeClasses.textSecondary(theme)}>Всего курсов:</span>
              <span className={`ml-2 font-semibold ${themeClasses.text(theme)}`}>
                {COURSE_DATA.courses.length}
              </span>
            </div>
            <div>
              <span className={themeClasses.textSecondary(theme)}>Материалов:</span>
              <span className={`ml-2 font-semibold ${themeClasses.text(theme)}`}>
                {materials.length}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
