'use client'

import { Alert } from 'antd'
import { useAuthGuard } from '@/app/hooks/useAuthGuard'

type Props = {
  children: React.ReactNode
  requireAuth?: boolean
  requireSubscription?: boolean
}

export default function Authenticated({
  children,
  requireAuth = true,
  requireSubscription = false,
}: Props) {
  const { isAuthenticated, isSubscribed } = useAuthGuard()

  if (requireAuth && !isAuthenticated) {
    return <Alert message="Please login first" type="error" />
  }

  if (requireSubscription && !isSubscribed) {
    return <Alert message="Subscription required" type="warning" />
  }

  return <>{children}</>
}
