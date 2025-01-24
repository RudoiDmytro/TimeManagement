import { useQuery } from '@tanstack/react-query'
import { Dispatch, SetStateAction, useEffect } from 'react'

import { ITimerRoundResponse } from '@/types/timer.types'

import { ITimerState } from '../timer.types'

import { useLoadSettings } from './useLoadSettings'
import { timerService } from '@/services/timer.service'

interface IUseTodaySession {
	setActiveRound: Dispatch<SetStateAction<ITimerRoundResponse | undefined>>
	setSecondsLeft: Dispatch<SetStateAction<number>>
	workInterval: number
}

export const useTodaySession = ({
	setActiveRound,
	setSecondsLeft
}: ITimerState) => {
	const { workInterval } = useLoadSettings()
	const {
		data: sessionsResponse,
		isLoading,
		refetch,
		isSuccess
	} = useQuery({
		queryKey: ['get today session'],
		queryFn: () => timerService.getTodaySession()
	})

	const rounds = sessionsResponse?.data.rounds

	useEffect(() => {
		if (isSuccess && rounds) {
			const activeRound = rounds.find(round => !round.isCompleted)
			setActiveRound(activeRound)
			console.log(activeRound)
			if (activeRound && activeRound?.totalSeconds !== 0) {
				setSecondsLeft(activeRound.totalSeconds)
			}
		}
	}, [isSuccess, rounds])

	return { sessionsResponse, isLoading, workInterval }
}
