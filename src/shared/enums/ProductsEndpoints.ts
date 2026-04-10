export const ProductsEndpoints = {
	getAll: '/products',
	create: '/products',
	detail: (id: string) => `/products/${id}`,
	put: (id: string) => `/products/${id}`,
	patch: (id: string) => `/products/${id}`,
	delete: (id: string) => `/products/${id}`,
} as const
