import { useState } from 'react'
import { Trash2, SquarePen, X, Check } from 'lucide-react'
import { ButtonCopy } from './ButtonCopy'
import { Modal } from '@/components/Modal'
import { format } from '@formkit/tempo'

const NoteArticle = ({
	notes,
	setNoteTitle,
	noteTitle,
	editingNoteId,
	setEditingNoteId,
	isLoading,
	error,
	handleUpdate,
	handleDeleteNote,
	handleEditNote,
	handleCancelEdit,
	noteMessage,
	setNoteMessage
}) => {
	const [notaActiva, setNotaActiva] = useState(null)

	const abrirModal = notaId => setNotaActiva(notaId)
	const cerrarModal = () => setNotaActiva(null)

	return (
		<div className='flex flex-col items-center gap-4 w-full bg-opacity-80 bg-slate-800 py-4 rounded-md'>
			<h1 className='text-2xl md:text-4xl text-white'>Tus notas</h1>
			{error ? (
				<>
					<p className='text-red-500 text-lg'>{error.message}</p>
					<img src='/desconectado.png' alt='' />
				</>
			) : isLoading ? (
				<div className='flex flex-col items-center gap-4 w-full'>
					<p className='text-white text-lg'>Cargando notas...</p>
					<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-white'></div>
				</div>
			) : notes.length === 0 ? (
				<div className='flex flex-col items-center gap-4 w-full'>
					<p className='text-white text-base md:text-lg'>
						No hay notas para mostrar
					</p>
					<img
						src='/image_sad.webp'
						alt='Imagen no hay notas'
						className='w-5/12 md:w-2/12 aspect-1980/1939'
					/>
				</div>
			) : (
				<section className='flex flex-col w-full'>
					<ul className='grid grid-cols-[repeat(auto-fit,_minmax(200px,1fr))] w-full items-stretch gap-4 text-white'>
						{notes.map(note => {
							const isUnchanged =
								noteTitle === note.title && noteMessage === note.text_note
							const dateCreatedAt = note.createdAt
							const dateCreated = format(dateCreatedAt, 'D MMMM YYYY', 'es')
							const dateUpdatedAt = note.updatedAt
							const dateUpdated = format(dateUpdatedAt, 'DD/MM/YYYY, h:mm a', 'es')
							return (
								<li
									key={note.id}
									className='flex flex-col bg-cyan-900 py-2 px-4 rounded-xl items-center justify-between gap-2 w-full text-lg group h-full cursor-pointer relative'
									onClick={() => abrirModal(note.id)}>
									<span className='uppercase self-start text-cyan-200 font-bold'>
										{note.title}
									</span>
									<span className='self-start text-white w-full whitespace-nowrap overflow-hidden text-ellipsis mb-2.5'>
										{note.text_note}
									</span>
									{notaActiva === note.id && (
										<Modal
											isOpen={true}
											onClose={cerrarModal}
											setEditingNoteId={setEditingNoteId}
											className='self-center justify-self-center justify-center text-white p-4 rounded-lg w-11/12 md:w-6/12 text-center bg-slate-800 backdrop:bg-gray-950 backdrop:opacity-90 backdrop:blur-xs cursor-auto'>
											<div className='flex flex-col items-center justify-between gap-4 w-full h-full'>
												{editingNoteId === note.documentId ? (
													<>
														<section className='flex flex-col w-full gap-2'>
															<label htmlFor='noteTitle' className='flex w-fit gap-1'>
																<span className='text-cyan-200 font-semibold'>Titulo</span>
															</label>
															<input
																type='text'
																value={noteTitle}
																className='break-all whitespace-normal w-full field-sizing-content px-2 py-1 text-start uppercase resize-none rounded-lg border-1 border-[#e5e7eb] focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
																onChange={e => setNoteTitle(e.target.value)}
																name='noteTitle'
																id='noteTitle'
															/>
														</section>
														<section className='flex flex-col w-full gap-2'>
															<label htmlFor='noteDescrip' className='flex w-fit gap-1'>
																<span className='text-cyan-200 font-semibold'>Descripción</span>
															</label>
															<textarea
																name='noteDescrip'
																id='noteDescrip'
																value={noteMessage}
																className='break-words whitespace-normal field-sizing-content w-full px-2 py-1 text-start resize-none border-1 border-[#ccc] focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent rounded-lg min-h-10'
																onChange={e => setNoteMessage(e.target.value)}></textarea>
														</section>
														<div className='flex self-end gap-4'>
															<button
																className='bg-red-700 self-end px-2.5 py-[0.1rem] rounded-lg font-semibold text-sm cursor-pointer'
																onClick={handleCancelEdit}>
																<X
																	size={20}
																	className='text-white p-0.5 group-hover:transform group-hover:animate-pulse'
																/>
															</button>
															<button
																className='bg-green-700 self-end px-2.5 py-[0.1rem] rounded-lg font-semibold text-sm cursor-pointer disabled:bg-gray-500'
																onClick={handleUpdate}
																disabled={isUnchanged}>
																<Check
																	size={20}
																	className='text-white p-0.5 group-hover:transform group-hover:animate-pulse'
																/>
															</button>
														</div>
													</>
												) : (
													<>
														<div className='self-start text-sm'>
															<span>Creado: </span>
															<span>{dateCreated}</span>
														</div>
														<h2 className='uppercase font-bold text-cyan-200 text-xl self-start'>
															{note.title}
														</h2>
														<span className='break-words whitespace-normal my-4 text-start self-start'>
															{note.text_note}
														</span>
														<div className='flex w-full justify-between gap-2 border-t-1 border-[#e5e7eb] py-2'>
															<button
																className='bg-red-700 self-end px-2.5 py-[0.1rem] rounded-lg font-semibold text-sm cursor-pointer transition hover:scale-105 focus:border-blue-700 focus:outline-none'
																onClick={() => handleDeleteNote(note.documentId)}>
																<Trash2
																	size={20}
																	className='text-white p-0.5 group-hover:transform group-hover:animate-pulse'
																/>
															</button>
															<div className='flex gap-2'>
																<ButtonCopy note={note.text_note} setNotaActiva={setNotaActiva}/>
																<button
																	className='bg-blue-400 self-end px-2.5 py-[0.1rem] rounded-lg font-semibold text-sm cursor-pointer transition hover:scale-105'
																	onClick={() => handleEditNote(note)}>
																	<SquarePen
																		size={20}
																		className='text-white p-0.5 group-hover:transform group-hover:animate-pulse'
																	/>
																</button>
															</div>
														</div>
													</>
												)}
											</div>
										</Modal>
									)}
									<div className='self-end text-xs md:text-base'>
										<span>Editado: </span>
										<span>{dateUpdated}</span>
									</div>
								</li>
							)
						})}
					</ul>
				</section>
			)}
		</div>
	)
}

export { NoteArticle }
