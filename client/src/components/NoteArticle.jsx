import { Trash2, SquarePen, X, Check } from 'lucide-react'
import { ButtonCopy } from './ButtonCopy'

const NoteArticle = ({
	notes,
	noteTitle,
	editingNoteId,
	isLoading,
	error,
	handleUpdate,
	handleDeleteNote,
	handleEditNote,
	handleCancelEdit,
	noteMessage,
	setNoteMessage
}) => {
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
							return (
								<li
									key={note.id}
									className='flex flex-col bg-cyan-900 p-2 rounded-xl items-center justify-between gap-2 w-full text-lg group h-full'>
									<div className='flex flex-col items-center justify-between gap-2 w-full h-full'>
										{editingNoteId === note.documentId ? (
											<>
												<textarea
													value={noteTitle}
													className='break-all whitespace-normal w-full field-sizing-content text-center uppercase resize-none border-1 border-[#ccc]'
													onChange={e => setNoteTitle(e.target.value)}></textarea>
												<textarea
													value={noteMessage}
													className='break-all whitespace-normal w-full field-sizing-content text-center resize-none border-1 border-[#ccc] grow'
													onChange={e => setNoteMessage(e.target.value)}></textarea>
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
												<p className='uppercase font-bold'>{note.title}</p>
												<span className='break-all whitespace-normal'>
													{note.text_note}
												</span>
												<div className='flex w-full justify-between gap-2'>
													<button
														className='bg-red-700 self-end px-2.5 py-[0.1rem] rounded-lg font-semibold text-sm cursor-pointer transition hover:scale-105'
														onClick={() => handleDeleteNote(note.documentId)}>
														<Trash2
															size={20}
															className='text-white p-0.5 group-hover:transform group-hover:animate-pulse'
														/>
													</button>
													<div className='flex gap-2'>
														<ButtonCopy note={note.text_note} />
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
