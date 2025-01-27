'use client'
import { Pause, Play, RefreshCcw } from 'lucide-react'

import { Loader } from '@/components/Loader'
import { Button } from '@/components/ui/button'

import { formatTime } from './format-time'
import { useCreateSession } from './hooks/useCreateSession'
import { useDeleteSession } from './hooks/useDeleteSession'
import { useTimer } from './hooks/useTimer'
import { useTimerActions } from './hooks/useTimerActions'
import { useTodaySession } from './hooks/useTodaySession'
import { TimerRounds } from './rounds/TimerRounds'

export const Timer = () => {
	const timerState = useTimer()
	const { workInterval, isLoading, sessionsResponse } =
		useTodaySession(timerState)
	const rounds = sessionsResponse?.data.rounds
	const actions = useTimerActions({ ...timerState, rounds })
	const { deleteSession, isDeletePending } = useDeleteSession(() =>
		timerState.setSecondsLeft(workInterval * 60)
    )
	const { mutate, isPending } = useCreateSession()
	return (
		<div className='relative w-80 text-center'>
			{!isLoading && (
				<div className='text-7xl font-semibold'>
					{formatTime(timerState.secondsLeft)}
				</div>
			)}
			{isLoading ? (
				<Loader />
			) : sessionsResponse?.data ? (
				<>
					<TimerRounds
						rounds={rounds}
						nextRoundHandler={actions.nextRoundHandler}
						prevRoundHandler={actions.prevRoundHandler}
						activeRound={timerState.activeRound}
					/>
					<button
						onClick={
							timerState.isRunning ? actions.pauseHandler : actions.playHandler
						}
						disabled={actions.isUdateRoundPending}
						className='mt-6 opacity-80 hover:opacity-100 transition-opacity'
					>
						{timerState.isRunning ? <Pause size={30} /> : <Play size={30} />}
					</button>
					<button
						onClick={() => {
							timerState.setIsRunning(false)
							deleteSession(sessionsResponse?.data.id)
						}}
						disabled={isDeletePending}
						className='absolute top-0 right-0 opacity-50 hover:opacity-100 transition-opacity'
					>
						<RefreshCcw size={20} />
					</button>
				</>
			) : (
				<Button
					onClick={() => mutate()}
					className='mt-1'
					disabled={isPending}
				>
					Create session
				</Button>
			)}
		</div>
	)
}
