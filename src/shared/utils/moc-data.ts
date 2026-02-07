import type { TFunction } from 'i18next'

// -----------------------------------------------------------------------------
// TYPES DEFINITIONS
// -----------------------------------------------------------------------------

// Shared Types
export type Id = string | number

// Kanban Types
export type ColumnType = 'planned' | 'in_progress' | 'done'

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
	assignee?: string
	assigneeName?: string
	clientInfo?: TaskClientInfo
}

export type WhatsAppMessage = {
	id: string
	from: 'client' | 'manager'
	text: string
	time: string
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

// Kanban Data
export const getInitialColumns = (t: TFunction): Column[] => [
	{
		id: 'planned',
		title: t('kanban.columns.planned'),
		color: 'bg-slate-400',
	},
	{
		id: 'in_progress',
		title: t('kanban.columns.in_progress'),
		color: 'bg-orange-400',
	},
	{
		id: 'done',
		title: t('kanban.columns.done'),
		color: 'bg-emerald-500',
	},
]

export const initialTasks: Task[] = [
	{
		id: '1',
		status: 'planned',
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
	},
	{
		id: '2',
		status: 'in_progress',
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
	},
	{
		id: '3',
		status: 'in_progress',
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
	},
	{
		id: '4',
		status: 'done',
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
	},
	{
		id: '5',
		status: 'planned',
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
	},
	{
		id: '6',
		status: 'planned',
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
	},
	{
		id: '7',
		status: 'planned',
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
	},
	{
		id: '8',
		status: 'planned',
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
	},
]

export const taskChatMessages: Record<string, WhatsAppMessage[]> = {
	'1': [
		{ id: 'm1', from: 'client', text: 'Добрый день! Интересует разработка MVP для нашего стартапа.', time: '10:32' },
		{ id: 'm2', from: 'manager', text: 'Добрый день! Расскажите, пожалуйста, какой функционал планируете в первую очередь?', time: '10:35' },
		{ id: 'm3', from: 'client', text: 'Нужен личный кабинет, каталог и оплата. Сроки сжатые — к концу января.', time: '10:38' },
		{ id: 'm4', from: 'manager', text: 'Понял. Отправил коммерческое предложение на почту. Бюджет 450 000 ₽ укладывается?', time: '10:42' },
		{ id: 'm5', from: 'client', text: 'Да, бюджет ок. Ждём смету по этапам.', time: '11:15' },
	],
	'2': [
		{ id: 'm1', from: 'manager', text: 'Здравствуйте! Готов черновой макет главной страницы. Можем созвониться сегодня?', time: '09:00' },
		{ id: 'm2', from: 'client', text: 'Доброе утро. Да, после 14:00 свободен.', time: '09:12' },
		{ id: 'm3', from: 'manager', text: 'Отлично, создам встречу на 14:30. Ссылку пришлю в календарь.', time: '09:15' },
		{ id: 'm4', from: 'client', text: 'Ждем утверждения макета главной, потом перейдём к остальным страницам.', time: '14:45' },
	],
	'3': [
		{ id: 'm1', from: 'client', text: 'Когда будет готов отчёт по аудиту?', time: '11:20' },
		{ id: 'm2', from: 'manager', text: 'К концу недели подготовлю предварительную версию. Сегодня закончу раздел по безопасности.', time: '11:25' },
	],
	'4': [
		{ id: 'm1', from: 'client', text: 'Спасибо за работу! Всё сдали в срок.', time: '18:00' },
		{ id: 'm2', from: 'manager', text: 'Благодарим за обратную связь. Если понадобится доработка — пишите.', time: '18:05' },
	],
	'5': [
		{ id: 'm1', from: 'manager', text: 'Добрый день! По Smart Contracts — нужны ли вам тесты на Solidity или только аудит кода?', time: '12:00' },
		{ id: 'm2', from: 'client', text: 'И аудит, и тесты. У нас уже есть черновая версия.', time: '12:30' },
	],
	'6': [
		{ id: 'm1', from: 'client', text: 'Хотим интегрировать CRM с 1С. Это входит в ваш пакет?', time: '15:00' },
		{ id: 'm2', from: 'manager', text: 'Да, интеграция с 1С входит. Оценка 250 000 ₽, срок 2 недели после подписания.', time: '15:20' },
	],
	'7': [
		{ id: 'm1', from: 'manager', text: 'Здравствуйте! Назначили вас на аудит. Когда удобно созвониться?', time: '10:00' },
		{ id: 'm2', from: 'client', text: 'В четверг после 17:00.', time: '10:15' },
	],
	'8': [
		{ id: 'm1', from: 'client', text: 'Нужен дизайн мобильного приложения под iOS и Android. Есть референсы.', time: '16:00' },
		{ id: 'm2', from: 'manager', text: 'Пришлите референсы и ТЗ, подготовлю оценку по срокам и бюджету.', time: '16:30' },
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
