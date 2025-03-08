/* eslint-disable react/prop-types */
import { useState } from 'react'
import { ModalRadix } from './ModalRadix'
const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_HOST
import { StickyNote } from 'lucide-react'

const SendNotes = ({ onNoteAdded }) => {
	const [noteTitle, setNoteTitle] = useState('')
	const [note, setNote] = useState('')
	const [isOpen, setIsOpen] = useState(false)

	const handleSubmit = async e => {
		e.preventDefault()

		const user = JSON.parse(localStorage.getItem('user'))

		const token = user ? JSON.parse(localStorage.getItem('user')).token : null

		try {
			const response = await fetch(`${STRAPI_URL}/api/note`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({
					data: { title: noteTitle, text_note: note, user: user.id }
				})
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
					<button className='flex items-center self-end gap-2 text-white bg-green-700 p-1 rounded-md cursor-pointer font-semibold'>
						Nueva nota{' '}
						<span>
							<StickyNote width={18} height={18} />
						</span>
					</button>
				}>
				<section id='sendNotes' className='flex flex-col items-center w-full gap-4'>
					<h3 className='text-xl md:text-2xl text-white'>Ingresa alguna nota</h3>
					<form
						className='flex flex-col gap-2 w-full justify-center'
						onSubmit={handleSubmit}>
						<input
							type='text'
							className='p-1 w-full md:w-full bg-white rounded-md text-black'
							id='title'
							name='title'
							value={noteTitle}
							onChange={e => setNoteTitle(e.target.value)}
							placeholder='Titulo'
						/>
						<textarea
							type='text'
							className='p-1 w-full md:w-full bg-white rounded-md text-black break-words whitespace-normal field-sizing-content'
							id='note'
							name='note'
							value={note}
							onChange={e => setNote(e.target.value)}
							placeholder='Escribe tu nota aquí'
						/>
						<button
							className='bg-cyan-600 p-1 rounded-md font-semibold text-white cursor-pointer disabled:bg-gray-500 disabled:cursor-not-allowed'
							disabled={isUnchanged}
							aria-label='Guardar'>
							Guardar
						</button>
					</form>
				</section>
			</ModalRadix>
		</>
	)
}

export { SendNotes }
