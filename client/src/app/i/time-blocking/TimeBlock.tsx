import { Edit, GripVertical, Trash } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import { Loader } from '@/components/Loader'

import type {
	ITimeBlockResponse,
	TypeTimeBlockFormState
} from '@/types/time-block.types'

import styles from './TimeBlocking.module.scss'

import { useDeleteTimeBlock } from './hooks/useDeleteTimeBlock'
import { useTimeBlockSortable } from './hooks/useTimeBlockSortable'

export const TimeBlock = ({ item }: { item: ITimeBlockResponse }) => {
	const { attributes, listeners, setNodeRef, style } = useTimeBlockSortable(
		item.id
	)

	const { reset } = useFormContext<TypeTimeBlockFormState>()
	const { deleteTimeBlock, isDeletePending } = useDeleteTimeBlock(item.id)

	return (
		<div
			ref={setNodeRef}
			style={style}
		>
			<div
				className={styles.block}
				style={{
					backgroundColor: item.color,
					height: `${item.duration}px`
				}}
			>
				<div className='flex items-center'>
					<button
						{...attributes}
						{...listeners}
						aria-describedby='time-block'
					>
						<GripVertical className={styles.grip} />
					</button>
					<div>
						{item.name}
						<i className='text-xs opacity-50'>({item.duration} min.)</i>
					</div>
				</div>
				<div className={styles.action}>
					<button
						className='opacity-50 transition-opacity hover:opacity-100 mr-2'
						onClick={() => {
							reset({
								id: item.id,
								color: item.color,
								name: item.name,
								duration: item.duration,
								order: item.order
							})
						}}
					>
						<Edit size={15} />
					</button>
					<button
						className={'opacity-50 transition-opacity hover:opacity-100'}
						onClick={() => deleteTimeBlock()}
					>
						{isDeletePending ? <Loader size={15} /> : <Trash size={15} />}
					</button>
				</div>
			</div>
		</div>
	)
}
