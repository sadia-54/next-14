'use client'

import { useAuth } from '@/app/context/AuthContext'

export function useAuthGuard() {
  const { user } = useAuth()

  return {
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    isSubscribed: user?.subscribed,
  }
}
