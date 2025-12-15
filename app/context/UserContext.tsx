'use client'

import { createContext, useContext, useState } from 'react'

export type UserInfo = {
  username?: string
  password?: string
  shippingAddress?: string
}

type UserContextType = {
  user: UserInfo
  setUser: (data: Partial<UserInfo>) => void
  step: number
  setStep: (step: number) => void
}

const UserContext = createContext<UserContextType | null>(null)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<UserInfo>({})
  const [step, setStep] = useState(0) // 0 = login, 1 = shipping, 2 = pay, 3 = done

  const setUser = (data: Partial<UserInfo>) => {
    setUserState(prev => ({ ...prev, ...data }))
  }

  return (
    <UserContext.Provider value={{ user, setUser, step, setStep }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) throw new Error('useUser must be used inside UserProvider')
  return context
}
