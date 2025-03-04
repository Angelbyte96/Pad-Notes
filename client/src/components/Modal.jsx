import { useRef, useEffect } from 'react'
import { Minimize2 } from 'lucide-react'

const Modal = ({ isOpen, onClose, children, className }) => {
	const dialogRef = useRef(null)
	const initialFocusRef = useRef(null)

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

	const handleBackdropClick = e => {
		if (e.target === e.currentTarget) {
			handleClose()
		}
	}

	return (
		<dialog
			ref={dialogRef}
			onClick={handleBackdropClick}
			onClose={handleClose}
			onCancel={handleClose}
			className={className}>
			<span ref={initialFocusRef} tabIndex='-1'></span>
			{children}
			<button
				onClick={handleClose}
				className='p-1 text-white text-base cursor-pointer rounded-full absolute top-2 right-2'>
				<Minimize2 width={20} height={20} />
			</button>
		</dialog>
	)
}

export { Modal }
