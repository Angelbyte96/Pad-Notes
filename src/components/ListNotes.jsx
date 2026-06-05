/* eslint-disable react/prop-types */
import { useChangeNotes } from '@/hooks/useChangeNotes'
import { useNotesActions } from '@/hooks/useNotesActions'
import { toast } from '@pheralb/toast'
import { useCallback, useEffect, useState } from 'react'
import { NoteArticle } from './NoteArticle'

const ListNotes = ({ userName }) => {
	const { refreshNotes, handleNoteAdded } = useChangeNotes()
	const [notes, setNotes] = useState([])
	const [noteTitle, setNoteTitle] = useState('')
	const [noteMessage, setNoteMessage] = useState('')
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState(null)
	const [editingNoteId, setEditingNoteId] = useState(null)

	const { handleDeleteNote, handleEditNote, handleCancelEdit, handleUpdate } = useNotesActions({
		onNoteAdded: handleNoteAdded,
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
			const response = await fetch('/api/notes')

			if (response.status === 429) {
				toast.error({
					text: 'Demasiadas solicitudes, intenta en unos segundos',
				})
				return
			}

			if (!response.ok) {
				throw new Error('Error al cargar las notas')
			}

			const data = await response.json()
			setNotes(data.data || [])
		} catch (error) {
			console.error('Error al obtener notas:', error)
			setError(error)
			toast.error({ text: 'Error al cargar las notas' })
		} finally {
			setIsLoading(false)
		}
	}, [refreshNotes])

	useEffect(() => {
		fetchNotes()
	}, [refreshNotes, fetchNotes])

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

