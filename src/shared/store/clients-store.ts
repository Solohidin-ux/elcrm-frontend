import { create } from 'zustand'
import type { Client, ClientActionLog, ClientStatus } from '../types/client'

// Мок-данные для начального состояния
const initialClients: Client[] = [
	{
		id: 'USR-001',
		name: 'Алексей Волков',
		phone: '+7 (903) 123-45-67',
		email: 'a.volkov@example.com',
		status: 'active',
		source: 'WhatsApp',
		managerId: 'mgr-001',
		managerName: 'Иван Петров',
		lastContactAt: '2024-02-13T09:15:00',
		createdAt: '2024-01-15T10:00:00',
		updatedAt: '2024-02-13T09:15:00',
		actionLogs: [
			{
				id: 'log-001',
				action: 'Клиент создан',
				userId: 'mgr-001',
				userName: 'Иван Петров',
				timestamp: '2024-01-15T10:00:00',
			},
			{
				id: 'log-002',
				action: 'Статус изменен на "Активный"',
				userId: 'mgr-001',
				userName: 'Иван Петров',
				timestamp: '2024-01-20T14:30:00',
				details: 'pending -> active',
			},
		],
	},
	{
		id: 'USR-002',
		name: 'Ольга Морозова',
		phone: '+7 (916) 987-65-43',
		email: 'olga.morozova@nomail.com',
		status: 'active',
		source: 'Walk-in',
		managerId: 'mgr-002',
		managerName: 'Мария Сидорова',
		lastContactAt: '2024-02-12T14:20:30',
		createdAt: '2024-01-20T11:00:00',
		updatedAt: '2024-02-12T14:20:30',
		actionLogs: [
			{
				id: 'log-003',
				action: 'Клиент создан',
				userId: 'mgr-002',
				userName: 'Мария Сидорова',
				timestamp: '2024-01-20T11:00:00',
			},
		],
	},
	{
		id: 'USR-003',
		name: 'Дмитрий Соколов',
		phone: '+7 (925) 555-12-34',
		email: 'd.sokolov@mail.ru',
		status: 'pending',
		source: 'Google',
		managerId: 'mgr-001',
		managerName: 'Иван Петров',
		lastContactAt: '2024-02-10T16:45:00',
		createdAt: '2024-02-01T09:00:00',
		updatedAt: '2024-02-10T16:45:00',
		actionLogs: [
			{
				id: 'log-004',
				action: 'Клиент создан',
				userId: 'mgr-001',
				userName: 'Иван Петров',
				timestamp: '2024-02-01T09:00:00',
			},
		],
	},
	{
		id: 'USR-004',
		name: 'Елена Козлова',
		phone: '+7 (977) 888-99-00',
		email: 'elena.kozlova@gmail.com',
		status: 'in_progress',
		source: 'Referral',
		managerId: 'mgr-003',
		managerName: 'Алексей Иванов',
		lastContactAt: '2024-02-14T11:00:00',
		createdAt: '2024-01-25T15:30:00',
		updatedAt: '2024-02-14T11:00:00',
		actionLogs: [
			{
				id: 'log-005',
				action: 'Клиент создан',
				userId: 'mgr-003',
				userName: 'Алексей Иванов',
				timestamp: '2024-01-25T15:30:00',
			},
			{
				id: 'log-006',
				action: 'Статус изменен на "В процессе"',
				userId: 'mgr-003',
				userName: 'Алексей Иванов',
				timestamp: '2024-02-05T10:00:00',
				details: 'pending -> in_progress',
			},
		],
	},
	{
		id: 'USR-005',
		name: 'Сергей Новиков',
		phone: '+7 (999) 111-22-33',
		email: 's.novikov@yandex.ru',
		status: 'archived',
		source: 'Yandex',
		managerId: 'mgr-002',
		managerName: 'Мария Сидорова',
		lastContactAt: '2024-01-10T09:00:00',
		createdAt: '2023-11-15T14:00:00',
		updatedAt: '2024-01-10T09:00:00',
		actionLogs: [
			{
				id: 'log-007',
				action: 'Клиент создан',
				userId: 'mgr-002',
				userName: 'Мария Сидорова',
				timestamp: '2023-11-15T14:00:00',
			},
			{
				id: 'log-008',
				action: 'Клиент перемещен в архив',
				userId: 'mgr-002',
				userName: 'Мария Сидорова',
				timestamp: '2024-01-10T09:00:00',
				details: 'Нет активности более 30 дней',
			},
		],
	},
]

