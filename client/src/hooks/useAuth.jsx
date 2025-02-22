import { useState, useEffect } from 'react'

const useAuth = () => {
	const [isLogin, setIsLogin] = useState(false)
	const [userName, setUserName] = useState(null)
	const loggedUserJSON = window.localStorage.getItem('user')

	const token = window.localStorage.getItem('user')
		? JSON.parse(window.localStorage.getItem('user')).token
		: null

	useEffect(() => {
		if (token) {
			setIsLogin(true)
		}
	}, [token])

	// useEffect para obtener el usuario logueado
	useEffect(() => {
		if (isLogin) {
			const user = JSON.parse(loggedUserJSON)
			setUserName(user.username)
		}
	}, [isLogin, loggedUserJSON])

	const handleLogout = () => {
		window.localStorage.removeItem('user')
		setIsLogin(false)
	}

	return { isLogin, handleLogout, userName }
}

export { useAuth }
