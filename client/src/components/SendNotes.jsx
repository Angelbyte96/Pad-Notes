/* eslint-disable react/prop-types */
import { StickyNote } from 'lucide-react'
import { useState } from 'react'
import { ModalRadix } from './ModalRadix'
const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_HOST

const SendNotes = ({ onNoteAdded }) => {
	const [noteTitle, setNoteTitle] = useState('')
	const [note, setNote] = useState('')
	const [isOpen, setIsOpen] = useState(false)

	const handleSubmit = async (e) => {
		e.preventDefault()

		const user = JSON.parse(localStorage.getItem('user'))

		const token = user ? JSON.parse(localStorage.getItem('user')).token : null

		try {
			const response = await fetch(`${STRAPI_URL}/api/note`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					data: { title: noteTitle, text_note: note, user: user.id },
				}),
			})

			if (!response.ok) throw new Error('Error al enviar la nota')

			setNoteTitle('')
			setNote('')

			onNoteAdded()
			setIsOpen(false)
		} catch (error) {
			console.error(error)
		}
	}

	const isUnchanged = noteTitle === '' || note === ''

	return (
		<>
			<ModalRadix
				isOpen={isOpen}
				onOpenChange={setIsOpen}
				trigger={
					<button className="flex cursor-pointer text-sm md:text-base items-center gap-2 self-end rounded-md bg-green-700 px-2 py-1 font-semibold text-white hover:bg-green-800">
						Nueva nota{' '}
						<span>
							<StickyNote width={18} height={18} />
						</span>
					</button>
				}
			>
				<section id="sendNotes" className="flex w-full flex-col items-center gap-4">
					<h3 className="text-xl text-black md:text-2xl">Ingresa alguna nota</h3>
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

