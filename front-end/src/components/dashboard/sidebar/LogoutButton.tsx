'use client'

import { useMutation } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

import { authService } from '@/services/auth.service'

export const LogoutButton = () => {
	const router = useRouter()

	const { mutate } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => {
			router.push('/auth')
		}
	})

	return (
		<div className='absolute top-4 right-2'>
			<button className='opacity-40 hover:opacity-100 transition-opacity duration-300 border-2 p-0.5 border-foreground rounded' onClick={() => mutate()}>
				<LogOut size={20} />
			</button>
		</div>
	)
}
