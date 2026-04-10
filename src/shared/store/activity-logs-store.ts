import { create } from 'zustand'
import type {
	ActivityLog,
	ActivityLogModule,
	ActivityLogType,
} from '../types/activity-log'

// Начальные демо-данные
const initialLogs: ActivityLog[] = [
	{
		id: 'log-001',
		type: 'client_created',
		module: 'clients',
		action: 'Клиент создан',
		description: 'Создан новый клиент: Алексей Волков',
		userId: 'mgr-001',
		userName: 'Иван Петров',
		timestamp: '2024-01-15T10:00:00',
		entityId: 'USR-001',
		entityName: 'Алексей Волков',
	},
	{
		id: 'log-002',
		type: 'client_status_changed',
		module: 'clients',
		action: 'Статус клиента изменен',
		description: 'Статус изменен с "Ожидает" на "Активный"',
		userId: 'mgr-001',
		userName: 'Иван Петров',
		timestamp: '2024-01-20T14:30:00',
		entityId: 'USR-001',
		entityName: 'Алексей Волков',
	},
	{
		id: 'log-003',
		type: 'deal_created',
		module: 'deals',
		action: 'Сделка создана',
		description: 'Новая сделка: iPhone 15 Pro',
		userId: 'mgr-002',
		userName: 'Мария Сидорова',
		timestamp: '2024-02-01T09:00:00',
		entityId: 'deal-001',
		entityName: 'iPhone 15 Pro',
	},
	{
		id: 'log-004',
		type: 'deal_status_changed',
		module: 'deals',
		action: 'Этап сделки изменен',
		description: 'Сделка перемещена из "Новый" в "Связались"',
		userId: 'mgr-002',
		userName: 'Мария Сидорова',
		timestamp: '2024-02-02T11:30:00',
		entityId: 'deal-001',
		entityName: 'iPhone 15 Pro',
	},
	{
		id: 'log-005',
		type: 'call_made',
		module: 'deals',
		action: 'Звонок клиенту',
		description: 'Совершен звонок клиенту',
		userId: 'mgr-001',
		userName: 'Иван Петров',
		timestamp: '2024-02-05T15:00:00',
		entityId: 'deal-002',
		entityName: 'MacBook Air M2',
	},
	{
		id: 'log-006',
		type: 'deal_product_added',
		module: 'deals',
		action: 'Товар добавлен',
		description: 'Добавлен товар: Беспроводные наушники Sony WH-1000XM5',
		userId: 'mgr-003',
		userName: 'Алексей Иванов',
		timestamp: '2024-02-08T10:15:00',
		entityId: 'deal-003',
		entityName: 'Sony WH-1000XM5',
	},
	{
		id: 'log-007',
		type: 'deal_reminder_set',
		module: 'deals',
		action: 'Напоминание установлено',
		description: 'Напоминание: Перезвонить через 3 дня',
		userId: 'mgr-001',
		userName: 'Иван Петров',
		timestamp: '2024-02-10T09:00:00',
		entityId: 'deal-002',
		entityName: 'MacBook Air M2',
	},
	{
		id: 'log-008',
		type: 'client_archived',
		module: 'clients',
		action: 'Клиент в архиве',
		description: 'Нет активности более 30 дней',
		userId: 'mgr-002',
		userName: 'Мария Сидорова',
		timestamp: '2024-01-10T09:00:00',
		entityId: 'USR-005',
		entityName: 'Сергей Новиков',
	},
	{
		id: 'log-009',
		type: 'deal_sold',
		module: 'deals',
		action: 'Сделка закрыта (продажа)',
		description: 'Сумма сделки: 99 990 ₽',
		userId: 'mgr-002',
		userName: 'Мария Сидорова',
		timestamp: '2024-02-12T16:00:00',
		entityId: 'deal-001',
		entityName: 'iPhone 15 Pro',
	},
	{
		id: 'log-010',
		type: 'deal_refused',
		module: 'deals',
		action: 'Сделка в отказе',
		description: 'Причина: Клиент передумал',
		userId: 'mgr-003',
		userName: 'Алексей Иванов',
		timestamp: '2024-02-14T11:30:00',
		entityId: 'deal-004',
		entityName: 'Кофемашина Philips',
	},
	{
		id: 'log-011',
		type: 'note_added',
		module: 'deals',
		action: 'Заметка добавлена',
		description: 'Клиент интересуется дополнительной гарантией',
		userId: 'mgr-001',
		userName: 'Иван Петров',
		timestamp: '2024-02-15T14:00:00',
		entityId: 'deal-002',
		entityName: 'MacBook Air M2',
	},
	{
		id: 'log-012',
		type: 'client_manager_assigned',
		module: 'clients',
		action: 'Менеджер назначен',
		description: 'Назначен менеджер: Елена Смирнова',
		userId: 'mgr-001',
		userName: 'Иван Петров',
		timestamp: '2024-02-16T10:00:00',
		entityId: 'USR-006',
		entityName: 'Анна Белова',
	},
]

