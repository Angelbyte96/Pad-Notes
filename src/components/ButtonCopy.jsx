import { toast } from '@pheralb/toast'
import { Copy } from 'lucide-react'

const ButtonCopy = ({ note }) => {
	const handleCopyNote = (e) => {
		e.stopPropagation()

		navigator.clipboard.writeText(note)
		toast.default({
			text: 'Nota copiada al portapapeles ✨',
		})
	}

	return (
		<button
			className="focus:ring-opacity-30 cursor-pointer self-end rounded-lg bg-gray-700 px-2.5 py-[0.1rem] text-sm font-semibold transition hover:scale-105 focus:ring-1 focus:ring-white focus:outline-none"
			onClick={handleCopyNote}
		>
			<Copy size={20} className="p-0.5 text-white hover:transform hover:animate-pulse" />
		</button>
	)
}

export { ButtonCopy }

