'use client'

import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { TypeUserForm } from '@/types/auth.types'

import { useInitialData } from './useInitialData'
import { useUpdateSettings } from './useUpdateSettings'

export const Settings = () => {
	const { register, reset, handleSubmit, control } = useForm<TypeUserForm>({
		mode: 'onChange'
	})

	useInitialData(reset)
	const { isPending, mutate } = useUpdateSettings()

	const onSubmit: SubmitHandler<TypeUserForm> = data => {
		const { password, ...rest } = data
		mutate({
			password: password || undefined,
			...rest
		})
	}

	const form = useForm()
	return (
		<div>
			<Form {...form}>
				<form
					className='w-2/4 m-auto shadow gradient1 rounded-xl p-4 mt-4'
					onSubmit={handleSubmit(onSubmit)}
				>
					<div className='grid grid-cols-2 gap-10'>
						<div>
							<FormField
								control={control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-card text-md'>Email</FormLabel>
										<FormControl>
											<Input
												{...register('email')}
												placeholder='email@example.com'
												type='email'
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
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-card text-md'>
											Username
										</FormLabel>
										<FormControl>
											<Input
												{...register('name')}
												placeholder='example'
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
								name='password'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-card text-md'>
											Password
										</FormLabel>
										<FormControl>
											<Input
												{...register('password')}
												placeholder='example'
												{...field}
												value={field.value || ''}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div>
							<FormField
								control={control}
								name='workInterval'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-card text-md'>
											Work Interval
										</FormLabel>
										<FormControl>
											<Input
												type='number'
												{...register('workInterval', {
													valueAsNumber: true
												})}
												placeholder='example'
												{...field}
												value={field.value || ''}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>{' '}
							<div className='mt-2 mb-1' />
							<FormField
								control={control}
								name='breakInterval'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-card text-md'>
											Break Interval
										</FormLabel>
										<FormControl>
											<Input
												type='number'
												{...register('breakInterval', {
													valueAsNumber: true
												})}
												placeholder='example'
												{...field}
												value={field.value || ''}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>{' '}
							<div className='mt-2 mb-1' />
							<FormField
								control={control}
								name='intervalsCount'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-card text-md'>
											Work Interval
										</FormLabel>
										<FormControl>
											<Input
												type='number'
												{...register('intervalsCount', {
													valueAsNumber: true
												})}
												placeholder='example'
												{...field}
												value={field.value || ''}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
					<Button
						className='mt-2 '
						variant='outline'
						type='submit'
						disabled={isPending}
					>
						Save
					</Button>
				</form>
			</Form>
		</div>
	)
}
