import { Layout } from '@/shared/components/Layout'
import KanbanTable from '../components/KanbanBoard'

function PrototypePage() {
	const content = (
		<Layout>
			<KanbanTable />
		</Layout>
	)

	return content
}

export default PrototypePage
