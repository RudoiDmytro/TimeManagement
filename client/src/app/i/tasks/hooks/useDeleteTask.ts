import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { taskService } from '@/services/task.service'

export const useDeleteTask = () => {
	const queryClinet = useQueryClient()

	const { mutate: deleteTask, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete task'],
		mutationFn: (id: string) => taskService.deleteTask(id),
		onSuccess() {
			queryClinet.invalidateQueries({ queryKey: ['tasks'] })
		},
		onError: error => toast.error(`Error deleting task, ${error}`)
	})
	return { deleteTask, isDeletePending }
}
