import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { TimerService } from './timer.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { TimerRoundDto, TimerSessionDto } from './timer.dto'

@Controller('user/timer')
export class TimerController {
	constructor(private readonly timerService: TimerService) {}

	@Get('today')
	@Auth()
	async getTodaySession(@CurrentUser('id') userId: string) {
		return this.timerService.getTodaySession(userId)
	}

	@HttpCode(200)
	@Post()
	@Auth()
	async create(@CurrentUser('id') userId: string) {
		return this.timerService.create(userId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	@Auth()
	async updateSession(
		@Param('id') id: string,
		@Body() dto: TimerSessionDto,
		@CurrentUser('id') userId: string
	) {
		return this.timerService.update(dto, id, userId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put('round/:id')
	@Auth()
	async updateRound(@Param('id') id: string, @Body() dto: TimerRoundDto) {
		return this.timerService.updateRound(dto, id)
	}

	@HttpCode(200)
	@Delete(':id')
	@Auth()
	delete(@Param('id') id: string, @CurrentUser('id') userId: string) {
		return this.timerService.delete(id, userId)
	}
}
