import { IRoot } from './root.types'

export interface ITimerRoundResponse extends IRoot {
	isCompleted?: boolean
	totalSeconds: number
}

export interface ITimerSessionResponse {
	id: string
	createdAt?: string
	updatedAt?: string
	isCompleted?: boolean
	rounds?: ITimerRoundResponse[]
}

export type TypeTimerRoundState = Partial<
	Omit<ITimerRoundResponse, 'id' | 'createdAt' | 'updatedAt'>
>

export type TypeTimerSessionState = Partial<
	Omit<ITimerSessionResponse, 'id' | 'createdAt' | 'updatedAt'>
>
