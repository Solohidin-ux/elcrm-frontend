export const ClientsEndpoints = {
	getAll: '/clients/',
	create: '/clients/',
	detail: (id: string) => `/client/${id}/`,
	put: (id: string) => `/client/${id}/`,
	patch: (id: string) => `/client/${id}/`,
	delete: (id: string) => `/client/${id}/`,
} as const
