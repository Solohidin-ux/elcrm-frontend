import { Navigate, Route, Routes } from 'react-router-dom'
import ClientsPage from './modules/clients/pages/ClientsPage'
import PrototypePage from './modules/prototype/pages/PrototypePage'
import { UrlNames } from './shared/enums/UrlNames'

function App() {
	const content = (
		<Routes>
			<Route path='/'>
				<Route index element={<PrototypePage />} />
				<Route path={UrlNames.CLIENTS} element={<ClientsPage />} />

				<Route path='*' element={<Navigate to='/' replace />} />
			</Route>
		</Routes>
	)

	return content
}

export default App
