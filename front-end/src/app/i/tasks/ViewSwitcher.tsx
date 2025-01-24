'use client'

import { Kanban, ListTodo } from 'lucide-react'

import { cn } from '@/lib/utils'
import { TypeView } from './TasksView'

interface IViewSwitcher {
	type: TypeView
	setType: (value: TypeView) => void
}
export const ViewSwitcher = ({ type, setType }: IViewSwitcher) => {
	return (
		<div className='flex items-center gap-1'>
			<button
				className={cn('flex items-center gap-1', {
					'opacity-40': type === 'kanban'
				})}
				onClick={() => setType('list')}
			>
				<ListTodo />
				List
			</button>
			<button
				className={cn('flex items-center gap-1', {
					'opacity-40': type === 'list'
				})}
				onClick={() => setType('kanban')}
			>
				<Kanban />
				Board
			</button>
		</div>
	)
}
