import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Filter, Search } from 'lucide-react'
import ClientsAddClient from './ClientsAddClient'

// --- Конфигурация фильтров ---
const filtersConfig = [
	{
		key: 'status',
		placeholder: 'Статус',
		options: [
			{ value: 'all', label: 'Все статусы' },
			{ value: 'Active', label: 'Активен' },
			{ value: 'Pending', label: 'Ожидает' },
			{ value: 'Inactive', label: 'Неактивен' },
			{ value: 'Blocked', label: 'Заблокирован' },
		],
	},
	{
		key: 'source',
		placeholder: 'Источник',
		options: [
			{ value: 'all', label: 'Все источники' },
			{ value: 'Google', label: 'Google' },
			{ value: 'Yandex', label: 'Yandex' },
			{ value: 'WhatsApp', label: 'WhatsApp' },
			{ value: 'Social Media', label: 'Соцсети' },
			{ value: 'Walk-in', label: 'Пришел сам' },
			{ value: 'Referral', label: 'Рекомендация' },
		],
	},
]

function ClientsTopbar() {
	return (
		<div className='flex flex-col gap-4 p-4'>
			{/* Верхняя часть: Заголовок и Кнопка добавления */}
			<div className='flex items-center justify-between'>
				<h1 className='text-2xl font-bold tracking-tight text-gray-900'>
					Список клиентов
				</h1>
				<ClientsAddClient />
			</div>

			{/* Нижняя часть: Поиск (слева) и Фильтры/Сортировка (справа) */}
			<div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
				{/* 1. Поиск (Слева) */}
				<div className='relative w-full sm:w-auto sm:max-w-[300px]'>
					<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400' />
					<Input
						placeholder='Поиск клиента...'
						className='h-10 w-full pl-9 bg-white border-slate-300 shadow-sm focus-visible:ring-slate-400'
					/>
				</div>

				{/* 2. Группа фильтров и сортировки (Справа) */}
				<div className='flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end'>
					{/* Генерация фильтров из массива */}
					{filtersConfig.map(filter => (
						<Select key={filter.key}>
							<SelectTrigger className='h-10 w-[150px] border-dashed border-slate-300 bg-white text-slate-600 shadow-sm'>
								<div className='flex items-center gap-2'>
									<Filter className='h-3.5 w-3.5 opacity-50' />
									<SelectValue placeholder={filter.placeholder} />
								</div>
							</SelectTrigger>
							<SelectContent>
								{filter.options.map(option => (
									<SelectItem key={option.value} value={option.value}>
										{option.label}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					))}

					{/* Разделитель (опционально) */}
					<div className='h-6 w-px bg-slate-200 hidden sm:block mx-1' />

					{/* Сортировка (Выделена визуально как основной контрол) */}
					<Select defaultValue='newest'>
						<SelectTrigger className='h-10 w-[180px] border-slate-300 bg-slate-50 font-medium text-slate-700 shadow-sm'>
							<div className='flex items-center gap-2'>
								<SelectValue />
							</div>
						</SelectTrigger>
						<SelectContent align='end'>
							<SelectItem value='newest'>Сначала новые</SelectItem>
							<SelectItem value='oldest'>Сначала старые</SelectItem>
							<SelectItem value='spent-desc'>По чеку (max)</SelectItem>
							<SelectItem value='spent-asc'>По чеку (min)</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
		</div>
	)
}

export default ClientsTopbar
