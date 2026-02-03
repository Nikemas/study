// src/App.jsx

import { useState, useCallback, lazy, Suspense } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';
import { GamificationProvider } from './contexts/GamificationContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { Header } from './components/Header/Header';
import { ToastContainer } from './components/UI/ToastContainer';
import { AchievementPopup } from './components/Gamification/AchievementPopup';
import { useChat } from './hooks/useChat';
import { useTheme } from './hooks/useTheme';
import { useChatHistory } from './hooks/useChatHistory';
import './App.css';

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

// Внутренний компонент приложения (использует все контексты)
function AppContent({ pendingAchievement, onAchievementClose }) {
  const [activeTab, setActiveTab] = useState('chat');
  const { theme } = useTheme();
  const {
    chatHistory,
    saveChat,
    loadChat,
    startNewChat,
    deleteChat
  } = useChatHistory();

  const {
    messages,
    loading,
    sendMessage,
    clearHistory,
    loadMessages,
    updateMessageRating
  } = useChat(saveChat);

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

  return (
    <div className={`app ${theme === 'dark' ? 'dark' : ''}`}>
      <div
        className={`flex flex-col h-screen ${
          theme === 'dark'
            ? 'bg-gray-900'
            : 'bg-gradient-to-br from-blue-50 to-indigo-100'
        } transition-colors`}
      >
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 overflow-hidden">
          <Suspense fallback={<LoadingFallback />}>
            {activeTab === 'chat' && (
              <ChatView
                messages={messages}
                loading={loading}
                onSend={sendMessage}
                onClear={handleNewChat}
                onRate={handleRate}
              />
            )}

            {activeTab === 'history' && (
              <HistoryView
                chatHistory={chatHistory}
                onLoadChat={handleLoadChat}
                onDeleteChat={deleteChat}
              />
            )}

            {activeTab === 'knowledge' && <KnowledgeView />}
          </Suspense>
        </main>
      </div>

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
    </GamificationProvider>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LanguageProvider>
          <ToastProvider>
            <AppWithGamification />
          </ToastProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
