import type { TFunction } from 'i18next'

// -----------------------------------------------------------------------------
// TYPES DEFINITIONS
// -----------------------------------------------------------------------------

// Shared Types
export type Id = string | number

// Kanban Types
export type ColumnType = 'new' | 'contacted' | 'agreed' | 'bought' | 'refused'

export type Column = {
	id: ColumnType
	title: string
	color: string
}

export type TaskClientInfo = {
	name: string
	phone: string
	email: string
}

export type ChecklistItem = {
	id: string
	text: string
	done: boolean
}

export type Product = {
	id: string
	name: string
	category: string
	price: number
	is_active: boolean
}

export type DiscountType = 'percent' | 'amount'

export type Discount = {
	type: DiscountType
	value: number // проценты (0-100) или сумма в сомах
}

export type ClientStatus = 'active' | 'pending' | 'inactive' | 'blocked' | 'refused'

export type InteractionHistoryItem = {
	id: string
	date: string
	type: 'call' | 'message' | 'meeting' | 'email' | 'note'
	description: string
	manager?: string
}

export type Note = {
	id: string
	text: string
	createdAt: string
	createdBy: string
	isPersonal?: boolean
}

export type Reminder = {
	id: string
	title: string
	date: string
	time: string
	completed: boolean
	createdBy: string
}

export type StatusFlag = {
	type: 'client_ignoring' | 'client_postponed' | 'client_blocked' | 'none'
	reason?: string
	setAt?: string
	setBy?: string
}

export type ActionLog = {
	id: string
	action: string
	userId: string
	userName: string
	timestamp: string
	details?: string
}

export type InternalMessage = {
	id: string
	text: string
	userId: string
	userName: string
	createdAt: string
}

export type Task = {
	id: Id
	status: ColumnType
	title: string
	description?: string
	priority: 'low' | 'medium' | 'high'
	budget: string
	dateRange: string
	dateAdded: string
	deadline: string
	checklist: ChecklistItem[]
	products?: Product[]
	discount?: Discount
	assignee?: string
	assigneeName?: string
	clientInfo?: TaskClientInfo
	clientStatus?: ClientStatus
	interactionHistory?: InteractionHistoryItem[]
	notes?: Note[]
	reminders?: Reminder[]
	refusalComment?: string
	statusFlags?: StatusFlag
	actionLogs?: ActionLog[]
	internalMessages?: InternalMessage[]
	todoList?: ChecklistItem[] // Отдельный туду-лист для заметок
}

export type WhatsAppMessage = {
	id: string
	from: 'client' | 'manager'
	text: string
	time: string
	timestamp: number // Unix timestamp for sorting
}

// Finance Types
export interface IAnalytics {
	today: number
	month: number
	growthDay: string
	growthMonth: string
}

export interface ISeller {
	id: number
	name: string
	position: string
	totalSales: number
	deals: number
	avatarColor: string
}

export interface IProduct {
	id: number
	name: string
	conversion: number
	sales: number
}

// -----------------------------------------------------------------------------
// MOCK DATA & HELPERS
// -----------------------------------------------------------------------------

// Mock Products for Tasks
export const mockProducts: Product[] = [
	{
		id: 'PROD-001',
		name: 'Беспроводные наушники Sony WH-1000XM5',
		category: 'Электроника',
		price: 35990,
		is_active: true,
	},
	{
		id: 'PROD-002',
		name: 'Кофемашина Philips Series 2200',
		category: 'Бытовая техника',
		price: 42000,
		is_active: true,
	},
	{
		id: 'PROD-003',
		name: 'Офисное кресло Markus',
		category: 'Мебель',
		price: 15999,
		is_active: false,
	},
	{
		id: 'PROD-004',
		name: 'Механическая клавиатура Keychron K2',
		category: 'Компьютеры',
		price: 8500,
		is_active: true,
	},
	{
		id: 'PROD-005',
		name: 'iPhone 15 Pro',
		category: 'Смартфоны',
		price: 99990,
		is_active: true,
	},
	{
		id: 'PROD-006',
		name: 'MacBook Air M2',
		category: 'Компьютеры',
		price: 129990,
		is_active: true,
	},
	{
		id: 'PROD-007',
		name: 'iPad Air 5',
		category: 'Планшеты',
		price: 59990,
		is_active: true,
	},
	{
		id: 'PROD-008',
		name: 'Samsung Galaxy S24',
		category: 'Смартфоны',
		price: 79990,
		is_active: true,
	},
]

