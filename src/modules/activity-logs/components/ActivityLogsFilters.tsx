import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useActivityLogsStore } from '@/shared/store/activity-logs-store'
import {
	activityLogModuleConfig,
	type ActivityLogModule,
	type ActivityLogType,
} from '@/shared/types/activity-log'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { format } from 'date-fns'
import { Calendar as CalendarIcon, Search, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

function ActivityLogsFilters() {
	const { t } = useTranslation()
	const {
		moduleFilter,
		typeFilter,
		searchQuery,
		dateFrom,
		dateTo,
		setModuleFilter,
		setTypeFilter,
		setSearchQuery,
		setDateFrom,
		setDateTo,
		clearFilters,
	} = useActivityLogsStore()

	return (
		<div className='p-4 border-b bg-slate-50/50'>
			<div className='flex flex-col gap-4'>
				{/* Поиск */}
				<div className='relative flex-1 max-w-md'>
					<Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400' />
					<Input
						placeholder={t('activityLogs.searchPlaceholder')}
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
						className='h-10 pl-9 bg-white'
					/>
				</div>

				{/* Фильтры */}
				<div className='flex flex-wrap items-center gap-3'>
					{/* Модуль */}
					<Select
						value={moduleFilter}
						onValueChange={v =>
							setModuleFilter(v as ActivityLogModule | 'all')
						}
					>
						<SelectTrigger className='h-10 w-[140px] bg-white'>
							<SelectValue placeholder='Модуль' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='all'>
								{t('activityLogs.allModules')}
							</SelectItem>
							{(
								Object.keys(activityLogModuleConfig) as ActivityLogModule[]
							).map(module => (
								<SelectItem key={module} value={module}>
									{t(`activityLogs.modules.${module}`)}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					{/* Тип */}
					<Select
						value={typeFilter}
						onValueChange={v => setTypeFilter(v as ActivityLogType | 'all')}
					>
						<SelectTrigger className='h-10 w-[180px] bg-white'>
							<SelectValue placeholder='Тип' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='all'>
								{t('activityLogs.allTypes')}
							</SelectItem>
							{(
								[
									'client_created',
									'client_updated',
									'client_deleted',
									'client_archived',
									'client_restored',
									'client_status_changed',
									'client_manager_assigned',
									'deal_created',
									'deal_status_changed',
									'deal_product_added',
									'deal_reminder_set',
									'deal_refused',
									'deal_sold',
									'call_made',
									'message_sent',
									'note_added',
									'reminder_added',
								] as ActivityLogType[]
							).map(type => (
								<SelectItem key={type} value={type}>
									{t(`activityLogs.types.${type}`)}
								</SelectItem>
							))}
						</SelectContent>
					</Select>

					{/* Дата от - Calendar Popover */}
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant='outline'
								className={cn(
									'h-10 w-[200px] justify-start text-left font-normal bg-white',
									!dateFrom && 'text-muted-foreground',
								)}
							>
								<CalendarIcon className='mr-2 h-4 w-4' />
								{dateFrom ? format(new Date(dateFrom), 'PPP') : t('common.from')}
							</Button>
						</PopoverTrigger>
						<PopoverContent className='w-auto p-0'>
							<Calendar
								mode='single'
								selected={dateFrom ? new Date(dateFrom) : undefined}
								onSelect={date =>
									setDateFrom(date ? format(date, 'yyyy-MM-dd') : '')
								}
								initialFocus
							/>
						</PopoverContent>
					</Popover>

					{/* Дата до - Calendar Popover */}
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant='outline'
								className={cn(
									'h-10 w-[200px] justify-start text-left font-normal bg-white',
									!dateTo && 'text-muted-foreground',
								)}
							>
								<CalendarIcon className='mr-2 h-4 w-4' />
								{dateTo ? format(new Date(dateTo), 'PPP') : t('common.to')}
							</Button>
						</PopoverTrigger>
						<PopoverContent className='w-auto p-0'>
							<Calendar
								mode='single'
								selected={dateTo ? new Date(dateTo) : undefined}
								onSelect={date =>
									setDateTo(date ? format(date, 'yyyy-MM-dd') : '')
								}
								initialFocus
							/>
						</PopoverContent>
					</Popover>

					{/* Сбросить фильтры */}
					<Button
						variant='outline'
						size='sm'
						onClick={clearFilters}
						className='gap-2'
					>
						<X className='h-4 w-4' />
						{t('activityLogs.clearFilters')}
					</Button>
				</div>
			</div>
		</div>
	)
}

export default ActivityLogsFilters
