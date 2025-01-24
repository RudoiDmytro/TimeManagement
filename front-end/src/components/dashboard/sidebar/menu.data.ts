import {
	CalendarRange,
	KanbanSquareDashed,
	LayoutDashboard,
	Settings,
	Timer
} from 'lucide-react'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import { IMenuItem } from './menu.types'

export const MENU: IMenuItem[] = [
	{ label: 'Dashboard', path: DASHBOARD_PAGES.HOME, icon: LayoutDashboard },
	{ label: 'Tasks', path: DASHBOARD_PAGES.TASKS, icon: KanbanSquareDashed },
	{ label: 'Pomodoro', path: DASHBOARD_PAGES.TIMER, icon: Timer },
	{
		label: 'Time blocking',
		path: DASHBOARD_PAGES.TIME_BLOCKING,
		icon: CalendarRange
	},
	{ label: 'Settings', path: DASHBOARD_PAGES.SETTINGS, icon: Settings }
]
