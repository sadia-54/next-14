'use client'

import React from 'react'
import { Button, Form, Input } from 'antd'
import StepsComponent from '@/app/components/Steps'
import { useTheme } from '@/app/context/ThemeContext'
import { useUser } from '@/app/context/UserContext'

type FieldType = {
  username?: string
  password?: string
  city?: string
  street?: string
  cardNumber?: string
}

export default function Login() {
  const { toggleTheme } = useTheme()
  const { setUser, setStep, step, user } = useUser()

  /* Step 1: Login */
  const handleLoginFinish = (values: { username: string; password: string }) => {
    setUser(values)
    setStep(1)
  }

  /* Step 2: Shipping */
  const handleShippingFinish = (values: { city: string; street: string }) => {
    setUser({ City: values.city, Street: values.street })
    setStep(2)
  }

  /* Step 3: Payment */
  const handlePaymentFinish = (values: { cardNumber: string }) => {
    setUser({ payment: values.cardNumber })
    setStep(3)
  }

  return (
    <div className="m-10">
      <Button onClick={toggleTheme} type="primary" className="mb-6">
        Toggle Theme
      </Button>

      {/* STEP 0: LOGIN */}
      {step === 0 && (
        <Form style={{ maxWidth: 400 }} onFinish={handleLoginFinish}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form>
      )}

      {/* STEP 1: SHIPPING */}
      {step === 1 && (
        <Form style={{ maxWidth: 400 }} onFinish={handleShippingFinish}>
          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Street"
            name="street"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Continue
          </Button>
        </Form>
      )}

      {/* STEP 2: PAYMENT */}
      {step === 2 && (
        <Form style={{ maxWidth: 400 }} onFinish={handlePaymentFinish}>
          <Form.Item
            label="Card Number"
            name="cardNumber"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Pay
          </Button>
        </Form>
      )}

      {/* STEP 3: DONE */}
      {step === 3 && (
        <div className="text-center mt-10">
          <h2 className="text-2xl font-bold">✅ Order Completed!</h2>
          <p className="mt-2">Thank you for your purchase.</p>
        </div>
      )}

         <br />

      <StepsComponent />


      <pre className="mt-10 bg-gray-100 p-4 rounded">
        {JSON.stringify(user, null, 2)}
      </pre>
    </div>
  )
}
