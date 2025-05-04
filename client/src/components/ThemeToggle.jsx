// src/components/ThemeToggle.jsx (componente React)
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

function ThemeToggle() {
    // Estado para controlar si estamos en el cliente
    const [mounted, setMounted] = useState(false)
    // Estado para el tema (inicializa con null para evitar renderizado prematuro)
    const [isDark, setIsDark] = useState(null)

    // Efecto que se ejecuta solo en el cliente después de la hidratación
    useEffect(() => {
        // Detectar el tema actual basado en la clase
        const isDarkMode = document.documentElement.classList.contains('dark')
        setIsDark(isDarkMode)
        setMounted(true)
    }, [])

    const toggleTheme = () => {
        const newIsDark = !isDark
        if (newIsDark) {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        }
        setIsDark(newIsDark)
    }

    // Si no estamos montados o el estado del tema aún no se ha determinado
    if (!mounted) {
        return (
            <button
                className="justify-self-end text-black dark:text-white"
                aria-label="Alternar tema"
            >
                <div className="w-5 h-5"></div>
            </button>
        )
    }

    return (
        <button
            className="justify-self-end text-black dark:text-white hover:cursor-pointer"
            onClick={toggleTheme}
            aria-label="Alternar tema"
        >
            {isDark ? <Sun /> : <Moon />}
        </button>
    )
}

export { ThemeToggle }

