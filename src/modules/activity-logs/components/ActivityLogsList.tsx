import { Activity } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { ActivityLog } from '@/shared/types/activity-log'
import ActivityLogItem from './ActivityLogItem'

interface ActivityLogsListProps {
	logs: ActivityLog[]
}

function ActivityLogsList({ logs }: ActivityLogsListProps) {
	const { t } = useTranslation()

	if (logs.length === 0) {
		return (
			<div className='text-center py-12'>
				<Activity className='h-12 w-12 text-slate-300 mx-auto mb-4' />
				<p className='text-slate-500'>{t('activityLogs.noData')}</p>
				<p className='text-sm text-slate-400 mt-1'>
					{t('activityLogs.noDataHint')}
				</p>
			</div>
		)
	}

	return (
		<div className='p-4'>
			<div className='space-y-2'>
				{logs.map(log => (
					<ActivityLogItem key={log.id} log={log} />
				))}
			</div>
		</div>
	)
}

export default ActivityLogsList
