'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

interface ThemeProviderProps {
  children: React.ReactNode
  nonce?: string
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

const THEME_STORAGE_KEY = 'theme'

function isValidTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark'
}

export function ThemeProvider({ children, nonce }: ThemeProviderProps) {
  // Server-rendered default is always 'light'; the client effect below will
  // reconcile with the user's saved preference to avoid hydration mismatches.
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY)
      if (isValidTheme(saved)) {
        setTheme(saved)
        document.documentElement.setAttribute('data-theme', saved)
      }
    } catch {
      // localStorage can throw in private-mode / sandboxed iframes; fall
      // back silently to the default theme.
    }
  }, [])

  const toggleTheme = () => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme)
    } catch {
      // Persisting the preference is best-effort; ignore storage failures
    }
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {/* nonce is propagated so any future inline script/style emitted here
          can be allowed by the CSP defined in middleware.ts. Currently unused
          but kept on the API surface for forward compatibility. */}
      {nonce ? <span data-csp-nonce={nonce} hidden /> : null}
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}