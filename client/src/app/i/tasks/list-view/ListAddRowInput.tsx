import { Dispatch, SetStateAction } from 'react'

import { ITaskResponse } from '@/types/task.types'

import styles from './ListView.module.scss'

interface IListAddRowInput {
	filterDate?: string
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export const ListAddRowInput = ({ filterDate, setItems }: IListAddRowInput) => {
	const addRow = () => {
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
		<div className={styles.addRow}>
			<button
				className='italic opacity-40 text-sm'
				onClick={addRow}
			>
				Add task...
			</button>
		</div>
	)
}
