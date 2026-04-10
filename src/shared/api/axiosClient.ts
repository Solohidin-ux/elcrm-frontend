import axios from 'axios'
import { useAuthStore } from '../store/auth-store'

export const axiosClient = axios.create({
	baseURL: 'http://backend.elcrm.kg/api',

	headers: {
		'Content-Type': 'application/json',
	},
})

axiosClient.interceptors.request.use(
	config => {
		const token = localStorage.getItem('access')

		if (token && config.headers) {
			config.headers.Authorization = `Bearer ${token}`
		}

		return config
	},
	error => {
		return Promise.reject(error)
	},
)

axiosClient.interceptors.response.use(
	response => {
		return response
	},
	error => {
		if (error.response) {
			const status = error.response.status

			if (status === 401) {
				// Logout user on 401
				useAuthStore.getState().logout()
				console.log('Не авторизован! Выполнен выход.')
			} else if (status === 403) {
				console.error('Нет прав доступа!')
			} else if (status >= 500) {
				console.error('Ошибка на сервере!')
			}
		} else {
			console.error('Ошибка сети или сервер не отвечает')
		}

		return Promise.reject(error)
	},
)
