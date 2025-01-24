import dayjs, { type Dayjs } from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import weekOfYear from 'dayjs/plugin/weekOfYear'

dayjs.extend(weekOfYear)
dayjs.extend(isoWeek)

export const FILTERS: Record<string, Dayjs> = {
	today: dayjs().startOf('day'),
	tomorrow: dayjs().add(1, 'day').startOf('day'),
	this_week: dayjs().endOf('isoWeek'),
	next_week: dayjs().add(1, 'week').startOf('day'),
	later: dayjs().add(2, 'week').startOf('day'),
}

export const COLUMNS = [
	{
		label: 'Today',
		value: 'today'
	},
	{
		label: 'Tomorrow',
		value: 'tomorrow'
	},
	{
		label: 'This Week',
		value: 'this_week'
	},
	{
		label: 'Next Week',
		value: 'next_week'
	},
	{
		label: 'Later',
		value: 'later'
	},
	{
		label: 'Completed',
		value: 'completed'
	}
]
