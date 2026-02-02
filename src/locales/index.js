// src/locales/index.js
// Central export for all translations

import ruUI from './ru/ui';
import ruCourses from './ru/courses';

import enUI from './en/ui';
import enCourses from './en/courses';

import kyUI from './ky/ui';
import kyCourses from './ky/courses';

export const translations = {
  ru: {
    ui: ruUI,
    courses: ruCourses
  },
  en: {
    ui: enUI,
    courses: enCourses
  },
  ky: {
    ui: kyUI,
    courses: kyCourses
  }
};

export default translations;
