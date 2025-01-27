import { CSSProperties, PropsWithChildren } from 'react'

type BadgeProps = {
	variant?: string
	style?: CSSProperties
}

export default function Badge({
	children,
	variant,
	style
}: PropsWithChildren<BadgeProps>) {
	return (
		<span
			className={`capitalize border w-full px-2 text-center rounded-md py-1  
                ${
									variant === 'HIGH'
										? ' bg-red-500/65'
										: variant === 'MEDIUM'
											? ' bg-orange-500/75'
											: variant === 'LOW'
												? ' bg-blue-600/70'
													: style !== null
													? 'bg-transparent'
												: 'bg-primary text-background'
								} 
                    text-sm font-medium transition `}
			style={style}
		>
			{children}
		</span>
	)
}
