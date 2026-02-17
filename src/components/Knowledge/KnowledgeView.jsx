import { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Book, ClipboardCheck, Trophy, Code2 } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../contexts/LanguageContext';
import { useGamification } from '../../contexts/GamificationContext';
import { CategoryFilter } from './CategoryFilter';
import { MaterialCard } from './MaterialCard';
import { MaterialDetailView } from './MaterialDetailView';
import { Quiz } from './Quiz';
import { PracticeTaskModal } from './PracticeTaskModal';
import { getQuizByCategory } from '../../data/courseData';
import { getPracticeTaskByStage } from '../../data/practiceTasksData';
import {
  getCategoryStats,
  getQuizResult,
  getPracticeAttempts,
  getBestPracticeScore,
  getPracticeStatus,
  evaluateStageCompletion,
} from '../../services/progressService';
import { SectionHeader } from '../UI/SectionHeader';
import { SearchInput } from '../UI/SearchInput';
import { Card } from '../UI/Card';

const PRACTICE_STATUS_LABELS = {
  not_started: 'Not started',
  in_progress: 'In progress',
  failed: 'Failed',
  passed: 'Passed',
  attempts_exhausted: 'Attempts exhausted',
};

export const KnowledgeView = ({ onCategoryChange, onProgressChange }) => {
  const { theme } = useTheme();
  const { t, courseData, language } = useLanguage();
  const { addXP } = useGamification();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showQuiz, setShowQuiz] = useState(false);
  const [showPractice, setShowPractice] = useState(false);
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
      return filteredMaterials.filter(
        (m) => m.topic.toLowerCase().includes(query) || m.content.toLowerCase().includes(query)
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
    return getCategoryStats(categoryMaterials, quizId, selectedCategory);
  }, [selectedCategory, courseData, currentQuiz, progressKey]);

  const quizResult = useMemo(() => {
    if (!currentQuiz) return null;
    return getQuizResult(currentQuiz.id);
  }, [currentQuiz, progressKey]);

  const practiceTask = useMemo(() => {
    if (selectedCategory === 'all') return null;
    return getPracticeTaskByStage(selectedCategory);
  }, [selectedCategory]);

  const practiceMeta = useMemo(() => {
    if (!practiceTask || selectedCategory === 'all') return null;
    const attempts = getPracticeAttempts(selectedCategory, practiceTask.id);
    return {
      attempts,
      bestScore: getBestPracticeScore(selectedCategory, practiceTask.id),
      status: getPracticeStatus(selectedCategory, practiceTask.id),
      stageCompleted: evaluateStageCompletion(selectedCategory),
    };
  }, [practiceTask, selectedCategory, progressKey]);

  const quizPassed = Boolean(quizResult?.score >= 70);

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
    if (onCategoryChange) onCategoryChange(category);
  }, [onCategoryChange]);

  const handleProgressChange = useCallback(() => {
    setProgressKey((prev) => prev + 1);
    if (onProgressChange) onProgressChange();
  }, [onProgressChange]);

  const handleQuizComplete = useCallback(() => {
    addXP('TEST');
    setProgressKey((prev) => prev + 1);
    if (onProgressChange) onProgressChange();
  }, [addXP, onProgressChange]);

  const handlePracticeSubmitted = useCallback((result) => {
    if (result?.passed && evaluateStageCompletion(selectedCategory)) {
      addXP('STAGE_COMPLETE');
    }
    setProgressKey((prev) => prev + 1);
    if (onProgressChange) onProgressChange();
  }, [addXP, onProgressChange, selectedCategory]);

  const isDark = theme === 'dark';
  if (!courseData) return null;

  return (
    <div className="flex h-full gap-6">
      <aside className={`hidden lg:flex flex-col w-64 ${isDark ? 'glass' : 'light-glass'} rounded-2xl p-4 gap-6`}>
        <div className="flex flex-col gap-1">
          <div className="px-3 py-2 text-xs font-bold text-muted uppercase tracking-wider">
            {t('knowledge.library') || 'Library'}
          </div>
          <CategoryFilter selectedCategory={selectedCategory} onSelectCategory={handleCategoryChange} courses={courseData.courses} />
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-full overflow-hidden rounded-2xl relative">
        <div className="flex-1 overflow-y-auto pb-10">
          <SectionHeader
            title={t('knowledge.title') || 'Knowledge Base'}
            subtitle={t('knowledge.subtitle')}
            action={(
              <div className="w-full md:w-80">
                <SearchInput
                  placeholder={t('knowledge.searchPlaceholder') || 'Search modules...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            )}
          />

          <div className="lg:hidden mb-6">
            <CategoryFilter selectedCategory={selectedCategory} onSelectCategory={handleCategoryChange} courses={courseData.courses} direction="horizontal" />
          </div>

          {selectedCategory !== 'all' && !searchQuery && categoryStats && (
            <Card className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Trophy size={18} className="text-warning" />
                  <span className="font-medium text-text">{t('progress.title')}</span>
                </div>
                {currentQuiz && (
                  <button
                    onClick={() => setShowQuiz(true)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition ${
                      quizResult?.completed ? 'bg-success/20 text-success hover:bg-success/30' : 'bg-primary text-white hover:brightness-110 shadow-soft'
                    }`}
                  >
                    <ClipboardCheck size={18} />
                    {quizResult?.completed ? `${t('quiz.title')}: ${quizResult.score}%` : t('quiz.takeQuiz')}
                  </button>
                )}
              </div>

              {practiceTask && practiceMeta && (
                <div
                  data-testid="practice-challenge-card"
                  className="mb-4 p-4 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                    <div className={`rounded-lg border px-3 py-2 ${quizPassed ? 'border-success/30 bg-success/10' : 'border-border bg-bg/40'}`}>
                      <p className="text-[11px] uppercase tracking-wide text-muted">Quiz gate</p>
                      <p className={`text-sm font-semibold ${quizPassed ? 'text-success' : 'text-text'}`}>
                        {quizResult?.score ?? 0}% / 70%
                      </p>
                    </div>
                    <div className={`rounded-lg border px-3 py-2 ${practiceMeta.bestScore >= practiceTask.passScore ? 'border-success/30 bg-success/10' : 'border-border bg-bg/40'}`}>
                      <p className="text-[11px] uppercase tracking-wide text-muted">Practice gate</p>
                      <p className={`text-sm font-semibold ${practiceMeta.bestScore >= practiceTask.passScore ? 'text-success' : 'text-text'}`}>
                        {practiceMeta.bestScore}/100
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <Code2 size={18} className="text-primary" />
                      <div>
                        <p className="font-semibold text-text tracking-tight">Practice Challenge</p>
                        <p data-testid="practice-status" className="text-xs text-muted">
                          Status: {PRACTICE_STATUS_LABELS[practiceMeta.status] || practiceMeta.status}
                        </p>
                      </div>
                    </div>
                    <button
                      data-testid="open-practice-challenge"
                      onClick={() => setShowPractice(true)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium ${
                        practiceMeta.status === 'passed'
                          ? 'bg-success/20 text-success border border-success/30'
                          : practiceMeta.status === 'attempts_exhausted'
                            ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                            : 'bg-primary text-white hover:brightness-110 shadow-soft'
                      }`}
                    >
                      {practiceMeta.status === 'passed'
                        ? 'Review Submission'
                        : practiceMeta.status === 'attempts_exhausted'
                          ? 'Request AI Help'
                          : 'Open Challenge'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs mb-2">
                    <div className="rounded-lg border border-border bg-bg/40 px-3 py-2">
                      <span className="text-muted">Best score</span>
                      <p className="text-text font-semibold mt-0.5">{practiceMeta.bestScore}/100</p>
                    </div>
                    <div className="rounded-lg border border-border bg-bg/40 px-3 py-2">
                      <span className="text-muted">Attempts</span>
                      <p className="text-text font-semibold mt-0.5">
                        {practiceMeta.attempts.length}/{practiceTask.maxAttempts}
                      </p>
                    </div>
                  </div>

                  <div className="h-1.5 rounded-full bg-border/40 overflow-hidden">
                    <div
                      className={`h-full ${practiceMeta.bestScore >= practiceTask.passScore ? 'bg-success' : 'bg-accent'}`}
                      style={{ width: `${Math.min(100, practiceMeta.bestScore)}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">{t('progress.materials')}</span>
                  <span className="text-text">{categoryStats.materialsCompleted} / {categoryStats.materialsTotal}</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden bg-border/40">
                  <div
                    className={`h-full transition-all duration-500 ${
                      categoryStats.materialsProgress === 100 ? 'bg-success' : 'bg-primary shadow-[0_0_10px_rgba(255,122,0,0.35)]'
                    }`}
                    style={{ width: `${categoryStats.materialsProgress}%` }}
                  />
                </div>
              </div>
              {practiceTask && (
                <p className="text-xs text-muted mt-3">
                  Stage unlock rule: quiz &gt;= 70% and practice &gt;= {practiceTask.passScore}/100.
                  Current stage: {categoryStats.stageCompleted ? 'completed' : 'in progress'}.
                </p>
              )}
            </Card>
          )}

          <div className="mb-4">
            <h3 className="text-lg font-semibold text-text mb-4">
              {searchQuery
                ? `${t('knowledge.searchResults') || 'Search results for'} "${searchQuery}"`
                : (selectedCategory === 'all' ? t('knowledge.allCourses') || 'All Courses' : courseData.courses.find((c) => c.id === selectedCategory)?.name)}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {materials.length === 0 ? (
              <div className="col-span-full text-center py-12 text-muted">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-border/20">
                  <Book className="w-8 h-8 opacity-50" />
                </div>
                <p className="text-lg font-medium mb-1">
                  {searchQuery ? t('knowledge.noSearchResults') || 'No modules found' : t('knowledge.noMaterials')}
                </p>
                {searchQuery && (
                  <p className="text-sm opacity-70">{t('knowledge.tryDifferentSearch') || 'Try specific keywords like "React" or "Basics"'}</p>
                )}
              </div>
            ) : (
              materials.map((material) => (
                <MaterialCard key={`${material.id}-${progressKey}`} material={material} onOpen={() => setSelectedMaterial(material)} />
              ))
            )}
          </div>
        </div>
      </main>

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

      {showQuiz && currentQuiz && (
        <Quiz quiz={currentQuiz} onClose={() => setShowQuiz(false)} onComplete={handleQuizComplete} />
      )}

      {showPractice && practiceTask && selectedCategory !== 'all' && (
        <PracticeTaskModal
          task={practiceTask}
          stageId={selectedCategory}
          attempts={practiceMeta?.attempts || []}
          language={language}
          onClose={() => setShowPractice(false)}
          onSubmitted={handlePracticeSubmitted}
        />
      )}
    </div>
  );
};

KnowledgeView.propTypes = {
  onCategoryChange: PropTypes.func,
  onProgressChange: PropTypes.func,
};
