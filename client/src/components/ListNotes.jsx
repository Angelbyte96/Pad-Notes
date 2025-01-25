/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from 'react'
const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_HOST

const ListNotes = ({ refreshTrigger, onNoteAdded }) => {
	const [notes, setNotes] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)
	const user = JSON.parse(window.localStorage.getItem('user'))
	const token = user.token
	const userId = user.id

	useEffect(() => {
		if (!token || !userId) return

		const fetchNotes = async () => {
			try {
				setIsLoading(true)
				const fetchApi = await fetch(
					`${STRAPI_URL}/api/note?populate=user&filters[user][documentId]=${userId}`,
					{
						headers: {
							Authorization: `Bearer ${token}`
						}
					}
				)
				const response = await fetchApi.json()
				setNotes(response.data)
			} catch (error) {
				setError(error)
			} finally {
				setIsLoading(false)
			}
		}
		if (token && userId) fetchNotes()
	}, [token, userId, refreshTrigger])

	const handleDeleteNote = useCallback(
		async noteToDelete => {
			try {
				await fetch(`${STRAPI_URL}/api/note/${noteToDelete}`, {
					method: 'DELETE',
					headers: { Authorization: `Bearer ${token}` }
				})
				onNoteAdded()
			} catch (error) {
				console.error(error)
			}
		},
		[token, onNoteAdded]
	)

	return (
		<div className='flex flex-col items-center gap-4 w-full bg-opacity-80 bg-slate-800 px-8 py-4 rounded-md'>
			<h1 className='text-4xl text-white'>Lista de notas</h1>
			{error ? (
				<p className='text-red-500 text-lg'>{error}</p>
			) : isLoading ? (
				<div className='flex flex-col items-center gap-4 w-full'>
					<p className='text-white text-lg'>Cargando notas...</p>
					<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-white'></div>
				</div>
			) : notes.length === 0 ? (
				<div className='flex flex-col items-center gap-4 w-full'>
					<p className='text-white text-lg'>No hay notas para mostrar</p>
					<img
						src='/image_sad.webp'
						alt='Imagen no hay notas'
						className='w-6/12 aspect-[1980/1939]'
					/>
				</div>
			) : (
				<section className='flex flex-col w-full'>
					<ul className='flex flex-col w-full text-white gap-2'>
						{notes.map(note => (
							<li
								key={note.id}
								className='flex items-center justify-between gap-2 w-full text-lg'>
								<span className=''>
									<span className='select-none'>• </span>
									{note.text_note}
								</span>
								<button
									className='bg-red-400 px-[0.2rem] py-[0.1rem] rounded-lg font-semibold text-sm'
									onClick={() => handleDeleteNote(note.documentId)}>
									Borrar
								</button>
							</li>
						))}
					</ul>
				</section>
			)}
		</div>
	)
}

export { ListNotes }
