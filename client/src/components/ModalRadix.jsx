import * as Dialog from '@radix-ui/react-dialog'
import { Minimize2 } from 'lucide-react'

const ModalRadix = ({ children, trigger, title, description, isOpen, onOpenChange }) => {
	return (
		<Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
			<Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
				<Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-11/12 max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-slate-50 p-4 text-center text-black shadow-lg md:w-6/12">
					<Dialog.DialogTitle className="hidden">{title}</Dialog.DialogTitle>
					<Dialog.DialogDescription className="hidden">{description}</Dialog.DialogDescription>
					{children}
					<Dialog.Close asChild>
						{
							<button
								className="focus:ring-opacity-30 absolute top-4 right-4 rounded-full p-1 hover:bg-slate-300 focus:ring-2 focus:ring-blue-200 focus:outline-none"
								aria-label="Cerrar"
							>
								<Minimize2 width={20} height={20} />
							</button>
						}
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	)
}

export { ModalRadix }

