import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { TypeTaskFormState } from '@/types/task.types'

import { taskService } from '@/services/task.service'

export const useCreateTask = () => {
	const queryClinet = useQueryClient()

	const { mutate: createTask } = useMutation({
		mutationKey: ['create task'],
		mutationFn: (data: TypeTaskFormState) => taskService.createTask(data),
		onSuccess() {
			queryClinet.invalidateQueries({ queryKey: ['tasks'] })
		},
		onError: error => toast.error(`Error creating task, ${error}`)
	})
	return { createTask }
}
