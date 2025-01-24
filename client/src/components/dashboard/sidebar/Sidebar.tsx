import { GanttChartSquare } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { LogoutButton } from './LogoutButton'
import { MenuItem } from './MenuItem'
import { MENU } from './menu.data'

export const DashboardSidebar = () => {
	return (
		<aside
			className='border-r border-r-border h-full 
                      bg-muted flex flex-col justify-between'
		>
			<div className='relative'>
				<LogoutButton />
				<Link
					href='/'
					className='flex items-center gap-2.5 p-3 border-b border-b-black'
				>
					<GanttChartSquare
						size={36}
						color='magenta'
					/>
					<span className='text-2xl font-bold relative'>
						Planner
						<span
							className='absolute -top-1 -right-6 text-xs 
            opacity-40 rotate-[18deg] font-normal'
						>
							beta
						</span>
					</span>
				</Link>
				<div className='p-3 relative'>
					{MENU.map(item => (
						<MenuItem
							key={item.path}
							item={item}
						/>
					))}
				</div>
			</div>
			<footer className='text-xs opacity-40 font-normal text-center p-2'>
				&copy; 2025 Planner. All rights reserved.
			</footer>
		</aside>
	)
}
