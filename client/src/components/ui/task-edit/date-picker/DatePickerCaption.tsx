import dayjs from 'dayjs'
import type { Formatters } from 'react-day-picker'

const seasonEmoji: Record<string, string> = {
	spring: '🌱',
	summer: '☀️',
	autumn: '🍁',
	winter: '❄️'
}

const getSeason = (month: Date): keyof typeof seasonEmoji => {
	const currentMonth = month.getMonth() + 1
	if (currentMonth >= 3 && currentMonth <= 5) return 'spring'
	if (currentMonth >= 6 && currentMonth <= 8) return 'summer'
	if (currentMonth >= 9 && currentMonth <= 11) return 'autumn'
	return 'winter'
}

export const formatCaption: Formatters['formatCaption'] = (month) => {
  const season = getSeason(month);
  return `${seasonEmoji[season]} ${dayjs(month).format('MMMM YYYY')}`;
};
