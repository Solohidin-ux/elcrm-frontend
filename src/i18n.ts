import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { en } from './locales/en'
import { kg } from './locales/kg'
import { ru } from './locales/ru'

export const resources = {
	en: { translation: en },
	ru: { translation: ru },
	kg: { translation: kg },
} as const

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources,
		fallbackLng: 'ru',
		debug: false,
		interpolation: {
			escapeValue: false,
		},
	})

export default i18n
