import { useEffect, useState } from 'react'
import { LoginOrRegister } from './LoginOrRegister'
import { useAuth } from '../hooks/useAuth'
import { StickyNote } from 'lucide-react'
import { navigate } from 'astro/virtual-modules/transitions-router.js'

function App() {
	const { isLogin } = useAuth()
	const [createNote, setCreateNote] = useState(false)

	useEffect(() => {
		if (isLogin) {
			navigate('/dashboard')
		}
	}, [isLogin])

	const highlightStyle = { color: '#FF5722' }

	return (
		<main className='flex flex-col items-center justify-center mt-10 md:mt-0 gap-4 mb-2 w-full'>
			<div className='flex flex-col items-center gap-4 w-9/12'>
				<h1 className='text-center font-semibold text-3xl md:text-6xl text-black'>
					Organiza tus ideas de forma simple y rápida
				</h1>
				<p className='w-11/12 md:w-8/12 text-black text-base md:text-lg text-center font-medium'>
					Un sitio <span style={highlightStyle}>simple</span> y{' '}
					<span style={highlightStyle}>minimalista</span>, diseñado para que puedas
					<span style={highlightStyle}> guardar</span> información,{' '}
					<span style={highlightStyle}>ideas</span> y todo aquello que inspire tu día
					a día. Disfruta de una experiencia{' '}
					<span style={highlightStyle}>limpia</span> y{' '}
					<span style={highlightStyle}>directa</span>, donde lo esencial es organizar
					y conservar tus pensamientos sin complicaciones.
				</p>

				{createNote ? (
					<LoginOrRegister />
				) : (
					<button
						className='flex items-center justify-center gap-1 text-base md:text-lg font-bold cursor-pointer bg-yellow-500 p-1 rounded-md'
						onClick={() => setCreateNote(true)}>
						<span>Crear nota</span>
						<span>
							<StickyNote size={20} />
						</span>
					</button>
				)}
			</div>
		</main>
	)
}

export default App
