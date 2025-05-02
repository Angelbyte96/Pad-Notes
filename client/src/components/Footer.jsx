import { Heart } from 'lucide-react'

const Footer = () => {
	return (
		<footer className="mx-auto flex w-full items-center justify-center border-t px-4 py-2 pb-1 font-semibold md:py-4">
			<p className="flex w-full justify-start gap-1">
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

