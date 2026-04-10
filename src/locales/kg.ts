export const kg = {
	// Sidebar
	sidebar: {
		dashboard: 'Башкы панель',
		overview: 'Көрүнүш',
		managers: 'Менеджерлер',
		finance: 'Акча',
		sales: 'Сатуулар',
		clients: 'Клиенттер',
		products: 'Товарлар',
		funnel: 'Сатуу воронкасы',
		activityLogs: 'Аракеттер тарыхы',
		archive: 'Архив',
	},

	// Kanban
	kanban: {
		columns: {
			new: 'Жаңы',
			contacted: 'Байланыштык',
			agreed: 'Макулдаштык',
			bought: 'Сатып алды',
			refused: 'Баш тартты',
		},
	},

	// Clients
	clients: {
		title: 'Клиенттер тизмеси',
		searchPlaceholder: 'Клиентти издөө...',
		addClient: 'Клиент кошуу',
		editClient: 'Клиентти оңдоо',
		newClient: 'Жаңы клиент',
		deleteClient: 'Клиентти өчүрөсүзбү?',
		deleteConfirm:
			'Бул аракетти кайтаруу мүмкүн эмес. Клиент толугу менен өчүрүлөт.',
		archiveClient: 'Архивге ташыйсызбы?',
		archiveConfirm: 'Клиент архивге ташылат. Кийин калыбына келтире аласыз.',
		archiveReason: 'Себеп (милдеттүү эмес):',
		archiveReasonPlaceholder: 'Мисалы: 30 күндөн ашык активдүүлүк жок',
		clientDeleted: 'Клиент өчүрүлдү',
		clientArchived: 'Клиент архивге ташылды',
		clientRestored: 'Клиент калыбына келтирилди',
		clientAdded: 'Клиент кошулду',
		clientUpdated: 'Клиент жаңыланды',
		viewHistory: 'Аракеттер тарыхы',
		edit: 'Оңдоо',
		delete: 'Өчүрүү',
		toArchive: 'Архивге',
		restore: 'Калыбына келтирүү',
		noData: 'Маалымат табылган жок',

		// Table headers
		table: {
			client: 'Клиент',
			phone: 'Телефон',
			manager: 'Менеджер',
			status: 'Статус',
			lastContact: 'Акыркы байланыш',
			actions: 'Аракеттер',
		},

		// Form fields
		form: {
			name: 'Аты-жөнү',
			namePlaceholder: 'Асан Иванов',
			email: 'Email',
			emailPlaceholder: 'mail@example.com',
			phone: 'Телефон',
			phonePlaceholder: '+996 (999)...',
			source: 'Булак',
			manager: 'Жооптуу менеджер',
			selectManager: 'Менеджерди тандоо',
			noManager: 'Дайындалган эмес',
			save: 'Сактоо',
			cancel: 'Жокко чыгаруу',
			saveChanges: 'Өзгөртүүлөрдү сактоо',
		},

		// Statuses
		statuses: {
			active: 'Активдүү',
			pending: 'Күтүүдө',
			in_progress: 'Процессте',
			archived: 'Архив',
			all: 'Бардык статус',
		},

		// Sources
		sources: {
			Google: 'Google',
			Yandex: 'Yandex',
			WhatsApp: 'WhatsApp',
			'Social Media': 'Социалдык тармактар',
			'Walk-in': 'Өзү келди',
			Referral: 'Сунуш',
			Email: 'Email',
			all: 'Бардык булактар',
		},

		// Filters
		filters: {
			withoutArchive: 'Архивсиз',
			withArchive: 'Архив менен',
		},
	},

	// Activity Logs
	activityLogs: {
		title: 'Аракеттер тарыхы',
		description:
			'Системадагы бардык аракеттер: түзүү, өзгөртүү, чалуулар, билдирүүлөр',
		totalRecords: 'Жалпы жазуулар',
		searchPlaceholder: 'Аракеттерди издөө...',
		noData: 'Жазуулар жок',
		noDataHint: 'Фильтр параметрлерин өзгөртүп көрүңүз',
		allModules: 'Бардык модулдар',
		allTypes: 'Бардык түрлөр',
		clearFilters: 'Тазалоо',
		entity: 'Сущность',

		// Modules
		modules: {
			clients: 'Клиенттер',
			deals: 'Сатуулар',
			products: 'Товарлар',
			finances: 'Каржы',
			system: 'Система',
		},

		// Action types
		types: {
			client_created: 'Клиент түзүлдү',
			client_updated: 'Клиент жаңыланды',
			client_deleted: 'Клиент өчүрүлдү',
			client_archived: 'Клиент архивге ташылды',
			client_restored: 'Клиент калыбына келтирилди',
			client_status_changed: 'Клиент статусу өзгөрдү',
			client_manager_assigned: 'Менеджер дайындалды',
			deal_created: 'Сатуу түзүлдү',
			deal_status_changed: 'Сатуу статусу өзгөрдү',
			deal_product_added: 'Товар кошулду',
			deal_reminder_set: 'Эскертме коюлду',
			deal_refused: 'Сатуудан баш тартылды',
			deal_sold: 'Сатуу жабылды',
			call_made: 'Чалуу жасалды',
			message_sent: 'Билдирүү жөнөтүлдү',
			note_added: 'Белгі кошулду',
			reminder_added: 'Эскертме',
			custom: 'Аракет',
		},
	},

	// Common
	common: {
		cancel: 'Жокко чыгаруу',
		save: 'Сактоо',
		delete: 'Өчүрүү',
		edit: 'Оңдоо',
		add: 'Кошуу',
		search: 'Издөө',
		filter: 'Фильтр',
		from: 'Башталышы',
		to: 'Аягы',
	},
}
