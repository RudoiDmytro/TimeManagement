import Link from 'next/link'
import React from 'react'

import { IMenuItem } from './menu.types'

export const MenuItem = ({ item }: { item: IMenuItem }) => {
	return (
		<div>
			<Link
				href={item.path}
				className='flex gap-2.5 items-center py-1.5 mt2 px-2
                transition-colors hover:bg-foreground hover:text-background
				rounded-md'
			>
				<item.icon />
				<span>{item.label}</span>
			</Link>
		</div>
	)
}
