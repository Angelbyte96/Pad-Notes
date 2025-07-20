import { ThemeToggle } from '@/components/ThemeToggle'
import '@/styles/global.css'

const Nav = () => {
	return (
		<nav className="flex sticky top-0 z-50 w-full items-center justify-between bg-[#ffffff] dark:bg-neutral-900 p-0.5 px-4 shadow-lg">
			<div className="w-6"></div>
			<h1 className="justify-self-center py-1 text-xl font-semibold text-black uppercase md:text-2xl dark:text-white">
				pad notes
			</h1>
			<ThemeToggle />
		</nav>
	)
}

export { Nav }

