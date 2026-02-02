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
  errors: {
    apiKeyNotFound: 'API ачкычы табылган жок! .env файлын түзүп, кошуңуз: REACT_APP_GROQ_API_KEY=сиздин-ачкыч',
    invalidApiKey: 'Туура эмес Groq API ачкычы',
    rateLimitExceeded: 'Groq суроо-талап чеги ашты',
    serverUnavailable: 'Сервер убактылуу жеткиликсиз. Кийинчерээк кайра аракет кылыңыз.',
    apiError: 'Groq менен байланышуу катасы',
    invalidResponse: 'API жооп туура эмес'
  }
};
