import Cookies from 'js-cookie'

export const EnumTokens = {
	ACCESS_TOKEN: 'accessToken',
	REFRESH_TOKEN: 'refreshToken' // this token is used for refreshing the access token when it's expired
}

export const getAccessToken = () => {
	const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN)
	return accessToken || null
}

export const saveTokenStorage = (accessToken: string) => {
	Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
		domain: 'localhost',
		sameSite: 'strict',
		expires: 1
	})
	Cookies.set(EnumTokens.REFRESH_TOKEN, accessToken, {
		domain: 'localhost',
		sameSite: 'strict',
		expires: 1
	})
}

export const removeFromStorage = () => {
	Cookies.remove(EnumTokens.ACCESS_TOKEN)
	Cookies.remove(EnumTokens.REFRESH_TOKEN)
}
