import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { taskService } from '@/services/task.service'
import { timeBlockService } from '@/services/time-block.service'

export const useDeleteTimeBlock = (itemId: string) => {
	const queryClinet = useQueryClient()

	const { mutate: deleteTimeBlock, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete time-block', itemId],
		mutationFn: () => timeBlockService.deleteTimeBlock(itemId),
		onSuccess() {
			queryClinet.invalidateQueries({ queryKey: ['time-blocks'] })
		},
		onError: error => toast.error(`Error deleting time block, ${error}`)
	})
	return { deleteTimeBlock, isDeletePending }
}
