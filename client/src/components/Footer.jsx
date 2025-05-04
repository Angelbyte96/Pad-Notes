import { Heart } from 'lucide-react'

const Footer = () => {
	return (
		<footer className="fixed bottom-0 mx-auto text-black dark:text-white bg-white dark:bg-neutral-900 flex w-full items-center justify-center border-t px-4 py-2 font-semibold md:py-2">
			<p className="flex text-sm w-full justify-start gap-1">
				Hecho con{' '}
				<span>
					<Heart size="20" className="animate-pulse text-red-700 select-none" />
				</span>{' '}
				<span className="absolute m-[-1px] h-[1px] w-[1px] overflow-hidden border-0 p-0 whitespace-nowrap">
					amor
				</span>
				por Angelbyte
			</p>
		</footer>
	)
}

export { Footer }

