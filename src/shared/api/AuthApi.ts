import { AuthEndpoints } from '../enums/AuthEndpoints'
import { axiosClient } from './axiosClient'

export const login = async (payload: { email: string; password: string }) => {
	const { data } = await axiosClient.post(AuthEndpoints.login, payload)
	return data
}

export const refreshToken = async (refresh: string) => {
	const { data } = await axiosClient.post(AuthEndpoints.refreshToken, {
		refresh,
	})
	return data
}
