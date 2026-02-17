import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { AlertCircle, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';

const CRITERIA_LABELS = {
  correctness: 'Correctness',
  code_quality: 'Code Quality',
  edge_cases: 'Edge Cases',
  readability: 'Readability',
};

const scoreBarColor = (value) => {
  if (value >= 85) return 'bg-success';
  if (value >= 70) return 'bg-warning';
  return 'bg-danger';
};

export const PracticeResultCard = ({ result, passScore }) => {
  const [openHintIds, setOpenHintIds] = useState(() => new Set());

  const passed = result.score >= passScore;
  const statusLabel = result.status || (passed ? 'passed' : 'failed');

  const criteria = useMemo(() => {
    return Object.entries(result.criterionScores || {}).map(([key, rawValue]) => {
      const value = Number(rawValue) || 0;
      return {
        key,
        label: CRITERIA_LABELS[key] || key,
        value: Math.max(0, Math.min(100, value)),
      };
    });
  }, [result.criterionScores]);

  const toggleHint = (hintId) => {
    setOpenHintIds((prev) => {
      const next = new Set(prev);
      if (next.has(hintId)) {
        next.delete(hintId);
      } else {
        next.add(hintId);
      }
      return next;
    });
  };

  return (
    <section
      data-testid="practice-result"
      className={`rounded-2xl border p-4 md:p-5 ${
        passed
          ? 'border-success/40 bg-success/10'
          : statusLabel === 'attempts_exhausted'
            ? 'border-warning/40 bg-warning/10'
            : 'border-danger/40 bg-danger/10'
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <h4 className="font-bold text-text tracking-tight">Evaluation Result</h4>
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-1 rounded-full bg-border/20 border border-border text-muted uppercase tracking-wide">
            {statusLabel}
          </span>
          <span
            data-testid="practice-score"
            className={`text-sm px-2.5 py-1 rounded-full font-semibold ${
              passed ? 'bg-success text-black' : 'bg-danger text-white'
            }`}
          >
            {result.score}/100
          </span>
        </div>
      </div>

      <p className="text-sm text-muted mb-4">{result.summary}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        {criteria.map((criterion) => (
          <div key={criterion.key} className="rounded-xl border border-border/60 bg-bg/40 p-3">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-muted">{criterion.label}</span>
              <span className="font-semibold text-text">{criterion.value}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-border/40 overflow-hidden">
              <div className={`h-full ${scoreBarColor(criterion.value)}`} style={{ width: `${criterion.value}%` }} />
            </div>
          </div>
        ))}
      </div>

      {result.issues?.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-medium text-text flex items-center gap-2 mb-2">
            <AlertCircle size={14} className="text-danger" />
            Required fixes
          </p>
          <ul className="text-xs text-muted list-disc ml-4 space-y-1">
            {result.issues.map((issue, idx) => (
              <li key={`${issue}-${idx}`}>{issue}</li>
            ))}
          </ul>
        </div>
      )}

      {result.hints?.length > 0 && (
        <div>
          <p className="text-sm font-medium text-text flex items-center gap-2 mb-2">
            <Lightbulb size={14} className="text-warning" />
            Hints (click to reveal)
          </p>
          <div className="space-y-2">
            {result.hints.map((hint, idx) => {
              const hintId = `hint-${idx}`;
              const isOpen = openHintIds.has(hintId);
              return (
                <div key={hintId} className="rounded-lg border border-border/70 bg-bg/40">
                  <button
                    type="button"
                    onClick={() => toggleHint(hintId)}
                    className="w-full text-left p-3 flex items-center justify-between gap-2 hover:bg-border/20 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="text-xs text-muted">Hint {idx + 1}</span>
                    {isOpen ? <ChevronUp size={14} className="text-muted" /> : <ChevronDown size={14} className="text-muted" />}
                  </button>
                  {isOpen && (
                    <div className="px-3 pb-3 text-xs text-text leading-relaxed border-t border-border/50">
                      {hint}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

PracticeResultCard.propTypes = {
  passScore: PropTypes.number.isRequired,
  result: PropTypes.shape({
    score: PropTypes.number.isRequired,
    criterionScores: PropTypes.object,
    issues: PropTypes.arrayOf(PropTypes.string),
    hints: PropTypes.arrayOf(PropTypes.string),
    summary: PropTypes.string,
  }),
};
