import { ITimerRoundResponse } from '@/types/timer.types'

import type { ITimerState } from '../timer.types'

import { useLoadSettings } from './useLoadSettings'
import { useUpdateRound } from './useUpdateRound'

type TypeUseTimerActions = ITimerState & {
	rounds: ITimerRoundResponse[] | undefined
}

export const useTimerActions = ({
	activeRound,
	secondsLeft,
	setIsRunning,
	rounds,
	setActiveRound
}: TypeUseTimerActions) => {
	const { workInterval } = useLoadSettings()
	const { isUdateRoundPending, updateRound } = useUpdateRound()

	const pauseHandler = () => {
		setIsRunning(false)

		if (!activeRound?.id) return

		updateRound({
			id: activeRound.id,
			data: {
				isCompleted: Math.floor(secondsLeft / 60) >= workInterval,
				totalSeconds: secondsLeft
			}
		})
	}

	const playHandler = () => {
		setIsRunning(true)
	}

	const nextRoundHandler = () => {
		if (!activeRound?.id) return

		updateRound({
			id: activeRound?.id,
			data: { isCompleted: true, totalSeconds: secondsLeft }
		})
	}

	const prevRoundHandler = () => {
		const lastCompletedRound = rounds?.findLast(round => round.isCompleted)

		if (!lastCompletedRound?.id) return

		updateRound({
			id: lastCompletedRound?.id,
			data: { isCompleted: false, totalSeconds: 0 }
		})
		setActiveRound(lastCompletedRound)
	}

	return {
		isUdateRoundPending,
		pauseHandler,
		playHandler,
		nextRoundHandler,
		prevRoundHandler
	}
}
