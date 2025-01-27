import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { Loader } from '@/components/Loader'

import styles from './TimeBlocking.module.scss'
import { calcHoursLeft } from './calc-hours-left'
import { useTimeBlockDnd } from './hooks/useTimeBlockDnd'
import { useTimeBlocks } from './hooks/useTimeBlocks'
import { TimeBlock } from './TimeBlock'

export const TimeBlockingList = () => {
	const { items, setItems, isLoading } = useTimeBlocks()
	const { sensors, handleDragEnd } = useTimeBlockDnd({ items, setItems })
	if (isLoading) return <Loader />

	const hoursLeft = calcHoursLeft(items)

	return (
		<div>
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
			>
				<div className={styles.list}>
					<SortableContext
						items={items || []}
						strategy={verticalListSortingStrategy}
                    >
                        {items?.length ? (
                            items.map(item => (
                                <TimeBlock
                                    key={item.id}
                                    item={item}
                                />
                            ))
                        ) : (
                                <div>Add firts time block on the right form</div>
                        )}
                    </SortableContext>
				</div>
            </DndContext>
            <div>
                {hoursLeft > 0 ? `${hoursLeft} hours out of 24 left for sleep`
                : 'No hours for sleep'}
            </div>
		</div>
	)
}
