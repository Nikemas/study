import { AI_CONFIG } from '../config/aiConfig';
import { createEvaluatorSystemPrompt } from '../config/systemPrompt';
import { getGroqApiKey } from './storageService';

const MIN_CODE_LENGTH = 20;

const DEFAULT_EVALUATION = {
  criterionScores: {
    correctness: 0,
    code_quality: 0,
    edge_cases: 0,
    readability: 0,
  },
  issues: [],
  hints: [],
  summary: 'Evaluation fallback was used because AI response was invalid.',
  confidence: 0.4,
};

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

const toNumber = (value) => {
  const num = Number(value);
  return Number.isFinite(num) ? num : 0;
};

const extractJson = (content) => {
  if (!content || typeof content !== 'string') return null;
  const start = content.indexOf('{');
  const end = content.lastIndexOf('}');
  if (start === -1 || end === -1 || end <= start) return null;
  const candidate = content.slice(start, end + 1);
  try {
    return JSON.parse(candidate);
  } catch (error) {
    return null;
  }
};

export const preValidateSubmission = (code, task) => {
  const trimmed = (code || '').trim();
  const errors = [];

  if (!trimmed) errors.push('Submission is empty.');
  if (trimmed.length < MIN_CODE_LENGTH) errors.push('Submission is too short.');

  const forbiddenPatterns = ['TODO', 'FIXME'];
  forbiddenPatterns.forEach((pattern) => {
    if (trimmed.includes(pattern)) {
      errors.push(`Forbidden placeholder found: ${pattern}`);
    }
  });

  if (task?.starterCode && trimmed === task.starterCode.trim()) {
    errors.push('Starter code was submitted without changes.');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
};

export const runHiddenChecks = (code, task) => {
  const checks = task?.hiddenChecks || [];
  const source = code || '';

  const results = checks.map((check) => {
    let passed = false;
    if (check.type === 'must_contain') {
      passed = source.includes(check.rule);
    } else if (check.type === 'must_not_contain') {
      passed = !source.includes(check.rule);
    } else if (check.type === 'regex') {
      passed = new RegExp(check.rule, 'i').test(source);
    } else if (check.type === 'structure') {
      passed = source.toLowerCase().includes(String(check.rule).toLowerCase());
    }

    return {
      id: check.id,
      passed,
      weight: check.weight || 0,
      type: check.type,
      rule: check.rule,
    };
  });

  const totalWeight = results.reduce((sum, item) => sum + item.weight, 0);
  const passedWeight = results
    .filter((item) => item.passed)
    .reduce((sum, item) => sum + item.weight, 0);
  const score = totalWeight > 0 ? Math.round((passedWeight / totalWeight) * 100) : 0;

  return {
    checks: results,
    score,
  };
};

export const buildEvaluationPrompt = (task, code, hiddenCheckResult, language = 'ru') => {
  const checksDigest = hiddenCheckResult.checks
    .map((item) => `${item.id}: ${item.passed ? 'pass' : 'fail'} (${item.type})`)
    .join('\n');

  return `Language: ${language}
Task title: ${task.title}
Scenario: ${task.scenario}
Requirements:
${task.requirements.map((item, idx) => `${idx + 1}. ${item}`).join('\n')}

Rubric max:
${task.rubric.map((row) => `${row.id}: ${row.maxScore}`).join('\n')}

Hidden checks (already computed):
${checksDigest}

Student submission:
\`\`\`
${code}
\`\`\`
`;
};

const normalizeAiEvaluation = (raw) => {
  const parsed = extractJson(raw);
  if (!parsed || typeof parsed !== 'object') return null;

  const criterionScores = parsed.criterionScores || {};
  const normalized = {
    criterionScores: {
      correctness: toNumber(criterionScores.correctness),
      code_quality: toNumber(criterionScores.code_quality),
      edge_cases: toNumber(criterionScores.edge_cases),
      readability: toNumber(criterionScores.readability),
    },
    issues: Array.isArray(parsed.issues) ? parsed.issues.slice(0, 8) : [],
    hints: Array.isArray(parsed.hints) ? parsed.hints.slice(0, 8) : [],
    summary: typeof parsed.summary === 'string' ? parsed.summary : '',
    confidence: clamp(toNumber(parsed.confidence), 0, 1),
  };

  return normalized;
};

export const evaluateWithLLM = async (prompt, language = 'ru') => {
  const apiKey = getGroqApiKey();
  if (!apiKey) {
    throw new Error('errors.apiKeyNotFound');
  }

  const response = await fetch(AI_CONFIG.apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: AI_CONFIG.model,
      messages: [
        { role: 'system', content: createEvaluatorSystemPrompt(language) },
        { role: 'user', content: prompt },
      ],
      max_tokens: Math.min(AI_CONFIG.maxTokens, 700),
      temperature: 0.2,
    }),
  });

  if (!response.ok) {
    throw new Error('errors.apiError');
  }

  const data = await response.json();
  const content = data?.choices?.[0]?.message?.content || '';
  const normalized = normalizeAiEvaluation(content);

  if (!normalized) {
    return { ...DEFAULT_EVALUATION, summary: 'AI evaluation response could not be parsed.' };
  }

  return normalized;
};

