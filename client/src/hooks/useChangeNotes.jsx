import { useState } from 'react'

const useChangeNotes = () => {
	const [refreshNotes, setRefreshNotes] = useState(0)
	const handleNoteAdded = () => {
		setRefreshNotes((prev) => prev + 1)
	}
	return { refreshNotes, handleNoteAdded }
}

export { useChangeNotes }

