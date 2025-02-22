import { Copy } from 'lucide-react'
import { toast } from '@pheralb/toast'

const ButtonCopy = ({ note }) => {
	const handleCopyNote = () => {
		navigator.clipboard.writeText(note)
		toast.default({
			text: 'Nota copiada al portapapeles ✨'
		})
	}

	return (
		<button
			className='bg-gray-800 self-end px-2.5 py-[0.1rem] rounded-lg font-semibold text-sm cursor-pointer transition hover:scale-105'
			onClick={handleCopyNote}>
			<Copy
				size={20}
				className='text-white p-0.5 group-hover:transform group-hover:animate-pulse'
			/>
		</button>
	)
}

export { ButtonCopy }
