export const UsersEndpoints = {
	getAll: '/users/',
	create: '/users/create/',
	debug: '/users/debug/',
	getMe: '/users/me/',
	detail: (id: number) => `/users/${id}/`,
	put: (id: number) => `/users/${id}/`,
	patch: (id: number) => `/users/${id}/`,
	delete: (id: number) => `/users/${id}/remove/`,
} as const
