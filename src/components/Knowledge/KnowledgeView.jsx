// src/components/Knowledge/KnowledgeView.jsx

import { useState, useMemo } from 'react';
import { Book } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../contexts/LanguageContext';
import { themeClasses } from '../../utils/themeUtils';
import { CategoryFilter } from './CategoryFilter';
import { MaterialCard } from './MaterialCard';

export const KnowledgeView = () => {
  const { theme } = useTheme();
  const { t, courseData } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const materials = useMemo(() => {
    if (!courseData?.materials) return [];
    if (selectedCategory === 'all') {
      return Object.values(courseData.materials).flat();
    }
    return courseData.materials[selectedCategory] || [];
  }, [courseData, selectedCategory]);

  if (!courseData) return null;

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
              {courseData.title}
            </h2>
          </div>
          <p className={themeClasses.textSecondary(theme)}>
            {t('knowledge.subtitle')}
          </p>
        </div>

        {/* Category Filter */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          courses={courseData.courses}
        />

        {/* Materials */}
        <div className="space-y-4" role="list" aria-label={t('knowledge.materialsLabel')}>
          {materials.length === 0 ? (
            <div className={`text-center py-12 ${themeClasses.textSecondary(theme)}`}>
              <Book className="w-16 h-16 mx-auto mb-4 opacity-30" aria-hidden="true" />
              <p>{t('knowledge.noMaterials')}</p>
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
              <span className={themeClasses.textSecondary(theme)}>{t('knowledge.totalCourses')}:</span>
              <span className={`ml-2 font-semibold ${themeClasses.text(theme)}`}>
                {courseData.courses.length}
              </span>
            </div>
            <div>
              <span className={themeClasses.textSecondary(theme)}>{t('knowledge.totalMaterials')}:</span>
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
