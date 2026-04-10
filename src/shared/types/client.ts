// Типы для клиентов

export type ClientStatus = 'active' | 'pending' | 'in_progress' | 'archived'

export type ClientSource =
	| 'Google'
	| 'Yandex'
	| 'Social Media'
	| 'Referral'
	| 'Email'
	| 'WhatsApp'
	| 'Walk-in'

export interface ClientActionLog {
	id: string
	action: string
	userId: string
	userName: string
	timestamp: string
	details?: string
}

export interface Client {
	id: string
	name: string
	phone: string
	email: string
	status: ClientStatus
	source: ClientSource
	managerId?: string
	managerName?: string
	lastContactAt: string
	createdAt: string
	updatedAt: string
	actionLogs: ClientActionLog[]
}

// Конфигурация статусов (только стили, метки берутся из i18n)
export const clientStatusConfig: Record<ClientStatus, { className: string }> = {
	active: { className: 'bg-green-100 text-green-700' },
	pending: { className: 'bg-yellow-100 text-yellow-700' },
	in_progress: { className: 'bg-blue-100 text-blue-700' },
	archived: { className: 'bg-slate-100 text-slate-500' },
}

// Конфигурация источников (только стили)
export const clientSourceConfig: Record<ClientSource, { className: string }> = {
	Google: { className: 'bg-blue-50 text-blue-700 border-blue-200' },
	Yandex: { className: 'bg-red-50 text-red-700 border-red-200' },
	WhatsApp: { className: 'bg-green-50 text-green-700 border-green-200' },
	'Social Media': {
		className: 'bg-purple-50 text-purple-700 border-purple-200',
	},
	Referral: { className: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
	Email: { className: 'bg-orange-50 text-orange-700 border-orange-200' },
	'Walk-in': { className: 'bg-gray-50 text-gray-700 border-gray-200' },
}

// Список менеджеров для выбора
export const managers = [
	{ id: 'mgr-001', name: 'Иван Петров' },
	{ id: 'mgr-002', name: 'Мария Сидорова' },
	{ id: 'mgr-003', name: 'Алексей Иванов' },
	{ id: 'mgr-004', name: 'Елена Смирнова' },
]
