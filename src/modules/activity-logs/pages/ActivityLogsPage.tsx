import Layout from '@/shared/components/Layout'
import { useActivityLogsStore } from '@/shared/store/activity-logs-store'
import ActivityLogsTopbar from '../components/ActivityLogsTopbar'
import ActivityLogsFilters from '../components/ActivityLogsFilters'
import ActivityLogsList from '../components/ActivityLogsList'

function ActivityLogsPage() {
	const { filteredLogs } = useActivityLogsStore()

	const content = (
		<Layout>
			<ActivityLogsTopbar totalRecords={filteredLogs.length} />
			<ActivityLogsFilters />
			<ActivityLogsList logs={filteredLogs} />
		</Layout>
	)

	return content
}

export default ActivityLogsPage
