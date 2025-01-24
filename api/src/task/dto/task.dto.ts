import { Priority } from '@prisma/client'
import { Transform } from 'class-transformer'
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator'

export class TaskDto {
	@IsOptional()
	@IsString()
	title?: string

	@IsOptional()
	@IsBoolean()
	isCompleted?: boolean

	@IsOptional()
	@IsString()
	dueDate?: string

	@IsOptional()
	@Transform(({ value }) => ('' + value).toUpperCase)
	priority?: Priority
}
