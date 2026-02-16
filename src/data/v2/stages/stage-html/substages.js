// Импорт материалов
import htmlBasics from './materials/01-basics';
import htmlStructure from './materials/02-structure';
import htmlTextElements from './materials/03-text-elements';
import htmlLists from './materials/04-lists';
import htmlLinksImages from './materials/05-links-images';
import htmlSemanticTags from './materials/06-semantic-tags';
import htmlForms from './materials/07-forms';
import htmlTables from './materials/08-tables';

// Импорт практических заданий
import practiceFirstPage from './practice/task-html-1';
import practiceResume from './practice/task-html-2';
import practiceLanding from './practice/task-html-3';
import practiceRegistrationForm from './practice/task-html-4';
import practiceFinalProject from './practice/task-html-5';

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
  },
  {
    id: 'html-text-elements',
    order: 4,
    title: 'Текстовые элементы',
    type: 'theory',
    estimatedMinutes: 40,
    materials: [htmlTextElements],
    completionCriteria: {
      readMaterial: true,
      passQuiz: false,
      completePractice: false
    }
  },
  {
    id: 'html-lists',
    order: 5,
    title: 'Списки в HTML',
    type: 'theory',
    estimatedMinutes: 35,
    materials: [htmlLists],
    completionCriteria: {
      readMaterial: true,
      passQuiz: false,
      completePractice: false
    }
  },
  {
    id: 'html-practice-2',
    order: 6,
    title: 'Практика: HTML резюме',
    type: 'practice',
    estimatedMinutes: 45,
    practice: practiceResume,
    completionCriteria: {
      readMaterial: false,
      passQuiz: false,
      completePractice: true
    }
  },
  {
    id: 'html-links-images',
    order: 7,
    title: 'Ссылки и изображения',
    type: 'theory',
    estimatedMinutes: 40,
    materials: [htmlLinksImages],
    completionCriteria: {
      readMaterial: true,
      passQuiz: false,
      completePractice: false
    }
  },
  {
    id: 'html-semantic-tags',
    order: 8,
    title: 'Семантические теги HTML5',
    type: 'theory',
    estimatedMinutes: 50,
    materials: [htmlSemanticTags],
    completionCriteria: {
      readMaterial: true,
      passQuiz: false,
      completePractice: false
    }
  },
  {
    id: 'html-practice-3',
    order: 9,
    title: 'Практика: Семантический лендинг',
    type: 'practice',
    estimatedMinutes: 60,
    practice: practiceLanding,
    completionCriteria: {
      readMaterial: false,
      passQuiz: false,
      completePractice: true
    }
  },
  {
    id: 'html-forms',
    order: 10,
    title: 'Формы в HTML',
    type: 'theory',
    estimatedMinutes: 55,
    materials: [htmlForms],
    completionCriteria: {
      readMaterial: true,
      passQuiz: false,
      completePractice: false
    }
  },
  {
    id: 'html-practice-4',
    order: 11,
    title: 'Практика: Форма регистрации с валидацией',
    type: 'practice',
    estimatedMinutes: 60,
    practice: practiceRegistrationForm,
    completionCriteria: {
      readMaterial: false,
      passQuiz: false,
      completePractice: true
    }
  },
  {
    id: 'html-tables',
    order: 12,
    title: 'Таблицы в HTML',
    type: 'theory',
    estimatedMinutes: 45,
    materials: [htmlTables],
    completionCriteria: {
      readMaterial: true,
      passQuiz: false,
      completePractice: false
    }
  },
  {
    id: 'html-final-project',
    order: 13,
    title: 'Финальный проект: Сайт-визитка',
    type: 'practice',
    estimatedMinutes: 90,
    practice: practiceFinalProject,
    completionCriteria: {
      readMaterial: false,
      passQuiz: false,
      completePractice: true
    }
  }
];
