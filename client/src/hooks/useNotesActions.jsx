import { toast } from '@pheralb/toast'
import { useCallback } from 'react'

const useNotesActions = ({
	onNoteAdded,
	setEditingNoteId,
	setNoteTitle,
	setNoteMessage,
	editingNoteId,
	noteTitle,
	noteMessage,
}) => {
	const handleDeleteNote = useCallback(
		async (noteId) => {
			try {
				const response = await fetch(`/api/notes/${noteId}`, {
					method: 'DELETE',
					headers: { 'Content-Type': 'application/json' },
				})

				const data = await response.json()

				if (response.status === 429) {
					toast.error({
						text: 'Demasiadas solicitudes, intenta en unos segundos',
					})
					return
				}

				if (!response.ok) {
					toast.error({ text: data.error || 'Error al eliminar la nota' })
					return
				}

				toast.success({ text: 'Nota eliminada correctamente' })
				onNoteAdded()
			} catch (error) {
				console.error('Error al eliminar nota:', error)
				toast.error({ text: 'Error al eliminar la nota' })
			}
		},
		[onNoteAdded],
	)

	const handleEditNote = useCallback(
		(note) => {
			setEditingNoteId(note.id)
			setNoteTitle(note.title)
			setNoteMessage(note.textNote)
		},
		[setEditingNoteId, setNoteTitle, setNoteMessage],
	)

	const handleCancelEdit = useCallback(() => {
		setEditingNoteId(null)
		setNoteTitle('')
		setNoteMessage('')
	}, [setEditingNoteId, setNoteTitle, setNoteMessage])

	const handleUpdate = async (e) => {
		e.preventDefault()

		try {
			const response = await fetch(`/api/notes/${editingNoteId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ title: noteTitle, textNote: noteMessage }),
			})

			const data = await response.json()

			if (response.status === 429) {
				toast.error({
					text: 'Demasiadas solicitudes, intenta en unos segundos',
				})
				return
			}

			if (!response.ok) {
				toast.error({ text: data.error || 'Error al actualizar la nota' })
				return
			}

			toast.success({ text: 'Nota actualizada correctamente' })
			setNoteTitle('')
			setNoteMessage('')
			onNoteAdded()
			setEditingNoteId(null)
		} catch (error) {
			console.error('Error al actualizar nota:', error)
			toast.error({ text: 'Error al actualizar la nota' })
		}
	}

	return { handleDeleteNote, handleEditNote, handleCancelEdit, handleUpdate }
}

export { useNotesActions }

