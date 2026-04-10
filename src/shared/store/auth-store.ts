import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
	accessToken: string | null
	refreshToken: string | null
	user: { id: string; name: string; email: string } | null
	setTokens: (access: string, refresh: string, user?: AuthState['user']) => void
	logout: () => void
	setUser: (user: AuthState['user']) => void
}

export const useAuthStore = create<AuthState>()(
	persist(
		set => ({
			accessToken: null,
			refreshToken: null,
			user: null,
			setTokens: (access, refresh, user) => {
				localStorage.setItem('access', access)
				localStorage.setItem('refresh', refresh)
				set({ accessToken: access, refreshToken: refresh })
				if (user) {
					localStorage.setItem('user', JSON.stringify(user))
					set({ user })
				}
			},
			logout: () => {
				localStorage.removeItem('access')
				localStorage.removeItem('refresh')
				localStorage.removeItem('user')
				set({ accessToken: null, refreshToken: null, user: null })
			},
			setUser: user => {
				if (user) {
					localStorage.setItem('user', JSON.stringify(user))
				} else {
					localStorage.removeItem('user')
				}
				set({ user })
			},
		}),
		{
			name: 'auth-storage',
		},
	),
)
