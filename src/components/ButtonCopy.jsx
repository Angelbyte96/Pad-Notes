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
			className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#f0f0f0] px-3 py-1.5 text-xs font-semibold text-[#555] transition-all duration-200 hover:bg-[#e5e5e5] dark:bg-white/[0.08] dark:text-[#aaa] dark:hover:bg-white/[0.12]"
			onClick={handleCopyNote}
		>
			<Copy size={13} className="text-current" />
			Copiar
		</button>
	)
}

export { ButtonCopy }

