export const StagesEndpoints = {
	getAll: '/stages/',
	create: '/stages/',
	detail: (id: number) => `/stage/${id}/`,
	put: (id: number) => `/stage/${id}/`,
	patch: (id: number) => `/stage/${id}/`,
	delete: (id: number) => `/stage/${id}/`,
} as const
