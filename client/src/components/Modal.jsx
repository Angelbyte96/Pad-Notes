import { useRef, useEffect } from 'react'

const Modal = ({ isOpen, onClose, children }) => {
	const dialogRef = useRef(null)

	// Efecto para abrir y cerrar el modal según la propiedad isOpen
	useEffect(() => {
		const dialog = dialogRef.current
		if (!dialog) return
		if (isOpen) {
			dialog.showModal()
		} else if (dialog.open) {
			dialog.close()
		}
	}, [isOpen])

	const handleClose = () => {
		onClose()
		dialogRef.current.close()
	}

	return (
		<dialog ref={dialogRef} onClose={handleClose} onCancel={handleClose}>
			{children}
			<button onClick={handleClose}>Cerrar</button>
		</dialog>
	)
}

export { Modal }
