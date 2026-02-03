// src/components/Knowledge/MaterialCard.jsx

import { memo } from 'react';
import PropTypes from 'prop-types';
import { ArrowRight, Play } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLanguage } from '../../contexts/LanguageContext';
import { isMaterialComplete } from '../../services/progressService';

const CATEGORY_CONFIG = {
  python:     { color: 'blue',    emoji: '🐍', colorClass: 'text-blue-400',   bgClass: 'from-blue-600/20 to-yellow-500/20',   borderClass: 'border-blue-500/20',   shadowClass: 'shadow-[0_0_15px_rgba(59,130,246,0.15)]',  hoverClass: 'from-blue-500/5' },
  javascript: { color: 'yellow',  emoji: '⚡', colorClass: 'text-yellow-400', bgClass: 'from-yellow-400/20 to-orange-500/20', borderClass: 'border-yellow-500/20', shadowClass: 'shadow-[0_0_15px_rgba(234,179,8,0.15)]',   hoverClass: 'from-yellow-500/5' },
  html:       { color: 'orange',  emoji: '📄', colorClass: 'text-orange-400', bgClass: 'from-orange-500/20 to-red-500/20',    borderClass: 'border-orange-500/20', shadowClass: 'shadow-[0_0_15px_rgba(249,115,22,0.15)]',  hoverClass: 'from-orange-500/5' },
  css:        { color: 'indigo',  emoji: '🎨', colorClass: 'text-indigo-400', bgClass: 'from-indigo-500/20 to-blue-500/20',   borderClass: 'border-indigo-500/20', shadowClass: 'shadow-[0_0_15px_rgba(99,102,241,0.15)]',  hoverClass: 'from-indigo-500/5' },
  react:      { color: 'cyan',    emoji: '⚛️', colorClass: 'text-cyan-400',   bgClass: 'from-cyan-500/20 to-blue-500/20',    borderClass: 'border-cyan-500/20',   shadowClass: 'shadow-[0_0_15px_rgba(6,182,212,0.15)]', hoverClass: 'from-cyan-500/5' }
};

export const MaterialCard = memo(({ material, onOpen }) => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDark = theme === 'dark';
  const isCompleted = isMaterialComplete(material.id);
  const config = CATEGORY_CONFIG[material.category] || CATEGORY_CONFIG.python;

  // Progress ring for completed state
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = isCompleted ? 0 : circumference;

  return (
    <article
      className={`group relative ${
        isDark ? 'glass-card' : 'light-glass-card'
      } rounded-3xl p-6 hover-lift hover:shadow-glow transition-all duration-300 cursor-pointer overflow-hidden`}
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
      {/* Hover Gradient Overlay */}
      <div className={`absolute inset-0 bg-gradient-to-b ${config.hoverClass} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

      <div className="flex justify-between items-start mb-6 relative z-10">
        {/* Icon */}
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config.bgClass} border ${config.borderClass} flex items-center justify-center ${config.shadowClass}`}>
          <span className="text-2xl" role="img" aria-label={material.category}>
            {config.emoji}
          </span>
        </div>

        {/* Status Badge */}
        {isCompleted ? (
          <div className="relative w-10 h-10 flex items-center justify-center">
            <svg className="w-10 h-10 rotate-[-90deg]">
              <circle className="text-white/5 stroke-current" cx="20" cy="20" fill="none" r={radius} strokeWidth="2" />
              <circle
                className={`${config.colorClass} stroke-current progress-ring__circle`}
                cx="20" cy="20" fill="none" r={radius}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round" strokeWidth="2"
              />
            </svg>
            <span className="absolute text-[9px] font-bold text-white">100%</span>
          </div>
        ) : (
          <div className={`px-2 py-1 rounded ${
            isDark ? 'bg-white/5 border border-white/5' : 'bg-gray-100 border border-gray-200'
          } text-[10px] ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          } font-medium`}>
            {t('material.notStarted')}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h4 className={`text-lg font-bold font-display mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {material.topic}
        </h4>
        <p className={`text-xs mb-6 leading-relaxed line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {material.content}
        </p>

        {/* CTA Button */}
        <div className={`w-full py-2.5 rounded-xl ${
          isDark
            ? 'bg-white/5 group-hover:bg-white/10 border border-white/5'
            : 'bg-gray-100 group-hover:bg-gray-200 border border-gray-200'
        } text-sm font-medium ${
          isDark ? 'text-gray-300' : 'text-gray-700'
        } transition-all flex items-center justify-center gap-2`}>
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
