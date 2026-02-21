import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useClientsStore } from '@/shared/store/clients-store'
import { clientStatusConfig, type ClientStatus } from '@/shared/types/client'
import { Filter, Search } from 'lucide-react'
import ClientsAdd from './ClientsAdd'

function ClientsTopbar() {
	const {
		statusFilter,
		setStatusFilter,
		setSearchQuery,
		showArchived,
		setShowArchived,
	} = useClientsStore()

	const content = (
		<div className='flex flex-col gap-4 p-4'>
			{/* Верхняя часть: Заголовок и Кнопка добавления */}
			<div className='flex items-center justify-between'>
				<h1 className='text-2xl font-bold tracking-tight text-gray-900'>
					Список клиентов
				</h1>
				<ClientsAdd />
			</div>

			{/* Нижняя часть: Поиск (слева) и Фильтры (справа) */}
			<div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
				{/* 1. Поиск (Слева) */}
				<div className='relative w-full sm:w-auto sm:max-w-[300px]'>
					<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400' />
					<Input
						placeholder='Поиск клиента...'
						className='h-10 w-full pl-9 bg-white border-slate-300 shadow-sm focus-visible:ring-slate-400'
						onChange={e => setSearchQuery(e.target.value)}
					/>
				</div>

				{/* 2. Группа фильтров (Справа) */}
				<div className='flex flex-wrap items-center gap-3 w-full sm:w-auto justify-end'>
					{/* Фильтр по статусу */}
					<Select
						value={statusFilter}
						onValueChange={v => setStatusFilter(v as ClientStatus | 'all')}
					>
						<SelectTrigger className='h-10 w-[150px] border-dashed border-slate-300 bg-white text-slate-600 shadow-sm'>
							<div className='flex items-center gap-2'>
								<Filter className='h-3.5 w-3.5 opacity-50' />
								<SelectValue placeholder='Статус' />
							</div>
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='all'>Все статусы</SelectItem>
							{(Object.keys(clientStatusConfig) as ClientStatus[]).map(
								status => (
									<SelectItem key={status} value={status}>
										{clientStatusConfig[status].label}
									</SelectItem>
								),
							)}
						</SelectContent>
					</Select>

					{/* Переключатель архива */}
					<Select
						value={showArchived ? 'with_archived' : 'without_archived'}
						onValueChange={v => setShowArchived(v === 'with_archived')}
					>
						<SelectTrigger className='h-10 w-[150px] border-slate-300 bg-slate-50 font-medium text-slate-700 shadow-sm'>
							<SelectValue />
						</SelectTrigger>
						<SelectContent align='end'>
							<SelectItem value='without_archived'>Без архива</SelectItem>
							<SelectItem value='with_archived'>С архивом</SelectItem>
						</SelectContent>
					</Select>
				</div>
			</div>
		</div>
	)

	return content
}

export default ClientsTopbar
