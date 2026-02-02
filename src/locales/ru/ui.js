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
  errors: {
    apiKeyNotFound: 'API ключ не найден! Создайте файл .env и добавьте: REACT_APP_GROQ_API_KEY=ваш-ключ',
    invalidApiKey: 'Неверный API ключ Groq',
    rateLimitExceeded: 'Превышен лимит запросов Groq',
    serverUnavailable: 'Сервер временно недоступен. Попробуйте позже.',
    apiError: 'Ошибка при обращении к Groq',
    invalidResponse: 'Некорректный ответ от API'
  }
};

export default ruUI;
