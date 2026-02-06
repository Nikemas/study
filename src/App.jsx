// src/App.jsx

import { useState, useCallback, useMemo, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { ToastProvider } from './contexts/ToastContext';
import { GamificationProvider } from './contexts/GamificationContext';
import { Header } from './components/Header/Header';
import { MobileNavigation } from './components/Header/MobileNavigation';
import { ToastContainer } from './components/UI/ToastContainer';
import { AchievementPopup } from './components/Gamification/AchievementPopup';
import { useChat } from './hooks/useChat';
import { useTheme } from './hooks/useTheme';
import { useChatHistory } from './hooks/useChatHistory';
import { OnboardingModal } from './components/Onboarding/OnboardingModal';
import { SettingsProvider } from './contexts/SettingsContext';
import { AppShell } from './components/Layout/AppShell';
import { TABS } from './constants';
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
const DashboardView = lazy(() => import('./components/Dashboard/DashboardView').then(m => ({ default: m.DashboardView })));

// Компонент загрузки
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-full">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
  </div>
);

// Внутренний компонент приложения (использует все контексты)
function AppContent({ pendingAchievement, onAchievementClose }) {
  const [activeTab, setActiveTab] = useState(TABS.DASHBOARD);
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
      setActiveTab(TABS.CHAT);
    }
  }, [loadChat, loadMessages]);

  const handleNewChat = useCallback(() => {
    startNewChat();
    clearHistory();
    setActiveTab(TABS.CHAT);
  }, [startNewChat, clearHistory]);

  const handleRate = useCallback((messageId, rating) => {
    updateMessageRating(messageId, rating);
  }, [updateMessageRating]);

  const handleCategoryChange = useCallback((category) => {
    setCurrentCategory(category);
  }, []);

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <AppShell
        header={<Header activeTab={activeTab} setActiveTab={setActiveTab} onNewChat={handleNewChat} />}
        mobileNav={<MobileNavigation activeTab={activeTab} setActiveTab={setActiveTab} />}
      >
        <Suspense fallback={<LoadingFallback />}>
          <AnimatePresence mode="wait">
              {activeTab === TABS.DASHBOARD && (
                <motion.div
                  key="dashboard"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageVariants}
                  transition={pageTransition}
                  className="h-full"
                >
                  <DashboardView
                    chatHistory={chatHistory}
                    onStartChat={handleNewChat}
                    onOpenKnowledge={() => setActiveTab(TABS.KNOWLEDGE)}
                    onOpenHistory={() => setActiveTab(TABS.HISTORY)}
                  />
                </motion.div>
              )}
              {activeTab === TABS.CHAT && (
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

              {activeTab === TABS.HISTORY && (
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

              {activeTab === TABS.KNOWLEDGE && (
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
                  />
                </motion.div>
              )}
          </AnimatePresence>
        </Suspense>
      </AppShell>

      {/* Toast уведомления */}
      <ToastContainer />

      {/* Popup достижений */}
      {pendingAchievement && (
        <AchievementPopup
          achievement={pendingAchievement}
          onClose={onAchievementClose}
        />
      )}
    </div>
  );
}

// Обертка с GamificationProvider для управления состоянием достижений
function AppWithGamification() {
  const [pendingAchievement, setPendingAchievement] = useState(null);

  const handleAchievementUnlock = useCallback((achievement) => {
    setPendingAchievement(achievement);
  }, []);

  const handleAchievementClose = useCallback(() => {
    setPendingAchievement(null);
  }, []);

  return (
    <GamificationProvider onAchievementUnlock={handleAchievementUnlock}>
      <AppContent
        pendingAchievement={pendingAchievement}
        onAchievementClose={handleAchievementClose}
      />
      <OnboardingModal />
    </GamificationProvider>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <SettingsProvider>
        <ThemeProvider>
          <LanguageProvider>
            <ToastProvider>
              <AppWithGamification />
            </ToastProvider>
          </LanguageProvider>
        </ThemeProvider>
      </SettingsProvider>
    </ErrorBoundary>
  );
}

export default App;
