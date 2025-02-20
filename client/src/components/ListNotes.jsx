/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from 'react'
const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_HOST
import { Trash2, SquarePen, X, Check } from 'lucide-react'

const ListNotes = ({ refreshTrigger, onNoteAdded }) => {
	const [notes, setNotes] = useState([])
	const [note, setNote] = useState('')
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)
	const [editingNoteId, setEditingNoteId] = useState(null)
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

	const handleUpdate = async e => {
		e.preventDefault()

		const user = JSON.parse(localStorage.getItem('user'))

		const token = user ? JSON.parse(localStorage.getItem('user')).token : null

		try {
			const response = await fetch(`${STRAPI_URL}/api/note/${editingNoteId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({ data: { text_note: note } })
			})

			if (!response.ok) throw new Error('Error al enviar la nota')

			setNote('')

			onNoteAdded()
			setEditingNoteId(null)
		} catch (error) {
			console.error(error)
		}
	}

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

	const handleEditNote = useCallback(note => {
		setEditingNoteId(note.documentId)
	})

	const handleCancelEdit = useCallback(() => {
		setEditingNoteId(null)
	})

	return (
		<div className='flex flex-col items-center gap-4 w-full bg-opacity-80 bg-slate-800 py-4 rounded-md'>
			<h1 className='text-2xl md:text-4xl text-white'>Tus notas</h1>
			{error ? (
				<>
					<p className='text-red-500 text-lg'>{error.message}</p>
					<img src='/desconectado.png' alt='' />
				</>
			) : isLoading ? (
				<div className='flex flex-col items-center gap-4 w-full'>
					<p className='text-white text-lg'>Cargando notas...</p>
					<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-white'></div>
				</div>
			) : notes.length === 0 ? (
				<div className='flex flex-col items-center gap-4 w-full'>
					<p className='text-white text-base md:text-lg'>
						No hay notas para mostrar
					</p>
					<img
						src='/image_sad.webp'
						alt='Imagen no hay notas'
						className='w-5/12 md:w-2/12 aspect-1980/1939'
					/>
				</div>
			) : (
				<section className='flex flex-col w-full'>
					<ul className='grid grid-cols-[repeat(auto-fit,_minmax(200px,1fr))] w-full items-stretch gap-4 text-white'>
						{notes.map(note => {
							return (
								<li
									key={note.id}
									className='flex flex-col bg-slate-500 p-2 rounded-xl items-center justify-between gap-2 w-full text-lg group h-full'>
									<div className='flex flex-col items-center justify-between gap-2 w-full h-full'>
										{editingNoteId === note.documentId ? (
											<>
												<textarea
													defaultValue={note.text_note}
													className='break-all whitespace-normal w-full field-sizing-content text-center'
													onChange={e => setNote(e.target.value)}></textarea>
												<div className='flex self-end gap-2'>
													<button
														className='bg-red-700 self-end px-2 py-[0.1rem] rounded-lg font-semibold text-sm cursor-pointer'
														onClick={handleCancelEdit}>
														<X
															size={20}
															className='text-white p-0.5 group-hover:transform group-hover:animate-pulse'
														/>
													</button>
													<button
														className='bg-green-700 self-end px-2 py-[0.1rem] rounded-lg font-semibold text-sm cursor-pointer'
														onClick={handleUpdate}>
														<Check
															size={20}
															className='text-white p-0.5 group-hover:transform group-hover:animate-pulse'
														/>
													</button>
												</div>
											</>
										) : (
											<>
												<span className='break-all whitespace-normal'>
													{note.text_note}
												</span>
												<div className='flex self-end gap-2'>
													<button
														className='bg-blue-400 self-end px-2 py-[0.1rem] rounded-lg font-semibold text-sm cursor-pointer'
														onClick={() => handleEditNote(note)}>
														<SquarePen
															size={20}
															className='text-white p-0.5 group-hover:transform group-hover:animate-pulse'
														/>
													</button>
													<button
														className='bg-red-700 self-end px-2 py-[0.1rem] rounded-lg font-semibold text-sm cursor-pointer'
														onClick={() => handleDeleteNote(note.documentId)}>
														<Trash2
															size={20}
															className='text-white p-0.5 group-hover:transform group-hover:animate-pulse'
														/>
													</button>
												</div>
											</>
										)}
									</div>
								</li>
							)
						})}
					</ul>
				</section>
			)}
		</div>
	)
}

export { ListNotes }
