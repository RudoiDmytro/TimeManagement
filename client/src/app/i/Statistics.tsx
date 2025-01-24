'use client'

import { Loader } from '@/components/Loader'

import { useProfile } from '@/hooks/useProfile'

const Statistics = () => {
	const { data, isLoading } = useProfile()

	return isLoading ? (
		<Loader />
	) : (
		<div className='grid grid-cols-4 gap-12 mt-7'>
			{data?.statistics?.length ? (
				data.statistics.map((stat) => (
					<div
						key={stat.label}
						className='bg-border/5 rounded text-center 
                        hover:translate-y-3 transition-transform duration-500'
					>
                        <div className='text-xl'>{stat.label}</div>
                        <div className='text-3xl font-semibold'>{stat.value}</div>
                    </div>
				))
			) : (
				<div className='text-center'>No statistics available.</div>
			)}
		</div>
	)
}

export default Statistics
