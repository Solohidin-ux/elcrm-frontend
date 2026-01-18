import type { TFunction } from 'i18next'

export type Id = string | number

export type ColumnType = 'planned' | 'in_progress' | 'done'

export type Task = {
	id: Id
	status: ColumnType
	title: string
	description?: string
	priority: 'low' | 'medium' | 'high'
	budget: string
	dateRange: string
	checklist: { total: number; completed: number }
	assignee?: string
}

export type Column = {
	id: ColumnType
	title: string
	color: string
}

// --- MOCK DATA ---
export const getInitialColumns = (t: TFunction): Column[] => [
	{
		id: 'planned',
		title: t('kanban.columns.planned'), // Используем переданную функцию
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
		checklist: { total: 3, completed: 0 },
		assignee: 'https://i.pravatar.cc/150?u=1',
	},
	{
		id: '2',
		status: 'in_progress',
		title: 'ИП Смирнов — Редизайн сайта',
		priority: 'high',
		budget: '120 000 ₽',
		dateRange: '9 янв. - 20 янв.',
		checklist: { total: 4, completed: 2 },
		assignee: 'Ch',
		description: 'Ждем утверждения макета главной',
	},
	{
		id: '3',
		status: 'in_progress',
		title: 'StartUp Inc — Аудит бэкенда',
		priority: 'low',
		budget: '80 000 ₽',
		dateRange: '5 янв. - 9 фев.',
		checklist: { total: 3, completed: 1 },
		assignee: 'https://i.pravatar.cc/150?u=3',
	},
	{
		id: '4',
		status: 'done',
		title: 'Beauty Salon — Таргет ВК',
		priority: 'medium',
		budget: 'Оплачено: 60k',
		dateRange: '5 янв. - 6 фев.',
		checklist: { total: 3, completed: 3 },
		assignee: 'Br',
	},
	{
		id: '5',
		status: 'planned',
		title: 'CryptoProj — Smart Contracts',
		priority: 'high',
		budget: '900 000 ₽',
		dateRange: '20 фев. - 30 мар.',
		checklist: { total: 5, completed: 0 },
		assignee: 'https://i.pravatar.cc/150?u=5',
	},
	{
		id: '6',
		status: 'planned',
		title: 'Logistics Co — CRM Integration',
		priority: 'low',
		budget: '250 000 ₽',
		dateRange: '1 мар. - 15 мар.',
		checklist: { total: 2, completed: 0 },
		assignee: 'Al',
	},
	{
		id: '7',
		status: 'planned',
		title: 'New Client - Audit',
		priority: 'low',
		budget: '50 000 ₽',
		dateRange: '10 апр.',
		checklist: { total: 1, completed: 0 },
		assignee: 'A',
	},
	{
		id: '8',
		status: 'planned',
		title: 'Mobile App Design',
		priority: 'high',
		budget: '350 000 ₽',
		dateRange: '15 апр. - 20 мая',
		checklist: { total: 10, completed: 2 },
		assignee: 'D',
	},
]
