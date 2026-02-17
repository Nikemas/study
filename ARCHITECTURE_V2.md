# 🏗️ АРХИТЕКТУРА ПРОЕКТА V2.0 - ОБРАЗОВАТЕЛЬНАЯ ПЛАТФОРМА

## 📋 СОДЕРЖАНИЕ
1. [Обзор изменений](#обзор-изменений)
2. [Архитектура и структура файлов](#архитектура-и-структура-файлов)
3. [Структура базы данных](#структура-базы-данных)
4. [План поэтапного обучения фронтенду](#план-поэтапного-обучения)
5. [Файловая топология](#файловая-топология)
6. [Интеграция дизайна с функционалом](#интеграция-дизайна)
7. [Дорожная карта MVP](#дорожная-карта-mvp)
8. [Требования к доступности и развертыванию](#требования)

---

## 🎯 ОБЗОР ИЗМЕНЕНИЙ

### Цели V2
- **Структурированное обучение**: пошаговое изучение фронтенд-разработки (HTML → CSS → JS → Advanced)
- **Прогрессивность**: нельзя перейти на следующий этап без завершения предыдущего
- **Практико-ориентированность**: теория + практические задания с автопроверкой
- **Визуальное представление прогресса**: дерево навыков, прогресс-бары, достижения
- **Единая база знаний v2**: переструктурированные материалы по этапам

### Ключевые отличия от V1
| Аспект | V1 | V2 |
|--------|----|----|
| Структура | Курсы по языкам | Этапы обучения фронтенду |
| Навигация | Свободная | Последовательная (этапы) |
| База данных | Плоская (courseData.js) | Иерархическая (stages/substages) |
| Практика | Отдельные задачи | Интегрированные в этапы |
| Прогресс | По материалам | По этапам и подэтапам |
| Дизайн | AI tutor chat | Learning path journey |

---

## 🗂️ АРХИТЕКТУРА И СТРУКТУРА ФАЙЛОВ

### Новая файловая структура

```
study/
├── public/
│   └── index.html
│
├── src/
│   ├── components/
│   │   ├── Chat/              # AI помощник (без изменений)
│   │   ├── Dashboard/         # ОБНОВЛЕНО: новый дизайн
│   │   │   ├── DashboardView.jsx
│   │   │   ├── ProgressOverview.jsx
│   │   │   ├── LearningPathMap.jsx    # NEW: визуальная карта этапов
│   │   │   └── QuickStats.jsx
│   │   ├── Header/
│   │   ├── History/
│   │   │
│   │   ├── Learning/          # NEW: главный компонент обучения
│   │   │   ├── LearningView.jsx       # Замена KnowledgeView
│   │   │   ├── StageNavigator.jsx     # Навигация по этапам
│   │   │   ├── StageContent.jsx       # Контент этапа
│   │   │   ├── SubstageCard.jsx       # Карточка подэтапа
│   │   │   ├── MaterialViewer.jsx     # Просмотр материала
│   │   │   ├── PracticeZone.jsx       # Зона практики
│   │   │   ├── ProgressBar.jsx        # Прогресс по этапу
│   │   │   └── LockOverlay.jsx        # Блокировка незавершенных этапов
│   │   │
│   │   ├── Gamification/
│   │   ├── Layout/
│   │   ├── Onboarding/
│   │   └── UI/
│   │
│   ├── config/
│   │   ├── aiConfig.js
│   │   ├── gamificationConfig.js
│   │   └── systemPrompt.js
│   │
│   ├── contexts/
│   │   ├── GamificationContext.jsx
│   │   ├── LanguageContext.jsx
│   │   └── LearningProgressContext.jsx  # NEW: управление прогрессом
│   │
│   ├── data/
│   │   ├── v1/                         # OLD DATA (для миграции)
│   │   │   ├── courseData.js
│   │   │   ├── achievements.js
│   │   │   └── practiceTasksData.js
│   │   │
│   │   └── v2/                         # NEW STRUCTURED DATA
│   │       ├── index.js                # Экспорт всех данных v2
│   │       │
│   │       ├── stages/                 # Этапы обучения
│   │       │   ├── stagesConfig.js     # Конфигурация всех этапов
│   │       │   ├── stage-html/
│   │       │   │   ├── index.js
│   │       │   │   ├── metadata.js
│   │       │   │   ├── substages.js
│   │       │   │   ├── materials/
│   │       │   │   │   ├── 01-basics.js
│   │       │   │   │   ├── 02-semantics.js
│   │       │   │   │   └── 03-forms.js
│   │       │   │   └── practice/
│   │       │   │       ├── task-html-1.js
│   │       │   │       └── task-html-2.js
│   │       │   │
│   │       │   ├── stage-css/
│   │       │   │   ├── index.js
│   │       │   │   ├── metadata.js
│   │       │   │   ├── substages.js
│   │       │   │   ├── materials/
│   │       │   │   │   ├── 01-selectors.js
│   │       │   │   │   ├── 02-box-model.js
│   │       │   │   │   ├── 03-flexbox.js
│   │       │   │   │   └── 04-grid.js
│   │       │   │   └── practice/
│   │       │   │
│   │       │   ├── stage-javascript/
│   │       │   │   ├── index.js
│   │       │   │   ├── metadata.js
│   │       │   │   ├── substages.js
│   │       │   │   ├── materials/
│   │       │   │   │   ├── 01-basics.js
│   │       │   │   │   ├── 02-dom.js
│   │       │   │   │   ├── 03-events.js
│   │       │   │   │   └── 04-async.js
│   │       │   │   └── practice/
│   │       │   │
│   │       │   ├── stage-advanced/
│   │       │   │   ├── index.js
│   │       │   │   ├── metadata.js
│   │       │   │   ├── substages.js
│   │       │   │   ├── materials/
│   │       │   │   │   ├── 01-react-intro.js
│   │       │   │   │   ├── 02-react-hooks.js
│   │       │   │   │   ├── 03-state-management.js
│   │       │   │   │   └── 04-tooling.js
│   │       │   │   └── practice/
│   │       │   │
│   │       │   └── stage-projects/     # Финальные проекты
│   │       │       ├── index.js
│   │       │       ├── metadata.js
│   │       │       └── projects/
│   │       │           ├── project-1-landing.js
│   │       │           ├── project-2-todo.js
│   │       │           └── project-3-portfolio.js
│   │       │
│   │       ├── achievements/           # Достижения v2
│   │       │   └── achievementsV2.js
│   │       │
│   │       └── design/                 # Дизайн материалы
│   │           ├── designTokens.js     # Цвета, шрифты, отступы
│   │           ├── stageDesigns.js     # Дизайн для каждого этапа
│   │           └── components/         # UI компоненты для уроков
│   │               ├── CodePreview.js
│   │               ├── LiveDemo.js
│   │               └── VisualExample.js
│   │
│   ├── hooks/
│   │   ├── useChat.js
│   │   ├── useChatHistory.js
│   │   ├── useTheme.js
│   │   ├── useLearningProgress.js      # NEW: хук для прогресса
│   │   └── useStageUnlock.js           # NEW: логика разблокировки
│   │
│   ├── services/
│   │   ├── aiService.js
│   │   ├── contextBuilder.js
│   │   ├── storageService.js
│   │   ├── progressService.js          # ОБНОВЛЕНО: новая логика
│   │   ├── migrationService.js         # NEW: миграция v1 → v2
│   │   └── practiceEvaluationService.js
│   │
│   ├── utils/
│   │   ├── themeUtils.js
│   │   └── progressCalculator.js       # NEW: расчет прогресса
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.js
│   └── index.css
│
├── design/                             # Дизайн-макеты
│   ├── v1/                             # Старые дизайны
│   └── v2/                             # NEW: новые дизайны
│       ├── figma-exports/
│       ├── mockups/
│       │   ├── dashboard.png
│       │   ├── learning-path.png
│       │   ├── stage-view.png
│       │   └── practice-view.png
│       └── design-system.md
│
├── migrations/                         # NEW: скрипты миграции
│   ├── README.md
│   ├── migrate-v1-to-v2.js
│   └── data-mapping.json
│
├── package.json
├── tailwind.config.js
├── README.md
├── ARCHITECTURE_V2.md                  # THIS FILE
└── MIGRATION_GUIDE.md                  # NEW: гайд по миграции
```

### Единый путь сборки и хранения данных

**Принцип**: Все данные V2 находятся в `src/data/v2/`, организованы по этапам (stages)

**Путь импорта**:
```javascript
// Вместо:
import { COURSE_DATA } from '../data/courseData';

// Используем:
import { LEARNING_STAGES } from '../data/v2';
import { getStageById } from '../data/v2/stages/stagesConfig';
```

**Путь к дизайну**:
- Макеты: `design/v2/mockups/`
- Токены дизайна: `src/data/v2/design/designTokens.js`
- Компоненты примеры: `src/data/v2/design/components/`

---

## 💾 СТРУКТУРА БАЗЫ ДАННЫХ

### Концептуальная схема

```
LearningStages (Этапы обучения)
├── Stage (Этап)
│   ├── id: string
│   ├── order: number
│   ├── title: string
│   ├── description: string
│   ├── icon: string
│   ├── color: string
│   ├── estimatedHours: number
│   ├── prerequisites: string[]      // IDs предыдущих этапов
│   ├── unlockCriteria: object       // Критерии разблокировки
│   │   ├── previousStageCompletion: number (%)
│   │   └── minimumScore: number
│   │
│   └── substages: Substage[]
│       └── Substage (Подэтап)
│           ├── id: string
│           ├── order: number
│           ├── title: string
│           ├── type: 'theory' | 'practice' | 'quiz' | 'project'
│           ├── estimatedMinutes: number
│           ├── materials: Material[]
│           │   └── Material
│           │       ├── id: string
│           │       ├── topic: string
│           │       ├── content: string
│           │       ├── detailedContent: string
│           │       ├── examples: CodeExample[]
│           │       ├── keyPoints: string[]
│           │       ├── liveDemo: object (optional)
│           │       └── visualAssets: string[] (optional)
│           │
│           ├── practice: PracticeTask (optional)
│           │   └── PracticeTask
│           │       ├── id: string
│           │       ├── title: string
│           │       ├── scenario: string
│           │       ├── language: string
│           │       ├── difficulty: 'easy' | 'medium' | 'hard'
│           │       ├── starterCode: string
│           │       ├── requirements: string[]
│           │       ├── hiddenChecks: Check[]
│           │       ├── rubric: RubricItem[]
│           │       ├── maxAttempts: number
│           │       └── passScore: number
│           │
│           └── completionCriteria: object
│               ├── readMaterial: boolean
│               ├── passQuiz: boolean (optional)
│               └── completePractice: boolean (optional)

UserProgress (Прогресс пользователя)
├── userId: string
├── currentStage: string (stageId)
├── stages: StageProgress[]
│   └── StageProgress
│       ├── stageId: string
│       ├── status: 'locked' | 'in_progress' | 'completed'
│       ├── completionPercentage: number
│       ├── startedAt: timestamp
│       ├── completedAt: timestamp (optional)
│       ├── substages: SubstageProgress[]
│       │   └── SubstageProgress
│       │       ├── substageId: string
│       │       ├── status: 'locked' | 'in_progress' | 'completed'
│       │       ├── materialRead: boolean
│       │       ├── practiceAttempts: number
│       │       ├── practiceScore: number
│       │       ├── quizScore: number (optional)
│       │       ├── timeSpent: number (minutes)
│       │       └── completedAt: timestamp (optional)
│       │
│       └── achievements: string[] (achievementIds earned in this stage)
│
└── stats: object
    ├── totalTimeSpent: number (minutes)
    ├── totalXP: number
    ├── level: number
    ├── streak: number
    └── completedPractices: number

Achievements (Достижения)
└── Achievement
    ├── id: string
    ├── title: string
    ├── description: string
    ├── icon: string
    ├── rarity: 'common' | 'rare' | 'epic' | 'legendary'
    ├── xpReward: number
    ├── criteria: object
    └── unlockedBy: string[] (userIds)
```

### Примеры структур данных

#### Stage Example (HTML)
```javascript
{
  id: 'html',
  order: 1,
  title: 'HTML - Основы веб-страниц',
  description: 'Изучите структуру веб-страниц с помощью HTML',
  icon: '📄',
  color: 'bg-orange-500',
  estimatedHours: 12,
  prerequisites: [],
  unlockCriteria: {
    previousStageCompletion: 0, // Первый этап - всегда открыт
    minimumScore: 0
  },
  substages: [
    {
      id: 'html-basics',
      order: 1,
      title: 'Основы HTML',
      type: 'theory',
      estimatedMinutes: 45,
      materials: [
        {
          id: 'html-basics-intro',
          topic: 'Что такое HTML?',
          content: 'HTML (HyperText Markup Language) - язык разметки...',
          detailedContent: '...',
          examples: [
            {
              title: 'Базовая структура HTML',
              code: '<!DOCTYPE html>\n<html>...',
              explanation: 'Каждая HTML страница начинается с DOCTYPE...'
            }
          ],
          keyPoints: [
            'HTML - это язык разметки, не программирования',
            'Использует теги для структурирования контента'
          ]
        }
      ],
      completionCriteria: {
        readMaterial: true,
        passQuiz: false,
        completePractice: false
      }
    },
    {
      id: 'html-practice-1',
      order: 2,
      title: 'Практика: Создайте свою первую страницу',
      type: 'practice',
      estimatedMinutes: 30,
      practice: {
        id: 'task-html-first-page',
        title: 'Создайте HTML страницу о себе',
        scenario: 'Создайте простую веб-страницу...',
        language: 'html',
        difficulty: 'easy',
        starterCode: '<!DOCTYPE html>\n<!-- Ваш код здесь -->',
        requirements: [
          'Используйте тег <h1> для заголовка',
          'Добавьте параграф с описанием',
          'Создайте список с 3 пунктами'
        ],
        hiddenChecks: [
          { id: 'has_h1', type: 'must_contain', rule: '<h1>', weight: 20 },
          { id: 'has_p', type: 'must_contain', rule: '<p>', weight: 20 }
        ],
        rubric: [
          { id: 'correctness', maxScore: 40 },
          { id: 'structure', maxScore: 30 },
          { id: 'semantics', maxScore: 30 }
        ],
        maxAttempts: 3,
        passScore: 70
      },
      completionCriteria: {
        readMaterial: false,
        passQuiz: false,
        completePractice: true
      }
    }
  ]
}
```

#### User Progress Example
```javascript
{
  userId: 'user-123',
  currentStage: 'css',
  stages: [
    {
      stageId: 'html',
      status: 'completed',
      completionPercentage: 100,
      startedAt: '2026-01-15T10:00:00Z',
      completedAt: '2026-01-20T15:30:00Z',
      substages: [
        {
          substageId: 'html-basics',
          status: 'completed',
          materialRead: true,
          practiceAttempts: 0,
          practiceScore: 0,
          timeSpent: 45,
          completedAt: '2026-01-15T11:00:00Z'
        },
        {
          substageId: 'html-practice-1',
          status: 'completed',
          materialRead: false,
          practiceAttempts: 2,
          practiceScore: 85,
          timeSpent: 40,
          completedAt: '2026-01-15T12:00:00Z'
        }
      ],
      achievements: ['html-master', 'first-page']
    },
    {
      stageId: 'css',
      status: 'in_progress',
      completionPercentage: 35,
      startedAt: '2026-01-21T09:00:00Z',
      substages: [
        {
          substageId: 'css-selectors',
          status: 'completed',
          materialRead: true,
          practiceAttempts: 1,
          practiceScore: 92,
          timeSpent: 50,
          completedAt: '2026-01-21T10:30:00Z'
        },
        {
          substageId: 'css-box-model',
          status: 'in_progress',
          materialRead: true,
          practiceAttempts: 0,
          timeSpent: 25
        }
      ],
      achievements: []
    }
  ],
  stats: {
    totalTimeSpent: 160,
    totalXP: 1250,
    level: 3,
    streak: 7,
    completedPractices: 3
  }
}
```

### Способ миграции данных (V1 → V2)

**Стратегия миграции**:

1. **Автоматическая миграция при первом запуске**
   - Определить наличие данных V1 в localStorage
   - Запустить `migrationService.migrateV1toV2()`
   - Сохранить бэкап V1 данных
   - Перенести прогресс в новую структуру

2. **Маппинг старых данных в новые этапы**

```javascript
// migrations/data-mapping.json
{
  "v1ToV2Mapping": {
    "courses": {
      "html": {
        "mapsTo": "stage:html",
        "materials": {
          "1": "html-basics:html-basics-intro",
          "2": "html-semantics:html-semantic-tags"
        }
      },
      "css": {
        "mapsTo": "stage:css",
        "materials": {
          "1": "css-selectors:css-selectors-intro"
        }
      }
    },
    "practice": {
      "task_html_1": "html-practice-1:task-html-first-page"
    }
  }
}
```

3. **Скрипт миграции**

```javascript
// services/migrationService.js
export class MigrationService {
  static async migrateV1toV2() {
    const v1Data = this.loadV1Data();

    if (!v1Data) {
      return { success: true, message: 'No V1 data found' };
    }

    // Создать бэкап
    this.createBackup(v1Data);

    // Мигрировать прогресс
    const v2Progress = this.convertProgressV1toV2(v1Data.progress);

    // Мигрировать достижения
    const v2Achievements = this.convertAchievementsV1toV2(v1Data.achievements);

    // Сохранить в новой структуре
    storageService.saveUserProgress(v2Progress);
    storageService.saveAchievements(v2Achievements);

    // Пометить миграцию как завершенную
    localStorage.setItem('migration_v1_to_v2_completed', 'true');

    return { success: true, message: 'Migration completed' };
  }

  static convertProgressV1toV2(v1Progress) {
    // Логика преобразования...
  }
}
```

4. **Этапы миграции**
   - **Шаг 1**: Загрузка V1 данных из localStorage
   - **Шаг 2**: Валидация данных
   - **Шаг 3**: Маппинг материалов → подэтапы
   - **Шаг 4**: Конвертация прогресса → новая структура
   - **Шаг 5**: Сохранение V2 данных
   - **Шаг 6**: Создание уведомления пользователю

---

## 📚 ПЛАН ПОЭТАПНОГО ОБУЧЕНИЯ ФРОНТЕНДУ

### Философия обучения

**Принципы**:
1. **Последовательность**: Невозможно перейти к следующему этапу без завершения предыдущего
2. **Практикоориентированность**: Каждая теория закрепляется практикой
3. **Прогрессия сложности**: От простого к сложному
4. **Визуальность**: Много примеров с живыми демо
5. **Проектный подход**: Финал каждого большого этапа - проект

### Структура этапов (Learning Path)

```
ЭТАП 1: HTML - Основы веб-страниц (12 часов)
├── 1.1 Что такое HTML? [теория]
├── 1.2 Базовая структура документа [теория]
├── 1.3 Практика: Создайте первую страницу [практика]
├── 1.4 Текстовые элементы (h1-h6, p, strong, em) [теория]
├── 1.5 Списки (ul, ol, dl) [теория]
├── 1.6 Практика: Создайте резюме [практика]
├── 1.7 Ссылки и изображения [теория]
├── 1.8 Семантические теги (header, nav, main, footer) [теория]
├── 1.9 Практика: Лендинг с семантикой [практика]
├── 1.10 Формы и элементы ввода [теория]
├── 1.11 Практика: Форма регистрации [практика]
└── 1.12 Проект: Создайте сайт-визитку [проект]

ЭТАП 2: CSS - Стилизация и дизайн (16 часов)
├── 2.1 Что такое CSS? Подключение стилей [теория]
├── 2.2 Селекторы (тег, класс, id, атрибут) [теория]
├── 2.3 Практика: Стилизуйте HTML страницу [практика]
├── 2.4 Цвета, фоны, границы [теория]
├── 2.5 Текст и шрифты [теория]
├── 2.6 Практика: Типографика статьи [практика]
├── 2.7 Box Model (margin, padding, border, content) [теория]
├── 2.8 Display и Positioning [теория]
├── 2.9 Практика: Создайте карточку товара [практика]
├── 2.10 Flexbox - основы [теория]
├── 2.11 Flexbox - выравнивание и порядок [теория]
├── 2.12 Практика: Навигация с Flexbox [практика]
├── 2.13 CSS Grid - основы [теория]
├── 2.14 CSS Grid - области и шаблоны [теория]
├── 2.15 Практика: Галерея изображений с Grid [практика]
├── 2.16 Адаптивный дизайн (media queries) [теория]
├── 2.17 Практика: Адаптивный лендинг [практика]
└── 2.18 Проект: Адаптивный многостраничный сайт [проект]

ЭТАП 3: JavaScript - Интерактивность (20 часов)
├── 3.1 Что такое JavaScript? Подключение [теория]
├── 3.2 Переменные, типы данных [теория]
├── 3.3 Практика: Калькулятор в консоли [практика]
├── 3.4 Условия (if, else, switch) [теория]
├── 3.5 Циклы (for, while) [теория]
├── 3.6 Практика: FizzBuzz задача [практика]
├── 3.7 Функции (declaration, expression, arrow) [теория]
├── 3.8 Массивы и методы [теория]
├── 3.9 Практика: Работа с массивами данных [практика]
├── 3.10 Объекты [теория]
├── 3.11 DOM - Что это? [теория]
├── 3.12 Выборка элементов (querySelector, getElementById) [теория]
├── 3.13 Практика: Изменение текста и стилей [практика]
├── 3.14 События (click, input, submit) [теория]
├── 3.15 Практика: Интерактивная форма [практика]
├── 3.16 Создание и удаление элементов [теория]
├── 3.17 Практика: Todo List [практика]
├── 3.18 LocalStorage [теория]
├── 3.19 Практика: Сохранение данных [практика]
├── 3.20 Асинхронность (setTimeout, fetch) [теория]
├── 3.21 Практика: Загрузка данных с API [практика]
└── 3.22 Проект: Интерактивное веб-приложение [проект]

ЭТАП 4: Advanced - Современный фронтенд (24 часа)
├── 4.1 Введение в React [теория]
├── 4.2 JSX и компоненты [теория]
├── 4.3 Практика: Первый React компонент [практика]
├── 4.4 Props и передача данных [теория]
├── 4.5 State и хуки (useState) [теория]
├── 4.6 Практика: Счетчик на React [практика]
├── 4.7 useEffect и жизненный цикл [теория]
├── 4.8 Списки и ключи [теория]
├── 4.9 Практика: Список задач на React [практика]
├── 4.10 Формы в React [теория]
├── 4.11 Условный рендеринг [теория]
├── 4.12 Практика: Форма с валидацией [практика]
├── 4.13 Context API [теория]
├── 4.14 useContext и глобальное состояние [теория]
├── 4.15 Практика: Тема приложения (dark/light) [практика]
├── 4.16 React Router (навигация) [теория]
├── 4.17 Практика: Многостраничное SPA [практика]
├── 4.18 Оптимизация (useMemo, useCallback) [теория]
├── 4.19 Custom Hooks [теория]
├── 4.20 Практика: Собственный хук [практика]
├── 4.21 Работа с API в React [теория]
├── 4.22 Практика: Приложение с данными [практика]
├── 4.23 Деплой приложения [теория]
└── 4.24 Проект: Полноценное React приложение [проект]

ЭТАП 5: Финальные проекты (вариативно)
├── Проект А: Landing Page для стартапа
├── Проект Б: Todo App с синхронизацией
├── Проект В: Портфолио сайт
└── Проект Г: Dashboard с аналитикой
```

### Привязка к дизайну по этапам

| Этап | Дизайн-тема | Визуальные элементы |
|------|-------------|---------------------|
| HTML | 🏗️ Строительство | Кирпичики, блоки, структура |
| CSS | 🎨 Художник | Палитра, кисти, холст |
| JavaScript | ⚡ Электричество | Молнии, цепи, энергия |
| Advanced | 🚀 Космос | Ракеты, планеты, звезды |
| Projects | 🏆 Достижение | Кубки, медали, финиш |

**Файл дизайнов**: `src/data/v2/design/stageDesigns.js`

```javascript
export const STAGE_DESIGNS = {
  html: {
    primaryColor: '#FF6B35',
    secondaryColor: '#FFB84D',
    icon: '📄',
    bgPattern: 'bricks',
    illustration: '/design/v2/illustrations/html-building.svg',
    progressBarStyle: 'construction'
  },
  css: {
    primaryColor: '#A855F7',
    secondaryColor: '#EC4899',
    icon: '🎨',
    bgPattern: 'paint-strokes',
    illustration: '/design/v2/illustrations/css-painting.svg',
    progressBarStyle: 'gradient-fill'
  },
  // ... остальные этапы
};
```

---

## 📂 ФАЙЛОВАЯ ТОПОЛОГИЯ

### Где хранится что

```
ДИЗАЙН МАКЕТЫ
└── design/v2/
    ├── mockups/              # Скриншоты/экспорты из Figma
    ├── figma-exports/        # SVG, PNG компоненты
    └── design-system.md      # Описание дизайн-системы

МАТЕРИАЛЫ ОБУЧЕНИЯ
└── src/data/v2/stages/
    ├── stage-html/
    │   ├── materials/        # Теоретические материалы
    │   └── practice/         # Практические задания
    └── ... (другие этапы)

ПРИМЕРЫ КОДА
└── src/data/v2/design/components/
    ├── CodePreview.js        # Компонент просмотра кода
    ├── LiveDemo.js           # Живая демонстрация
    └── VisualExample.js      # Визуальные примеры

ДИЗАЙН ТОКЕНЫ
└── src/data/v2/design/
    └── designTokens.js       # Единый источник цветов, шрифтов, отступов

СТАРЫЕ ДАННЫЕ (V1)
└── src/data/v1/
    ├── courseData.js         # Для референса и миграции
    ├── achievements.js
    └── practiceTasksData.js
```

### Централизованный импорт

**Файл**: `src/data/v2/index.js`

```javascript
// Единая точка экспорта всех данных V2
export { LEARNING_STAGES } from './stages/stagesConfig';
export { getStageById, getSubstageById } from './stages/stagesConfig';
export { ACHIEVEMENTS_V2 } from './achievements/achievementsV2';
export { DESIGN_TOKENS } from './design/designTokens';
export { STAGE_DESIGNS } from './design/stageDesigns';

// Хелперы
export { calculateStageProgress } from './utils/progressHelpers';
export { checkUnlockCriteria } from './utils/unlockHelpers';
```

**Использование**:
```javascript
// В компонентах
import { LEARNING_STAGES, getStageById } from '../data/v2';

const stage = getStageById('html');
```

---

## 🎨 ИНТЕГРАЦИЯ ДИЗАЙНА С ФУНКЦИОНАЛОМ

### 1. Визуальное отражение этапов в интерфейсе

#### Dashboard - карта обучения

**Компонент**: `LearningPathMap.jsx`

```
┌─────────────────────────────────────────┐
│  ВАША КАРТА ОБУЧЕНИЯ                    │
├─────────────────────────────────────────┤
│                                         │
│   ① HTML ✓                              │
│   ↓ [100%] ███████████ 12/12            │
│                                         │
│   ② CSS ⏳                              │
│   ↓ [35%] ████░░░░░░░ 6/18             │
│                                         │
│   ③ JavaScript 🔒                       │
│   ↓ [0%] ░░░░░░░░░░░ 0/22              │
│                                         │
│   ④ Advanced 🔒                         │
│   ↓ [0%] ░░░░░░░░░░░ 0/24              │
│                                         │
│   ⑤ Projects 🔒                         │
│     [0%] ░░░░░░░░░░░ 0/4               │
└─────────────────────────────────────────┘
```

**Код**:
```jsx
// components/Dashboard/LearningPathMap.jsx
import { LEARNING_STAGES } from '../../data/v2';
import { useLearningProgress } from '../../hooks/useLearningProgress';

export const LearningPathMap = () => {
  const { stages, currentStage } = useLearningProgress();

  return (
    <div className="learning-path-map">
      {LEARNING_STAGES.map((stage, index) => {
        const progress = stages.find(s => s.stageId === stage.id);
        const isLocked = !progress || progress.status === 'locked';
        const isCurrent = currentStage === stage.id;

        return (
          <StageNode
            key={stage.id}
            stage={stage}
            progress={progress}
            isLocked={isLocked}
            isCurrent={isCurrent}
            order={index + 1}
          />
        );
      })}
    </div>
  );
};
```

#### Stage View - детальный просмотр этапа

**Компонент**: `StageContent.jsx`

```
┌─────────────────────────────────────────┐
│  ← Назад   📄 ЭТАП 1: HTML              │
│                                         │
│  Прогресс: 35% ████░░░░░░░             │
│  Завершено: 4 из 12 подэтапов           │
│  Время: ~8 часов осталось               │
├─────────────────────────────────────────┤
│                                         │
│  ✅ 1.1 Что такое HTML?                 │
│  ✅ 1.2 Базовая структура               │
│  ✅ 1.3 Практика: Первая страница       │
│  ✅ 1.4 Текстовые элементы              │
│                                         │
│  ⏳ 1.5 Списки                          │
│     ├─ 📖 Прочитать материал            │
│     └─ ✏️ Выполнить упражнение          │
│                                         │
│  🔒 1.6 Практика: Резюме                │
│  🔒 1.7 Ссылки и изображения            │
│  🔒 1.8 Семантические теги              │
│  ...                                    │
└─────────────────────────────────────────┘
```

### 2. Навигация по шагам

**Принцип**: Пользователь может двигаться только последовательно

**Компонент**: `StageNavigator.jsx`

```jsx
export const StageNavigator = ({ currentSubstage, stage, onNavigate }) => {
  const { canNavigateTo } = useStageUnlock();

  const handleNext = () => {
    const nextIndex = currentSubstage.order;
    const nextSubstage = stage.substages[nextIndex];

    if (canNavigateTo(nextSubstage.id)) {
      onNavigate(nextSubstage.id);
    } else {
      // Показать overlay с объяснением
      showLockMessage('Завершите текущий подэтап');
    }
  };

  return (
    <div className="stage-navigator">
      <button onClick={handlePrev} disabled={isFirst}>
        ← Назад
      </button>

      <span>{currentSubstage.order} / {stage.substages.length}</span>

      <button
        onClick={handleNext}
        disabled={!canNavigateTo(nextSubstage?.id)}
      >
        Далее →
      </button>
    </div>
  );
};
```

### 3. Прогресс-бары

**Типы прогресс-баров**:

1. **Общий прогресс** (на Dashboard)
   ```jsx
   <ProgressBar
     total={100}
     current={35}
     style="gradient"
     color="primary"
   />
   ```

2. **Прогресс этапа** (на StageView)
   ```jsx
   <StageProgressBar
     substages={stage.substages}
     completed={4}
     total={12}
     design={STAGE_DESIGNS[stage.id].progressBarStyle}
   />
   ```

3. **Прогресс подэтапа** (при выполнении задания)
   ```jsx
   <SubstageProgress
     steps={['Прочитать', 'Практика', 'Тест']}
     currentStep={1}
   />
   ```

### 4. Сохранение состояния

**Сервис**: `progressService.js`

```javascript
export class ProgressService {
  // Сохранить прогресс подэтапа
  static saveSubstageProgress(userId, stageId, substageId, progress) {
    const userProgress = this.getUserProgress(userId);

    const stageIndex = userProgress.stages.findIndex(s => s.stageId === stageId);
    const substageIndex = userProgress.stages[stageIndex].substages
      .findIndex(s => s.substageId === substageId);

    userProgress.stages[stageIndex].substages[substageIndex] = {
      ...userProgress.stages[stageIndex].substages[substageIndex],
      ...progress,
      lastUpdated: new Date().toISOString()
    };

    // Пересчитать прогресс этапа
    this.recalculateStageProgress(userProgress, stageId);

    // Сохранить в localStorage
    storageService.saveUserProgress(userProgress);

    return userProgress;
  }

  // Отметить подэтап как завершенный
  static completeSubstage(userId, stageId, substageId, score = null) {
    return this.saveSubstageProgress(userId, stageId, substageId, {
      status: 'completed',
      completedAt: new Date().toISOString(),
      practiceScore: score
    });
  }

  // Проверить, можно ли разблокировать следующий этап
  static checkUnlockNextStage(userId, currentStageId) {
    const userProgress = this.getUserProgress(userId);
    const currentStage = userProgress.stages.find(s => s.stageId === currentStageId);

    if (currentStage.completionPercentage >= 80) {
      // Разблокировать следующий этап
      const nextStageId = this.getNextStageId(currentStageId);
      if (nextStageId) {
        this.unlockStage(userId, nextStageId);
      }
    }
  }
}
```

**Использование в компонентах**:
```jsx
// В компоненте MaterialViewer
const handleMarkAsRead = () => {
  ProgressService.saveSubstageProgress(
    userId,
    stageId,
    substageId,
    { materialRead: true }
  );
};

// В компоненте PracticeZone
const handlePracticeComplete = (score) => {
  ProgressService.completeSubstage(
    userId,
    stageId,
    substageId,
    score
  );

  // Проверить разблокировку
  ProgressService.checkUnlockNextStage(userId, stageId);
};
```

### 5. Lock Overlay (блокировка незавершенных этапов)

**Компонент**: `LockOverlay.jsx`

```jsx
export const LockOverlay = ({ reason, requirement }) => {
  return (
    <div className="lock-overlay">
      <div className="lock-content">
        <Lock className="lock-icon" size={48} />
        <h3>Этап заблокирован</h3>
        <p>{reason}</p>
        <div className="requirement">
          <span>Требование:</span>
          <p>{requirement}</p>
        </div>
        <button onClick={() => navigateTo(previousStage)}>
          Вернуться к обучению
        </button>
      </div>
    </div>
  );
};

// Использование
{isLocked && (
  <LockOverlay
    reason="Вы еще не завершили предыдущий этап"
    requirement="Завершите 'Этап 1: HTML' на 80% для разблокировки"
  />
)}
```

---

## 🗺️ ДОРОЖНАЯ КАРТА MVP

### MVP Phase 1: Базовая инфраструктура (1-2 недели)

**Цель**: Создать структуру V2 и базовую навигацию

#### Задачи:
- [ ] Создать папку `src/data/v2/` и структуру подпапок
- [ ] Написать `stagesConfig.js` с конфигурацией 5 этапов
- [ ] Создать материалы для Этапа 1 (HTML) - минимум 5 подэтапов
- [ ] Реализовать `LearningProgressContext` для управления прогрессом
- [ ] Создать `migrationService.js` для миграции V1→V2
- [ ] Реализовать компонент `LearningPathMap` (визуальная карта)
- [ ] Реализовать компонент `StageContent` (просмотр этапа)
- [ ] Базовый прогресс-бар

**Артефакты**:
- ✅ Структура файлов V2
- ✅ Конфигурация этапов
- ✅ 5 подэтапов HTML с материалами
- ✅ Работающая навигация по этапам
- ✅ Сохранение прогресса в localStorage

**Чек-лист**:
```
[ ] Создана структура v2/stages/
[ ] Написан stagesConfig.js с этапом HTML
[ ] 5 материалов по HTML готовы
[ ] LearningPathMap показывает все этапы
[ ] Можно кликнуть на этап и увидеть подэтапы
[ ] Прогресс сохраняется при переходе между подэтапами
[ ] Миграция V1→V2 работает (старый прогресс переносится)
```

### MVP Phase 2: Практика и оценка (1-2 недели)

**Цель**: Добавить практические задания с автопроверкой

#### Задачи:
- [ ] Доработать `PracticeZone` компонент
- [ ] Интегрировать `CodeEditor` для написания кода
- [ ] Реализовать `practiceEvaluationService` с AI проверкой
- [ ] Создать 3-5 практических заданий для HTML
- [ ] Добавить `PracticeResultCard` с результатами
- [ ] Реализовать логику попыток (maxAttempts)
- [ ] Добавить условие завершения подэтапа (completionCriteria)
- [ ] Показывать блокировку следующего подэтапа

**Артефакты**:
- ✅ 5 практических заданий HTML
- ✅ Автопроверка с AI
- ✅ Результаты с оценкой и фидбеком
- ✅ Блокировка следующего шага до завершения

**Чек-лист**:
```
[ ] CodeEditor позволяет писать HTML код
[ ] Кнопка "Проверить" отправляет на AI оценку
[ ] AI возвращает score и feedback
[ ] Если score >= passScore, подэтап завершен
[ ] Следующий подэтап разблокируется
[ ] Показывается карточка с результатом
[ ] Можно повторить (если остались попытки)
```

### MVP Phase 3: CSS этап и дизайн (1 неделя)

**Цель**: Добавить второй этап (CSS) и улучшить UI

#### Задачи:
- [ ] Создать материалы для Этапа 2 (CSS) - 8 подэтапов
- [ ] Создать 5 практических заданий для CSS
- [ ] Интегрировать дизайн-токены (`designTokens.js`)
- [ ] Добавить иллюстрации для этапов
- [ ] Реализовать разные стили прогресс-баров по этапам
- [ ] Добавить анимации переходов между этапами
- [ ] Создать `LiveDemo` компонент для визуальных примеров CSS

**Артефакты**:
- ✅ Этап CSS с 8 подэтапами
- ✅ 5 практических заданий
- ✅ Визуальные демо CSS свойств
- ✅ Улучшенный дизайн интерфейса

**Чек-лист**:
```
[ ] CSS этап доступен после завершения HTML на 80%
[ ] 8 подэтапов CSS с теорией
[ ] 5 практических заданий CSS
[ ] LiveDemo показывает результат CSS кода
[ ] Прогресс-бар CSS имеет свой стиль (gradient-fill)
[ ] Иллюстрация CSS этапа отображается
```

### MVP Phase 4: JavaScript этап (1-2 недели)

**Цель**: Добавить третий этап (JavaScript)

#### Задачи:
- [ ] Создать материалы для Этапа 3 (JavaScript) - 12 подэтапов
- [ ] Создать 8 практических заданий для JS
- [ ] Добавить поддержку выполнения JS кода в браузере (sandbox)
- [ ] Реализовать интерактивные примеры JS
- [ ] Добавить упражнения по DOM манипуляции
- [ ] Создать задания с fetch и async/await

**Артефакты**:
- ✅ Этап JavaScript с 12 подэтапами
- ✅ 8 практических заданий
- ✅ Выполнение JS кода в безопасном окружении
- ✅ Интерактивные DOM примеры

### MVP Phase 5: Gamification и полировка (1 неделя)

**Цель**: Доработать геймификацию и UX

#### Задачи:
- [ ] Интегрировать XP и уровни с новым прогрессом
- [ ] Создать достижения V2 (привязанные к этапам)
- [ ] Добавить стрики (streak) за ежедневное обучение
- [ ] Реализовать уведомления о достижениях
- [ ] Добавить звуковые эффекты (опционально)
- [ ] Создать анимации награждений
- [ ] Провести UI/UX тестирование

**Артефакты**:
- ✅ Система XP и уровней работает
- ✅ 15+ достижений
- ✅ Streak система
- ✅ Плавные анимации

**Чек-лист**:
```
[ ] За завершение подэтапа начисляется XP
[ ] Уровень повышается при накоплении XP
[ ] Достижения выдаются за этапы
[ ] Streak увеличивается при ежедневных занятиях
[ ] Анимация при получении достижения
[ ] Звук при получении награды (если включено)
```

### Post-MVP: Дальнейшие улучшения

**Phase 6**: Advanced этап (React)
**Phase 7**: Финальные проекты
**Phase 8**: Социальные функции (поделиться прогрессом)
**Phase 9**: Сертификаты
**Phase 10**: Мобильное приложение

---

## ✅ ТРЕБОВАНИЯ К ДОСТУПНОСТИ И РАЗВЕРТЫВАНИЮ

### Требования к доступности (A11y)

#### Минимальные требования (WCAG 2.1 Level A)

1. **Клавиатурная навигация**
   - [ ] Все интерактивные элементы доступны с клавиатуры
   - [ ] Tab навигация работает логично
   - [ ] Focus visible для всех элементов
   - [ ] Escape закрывает модальные окна

2. **Семантическая разметка**
   - [ ] Правильные HTML теги (nav, main, section, article)
   - [ ] Heading hierarchy (h1 → h2 → h3)
   - [ ] Aria-labels для иконок и кнопок
   - [ ] Alt текст для изображений

3. **Цветовой контраст**
   - [ ] Контраст текста минимум 4.5:1 (AA)
   - [ ] Контраст UI элементов 3:1
   - [ ] Не полагаться только на цвет (использовать иконки/текст)

4. **Screen Reader поддержка**
   - [ ] Aria-live для динамических обновлений
   - [ ] Aria-expanded для раскрывающихся секций
   - [ ] Aria-current для текущего этапа
   - [ ] Skip links для быстрой навигации

**Пример доступного компонента**:
```jsx
<button
  aria-label="Перейти к следующему подэтапу"
  aria-disabled={isLocked}
  tabIndex={isLocked ? -1 : 0}
  onClick={handleNext}
>
  Далее <ArrowRight aria-hidden="true" />
</button>
```

### Требования к совместимости

#### Браузеры
- Chrome/Edge (последние 2 версии)
- Firefox (последние 2 версии)
- Safari (последние 2 версии)
- Мобильные браузеры: iOS Safari, Chrome Mobile

#### Устройства
- Десктоп: 1920x1080, 1440x900, 1366x768
- Планшет: 1024x768, 768x1024
- Мобильный: 375x667, 414x896, 360x640

#### Требования к производительности
- First Contentful Paint < 1.5s
- Time to Interactive < 3s
- Lighthouse Performance Score > 90
- Lighthouse A11y Score > 95

### Базовые требования к развертыванию

#### Развертывание на GitHub Pages (текущее)

**package.json scripts**:
```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "deploy": "gh-pages -d build",
    "predeploy": "npm run build"
  }
}
```

**Процесс**:
1. `npm run build` - создание production сборки
2. `npm run deploy` - публикация на GitHub Pages

#### Переменные окружения

**.env.example**:
```
REACT_APP_API_URL=https://api.groq.com/openai/v1/chat/completions
REACT_APP_VERSION=2.0.0
REACT_APP_ENVIRONMENT=production
```

#### Production checklist

```
[ ] Минификация JS/CSS
[ ] Tree-shaking неиспользуемого кода
[ ] Оптимизация изображений (WebP, lazy loading)
[ ] Service Worker для офлайн работы (опционально)
[ ] Gzip compression
[ ] Cache-Control headers
[ ] Error boundary для обработки ошибок
[ ] Аналитика (опционально)
[ ] Мониторинг ошибок (Sentry/LogRocket)
```

#### Docker (опционально, для будущего)

**Dockerfile**:
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**docker-compose.yml**:
```yaml
version: '3.8'
services:
  frontend:
    build: .
    ports:
      - "3000:80"
    environment:
      - NODE_ENV=production
```

---

## 📊 МЕТРИКИ УСПЕХА V2

### KPI запуска
- [ ] 100% миграция данных V1→V2 без потерь
- [ ] Время загрузки главной страницы < 2s
- [ ] 0 критических ошибок в консоли
- [ ] Lighthouse Score > 90 (Performance, A11y, Best Practices)
- [ ] Работа на всех целевых устройствах

### UX метрики
- [ ] Среднее время до первого завершенного подэтапа < 10 минут
- [ ] Completion rate этапа HTML > 70%
- [ ] Пользователи понимают систему блокировки (< 5% жалоб)
- [ ] NPS > 8 (если собираем фидбек)

### Обучающие метрики
- [ ] Средняя оценка за практические задания > 75%
- [ ] Процент пользователей, дошедших до CSS этапа > 50%
- [ ] Процент пользователей, дошедших до JavaScript > 30%

---

## 🔄 ПРОЦЕСС ОБНОВЛЕНИЯ МАТЕРИАЛОВ

### Добавление нового подэтапа

1. Создать файл материала: `src/data/v2/stages/stage-{name}/materials/{order}-{topic}.js`
2. Экспортировать объект с полями: topic, content, detailedContent, examples, keyPoints
3. Добавить в `substages.js` соответствующего этапа
4. (Опционально) Создать практическое задание в `practice/`
5. Обновить `estimatedHours` этапа
6. Протестировать на разных устройствах

### Добавление нового этапа

1. Создать папку `src/data/v2/stages/stage-{name}/`
2. Создать файлы: `index.js`, `metadata.js`, `substages.js`
3. Заполнить подпапки `materials/` и `practice/`
4. Добавить этап в `stagesConfig.js`
5. Создать дизайн в `STAGE_DESIGNS`
6. Обновить unlock criteria предыдущего этапа

---

## 📝 ЗАКЛЮЧЕНИЕ

Этот документ описывает полную архитектуру проекта V2.0.

**Следующие шаги**:
1. Ревью этого документа
2. Создание MIGRATION_GUIDE.md с детальными инструкциями
3. Начало разработки MVP Phase 1

**Вопросы для обсуждения**:
- Согласны ли с предложенной структурой этапов обучения?
- Нужно ли добавить дополнительные типы контента (видео, квизы)?
- Какие этапы приоритетнее для MVP?

---
