import * as Dialog from '@radix-ui/react-dialog'
import { Minimize2 } from 'lucide-react'

const ModalRadix = ({ children, trigger, title, description }) => {
	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Overlay className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50' />
				<Dialog.Content className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg z-50 max-w-md text-white p-4 rounded-lg w-11/12 md:w-6/12 text-center bg-slate-800'>
					<Dialog.DialogTitle className='hidden'>{title}</Dialog.DialogTitle>
					<Dialog.DialogDescription className='hidden'>
						{description}
					</Dialog.DialogDescription>
					{children}
					<Dialog.Close asChild>
						{
							<button
								className='absolute top-4 right-4 p-1 rounded-full hover:bg-slate-600'
								aria-label='Cerrar'>
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
