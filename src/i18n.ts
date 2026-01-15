import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { ru } from './locales/ru'

export const resources = {
	// en: { translation: en },
	ru: { translation: ru },
} as const

i18n
	.use(LanguageDetector) // Определение языка пользователя
	.use(initReactI18next) // Интеграция с React
	.init({
		resources,
		fallbackLng: 'ru', // Язык по умолчанию
		debug: false,
		interpolation: {
			escapeValue: false, // React сам защищает от XSS
		},
	})

export default i18n
