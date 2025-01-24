import { useAuth0 } from '@auth0/auth0-react'

const LoginButton = () => {
	const { loginWithRedirect } = useAuth0()

	const handleLogin = () => {
		window.location.href = 'http://localhost:1337/api/connect/auth0';
	  };

	return (
		<button
			onClick={handleLogin}
			className='text-lg bg-blue-400 rounded-md p-1'>
			Login
		</button>
	)
}

export { LoginButton }
