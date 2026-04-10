import { useTranslation } from 'react-i18next'

interface ActivityLogsTopbarProps {
	totalRecords: number
}

function ActivityLogsTopbar({ totalRecords }: ActivityLogsTopbarProps) {
	const { t } = useTranslation()

	return (
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
				{t('activityLogs.totalRecords')}: {totalRecords}
			</div>
		</div>
	)
}

export default ActivityLogsTopbar
