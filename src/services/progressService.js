// src/services/progressService.js
// Сервис для отслеживания прогресса обучения

const STORAGE_KEY = 'learning_progress';

// Структура прогресса:
// {
//   materials: { [materialId]: { completed: boolean, completedAt: timestamp } },
//   quizzes: { [quizId]: { completed: boolean, score: number, completedAt: timestamp } }
// }

const getDefaultProgress = () => ({
  materials: {},
  quizzes: {}
});

// Получить весь прогресс
export const getProgress = () => {
  try {
    const progress = localStorage.getItem(STORAGE_KEY);
    return progress ? JSON.parse(progress) : getDefaultProgress();
  } catch (error) {
    console.error('Ошибка при чтении прогресса:', error);
    return getDefaultProgress();
  }
};

// Сохранить прогресс
const saveProgress = (progress) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Ошибка при сохранении прогресса:', error);
  }
};

// === Материалы ===

// Отметить материал как прочитанный
export const markMaterialComplete = (materialId) => {
  const progress = getProgress();
  progress.materials[materialId] = {
    completed: true,
    completedAt: Date.now()
  };
  saveProgress(progress);
  return progress;
};

// Отметить материал как непрочитанный
export const markMaterialIncomplete = (materialId) => {
  const progress = getProgress();
  if (progress.materials[materialId]) {
    progress.materials[materialId].completed = false;
  }
  saveProgress(progress);
  return progress;
};

// Проверить, прочитан ли материал
export const isMaterialComplete = (materialId) => {
  const progress = getProgress();
  return progress.materials[materialId]?.completed || false;
};

// Получить все завершённые материалы
export const getCompletedMaterials = () => {
  const progress = getProgress();
  return Object.entries(progress.materials)
    .filter(([_, data]) => data.completed)
    .map(([id]) => parseInt(id));
};

// === Квизы ===

// Сохранить результат квиза
export const saveQuizResult = (quizId, score, totalQuestions) => {
  const progress = getProgress();
  progress.quizzes[quizId] = {
    completed: true,
    score: Math.round((score / totalQuestions) * 100),
    correctAnswers: score,
    totalQuestions,
    completedAt: Date.now()
  };
  saveProgress(progress);
  return progress;
};

// Получить результат квиза
export const getQuizResult = (quizId) => {
  const progress = getProgress();
  return progress.quizzes[quizId] || null;
};

// Проверить, пройден ли квиз
export const isQuizComplete = (quizId) => {
  const progress = getProgress();
  return progress.quizzes[quizId]?.completed || false;
};

// Получить все пройденные квизы
export const getCompletedQuizzes = () => {
  const progress = getProgress();
  return Object.entries(progress.quizzes)
    .filter(([_, data]) => data.completed)
    .map(([id, data]) => ({ id, ...data }));
};

// === Статистика ===

// Получить статистику по категории
export const getCategoryStats = (categoryMaterials, categoryQuizId) => {
  const completedMaterials = getCompletedMaterials();
  const materialIds = categoryMaterials.map(m => m.id);

  const completedCount = materialIds.filter(id => completedMaterials.includes(id)).length;
  const totalMaterials = materialIds.length;

  const quizResult = categoryQuizId ? getQuizResult(categoryQuizId) : null;

  return {
    materialsCompleted: completedCount,
    materialsTotal: totalMaterials,
    materialsProgress: totalMaterials > 0 ? Math.round((completedCount / totalMaterials) * 100) : 0,
    quizCompleted: quizResult?.completed || false,
    quizScore: quizResult?.score || 0
  };
};

// Получить общую статистику
export const getOverallStats = (allMaterials, allQuizIds) => {
  const completedMaterials = getCompletedMaterials();
  const completedQuizzes = getCompletedQuizzes();

  const totalMaterials = allMaterials.length;
  const completedMaterialsCount = allMaterials.filter(m => completedMaterials.includes(m.id)).length;

  const totalQuizzes = allQuizIds.length;
  const completedQuizzesCount = completedQuizzes.filter(q => allQuizIds.includes(q.id)).length;

  // Общий прогресс: 70% материалы + 30% квизы
  const materialProgress = totalMaterials > 0 ? (completedMaterialsCount / totalMaterials) : 0;
  const quizProgress = totalQuizzes > 0 ? (completedQuizzesCount / totalQuizzes) : 0;
  const overallProgress = Math.round((materialProgress * 0.7 + quizProgress * 0.3) * 100);

  return {
    materialsCompleted: completedMaterialsCount,
    materialsTotal: totalMaterials,
    quizzesCompleted: completedQuizzesCount,
    quizzesTotal: totalQuizzes,
    overallProgress
  };
};

// Сбросить весь прогресс
export const resetProgress = () => {
  localStorage.removeItem(STORAGE_KEY);
};

// Сбросить прогресс категории
export const resetCategoryProgress = (categoryMaterials, categoryQuizId) => {
  const progress = getProgress();

  // Удаляем прогресс материалов категории
  categoryMaterials.forEach(m => {
    delete progress.materials[m.id];
  });

  // Удаляем прогресс квиза категории
  if (categoryQuizId) {
    delete progress.quizzes[categoryQuizId];
  }

  saveProgress(progress);
  return progress;
};
