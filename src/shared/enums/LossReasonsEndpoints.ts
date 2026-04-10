export const LossReasonsEndpoints = {
	getAll: '/loss-reasons/',
	create: '/loss-reasons/',
	detail: (id: number) => `/loss-reasons/${id}/`,
	put: (id: number) => `/loss-reasons/${id}/`,
	patch: (id: number) => `/loss-reasons/${id}/`,
	delete: (id: number) => `/loss-reasons/${id}/`,
} as const
