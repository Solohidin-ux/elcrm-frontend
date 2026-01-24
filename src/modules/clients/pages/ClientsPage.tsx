import Layout from '@/shared/components/Layout'
import ClientsTable from '../components/ClientsTable'
import ClientsTopbar from '../components/ClientsTopbar'

function ClientsPage() {
	const content = (
		<Layout>
			<ClientsTopbar />
			<ClientsTable />
		</Layout>
	)

	return content
}

export default ClientsPage
