import { Navigate, Route, Routes } from 'react-router-dom'
import PrototypePage from './modules/prototype/pages/PrototypePage'

function App() {
	const content = (
		<Routes>
			<Route path='/'>
				<Route index element={<PrototypePage />} />

				{/* Редирект если 404 */}
				<Route path='*' element={<Navigate to='/' replace />} />
			</Route>
		</Routes>
	)

	return content
}

export default App
