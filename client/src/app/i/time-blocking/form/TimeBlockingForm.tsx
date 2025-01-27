import { Form, SubmitHandler, useForm, useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SingleSelect } from '@/components/ui/task-edit/SingleSelect'

import type { TypeTimeBlockFormState } from '@/types/time-block.types'

import { COLORS } from './colors.data'
import { useCreateTimeBlock } from './useCreateTimeBlock'
import { useUpdateTimeBlock } from './useUpdateTimeBlock'

export const TimeBlockingForm = () => {
	const { register, control, watch, reset, handleSubmit } =
		useFormContext<TypeTimeBlockFormState>()

	const existsId = watch('id')

	const { updateTimeBlock } = useUpdateTimeBlock()
	const { createTimeBlock, isPending } = useCreateTimeBlock()

	const onSubmit: SubmitHandler<TypeTimeBlockFormState> = data => {
		const { color, id, ...rest } = data
		const dto = { ...rest, color: color || undefined }

		if (id) {
			updateTimeBlock({ id, data: dto })
		} else {
			createTimeBlock(dto)
		}

		reset({
			color: COLORS[COLORS.length - 1],
			duration: 0,
			name: '',
			id: undefined,
			order: 1
		})
	}

	return (
		<form
			className='w-3/5 p-4'
			onSubmit={handleSubmit(onSubmit)}
		>
			<FormField
				control={control}
				name='name'
				render={({ field }) => (
					<FormItem>
						<FormLabel className='text-foreground text-md'>
							Enter name:
						</FormLabel>
						<FormControl>
							<Input
								{...(register('name'),
								{
									required: true
								})}
								placeholder='Enter name:'
								{...field}
								value={field.value || ''}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<div className='mt-2 mb-1' />
			<FormField
				control={control}
				name='duration'
				render={({ field }) => (
					<FormItem>
						<FormLabel className='text-foreground text-md'>
							Enter duration (min.):
						</FormLabel>
						<FormControl>
							<Input
								{...(register('duration'),
								{
									required: true,
								})}
								placeholder='Enter duration (min.):'
								{...field}
								value={field.value || ''}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<FormField
				control={control}
				name='color'
				render={({ field: { value, onChange } }) => (
					<FormItem>
						<FormLabel className='text-foreground text-md'>Color:</FormLabel>
						<FormControl>
							<SingleSelect
								data={COLORS.map(color => ({ label: color, value: color }))}
								onChange={onChange}
								value={value || COLORS[COLORS.length - 1]}
								isColorSelect
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<Button
				className='mt-6'
				variant='outline'
				type='submit'
				disabled={isPending}
				size='lg'
			>
				{existsId ? 'Update' : 'Create'}
			</Button>
		</form>
	)
}
