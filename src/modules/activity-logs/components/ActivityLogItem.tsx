import { Badge } from '@/components/ui/badge'
import {
	activityLogModuleConfig,
	type ActivityLog,
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

interface ActivityLogItemProps {
	log: ActivityLog
}

function ActivityLogItem({ log }: ActivityLogItemProps) {
	const { t } = useTranslation()

	const formatDate = (timestamp: string) => {
		return new Date(timestamp).toLocaleDateString('ru-RU', {
			day: 'numeric',
			month: 'short',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		})
	}

	return (
		<div className='flex items-start gap-4 p-4 rounded-lg border bg-white hover:bg-slate-50/50 transition-colors'>
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
	)
}

export default ActivityLogItem
