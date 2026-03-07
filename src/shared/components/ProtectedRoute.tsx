import { Navigate, Outlet } from 'react-router-dom'
import { UrlNames } from '../enums/UrlNames'

export default function ProtectedRoute() {
	// Проверяем наличие токена в localStorage
	// const access = localStorage.getItem('access')
	const access = true

	if (!access) {
		return <Navigate to={UrlNames.LOGIN} replace />
	}

	// Иначе рендерим дочерние маршруты
	return <Outlet />
}
