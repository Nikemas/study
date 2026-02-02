// src/App.jsx

import { useState, useCallback, useMemo, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { Header } from './components/Header/Header';
import { useChat } from './hooks/useChat';
import { useTheme } from './hooks/useTheme';
import { useChatHistory } from './hooks/useChatHistory';
import './App.css';

// Варианты анимации для переходов между вкладками
const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
};

const pageTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.2
};

// Lazy loaded компоненты
const ChatView = lazy(() => import('./components/Chat/ChatView').then(m => ({ default: m.ChatView })));
const HistoryView = lazy(() => import('./components/History/HistoryView').then(m => ({ default: m.HistoryView })));
const KnowledgeView = lazy(() => import('./components/Knowledge/KnowledgeView').then(m => ({ default: m.KnowledgeView })));

// Компонент загрузки
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-full">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
  </div>
);

function AppContent() {
  const [activeTab, setActiveTab] = useState('chat');
  const [progressKey, setProgressKey] = useState(0);
  const [currentCategory, setCurrentCategory] = useState('all');
  const { theme } = useTheme();
  const { language, courseData, t } = useLanguage();
  const {
    chatHistory,
    saveChat,
    loadChat,
    startNewChat,
    deleteChat
  } = useChatHistory();

  const contextOptions = useMemo(() => ({
    activeCategory: currentCategory
  }), [currentCategory]);

  const {
    messages,
    loading,
    sendMessage,
    clearHistory,
    loadMessages,
    updateMessageRating
  } = useChat(saveChat, language, courseData?.initialMessage, t, contextOptions);

  const handleLoadChat = useCallback((chatId) => {
    const chatMessages = loadChat(chatId);
    if (chatMessages) {
      loadMessages(chatMessages);
      setActiveTab('chat');
    }
  }, [loadChat, loadMessages]);

  const handleNewChat = useCallback(() => {
    startNewChat();
    clearHistory();
  }, [startNewChat, clearHistory]);

  const handleRate = useCallback((messageId, rating) => {
    updateMessageRating(messageId, rating);
  }, [updateMessageRating]);

  const handleProgressChange = useCallback(() => {
    setProgressKey(prev => prev + 1);
  }, []);

  const handleCategoryChange = useCallback((category) => {
    setCurrentCategory(category);
  }, []);

  return (
    <div className={`app ${theme === 'dark' ? 'dark' : ''}`}>
      <div
        className={`flex flex-col h-screen ${
          theme === 'dark'
            ? 'bg-gray-900'
            : 'bg-gradient-to-br from-blue-50 to-indigo-100'
        } transition-colors`}
      >
        <Header activeTab={activeTab} setActiveTab={setActiveTab} progressKey={progressKey} />

        <main className="flex-1 overflow-hidden">
          <Suspense fallback={<LoadingFallback />}>
            <AnimatePresence mode="wait">
              {activeTab === 'chat' && (
                <motion.div
                  key="chat"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                  transition={pageTransition}
                  className="h-full"
                >
                  <ChatView
                    messages={messages}
                    loading={loading}
                    onSend={sendMessage}
                    onRate={handleRate}
                  />
                </motion.div>
              )}

              {activeTab === 'history' && (
                <motion.div
                  key="history"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                  transition={pageTransition}
                  className="h-full"
                >
                  <HistoryView
                    chatHistory={chatHistory}
                    onLoadChat={handleLoadChat}
                    onDeleteChat={deleteChat}
                  />
                </motion.div>
              )}

              {activeTab === 'knowledge' && (
                <motion.div
                  key="knowledge"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                  transition={pageTransition}
                  className="h-full"
                >
                  <KnowledgeView
                    onCategoryChange={handleCategoryChange}
                    onProgressChange={handleProgressChange}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </Suspense>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
