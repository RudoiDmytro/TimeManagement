import { Metadata } from 'next'

import { Heading } from '@/components/Heading'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { TimeBlocking } from './TimeBlocking'


export const metadata: Metadata = {
	title: 'Time blocking',
	...NO_INDEX_PAGE
}

const TimeBlockingPage = ({}) => {
	return (
		<div>
            <Heading title='Time blocking' />
            <TimeBlocking />
		</div>
	)
}

export default TimeBlockingPage
