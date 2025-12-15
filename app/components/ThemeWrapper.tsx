'use client'

import { ConfigProvider } from 'antd'
import { useTheme } from '@/app/context/ThemeContext'

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { antdTheme, mode } = useTheme()

  return (
    <ConfigProvider theme={antdTheme} key={mode}>
      {children}
    </ConfigProvider>
  )
}
