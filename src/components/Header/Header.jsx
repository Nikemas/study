
import { Book, MessageSquare, Database, History } from 'lucide-react';
import { TabButton } from '../UI/TabButton';
import { ThemeToggle } from './ThemeToggle';

export const Header = ({ activeTab, setActiveTab, theme, onToggleTheme }) => {
  return (
    <div
      className={`${
        theme === 'dark'
          ? 'bg-gray-800 border-gray-700'
          : 'bg-white border-gray-200'
      } shadow-md border-b transition-colors`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg shadow-lg">
              <Book className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1
                className={`text-xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}
              >
                Образовательная платформа
              </h1>
              <p
                className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                AI-помощник по веб-разработке
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-2 items-center flex-wrap">
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />

            <TabButton
              active={activeTab === 'chat'}
              onClick={() => setActiveTab('chat')}
              icon={<MessageSquare className="w-4 h-4" />}
              label="Чат"
              theme={theme}
            />

            <TabButton
              active={activeTab === 'history'}
              onClick={() => setActiveTab('history')}
              icon={<History className="w-4 h-4" />}
              label="История"
              theme={theme}
            />

            <TabButton
              active={activeTab === 'knowledge'}
              onClick={() => setActiveTab('knowledge')}
              icon={<Database className="w-4 h-4" />}
              label="База знаний"
              theme={theme}
            />
          </div>
        </div>
      </div>
    </div>
  );
};