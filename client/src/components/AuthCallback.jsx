import { navigate } from 'astro/virtual-modules/transitions-router.js'
import { useEffect } from 'react'

const AuthCallback = () => {
	useEffect(() => {
		const params = new URLSearchParams(window.location.search)

		// Verifica si Strapi devuelve el token en un parámetro "jwt" (ajusta según lo que observes en la red)
		const jwt = params.get('id_token')
		const username = params.get('username') // Si Strapi incluye más datos, ajusta aquí.
		const id = params.get('id')

		if (jwt) {
			localStorage.setItem('user', JSON.stringify({ token: jwt, username, id }))
			navigate('/dashboard')
		} else {
			console.error('Faltan parámetros de autenticación en la URL')
			navigate('/')
		}
	}, [])

	return (
		<div>
			<p>Procesando autenticación...</p>
		</div>
	)
}

export { AuthCallback }

