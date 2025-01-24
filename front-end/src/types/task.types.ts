import { IRoot } from "./root.types"

export enum EnumTaskPriority {
	Low = 'low',
	medium = 'medium',
	high = 'high'
}

export interface ITaskResponse extends IRoot{
	title?: string
	priority?: EnumTaskPriority
	isCompleted?: boolean
	dueDate?: string
}

export type TypeTaskFormState = Partial<Omit<ITaskResponse, 'id' | 'updatedAt'>>
