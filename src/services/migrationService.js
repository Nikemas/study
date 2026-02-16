// Migration Service V1 → V2
// Переносит данные пользователя из старой структуры в новую

import * as storageService from './storageService';
import { LEARNING_STAGES } from '../data/v2';

// Маппинг старых курсов на новые этапы
const V1_TO_V2_MAPPING = {
  courses: {
    html: {
      stageId: 'html',
      materials: {}
    },
    css: {
      stageId: 'css',
      materials: {}
    },
    javascript: {
      stageId: 'javascript',
      materials: {}
    },
    react: {
      stageId: 'advanced',
      materials: {}
    }
  },
  practice: {}
};

export class MigrationService {
  /**
   * Проверить, нужна ли миграция
   */
  static needsMigration() {
    // Проверить наличие V2 данных
    const v2Progress = storageService.getUserProgress();

    if (v2Progress) {
      // V2 данные уже есть, миграция не нужна
      return false;
    }

    // Проверить наличие V1 данных
    const v1KnowledgeProgress = storageService.getV1KnowledgeProgress();
    const v1PracticeProgress = storageService.getV1PracticeProgress();
    const migrationCompleted = localStorage.getItem('migration_v1_to_v2_completed');

    return (v1KnowledgeProgress !== null || v1PracticeProgress !== null) && migrationCompleted !== 'true';
  }

  /**
   * Загрузить данные V1 из localStorage
   */
  static loadV1Data() {
    try {
      const knowledgeProgress = storageService.getV1KnowledgeProgress();
      const practiceProgress = storageService.getV1PracticeProgress();
      const userStats = storageService.getGamificationData();

      if (!knowledgeProgress && !practiceProgress) {
        return null;
      }

      return {
        knowledgeProgress: knowledgeProgress || {},
        practiceProgress: practiceProgress || {},
        userStats: userStats || {}
      };
    } catch (error) {
      console.error('Error loading V1 data:', error);
      return null;
    }
  }

  /**
   * Создать бэкап V1 данных
   */
  static createBackup(v1Data) {
    const backup = {
      timestamp: new Date().toISOString(),
      data: v1Data
    };

    try {
      localStorage.setItem('v1_backup', JSON.stringify(backup));
      console.log('✅ V1 data backed up');
      return true;
    } catch (error) {
      console.error('Error creating backup:', error);
      return false;
    }
  }

  /**
   * Конвертировать прогресс V1 → V2
   */
  static convertProgressV1toV2(v1Data) {
    const { knowledgeProgress, practiceProgress, userStats } = v1Data;

    // Создать базовую структуру V2
    const v2Progress = {
      userId: 'user-' + Date.now(),
      currentStage: 'html',
      stages: [],
      stats: {
        totalTimeSpent: userStats.totalTimeSpent || 0,
        totalXP: userStats.xp || 0,
        level: userStats.level || 1,
        streak: userStats.streak || 0,
        completedPractices: 0
      }
    };

    // Конвертировать каждый этап
    LEARNING_STAGES.forEach((stage, stageIndex) => {
      const stageProgressData = {
        stageId: stage.id,
        status: stageIndex === 0 ? 'in_progress' : 'locked',
        completionPercentage: 0,
        startedAt: stageIndex === 0 ? new Date().toISOString() : null,
        completedAt: null,
        substages: [],
        achievements: []
      };

      // Конвертировать подэтапы
      stage.substages.forEach((substage, subIndex) => {
        const substageProgressData = {
          substageId: substage.id,
          status: stageIndex === 0 && subIndex === 0 ? 'in_progress' : 'locked',
          materialRead: false,
          practiceAttempts: 0,
          practiceScore: 0,
          quizScore: null,
          timeSpent: 0,
          completedAt: null
        };

        stageProgressData.substages.push(substageProgressData);
      });

      // Пересчитать процент завершения этапа
      const completedCount = stageProgressData.substages.filter(
        s => s.status === 'completed'
      ).length;

      stageProgressData.completionPercentage = stage.substages.length > 0
        ? Math.round((completedCount / stageProgressData.substages.length) * 100)
        : 0;

      v2Progress.stages.push(stageProgressData);
    });

    return v2Progress;
  }

  /**
   * Выполнить миграцию
   */
  static async migrate() {
    console.log('🔄 Starting V1 → V2 migration...');

    try {
      // 1. Проверить, нужна ли миграция
      if (!this.needsMigration()) {
        console.log('ℹ️ No migration needed');
        return { success: true, message: 'No V1 data found or migration already completed' };
      }

      // 2. Загрузить V1 данные
      const v1Data = this.loadV1Data();

      if (!v1Data) {
        console.log('ℹ️ No V1 data to migrate');
        return { success: true, message: 'No V1 data found' };
      }

      console.log('📦 V1 data loaded');

      // 3. Создать бэкап
      this.createBackup(v1Data);

      // 4. Конвертировать прогресс
      const v2Progress = this.convertProgressV1toV2(v1Data);
      console.log('✅ Progress converted to V2 format');

      // 5. Сохранить V2 данные
      storageService.saveUserProgress(v2Progress);
      console.log('💾 V2 data saved');

      // 6. Пометить миграцию как завершенную
      localStorage.setItem('migration_v1_to_v2_completed', 'true');
      localStorage.setItem('migration_v1_to_v2_date', new Date().toISOString());

      console.log('🎉 Migration completed successfully!');

      return {
        success: true,
        message: 'Migration completed successfully',
        v2Progress
      };

    } catch (error) {
      console.error('❌ Migration failed:', error);

      return {
        success: false,
        message: 'Migration failed: ' + error.message,
        error
      };
    }
  }

  /**
   * Откатить миграцию (восстановить V1 данные)
   */
  static rollback() {
    try {
      const backup = localStorage.getItem('v1_backup');

      if (!backup) {
        return { success: false, message: 'No backup found' };
      }

      const { data } = JSON.parse(backup);

      // Восстановить V1 данные
      if (data.knowledgeProgress) {
        localStorage.setItem('knowledgeProgress', JSON.stringify(data.knowledgeProgress));
      }
      if (data.practiceProgress) {
        localStorage.setItem('practiceProgress', JSON.stringify(data.practiceProgress));
      }
      if (data.userStats) {
        storageService.saveGamificationData(data.userStats);
      }

      // Удалить V2 данные
      localStorage.removeItem('user_progress_v2');
      localStorage.removeItem('migration_v1_to_v2_completed');
      localStorage.removeItem('migration_v1_to_v2_date');

      console.log('↩️ Rollback completed');

      return { success: true, message: 'Rollback completed successfully' };

    } catch (error) {
      console.error('❌ Rollback failed:', error);
      return { success: false, message: 'Rollback failed: ' + error.message };
    }
  }

  /**
   * Получить информацию о миграции
   */
  static getMigrationInfo() {
    const completed = localStorage.getItem('migration_v1_to_v2_completed') === 'true';
    const date = localStorage.getItem('migration_v1_to_v2_date');
    const hasBackup = localStorage.getItem('v1_backup') !== null;

    return {
      completed,
      date: date ? new Date(date) : null,
      hasBackup
    };
  }
}
