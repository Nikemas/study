// src/components/Knowledge/KnowledgeView.jsx

import { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Book, ClipboardCheck, Trophy } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../contexts/LanguageContext';
import { CategoryFilter } from './CategoryFilter';
import { MaterialCard } from './MaterialCard';
import { MaterialDetailView } from './MaterialDetailView';
import { Quiz } from './Quiz';
import { getQuizByCategory } from '../../data/courseData';
import { getCategoryStats, getQuizResult } from '../../services/progressService';

export const KnowledgeView = ({ onCategoryChange, onProgressChange }) => {
  const { theme } = useTheme();
  const { t, courseData } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showQuiz, setShowQuiz] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const materials = useMemo(() => {
    if (!courseData?.materials) return [];

    let filteredMaterials = [];
    if (selectedCategory === 'all') {
      filteredMaterials = Object.values(courseData.materials).flat();
    } else {
      filteredMaterials = courseData.materials[selectedCategory] || [];
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      return filteredMaterials.filter(m =>
        m.title.toLowerCase().includes(query) ||
        m.description.toLowerCase().includes(query)
      );
    }

    return filteredMaterials;
  }, [courseData, selectedCategory, searchQuery]);

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
    <div className="flex h-full gap-6">
      {/* Sidebar - Desktop only */}
      <aside className={`hidden lg:flex flex-col w-64 ${isDark ? 'glass' : 'light-glass'
        } rounded-2xl p-4 gap-6`}>
        {/* Library Section */}
        <div className="flex flex-col gap-1">
          <div className={`px-3 py-2 text-xs font-bold ${isDark ? 'text-gray-500' : 'text-gray-600'
            } uppercase tracking-wider`}>
            {t('knowledge.library') || 'Library'}
          </div>
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryChange}
            courses={courseData.courses}
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden rounded-2xl relative">
        <div className="flex-1 overflow-y-auto pb-10">
          {/* Header with Search */}
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'
                } mb-2 font-display`}>
                {t('knowledge.title') || 'Knowledge Base'}
              </h2>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm max-w-xl`}>
                {t('knowledge.subtitle')}
              </p>
            </div>

            {/* Search */}
            <div className="relative group w-full md:w-80">
              <input
                type="text"
                placeholder={t('knowledge.searchPlaceholder') || "Search modules..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`block w-full px-4 py-2.5 border ${isDark
                  ? 'border-white/10 bg-white/5 text-gray-300 placeholder-gray-500'
                  : 'border-gray-300 bg-white text-gray-900 placeholder-gray-400'
                  } rounded-xl leading-5 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 sm:text-sm transition-all`}
              />
            </div>
          </div>

          {/* Mobile Category Filter */}
          <div className="lg:hidden mb-6">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategoryChange}
              courses={courseData.courses}
              direction="horizontal"
            />
          </div>

          {/* Category Progress & Quiz - Hide when searching */}
          {selectedCategory !== 'all' && !searchQuery && categoryStats && (
            <div className={`mb-8 p-6 rounded-2xl ${isDark ? 'glass-card' : 'light-glass-card'
              }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Trophy size={18} className={isDark ? 'text-yellow-400' : 'text-yellow-600'} />
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {t('progress.title')}
                  </span>
                </div>
                {currentQuiz && (
                  <button
                    onClick={() => setShowQuiz(true)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition ${quizResult?.completed
                      ? isDark
                        ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg'
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
                  <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                    {t('progress.materials')}
                  </span>
                  <span className={isDark ? 'text-white' : 'text-gray-900'}>
                    {categoryStats.materialsCompleted} / {categoryStats.materialsTotal}
                  </span>
                </div>
                <div className={`h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-gray-200'
                  }`}>
                  <div
                    className={`h-full transition-all duration-500 ${categoryStats.materialsProgress === 100
                      ? 'bg-green-500'
                      : 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]'
                      }`}
                    style={{ width: `${categoryStats.materialsProgress}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Materials Grid */}
          <div className="mb-4">
            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'
              } mb-4`}>
              {searchQuery
                ? `${t('knowledge.searchResults') || 'Search results for'} "${searchQuery}"`
                : (selectedCategory === 'all' ? t('knowledge.allModules') || 'All Modules' : courseData.courses.find(c => c.id === selectedCategory)?.name)
              }
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {materials.length === 0 ? (
              <div className={`col-span-full text-center py-12 ${isDark ? 'text-gray-500' : 'text-gray-400'
                }`}>
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${isDark ? 'bg-white/5' : 'bg-gray-100'
                  }`}>
                  <Book className="w-8 h-8 opacity-50" />
                </div>
                <p className="text-lg font-medium mb-1">
                  {searchQuery
                    ? t('knowledge.noSearchResults') || 'No modules found'
                    : t('knowledge.noMaterials')
                  }
                </p>
                {searchQuery && (
                  <p className="text-sm opacity-70">
                    {t('knowledge.tryDifferentSearch') || 'Try specific keywords like "React" or "Basics"'}
                  </p>
                )}
              </div>
            ) : (
              materials.map((material) => (
                <MaterialCard
                  key={`${material.id}-${progressKey}`}
                  material={material}
                  onOpen={() => setSelectedMaterial(material)}
                />
              ))
            )}
          </div>
        </div>
      </main>

      {/* Material Detail Modal */}
      {selectedMaterial && (
        <MaterialDetailView
          material={selectedMaterial}
          onClose={() => {
            setSelectedMaterial(null);
            handleProgressChange();
          }}
          onProgressChange={handleProgressChange}
        />
      )}

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
