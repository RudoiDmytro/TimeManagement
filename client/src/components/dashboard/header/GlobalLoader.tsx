'use client'
import { useIsFetching, useIsMutating } from '@tanstack/react-query'

import { Loader } from '@/components/Loader'

export const GlobalLoader = () => {
	const isMutatitng = useIsMutating()
	const isFetching = useIsFetching()

	return isFetching || isMutatitng ? (
		<div className='fixed top-0 left-0 w-full h-full z-50 bg-gray-900 opacity-50 flex items-center justify-center'>
			<Loader />
		</div>
	) : null
}
