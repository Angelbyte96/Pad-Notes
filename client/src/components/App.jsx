import { useEffect, useState } from 'react'
import { ListNotes } from './ListNotes'
import { LoginOrRegister } from './LoginOrRegister'
import { SendNotes } from './SendNotes'
import { useAuth } from './useAuth'

function App() {
	const { isLogin, handleLogout } = useAuth()
	const [refreshNotes, setRefreshNotes] = useState(0)
	const [userName, setUserName] = useState(null)
	const loggedUserJSON = window.localStorage.getItem('user')

	// useEffect para obtener el usuario logueado
	useEffect(() => {
		if (isLogin) {
			const user = JSON.parse(loggedUserJSON)
			setUserName(user.username)
		}
	}, [isLogin, loggedUserJSON])

	// Función para refrescar las notas
	const handleNoteAdded = () => {
		setRefreshNotes(prev => prev + 1) // Función para refrescar las notas
	}

	return (
		<main className='flex flex-col items-center justify-center gap-4  w-full'>
			{isLogin ? (
				<>
					<h2 className='text-xl md:text-3xl text-white'>
						Bienvenido a tu inicio{' '}
						<span className='text-[#2cc9ff] font-semibold uppercase'>{userName}</span>
					</h2>
					<img
						src='/Pikachu.webp'
						alt='Pikachu image'
						className='w-3/12 md:w-1/12 aspect-[739/1283]'
					/>

					{/* Sección para ingresar notas */}
					<section className='flex flex-col items-center gap-4 w-full md:w-6/12 bg-opacity-80 bg-slate-800 p-4 rounded-lg'>
						<SendNotes onNoteAdded={handleNoteAdded} />
						<ListNotes refreshTrigger={refreshNotes} onNoteAdded={handleNoteAdded} />
					</section>

					<button
						className='bg-red-500 p-1 text-white rounded-lg'
						onClick={handleLogout}>
						Cerrar sesión
					</button>
				</>
			) : (
				<LoginOrRegister />
			)}
		</main>
	)
}

export default App
