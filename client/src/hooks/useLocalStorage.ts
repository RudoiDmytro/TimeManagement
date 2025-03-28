import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

interface IUseLocalStorage<T> {
	key: string
	defaultValue: T
}

export const useLocalStorage = <T>({key, defaultValue}: IUseLocalStorage<T>): [
	T,
	Dispatch<SetStateAction<T>>,
	boolean
] => {
	const [isLoading, setIsLoading] = useState(true)
	const [value, setValue] = useState<T>(defaultValue)
	const isMounted = useRef(false)

	useEffect(() => {
		try {
			const item = window.localStorage.getItem(key)
			if (item) {
				setValue(JSON.parse(item))
			}
		} catch (error) {
			console.error('Error reading localStorage:', error)
		} finally {
			setIsLoading(false)
		}
		return () => {
			isMounted.current = false
		}
	}, [key])

	useEffect(() => {
		if (isMounted.current) {
			window.localStorage.setItem(key, JSON.stringify(value))
		} else {
			isMounted.current = true
		}
	}, [key, value])

	return [value, setValue, isLoading]
}
