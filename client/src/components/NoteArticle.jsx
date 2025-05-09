import { ModalRadix } from '@/components/ModalRadix'
import { SendNotes } from '@/components/SendNotes'
import { FilterSearch } from '@/components/filterSearch'
import { format } from '@formkit/tempo'
import { Check, Eraser, SquarePen, Trash2, X } from 'lucide-react'
import { useState } from 'react'
import { ButtonCopy } from './ButtonCopy'

const NoteArticle = ({
	notes,
	setNoteTitle,
	noteTitle,
	editingNoteId,
	isLoading,
	error,
	handleUpdate,
	handleDeleteNote,
	handleEditNote,
	handleCancelEdit,
	noteMessage,
	setNoteMessage,
	onNoteAdded,
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const [searchTerm, setSearchTerm] = useState('')

	// Función para resaltar coincidencias en el texto
	function highLightMatch(text, searchTerm) {
		// Si no existe el termino a buscar o este es una cadena vacía, retornamos el texto sin cambios
		if (!searchTerm || searchTerm === '') return text

		// Creamos una expresión regular para buscar el término de búsqueda en el texto
		const escapedSearchTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

		// Usamos la expresión regular para encontrar coincidencias y resaltarlas
		// La bandera 'g' permite buscar todas las coincidencias y 'i' hace la búsqueda sin importar mayúsculas o minúsculas
		const regex = new RegExp(`(${escapedSearchTerm})`, 'gi')

		// Dividir el texto por coincidencias y mapear los resultados
		return text.split(regex).map((part, i) => {
			if (part.toLowerCase() === searchTerm.toLowerCase()) {
				return (
					<mark key={i} className="rounded bg-yellow-200 px-0.5 dark:bg-yellow-700 dark:text-white">
						{part}
					</mark>
				)
			}
			return part
		})
	}

	return (
		<div className="bg-opacity-80 flex w-10/12 flex-col items-center gap-4 rounded-lg border-[1px] border-gray-300 bg-slate-50 p-4 shadow-md shadow-black/30 backdrop-blur-sm dark:bg-[#202020]">
			<h1 className="text-center text-2xl font-semibold text-black md:text-4xl dark:text-white">
				Tus notas
			</h1>
			{/* Componente para enviar notas */}
			<SendNotes onNoteAdded={onNoteAdded} />
			{/* Sección para mostrar el mensaje de error o la carga de notas */}
			{error ? (
				<>
					<p className="text-lg text-red-500">{error.message}</p>
					<img src="/desconectado.png" alt="" />
				</>
			) : isLoading ? (
				<div className="flex w-full flex-col items-center gap-4">
					<p className="text-lg text-white">Cargando notas...</p>
					<div className="h-8 w-8 animate-spin rounded-full border-b-2 border-white"></div>
				</div>
			) : notes?.length === 0 ? (
				/* Si no hay notas, mostramos un mensaje y una imagen */
				<div className="flex w-full flex-col items-center gap-4 border-1 border-amber-500">
					<p className="text-base text-white md:text-lg">No hay notas para mostrar</p>
					<img
						src="/image_sad.webp"
						alt="Imagen no hay notas"
						className="aspect-1980/1939 w-5/12 md:w-2/12"
					/>
				</div>
			) : (
				// Si hay notas, las mostramos en una grid
				<section className="flex h-full w-full flex-col gap-4">
					<FilterSearch searchText={searchTerm} setSearchText={setSearchTerm} />
					{(() => {
						const filteredNotes = notes.filter((note) => {
							if (searchTerm === '') return true
							return (
								note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
								note.text_note.toLowerCase().includes(searchTerm.toLowerCase())
							)
						})

						// Mostrar mensaje o notas filtradas
						if (filteredNotes.length === 0) {
							return (
								<p className="text-center text-xl text-black md:text-2xl dark:text-white">
									No hay notas que coincidan con la búsqueda
								</p>
							)
						}

						return (
							<>
								{searchTerm && (
									<div className="flex justify-end gap-2 md:gap-4">
										<button
											className="cursor-pointer rounded-lg border border-gray-300 bg-transparent px-2 py-1 transition-all duration-200 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500"
											aria-label="Limpiar búsqueda"
											onClick={() => setSearchTerm('')}
										>
											<Eraser className="w-6 text-black dark:text-white" />
										</button>
										<div className="flex gap-2 self-end rounded-lg bg-[#e5e7eb] px-4 py-2 text-black md:text-lg dark:bg-[#2c2c2c] dark:text-white">
											<span>
												{filteredNotes.length}
												{filteredNotes.length === 1 ? ' nota encontrada' : ' notas encontradas'}
											</span>
										</div>
									</div>
								)}
								<ul className="grid w-full grid-cols-[repeat(auto-fit,_minmax(250px,1fr))] items-stretch gap-4 text-black">
									{filteredNotes.map((note) => {
										const isUnchanged = noteTitle === note.title && noteMessage === note.text_note
										const dateCreatedAt = note.createdAt
										const dateCreated = format(dateCreatedAt, 'D MMMM YYYY', 'es')
										const dateUpdatedAt = note.updatedAt
										const dateUpdated = format(dateUpdatedAt, 'DD/MM/YY, h:mm a', 'es')
										return (
											<li key={note.id}>
												<ModalRadix
													client:only
													trigger={
														<div className="group relative flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-[1px] border-[#e5e5e5] bg-white px-4 py-2 shadow-md shadow-black/30 backdrop-blur-sm hover:bg-slate-50 hover:shadow-black/50 dark:bg-[#2c2c2c] dark:shadow-white/30 dark:hover:bg-[#1f1f1f]">
															<h2 className="self-start font-bold text-black uppercase md:text-xl dark:text-white">
																{highLightMatch(note.title, searchTerm)}
															</h2>
															<p className="mb-2.5 w-full self-start overflow-hidden text-sm text-ellipsis whitespace-nowrap text-black md:text-lg dark:text-white">
																{highLightMatch(note.text_note.split('\n')[0], searchTerm)}
																{note.text_note.includes('\n') ? '...' : ''}
															</p>
															<div className="self-end text-xs text-[#808692] md:text-sm">
																<span>Editado: </span>
																<span>{dateUpdated}</span>
															</div>
														</div>
													}
													title={note.title}
													description={note.text_note}
												>
													<div className="flex h-full w-full flex-col items-center justify-between gap-4">
														{editingNoteId === note.documentId ? (
															<>
																<section className="flex w-full flex-col gap-2">
																	<label htmlFor="noteTitle" className="flex w-fit gap-1">
																		<span className="font-semibold text-slate-800 dark:text-white">
																			Titulo
																		</span>
																	</label>
																	<input
																		type="text"
																		value={noteTitle}
																		className="field-sizing-content w-full resize-none rounded-lg border-1 border-[#e5e7eb] px-2 py-1 text-start break-all whitespace-normal text-black uppercase focus:border-transparent focus:ring-2 focus:ring-slate-700 focus:outline-none dark:text-white dark:focus:ring-slate-400"
																		onChange={(e) => setNoteTitle(e.target.value)}
																		name="noteTitle"
																		id="noteTitle"
																	/>
																</section>
																<section className="flex w-full flex-col gap-2">
																	<label htmlFor="noteDescrip" className="flex w-fit gap-1">
																		<span className="font-semibold text-slate-800 dark:text-white">
																			Descripción
																		</span>
																	</label>
																	<textarea
																		name="noteDescrip"
																		id="noteDescrip"
																		value={noteMessage}
																		className="field-sizing-content min-h-10 w-full resize-none rounded-lg border-1 border-[#ccc] px-2 py-1 text-start break-words whitespace-normal text-black focus:border-transparent focus:ring-2 focus:ring-slate-700 focus:outline-none dark:text-white dark:focus:ring-slate-400"
																		onChange={(e) => setNoteMessage(e.target.value)}
																	></textarea>
																</section>
																<div className="flex gap-4 self-end">
																	<button
																		className="cursor-pointer self-end rounded-lg bg-red-700 px-2.5 py-[0.1rem] text-sm font-semibold"
																		onClick={handleCancelEdit}
																	>
																		<X
																			size={20}
																			className="p-0.5 text-white group-hover:transform group-hover:animate-pulse"
																		/>
																	</button>
																	<button
																		className="cursor-pointer self-end rounded-lg bg-green-700 px-2.5 py-[0.1rem] text-sm font-semibold disabled:cursor-not-allowed disabled:bg-gray-500"
																		onClick={handleUpdate}
																		disabled={isUnchanged}
																	>
																		<Check
																			size={20}
																			className="p-0.5 text-white group-hover:transform group-hover:animate-pulse"
																		/>
																	</button>
																</div>
															</>
														) : (
															<>
																<div className="self-start text-sm text-black dark:text-white">
																	<span>Creado: </span>
																	<span>{dateCreated}</span>
																</div>
																<h2 className="self-start text-xl font-bold text-black uppercase dark:text-white">
																	{highLightMatch(note.title, searchTerm)}
																</h2>
																<p className="my-4 self-start text-start break-words whitespace-pre-line text-black dark:text-white">
																	{highLightMatch(note.text_note, searchTerm)}
																</p>
																<div className="flex w-full justify-between gap-2 border-t-1 border-[#e5e7eb] py-2">
																	{/* <button
															className='bg-red-700 self-end px-2.5 py-[0.1rem] rounded-lg font-semibold text-sm cursor-pointer transition hover:scale-105 focus:border-blue-700 focus:outline-none'
															onClick={() => handleDeleteNote(note.documentId)}>
															<Trash2
																size={20}
																className='text-white p-0.5 hover:transform hover:animate-pulse'
															/>
														</button> */}
																	<ModalRadix
																		isOpen={isOpen}
																		onOpenChange={setIsOpen}
																		trigger={
																			<button className="focus:ring-opacity-30 cursor-pointer self-end rounded-lg bg-red-700 px-2.5 py-[0.1rem] text-sm font-semibold transition hover:scale-105 focus:ring-1 focus:ring-white focus:outline-none">
																				<Trash2
																					size={20}
																					className="p-0.5 text-white hover:transform hover:animate-pulse"
																				/>
																			</button>
																		}
																	>
																		<section className="flex flex-col gap-4 text-black dark:text-white">
																			<h3>Estás seguro?</h3>
																			<p>Esta acción no se puede deshacer</p>
																			<div className="focus:ring-opacity-30 flex justify-end gap-2 focus:ring-2 focus:ring-blue-400 focus:outline-none">
																				<button
																					className="focus:ring-opacity-30 cursor-pointer self-end rounded-lg bg-slate-500 px-2.5 py-[0.1rem] text-sm font-semibold text-white transition hover:scale-105 focus:ring-2 focus:ring-blue-200 focus:outline-none"
																					onClick={() => setIsOpen(false)}
																				>
																					Volver
																				</button>
																				<button
																					className="focus:ring-opacity-30 cursor-pointer self-end rounded-lg bg-red-700 px-2.5 py-[0.1rem] text-sm font-semibold text-white transition hover:scale-105 focus:ring-2 focus:ring-blue-200 focus:outline-none"
																					onClick={() => {
																						handleDeleteNote(note.documentId)
																						setIsOpen(false)
																					}}
																				>
																					Eliminar
																				</button>
																			</div>
																		</section>
																	</ModalRadix>
																	<div className="flex gap-2">
																		<ButtonCopy note={note.text_note} />
																		<button
																			className="focus:ring-opacity-30 cursor-pointer self-end rounded-lg bg-blue-400 px-2.5 py-[0.1rem] text-sm font-semibold transition hover:scale-105 focus:ring-1 focus:ring-white focus:outline-none"
																			onClick={() => handleEditNote(note)}
																		>
																			<SquarePen
																				size={20}
																				className="p-0.5 text-white hover:transform hover:animate-pulse"
																			/>
																		</button>
																	</div>
																</div>
															</>
														)}
													</div>
												</ModalRadix>
											</li>
										)
									})}
								</ul>
							</>
						)
					})()}
				</section>
			)}
		</div>
	)
}

export { NoteArticle }

