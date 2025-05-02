import { LoginButton } from '@/components/LoginButton'
import { useAuth } from '@/hooks/useAuth'
import { navigate } from 'astro/virtual-modules/transitions-router.js'
import { StickyNote } from 'lucide-react'
import { useEffect, useState } from 'react'

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
		<main className="mt-10 mb-2 flex w-full flex-col items-center justify-center gap-4 md:mt-0">
			<div className="flex w-9/12 flex-col items-center gap-4">
				<h1 className="text-center text-3xl font-semibold text-black md:text-6xl">
					Organiza tus ideas de forma simple y rápida
				</h1>
				<p className="w-11/12 text-center text-base font-medium text-black md:w-8/12 md:text-lg">
					Un sitio <span style={highlightStyle}>simple</span> y{' '}
					<span style={highlightStyle}>minimalista</span>, diseñado para que puedas
					<span style={highlightStyle}> guardar</span> información,{' '}
					<span style={highlightStyle}>ideas</span> y todo aquello que inspire tu día a día.
					Disfruta de una experiencia <span style={highlightStyle}>limpia</span> y{' '}
					<span style={highlightStyle}>directa</span>, donde lo esencial es organizar y conservar
					tus pensamientos sin complicaciones.
				</p>

				{createNote ? (
					<>
						<LoginButton
							provider={'google'}
							className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-[#1f2125] p-1.5 text-lg text-white"
						/>
						{/* <LoginButton
							provider={'microsoft'}
							className='flex items-center justify-center gap-2 text-lg text-black bg-white rounded-md p-1.5 cursor-pointer'
						/> */}
					</>
				) : (
					<button
						className="flex cursor-pointer items-center justify-center gap-1 rounded-md bg-yellow-500 p-1 text-base font-bold md:text-lg"
						onClick={() => setCreateNote(true)}
					>
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
