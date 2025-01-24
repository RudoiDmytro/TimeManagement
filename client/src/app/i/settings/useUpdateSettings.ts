import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { TypeUserForm } from '@/types/auth.types'

import { userService } from '@/services/user.service'

export const useUpdateSettings = () => {
	const queryClinet = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationKey: ['update profile'],
		mutationFn: (data: TypeUserForm) => userService.update(data),
		onSuccess() {
			toast.success('Profile updated successfully')
			queryClinet.invalidateQueries({ queryKey: ['profile'] })
		},
		onError: error => toast.error(`Error updating profile, ${error}`)
	})
	return { mutate, isPending }
}
