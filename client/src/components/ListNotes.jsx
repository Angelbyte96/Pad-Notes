/* eslint-disable react/prop-types */
import { useNotesActions } from '@/hooks/useNotesActions'
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

	const { handleDeleteNote, handleEditNote, handleCancelEdit, handleUpdate } = useNotesActions({
		STRAPI_URL,
		token,
		onNoteAdded,
		setEditingNoteId,
		setNoteTitle,
		setNoteMessage,
		editingNoteId,
		noteTitle,
		noteMessage,
	})

	const fetchNotes = useCallback(async () => {
		try {
			setIsLoading(true)
			const fetchApi = await fetch(
				`${STRAPI_URL}/api/note?populate=user&filters[user][documentId]=${userId}&sort=updatedAt:desc`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			const response = await fetchApi.json()
			setNotes(response.data || [])
		} catch (error) {
			setError(error)
		} finally {
			setIsLoading(false)
		}
	}, [token, userId])

	useEffect(() => {
		if (!token || !userId) {
			setIsLoading(false)
			return
		}

		fetchNotes()
	}, [token, userId, refreshTrigger])

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
			setEditingNoteId={setEditingNoteId}
			noteMessage={noteMessage}
			setNoteMessage={setNoteMessage}
			setNoteTitle={setNoteTitle}
			onNoteAdded={onNoteAdded}
		/>
	)
}

export { ListNotes }