export const mergeScores = (hiddenCheckResult, llmEvaluation) => {
  const hiddenScore = clamp(toNumber(hiddenCheckResult?.score), 0, 100);
  const rubricTotal = Object.values(llmEvaluation.criterionScores || {}).reduce((sum, n) => sum + toNumber(n), 0);
  const rubricScore = clamp(rubricTotal, 0, 100);

  const combined = Math.round(hiddenScore * 0.55 + rubricScore * 0.45);

  const failedRequiredCount = (hiddenCheckResult?.checks || []).filter((c) => !c.passed && c.weight >= 15).length;
  const penalty = failedRequiredCount * 5;

  return clamp(combined - penalty, 0, 100);
};

export const buildLearnerFeedback = (task, hiddenCheckResult, llmEvaluation, finalScore) => {
  const hiddenFailures = (hiddenCheckResult?.checks || [])
    .filter((item) => !item.passed)
    .map((item) => `Failed hidden check: ${item.id}`);

  const issues = [...hiddenFailures, ...(llmEvaluation.issues || [])].slice(0, 10);
  const hints = llmEvaluation.hints?.length
    ? llmEvaluation.hints
    : ['Review requirements and handle edge cases explicitly.'];

  return {
    score: finalScore,
    criterionScores: llmEvaluation.criterionScores || DEFAULT_EVALUATION.criterionScores,
    issues,
    hints,
    summary: llmEvaluation.summary || `Task "${task.title}" evaluated.`,
    confidence: llmEvaluation.confidence ?? 0.5,
  };
};

export const finalizeAttempt = (attemptCount, task, finalScore) => {
  const maxAttempts = task?.maxAttempts || 3;
  const passScore = task?.passScore || 85;
  const passed = finalScore >= passScore;
  const attemptsLeft = Math.max(0, maxAttempts - attemptCount);

  return {
    passed,
    status: passed ? 'passed' : attemptsLeft > 0 ? 'failed' : 'attempts_exhausted',
    attemptsLeft,
    passScore,
  };
};

export const evaluateSubmission = async ({ task, code, language }) => {
  const validation = preValidateSubmission(code, task);
  if (!validation.valid) {
    return {
      success: false,
      finalScore: 0,
      hiddenCheckResult: { checks: [], score: 0 },
      llmEvaluation: DEFAULT_EVALUATION,
      feedback: {
        score: 0,
        criterionScores: DEFAULT_EVALUATION.criterionScores,
        issues: validation.errors,
        hints: ['Write a complete solution and try again.'],
        summary: 'Submission did not pass basic validation.',
        confidence: 1,
      },
      validationErrors: validation.errors,
    };
  }

  const hiddenCheckResult = runHiddenChecks(code, task);
  let llmEvaluation = DEFAULT_EVALUATION;
  try {
    const prompt = buildEvaluationPrompt(task, code, hiddenCheckResult, language);
    llmEvaluation = await evaluateWithLLM(prompt, language);
  } catch (error) {
    llmEvaluation = {
      ...DEFAULT_EVALUATION,
      summary: 'AI evaluation failed, fallback scoring was applied.',
      issues: ['AI evaluator unavailable.'],
      hints: ['Focus on all listed requirements and run another attempt.'],
    };
  }

  const finalScore = mergeScores(hiddenCheckResult, llmEvaluation);
  const feedback = buildLearnerFeedback(task, hiddenCheckResult, llmEvaluation, finalScore);

  return {
    success: true,
    finalScore,
    hiddenCheckResult,
    llmEvaluation,
    feedback,
    validationErrors: [],
  };
};

// Wrapper for V2 Practice Zone
export const evaluatePracticeTask = async (code, task, language = 'ru') => {
  const result = await evaluateSubmission({ task, code, language });

  // Return simplified result for PracticeZone
  return {
    score: result.finalScore || 0,
    passed: result.finalScore >= (task.passScore || 70),
    feedback: result.feedback?.summary || 'Evaluation completed.',
    suggestions: result.feedback?.hints || [],
    issues: result.feedback?.issues || []
  };
};

