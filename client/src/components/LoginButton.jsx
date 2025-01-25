const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_HOST

const LoginButton = () => {
	const handleLogin = () => {
		window.location.href = `${STRAPI_URL}/api/connect/auth0`
	}

	return (
		<button onClick={handleLogin} className='text-lg bg-blue-400 rounded-md p-1'>
			Login
		</button>
	)
}

export { LoginButton }
