import {
  mergeScores,
  finalizeAttempt,
  preValidateSubmission,
} from '../practiceEvaluationService';

describe('practiceEvaluationService', () => {
  test('mergeScores combines hidden and llm scores', () => {
    const hidden = {
      score: 80,
      checks: [
        { passed: true, weight: 20 },
        { passed: false, weight: 5 },
      ],
    };
    const llm = {
      criterionScores: {
        correctness: 30,
        code_quality: 18,
        edge_cases: 20,
        readability: 12,
      },
    };

    const result = mergeScores(hidden, llm);
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThanOrEqual(100);
  });

  test('finalizeAttempt marks passed at threshold', () => {
    const task = { maxAttempts: 3, passScore: 85 };
    const final = finalizeAttempt(1, task, 85);
    expect(final.passed).toBe(true);
    expect(final.status).toBe('passed');
  });

  test('finalizeAttempt blocks after max attempts', () => {
    const task = { maxAttempts: 3, passScore: 85 };
    const final = finalizeAttempt(3, task, 40);
    expect(final.passed).toBe(false);
    expect(final.status).toBe('attempts_exhausted');
  });

  test('preValidateSubmission rejects empty and unchanged starter', () => {
    const task = { starterCode: 'const a = 1;' };
    const empty = preValidateSubmission('', task);
    expect(empty.valid).toBe(false);

    const unchanged = preValidateSubmission('const a = 1;', task);
    expect(unchanged.valid).toBe(false);
  });
});

