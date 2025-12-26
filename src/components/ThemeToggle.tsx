'use client'

import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [ mounted, setMounted ] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // Avoid hydration mismatch
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="fixed bottom-1 right-1 p-0.5 rounded-full aspect-square bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors flex items-center justify-center opacity-60 hover:opacity-100 cursor-pointer"
      aria-label="Toggle theme"
    >
      {
        isDark ? (
          <MoonIcon className="h-1.5 w-1.5" />
        ) : (
          <SunIcon className="h-1.5 w-1.5" />
        )
      }
    </button>
  )
}

