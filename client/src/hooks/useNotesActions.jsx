import { useCallback } from 'react'

const useNotesActions = ({
	STRAPI_URL,
	token,
	onNoteAdded,
	setEditingNoteId,
	setNoteTitle,
	setNoteMessage
}) => {
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

	const handleEditNote = useCallback(
		note => {
			setEditingNoteId(note.documentId)
			setNoteTitle(note.title)
			setNoteMessage(note.text_note)
		},
		[setEditingNoteId, setNoteTitle, setNoteMessage]
	)

	const handleCancelEdit = useCallback(() => {
		setEditingNoteId(null)
	}, [setEditingNoteId])

	return { handleDeleteNote, handleEditNote, handleCancelEdit }
}

export { useNotesActions }
