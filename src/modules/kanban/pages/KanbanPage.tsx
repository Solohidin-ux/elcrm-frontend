import { Layout } from '@/shared/components/Layout'
import KanbanBoard from '../components/KanbanBoard'
import KanbanTopbar from '../components/KanbanTopbar'

function KanbanPage() {
	const content = (
		<Layout>
			<KanbanTopbar />
			<KanbanBoard />
		</Layout>
	)

	return content
}

export default KanbanPage