// Kanban Data
export const getInitialColumns = (t: TFunction): Column[] => [
	{
		id: 'new',
		title: t('kanban.columns.new'),
		color: 'bg-slate-400',
	},
	{
		id: 'contacted',
		title: t('kanban.columns.contacted'),
		color: 'bg-blue-400',
	},
	{
		id: 'agreed',
		title: t('kanban.columns.agreed'),
		color: 'bg-orange-400',
	},
	{
		id: 'bought',
		title: t('kanban.columns.bought'),
		color: 'bg-emerald-500',
	},
	{
		id: 'refused',
		title: t('kanban.columns.refused'),
		color: 'bg-red-400',
	},
]

export const initialTasks: Task[] = [
	{
		id: '1',
		status: 'agreed',
		title: 'ООО Вектор — Разработка MVP',
		priority: 'medium',
		budget: '450 000 ₽',
		dateRange: '15 дек. - 26 янв.',
		dateAdded: '2024-12-01',
		deadline: '2025-01-26',
		checklist: [
			{ id: 'c1-1', text: 'Согласовать ТЗ', done: false },
			{ id: 'c1-2', text: 'Подписать договор', done: false },
			{ id: 'c1-3', text: 'Первый платёж', done: false },
		],
		assignee: 'https://i.pravatar.cc/150?u=1',
		assigneeName: 'Чингиз Касымов',
		clientInfo: { name: 'Алексей Петров', phone: '+7 (999) 123-45-67', email: 'a.petrov@vector.ru' },
		products: [mockProducts[5], mockProducts[6]], // MacBook Air M2, iPad Air 5
		clientStatus: 'active',
		interactionHistory: [
			{ id: 'ih1-1', date: '2024-12-01', type: 'call', description: 'Первичный звонок, обсуждение требований', manager: 'Чингиз Касымов' },
			{ id: 'ih1-2', date: '2024-12-05', type: 'meeting', description: 'Встреча для презентации решения', manager: 'Чингиз Касымов' },
		],
		notes: [
			{ id: 'n1-1', text: 'Клиент заинтересован в быстром запуске. Нужно ускорить разработку.', createdAt: '2024-12-01T10:00:00', createdBy: 'Чингиз Касымов', isPersonal: false },
		],
		reminders: [
			{ id: 'r1-1', title: 'Согласовать ТЗ', date: '2024-12-10', time: '14:00', completed: false, createdBy: 'Чингиз Касымов' },
		],
		actionLogs: [
			{ id: 'al1-1', action: 'Создана сделка', userId: 'user1', userName: 'Чингиз Касымов', timestamp: '2024-12-01T09:00:00' },
			{ id: 'al1-2', action: 'Добавлены товары', userId: 'user1', userName: 'Чингиз Касымов', timestamp: '2024-12-01T09:15:00', details: 'MacBook Air M2, iPad Air 5' },
		],
		internalMessages: [],
	},
	{
		id: '2',
		status: 'contacted',
		title: 'ИП Смирнов — Редизайн сайта',
		priority: 'high',
		budget: '120 000 ₽',
		dateRange: '9 янв. - 20 янв.',
		dateAdded: '2024-12-28',
		deadline: '2025-01-20',
		checklist: [
			{ id: 'c2-1', text: 'Макет главной страницы', done: true },
			{ id: 'c2-2', text: 'Утверждение макета', done: true },
			{ id: 'c2-3', text: 'Внутренние страницы', done: false },
			{ id: 'c2-4', text: 'Адаптив', done: false },
		],
		assignee: 'Ch',
		assigneeName: 'Чолпон Асанова',
		description: 'Ждем утверждения макета главной',
		clientInfo: { name: 'Игорь Смирнов', phone: '+7 (916) 555-12-34', email: 'smirnov@mail.ru' },
		products: [mockProducts[0]], // Sony WH-1000XM5
		clientStatus: 'active',
		interactionHistory: [
			{ id: 'ih2-1', date: '2024-12-28', type: 'call', description: 'Обсуждение редизайна', manager: 'Чолпон Асанова' },
			{ id: 'ih2-2', date: '2025-01-05', type: 'message', description: 'Отправлен черновой макет', manager: 'Чолпон Асанова' },
		],
		notes: [
			{ id: 'n2-1', text: 'Клиент очень требовательный к деталям. Нужно быть внимательным.', createdAt: '2024-12-28T11:00:00', createdBy: 'Чолпон Асанова', isPersonal: true },
		],
		reminders: [
			{ id: 'r2-1', title: 'Уточнить по макету', date: '2025-01-15', time: '10:00', completed: false, createdBy: 'Чолпон Асанова' },
		],
		internalMessages: [
			{ id: 'im2-1', text: 'Клиент просит добавить больше анимаций на главную страницу', userId: 'user2', userName: 'Чолпон Асанова', createdAt: '2025-01-05T14:30:00' },
		],
		actionLogs: [
			{ id: 'al2-1', action: 'Создана сделка', userId: 'user2', userName: 'Чолпон Асанова', timestamp: '2024-12-28T10:00:00' },
			{ id: 'al2-2', action: 'Изменен статус', userId: 'user2', userName: 'Чолпон Асанова', timestamp: '2025-01-01T09:00:00', details: 'planned -> in_progress' },
		],
	},
	{
		id: '3',
		status: 'contacted',
		title: 'StartUp Inc — Аудит бэкенда',
		priority: 'low',
		budget: '80 000 ₽',
		dateRange: '5 янв. - 9 фев.',
		dateAdded: '2024-12-20',
		deadline: '2025-02-09',
		checklist: [
			{ id: 'c3-1', text: 'Раздел безопасности', done: true },
			{ id: 'c3-2', text: 'Раздел производительности', done: false },
			{ id: 'c3-3', text: 'Рекомендации', done: false },
		],
		assignee: 'https://i.pravatar.cc/150?u=3',
		assigneeName: 'Марат Ибрагимов',
		clientInfo: { name: 'Дмитрий Козлов', phone: '+7 (903) 777-88-99', email: 'd.kozlov@startup.io' },
		products: [mockProducts[3], mockProducts[4]], // Keychron K2, iPhone 15 Pro
		clientStatus: 'pending',
		statusFlags: { type: 'client_postponed', reason: 'Клиент отложил решение до конца месяца', setAt: '2025-01-10T12:00:00', setBy: 'Марат Ибрагимов' },
		interactionHistory: [
			{ id: 'ih3-1', date: '2024-12-20', type: 'call', description: 'Первичный контакт', manager: 'Марат Ибрагимов' },
			{ id: 'ih3-2', date: '2025-01-10', type: 'email', description: 'Отправлен отчет по безопасности', manager: 'Марат Ибрагимов' },
		],
		notes: [],
		reminders: [],
		actionLogs: [
			{ id: 'al3-1', action: 'Создана сделка', userId: 'user3', userName: 'Марат Ибрагимов', timestamp: '2024-12-20T11:00:00' },
			{ id: 'al3-2', action: 'Установлен флаг статуса', userId: 'user3', userName: 'Марат Ибрагимов', timestamp: '2025-01-10T12:00:00', details: 'client_postponed' },
		],
		internalMessages: [],
	},
	{
		id: '4',
		status: 'bought',
		title: 'Beauty Salon — Таргет ВК',
		priority: 'medium',
		budget: 'Оплачено: 60k',
		dateRange: '5 янв. - 6 фев.',
		dateAdded: '2024-12-10',
		deadline: '2025-02-06',
		checklist: [
			{ id: 'c4-1', text: 'Креативы', done: true },
			{ id: 'c4-2', text: 'Настройка кампаний', done: true },
			{ id: 'c4-3', text: 'Отчёт', done: true },
		],
		assignee: 'Br',
		assigneeName: 'Бактыгул Рахманова',
		clientInfo: { name: 'Анна Белова', phone: '+7 (925) 111-22-33', email: 'beauty.salon@gmail.com' },
		products: [mockProducts[1], mockProducts[7]], // Кофемашина, Samsung S24
	},
	{
		id: '5',
		status: 'new',
		title: 'CryptoProj — Smart Contracts',
		priority: 'high',
		budget: '900 000 ₽',
		dateRange: '20 фев. - 30 мар.',
		dateAdded: '2025-01-15',
		deadline: '2025-03-30',
		checklist: [
			{ id: 'c5-1', text: 'Аудит кода', done: false },
			{ id: 'c5-2', text: 'Тесты Solidity', done: false },
			{ id: 'c5-3', text: 'Документация', done: false },
			{ id: 'c5-4', text: 'Отчёт', done: false },
			{ id: 'c5-5', text: 'Презентация', done: false },
		],
		assignee: 'https://i.pravatar.cc/150?u=5',
		assigneeName: 'Данияр Сулайманов',
		clientInfo: { name: 'Павел Новиков', phone: '+7 (495) 444-55-66', email: 'pavel@cryptoproj.com' },
		products: [mockProducts[5]], // MacBook Air M2
	},
	{
		id: '6',
		status: 'new',
		title: 'Logistics Co — CRM Integration',
		priority: 'low',
		budget: '250 000 ₽',
		dateRange: '1 мар. - 15 мар.',
		dateAdded: '2025-01-20',
		deadline: '2025-03-15',
		checklist: [
			{ id: 'c6-1', text: 'API интеграция', done: false },
			{ id: 'c6-2', text: 'Синхронизация заказов', done: false },
		],
		assignee: 'Al',
		assigneeName: 'Алтынай Кубанычбекова',
		clientInfo: { name: 'Сергей Волков', phone: '+7 (812) 333-44-55', email: 'volkov@logistics.co' },
		products: [mockProducts[3], mockProducts[4], mockProducts[6]], // Keychron K2, iPhone 15 Pro, iPad Air 5
	},
	{
		id: '7',
		status: 'new',
		title: 'New Client - Audit',
		priority: 'low',
		budget: '50 000 ₽',
		dateRange: '10 апр.',
		dateAdded: '2025-02-01',
		deadline: '2025-04-10',
		checklist: [
			{ id: 'c7-1', text: 'Созвон с клиентом', done: false },
		],
		assignee: 'A',
		assigneeName: 'Айгуль Токтомамбетова',
		clientInfo: { name: 'Михаил Федоров', phone: '+7 (343) 666-77-88', email: 'm.fedorov@ya.ru' },
		products: [mockProducts[0], mockProducts[2]], // Sony WH-1000XM5, Офисное кресло
	},
	{
		id: '8',
		status: 'agreed',
		title: 'Mobile App Design',
		priority: 'high',
		budget: '350 000 ₽',
		dateRange: '15 апр. - 20 мая',
		dateAdded: '2025-02-05',
		deadline: '2025-05-20',
		checklist: [
			{ id: 'c8-1', text: 'Wireframes', done: true },
			{ id: 'c8-2', text: 'UI Kit', done: true },
			{ id: 'c8-3', text: 'Экран авторизации', done: false },
			{ id: 'c8-4', text: 'Главный экран', done: false },
			{ id: 'c8-5', text: 'Профиль', done: false },
			{ id: 'c8-6', text: 'Настройки', done: false },
			{ id: 'c8-7', text: 'Список товаров', done: false },
			{ id: 'c8-8', text: 'Карточка товара', done: false },
			{ id: 'c8-9', text: 'Корзина', done: false },
			{ id: 'c8-10', text: 'Оформление заказа', done: false },
		],
		assignee: 'D',
		assigneeName: 'Дастан Омурзаков',
		clientInfo: { name: 'Елена Соколова', phone: '+7 (911) 999-00-11', email: 'elena@design.studio' },
		products: [mockProducts[4], mockProducts[6], mockProducts[7]], // iPhone 15 Pro, iPad Air 5, Samsung S24
	},
]

