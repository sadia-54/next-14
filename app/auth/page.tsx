'use client'

import { Button, Card, Space } from 'antd'
import { useAuth } from '@/app/context/AuthContext'

export default function Home() {
  const { user, login, logout } = useAuth()

  return (
    <Card title="Fake Auth Demo" style={{ width: 300 }}>
      <Space direction="vertical">
        <p>Status: {user ? 'Logged In' : 'Guest'}</p>

        {!user ? (
          <Button type="primary" onClick={login}>
            Fake Login
          </Button>
        ) : (
          <Button danger onClick={logout}>
            Logout
          </Button>
        )}
      </Space>
    </Card>
  )
}
