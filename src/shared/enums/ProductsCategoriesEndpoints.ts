export const ProductsCategoriesEndpoints = {
	getAll: '/categories/',
	create: '/categories/',
	detail: (id: number) => `/categories/${id}/`,
	put: (id: number) => `/categories/${id}/`,
	patch: (id: number) => `/categories/${id}/`,
	delete: (id: number) => `/categories/${id}/`,
} as const
