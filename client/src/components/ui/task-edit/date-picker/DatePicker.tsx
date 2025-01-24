'use client'

import cn from 'clsx'
import dayjs from 'dayjs'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { DayPicker, type PropsSingle } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

import { useOutside } from '@/hooks/useOutside'

import './DatePicker.scss'
import { formatCaption } from './DatePickerCaption'

interface IDatePicker {
	onChange: (value: string) => void
	value: string
	position?: 'left' | 'right'
	date?: string
}

dayjs.extend(LocalizedFormat)
export const DatePicker = ({
	onChange,
	value,
	position,
	date
}: IDatePicker) => {
	const [selected, setSelected] = useState<Date>()
	const { isShowing, setIsShowing, ref } = useOutside(false)
	const [currentMonth, setCurrentMonth] = useState<Date>(selected || new Date())

	const handleDaySelect: PropsSingle['onSelect'] = date => {
		const ISODate = date?.toISOString()

		setSelected(date)
		if (ISODate) {
			onChange(ISODate)
			setIsShowing(false)
		} else {
			onChange('')
		}
	}
	const handleClear = (e: React.MouseEvent) => {
		e.stopPropagation()
		setSelected(undefined)
		onChange('')
	}

	useEffect(() => {
		if (date) {
			setSelected(new Date(date))
		}
	}, [isShowing])

	return (
		<div
			className='relative'
			ref={ref}
		>
			<span
				onClick={() => setIsShowing(!isShowing)}
				className='relative w-full flex justify-center'
			>
				{value ? dayjs(value).format('LL') : 'Click for select'}
				{value && (
					<button
						onClick={handleClear}
						className='absolute -top-2 -right-4 opacity-30 hover:opacity-100 transition-opacity'
					>
						<X size={14} />
					</button>
				)}
			</span>
			{isShowing && (
				<div
					className={cn(
						'absolute slide bg-card rounded-lg shadow-md p-3 z-10',
						position === 'left' ? '-left-4' : '-right-4'
					)}
					style={{
						top: 'calc(100% + .7rem)'
					}}
				>
					<DayPicker
						startMonth={new Date(2025, 0)}
						endMonth={new Date(2027, 11)}
						mode='single'
						month={currentMonth}
						onMonthChange={setCurrentMonth}
						selected={selected}
						onSelect={handleDaySelect}
						weekStartsOn={1}
						formatters={{ formatCaption }}
					/>
				</div>
			)}
		</div>
	)
}
