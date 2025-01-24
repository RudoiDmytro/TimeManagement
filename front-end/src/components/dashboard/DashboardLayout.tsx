import { PropsWithChildren } from 'react'

import { DashboardHeader } from './header/Header'
import { DashboardSidebar } from './sidebar/Sidebar'

export default function DashboardLayout({ children }: PropsWithChildren) {
	return (
		<div
			className='grid min-h-screen 2xl:grid-cols-[1.1fr_6fr]
                        grid-cols-[1.2fr_6fr]'
		>
			<DashboardSidebar />
			<main className='overflow-x-hidden max-h-screen relative p-1'>
				<DashboardHeader />
				{children}
			</main>
		</div>
	)
}
