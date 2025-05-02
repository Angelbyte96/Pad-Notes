import { useState } from 'react'
import { FormLogin } from './FormLogin'
import { FormRegister } from './FormRegister'

const LoginOrRegister = () => {
	const [showRegister, setShowRegister] = useState(false)
	const [showLogin, setShowLogin] = useState(false)

	const handleShowRegister = () => {
		setShowRegister(true)
		setShowLogin(false)
	}

	const handleShowLogin = () => {
		setShowRegister(false)
		setShowLogin(true)
	}

	const handleBack = () => {
		setShowRegister(false)
		setShowLogin(false)
	}

	return (
		<section className="flex w-fit flex-col items-center gap-4 px-2 py-4 text-white">
			{!showLogin && !showRegister && (
				<div className="flex flex-col items-center gap-4">
					<button
						className="rounded-lg bg-blue-500 p-2 text-2xl font-semibold"
						onClick={handleShowRegister}
					>
						Registrate
					</button>
					<span className="text-black">O</span>
					<button
						className="rounded-lg bg-blue-600 p-2 text-2xl font-semibold"
						onClick={handleShowLogin}
					>
						Inicia sesión
					</button>
				</div>
			)}
			{showRegister && (
				<>
					<FormRegister />
					<button
						className="rounded-lg border-[2px] border-solid border-teal-800 bg-teal-700 p-1 font-semibold text-white"
						onClick={handleBack}
					>
						⬅️Atrás
					</button>
				</>
			)}
			{showLogin && (
				<>
					<FormLogin />
					<button
						className="rounded-lg border-[2px] border-solid border-teal-800 bg-teal-700 p-1 font-semibold text-white"
						onClick={handleBack}
					>
						⬅️Atrás
					</button>
				</>
			)}
		</section>
	)
}

export { LoginOrRegister }

