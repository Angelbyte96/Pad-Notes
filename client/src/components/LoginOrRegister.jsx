import { useState } from 'react'
import { FormRegister } from './FormRegister'
import { FormLogin } from './FormLogin'

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
		<section className='w-fit flex flex-col items-center gap-4 text-white bg-slate-700 px-2 py-4 rounded-md'>
			{!showLogin && !showRegister && (
				<div className='flex gap-4'>
					<button
						className='bg-blue-400 p-1 rounded-lg'
						onClick={handleShowRegister}>
						Register
					</button>
					<button className='bg-blue-500 p-1 rounded-lg' onClick={handleShowLogin}>
						Login
					</button>
				</div>
			)}
			{showRegister && (
				<>
					<FormRegister />
					<button
						className='bg-teal-700 p-1 text-white rounded-lg font-semibold border-solid border-teal-800 border-[2px]'
						onClick={handleBack}>
						⬅️Atrás
					</button>
				</>
			)}
			{showLogin && (
				<>
					<FormLogin />
					<button
						className='bg-teal-700 p-1 text-white rounded-lg font-semibold border-solid border-teal-800 border-[2px]'
						onClick={handleBack}>
						⬅️Atrás
					</button>
				</>
			)}
		</section>
	)
}

export { LoginOrRegister }
