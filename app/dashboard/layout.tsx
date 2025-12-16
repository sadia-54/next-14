'use client'

import Authenticated from "../components/Authenticated"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Authenticated requireAuth>
      {children}
    </Authenticated>
  )
}
