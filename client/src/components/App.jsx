import { useEffect, useState } from 'react'
import { ListNotes } from './ListNotes'
import { LoginOrRegister } from './LoginOrRegister'
import { SendNotes } from './SendNotes'
import { useAuth } from './useAuth'
import { useChangeNotes } from '@/hooks/useChangeNotes'
import { StickyNote } from 'lucide-react'

function App() {
	const { isLogin, handleLogout } = useAuth()
	const [createNote, setCreateNote] = useState(false)
	const { refreshNotes, handleNoteAdded } = useChangeNotes()
	const [userName, setUserName] = useState(null)
	const loggedUserJSON = window.localStorage.getItem('user')
	const highlightStyle = { color: '#FF5722' }

	// useEffect para obtener el usuario logueado
	useEffect(() => {
		if (isLogin) {
			const user = JSON.parse(loggedUserJSON)
			setUserName(user.username)
		}
	}, [isLogin, loggedUserJSON])

	return (
		<main className='flex flex-col items-center justify-center mt-10 md:mt-0 gap-4 mb-2 w-full'>
			{isLogin ? (
				<>
					<h2 className='text-xl md:text-3xl text-white'>
						Bienvenido a tu inicio{' '}
						<span className='text-[#2cc9ff] font-semibold uppercase'>{userName}</span>
					</h2>

					{/* Sección para ingresar notas */}
					<section className='flex flex-col items-center gap-4 w-11/12 md:w-11/12 bg-opacity-80 bg-slate-800 p-4 rounded-lg'>
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
				<div className='flex flex-col items-center gap-4 w-9/12'>
					<h1 className='text-center font-semibold text-3xl md:text-6xl text-black'>
						Organiza tus ideas de forma simple y rápida
					</h1>
					<p className='w-11/12 md:w-8/12 text-black text-base md:text-lg text-center font-medium'>
						Un sitio <span style={highlightStyle}>simple</span> y{' '}
						<span style={highlightStyle}>minimalista</span>, diseñado para que puedas
						<span style={highlightStyle}> guardar</span> información,{' '}
						<span style={highlightStyle}>ideas</span> y todo aquello que inspire tu
						día a día. Disfruta de una experiencia{' '}
						<span style={highlightStyle}>limpia</span> y{' '}
						<span style={highlightStyle}>directa</span>, donde lo esencial es
						organizar y conservar tus pensamientos sin complicaciones.
					</p>

					{createNote ? (
						<LoginOrRegister />
					) : (
						<button
							className='flex items-center justify-center gap-1 text-base md:text-lg font-bold cursor-pointer bg-yellow-500 p-1 rounded-md'
							onClick={() => setCreateNote(true)}>
							<span>Crear nota</span>
							<span>
								<StickyNote size={20}/>
							</span>
						</button>
					)}
				</div>
			)}
		</main>
	)
}

export default App
