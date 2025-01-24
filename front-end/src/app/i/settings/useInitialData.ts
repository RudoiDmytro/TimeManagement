'use client'

import { useEffect } from 'react'
import { UseFormReset } from 'react-hook-form'

import { TypeUserForm } from '@/types/auth.types'

import { useProfile } from '@/hooks/useProfile'

export const useInitialData = (reset: UseFormReset<TypeUserForm>) => {
	const { data, isSuccess } = useProfile()

	useEffect(() => {
		if (isSuccess) {
			reset({
				email: data?.user.email,
				name: data?.user.name,
				workInterval: data?.user.workInterval,
				breakInterval: data?.user.breakInterval,
				intervalsCount: data?.user.intervalsCount
			})
		}
	}, [isSuccess])
}
