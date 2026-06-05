import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

const ModalRadix = ({ children, trigger, title, description, isOpen, onOpenChange }) => {
	return (
		<Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
			<Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 z-50 bg-black/40" />
				<Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-11/12 max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[#e8e8e8] bg-white/70 p-5 text-left text-black shadow-2xl shadow-black/20 backdrop-blur-xl md:w-6/12 dark:border-white/[0.07] dark:bg-[#1e1e1e]/75 dark:shadow-black/60">
					<Dialog.DialogTitle className="hidden">{title}</Dialog.DialogTitle>
					<Dialog.DialogDescription className="hidden">{description}</Dialog.DialogDescription>
					{children}
					<Dialog.Close asChild>
						{
							<button
								className="absolute top-4 right-4 rounded-full p-1 text-black hover:cursor-pointer hover:bg-black/5 focus:ring-2 focus:ring-accent-400/30 focus:outline-none dark:text-white dark:hover:bg-white/10"
								aria-label="Cerrar"
							>
								<X width={18} height={18} />
							</button>
						}
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	)
}

export { ModalRadix }

