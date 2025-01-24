import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'

import type { ITaskResponse } from '@/types/task.types'

import { FILTERS } from './columns.data'

dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)

export const filterTasks = (
	tasks: ITaskResponse[] | undefined,
	value: string
) => {
	switch (value) {
		case 'today':
			return tasks?.filter(
				task =>
					dayjs(task.dueDate).isSame(FILTERS.today, 'day') &&
					!task.isCompleted
			)
		case 'tomorrow':
			return tasks?.filter(
				task =>
					dayjs(task.dueDate).isSame(FILTERS.tomorrow, 'day') &&
					!task.isCompleted
			)
		case 'this_week':
			return tasks?.filter(
				task =>
					!dayjs(task.dueDate).isSame(FILTERS.today, 'day') &&
					!dayjs(task.dueDate).isSame(FILTERS.tomorrow, 'day') &&
					dayjs(task.dueDate).isSameOrBefore(FILTERS.this_week) &&
					!task.isCompleted
			)
		case 'next_week':
			return tasks?.filter(
				task =>
					dayjs(task.dueDate).isAfter(FILTERS.this_week) &&
					dayjs(task.dueDate).isSameOrBefore(FILTERS.next_week) &&
					!task.isCompleted
			)
		case 'later':
			return tasks?.filter(
				task =>
					(dayjs(task.dueDate).isAfter(FILTERS.next_week) ||
						!task.dueDate) &&
					!task.isCompleted
			)
		case 'completed':
			return tasks?.filter(task => task.isCompleted)

		default:
			return []
	}
}
