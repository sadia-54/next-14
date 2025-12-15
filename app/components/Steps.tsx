'use client'

import React from 'react'
import { Steps } from 'antd'
import { LoadingOutlined, SmileOutlined, SolutionOutlined, UserOutlined, PayCircleOutlined } from '@ant-design/icons'
import { useUser } from '@/app/context/UserContext'

const StepsComponent: React.FC = () => {
  const { step } = useUser()

  const items = [
  {
    title: 'Login',
    status: (step > 0 ? 'finish' : 'process') as 'finish' | 'process',
    icon: <UserOutlined />,
  },
  {
    title: 'Shipping Address',
    status: (step > 1 ? 'finish' : step === 1 ? 'process' : 'wait') as
      | 'finish'
      | 'process'
      | 'wait',
    icon: <SolutionOutlined />,
  },
  {
    title: 'Pay',
    status: (step > 2 ? 'finish' : step === 2 ? 'process' : 'wait') as
      | 'finish'
      | 'process'
      | 'wait',
    icon: <PayCircleOutlined />,
  },
  {
    title: 'Done',
    status: (step === 3 ? 'finish' : 'wait') as 'finish' | 'wait',
    icon: <SmileOutlined />,
  },
]


  return <Steps current={step} items={items} />
}

export default StepsComponent
