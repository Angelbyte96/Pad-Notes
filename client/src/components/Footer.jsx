import { Heart } from 'lucide-react'

const Footer = () => {
	return (
		<footer className='flex items-center justify-center mx-auto w-full pb-1 border-t py-2 md:py-4 px-4 font-semibold'>
			<p className='w-full flex justify-start gap-1'>
				Hecho con{' '}
				<span>
					<Heart size='20' className='text-red-700 animate-pulse select-none' />
				</span>{' '}
				<span className='overflow-hidden m-[-1px] h-[1px] w-[1px] whitespace-nowrap p-0 border-0 absolute'>
					amor
				</span>
				por Angelbyte
			</p>
		</footer>
	)
}

export { Footer }
