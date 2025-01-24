import { useState, useEffect } from 'react'

const useAuth = () => {
	const [isLogin, setIsLogin] = useState(false)
	const token = window.localStorage.getItem('user')
		? JSON.parse(window.localStorage.getItem('user')).token
		: null

	useEffect(() => {
		if (token) {
			setIsLogin(true)
		}
	}, [token])

	const handleLogout = () => {
		window.localStorage.removeItem('user')
		setIsLogin(false)
	}

	return { isLogin, handleLogout }
}

export { useAuth }
