import { Navigate, Route, Routes } from 'react-router-dom'
import ClientsPage from './modules/clients/pages/ClientsPage'
import DashboardPage from './modules/dashboard/pages/DashboardPage'
import FinancesPage from './modules/finances/pages/FinancesPage'
import FunnelTaskDetailPage from './modules/kanban/pages/FunnelTaskDetailPage'
import KanbanPage from './modules/kanban/pages/KanbanPage'
import ProductsPage from './modules/products/pages/ProductsPage'
import PrototypePage from './modules/prototype/pages/PrototypePage'
import SearchResultsPage from './modules/search/pages/SearchResultsPage'
import SettingsPage from './modules/settings/pages/SettingsPage'
import { UrlNames } from './shared/enums/UrlNames'

function App() {
	const content = (
		<Routes>
			<Route path='/'>
				<Route path='/prototype' element={<PrototypePage />} />

				<Route path={UrlNames.DASHBOARD} element={<DashboardPage />} />
				<Route path={UrlNames.CLIENTS} element={<ClientsPage />} />
				<Route path={UrlNames.PRODUCTS} element={<ProductsPage />} />
				<Route path={UrlNames.FUNNEL} element={<KanbanPage />} />
				<Route
					path={`${UrlNames.FUNNEL}/:taskId`}
					element={<FunnelTaskDetailPage />}
				/>
				<Route path={UrlNames.FINANCES} element={<FinancesPage />} />

				<Route path='/settings' element={<SettingsPage />} />
				<Route path={UrlNames.SEARCH} element={<SearchResultsPage />} />
				<Route path='/test' element={<h1>Тестовая страница</h1>} />

				<Route path='*' element={<Navigate to='/' replace />} />
			</Route>
		</Routes>
	)

	return content
}

export default App
