// Импорт материалов
import htmlBasics from './materials/01-basics';
import htmlStructure from './materials/02-structure';

// Импорт практических заданий
import practiceFirstPage from './practice/task-html-1';

export default [
  {
    id: 'html-basics',
    order: 1,
    title: 'Что такое HTML?',
    type: 'theory',
    estimatedMinutes: 30,
    materials: [htmlBasics],
    completionCriteria: {
      readMaterial: true,
      passQuiz: false,
      completePractice: false
    }
  },
  {
    id: 'html-structure',
    order: 2,
    title: 'Базовая структура документа',
    type: 'theory',
    estimatedMinutes: 45,
    materials: [htmlStructure],
    completionCriteria: {
      readMaterial: true,
      passQuiz: false,
      completePractice: false
    }
  },
  {
    id: 'html-practice-1',
    order: 3,
    title: 'Практика: Создайте первую страницу',
    type: 'practice',
    estimatedMinutes: 30,
    practice: practiceFirstPage,
    completionCriteria: {
      readMaterial: false,
      passQuiz: false,
      completePractice: true
    }
  }
];
