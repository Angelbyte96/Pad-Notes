// lenguaje: javascript
import { useChangeNotes } from '@/hooks/useChangeNotes'
import { navigate } from 'astro/virtual-modules/transitions-router.js'
import { useEffect } from 'react'
import { useAuth } from '../hooks/useAuth'
import { ListNotes } from './ListNotes'

const Dashboard = () => {
	const { isLogin, handleLogout, userName, isLoading } = useAuth()
	const { refreshNotes, handleNoteAdded } = useChangeNotes()

	// Si no está logueado, redirige a la página principal
	useEffect(() => {
		if (!isLoading && !isLogin) {
			navigate('/')
		}
	}, [isLoading, isLogin])

	if (isLoading) return <p className="text-center">Cargando...</p>

	return (
		<section className="flex min-h-dvh w-full flex-col items-center gap-4 overflow-y-auto pb-20">
			<h2 className="text-xl text-black md:text-3xl dark:text-white">
				Bienvenido a tu inicio{' '}
				<span className="font-semibold text-[#0d7395] uppercase dark:text-cyan-500">
					{userName}
				</span>
			</h2>

			{/* Sección para ingresar notas */}
			<ListNotes refreshTrigger={refreshNotes} onNoteAdded={handleNoteAdded} />

			<button
				className="rounded-lg bg-red-700 px-2 py-1 font-semibold text-white hover:cursor-pointer hover:bg-red-800"
				onClick={handleLogout}
			>
				Cerrar sesión
			</button>
		</section>
	)
}

export { Dashboard }

