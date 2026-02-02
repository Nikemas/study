// src/locales/ky/ui.js
// Kyrgyz UI translations (Кыргызча)

export default {
  header: {
    title: 'Билим берүү платформасы',
    subtitle: 'Веб-иштеп чыгуу боюнча AI жардамчы'
  },
  tabs: {
    chat: 'Чат',
    history: 'Тарых',
    knowledge: 'Билим базасы'
  },
  chat: {
    inputLabel: 'Суроону жазыңыз',
    placeholder: 'Курс боюнча суроо бериңиз...',
    send: 'Жөнөтүү',
    sendLabel: 'Билдирүү жөнөтүү',
    newChat: 'Жаңы чат',
    newChatLabel: 'Жаңы чат баштоо',
    thinking: 'AI ойлонууда...',
    examples: 'Мисалдар: "useState деген эмне?", "flex кантип иштейт?", "async/await түшүндүр"',
    userMessage: 'Сиздин билдирүү',
    assistantMessage: 'Жардамчынын жообу'
  },
  history: {
    title: 'Диалогдордун тарыхы',
    empty: 'Диалогдордун тарыхы бош',
    emptyHint: 'Жаңы диалог баштаңыз, ал бул жерде пайда болот',
    listLabel: 'Диалогдордун тизмеси',
    messages: 'билдирүү',
    openChat: 'Диалогду ачуу',
    deleteChat: 'Диалогду өчүрүү',
    confirmDelete: 'Өчүрүүнү ырастоо',
    deleteHint: 'Өчүрүү үчүн дагы бир жолу басыңыз'
  },
  knowledge: {
    subtitle: 'Веб-иштеп чыгууну негиздерден алдыңкы темаларга чейин үйрөнүңүз',
    materialsLabel: 'Окуу материалдары',
    noMaterials: 'Материалдар табылган жок',
    totalCourses: 'Жалпы курстар',
    totalMaterials: 'Материалдар',
    allCourses: 'Бардык курстар',
    filterLabel: 'Категория боюнча чыпкалоо'
  },
  theme: {
    light: 'Жарык тема',
    dark: 'Караңгы тема',
    enableLight: 'Жарык теманы күйгүзүү',
    enableDark: 'Караңгы теманы күйгүзүү'
  },
  language: {
    select: 'Тилди тандоо',
    current: 'Учурдагы тил'
  },
  common: {
    loading: 'Жүктөлүүдө...',
    error: 'Ката',
    close: 'Жабуу',
    copy: 'Көчүрүү',
    copied: 'Көчүрүлдү!'
  },
  apiKey: {
    title: 'API жөндөөлөрү',
    settings: 'API ачкыч жөндөөлөрү',
    description: 'AI жардамчысын колдонуу үчүн Groq API ачкычыңызды киргизиңиз.',
    placeholder: 'gsk_...',
    save: 'Сактоо',
    clear: 'Тазалоо',
    showKey: 'Ачкычты көрсөтүү',
    hideKey: 'Ачкычты жашыруу',
    getKeyText: 'Ачкычты алуу үчүн'
  },
  errors: {
    apiKeyNotFound: 'API ачкычы табылган жок! Баш жактагы тиштүү сөлөкөттү басып, Groq API ачкычыңызды киргизиңиз.',
    invalidApiKey: 'Туура эмес Groq API ачкычы',
    rateLimitExceeded: 'Groq суроо-талап чеги ашты',
    serverUnavailable: 'Сервер убактылуу жеткиликсиз. Кийинчерээк кайра аракет кылыңыз.',
    apiError: 'Groq менен байланышуу катасы',
    invalidResponse: 'API жооп туура эмес'
  },
  quiz: {
    title: 'Тест',
    takeQuiz: 'Тестти тапшыруу',
    question: 'Суроо',
    of: 'ичинен',
    checkAnswer: 'Текшерүү',
    next: 'Кийинки',
    finish: 'Бүтүрүү',
    correct: 'Туура!',
    incorrect: 'Туура эмес',
    correctAnswer: 'Туура жооп',
    results: 'Тест жыйынтыктары',
    score: 'Сиздин жыйынтык',
    passed: 'Тест өттү!',
    failed: 'Кайра аракет кылыңыз',
    tryAgain: 'Кайра баштоо',
    close: 'Жабуу'
  },
  progress: {
    title: 'Прогресс',
    completed: 'Аяктады',
    materials: 'Материалдар',
    quizzes: 'Тесттер',
    overall: 'Жалпы прогресс',
    markComplete: 'Окулду деп белгилөө',
    markIncomplete: 'Белгини алып салуу'
  }
};
