import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { TypeTaskFormState } from '@/types/task.types'

import { taskService } from '@/services/task.service'

export const useUpdateTask = (key?: string) => {
	const queryClinet = useQueryClient()

	const { mutate: updateTask } = useMutation({
		mutationKey: ['update task', key],
		mutationFn: ({ id, data }: { id: string; data: TypeTaskFormState }) =>
			taskService.updateTask(id, data),
		onSuccess() {
			queryClinet.invalidateQueries({ queryKey: ['tasks'] })
		},
		onError: error => toast.error(`Error updating task, ${error}`)
	})
	return { updateTask }
}
