'use client'

import { Loader } from '@/components/Loader'

import { useLocalStorage } from '@/hooks/useLocalStorage'

import { ViewSwitcher } from './ViewSwitcher'
import { ListView } from './list-view/ListView'
import { KanbanView } from './kanban-view/KanbanView'

export type TypeView = 'list' | 'kanban'

export const TasksView = () => {
	const [type, setType, isLoading] = useLocalStorage<TypeView>({
		key: 'typeView',
		defaultValue: 'list'
	})

	if (isLoading) return <Loader />

	return (
		<div>
			<ViewSwitcher
				setType={setType}
				type={type}
			/>
			{type === 'list' ? <ListView /> : <KanbanView />}
		</div>
	)
}
