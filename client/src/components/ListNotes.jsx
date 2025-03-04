/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from 'react'
import { NoteArticle } from './NoteArticle'
const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_HOST

const ListNotes = ({ refreshTrigger, onNoteAdded }) => {
	const [notes, setNotes] = useState([])
	const [noteTitle, setNoteTitle] = useState('')
	const [noteMessage, setNoteMessage] = useState('')
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)
	const [editingNoteId, setEditingNoteId] = useState(null)

	// Obtenemos el usuario desde localStorage
	const storedUser = window.localStorage.getItem('user')
	const user = storedUser ? JSON.parse(storedUser) : null
	const token = user ? user.token : null
	const userId = user ? user.id : null

	useEffect(() => {
		if (!token || !userId) {
			setIsLoading(false)
			return
		}

		const fetchNotes = async () => {
			try {
				setIsLoading(true)
				const fetchApi = await fetch(
					`${STRAPI_URL}/api/note?populate=user&filters[user][documentId]=${userId}&sort=createdAt`,
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

		fetchNotes()
	}, [token, userId, refreshTrigger])

	const handleUpdate = async e => {
		e.preventDefault()

		try {
			const response = await fetch(`${STRAPI_URL}/api/note/${editingNoteId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({ data: { title: noteTitle, text_note: noteMessage } })
			})

			if (!response.ok) throw new Error('Error al enviar la nota')

			setNoteTitle('')
			setNoteMessage('')
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
		setNoteTitle(note.title)
		setNoteMessage(note.text_note)
	}, [])

	const handleCancelEdit = useCallback(() => {
		setEditingNoteId(null)
	}, [])

	// Renderizamos un mensaje de usuario no autentificado sin retornar anticipadamente
	if (!user) {
		return <p>No hay usuario autentificado.</p>
	}

	return (
		<NoteArticle
			notes={notes}
			noteTitle={noteTitle}
			isLoading={isLoading}
			error={error}
			handleUpdate={handleUpdate}
			handleDeleteNote={handleDeleteNote}
			handleEditNote={handleEditNote}
			handleCancelEdit={handleCancelEdit}
			editingNoteId={editingNoteId}
		/>
	)
}

export { ListNotes }
