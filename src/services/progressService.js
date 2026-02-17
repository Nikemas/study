import { getQuizByCategory } from '../data/courseData';
import { getPracticeTaskByStage } from '../data/practiceTasksData';
import {
  getLearningDataVersion,
  saveLearningDataVersion,
  getPracticeState,
  savePracticeState,
} from './storageService';

const STORAGE_KEY = 'learning_progress';
const LEARNING_VERSION = 2;
const QUIZ_PASS_SCORE = 70;

const getDefaultProgress = () => ({
  materials: {},
  quizzes: {},
});

const getDefaultPracticeState = () => ({
  version: LEARNING_VERSION,
  stages: {},
});

const ensureMigrated = () => {
  const version = getLearningDataVersion();
  if (version && version >= LEARNING_VERSION) return;

  const existingPractice = getPracticeState();
  if (!existingPractice) {
    savePracticeState(getDefaultPracticeState());
  } else if (!existingPractice.version) {
    savePracticeState({ ...existingPractice, version: LEARNING_VERSION });
  }

  saveLearningDataVersion(LEARNING_VERSION);
};

export const getProgress = () => {
  ensureMigrated();
  try {
    const progress = localStorage.getItem(STORAGE_KEY);
    return progress ? JSON.parse(progress) : getDefaultProgress();
  } catch (error) {
    console.error('Failed to read progress:', error);
    return getDefaultProgress();
  }
};

const saveProgress = (progress) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (error) {
    console.error('Failed to save progress:', error);
  }
};

const getSafePracticeState = () => getPracticeState() || getDefaultPracticeState();

const saveSafePracticeState = (state) => {
  savePracticeState({
    ...getDefaultPracticeState(),
    ...state,
    version: LEARNING_VERSION,
  });
};

// Materials
export const markMaterialComplete = (materialId) => {
  const progress = getProgress();
  progress.materials[materialId] = {
    completed: true,
    completedAt: Date.now(),
  };
  saveProgress(progress);
  return progress;
};

export const markMaterialIncomplete = (materialId) => {
  const progress = getProgress();
  if (progress.materials[materialId]) {
    progress.materials[materialId].completed = false;
  }
  saveProgress(progress);
  return progress;
};

export const isMaterialComplete = (materialId) => {
  const progress = getProgress();
  return progress.materials[materialId]?.completed || false;
};

export const getCompletedMaterials = () => {
  const progress = getProgress();
  return Object.entries(progress.materials)
    .filter(([, data]) => data.completed)
    .map(([id]) => Number(id));
};

// Quizzes
export const saveQuizResult = (quizId, score, totalQuestions) => {
  const progress = getProgress();
  progress.quizzes[quizId] = {
    completed: true,
    score: Math.round((score / totalQuestions) * 100),
    correctAnswers: score,
    totalQuestions,
    completedAt: Date.now(),
  };
  saveProgress(progress);
  return progress;
};

export const getQuizResult = (quizId) => {
  const progress = getProgress();
  return progress.quizzes[quizId] || null;
};

export const isQuizComplete = (quizId) => {
  const progress = getProgress();
  return progress.quizzes[quizId]?.completed || false;
};

export const getCompletedQuizzes = () => {
  const progress = getProgress();
  return Object.entries(progress.quizzes)
    .filter(([, data]) => data.completed)
    .map(([id, data]) => ({ id, ...data }));
};

// Practice
const getStageRecord = (state, stageId) => state.stages[stageId] || { tasks: {} };

export const getStagePracticeTask = (stageId) => getPracticeTaskByStage(stageId);

export const submitPracticeAttempt = (stageId, taskId, code, evaluationResult) => {
  const state = getSafePracticeState();
  const stageRecord = getStageRecord(state, stageId);
  const currentTask = stageRecord.tasks[taskId] || {
    attempts: [],
    bestScore: 0,
    passed: false,
    status: 'not_started',
  };

  const nextAttemptNumber = currentTask.attempts.length + 1;
  const attempt = {
    id: `${taskId}_${Date.now()}`,
    attemptNumber: nextAttemptNumber,
    code,
    score: evaluationResult?.finalScore || 0,
    feedback: evaluationResult?.feedback || null,
    submittedAt: Date.now(),
  };

  const bestScore = Math.max(currentTask.bestScore || 0, attempt.score);
  const maxAttempts = getPracticeTaskByStage(stageId)?.maxAttempts || 3;
  const passScore = getPracticeTaskByStage(stageId)?.passScore || 85;
  const passed = bestScore >= passScore;
  const status = passed
    ? 'passed'
    : nextAttemptNumber >= maxAttempts
      ? 'attempts_exhausted'
      : 'failed';

  const updatedTask = {
    ...currentTask,
    attempts: [...currentTask.attempts, attempt],
    bestScore,
    passed,
    status,
    updatedAt: Date.now(),
  };

  const updatedState = {
    ...state,
    stages: {
      ...state.stages,
      [stageId]: {
        ...stageRecord,
        tasks: {
          ...stageRecord.tasks,
          [taskId]: updatedTask,
        },
      },
    },
  };

  saveSafePracticeState(updatedState);
  return updatedTask;
};

