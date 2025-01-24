import { Metadata } from 'next'

import { Heading } from '@/components/Heading'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { Timer } from './Timer'


export const metadata: Metadata = {
	title: 'Pomodoro timer',
	...NO_INDEX_PAGE
}

const TimerPage = ({}) => {
	return (
		<div>
			<Heading title='Pomodoro timer' />
			<Timer />
		</div>
	)
}

export default TimerPage