interface ClientsState {
	clients: Client[]
	filteredClients: Client[]
	statusFilter: ClientStatus | 'all'
	searchQuery: string
	showArchived: boolean

	// Actions
	setClients: (clients: Client[]) => void
	addClient: (
		client: Omit<Client, 'id' | 'createdAt' | 'updatedAt' | 'actionLogs'>,
	) => void
	updateClient: (clientId: string, updates: Partial<Client>) => void
	deleteClient: (clientId: string) => void
	moveToArchive: (clientId: string, reason: string) => void
	restoreFromArchive: (clientId: string) => void

	// Фильтрация
	setStatusFilter: (status: ClientStatus | 'all') => void
	setSearchQuery: (query: string) => void
	setShowArchived: (show: boolean) => void
	applyFilters: () => void

	// Логирование
	addActionLog: (
		clientId: string,
		log: Omit<ClientActionLog, 'id' | 'timestamp'>,
	) => void

	// Получение клиента по ID
	getClientById: (clientId: string) => Client | undefined
}

const getCurrentUser = () => ({
	userId: 'current-user',
	userName: 'Текущий пользователь',
})

// Вспомогательная функция фильтрации
function applyFiltersToClients(
	clients: Client[],
	statusFilter: ClientStatus | 'all',
	searchQuery: string,
	showArchived: boolean,
): Client[] {
	let result = clients

	// Фильтр по статусу
	if (statusFilter !== 'all') {
		result = result.filter(c => c.status === statusFilter)
	}

	// Фильтр по архиву
	if (!showArchived && statusFilter === 'all') {
		result = result.filter(c => c.status !== 'archived')
	}

	// Поиск
	if (searchQuery.trim()) {
		const query = searchQuery.toLowerCase()
		result = result.filter(
			c =>
				c.name.toLowerCase().includes(query) ||
				c.phone.includes(query) ||
				c.email.toLowerCase().includes(query) ||
				c.managerName?.toLowerCase().includes(query),
		)
	}

	return result
}