interface ActivityLogsState {
	logs: ActivityLog[]
	filteredLogs: ActivityLog[]
	moduleFilter: ActivityLogModule | 'all'
	typeFilter: ActivityLogType | 'all'
	searchQuery: string
	dateFrom: string
	dateTo: string

	// Actions
	addLog: (log: Omit<ActivityLog, 'id' | 'timestamp'>) => void
	setModuleFilter: (module: ActivityLogModule | 'all') => void
	setTypeFilter: (type: ActivityLogType | 'all') => void
	setSearchQuery: (query: string) => void
	setDateFrom: (date: string) => void
	setDateTo: (date: string) => void
	applyFilters: () => void
	clearFilters: () => void

	// Получение логов по сущности
	getLogsByEntity: (entityId: string) => ActivityLog[]
}

// Вспомогательная функция фильтрации
function applyFiltersToLogs(
	logs: ActivityLog[],
	moduleFilter: ActivityLogModule | 'all',
	typeFilter: ActivityLogType | 'all',
	searchQuery: string,
	dateFrom: string,
	dateTo: string,
): ActivityLog[] {
	let result = logs

	// Фильтр по модулю
	if (moduleFilter !== 'all') {
		result = result.filter(log => log.module === moduleFilter)
	}

	// Фильтр по типу
	if (typeFilter !== 'all') {
		result = result.filter(log => log.type === typeFilter)
	}

	// Поиск
	if (searchQuery.trim()) {
		const query = searchQuery.toLowerCase()
		result = result.filter(
			log =>
				log.action.toLowerCase().includes(query) ||
				log.description?.toLowerCase().includes(query) ||
				log.userName.toLowerCase().includes(query) ||
				log.entityName?.toLowerCase().includes(query),
		)
	}

	// Фильтр по дате
	if (dateFrom) {
		const fromDate = new Date(dateFrom)
		result = result.filter(log => new Date(log.timestamp) >= fromDate)
	}

	if (dateTo) {
		const toDate = new Date(dateTo)
		toDate.setHours(23, 59, 59, 999)
		result = result.filter(log => new Date(log.timestamp) <= toDate)
	}

	// Сортировка по времени (новые сверху)
	return result.sort(
		(a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
	)
}

export const useActivityLogsStore = create<ActivityLogsState>((set, get) => ({
	logs: initialLogs,
	filteredLogs: initialLogs.sort(
		(a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
	),
	moduleFilter: 'all',
	typeFilter: 'all',
	searchQuery: '',
	dateFrom: '',
	dateTo: '',

	addLog: logPayload => {
		const newLog: ActivityLog = {
			...logPayload,
			id: `log-${crypto.randomUUID()}`,
			timestamp: new Date().toISOString(),
		}

		set(state => {
			const updatedLogs = [newLog, ...state.logs]
			return {
				logs: updatedLogs,
				filteredLogs: applyFiltersToLogs(
					updatedLogs,
					state.moduleFilter,
					state.typeFilter,
					state.searchQuery,
					state.dateFrom,
					state.dateTo,
				),
			}
		})
	},

	setModuleFilter: module => {
		set(state => ({
			moduleFilter: module,
			filteredLogs: applyFiltersToLogs(
				state.logs,
				module,
				state.typeFilter,
				state.searchQuery,
				state.dateFrom,
				state.dateTo,
			),
		}))
	},

	setTypeFilter: type => {
		set(state => ({
			typeFilter: type,
			filteredLogs: applyFiltersToLogs(
				state.logs,
				state.moduleFilter,
				type,
				state.searchQuery,
				state.dateFrom,
				state.dateTo,
			),
		}))
	},

	setSearchQuery: query => {
		set(state => ({
			searchQuery: query,
			filteredLogs: applyFiltersToLogs(
				state.logs,
				state.moduleFilter,
				state.typeFilter,
				query,
				state.dateFrom,
				state.dateTo,
			),
		}))
	},

	setDateFrom: date => {
		set(state => ({
			dateFrom: date,
			filteredLogs: applyFiltersToLogs(
				state.logs,
				state.moduleFilter,
				state.typeFilter,
				state.searchQuery,
				date,
				state.dateTo,
			),
		}))
	},

	setDateTo: date => {
		set(state => ({
			dateTo: date,
			filteredLogs: applyFiltersToLogs(
				state.logs,
				state.moduleFilter,
				state.typeFilter,
				state.searchQuery,
				state.dateFrom,
				date,
			),
		}))
	},

	applyFilters: () => {
		set(state => ({
			filteredLogs: applyFiltersToLogs(
				state.logs,
				state.moduleFilter,
				state.typeFilter,
				state.searchQuery,
				state.dateFrom,
				state.dateTo,
			),
		}))
	},

	clearFilters: () => {
		set(state => ({
			moduleFilter: 'all',
			typeFilter: 'all',
			searchQuery: '',
			dateFrom: '',
			dateTo: '',
			filteredLogs: state.logs.sort(
				(a, b) =>
					new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
			),
		}))
	},

	getLogsByEntity: entityId => {
		return get().logs.filter(log => log.entityId === entityId)
	},
}))
