// src/utils/themeUtils.js
// Utilities for working with theme classes

export const themeClasses = {
  bg: () => 'bg-surface',
  bgPrimary: () => 'bg-bg',
  bgSecondary: () => 'bg-border/20',
  bgHover: () => 'hover:bg-border/30',
  bgGradient: () => 'mesh-gradient',

  text: () => 'text-text',
  textSecondary: () => 'text-muted',
  textMuted: () => 'text-muted',

  border: () => 'border-border',
  borderSecondary: () => 'border-border',

  card: () => 'bg-surface border-border',
  input: () => 'bg-surface border-border text-text placeholder:text-muted',
};

export const cn = (...classes) => classes.filter(Boolean).join(' ');
