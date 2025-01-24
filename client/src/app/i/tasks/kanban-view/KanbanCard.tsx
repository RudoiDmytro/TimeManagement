import { GripVertical, Trash } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Loader } from '@/components/Loader'
import { Button } from '@/components/ui/button'
import Checkbox from '@/components/ui/checkbox'
import { SingleSelect } from '@/components/ui/task-edit/SingleSelect'
import { TransparentField } from '@/components/ui/task-edit/TransparentField'
import { DatePicker } from '@/components/ui/task-edit/date-picker/DatePicker'

import type { ITaskResponse, TypeTaskFormState } from '@/types/task.types'

import { useDeleteTask } from '../hooks/useDeleteTask'
import { useTaskDebounce } from '../hooks/useTaskDebounce'

import styles from './KanbanView.module.scss'
import { cn } from '@/lib/utils'

interface IKanbanCard {
	item: ITaskResponse
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export const KanbanCard = ({ item, setItems }: IKanbanCard) => {
	const { register, control, watch } = useForm<TypeTaskFormState>({
		defaultValues: {
			title: item.title,
			priority: item.priority,
			isCompleted: item.isCompleted,
			dueDate: item.dueDate
		}
	})

	const { deleteTask, isDeletePending } = useDeleteTask()

	useTaskDebounce({ watch, itemId: item.id })

	return (
		<div
			className={cn(
				styles.card,
				watch('isCompleted') && styles.completed,
				'animation-opacity'
			)}
		>
			<div className={styles.cardHeader}>
				<button aria-describedby='todo-item'>
					<GripVertical className={styles.grip} />
				</button>
				<Controller
					control={control}
					name='isCompleted'
					render={({ field: { value, onChange } }) => (
						<Checkbox
							onChange={onChange}
							checked={value}
						/>
					)}
				/>
				<TransparentField {...register('title')} />
			</div>

			<div className={styles.cardBody}>
				<Controller
					control={control}
					name='dueDate'
					render={({ field: { value, onChange } }) => (
						<DatePicker
							position='left'
							onChange={onChange}
							value={value || ''}
							date={item.dueDate}
						/>
					)}
				/>
				<Controller
					control={control}
					name='priority'
					render={({ field: { value, onChange } }) => (
						<SingleSelect
							data={['HIGH', 'MEDIUM', 'LOW'].map(item => ({
								value: item,
								label: item
							}))}
							onChange={onChange}
							value={value || ''}
						/>
					)}
				/>
			</div>
			<div className={styles.cardActions}>
				<button
					onClick={() =>
						item.id ? deleteTask(item.id) : setItems(prev => prev?.slice(0, -1))
					}
					className='opacity-70 hover:opacity-100
                    transition-opacity'
				>
					{isDeletePending ? <Loader size={15} /> : <Trash size={15} />}
				</button>
			</div>
		</div>
	)
}
