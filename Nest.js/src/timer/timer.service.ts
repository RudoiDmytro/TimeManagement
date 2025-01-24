import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { TimerRoundDto, TimerSessionDto } from './timer.dto'

@Injectable()
export class TimerService {
	constructor(private prisma: PrismaService) {}

	async getTodaySession(userId: string) {
		const today = new Date().toISOString().split('T')[0]

		return this.prisma.pomodoroSession.findFirst({
			where: {
				userId,
				createdAt: {
					gte: new Date(today)
				}
			},
			include: {
				rounds: {
					orderBy: {
						id: 'asc'
					}
				}
			}
		})
	}

	async create(userId: string) {
		const todaySession = await this.getTodaySession(userId)

		if (todaySession) return todaySession

		const user = await this.prisma.user.findUnique({
			where: { id: userId },
			select: {
				intervalsCount: true
			}
		})

		if (!user) throw new NotFoundException('User not found')

		return this.prisma.pomodoroSession.create({
			data: {
				user: { connect: { id: userId } },
				rounds: {
					createMany: {
						data: Array.from({ length: user.intervalsCount }, () => ({
							totalSeconds: 0
						}))
					}
				}
			},
			include: {
				rounds: true
			}
		})
	}

	update(dto: Partial<TimerSessionDto>, sessionId: string, userId: string) {
		return this.prisma.pomodoroSession.update({
			where: { id: sessionId, userId },
			data: dto
		})
	}

	updateRound(dto: Partial<TimerRoundDto>, roundId: string) {
		return this.prisma.pomodoroRound.update({
			where: { id: roundId },
			data: dto
		})
	}

	delete(sessionId: string, userId:string) {
		return this.prisma.pomodoroSession.delete({
			where: { id: sessionId, userId }
		})
	}
}