export const useClientsStore = create<ClientsState>((set, get) => ({
	clients: initialClients,
	filteredClients: initialClients.filter(c => c.status !== 'archived'),
	statusFilter: 'all',
	searchQuery: '',
	showArchived: false,

	setClients: clients => set({ clients, filteredClients: clients }),

	addClient: clientPayload => {
		const now = new Date().toISOString()
		const { userId, userName } = getCurrentUser()
		const newId = `USR-${Date.now()}`

		const newClient: Client = {
			...clientPayload,
			id: newId,
			createdAt: now,
			updatedAt: now,
			actionLogs: [
				{
					id: `log-${Date.now()}`,
					action: 'Клиент создан',
					userId,
					userName,
					timestamp: now,
				},
			],
		}

		set(state => {
			const updatedClients = [...state.clients, newClient]
			return {
				clients: updatedClients,
				filteredClients: applyFiltersToClients(
					updatedClients,
					state.statusFilter,
					state.searchQuery,
					state.showArchived,
				),
			}
		})
	},

	updateClient: (clientId, updates) => {
		const { userId, userName } = getCurrentUser()
		const now = new Date().toISOString()

		set(state => {
			const updatedClients = state.clients.map(client => {
				if (client.id === clientId) {
					const newLogs = [...client.actionLogs]

					// Добавляем лог при изменении статуса
					if (updates.status && updates.status !== client.status) {
						const statusLabels: Record<ClientStatus, string> = {
							active: 'Активный',
							pending: 'Ожидает',
							in_progress: 'В процессе',
							archived: 'Архив',
						}
						newLogs.push({
							id: `log-${Date.now()}`,
							action: `Статус изменен на "${statusLabels[updates.status]}"`,
							userId,
							userName,
							timestamp: now,
							details: `${client.status} -> ${updates.status}`,
						})
					}

					// Добавляем лог при изменении менеджера
					if (updates.managerId && updates.managerId !== client.managerId) {
						newLogs.push({
							id: `log-${Date.now() + 1}`,
							action: `Назначен менеджер: ${updates.managerName || 'Не назначен'}`,
							userId,
							userName,
							timestamp: now,
							details: client.managerName
								? `${client.managerName} -> ${updates.managerName}`
								: undefined,
						})
					}

					return {
						...client,
						...updates,
						updatedAt: now,
						actionLogs: newLogs,
					}
				}
				return client
			})

			return {
				clients: updatedClients,
				filteredClients: applyFiltersToClients(
					updatedClients,
					state.statusFilter,
					state.searchQuery,
					state.showArchived,
				),
			}
		})
	},

	deleteClient: clientId => {
		set(state => {
			const updatedClients = state.clients.filter(c => c.id !== clientId)
			return {
				clients: updatedClients,
				filteredClients: applyFiltersToClients(
					updatedClients,
					state.statusFilter,
					state.searchQuery,
					state.showArchived,
				),
			}
		})
	},

	moveToArchive: (clientId, reason) => {
		const { userId, userName } = getCurrentUser()
		const now = new Date().toISOString()

		set(state => {
			const updatedClients = state.clients.map(client => {
				if (client.id === clientId) {
					return {
						...client,
						status: 'archived' as ClientStatus,
						updatedAt: now,
						actionLogs: [
							...client.actionLogs,
							{
								id: `log-${Date.now()}`,
								action: 'Клиент перемещен в архив',
								userId,
								userName,
								timestamp: now,
								details: reason,
							},
						],
					}
				}
				return client
			})

			return {
				clients: updatedClients,
				filteredClients: applyFiltersToClients(
					updatedClients,
					state.statusFilter,
					state.searchQuery,
					state.showArchived,
				),
			}
		})
	},

	restoreFromArchive: clientId => {
		const { userId, userName } = getCurrentUser()
		const now = new Date().toISOString()

		set(state => {
			const updatedClients = state.clients.map(client => {
				if (client.id === clientId) {
					return {
						...client,
						status: 'active' as ClientStatus,
						updatedAt: now,
						actionLogs: [
							...client.actionLogs,
							{
								id: `log-${Date.now()}`,
								action: 'Клиент восстановлен из архива',
								userId,
								userName,
								timestamp: now,
							},
						],
					}
				}
				return client
			})

			return {
				clients: updatedClients,
				filteredClients: applyFiltersToClients(
					updatedClients,
					state.statusFilter,
					state.searchQuery,
					state.showArchived,
				),
			}
		})
	},

	setStatusFilter: status => {
		set(state => ({
			statusFilter: status,
			filteredClients: applyFiltersToClients(
				state.clients,
				status,
				state.searchQuery,
				state.showArchived,
			),
		}))
	},

	setSearchQuery: query => {
		set(state => ({
			searchQuery: query,
			filteredClients: applyFiltersToClients(
				state.clients,
				state.statusFilter,
				query,
				state.showArchived,
			),
		}))
	},

	setShowArchived: show => {
		set(state => ({
			showArchived: show,
			filteredClients: applyFiltersToClients(
				state.clients,
				state.statusFilter,
				state.searchQuery,
				show,
			),
		}))
	},

	applyFilters: () => {
		set(state => ({
			filteredClients: applyFiltersToClients(
				state.clients,
				state.statusFilter,
				state.searchQuery,
				state.showArchived,
			),
		}))
	},

	addActionLog: (clientId, logPayload) => {
		set(state => ({
			clients: state.clients.map(client =>
				client.id === clientId
					? {
							...client,
							actionLogs: [
								...client.actionLogs,
								{
									...logPayload,
									id: `log-${Date.now()}`,
									timestamp: new Date().toISOString(),
								},
							],
						}
					: client,
			),
		}))
	},

	getClientById: clientId => {
		return get().clients.find(c => c.id === clientId)
	},
}))
