import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector) // Определение языка пользователя
  .use(initReactI18next) // Интеграция с React
  .init({
    fallbackLng: 'ru', // Язык по умолчанию
    debug: false,
    interpolation: {
      escapeValue: false, // React сам защищает от XSS
    },
  });

export default i18n;