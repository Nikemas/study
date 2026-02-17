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
      <div className="flex-1 overflow-y-auto w-full max-w-[1400px] mx-auto px-4 pb-10">
        <SectionHeader
          title={t('dashboard.title') || 'Dashboard'}
          subtitle={t('dashboard.subtitle') || 'Track your learning progress and jump back in.'}
          action={
            <Button variant="primary" onClick={onStartChat} className="rounded-2xl bg-[#f7a641] hover:bg-[#ffb24f] shadow-none">
              <MessageSquare className="w-4 h-4" />
              {t('dashboard.newChat') || 'New Chat'}
            </Button>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 rounded-3xl border border-white/10 bg-[#101a2f]/90 backdrop-blur-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-[#f7a641]" />
                <h3 className="text-[34px] font-bold text-white tracking-tight">{t('dashboard.progress') || 'Progress'}</h3>
              </div>
              <Badge variant="accent" className="bg-accent/20 text-accent border border-accent/30">{overallStats.overallProgress}%</Badge>
            </div>
            <ProgressBar value={overallStats.overallProgress} />
            <div className="grid grid-cols-3 gap-4 mt-6 text-sm">
              <div>
                <p className="text-white text-3xl font-semibold">{overallStats.materialsCompleted}/{overallStats.materialsTotal}</p>
                <p className="text-slate-300">{t('progress.materials')}</p>
              </div>
              <div>
                <p className="text-white text-3xl font-semibold">{overallStats.quizzesCompleted}/{overallStats.quizzesTotal}</p>
                <p className="text-slate-300">{t('progress.quizzes')}</p>
              </div>
              <div>
                <p className="text-white text-3xl font-semibold">{overallStats.overallProgress}%</p>
                <p className="text-slate-300">{t('progress.overall')}</p>
              </div>
            </div>
          </Card>

          <Card className="rounded-3xl border border-white/10 bg-[#101a2f]/90 backdrop-blur-md p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              <h3 className="text-[30px] font-bold text-white tracking-tight">{t('dashboard.actions') || 'Quick Actions'}</h3>
            </div>
            <Button variant="secondary" onClick={onOpenKnowledge} className="rounded-2xl border border-white/15 bg-[#0f1b32] text-white hover:bg-[#162442] justify-start px-5 py-4">
              <BookOpen className="w-4 h-4" />
              {t('dashboard.continue') || 'Continue Learning'}
            </Button>
            <Button variant="ghost" onClick={onOpenHistory} className="rounded-2xl border border-white/10 text-slate-200 hover:bg-white/10 justify-start px-5 py-4">
              <History className="w-4 h-4" />
              {t('dashboard.history') || 'View History'}
            </Button>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <Card className="lg:col-span-2 rounded-3xl border border-white/10 bg-[#101a2f]/90 backdrop-blur-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[32px] font-bold text-white tracking-tight">{t('dashboard.recentLessons') || 'Recent Lessons'}</h3>
              <Button variant="ghost" className="text-white hover:bg-white/10 rounded-xl" onClick={onOpenKnowledge}>{t('dashboard.openKnowledge') || 'Open Knowledge'}</Button>
            </div>
            {recentMaterials.length === 0 ? (
              <EmptyState
                title={t('dashboard.noMaterials') || 'No materials yet'}
                subtitle={t('dashboard.noMaterialsHint') || 'Start learning to see lessons here.'}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recentMaterials.map(material => (
                  <div key={material.id} className="p-4 rounded-2xl border border-white/10 bg-[#0c1730]/80">
                    <p className="text-sm font-semibold text-white mb-2">{material.topic}</p>
                    <p className="text-xs text-slate-300">{material.content}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card className="rounded-3xl border border-white/10 bg-[#101a2f]/90 backdrop-blur-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[30px] font-bold text-white tracking-tight">{t('dashboard.recentChats') || 'Recent Chats'}</h3>
              <Button variant="ghost" className="text-white hover:bg-white/10 rounded-xl" onClick={onOpenHistory}>{t('dashboard.openHistory') || 'Open History'}</Button>
            </div>
            {chatHistory.length === 0 ? (
              <EmptyState
                title={t('dashboard.noChats') || 'No chats yet'}
                subtitle={t('dashboard.noChatsHint') || 'Start a chat to see it here.'}
              />
            ) : (
              <div className="space-y-3">
                {chatHistory.slice(0, 3).map(chat => (
                  <div key={chat.id} className="border-b border-white/10 pb-2">
                    <p className="text-sm font-semibold text-white">{chat.title}</p>
                    <p className="text-xs text-slate-300">{chat.messages?.length || 0} {t('history.messages')}</p>
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
