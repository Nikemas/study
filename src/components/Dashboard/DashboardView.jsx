import PropTypes from 'prop-types';
import { BookOpen, MessageSquare, History, Trophy, Sparkles } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Card } from '../UI/Card';
import { Button } from '../UI/Button';
import { Badge } from '../UI/Badge';
import { ProgressBar } from '../UI/ProgressBar';
import { SectionHeader } from '../UI/SectionHeader';
import { EmptyState } from '../UI/EmptyState';
import { getOverallStats } from '../../services/progressService';
import { getAllMaterials, getAllQuizIds } from '../../data/courseData';

export const DashboardView = ({
  chatHistory,
  onStartChat,
  onOpenKnowledge,
  onOpenHistory
}) => {
  const { t, courseData } = useLanguage();
  const allMaterials = getAllMaterials();
  const overallStats = getOverallStats(allMaterials, getAllQuizIds());

  const recentMaterials = courseData?.materials
    ? Object.values(courseData.materials).flat().slice(0, 3)
    : [];

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto w-full max-w-6xl mx-auto px-4 pb-10">
        <SectionHeader
          title={t('dashboard.title') || 'Dashboard'}
          subtitle={t('dashboard.subtitle') || 'Track your learning progress and jump back in.'}
          action={
            <Button variant="primary" onClick={onStartChat}>
              <MessageSquare className="w-4 h-4" />
              {t('dashboard.newChat') || 'New Chat'}
            </Button>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">{t('dashboard.progress') || 'Progress'}</h3>
              </div>
              <Badge variant="accent">{overallStats.overallProgress}%</Badge>
            </div>
            <ProgressBar value={overallStats.overallProgress} />
            <div className="grid grid-cols-3 gap-4 mt-4 text-sm text-muted">
              <div>
                <p className="text-text font-semibold">{overallStats.materialsCompleted}/{overallStats.materialsTotal}</p>
                <p>{t('progress.materials')}</p>
              </div>
              <div>
                <p className="text-text font-semibold">{overallStats.quizzesCompleted}/{overallStats.quizzesTotal}</p>
                <p>{t('progress.quizzes')}</p>
              </div>
              <div>
                <p className="text-text font-semibold">{overallStats.overallProgress}%</p>
                <p>{t('progress.overall')}</p>
              </div>
            </div>
          </Card>

          <Card className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              <h3 className="text-lg font-semibold">{t('dashboard.actions') || 'Quick Actions'}</h3>
            </div>
            <Button variant="secondary" onClick={onOpenKnowledge}>
              <BookOpen className="w-4 h-4" />
              {t('dashboard.continue') || 'Continue Learning'}
            </Button>
            <Button variant="ghost" onClick={onOpenHistory}>
              <History className="w-4 h-4" />
              {t('dashboard.history') || 'View History'}
            </Button>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <Card className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{t('dashboard.recentLessons') || 'Recent Lessons'}</h3>
              <Button variant="ghost" onClick={onOpenKnowledge}>{t('dashboard.openKnowledge') || 'Open Knowledge'}</Button>
            </div>
            {recentMaterials.length === 0 ? (
              <EmptyState
                title={t('dashboard.noMaterials') || 'No materials yet'}
                subtitle={t('dashboard.noMaterialsHint') || 'Start learning to see lessons here.'}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recentMaterials.map(material => (
                  <div key={material.id} className="p-4 rounded-md border border-border bg-border/10">
                    <p className="text-sm font-semibold text-text mb-2">{material.topic}</p>
                    <p className="text-xs text-muted">{material.content}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{t('dashboard.recentChats') || 'Recent Chats'}</h3>
              <Button variant="ghost" onClick={onOpenHistory}>{t('dashboard.openHistory') || 'Open History'}</Button>
            </div>
            {chatHistory.length === 0 ? (
              <EmptyState
                title={t('dashboard.noChats') || 'No chats yet'}
                subtitle={t('dashboard.noChatsHint') || 'Start a chat to see it here.'}
              />
            ) : (
              <div className="space-y-3">
                {chatHistory.slice(0, 3).map(chat => (
                  <div key={chat.id} className="border-b border-border pb-2">
                    <p className="text-sm font-semibold text-text">{chat.title}</p>
                    <p className="text-xs text-muted">{chat.messages?.length || 0} {t('history.messages')}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

DashboardView.propTypes = {
  chatHistory: PropTypes.array.isRequired,
  onStartChat: PropTypes.func.isRequired,
  onOpenKnowledge: PropTypes.func.isRequired,
  onOpenHistory: PropTypes.func.isRequired
};
