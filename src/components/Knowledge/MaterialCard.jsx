// src/components/Knowledge/MaterialCard.jsx

import { memo } from 'react';
import PropTypes from 'prop-types';
import { ArrowRight, Play } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { isMaterialComplete } from '../../services/progressService';

const CATEGORY_CONFIG = {
  python:     { emoji: '??', accent: 'text-blue-500', bg: 'bg-blue-500/10' },
  javascript: { emoji: '?', accent: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  html:       { emoji: '??', accent: 'text-orange-500', bg: 'bg-orange-500/10' },
  css:        { emoji: '??', accent: 'text-indigo-500', bg: 'bg-indigo-500/10' },
  react:      { emoji: '??', accent: 'text-cyan-500', bg: 'bg-cyan-500/10' }
};

export const MaterialCard = memo(({ material, onOpen }) => {
  const { t } = useLanguage();
  const isCompleted = isMaterialComplete(material.id);
  const config = CATEGORY_CONFIG[material.category] || CATEGORY_CONFIG.python;

  return (
    <article
      className="group relative surface-card p-6 hover-lift transition-all duration-300 cursor-pointer overflow-hidden"
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
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className={`w-12 h-12 rounded-lg ${config.bg} border border-border flex items-center justify-center`}>
          <span className="text-2xl" role="img" aria-label={material.category}>
            {config.emoji}
          </span>
        </div>

        {isCompleted ? (
          <div className="px-2 py-1 rounded-full bg-success/15 text-success text-[10px] font-semibold">
            100%
          </div>
        ) : (
          <div className="px-2 py-1 rounded-full bg-border/30 text-[10px] text-muted font-medium">
            {t('material.notStarted')}
          </div>
        )}
      </div>

      <div className="relative z-10">
        <h4 className="text-lg font-bold font-display mb-1 text-text">
          {material.topic}
        </h4>
        <p className="text-xs mb-6 leading-relaxed text-muted">
          {material.content}
        </p>

        <div className="w-full py-2.5 rounded-lg bg-border/20 group-hover:bg-border/40 text-sm font-medium text-text transition-all flex items-center justify-center gap-2">
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
