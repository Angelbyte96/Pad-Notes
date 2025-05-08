import { Search } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const FilterSearch = ({ searchText, setSearchText }) => {
	const [barIsVisible, setBarIsVisible] = useState(false)
	const inputRef = useRef(null)

	useEffect(() => {
		if (barIsVisible && inputRef.current) {
			inputRef.current.focus()
		}
	}, [barIsVisible])

	function handleClick() {
		setBarIsVisible(!barIsVisible)
	}

	function handleKeyDown(e) {
		if (e.key === 'Escape') {
			setBarIsVisible(false)
		}
	}

	return (
		<article
			className={`flex w-full items-center justify-start overflow-hidden py-1 transition-all duration-300 ease-in-out`}
		>
			<input
				ref={inputRef}
				type="text"
				className={`rounded-md bg-white py-1 pl-1 ${barIsVisible ? 'w-full opacity-100' : 'w-0 opacity-0'} transition-all duration-300 ease-in-out`}
				placeholder="Texto a buscar"
				disabled={!barIsVisible}
				onKeyDown={handleKeyDown}
				onBlur={() => setBarIsVisible(false)}
				onChange={(e) => setSearchText(e.target.value)}
				value={searchText}
			/>
			<button
				onClick={handleClick}
				className={`rounded-md bg-cyan-600 px-1 py-0.5 text-black dark:text-white ${barIsVisible ? 'pointer-events-none absolute opacity-0' : 'cursor-pointer opacity-100'} transition-all duration-300 ease-in-out`}
			>
				<Search className='text-white'/>
			</button>
		</article>
	)
}

export { FilterSearch }

