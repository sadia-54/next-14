'use client'

import { createContext, useContext, useState } from 'react'

type User = {
    role: 'guest' | 'user' | 'admin'
    subscribed: boolean
}

type AuthContextTyppe = {
    user: User | null
    login: () => void
    logout: () => void
}

const AuthContext = createContext<AuthContextTyppe | null>(null)

export function AuthProvider ({children}: {children: React.ReactNode}) {

    const [user, setUser] = useState<User | null>(null)

    const login = () => {
        setUser({
            role: 'user',
            subscribed: true
        })
    }

    const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout}}>
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
    const context = useContext(AuthContext)

    if(!context) throw new Error('useAuth must be used inside AuthProvider')
    return context
}