export const taskChatMessages: Record<string, WhatsAppMessage[]> = {
	'1': [
		{ id: 'm1', from: 'client', text: 'Добрый день! Интересует разработка MVP для нашего стартапа.', time: '10:32', timestamp: new Date('2025-01-10T10:32:00').getTime() },
		{ id: 'm2', from: 'manager', text: 'Добрый день! Расскажите, пожалуйста, какой функционал планируете в первую очередь?', time: '10:35', timestamp: new Date('2025-01-10T10:35:00').getTime() },
		{ id: 'm3', from: 'client', text: 'Нужен личный кабинет, каталог и оплата. Сроки сжатые — к концу января.', time: '10:38', timestamp: new Date('2025-01-10T10:38:00').getTime() },
		{ id: 'm4', from: 'manager', text: 'Понял. Отправил коммерческое предложение на почту. Бюджет 450 000 ₽ укладывается?', time: '10:42', timestamp: new Date('2025-01-10T10:42:00').getTime() },
		{ id: 'm5', from: 'client', text: 'Да, бюджет ок. Ждём смету по этапам.', time: '11:15', timestamp: new Date('2025-01-10T11:15:00').getTime() },
	],
	'2': [
		{ id: 'm1', from: 'manager', text: 'Здравствуйте! Готов черновой макет главной страницы. Можем созвониться сегодня?', time: '09:00', timestamp: new Date('2025-01-12T09:00:00').getTime() },
		{ id: 'm2', from: 'client', text: 'Доброе утро. Да, после 14:00 свободен.', time: '09:12', timestamp: new Date('2025-01-12T09:12:00').getTime() },
		{ id: 'm3', from: 'manager', text: 'Отлично, создам встречу на 14:30. Ссылку пришлю в календарь.', time: '09:15', timestamp: new Date('2025-01-12T09:15:00').getTime() },
		{ id: 'm4', from: 'client', text: 'Ждем утверждения макета главной, потом перейдём к остальным страницам.', time: '14:45', timestamp: new Date('2025-01-12T14:45:00').getTime() },
	],
	'3': [
		{ id: 'm1', from: 'client', text: 'Когда будет готов отчёт по аудиту?', time: '11:20', timestamp: new Date('2025-01-14T11:20:00').getTime() },
		{ id: 'm2', from: 'manager', text: 'К концу недели подготовлю предварительную версию. Сегодня закончу раздел по безопасности.', time: '11:25', timestamp: new Date('2025-01-14T11:25:00').getTime() },
	],
	'4': [
		{ id: 'm1', from: 'client', text: 'Спасибо за работу! Всё сдали в срок.', time: '18:00', timestamp: new Date('2025-01-08T18:00:00').getTime() },
		{ id: 'm2', from: 'manager', text: 'Благодарим за обратную связь. Если понадобится доработка — пишите.', time: '18:05', timestamp: new Date('2025-01-08T18:05:00').getTime() },
	],
	'5': [
		{ id: 'm1', from: 'manager', text: 'Добрый день! По Smart Contracts — нужны ли вам тесты на Solidity или только аудит кода?', time: '12:00', timestamp: new Date('2025-01-16T12:00:00').getTime() },
		{ id: 'm2', from: 'client', text: 'И аудит, и тесты. У нас уже есть черновая версия.', time: '12:30', timestamp: new Date('2025-01-16T12:30:00').getTime() },
	],
	'6': [
		{ id: 'm1', from: 'client', text: 'Хотим интегрировать CRM с 1С. Это входит в ваш пакет?', time: '15:00', timestamp: new Date('2025-01-18T15:00:00').getTime() },
		{ id: 'm2', from: 'manager', text: 'Да, интеграция с 1С входит. Оценка 250 000 ₽, срок 2 недели после подписания.', time: '15:20', timestamp: new Date('2025-01-18T15:20:00').getTime() },
	],
	'7': [
		{ id: 'm1', from: 'manager', text: 'Здравствуйте! Назначили вас на аудит. Когда удобно созвониться?', time: '10:00', timestamp: new Date('2025-01-20T10:00:00').getTime() },
		{ id: 'm2', from: 'client', text: 'В четверг после 17:00.', time: '10:15', timestamp: new Date('2025-01-20T10:15:00').getTime() },
	],
	'8': [
		{ id: 'm1', from: 'client', text: 'Нужен дизайн мобильного приложения под iOS и Android. Есть референсы.', time: '16:00', timestamp: new Date('2025-01-22T16:00:00').getTime() },
		{ id: 'm2', from: 'manager', text: 'Пришлите референсы и ТЗ, подготовлю оценку по срокам и бюджету.', time: '16:30', timestamp: new Date('2025-01-22T16:30:00').getTime() },
	],
}

// Finance Data
export const finance_analytics: IAnalytics = {
	today: 145000,
	month: 3200000,
	growthDay: '+12%',
	growthMonth: '+5%',
}

export const best_seller: ISeller = {
	id: 1,
	name: 'Алексей Смирнов',
	position: 'Senior Manager',
	totalSales: 1200000,
	deals: 45,
	avatarColor: 'bg-blue-500',
}

export const top_products: IProduct[] = [
	{ id: 101, name: 'Premium Подписка', conversion: 24.5, sales: 150 },
	{ id: 102, name: 'Базовый курс', conversion: 18.2, sales: 340 },
	{ id: 103, name: 'Консультация (Час)', conversion: 12.0, sales: 85 },
	{ id: 104, name: 'VIP Пакет', conversion: 5.8, sales: 12 },
]
