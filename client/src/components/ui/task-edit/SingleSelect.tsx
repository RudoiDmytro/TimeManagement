import { X } from 'lucide-react'

import Badge from '@/components/Badge'

import { useOutside } from '@/hooks/useOutside'

import { cn } from '@/lib/utils'

interface IOption {
	label: string
	value: string
}

interface ISingleSelect {
	data: IOption[]
	onChange: (value: string) => void
	value: string
	isColorSelect?: boolean
}

export const SingleSelect = ({
	data,
	onChange,
	value,
	isColorSelect
}: ISingleSelect) => {
	const { isShowing, setIsShowing, ref } = useOutside(false)

	const getValue = () => data.find(item => item.value === value)?.value.toLowerCase()
	
	return (
		<div
			className={cn('relative min-w-36', {
				'w-max': isColorSelect
			})}
			ref={ref}
		>
			<button
				onClick={e => {
					e.preventDefault()
					setIsShowing(!isShowing)
				}}
				className='flex w-full'
			>
				{getValue() ? (
					<Badge
						variant={value}
						style={isColorSelect ? { backgroundColor: value } : {}}
					>
						{getValue()}
					</Badge>
				) : (
					<Badge>Click for select</Badge>
				)}
			</button>
			{value && (
				<button
					className='absolute -top-2 -right-4 opacity-30 hover:opacity-100
                    transition-opacity'
					onClick={e => {
						e.preventDefault()
						onChange('')
					}}
				>
					<X size={14} />
				</button>
			)}
			{isShowing && (
				<div
					className={cn(
						'absolute w-full mt-2 slide bg-primary rounded-lg shadow-md p-3 z-10',
						isColorSelect ? 'flex flex-col gap-2' : ''
					)}
					style={{
						top: 'calc(100% +.5rem)'
					}}
				>
					{data.map(item => (
						<button
							key={item.value}
							className='flex mb-4 w-full last:mb-0 capitalize rounded-lg'
							onClick={e => {
								e.preventDefault()
								onChange(item.value)
								setIsShowing(false)
							}}
							style={isColorSelect ? { backgroundColor: item.value } : {}}
						>
							<Badge variant={item.value}>{item.label.toLowerCase()}</Badge>
						</button>
					))}
				</div>
			)}
		</div>
	)
}
