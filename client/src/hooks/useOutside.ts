import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

export const useOutside = (initialIsVisible: boolean) => {
	const [isShowing, setIsShowing] = useState(initialIsVisible)
	const ref = useRef<HTMLDivElement>(null)

	const handleClickOutside = (event: any) => {
		if (ref.current && !ref.current.contains(event.target)) {
			setIsShowing(false)
		}
	}

	useEffect(() => {
		document.addEventListener('click', handleClickOutside)
		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	})

	return { ref, isShowing, setIsShowing }
}
