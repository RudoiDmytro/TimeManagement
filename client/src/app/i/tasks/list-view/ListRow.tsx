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

import styles from './ListView.module.scss'
import { cn } from '@/lib/utils'

interface IListRow {
	item: ITaskResponse
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>
}

export const ListRow = ({ item, setItems }: IListRow) => {
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
				styles.row,
				watch('isCompleted') && styles.completed,
				'animation-opacity flex items-center'
			)}
		>
			<div>
				<span className='inline-flex items-center gap-2.5 w-full'>
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
				</span>
			</div>
			<div>
				<Controller
					control={control}
					name='dueDate'
					render={({ field: { value, onChange } }) => (
						<DatePicker
							position='right'
							onChange={onChange}
							value={value || ''}
							date={item.dueDate}
						/>
					)}
				/>
			</div>
			<div className='capitalize'>
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
			<div>
				<Button
					onClick={() =>
						item.id ? deleteTask(item.id) : setItems(prev => prev?.slice(0, -1))
					}
					variant='outline'
				>
					{isDeletePending ? <Loader size={15} /> : <Trash size={15} />}
				</Button>
			</div>
		</div>
	)
}
