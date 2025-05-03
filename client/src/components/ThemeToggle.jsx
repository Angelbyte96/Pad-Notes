// src/components/ThemeToggle.jsx (componente React)
import { useEffect, useState } from 'react';

function ThemeToggle() {
  // Estado interno opcional para icono/UI, basado en la clase actual
  const [isDark, setIsDark] = useState(() => 
    typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    // Sincronizar estado local con la preferencia almacenada (por si acaso)
    const stored = localStorage.getItem('theme');
    if (stored) setIsDark(stored === 'dark');
  }, []);

  const toggleTheme = () => {
    const htmlEl = document.documentElement;
    const currentlyDark = htmlEl.classList.contains('dark');
    if (currentlyDark) {
      htmlEl.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      htmlEl.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <button className='text-black dark:text-white justify-self-end' onClick={toggleTheme} aria-label="Alternar tema">
      {isDark ? '🌞 Modo Claro' : '🌜 Modo Oscuro'}
    </button>
  );
}

export { ThemeToggle };

