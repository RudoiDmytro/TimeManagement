import { ChevronLeft, ChevronRight } from 'lucide-react'

import { ITimerRoundResponse } from '@/types/timer.types'

import styles from './PomodoroRounds.module.scss'
import { cn } from '@/lib/utils'

interface ITimerRounds {
	rounds: ITimerRoundResponse[] | undefined
	nextRoundHandler: () => void
	prevRoundHandler: () => void
	activeRound: ITimerRoundResponse | undefined
}

export const TimerRounds = ({
	rounds,
	nextRoundHandler,
	prevRoundHandler,
	activeRound
}: ITimerRounds) => {
	const isCanPrevRound = rounds
		? rounds.some(round => round.isCompleted)
		: false
	const isCanNextRound = rounds
		? !rounds[rounds.length - 1]?.isCompleted
		: false
	return (
		<div className={styles.container}>
			<button
				className={styles.button}
				disabled={!isCanPrevRound}
				onClick={() => (isCanPrevRound ? prevRoundHandler() : false)}
			>
				<ChevronLeft size={25} />
			</button>
			<div className={styles.roundsContainer}>
				{rounds &&
					rounds.map((round, index) => (
						<div
							key={index}
							className={cn(styles.round, {
								[styles.active]:
									round.id === activeRound?.id && !round.isCompleted,
								[styles.completed]: round.isCompleted
							})}
						/>
					))}
			</div>
			<button
				className={styles.button}
				disabled={!isCanNextRound}
				onClick={() => (isCanNextRound ? nextRoundHandler() : false)}
			>
				<ChevronRight size={25} />
			</button>
		</div>
	)
}
