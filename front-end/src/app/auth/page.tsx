import { Metadata } from 'next'

import Auth from '@/components/Auth'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Auth Page',
	description: 'This is the auth page',
	...NO_INDEX_PAGE
}

const AuthPage = () => {
	return (
		<div>
			<Auth />
		</div>
	)
}

export default AuthPage
