/* eslint-disable react/prop-types */
import { useState } from 'react'
const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_HOST

const SendNotes = ({ onNoteAdded }) => {
	const [note, setNote] = useState('')

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
				body: JSON.stringify({ data: { text_note: note, user: user.id } })
			})

			if (!response.ok) throw new Error('Error al enviar la nota')

			setNote('')

			onNoteAdded()
		} catch (error) {
			console.error(error)
		}
	}

	return (
		<section
			id='sendNotes'
			className='flex flex-col items-center w-full gap-4'>
			<h3 className='text-xl md:text-2xl text-white'>Ingresa alguna nota</h3>
			<form className='flex gap-2 w-full justify-center' onSubmit={handleSubmit}>
				<input
					type='text'
					className='p-1 w-8/12 md:w-full bg-white rounded-md'
					id='note'
					name='note'
					value={note}
					onChange={e => setNote(e.target.value)}
				/>
				<button className='bg-cyan-600 p-1 rounded-md font-semibold text-white'>
					Guardar
				</button>
			</form>
		</section>
	)
}

export { SendNotes }
