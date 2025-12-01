/* eslint-disable react/prop-types */
import { toast } from '@pheralb/toast'
import { StickyNote } from 'lucide-react'
import { useState } from 'react'
import { ModalRadix } from './ModalRadix'

const SendNotes = ({ onNoteAdded }) => {
	const [noteTitle, setNoteTitle] = useState('')
	const [note, setNote] = useState('')
	const [isOpen, setIsOpen] = useState(false)

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const response = await fetch('/api/notes', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					title: noteTitle,
					textNote: note,
				}),
			})

			const data = await response.json()

			if (response.status === 429) {
				toast.error({
					text: 'Demasiadas solicitudes, intenta en unos segundos',
				})
				return
			}

			if (!response.ok) {
				toast.error({ text: data.error || 'Error al crear la nota' })
				return
			}

			toast.success({ text: 'Nota creada correctamente' })
			setNoteTitle('')
			setNote('')
			onNoteAdded()
			setIsOpen(false)
		} catch (error) {
			console.error('Error al crear nota:', error)
			toast.error({ text: 'Error al crear la nota' })
		}
	}

	const isUnchanged = noteTitle === '' || note === ''

	return (
		<>
			<ModalRadix
				isOpen={isOpen}
				onOpenChange={setIsOpen}
				trigger={
					<button className="flex cursor-pointer items-center gap-2 self-end rounded-md bg-green-700 px-2 py-1 text-sm font-semibold text-white hover:bg-green-800 md:text-base">
						Nueva nota{' '}
						<span>
							<StickyNote width={18} height={18} />
						</span>
					</button>
				}
			>
				<section id="sendNotes" className="flex w-full flex-col items-center gap-4">
					<h3 className="text-xl text-black md:text-2xl dark:text-white">Ingresa alguna nota</h3>
					<form className="flex w-full flex-col justify-center gap-2" onSubmit={handleSubmit}>
						<input
							type="text"
							className="w-full rounded-md bg-white p-1 text-black md:w-full"
							id="title"
							name="title"
							value={noteTitle}
							onChange={(e) => setNoteTitle(e.target.value)}
							placeholder="Titulo"
						/>
						<textarea
							type="text"
							className="field-sizing-content w-full rounded-md bg-white p-1 break-words whitespace-normal text-black md:w-full"
							id="note"
							name="note"
							value={note}
							onChange={(e) => setNote(e.target.value)}
							placeholder="Escribe tu nota aquí"
						/>
						<button
							className="cursor-pointer rounded-md bg-cyan-700 p-1 font-semibold text-white disabled:cursor-not-allowed disabled:bg-gray-500"
							disabled={isUnchanged}
							aria-label="Guardar"
						>
							Guardar
						</button>
					</form>
				</section>
			</ModalRadix>
		</>
	)
}

export { SendNotes }

