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
		<section className="flex w-full flex-col items-center gap-4">
			<h2 className="text-xl text-black md:text-3xl">
				Bienvenido a tu inicio{' '}
				<span className="font-semibold text-[#0d7395] uppercase">{userName}</span>
			</h2>

			{/* Sección para ingresar notas */}
			<section className="bg-opacity-80 flex w-11/12 flex-col items-center gap-4 rounded-lg bg-slate-800 p-4 md:w-10/12">
				<ListNotes refreshTrigger={refreshNotes} onNoteAdded={handleNoteAdded} />
			</section>
			<button className="rounded-lg bg-red-500 p-1 text-white" onClick={handleLogout}>
				Cerrar sesión
			</button>
		</section>
	)
}

export { Dashboard }

