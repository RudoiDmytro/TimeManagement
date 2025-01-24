export interface IAuthForm {
	email: string
	name: string
	password: string
}

export interface IUser {
	id: string
	email: string
	name?: string

	workInterval: number
	breakInterval: number
	intervalsCount: number
}

export interface IAuthResponse {
	accessToken: string
	user: IUser
}

export type TypeUserForm = Omit<IUser, 'id'> & { password: string | undefined }
