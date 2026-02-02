// src/components/Knowledge/KnowledgeView.jsx

import { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Book, ClipboardCheck, Trophy } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../contexts/LanguageContext';
import { themeClasses } from '../../utils/themeUtils';
import { CategoryFilter } from './CategoryFilter';
import { MaterialCard } from './MaterialCard';
import { Quiz } from './Quiz';
import { getQuizByCategory } from '../../data/courseData';
import { getCategoryStats, getQuizResult } from '../../services/progressService';

export const KnowledgeView = ({ onCategoryChange, onProgressChange }) => {
  const { theme } = useTheme();
  const { t, courseData } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showQuiz, setShowQuiz] = useState(false);
  const [progressKey, setProgressKey] = useState(0);

  const materials = useMemo(() => {
    if (!courseData?.materials) return [];
    if (selectedCategory === 'all') {
      return Object.values(courseData.materials).flat();
    }
    return courseData.materials[selectedCategory] || [];
  }, [courseData, selectedCategory]);

  const currentQuiz = useMemo(() => {
    if (selectedCategory === 'all') return null;
    return getQuizByCategory(selectedCategory);
  }, [selectedCategory]);

  const categoryStats = useMemo(() => {
    if (selectedCategory === 'all' || !courseData?.materials) return null;
    const categoryMaterials = courseData.materials[selectedCategory] || [];
    const quizId = currentQuiz?.id;
    return getCategoryStats(categoryMaterials, quizId);
  }, [selectedCategory, courseData, currentQuiz, progressKey]);

  const quizResult = useMemo(() => {
    if (!currentQuiz) return null;
    return getQuizResult(currentQuiz.id);
  }, [currentQuiz, progressKey]);

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
    if (onCategoryChange) {
      onCategoryChange(category);
    }
  }, [onCategoryChange]);

  const handleProgressChange = useCallback(() => {
    setProgressKey(prev => prev + 1);
    if (onProgressChange) {
      onProgressChange();
    }
  }, [onProgressChange]);

  const handleQuizComplete = useCallback(() => {
    setProgressKey(prev => prev + 1);
    if (onProgressChange) {
      onProgressChange();
    }
  }, [onProgressChange]);

  const isDark = theme === 'dark';

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
          onSelectCategory={handleCategoryChange}
          courses={courseData.courses}
        />

        {/* Category Progress & Quiz Button */}
        {selectedCategory !== 'all' && categoryStats && (
          <div className={`mb-6 p-4 rounded-lg ${isDark ? 'bg-gray-700/50' : 'bg-gray-50'}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Trophy size={18} className={isDark ? 'text-yellow-400' : 'text-yellow-600'} />
                <span className={`font-medium ${themeClasses.text(theme)}`}>
                  {t('progress.title')}
                </span>
              </div>
              {currentQuiz && (
                <button
                  onClick={() => setShowQuiz(true)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                    quizResult?.completed
                      ? isDark
                        ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  <ClipboardCheck size={18} />
                  {quizResult?.completed
                    ? `${t('quiz.title')}: ${quizResult.score}%`
                    : t('quiz.takeQuiz')}
                </button>
              )}
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className={themeClasses.textSecondary(theme)}>
                  {t('progress.materials')}
                </span>
                <span className={themeClasses.text(theme)}>
                  {categoryStats.materialsCompleted} / {categoryStats.materialsTotal}
                </span>
              </div>
              <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-gray-600' : 'bg-gray-200'}`}>
                <div
                  className="h-full bg-indigo-600 transition-all duration-300"
                  style={{ width: `${categoryStats.materialsProgress}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Materials */}
        <div className="space-y-4" role="list" aria-label={t('knowledge.materialsLabel')}>
          {materials.length === 0 ? (
            <div className={`text-center py-12 ${themeClasses.textSecondary(theme)}`}>
              <Book className="w-16 h-16 mx-auto mb-4 opacity-30" aria-hidden="true" />
              <p>{t('knowledge.noMaterials')}</p>
            </div>
          ) : (
            materials.map((material) => (
              <MaterialCard
                key={material.id}
                material={material}
                onProgressChange={handleProgressChange}
              />
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

      {/* Quiz Modal */}
      {showQuiz && currentQuiz && (
        <Quiz
          quiz={currentQuiz}
          onClose={() => setShowQuiz(false)}
          onComplete={handleQuizComplete}
        />
      )}
    </div>
  );
};

KnowledgeView.propTypes = {
  onCategoryChange: PropTypes.func,
  onProgressChange: PropTypes.func
};
