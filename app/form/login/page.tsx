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
    setUser({
      userInfo: {
        username: values.username,
        password: values.password,
      },
  })
    setStep(1)
  }

  /* Step 2: Shipping */
  const handleShippingFinish = (values: { city: string; street: string }) => {
    setUser({
      shippingAddress: {
        city: values.city,
        street: values.street,
      },
   })
    setStep(2)
  }

  /* Step 3: Payment */
  const handlePaymentFinish = (values: { cardNumber: string }) => {
    setUser({ paymentInfo: { cardNumber: values.cardNumber } })
    setStep(3)
  }

  return (
    <div className="m-10">
      <Button onClick={toggleTheme} type="primary" className="mb-6">
        Toggle Theme
      </Button>

            <StepsComponent />

            <br/>

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
  <div className="mt-10 max-w-lg mx-auto rounded-lg border p-6">
    <h2 className="text-2xl font-bold mb-4 text-center">
      ✅ Order Completed
    </h2>

    <div className="space-y-4">
      <div>
        <h3 className="font-semibold">User Info</h3>
        <p>Username: {user.userInfo?.username}</p>
        <p>Password: {user.userInfo?.password}</p>
      </div>

      <div>
        <h3 className="font-semibold">Shipping Address</h3>
        <p>City: {user.shippingAddress?.city}</p>
        <p>Street: {user.shippingAddress?.street}</p>
      </div>

      <div>
        <h3 className="font-semibold">Payment Info</h3>
        <p>Card Number: {user.paymentInfo?.cardNumber}</p>
      </div>
    </div>
  </div>
)}


         <br />

    </div>
  )
}
