import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import Layout from '@/shared/components/Layout'
import { useActivityLogsStore } from '@/shared/store/activity-logs-store'
import {
	activityLogModuleConfig,
	type ActivityLogModule,
	type ActivityLogType,
} from '@/shared/types/activity-log'
import {
	Activity,
	Archive,
	ArrowRight,
	Bell,
	Check,
	Clock,
	FileText,
	MessageCircle,
	Package,
	Phone,
	Plus,
	RefreshCw,
	Search,
	UserCheck,
	UserMinus,
	UserPlus,
	X,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

// Иконки для типов логов
const logTypeIcons: Record<ActivityLogType, React.ReactNode> = {
	client_created: <UserPlus className='h-4 w-4' />,
	client_updated: <RefreshCw className='h-4 w-4' />,
	client_deleted: <UserMinus className='h-4 w-4' />,
	client_archived: <Archive className='h-4 w-4' />,
	client_restored: <RefreshCw className='h-4 w-4' />,
	client_status_changed: <RefreshCw className='h-4 w-4' />,
	client_manager_assigned: <UserCheck className='h-4 w-4' />,
	deal_created: <Plus className='h-4 w-4' />,
	deal_status_changed: <ArrowRight className='h-4 w-4' />,
	deal_product_added: <Package className='h-4 w-4' />,
	deal_reminder_set: <Bell className='h-4 w-4' />,
	deal_refused: <X className='h-4 w-4' />,
	deal_sold: <Check className='h-4 w-4' />,
	call_made: <Phone className='h-4 w-4' />,
	message_sent: <MessageCircle className='h-4 w-4' />,
	note_added: <FileText className='h-4 w-4' />,
	reminder_added: <Bell className='h-4 w-4' />,
	custom: <Activity className='h-4 w-4' />,
}

function ActivityLogsPage() {
	const { t } = useTranslation()
	const {
		filteredLogs,
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

	const formatDate = (timestamp: string) => {
		return new Date(timestamp).toLocaleDateString('ru-RU', {
			day: 'numeric',
			month: 'short',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		})
	}

	const content = (
		<Layout>
			{/* Заголовок */}
			<div className='flex items-center justify-between p-4 border-b'>
				<div>
					<h1 className='text-2xl font-bold tracking-tight text-gray-900'>
						{t('activityLogs.title')}
					</h1>
					<p className='text-sm text-muted-foreground mt-1'>
						{t('activityLogs.description')}
					</p>
				</div>
				<div className='text-sm text-muted-foreground'>
					{t('activityLogs.totalRecords')}: {filteredLogs.length}
				</div>
			</div>

			{/* Фильтры */}
			<div className='p-4 border-b bg-slate-50/50'>
				<div className='flex flex-col lg:flex-row gap-4'>
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

						{/* Дата от */}
						<Input
							type='date'
							value={dateFrom}
							onChange={e => setDateFrom(e.target.value)}
							className='h-10 w-[150px] bg-white'
							placeholder={t('common.from')}
						/>

						{/* Дата до */}
						<Input
							type='date'
							value={dateTo}
							onChange={e => setDateTo(e.target.value)}
							className='h-10 w-[150px] bg-white'
							placeholder={t('common.to')}
						/>

						{/* Сбросить фильтры */}
						<Button variant='outline' size='sm' onClick={clearFilters}>
							{t('activityLogs.clearFilters')}
						</Button>
					</div>
				</div>
			</div>

			{/* Список логов */}
			<div className='p-4'>
				{filteredLogs.length === 0 ? (
					<div className='text-center py-12'>
						<Activity className='h-12 w-12 text-slate-300 mx-auto mb-4' />
						<p className='text-slate-500'>{t('activityLogs.noData')}</p>
						<p className='text-sm text-slate-400 mt-1'>
							{t('activityLogs.noDataHint')}
						</p>
					</div>
				) : (
					<div className='space-y-2'>
						{filteredLogs.map(log => (
							<div
								key={log.id}
								className='flex items-start gap-4 p-4 rounded-lg border bg-white hover:bg-slate-50/50 transition-colors'
							>
								{/* Иконка */}
								<div className='flex-shrink-0 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600'>
									{logTypeIcons[log.type]}
								</div>

								{/* Контент */}
								<div className='flex-1 min-w-0'>
									<div className='flex items-start justify-between gap-4'>
										<div>
											<p className='font-medium text-slate-900'>
												{t(`activityLogs.types.${log.type}`)}
											</p>
											{log.description && (
												<p className='text-sm text-slate-600 mt-0.5'>
													{log.description}
												</p>
											)}
											{log.entityName && (
												<p className='text-xs text-slate-500 mt-1'>
													{t('activityLogs.entity')}: {log.entityName}
												</p>
											)}
										</div>

										<div className='flex items-center gap-2 shrink-0'>
											<Badge
												variant='secondary'
												className={activityLogModuleConfig[log.module].color}
											>
												{t(`activityLogs.modules.${log.module}`)}
											</Badge>
										</div>
									</div>

									{/* Мета-информация */}
									<div className='flex items-center gap-4 mt-2 text-xs text-slate-500'>
										<div className='flex items-center gap-1'>
											<span className='font-medium'>{log.userName}</span>
										</div>
										<div className='flex items-center gap-1'>
											<Clock className='h-3 w-3' />
											{formatDate(log.timestamp)}
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</Layout>
	)

	return content
}

export default ActivityLogsPage
