import { Copy } from 'lucide-react'
import { useCallback } from 'react'
import { toast } from "@pheralb/toast";

const ButtonCopy = () => {
	const handleCopyNote = useCallback(note => {
		navigator.clipboard.writeText(note)
		toast.default({
			text: 'Nota copiada al portapapeles ✨'
		})
	})
	return (
		<button
			className='bg-gray-800 self-end px-2.5 py-[0.1rem] rounded-lg font-semibold text-sm cursor-pointer transition hover:scale-105'
			onClick={() => handleCopyNote(note.text_note)}>
			<Copy
				size={20}
				className='text-white p-0.5 group-hover:transform group-hover:animate-pulse'
			/>
		</button>
	)
}

export { ButtonCopy }
