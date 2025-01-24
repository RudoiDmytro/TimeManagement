import { Dispatch, SetStateAction } from 'react'

import type { ITaskResponse } from '@/types/task.types'


interface IKanbanAddCardInput {
	filterDate?: string
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export const KanbanAddCardInput = ({ filterDate, setItems }: IKanbanAddCardInput) => {
	const addCard = () => {
		setItems(prev => {
			if (!prev) return

			return [
				...prev,
				{
					id: '',
					title: '',
					isCompleted: false,
					dueDate: filterDate
				}
			]
		})
	}

	return (
		<div className='mt-5'>
			<button
				className='italic opacity-40 text-sm'
				onClick={addCard}
			>
				Add task...
			</button>
		</div>
	)
}
