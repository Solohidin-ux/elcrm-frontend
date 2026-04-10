import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { login } from '../api/AuthApi'
import { useAuthStore } from '../store/auth-store'

export const useLogin = () => {
	const setTokens = useAuthStore(s => s.setTokens)

	return useMutation({
		mutationFn: (payload: { email: string; password: string }) =>
			login(payload),
		onSuccess: (data: any) => {
			setTokens(data.access, data.refresh, data.user)
			toast.success('Успешный вход в систему')
		},
	})
}
