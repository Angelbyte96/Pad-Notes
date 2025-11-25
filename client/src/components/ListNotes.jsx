/* eslint-disable react/prop-types */
import { useChangeNotes } from '@/hooks/useChangeNotes'
import { useNotesActions } from '@/hooks/useNotesActions'
import { $authStore } from '@clerk/astro/client'
import { useStore } from '@nanostores/react'
import { useCallback, useEffect, useState } from 'react'
import { NoteArticle } from './NoteArticle'
const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_HOST

const ListNotes = ({ userName }) => {
	const { refreshNotes, handleNoteAdded } = useChangeNotes()
	const auth = useStore($authStore)
	const [token, setToken] = useState(null)

	useEffect(() => {
		const fetchToken = async () => {
			if (auth.getToken) {
				const clerkToken = await auth.getToken()
				setToken(clerkToken)
			}
		}
		fetchToken()
	}, [auth])

	const [notes, setNotes] = useState([])
	const [noteTitle, setNoteTitle] = useState('')
	const [noteMessage, setNoteMessage] = useState('')
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)
	const [editingNoteId, setEditingNoteId] = useState(null)

	const { handleDeleteNote, handleEditNote, handleCancelEdit, handleUpdate } = useNotesActions({
		STRAPI_URL,
		token,
		onNoteAdded: handleNoteAdded,
		setEditingNoteId,
		setNoteTitle,
		setNoteMessage,
		editingNoteId,
		noteTitle,
		noteMessage,
	})

	const fetchNotes = useCallback(async () => {
		if (!token || !auth.userId) return

		try {
			setIsLoading(true)
			// TODO: Implementar fetch a TursoDB
			// Por ahora dejamos vacío para migración futura
			setNotes([])
		} catch (error) {
			setError(error)
		} finally {
			setIsLoading(false)
		}
	}, [token, auth.userId, refreshNotes])

	useEffect(() => {
		if (!token || !auth.userId) {
			setIsLoading(false)
			return
		}

		fetchNotes()
	}, [token, auth.userId, refreshNotes, fetchNotes])

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
		onNoteAdded={handleNoteAdded}
	/>
	)
}

export { ListNotes }

