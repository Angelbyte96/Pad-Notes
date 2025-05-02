// AuthRedirect.jsx
import { navigate } from 'astro/virtual-modules/transitions-router.js'
import { useEffect } from 'react'

const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_HOST

const AuthRedirect = ({ provider }) => {
	useEffect(() => {
		const params = new URLSearchParams(window.location.search)
		const accessToken = params.get('access_token')

		if (accessToken) {
			// Construye la URL para validar el access_token según el proveedor.
			const callbackUrl = `${STRAPI_URL}/api/auth/${provider}/callback?access_token=${accessToken}`

			fetch(callbackUrl)
				.then((res) => res.json())
				.then((data) => {
					if (data.jwt && data.user) {
						localStorage.setItem(
							'user',
							JSON.stringify({
								token: data.jwt,
								username: data.user.username,
								id: data.user.documentId, // campo usado para identificar al usuario en Strapi
							}),
						)
						navigate('/dashboard')
					} else {
						console.error('Faltan datos en la respuesta de Strapi:', data)
						navigate('/')
					}
				})
				.catch((error) => {
					console.error('Error al validar el access_token:', error)
					navigate('/')
				})
		} else {
			console.error('No se encontró access_token en la URL')
			navigate('/')
		}
	}, [provider])

	return (
		<div>
			<p>Procesando autenticación con {provider}...</p>
		</div>
	)
}

export { AuthRedirect }

