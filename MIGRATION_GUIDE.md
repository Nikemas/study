# 🔄 ГАЙД ПО МИГРАЦИИ V1 → V2

## 📋 СОДЕРЖАНИЕ
1. [Обзор миграции](#обзор-миграции)
2. [Подготовка к миграции](#подготовка-к-миграции)
3. [Пошаговая миграция](#пошаговая-миграция)
4. [Примеры кода](#примеры-кода)
5. [Тестирование](#тестирование)
6. [Откат (Rollback)](#откат)

---

## 🎯 ОБЗОР МИГРАЦИИ

### Что меняется?

| Компонент | V1 | V2 | Изменение |
|-----------|----|----|-----------|
| Структура данных | `courseData.js` (плоская) | `stages/` (иерархическая) | Полная реструктуризация |
| Навигация | Свободная по курсам | Последовательная по этапам | Новая логика |
| Прогресс | По материалам | По этапам/подэтапам | Новая схема |
| Практика | Отдельные задачи | Интегрированные в подэтапы | Связка с материалами |
| UI | KnowledgeView | LearningView + StageContent | Новые компоненты |

### Что сохраняется?

- ✅ Chat компоненты (без изменений)
- ✅ Header (минимальные изменения)
- ✅ Gamification система (адаптация)
- ✅ История чатов
- ✅ AI сервисы

### Временная шкала

```
Week 1: Подготовка + создание структуры v2
Week 2: Создание компонентов Learning
Week 3: Миграция данных + тестирование
Week 4: UI полировка + запуск
```

---

## 🛠️ ПОДГОТОВКА К МИГРАЦИИ

### Шаг 1: Создание бэкапа

```bash
# Создать ветку для V2
git checkout -b feature/v2-migration

# Создать бэкап текущих данных
cp -r src/data src/data-backup-v1
```

### Шаг 2: Создание структуры папок V2

```bash
# Создать структуру
mkdir -p src/data/v1
mkdir -p src/data/v2/stages
mkdir -p src/data/v2/achievements
mkdir -p src/data/v2/design
mkdir -p migrations
```

### Шаг 3: Перемещение старых данных

```bash
# Переместить старые данные в v1
mv src/data/courseData.js src/data/v1/
mv src/data/achievements.js src/data/v1/
mv src/data/practiceTasksData.js src/data/v1/
```

---

## 📝 ПОШАГОВАЯ МИГРАЦИЯ

### ЭТАП 1: Создание конфигурации этапов

**Файл**: `src/data/v2/stages/stagesConfig.js`

```javascript
// Импорты этапов (будут созданы позже)
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
```

### ЭТАП 2: Создание первого этапа (HTML)

**Файл**: `src/data/v2/stages/stage-html/index.js`

```javascript
import metadata from './metadata';
import substages from './substages';

const htmlStage = {
  ...metadata,
  substages
};

export default htmlStage;
```

**Файл**: `src/data/v2/stages/stage-html/metadata.js`

```javascript
export default {
  id: 'html',
  order: 1,
  title: 'HTML - Основы веб-страниц',
  description: 'Научитесь создавать структуру веб-страниц с помощью HTML',
  icon: '📄',
  color: 'bg-orange-500',
  estimatedHours: 12,
  prerequisites: [],
  unlockCriteria: {
    previousStageCompletion: 0, // Первый этап всегда открыт
    minimumScore: 0
  }
};
```

**Файл**: `src/data/v2/stages/stage-html/substages.js`

```javascript
// Импорт материалов
import htmlBasics from './materials/01-basics';
import htmlStructure from './materials/02-structure';
import htmlTextElements from './materials/03-text-elements';
// ... остальные импорты

// Импорт практических заданий
import practiceFirstPage from './practice/task-html-1';
import practiceResume from './practice/task-html-2';
// ... остальные импорты

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
  // ... остальные подэтапы
];
```

**Файл**: `src/data/v2/stages/stage-html/materials/01-basics.js`

```javascript
export default {
  id: 'html-basics-intro',
  topic: 'Что такое HTML?',
  content: `HTML (HyperText Markup Language) - это язык разметки для создания веб-страниц.
HTML использует теги для структурирования контента.`,

  detailedContent: `
## Что такое HTML?

HTML - это основа любой веб-страницы. Он определяет структуру и содержимое страницы с помощью тегов.

### Основные концепции:

- **Теги**: HTML использует теги, заключенные в угловые скобки, например \`<html>\`, \`<body>\`, \`<p>\`
- **Элементы**: Пара открывающего и закрывающего тегов с содержимым между ними
- **Атрибуты**: Дополнительная информация о элементе, например \`class="container"\`

HTML не является языком программирования - это язык разметки. Он описывает, как контент должен быть организован на странице.
  `.trim(),

  examples: [
    {
      title: 'Базовая структура HTML документа',
      code: `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Моя первая страница</title>
</head>
<body>
    <h1>Привет, мир!</h1>
    <p>Это моя первая HTML страница.</p>
</body>
</html>`,
      explanation: `
- \`<!DOCTYPE html>\` - объявление типа документа (HTML5)
- \`<html>\` - корневой элемент
- \`<head>\` - метаинформация о странице
- \`<body>\` - видимое содержимое страницы
      `.trim()
    },
    {
      title: 'Пример HTML тегов',
      code: `<!-- Заголовки -->
<h1>Главный заголовок</h1>
<h2>Подзаголовок</h2>

<!-- Параграф -->
<p>Это обычный текст в параграфе.</p>

<!-- Ссылка -->
<a href="https://example.com">Посетите наш сайт</a>

<!-- Изображение -->
<img src="photo.jpg" alt="Описание фото">`,
      explanation: 'Примеры наиболее часто используемых HTML тегов'
    }
  ],

  keyPoints: [
    'HTML - язык разметки, не программирования',
    'Использует теги для структурирования контента',
    'Каждая страница начинается с <!DOCTYPE html>',
    'Теги могут иметь атрибуты',
    'Правильная структура: html > head + body'
  ],

  // Опционально: визуальные ресурсы
  visualAssets: [
    '/design/v2/diagrams/html-structure.svg'
  ]
};
```

**Файл**: `src/data/v2/stages/stage-html/practice/task-html-1.js`

```javascript
export default {
  id: 'task-html-first-page',
  title: 'Создайте свою первую HTML страницу',
  scenario: `Вы создаете свою первую веб-страницу - страницу "Обо мне".
Она должна содержать базовую HTML структуру с заголовком, описанием и списком ваших интересов.`,

  language: 'html',
  difficulty: 'easy',

  starterCode: `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Обо мне</title>
</head>
<body>
    <!-- Ваш код здесь -->

</body>
</html>`,

  requirements: [
    'Используйте тег <h1> для главного заголовка "Обо мне"',
    'Добавьте параграф (<p>) с коротким описанием о себе',
    'Создайте неупорядоченный список (<ul>) с минимум 3 пунктами ваших интересов',
    'Используйте семантически правильные теги'
  ],

  hints: [
    'Неупорядоченный список создается с помощью <ul>, а каждый пункт - с помощью <li>',
    'Не забудьте закрывающие теги!',
    'Теги должны быть правильно вложены'
  ],

  // Автоматические проверки (hidden от пользователя)
  hiddenChecks: [
    {
      id: 'has_h1',
      type: 'must_contain',
      rule: '<h1>',
      weight: 20,
      message: 'Отсутствует заголовок h1'
    },
    {
      id: 'has_paragraph',
      type: 'must_contain',
      rule: '<p>',
      weight: 20,
      message: 'Отсутствует параграф'
    },
    {
      id: 'has_list',
      type: 'must_contain',
      rule: '<ul>',
      weight: 20,
      message: 'Отсутствует неупорядоченный список'
    },
    {
      id: 'has_list_items',
      type: 'regex',
      rule: '(<li>.*?</li>.*?){3,}',
      weight: 20,
      message: 'Должно быть минимум 3 пункта списка'
    },
    {
      id: 'proper_nesting',
      type: 'validation',
      rule: 'checkHTMLNesting',
      weight: 20,
      message: 'Проверьте правильность вложенности тегов'
    }
  ],

  // Критерии оценки для AI
  rubric: [
    {
      id: 'correctness',
      maxScore: 40,
      description: 'Корректность HTML структуры'
    },
    {
      id: 'completeness',
      maxScore: 30,
      description: 'Выполнены все требования'
    },
    {
      id: 'semantics',
      maxScore: 20,
      description: 'Использование семантических тегов'
    },
    {
      id: 'code_quality',
      maxScore: 10,
      description: 'Читаемость и форматирование кода'
    }
  ],

  maxAttempts: 3,
  passScore: 70,

  // Пример правильного решения (скрыт от пользователя)
  solutionExample: `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Обо мне</title>
</head>
<body>
    <h1>Обо мне</h1>
    <p>
        Привет! Меня зовут Алексей, я начинающий веб-разработчик.
        Изучаю HTML, CSS и JavaScript для создания современных веб-сайтов.
    </p>
    <h2>Мои интересы:</h2>
    <ul>
        <li>Веб-разработка</li>
        <li>Чтение технических книг</li>
        <li>Игра на гитаре</li>
        <li>Путешествия</li>
    </ul>
</body>
</html>`
};
```

### ЭТАП 3: Создание главного экспорта V2

**Файл**: `src/data/v2/index.js`

```javascript
// Экспорт этапов
export { LEARNING_STAGES, getStageById, getSubstageById, getNextStage, getPreviousStage } from './stages/stagesConfig';

// Экспорт достижений V2
export { ACHIEVEMENTS_V2 } from './achievements/achievementsV2';

// Экспорт дизайн токенов
export { DESIGN_TOKENS } from './design/designTokens';
export { STAGE_DESIGNS } from './design/stageDesigns';

// Утилиты
export { calculateStageProgress } from './utils/progressHelpers';
export { checkUnlockCriteria } from './utils/unlockHelpers';
```

### ЭТАП 4: Создание LearningProgressContext

**Файл**: `src/contexts/LearningProgressContext.jsx`

```javascript
import React, { createContext, useContext, useState, useEffect } from 'react';
import { LEARNING_STAGES } from '../data/v2';
import { storageService } from '../services/storageService';

const LearningProgressContext = createContext();

export const useLearningProgress = () => {
  const context = useContext(LearningProgressContext);
  if (!context) {
    throw new Error('useLearningProgress must be used within LearningProgressProvider');
  }
  return context;
};

export const LearningProgressProvider = ({ children }) => {
  const [userProgress, setUserProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  // Инициализация прогресса
  useEffect(() => {
    initializeProgress();
  }, []);

  const initializeProgress = () => {
    let progress = storageService.getUserProgress();

    if (!progress) {
      // Создать новый прогресс
      progress = createInitialProgress();
      storageService.saveUserProgress(progress);
    }

    setUserProgress(progress);
    setLoading(false);
  };

  const createInitialProgress = () => {
    return {
      userId: 'user-' + Date.now(),
      currentStage: 'html',
      stages: LEARNING_STAGES.map((stage, index) => ({
        stageId: stage.id,
        status: index === 0 ? 'in_progress' : 'locked',
        completionPercentage: 0,
        startedAt: index === 0 ? new Date().toISOString() : null,
        completedAt: null,
        substages: stage.substages.map((substage) => ({
          substageId: substage.id,
          status: 'locked',
          materialRead: false,
          practiceAttempts: 0,
          practiceScore: 0,
          quizScore: null,
          timeSpent: 0,
          completedAt: null
        })),
        achievements: []
      })),
      stats: {
        totalTimeSpent: 0,
        totalXP: 0,
        level: 1,
        streak: 0,
        completedPractices: 0
      }
    };
  };

  const updateSubstageProgress = (stageId, substageId, updates) => {
    setUserProgress(prev => {
      const newProgress = { ...prev };
      const stageIndex = newProgress.stages.findIndex(s => s.stageId === stageId);
      const substageIndex = newProgress.stages[stageIndex].substages
        .findIndex(s => s.substageId === substageId);

      newProgress.stages[stageIndex].substages[substageIndex] = {
        ...newProgress.stages[stageIndex].substages[substageIndex],
        ...updates
      };

      // Пересчитать прогресс этапа
      recalculateStageProgress(newProgress, stageId);

      // Сохранить
      storageService.saveUserProgress(newProgress);

      return newProgress;
    });
  };

  const completeSubstage = (stageId, substageId, score = null) => {
    updateSubstageProgress(stageId, substageId, {
      status: 'completed',
      completedAt: new Date().toISOString(),
      practiceScore: score || 100
    });

    // Проверить разблокировку следующего подэтапа
    unlockNextSubstage(stageId, substageId);
  };

  const unlockNextSubstage = (stageId, currentSubstageId) => {
    const stage = LEARNING_STAGES.find(s => s.id === stageId);
    const currentIndex = stage.substages.findIndex(s => s.id === currentSubstageId);

    if (currentIndex < stage.substages.length - 1) {
      const nextSubstageId = stage.substages[currentIndex + 1].id;

      updateSubstageProgress(stageId, nextSubstageId, {
        status: 'in_progress'
      });
    }
  };

  const recalculateStageProgress = (progress, stageId) => {
    const stageIndex = progress.stages.findIndex(s => s.stageId === stageId);
    const stage = progress.stages[stageIndex];

    const completedCount = stage.substages.filter(s => s.status === 'completed').length;
    const totalCount = stage.substages.length;

    stage.completionPercentage = Math.round((completedCount / totalCount) * 100);

    // Если этап завершен на 100%, разблокировать следующий
    if (stage.completionPercentage === 100) {
      stage.status = 'completed';
      stage.completedAt = new Date().toISOString();

      // Разблокировать следующий этап
      if (stageIndex < progress.stages.length - 1) {
        progress.stages[stageIndex + 1].status = 'in_progress';
        progress.stages[stageIndex + 1].startedAt = new Date().toISOString();
        progress.currentStage = progress.stages[stageIndex + 1].stageId;
      }
    } else if (stage.completionPercentage >= 80 && stageIndex < progress.stages.length - 1) {
      // Разблокировать следующий этап при 80% завершении
      if (progress.stages[stageIndex + 1].status === 'locked') {
        progress.stages[stageIndex + 1].status = 'in_progress';
        progress.stages[stageIndex + 1].startedAt = new Date().toISOString();
      }
    }
  };

  const getStageProgress = (stageId) => {
    if (!userProgress) return null;
    return userProgress.stages.find(s => s.stageId === stageId);
  };

  const getSubstageProgress = (stageId, substageId) => {
    const stage = getStageProgress(stageId);
    if (!stage) return null;
    return stage.substages.find(s => s.substageId === substageId);
  };

  const value = {
    userProgress,
    loading,
    updateSubstageProgress,
    completeSubstage,
    getStageProgress,
    getSubstageProgress
  };

  return (
    <LearningProgressContext.Provider value={value}>
      {children}
    </LearningProgressContext.Provider>
  );
};
```

### ЭТАП 5: Создание компонента LearningView

**Файл**: `src/components/Learning/LearningView.jsx`

```javascript
import React, { useState } from 'react';
import { LEARNING_STAGES } from '../../data/v2';
import { useLearningProgress } from '../../contexts/LearningProgressContext';
import StageNavigator from './StageNavigator';
import StageContent from './StageContent';

const LearningView = () => {
  const { userProgress, loading } = useLearningProgress();
  const [selectedStageId, setSelectedStageId] = useState(
    userProgress?.currentStage || 'html'
  );

  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  const selectedStage = LEARNING_STAGES.find(s => s.id === selectedStageId);
  const stageProgress = userProgress.stages.find(s => s.stageId === selectedStageId);

  return (
    <div className="learning-view">
      <StageNavigator
        stages={LEARNING_STAGES}
        selectedStageId={selectedStageId}
        onSelectStage={setSelectedStageId}
        userProgress={userProgress}
      />

      <StageContent
        stage={selectedStage}
        stageProgress={stageProgress}
      />
    </div>
  );
};

export default LearningView;
```

**Файл**: `src/components/Learning/StageContent.jsx`

```javascript
import React, { useState } from 'react';
import SubstageCard from './SubstageCard';
import MaterialViewer from './MaterialViewer';
import PracticeZone from './PracticeZone';
import ProgressBar from './ProgressBar';
import LockOverlay from './LockOverlay';

const StageContent = ({ stage, stageProgress }) => {
  const [selectedSubstage, setSelectedSubstage] = useState(null);

  const isLocked = stageProgress.status === 'locked';

  if (isLocked) {
    return (
      <LockOverlay
        reason="Этот этап пока недоступен"
        requirement="Завершите предыдущий этап минимум на 80%"
      />
    );
  }

  return (
    <div className="stage-content">
      {/* Заголовок этапа */}
      <div className="stage-header">
        <div className="stage-icon">{stage.icon}</div>
        <div>
          <h1>{stage.title}</h1>
          <p>{stage.description}</p>
        </div>
      </div>

      {/* Прогресс */}
      <ProgressBar
        current={stageProgress.completionPercentage}
        total={100}
        label={`${stageProgress.completionPercentage}% завершено`}
      />

      <div className="stage-info">
        <span>
          Завершено: {stageProgress.substages.filter(s => s.status === 'completed').length}
          из {stage.substages.length} подэтапов
        </span>
        <span>
          Примерное время: ~{stage.estimatedHours} часов
        </span>
      </div>

      {/* Список подэтапов */}
      <div className="substages-list">
        {stage.substages.map((substage, index) => {
          const substageProgress = stageProgress.substages[index];

          return (
            <SubstageCard
              key={substage.id}
              substage={substage}
              progress={substageProgress}
              onSelect={() => setSelectedSubstage(substage)}
              isSelected={selectedSubstage?.id === substage.id}
            />
          );
        })}
      </div>

      {/* Просмотр материала или практика */}
      {selectedSubstage && (
        <div className="substage-viewer">
          {selectedSubstage.type === 'theory' && (
            <MaterialViewer
              substage={selectedSubstage}
              stageId={stage.id}
              onComplete={() => {
                // Отметить как прочитанное
                setSelectedSubstage(null);
              }}
            />
          )}

          {selectedSubstage.type === 'practice' && (
            <PracticeZone
              task={selectedSubstage.practice}
              stageId={stage.id}
              substageId={selectedSubstage.id}
              onComplete={() => {
                setSelectedSubstage(null);
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default StageContent;
```

### ЭТАП 6: Создание сервиса миграции

**Файл**: `src/services/migrationService.js`

```javascript
import { storageService } from './storageService';
import { LEARNING_STAGES } from '../data/v2';

// Маппинг старых курсов на новые этапы
const V1_TO_V2_MAPPING = {
  courses: {
    html: {
      stageId: 'html',
      materials: {
        // Старый ID материала: новый ID подэтапа
        '1': 'html-basics',
        '2': 'html-structure',
        '3': 'html-text-elements'
        // ... и т.д.
      }
    },
    css: {
      stageId: 'css',
      materials: {
        '1': 'css-selectors',
        '2': 'css-box-model'
      }
    },
    javascript: {
      stageId: 'javascript',
      materials: {}
    }
  },
  practice: {
    task_html_1: 'html-practice-1',
    task_css_1: 'css-practice-1'
  }
};

export class MigrationService {
  /**
   * Проверить, нужна ли миграция
   */
  static needsMigration() {
    const v1Data = this.loadV1Data();
    const migrationCompleted = localStorage.getItem('migration_v1_to_v2_completed');

    return v1Data !== null && migrationCompleted !== 'true';
  }

  /**
   * Загрузить данные V1 из localStorage
   */
  static loadV1Data() {
    try {
      const knowledgeProgress = localStorage.getItem('knowledgeProgress');
      const practiceProgress = localStorage.getItem('practiceProgress');
      const userStats = localStorage.getItem('userStats');

      if (!knowledgeProgress && !practiceProgress) {
        return null;
      }

      return {
        knowledgeProgress: knowledgeProgress ? JSON.parse(knowledgeProgress) : {},
        practiceProgress: practiceProgress ? JSON.parse(practiceProgress) : {},
        userStats: userStats ? JSON.parse(userStats) : {}
      };
    } catch (error) {
      console.error('Error loading V1 data:', error);
      return null;
    }
  }

  /**
   * Создать бэкап V1 данных
   */
  static createBackup(v1Data) {
    const backup = {
      timestamp: new Date().toISOString(),
      data: v1Data
    };

    localStorage.setItem('v1_backup', JSON.stringify(backup));
    console.log('✅ V1 data backed up');
  }

  /**
   * Конвертировать прогресс V1 → V2
   */
  static convertProgressV1toV2(v1Data) {
    const { knowledgeProgress, practiceProgress, userStats } = v1Data;

    // Создать базовую структуру V2
    const v2Progress = {
      userId: 'user-' + Date.now(),
      currentStage: 'html',
      stages: [],
      stats: {
        totalTimeSpent: userStats.totalTimeSpent || 0,
        totalXP: userStats.xp || 0,
        level: userStats.level || 1,
        streak: userStats.streak || 0,
        completedPractices: 0
      }
    };

    // Конвертировать каждый этап
    LEARNING_STAGES.forEach((stage, stageIndex) => {
      const v1CourseId = this.findV1CourseId(stage.id);
      const v1CourseProgress = knowledgeProgress[v1CourseId] || {};

      const stageProgressData = {
        stageId: stage.id,
        status: stageIndex === 0 ? 'in_progress' : 'locked',
        completionPercentage: 0,
        startedAt: stageIndex === 0 ? new Date().toISOString() : null,
        completedAt: null,
        substages: [],
        achievements: []
      };

      // Конвертировать подэтапы
      stage.substages.forEach((substage) => {
        const v1MaterialId = this.findV1MaterialId(stage.id, substage.id);
        const isRead = v1CourseProgress.readMaterials?.includes(v1MaterialId);

        const substageProgressData = {
          substageId: substage.id,
          status: isRead ? 'completed' : 'locked',
          materialRead: isRead || false,
          practiceAttempts: 0,
          practiceScore: 0,
          quizScore: null,
          timeSpent: 0,
          completedAt: isRead ? new Date().toISOString() : null
        };

        // Проверить практику
        if (substage.type === 'practice' && substage.practice) {
          const v1PracticeId = this.findV1PracticeId(substage.practice.id);
          const v1PracticeResult = practiceProgress[v1PracticeId];

          if (v1PracticeResult) {
            substageProgressData.practiceAttempts = v1PracticeResult.attempts || 1;
            substageProgressData.practiceScore = v1PracticeResult.score || 0;
            substageProgressData.status = v1PracticeResult.passed ? 'completed' : 'in_progress';
            substageProgressData.completedAt = v1PracticeResult.completedAt;
          }
        }

        stageProgressData.substages.push(substageProgressData);
      });

      // Пересчитать процент завершения этапа
      const completedCount = stageProgressData.substages.filter(
        s => s.status === 'completed'
      ).length;
      stageProgressData.completionPercentage = Math.round(
        (completedCount / stageProgressData.substages.length) * 100
      );

      // Определить текущий этап
      if (stageProgressData.completionPercentage > 0 &&
          stageProgressData.completionPercentage < 100) {
        v2Progress.currentStage = stage.id;
      }

      v2Progress.stages.push(stageProgressData);
    });

    return v2Progress;
  }

  /**
   * Найти ID курса V1 по ID этапа V2
   */
  static findV1CourseId(v2StageId) {
    for (const [v1CourseId, mapping] of Object.entries(V1_TO_V2_MAPPING.courses)) {
      if (mapping.stageId === v2StageId) {
        return v1CourseId;
      }
    }
    return null;
  }

  /**
   * Найти ID материала V1 по ID подэтапа V2
   */
  static findV1MaterialId(v2StageId, v2SubstageId) {
    const v1CourseId = this.findV1CourseId(v2StageId);
    if (!v1CourseId) return null;

    const courseMapping = V1_TO_V2_MAPPING.courses[v1CourseId];
    if (!courseMapping) return null;

    for (const [v1MaterialId, v2SubId] of Object.entries(courseMapping.materials)) {
      if (v2SubId === v2SubstageId) {
        return v1MaterialId;
      }
    }

    return null;
  }

  /**
   * Найти ID практики V1 по ID практики V2
   */
  static findV1PracticeId(v2PracticeId) {
    for (const [v1PracticeId, v2PracId] of Object.entries(V1_TO_V2_MAPPING.practice)) {
      if (v2PracId === v2PracticeId) {
        return v1PracticeId;
      }
    }
    return null;
  }

  /**
   * Выполнить миграцию
   */
  static async migrate() {
    console.log('🔄 Starting V1 → V2 migration...');

    try {
      // 1. Проверить, нужна ли миграция
      if (!this.needsMigration()) {
        console.log('ℹ️ No migration needed');
        return { success: true, message: 'No V1 data found or migration already completed' };
      }

      // 2. Загрузить V1 данные
      const v1Data = this.loadV1Data();
      console.log('📦 V1 data loaded');

      // 3. Создать бэкап
      this.createBackup(v1Data);

      // 4. Конвертировать прогресс
      const v2Progress = this.convertProgressV1toV2(v1Data);
      console.log('✅ Progress converted to V2 format');

      // 5. Сохранить V2 данные
      storageService.saveUserProgress(v2Progress);
      console.log('💾 V2 data saved');

      // 6. Пометить миграцию как завершенную
      localStorage.setItem('migration_v1_to_v2_completed', 'true');
      localStorage.setItem('migration_v1_to_v2_date', new Date().toISOString());

      console.log('🎉 Migration completed successfully!');

      return {
        success: true,
        message: 'Migration completed successfully',
        v2Progress
      };

    } catch (error) {
      console.error('❌ Migration failed:', error);

      return {
        success: false,
        message: 'Migration failed: ' + error.message,
        error
      };
    }
  }

  /**
   * Откатить миграцию (восстановить V1 данные)
   */
  static rollback() {
    try {
      const backup = localStorage.getItem('v1_backup');

      if (!backup) {
        return { success: false, message: 'No backup found' };
      }

      const { data } = JSON.parse(backup);

      // Восстановить V1 данные
      localStorage.setItem('knowledgeProgress', JSON.stringify(data.knowledgeProgress));
      localStorage.setItem('practiceProgress', JSON.stringify(data.practiceProgress));
      localStorage.setItem('userStats', JSON.stringify(data.userStats));

      // Удалить V2 данные
      localStorage.removeItem('userProgress_v2');
      localStorage.removeItem('migration_v1_to_v2_completed');

      console.log('↩️ Rollback completed');

      return { success: true, message: 'Rollback completed' };

    } catch (error) {
      console.error('Rollback failed:', error);
      return { success: false, message: 'Rollback failed: ' + error.message };
    }
  }
}
```

### ЭТАП 7: Интеграция в App.jsx

**Файл**: `src/App.jsx`

```javascript
import React, { useEffect, useState } from 'react';
import { LearningProgressProvider } from './contexts/LearningProgressContext';
import { MigrationService } from './services/migrationService';
import LearningView from './components/Learning/LearningView';
// ... остальные импорты

function App() {
  const [migrationStatus, setMigrationStatus] = useState('checking');

  useEffect(() => {
    // Проверить и выполнить миграцию при первом запуске
    checkAndMigrate();
  }, []);

  const checkAndMigrate = async () => {
    if (MigrationService.needsMigration()) {
      console.log('Migration needed, starting...');
      const result = await MigrationService.migrate();

      if (result.success) {
        setMigrationStatus('completed');
        // Показать уведомление пользователю
        showNotification('Данные успешно обновлены до версии 2.0!');
      } else {
        setMigrationStatus('failed');
        console.error('Migration failed:', result.message);
      }
    } else {
      setMigrationStatus('not_needed');
    }
  };

  if (migrationStatus === 'checking') {
    return <div>Проверка данных...</div>;
  }

  return (
    <LearningProgressProvider>
      <div className="App">
        {/* ... остальной код */}

        {currentView === 'learning' && <LearningView />}

        {/* ... остальной код */}
      </div>
    </LearningProgressProvider>
  );
}

export default App;
```

---

## ✅ ТЕСТИРОВАНИЕ

### Чек-лист миграции

```
[ ] V1 данные корректно загружаются
[ ] Бэкап создается перед миграцией
[ ] Прогресс по материалам переносится
[ ] Прогресс по практике переносится
[ ] XP и уровни сохраняются
[ ] Текущий этап определяется правильно
[ ] V2 данные сохраняются в localStorage
[ ] Миграция не запускается повторно
[ ] Откат (rollback) работает
[ ] Нет ошибок в консоли
```

### Тестовые сценарии

#### Сценарий 1: Новый пользователь
```javascript
// Очистить localStorage
localStorage.clear();

// Запустить приложение
// Ожидание: создается новый прогресс V2, первый этап HTML разблокирован
```

#### Сценарий 2: Миграция с V1
```javascript
// Подготовить V1 данные
localStorage.setItem('knowledgeProgress', JSON.stringify({
  html: {
    readMaterials: ['1', '2', '3']
  }
}));

// Запустить приложение
// Ожидание: миграция выполняется, V1 данные переносятся в V2
```

#### Сценарий 3: Откат миграции
```javascript
// После миграции
MigrationService.rollback();

// Ожидание: V1 данные восстановлены, V2 данные удалены
```

---

## 🔄 ОТКАТ (ROLLBACK)

### Если что-то пошло не так

```javascript
// В консоли браузера
import { MigrationService } from './services/migrationService';

// Откатить миграцию
MigrationService.rollback();

// Перезагрузить страницу
window.location.reload();
```

### Ручное восстановление

```javascript
// Получить бэкап
const backup = JSON.parse(localStorage.getItem('v1_backup'));

// Восстановить данные
localStorage.setItem('knowledgeProgress', JSON.stringify(backup.data.knowledgeProgress));
localStorage.setItem('practiceProgress', JSON.stringify(backup.data.practiceProgress));
localStorage.setItem('userStats', JSON.stringify(backup.data.userStats));

// Удалить V2 флаг
localStorage.removeItem('migration_v1_to_v2_completed');

// Перезагрузить
window.location.reload();
```

---

## 📊 ПРОВЕРКА РЕЗУЛЬТАТОВ

После миграции проверьте:

1. **Dashboard**: Отображается карта этапов
2. **Прогресс**: Старый прогресс перенесен
3. **Текущий этап**: Соответствует прогрессу V1
4. **XP и уровень**: Сохранены
5. **Практика**: Результаты перенесены

---

## 🎯 СЛЕДУЮЩИЕ ШАГИ

После успешной миграции:

1. [ ] Создать материалы для всех 5 этапов
2. [ ] Создать практические задания
3. [ ] Добавить дизайн для каждого этапа
4. [ ] Протестировать на разных устройствах
5. [ ] Собрать фидбек от пользователей

---
