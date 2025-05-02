import { useCallback } from 'react'

const useNotesActions = ({
	STRAPI_URL,
	token,
	onNoteAdded,
	setEditingNoteId,
	setNoteTitle,
	setNoteMessage,
	editingNoteId,
	noteTitle,
	noteMessage,
}) => {
	const handleDeleteNote = useCallback(
		async (noteToDelete) => {
			try {
				await fetch(`${STRAPI_URL}/api/note/${noteToDelete}`, {
					method: 'DELETE',
					headers: { Authorization: `Bearer ${token}` },
				})
				onNoteAdded()
			} catch (error) {
				console.error(error)
			}
		},
		[token, onNoteAdded],
	)

	const handleEditNote = useCallback(
		(note) => {
			setEditingNoteId(note.documentId)
			setNoteTitle(note.title)
			setNoteMessage(note.text_note)
		},
		[setEditingNoteId, setNoteTitle, setNoteMessage],
	)

	const handleCancelEdit = useCallback(() => {
		setEditingNoteId(null)
	}, [setEditingNoteId])

	const handleUpdate = async (e) => {
		e.preventDefault()

		try {
			const response = await fetch(`${STRAPI_URL}/api/note/${editingNoteId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ data: { title: noteTitle, text_note: noteMessage } }),
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

	return { handleDeleteNote, handleEditNote, handleCancelEdit, handleUpdate }
}

export { useNotesActions }

