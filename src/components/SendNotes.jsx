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
					<button className="flex cursor-pointer items-center gap-1.5 self-end rounded-lg border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 transition-all duration-200 hover:bg-green-100 dark:border-green-500/20 dark:bg-green-500/[0.12] dark:text-green-400 dark:hover:bg-green-500/20">
						Nueva nota{' '}
						<StickyNote width={14} height={14} />
					</button>
				}
			>
				<section id="sendNotes" className="flex w-full flex-col items-center gap-4">
					<h3 className="self-start text-sm font-bold tracking-widest text-black uppercase dark:text-white">Nueva nota</h3>
					<form className="flex w-full flex-col justify-center gap-2" onSubmit={handleSubmit}>
						<input
							type="text"
							className="w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-sm text-black outline-none transition-all placeholder:text-[#aaa] focus:border-accent-400 focus:ring-2 focus:ring-accent-400/20 dark:border-white/[0.1] dark:bg-[#1e1e1e] dark:text-white dark:placeholder-[#555]"
							id="title"
							name="title"
							value={noteTitle}
							onChange={(e) => setNoteTitle(e.target.value)}
							placeholder="Título"
						/>
						<textarea
							type="text"
							className="field-sizing-content w-full break-words whitespace-normal rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-sm text-black outline-none transition-all placeholder:text-[#aaa] focus:border-accent-400 focus:ring-2 focus:ring-accent-400/20 dark:border-white/[0.1] dark:bg-[#1e1e1e] dark:text-white dark:placeholder-[#555]"
							id="note"
							name="note"
							value={note}
							onChange={(e) => setNote(e.target.value)}
							placeholder="Escribe tu nota aquí"
						/>
						<button
							className="flex cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 transition-all duration-200 hover:bg-green-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-green-500/20 dark:bg-green-500/[0.12] dark:text-green-400 dark:hover:bg-green-500/20"
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

