import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Copy, Sparkles, X } from 'lucide-react';
import { CodeEditor } from './CodeEditor';
import { PracticeResultCard } from './PracticeResultCard';
import { evaluateSubmission, finalizeAttempt } from '../../services/practiceEvaluationService';
import { submitPracticeAttempt } from '../../services/progressService';
import { useGamification } from '../../contexts/GamificationContext';

export const PracticeTaskModal = ({
  task,
  stageId,
  attempts,
  onClose,
  onSubmitted,
  language = 'ru',
}) => {
  const [code, setCode] = useState(task.starterCode || '');
  const [loading, setLoading] = useState(false);
  const [lastResult, setLastResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [helpCopied, setHelpCopied] = useState(false);
  const { addXP } = useGamification();

  const maxAttempts = task.maxAttempts || 3;
  const usedAttempts = attempts.length;
  const attemptsLeft = Math.max(0, maxAttempts - usedAttempts);
  const exhausted = attemptsLeft === 0;
  const hasDraftChanges = code.trim() !== (task.starterCode || '').trim();
  const currentStatus = lastResult?.status || (
    exhausted
      ? 'attempts_exhausted'
      : hasDraftChanges || usedAttempts > 0
        ? 'in_progress'
        : 'not_started'
  );

  const aiHelpPrompt = useMemo(() => (
    `Help me solve this practice task without giving a full solution.
Task: ${task.title}
Scenario: ${task.scenario}
Requirements:
${task.requirements.map((r, i) => `${i + 1}. ${r}`).join('\n')}

Current code:
${code}`
  ), [task, code]);

  const handleSubmit = async () => {
    if (loading || exhausted) return;
    setLoading(true);
    setErrorMessage('');

    try {
      addXP('PRACTICE_ATTEMPT');
      const evaluation = await evaluateSubmission({ task, code, language });
      const saved = submitPracticeAttempt(stageId, task.id, code, evaluation);
      const latestAttemptCount = saved.attempts.length;
      const finalized = finalizeAttempt(latestAttemptCount, task, evaluation.finalScore);
      const result = {
        ...evaluation.feedback,
        score: evaluation.finalScore,
        status: finalized.status,
        passed: finalized.passed,
        attemptsLeft: finalized.attemptsLeft,
      };

      if (finalized.passed) {
        addXP('PRACTICE_PASS');
      }

      setLastResult(result);
      if (onSubmitted) onSubmitted(result);
    } catch (error) {
      setErrorMessage(typeof error?.message === 'string' ? error.message : 'Failed to submit solution.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyAiPrompt = async () => {
    try {
      await navigator.clipboard.writeText(aiHelpPrompt);
      setHelpCopied(true);
      window.setTimeout(() => setHelpCopied(false), 1800);
    } catch {
      setHelpCopied(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-6xl max-h-[94vh] overflow-y-auto rounded-3xl bg-[#0b1520] border border-white/10 shadow-card">
        <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-white/10">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-[11px] px-2 py-1 rounded-full bg-primary/20 text-primary uppercase font-semibold tracking-wider">
                {task.language}
              </span>
              <span
                className={`text-[11px] px-2 py-1 rounded-full uppercase tracking-wide ${
                  currentStatus === 'passed'
                    ? 'bg-success/20 text-success'
                    : currentStatus === 'attempts_exhausted'
                      ? 'bg-warning/20 text-warning'
                      : 'bg-border/30 text-muted'
                }`}
                data-testid="practice-status"
              >
                {currentStatus}
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white">{task.title}</h3>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl">{task.scenario}</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 text-slate-300" aria-label="Close practice modal">
            <X size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4">
          <aside className="lg:col-span-4 rounded-2xl border border-white/10 bg-[#111f2a] p-4 h-fit">
            <div className="mb-4">
              <p data-testid="practice-attempts" className="text-xs text-slate-400 mb-2">
                Attempts: {usedAttempts}/{maxAttempts}
              </p>
              <div className="grid grid-cols-3 gap-1.5">
                {Array.from({ length: maxAttempts }).map((_, index) => (
                  <div
                    key={`attempt-${index}`}
                    className={`h-1.5 rounded-full ${
                      index < usedAttempts ? 'bg-primary shadow-glow-sm' : 'bg-slate-700/60'
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="mb-4 rounded-xl border border-white/10 bg-black/20 p-3">
              <p className="text-xs uppercase text-slate-400 tracking-wider mb-1">Pass Conditions</p>
              <p className="text-sm text-white">Quiz >= 70% and Practice >= {task.passScore}/100</p>
              <p className="text-xs text-slate-400 mt-1">Max attempts: {maxAttempts}</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-white mb-2">Requirements</p>
              <ul className="space-y-2">
                {task.requirements.map((req) => (
                  <li key={req} className="text-xs text-slate-300 rounded-lg border border-white/10 bg-black/20 px-3 py-2">
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <section className="lg:col-span-8">
            <div className="rounded-2xl border border-primary/30 bg-[#0f1c27] p-3 mb-3">
              <CodeEditor value={code} onChange={setCode} language={task.language} disabled={loading || exhausted} />
            </div>

            {loading && (
              <div className="mb-3 rounded-xl border border-primary/30 bg-primary/10 p-3">
                <p className="text-sm text-white mb-2">Evaluating submission...</p>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-primary animate-pulse" />
                </div>
              </div>
            )}

            {errorMessage && (
              <p className="text-sm text-danger mb-3">{errorMessage}</p>
            )}

            {lastResult && (
              <div className="mb-3">
                <PracticeResultCard result={lastResult} passScore={task.passScore} />
              </div>
            )}

            {exhausted && !lastResult?.passed && (
              <div className="mb-3 p-3 rounded-xl border border-warning/40 bg-warning/10">
                <div className="flex items-start gap-2 mb-2">
                  <Sparkles size={16} className="text-warning mt-0.5" />
                  <div>
                    <p className="text-sm text-white font-medium">Attempts exhausted</p>
                    <p className="text-xs text-slate-300">
                      You can request AI guidance, but this does not auto-pass the stage.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopyAiPrompt}
                    className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium flex items-center gap-2"
                  >
                    <Copy size={14} />
                    {helpCopied ? 'Prompt copied' : 'Copy AI Help Prompt'}
                  </button>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <button
                data-testid="submit-practice-solution"
                onClick={handleSubmit}
                disabled={loading || exhausted}
                className={`px-4 py-2 rounded-lg font-semibold ${
                  loading || exhausted
                    ? 'bg-gray-500 text-white cursor-not-allowed'
                    : 'bg-primary text-white hover:brightness-110 shadow-soft'
                }`}
              >
                {loading ? 'Checking...' : 'Check Solution'}
              </button>
              <button onClick={onClose} className="px-4 py-2 rounded-lg border border-white/20 text-slate-200 hover:bg-white/10">
                Close
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

PracticeTaskModal.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    scenario: PropTypes.string.isRequired,
    starterCode: PropTypes.string.isRequired,
    requirements: PropTypes.arrayOf(PropTypes.string).isRequired,
    language: PropTypes.string.isRequired,
    maxAttempts: PropTypes.number.isRequired,
    passScore: PropTypes.number.isRequired,
  }).isRequired,
  stageId: PropTypes.string.isRequired,
  attempts: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmitted: PropTypes.func,
  language: PropTypes.string,
};
