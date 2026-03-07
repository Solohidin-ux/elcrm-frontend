import { create } from 'zustand'

export interface User {
	id: string
	name: string
	email: string
	avatar?: string
	role: 'manager' | 'owner' | 'admin'
}

interface AuthState {
	user: User | null
	isAuthenticated: boolean
	isLoading: boolean

	login: (email: string, password: string) => Promise<void>
	logout: () => void
	fetchMe: () => Promise<void>
}

const mockUsers: Record<string, User> = {
	'manager@example.com': {
		id: 'mgr-001',
		name: 'Иван Петров',
		email: 'manager@example.com',
		role: 'manager',
	},
	'owner@example.com': {
		id: 'own-001',
		name: 'Алексей Смирнов',
		email: 'owner@example.com',
		role: 'owner',
	},
}

export const useAuthStore = create<AuthState>((set, get) => ({
	user: null,
	isAuthenticated: false,
	isLoading: false,

	login: async (email: string, password: string) => {
		set({ isLoading: true })
		const user = mockUsers[email.toLowerCase()]

		if (user && password === 'password') {
			set({ user, isAuthenticated: true, isLoading: false })
		} else {
			set({ isLoading: false })
			throw new Error('Invalid credentials')
		}
	},

	logout: () => {
		set({ user: null, isAuthenticated: false })
	},

	fetchMe: async () => {
		set({ isLoading: true })

		await new Promise(resolve => setTimeout(resolve, 500))

		const user = mockUsers['manager@example.com']
		set({ user, isAuthenticated: !!user, isLoading: false })
	},
}))
