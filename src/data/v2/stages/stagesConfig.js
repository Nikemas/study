// Импорты этапов
import htmlStage from './stage-html';
import cssStage from './stage-css';
import javascriptStage from './stage-javascript';
import advancedStage from './stage-advanced';
import projectsStage from './stage-projects';

// Все этапы обучения
export const LEARNING_STAGES = [
  htmlStage,
  cssStage,
  javascriptStage,
  advancedStage,
  projectsStage
];

// Хелперы
export const getStageById = (stageId) => {
  return LEARNING_STAGES.find(stage => stage.id === stageId);
};

export const getSubstageById = (stageId, substageId) => {
  const stage = getStageById(stageId);
  if (!stage) return null;
  return stage.substages.find(sub => sub.id === substageId);
};

export const getNextStage = (currentStageId) => {
  const currentIndex = LEARNING_STAGES.findIndex(s => s.id === currentStageId);
  if (currentIndex === -1 || currentIndex === LEARNING_STAGES.length - 1) {
    return null;
  }
  return LEARNING_STAGES[currentIndex + 1];
};

export const getPreviousStage = (currentStageId) => {
  const currentIndex = LEARNING_STAGES.findIndex(s => s.id === currentStageId);
  if (currentIndex <= 0) return null;
  return LEARNING_STAGES[currentIndex - 1];
};
