import { LoaderIcon } from 'lucide-react'

type Loader = {
	size?: number
}

export const Loader = ({ size }: Loader) => {
	return (
		<div className='flex justify-center items-center'>
			<LoaderIcon
				className='animate-spin h-5 w-5 text-white'
				size={size}
			/>
		</div>
	)
}
