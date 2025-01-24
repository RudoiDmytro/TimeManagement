import { InputHTMLAttributes, forwardRef } from 'react'

import { cn } from '@/lib/utils'

type TransparentField = InputHTMLAttributes<HTMLInputElement>

export const TransparentField = forwardRef<HTMLInputElement, TransparentField>(
	({ className, ...rest }, ref) => {
		return (
			<input
				className={cn(
					'bg-transparent border-none focus:outline-0 focus:shadow-transparent w-full',
					className
				)}
				ref={ref}
				{...rest}
			/>
		)
	}
)

TransparentField.displayName = 'TransparentField'