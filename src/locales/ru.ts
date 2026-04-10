export const ru = {
	// Sidebar
	sidebar: {
		dashboard: 'Главная панель',
		overview: 'Обзор',
		managers: 'Менеджеры',
		finance: 'Деньги',
		sales: 'Продажи',
		clients: 'Клиенты',
		products: 'Товары',
		funnel: 'Воронка продаж',
		activityLogs: 'История действий',
		archive: 'Архив',
	},

	// Kanban
	kanban: {
		addTask: 'Добавить задачу',

		columns: {
			new: 'Новый',
			contacted: 'Связались',
			agreed: 'Договорились',
			bought: 'Купил',
			refused: 'Отказ',
		},

		toasts: {
			updatedStatus: 'Статус обновлен',
			taskMoved:
				'Задача "{{taskTitle}}" была перемещена из "{{initialStatusTitle}}" в "{{currentStatusTitle}}"',
		},
	},

	// Clients
	clients: {
		title: 'Список клиентов',
		searchPlaceholder: 'Поиск клиента...',
		addClient: 'Добавить клиента',
		editClient: 'Редактирование клиента',
		newClient: 'Новый клиент',
		deleteClient: 'Удалить клиента?',
		deleteConfirm:
			'Это действие нельзя отменить. Клиент будет полностью удален из системы.',
		archiveClient: 'Переместить в архив?',
		archiveConfirm:
			'Клиент будет перемещен в архив. Вы сможете восстановить его позже.',
		archiveReason: 'Причина (опционально):',
		archiveReasonPlaceholder: 'Например: Нет активности более 30 дней',
		clientDeleted: 'Клиент удален',
		clientArchived: 'Клиент в архиве',
		clientRestored: 'Клиент восстановлен',
		clientAdded: 'Клиент добавлен',
		clientUpdated: 'Клиент обновлен',
		viewHistory: 'История действий',
		edit: 'Редактировать',
		delete: 'Удалить',
		toArchive: 'В архив',
		restore: 'Восстановить',
		noData: 'Данных не найдено',

		// Table headers
		table: {
			client: 'Клиент',
			phone: 'Телефон',
			manager: 'Менеджер',
			status: 'Статус',
			lastContact: 'Последний контакт',
			actions: 'Действия',
		},

		// Form fields
		form: {
			name: 'Имя Фамилия',
			namePlaceholder: 'Александр Иванов',
			email: 'Email',
			emailPlaceholder: 'mail@example.com',
			phone: 'Телефон',
			phonePlaceholder: '+7 (999)...',
			source: 'Источник',
			manager: 'Ответственный менеджер',
			selectManager: 'Выберите менеджера',
			noManager: 'Не назначен',
			save: 'Сохранить',
			cancel: 'Отмена',
			saveChanges: 'Сохранить изменения',
		},

		// Statuses
		statuses: {
			active: 'Активный',
			pending: 'Ожидает',
			in_progress: 'В процессе',
			archived: 'Архив',
			all: 'Все статусы',
		},

		// Sources
		sources: {
			Google: 'Google',
			Yandex: 'Yandex',
			WhatsApp: 'WhatsApp',
			'Social Media': 'Соцсети',
			'Walk-in': 'Пришел сам',
			Referral: 'Рекомендация',
			Email: 'Email',
			all: 'Все источники',
		},

		// Filters
		filters: {
			withoutArchive: 'Без архива',
			withArchive: 'С архивом',
		},
	},

	// Activity Logs
	activityLogs: {
		title: 'История действий',
		description:
			'Все действия в системе: создание, изменения, звонки, сообщения',
		totalRecords: 'Всего записей',
		searchPlaceholder: 'Поиск по действиям...',
		noData: 'Нет записей',
		noDataHint: 'Попробуйте изменить параметры фильтрации',
		allModules: 'Все модули',
		allTypes: 'Все типы',
		clearFilters: 'Сбросить',
		entity: 'Сущность',

		// Modules
		modules: {
			clients: 'Клиенты',
			deals: 'Сделки',
			products: 'Товары',
			finances: 'Финансы',
			system: 'Система',
		},

		// Action types
		types: {
			client_created: 'Клиент создан',
			client_updated: 'Клиент обновлен',
			client_deleted: 'Клиент удален',
			client_archived: 'Клиент в архиве',
			client_restored: 'Клиент восстановлен',
			client_status_changed: 'Статус клиента изменен',
			client_manager_assigned: 'Менеджер назначен',
			deal_created: 'Сделка создана',
			deal_status_changed: 'Статус сделки изменен',
			deal_product_added: 'Товар добавлен',
			deal_reminder_set: 'Напоминание установлено',
			deal_refused: 'Сделка в отказе',
			deal_sold: 'Сделка закрыта',
			call_made: 'Звонок',
			message_sent: 'Сообщение',
			note_added: 'Заметка добавлена',
			reminder_added: 'Напоминание',
			custom: 'Действие',
		},
	},

	// Common
	common: {
		cancel: 'Отмена',
		save: 'Сохранить',
		delete: 'Удалить',
		edit: 'Редактировать',
		add: 'Добавить',
		search: 'Поиск',
		filter: 'Фильтр',
		from: 'От',
		to: 'До',
	},
}
