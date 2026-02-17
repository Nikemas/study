import PropTypes from 'prop-types';

export const CodeEditor = ({ value, onChange, language = 'javascript', disabled = false }) => {
  return (
    <textarea
      data-testid="practice-code-editor"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      spellCheck={false}
      className="w-full min-h-[260px] rounded-xl border border-border bg-black/90 text-green-300 p-4 font-mono text-sm leading-relaxed outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-70"
      aria-label={`Code editor (${language})`}
    />
  );
};

CodeEditor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  language: PropTypes.string,
  disabled: PropTypes.bool,
};

