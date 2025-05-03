import { ThemeToggle } from '@/components/ThemeToggle'
import '@/styles/global.css'

const Nav = () => {
	return (
		<nav className="flex w-full items-center justify-between bg-[#17142341] p-0.5 shadow-lg">
			<div className="w-28"></div> 
			<h1 className="py-1 text-2xl text-black dark:text-white uppercase md:text-4xl font-semibold justify-self-center">pad notes</h1>
			<ThemeToggle />
		</nav>
	)
}

export { Nav }

