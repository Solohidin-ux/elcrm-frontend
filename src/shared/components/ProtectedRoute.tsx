import { Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/auth-store'

export default function ProtectedRoute() {
	const accessToken = useAuthStore(s => s.accessToken)

	// if (!accessToken) {
	// 	return <Navigate to={UrlNames.LOGIN} replace />
	// }

	// Иначе рендерим дочерние маршруты
	return <Outlet />
}
