import { useEffect, useState } from 'react'

import type { ITimerRoundResponse } from '@/types/timer.types'

import type { ITimerState } from '../timer.types'

import { useLoadSettings } from './useLoadSettings'

export const useTimer = (): ITimerState => {
	const { workInterval, breakInterval } = useLoadSettings()
	const [isRunning, setIsRunning] = useState(false)
	const [isBreakTime, setIsBreakTime] = useState(false)
	const [secondsLeft, setSecondsLeft] = useState(workInterval * 60)
	const [activeRound, setActiveRound] = useState<ITimerRoundResponse>()

	useEffect(() => {
		let interval: NodeJS.Timeout | null = null

		if (isRunning) {
			interval = setInterval(() => {
				setSecondsLeft(secondsLeft => secondsLeft - 1)
			}, 1000)
		} else if (!isRunning && secondsLeft === 0 && interval) {
			clearInterval(interval)
		}
		return () => {
			if (interval) clearInterval(interval)
		}
	}, [isRunning, secondsLeft, workInterval, activeRound])

	useEffect(() => {
		if (secondsLeft > 0) return
		setIsBreakTime(!isBreakTime)
		setSecondsLeft((isBreakTime ? workInterval : breakInterval) * 60)
	}, [isBreakTime, secondsLeft, workInterval, activeRound])

	return {
		activeRound,
		secondsLeft,
		isRunning,
		setActiveRound,
		setIsRunning,
		setSecondsLeft
	}
}
