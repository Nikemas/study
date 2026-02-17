import {
  submitPracticeAttempt,
  getPracticeAttempts,
  evaluateStageCompletion,
  saveQuizResult,
  resetProgress,
} from '../progressService';

describe('progressService practice integration', () => {
  beforeEach(() => {
    localStorage.clear();
    resetProgress();
  });

  test('stage is not completed without practice', () => {
    saveQuizResult('quiz_python', 5, 5);
    expect(evaluateStageCompletion('python')).toBe(false);
  });

  test('stage is completed with quiz and passed practice', () => {
    saveQuizResult('quiz_python', 5, 5);
    submitPracticeAttempt('python', 'task_python_core_1', 'def validate_user():\n  return {"ok": True, "errors": []}', {
      finalScore: 90,
      feedback: { summary: 'ok', criterionScores: {}, issues: [], hints: [] },
    });
    expect(evaluateStageCompletion('python')).toBe(true);
  });

  test('attempt history is persisted', () => {
    submitPracticeAttempt('python', 'task_python_core_1', 'pass', {
      finalScore: 10,
      feedback: { summary: 'bad', criterionScores: {}, issues: ['x'], hints: ['y'] },
    });
    const attempts = getPracticeAttempts('python', 'task_python_core_1');
    expect(attempts).toHaveLength(1);
    expect(attempts[0].score).toBe(10);
  });
});

