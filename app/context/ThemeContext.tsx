'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { theme } from 'antd'
import type { ThemeConfig } from 'antd'

type ThemeMode = 'light' | 'dark'

type ThemeContextType = {
  mode: ThemeMode
  toggleTheme: () => void
  antdTheme: ThemeConfig
}

const ThemeContext = createContext<ThemeContextType | null>(null)


export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('light')

  const toggleTheme = () => setMode(prev => (prev === 'light' ? 'dark' : 'light'))

  const antdTheme: ThemeConfig = {
    algorithm: mode === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
  }

  useEffect(() => {
  if (mode === 'dark') {
    document.documentElement.style.setProperty('--background', '#0a0a0a')
    document.documentElement.style.setProperty('--foreground', '#ededed')
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.style.setProperty('--background', '#ffffff')
    document.documentElement.style.setProperty('--foreground', '#171717')
    document.documentElement.classList.remove('dark')
  }
}, [mode])

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, antdTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used inside ThemeProvider')
  return context
}
