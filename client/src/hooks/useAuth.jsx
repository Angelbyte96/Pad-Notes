// lenguaje: javascript
import { navigate } from 'astro/virtual-modules/transitions-router.js'
import { useState, useEffect } from 'react'

const useAuth = () => {
	const [isLogin, setIsLogin] = useState(false)
	const [userName, setUserName] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const loggedUserJSON = window.localStorage.getItem('user')

	const token = loggedUserJSON ? JSON.parse(loggedUserJSON).token : null

	useEffect(() => {
		if (token) {
			setIsLogin(true)
		}
		setIsLoading(false)
	}, [token])

	useEffect(() => {
		if (isLogin && loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			setUserName(user.username)
		}
	}, [isLogin, loggedUserJSON])

	const handleLogout = () => {
		window.localStorage.removeItem('user')
		setIsLogin(false)
		navigate('/')
	}

	return { isLogin, handleLogout, userName, isLoading }
}

export { useAuth }
