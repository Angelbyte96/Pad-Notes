import { useState } from 'react'
const STRAPI_TOKEN = import.meta.env.PUBLIC_STRAPI_TOKEN
const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_HOST

const FormRegister = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [username, setUsername] = useState('')
	const [message, setMessage] = useState(null)
	const [isError, setIsError] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const handleSubmit = async (e) => {
		e.preventDefault()

		setMessage(null)
		setIsError(false)
		const resetForm = () => {
			setEmail('')
			setPassword('')
			setUsername('')
		}
		if (email.trim() === '' || password.trim() === '') {
			setIsError(true)
			setMessage('Por favor rellena todos los campos')
			return
		}
		setIsLoading(true)
		try {
			const response = await fetch(`${STRAPI_URL}/api/auth/local/register`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${STRAPI_TOKEN}`,
				},
				body: JSON.stringify({
					username: username,
					email: email,
					password: password,
				}),
			})

			if (!response.ok) {
				if (response.status === 400) {
					throw new Error('El usuario ya está registrado')
				} else {
					throw new Error('Ocurrio un error al registrar el usuario')
				}
			}

			const data = await response.json()
			setMessage(data.message || 'Usuario registrado correctamente')
			setIsError(false)

			if (data)
				localStorage.setItem(
					'user',
					JSON.stringify({
						token: data.jwt,
						username: data.user.username,
						id: data.user.documentId,
					}),
				)

			resetForm()
			setTimeout(() => {
				window.location.reload()
			}, 2000)
		} catch (error) {
			setIsError(true)
			setMessage(error.message || 'Ocurrio un error al registrar el usuario')
		} finally {
			setIsLoading(false)
		}
	}
	return (
		<section className="flex w-80 flex-col items-center gap-4 rounded-md bg-slate-800 px-2 py-4 text-white">
			<h1 className="text-4xl uppercase">Registro</h1>
			<form
				onSubmit={handleSubmit}
				className="flex w-10/12 flex-col items-center justify-center gap-4 text-white"
			>
				<label htmlFor="username" className="flex w-full flex-col items-center">
					<span className="self-start">Nombre de usuario:</span>
					<input
						type="text"
						id="username"
						name="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className="w-full rounded-md bg-gray-200 p-1 text-black"
						placeholder="Ingresa tu username"
					/>
				</label>
				<label htmlFor="email" className="flex w-full flex-col items-center">
					<span className="self-start">Email:</span>
					<input
						type="email"
						id="email"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="w-full rounded-md bg-gray-200 p-1 text-black"
						placeholder="Ingresa tu email"
					/>
				</label>
				<label htmlFor="password" className="flex w-full flex-col items-center">
					<span className="self-start">Contraseña:</span>
					<input
						type="password"
						id="password"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full rounded-md bg-gray-200 p-1 text-black"
						placeholder="Ingresa tu contraseña"
					/>
				</label>
				{message && <p style={{ color: isError ? 'red' : 'green' }}>{message}</p>}
				<button className="w-fit rounded-md bg-blue-500 px-2 py-1 text-lg">
					{isLoading ? 'Registrando...' : 'Registrar'}
				</button>
			</form>
		</section>
	)
}

export { FormRegister }

