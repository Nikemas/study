// src/components/Knowledge/MaterialCard.jsx

import { memo } from 'react';
import PropTypes from 'prop-types';
import { ArrowRight, Play } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { isMaterialComplete } from '../../services/progressService';

const CATEGORY_CONFIG = {
  python:     { label: 'PY', accent: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/25' },
  javascript: { label: 'JS', accent: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/25' },
  html:       { label: 'HTML', accent: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/25' },
  css:        { label: 'CSS', accent: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/25' },
  react:      { label: 'RE', accent: 'text-cyan-400', bg: 'bg-cyan-500/10 border-cyan-500/25' }
};

export const MaterialCard = memo(({ material, onOpen }) => {
  const { t } = useLanguage();
  const isCompleted = isMaterialComplete(material.id);
  const config = CATEGORY_CONFIG[material.category] || CATEGORY_CONFIG.python;

  return (
    <article
      className="group relative rounded-2xl p-6 transition-all duration-300 cursor-pointer overflow-hidden border border-border/70 bg-surface/80 hover:border-primary/40 hover:shadow-card-hover"
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen();
        }
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className={`min-w-12 h-12 px-3 rounded-lg ${config.bg} border flex items-center justify-center`}>
          <span className={`text-xs font-bold tracking-wider ${config.accent}`}>
            {config.label}
          </span>
        </div>

        {isCompleted ? (
          <div className="px-2 py-1 rounded-full bg-success/15 text-success text-[10px] font-semibold uppercase tracking-wide border border-success/30">
            completed
          </div>
        ) : (
          <div className="px-2 py-1 rounded-full bg-border/30 text-[10px] text-muted font-medium uppercase tracking-wide">
            {t('material.notStarted')}
          </div>
        )}
      </div>

      <div className="relative z-10">
        <h4 className="text-lg font-bold font-display mb-1 text-text tracking-tight">
          {material.topic}
        </h4>
        <p className="text-xs mb-6 leading-relaxed text-muted line-clamp-3">
          {material.content}
        </p>

        <div className="w-full py-2.5 rounded-lg bg-border/20 group-hover:bg-primary/20 text-sm font-medium text-text transition-all flex items-center justify-center gap-2 border border-border/60 group-hover:border-primary/40">
          <span>{isCompleted ? t('material.repeat') : t('material.startModule')}</span>
          {isCompleted ? (
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          ) : (
            <Play className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          )}
        </div>
      </div>
    </article>
  );
});

MaterialCard.propTypes = {
  material: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    topic: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired
  }).isRequired,
  onOpen: PropTypes.func.isRequired
};
