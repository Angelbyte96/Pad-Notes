import { ModalRadix } from '@/components/ModalRadix'
import { SendNotes } from '@/components/SendNotes'
import { FilterSearch } from '@/components/filterSearch'
import { Toaster } from '@pheralb/toast'
import { format } from '@formkit/tempo'
import { CalendarDays, Check, Clock, Eraser, SquarePen, Trash2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
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

	const [mounted, setMounted] = useState(false)
	useEffect(() => { setMounted(true) }, [])

	return (
		<>
		{mounted && createPortal(<Toaster theme="dark" />, document.body)}
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
							note.textNote.toLowerCase().includes(searchTerm.toLowerCase())
						)
					})						// Mostrar mensaje o notas filtradas
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
											className="flex cursor-pointer items-center rounded-lg border border-[#e8e8e8] bg-white px-2 py-1.5 transition-all duration-200 hover:border-amber-200/60 hover:bg-amber-50 dark:border-white/[0.07] dark:bg-[#262626] dark:hover:border-amber-500/20 dark:hover:bg-[#2d2d2d]"
											aria-label="Limpiar búsqueda"
											onClick={() => setSearchTerm('')}
										>
											<Eraser size={16} className="text-[#555] dark:text-[#aaa]" />
										</button>
										<div className="inline-flex items-center gap-1.5 rounded-lg border border-[#e8e8e8] bg-white px-3 py-1.5 text-xs font-medium text-[#666] dark:border-white/[0.07] dark:bg-[#262626] dark:text-[#999]">
											<span>
												{filteredNotes.length}
												{filteredNotes.length === 1 ? ' nota encontrada' : ' notas encontradas'}
											</span>
										</div>
									</div>
								)}
								<ul className="grid w-full grid-cols-[repeat(auto-fit,_minmax(250px,1fr))] items-stretch gap-4 text-black">
										{filteredNotes.map((note) => {
											const isUnchanged = noteTitle === note.title && noteMessage === note.textNote
										const dateCreatedAt = note.createdAt
										const dateCreated = format(dateCreatedAt, 'D MMMM YYYY', 'es')
										const dateUpdatedAt = note.updatedAt
										const dateUpdated = format(dateUpdatedAt, 'DD/MM/YY, h:mm a', 'es')
										return (
											<li key={note.id}>
												<ModalRadix
													client:only
													trigger={
														<div className="group relative flex h-full w-full cursor-pointer flex-col justify-between gap-3 overflow-hidden rounded-xl border border-[#e8e8e8] bg-white px-5 py-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-200/60 hover:shadow-lg dark:border-white/[0.07] dark:bg-[#262626] dark:hover:border-amber-500/20 dark:hover:bg-[#2d2d2d] dark:hover:shadow-black/50">
															<div className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-amber-400 to-orange-400 transition-transform duration-500 group-hover:scale-x-100" />
															<div className="mt-1 flex flex-col gap-1.5">
																<h2 className="self-start text-sm font-bold tracking-widest text-black uppercase dark:text-white">
																	{highLightMatch(note.title, searchTerm)}
																</h2>
																<p className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-[13px] leading-relaxed text-[#777] dark:text-[#999]">
																	{highLightMatch(note.textNote.split('\n')[0], searchTerm)}
																	{note.textNote.includes('\n') ? '...' : ''}
																</p>
															</div>
															<div className="flex items-center gap-1 self-end">
																<Clock size={10} className="text-[#c0c0c0] dark:text-[#555]" />
																<span className="text-[10px] font-medium tracking-wide text-[#bbb] uppercase dark:text-[#555]">
																	{dateUpdated}
																</span>
															</div>
														</div>
													}
													title={note.title}
													description={note.textNote}
												>
												<div className="flex h-full w-full flex-col items-center justify-between gap-4">
													{editingNoteId === note.id ? (
															<>
																<section className="flex w-full flex-col gap-1.5">
																	<label htmlFor="noteTitle" className="text-[11px] font-semibold tracking-widest text-[#888] uppercase dark:text-[#666]">
																		Título
																	</label>
																	<input
																		type="text"
																		value={noteTitle}
																		className="w-full rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-sm font-bold tracking-widest text-black uppercase outline-none transition-all focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 dark:border-white/[0.1] dark:bg-[#1e1e1e] dark:text-white dark:focus:border-amber-500 dark:focus:ring-amber-500/20"
																		onChange={(e) => setNoteTitle(e.target.value)}
																		name="noteTitle"
																		id="noteTitle"
																	/>
																</section>
																<section className="flex w-full flex-col gap-1.5">
																	<label htmlFor="noteDescrip" className="text-[11px] font-semibold tracking-widest text-[#888] uppercase dark:text-[#666]">
																		Descripción
																	</label>
																	<textarea
																		name="noteDescrip"
																		id="noteDescrip"
																		value={noteMessage}
																		className="min-h-[80px] w-full resize-none rounded-lg border border-[#e5e7eb] bg-white px-3 py-2 text-[13px] leading-relaxed text-[#333] outline-none transition-all focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 dark:border-white/[0.1] dark:bg-[#1e1e1e] dark:text-[#ddd] dark:focus:border-amber-500 dark:focus:ring-amber-500/20"
																		onChange={(e) => setNoteMessage(e.target.value)}
																	></textarea>
																</section>
																<div className="flex w-full items-center justify-end gap-2 border-t border-[#f0f0f0] pt-3 dark:border-white/[0.07]">
																	<button
																		className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition-all duration-200 hover:bg-red-100 dark:bg-red-500/[0.12] dark:text-red-400 dark:hover:bg-red-500/20"
																		onClick={handleCancelEdit}
																	>
																		<X size={13} />
																		Cancelar
																	</button>
																	<button
																		className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 transition-all duration-200 hover:bg-green-100 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-green-500/[0.12] dark:text-green-400 dark:hover:bg-green-500/20"
																		onClick={handleUpdate}
																		disabled={isUnchanged}
																	>
																		<Check size={13} />
																		Guardar
																	</button>
																</div>
															</>
														) : (
															<>
																<span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
																	<CalendarDays size={11} />
																	{dateCreated}
																</span>
																<h2 className="self-start text-xl font-bold tracking-wider text-black uppercase dark:text-white">
																	{highLightMatch(note.title, searchTerm)}
																</h2>
																<p className="my-2 self-start text-start text-[13px] leading-loose break-words whitespace-pre-line text-[#555] dark:text-[#c0c0c0]">
																	{highLightMatch(note.textNote, searchTerm)}
																</p>
																<div className="flex w-full items-center justify-between gap-2 border-t border-[#f0f0f0] pt-3 dark:border-white/[0.07]">
																	<ModalRadix
																		isOpen={isOpen}
																		onOpenChange={setIsOpen}
																		trigger={
																			<button className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition-all duration-200 hover:bg-red-100 dark:bg-red-500/[0.12] dark:text-red-400 dark:hover:bg-red-500/20">
																				<Trash2 size={13} />
																				Eliminar
																			</button>
																		}
																	>
																		<section className="flex flex-col gap-4 text-black dark:text-white">
																			<h3>Estás seguro?</h3>
																			<p>Esta acción no se puede deshacer</p>
																			<div className="flex justify-end gap-2">
																				<button
																					className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#f0f0f0] px-3 py-1.5 text-xs font-semibold text-[#555] transition-all duration-200 hover:bg-[#e5e5e5] dark:bg-white/8 dark:text-[#aaa] dark:hover:bg-white/12"
																					onClick={() => setIsOpen(false)}
																				>
																					Volver
																				</button>
																			<button
																				className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition-all duration-200 hover:bg-red-100 dark:bg-red-500/[0.12] dark:text-red-400 dark:hover:bg-red-500/20"
																				onClick={() => {
																					handleDeleteNote(note.id)
																					setIsOpen(false)
																				}}
																			>
																					Eliminar
																				</button>
																			</div>
																		</section>
																	</ModalRadix>
																	<div className="flex gap-2">
																		<ButtonCopy note={note.textNote} />
																		<button
																			className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600 transition-all duration-200 hover:bg-blue-100 dark:bg-blue-500/[0.12] dark:text-blue-400 dark:hover:bg-blue-500/20"
																			onClick={() => handleEditNote(note)}
																		>
																			<SquarePen size={13} />
																			Editar
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
		</>
	)
}

export { NoteArticle }

