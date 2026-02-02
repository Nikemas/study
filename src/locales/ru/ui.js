// src/locales/ru/ui.js
// Русские переводы интерфейса

const ruUI = {
  header: {
    title: 'Образовательная платформа',
    subtitle: 'AI-помощник по веб-разработке'
  },
  tabs: {
    chat: 'Чат',
    history: 'История',
    knowledge: 'База знаний'
  },
  chat: {
    inputLabel: 'Введите ваш вопрос',
    placeholder: 'Задайте вопрос по курсу...',
    send: 'Отправить',
    sendLabel: 'Отправить сообщение',
    newChat: 'Новый диалог',
    newChatLabel: 'Начать новый диалог',
    thinking: 'AI думает...',
    examples: 'Примеры: "Что такое useState?", "Как работает flex?", "Объясни async/await"',
    userMessage: 'Ваше сообщение',
    assistantMessage: 'Ответ ассистента'
  },
  history: {
    title: 'История диалогов',
    empty: 'История диалогов пуста',
    emptyHint: 'Начните новый диалог, и он появится здесь',
    listLabel: 'Список диалогов',
    messages: 'сообщений',
    openChat: 'Открыть диалог',
    deleteChat: 'Удалить диалог',
    confirmDelete: 'Подтвердить удаление',
    deleteHint: 'Нажмите ещё раз для удаления'
  },
  knowledge: {
    subtitle: 'Изучайте веб-разработку от основ до продвинутых тем',
    materialsLabel: 'Учебные материалы',
    noMaterials: 'Материалы не найдены',
    totalCourses: 'Всего курсов',
    totalMaterials: 'Материалов',
    allCourses: 'Все курсы',
    filterLabel: 'Фильтр по категориям'
  },
  theme: {
    light: 'Светлая тема',
    dark: 'Тёмная тема',
    enableLight: 'Включить светлую тему',
    enableDark: 'Включить тёмную тему'
  },
  language: {
    select: 'Выбрать язык',
    current: 'Текущий язык'
  },
  common: {
    loading: 'Загрузка...',
    error: 'Ошибка',
    close: 'Закрыть',
    copy: 'Скопировать',
    copied: 'Скопировано!'
  },
  apiKey: {
    title: 'Настройки API',
    settings: 'Настройки API ключа',
    description: 'Введите ваш Groq API ключ для работы AI-ассистента.',
    placeholder: 'gsk_...',
    save: 'Сохранить',
    clear: 'Очистить',
    showKey: 'Показать ключ',
    hideKey: 'Скрыть ключ',
    getKeyText: 'Получить ключ можно на'
  },
  errors: {
    apiKeyNotFound: 'API ключ не найден! Нажмите на шестерёнку в шапке и введите ваш Groq API ключ.',
    invalidApiKey: 'Неверный API ключ Groq',
    rateLimitExceeded: 'Превышен лимит запросов Groq',
    serverUnavailable: 'Сервер временно недоступен. Попробуйте позже.',
    apiError: 'Ошибка при обращении к Groq',
    invalidResponse: 'Некорректный ответ от API'
  },
  quiz: {
    title: 'Тест',
    takeQuiz: 'Пройти тест',
    question: 'Вопрос',
    of: 'из',
    checkAnswer: 'Проверить',
    next: 'Далее',
    finish: 'Завершить',
    correct: 'Правильно!',
    incorrect: 'Неправильно',
    correctAnswer: 'Правильный ответ',
    results: 'Результаты теста',
    score: 'Ваш результат',
    passed: 'Тест пройден!',
    failed: 'Попробуйте ещё раз',
    tryAgain: 'Пройти заново',
    close: 'Закрыть'
  },
  progress: {
    title: 'Прогресс',
    completed: 'Завершено',
    materials: 'Материалы',
    quizzes: 'Тесты',
    overall: 'Общий прогресс',
    markComplete: 'Отметить как прочитанное',
    markIncomplete: 'Отменить отметку'
  }
};

export default ruUI;
