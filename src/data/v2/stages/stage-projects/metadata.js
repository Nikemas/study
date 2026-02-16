export default {
  id: 'projects',
  order: 5,
  title: 'Финальные проекты',
  description: 'Создайте реальные проекты для портфолио',
  icon: '🏆',
  color: 'bg-amber-500',
  estimatedHours: 40,
  prerequisites: ['html', 'css', 'javascript', 'advanced'],
  unlockCriteria: {
    previousStageCompletion: 100,
    minimumScore: 80
  }
};
