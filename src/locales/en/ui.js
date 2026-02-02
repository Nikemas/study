// src/locales/en/ui.js
// English UI translations

export default {
  header: {
    title: 'Educational Platform',
    subtitle: 'AI assistant for web development'
  },
  tabs: {
    chat: 'Chat',
    history: 'History',
    knowledge: 'Knowledge Base'
  },
  chat: {
    inputLabel: 'Enter your question',
    placeholder: 'Ask a question about the course...',
    send: 'Send',
    sendLabel: 'Send message',
    newChat: 'New chat',
    newChatLabel: 'Start a new chat',
    thinking: 'AI is thinking...',
    examples: 'Examples: "What is useState?", "How does flex work?", "Explain async/await"',
    userMessage: 'Your message',
    assistantMessage: 'Assistant response'
  },
  history: {
    title: 'Chat History',
    empty: 'Chat history is empty',
    emptyHint: 'Start a new chat and it will appear here',
    listLabel: 'Chat list',
    messages: 'messages',
    openChat: 'Open chat',
    deleteChat: 'Delete chat',
    confirmDelete: 'Confirm deletion',
    deleteHint: 'Click again to delete'
  },
  knowledge: {
    subtitle: 'Learn web development from basics to advanced topics',
    materialsLabel: 'Learning materials',
    noMaterials: 'No materials found',
    totalCourses: 'Total courses',
    totalMaterials: 'Materials',
    allCourses: 'All courses',
    filterLabel: 'Filter by category'
  },
  theme: {
    light: 'Light theme',
    dark: 'Dark theme',
    enableLight: 'Enable light theme',
    enableDark: 'Enable dark theme'
  },
  language: {
    select: 'Select language',
    current: 'Current language'
  },
  common: {
    loading: 'Loading...',
    error: 'Error',
    close: 'Close',
    copy: 'Copy',
    copied: 'Copied!'
  },
  errors: {
    apiKeyNotFound: 'API key not found! Create a .env file and add: REACT_APP_GROQ_API_KEY=your-key',
    invalidApiKey: 'Invalid Groq API key',
    rateLimitExceeded: 'Groq rate limit exceeded',
    serverUnavailable: 'Server temporarily unavailable. Please try again later.',
    apiError: 'Error connecting to Groq',
    invalidResponse: 'Invalid API response'
  }
};
