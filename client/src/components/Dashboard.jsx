// lenguaje: javascript
import { useAuth } from '../hooks/useAuth'
import { SendNotes } from './SendNotes'
import { useChangeNotes } from '@/hooks/useChangeNotes'
import { ListNotes } from './ListNotes'
import { navigate } from 'astro/virtual-modules/transitions-router.js'
import { useEffect } from 'react'

const Dashboard = () => {
  const { isLogin, handleLogout, userName, isLoading } = useAuth()
  const { refreshNotes, handleNoteAdded } = useChangeNotes()

  // Si no está logueado, redirige a la página principal
  useEffect(() => {
    if (!isLoading && !isLogin) {
      navigate('/')
    }
  }, [isLoading, isLogin])

  if (isLoading) return <p className='text-center'>Cargando...</p>

  return (
    <section className='flex flex-col items-center gap-4 w-full'>
      <h2 className='text-xl md:text-3xl text-black'>
        Bienvenido a tu inicio{' '}
        <span className='text-[#0d7395] font-semibold uppercase'>{userName}</span>
      </h2>

      {/* Sección para ingresar notas */}
      <section className='flex flex-col items-center gap-4 w-11/12 md:w-10/12 bg-opacity-80 bg-slate-800 p-4 rounded-lg'>
        <SendNotes onNoteAdded={handleNoteAdded} />
        <ListNotes refreshTrigger={refreshNotes} onNoteAdded={handleNoteAdded} />
      </section>
      <button
        className='bg-red-500 p-1 text-white rounded-lg'
        onClick={handleLogout}>
        Cerrar sesión
      </button>
    </section>
  )
}

export { Dashboard }