export const getPracticeAttempts = (stageId, taskId) => {
  const state = getSafePracticeState();
  return state.stages[stageId]?.tasks?.[taskId]?.attempts || [];
};

export const getBestPracticeScore = (stageId, taskId) => {
  const state = getSafePracticeState();
  return state.stages[stageId]?.tasks?.[taskId]?.bestScore || 0;
};

export const getPracticeStatus = (stageId, taskId) => {
  const state = getSafePracticeState();
  return state.stages[stageId]?.tasks?.[taskId]?.status || 'not_started';
};

export const isPracticePassed = (stageId) => {
  const task = getPracticeTaskByStage(stageId);
  if (!task) return false;
  const state = getSafePracticeState();
  return Boolean(state.stages[stageId]?.tasks?.[task.id]?.passed);
};

export const canRetryPractice = (stageId, taskId) => {
  const task = getPracticeTaskByStage(stageId);
  const maxAttempts = task?.maxAttempts || 3;
  const attempts = getPracticeAttempts(stageId, taskId);
  const passed = getSafePracticeState().stages?.[stageId]?.tasks?.[taskId]?.passed;
  return !passed && attempts.length < maxAttempts;
};

export const evaluateStageCompletion = (stageId) => {
  const quiz = getQuizByCategory(stageId);
  const quizResult = quiz ? getQuizResult(quiz.id) : null;
  const quizPassed = Boolean(quizResult?.score >= QUIZ_PASS_SCORE);
  const practicePassed = isPracticePassed(stageId);
  return quizPassed && practicePassed;
};

// Stats
export const getCategoryStats = (categoryMaterials, categoryQuizId, stageId = null) => {
  const completedMaterials = getCompletedMaterials();
  const materialIds = categoryMaterials.map((m) => m.id);

  const completedCount = materialIds.filter((id) => completedMaterials.includes(id)).length;
  const totalMaterials = materialIds.length;
  const quizResult = categoryQuizId ? getQuizResult(categoryQuizId) : null;
  const effectiveStageId = stageId || null;
  const practiceTask = effectiveStageId ? getPracticeTaskByStage(effectiveStageId) : null;
  const practiceScore = practiceTask ? getBestPracticeScore(effectiveStageId, practiceTask.id) : 0;
  const practicePassed = practiceTask ? isPracticePassed(effectiveStageId) : false;

  return {
    materialsCompleted: completedCount,
    materialsTotal: totalMaterials,
    materialsProgress: totalMaterials > 0 ? Math.round((completedCount / totalMaterials) * 100) : 0,
    quizCompleted: quizResult?.completed || false,
    quizScore: quizResult?.score || 0,
    practiceScore,
    practicePassed,
    stageCompleted: effectiveStageId ? evaluateStageCompletion(effectiveStageId) : false,
  };
};

export const getOverallStats = (allMaterials, allQuizIds) => {
  const completedMaterials = getCompletedMaterials();
  const completedQuizzes = getCompletedQuizzes();

  const totalMaterials = allMaterials.length;
  const completedMaterialsCount = allMaterials.filter((m) => completedMaterials.includes(m.id)).length;

  const totalQuizzes = allQuizIds.length;
  const completedQuizzesCount = completedQuizzes.filter((q) => allQuizIds.includes(q.id)).length;

  const materialProgress = totalMaterials > 0 ? completedMaterialsCount / totalMaterials : 0;
  const quizProgress = totalQuizzes > 0 ? completedQuizzesCount / totalQuizzes : 0;
  const overallProgress = Math.round((materialProgress * 0.7 + quizProgress * 0.3) * 100);

  return {
    materialsCompleted: completedMaterialsCount,
    materialsTotal: totalMaterials,
    quizzesCompleted: completedQuizzesCount,
    quizzesTotal: totalQuizzes,
    overallProgress,
  };
};

export const resetProgress = () => {
  localStorage.removeItem(STORAGE_KEY);
  saveSafePracticeState(getDefaultPracticeState());
};

export const resetCategoryProgress = (categoryMaterials, categoryQuizId, stageId = null) => {
  const progress = getProgress();
  categoryMaterials.forEach((m) => {
    delete progress.materials[m.id];
  });

  if (categoryQuizId) {
    delete progress.quizzes[categoryQuizId];
  }

  saveProgress(progress);

  if (stageId) {
    const practice = getSafePracticeState();
    const nextStages = { ...practice.stages };
    delete nextStages[stageId];
    saveSafePracticeState({ ...practice, stages: nextStages });
  }

  return progress;
};

