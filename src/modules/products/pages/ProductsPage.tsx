import Layout from '@/shared/components/Layout'
import ProductsTable from '../components/ProductsTable'
import ProductsTopbar from '../components/ProductsTopbar'

function ClientsPage() {
	const content = (
		<Layout>
			<ProductsTopbar />
			<ProductsTable />
		</Layout>
	)

	return content
}

export default ClientsPage
