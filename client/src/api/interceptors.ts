import axios, { type CreateAxiosDefaults } from 'axios'

import { errorHandler } from './errorHandler'
import {
	getAccessToken,
	removeFromStorage
} from '@/services/auth-token.service'
import { authService } from '@/services/auth.service'

const options: CreateAxiosDefaults = {
	baseURL: 'http://localhost:4200/api',
	headers: {
		'Content-Type': 'application/json',
		withCredentials: true
	}
}

const axiosClassic = axios.create(options)
const axiosWithAuth = axios.create(options)

axiosWithAuth.interceptors.request.use(config => {
	const token = getAccessToken()

	if (config?.headers && token) {
		config.headers.Authorization = `Bearer ${token}`
	}

	return config
})

axiosWithAuth.interceptors.response.use(
	config => config,
	async error => {
		const request = await error.config

		if (
			(error?.response.status === 401 ||
				errorHandler(error) === 'jwt expired' ||
				errorHandler(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			request._isRetry = true
			try {
				await authService.getNewTokens()
				return axiosWithAuth.request(request)
			} catch (error) {
				if (errorHandler(error) === 'jwt expired') removeFromStorage()
			}
		}
	}
)

export { axiosClassic, axiosWithAuth }
