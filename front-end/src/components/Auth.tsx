'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { IAuthForm } from '@/types/auth.types'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import { Heading } from './Heading'
import { Button } from './ui/button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from './ui/form'
import { Input } from './ui/input'
import { authService } from '@/services/auth.service'

const Auth = () => {
	const { register, handleSubmit, reset, control } = useForm<IAuthForm>({
		mode: 'onChange'
	})

	const [isLoginFrom, setIsLoginForm] = useState(false)

	const { push } = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['auth'],
		mutationFn: async (data: IAuthForm) =>
			authService.main(isLoginFrom ? 'login' : 'register', data),
		onSuccess: data => {
			toast.success('Login successful')
			reset()
			push(DASHBOARD_PAGES.HOME)
		}
	})

	const onSubmit: SubmitHandler<IAuthForm> = data => mutate(data)

	const form = useForm()

	return (
		<div className='flex min-h-screen'>
			<Form {...form}>
				<form
					className='w-1/4 m-auto shadow gradient1 rounded-xl p-4'
					onSubmit={handleSubmit(onSubmit)}
				>
					<Heading title='Authorize' />
					<FormField
						control={control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel className='text-card text-md'>Email</FormLabel>
								<FormControl>
									<Input
										{...register('email', { required: 'Email is required!' })}
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
								<FormLabel className='text-card text-md'>Username</FormLabel>
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
								<FormLabel className='text-card text-md'>Password</FormLabel>
								<FormControl>
									<Input
										{...register('password', {
											required: 'Password is required!'
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

					<div className='flex rounded-md items-center w-full mt-4 gap-5 justify-center border border-card-foreground'>
						<Button
							type='submit'
							variant={'outline'}
							className='flex w-full'
							onClick={() => setIsLoginForm(true)}
						>
							Login
						</Button>
						<Button
							type='submit'
							variant={'outline'}
							className='flex w-full'
							onClick={() => setIsLoginForm(false)}
						>
							Register
						</Button>
					</div>
				</form>
			</Form>
		</div>
	)
}

export default Auth
