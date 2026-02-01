// src/App.jsx

import { useState } from 'react';
import { Header } from './components/Header/Header';
import { ChatView } from './components/Chat/ChatView';
import { HistoryView } from './components/History/HistoryView';
import { KnowledgeView } from './components/Knowledge/KnowledgeView';
import { useChat } from './hooks/useChat';
import { useTheme } from './hooks/useTheme';
import { useChatHistory } from './hooks/useChatHistory';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('chat');
  const { theme, toggleTheme } = useTheme();
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

  const handleLoadChat = (chatId) => {
    const chatMessages = loadChat(chatId);
    if (chatMessages) {
      loadMessages(chatMessages);
      setActiveTab('chat');
    }
  };

  const handleNewChat = () => {
    startNewChat();
    clearHistory();
  };

  return (
    <div className={`app ${theme === 'dark' ? 'dark' : ''}`}>
      <div
        className={`flex flex-col h-screen ${
          theme === 'dark'
            ? 'bg-gray-900'
            : 'bg-gradient-to-br from-blue-50 to-indigo-100'
        } transition-colors`}
      >
        {/* Header */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          {activeTab === 'chat' && (
            <ChatView
              messages={messages}
              loading={loading}
              onSend={sendMessage}
              onClear={handleNewChat}
              onRate={updateMessageRating}
              theme={theme}
            />
          )}

          {activeTab === 'history' && (
            <HistoryView
              chatHistory={chatHistory}
              onLoadChat={handleLoadChat}
              onDeleteChat={deleteChat}
              theme={theme}
            />
          )}

          {activeTab === 'knowledge' && <KnowledgeView theme={theme} />}
        </div>
      </div>
    </div>
  );
}

export default App;