'use client'

import React from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, Steps } from 'antd';
import StepsComponent from '@/app/components/Steps';
import { useTheme } from '@/app/context/ThemeContext';
import { useUser } from '@/app/context/UserContext';

type FieldType = {
  username?: string;
  password?: string;
  address?: string;
  remember?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};


export default function Login () {
  const { mode, toggleTheme } = useTheme();
  const { setUser, setStep } = useUser()

  const handleLoginFinish = (values: { username: string; password: string }) => {
  setUser(values)
  setStep(1)
}

const handleShippingFinish = (values: { address: string }) => {
  setUser({ shippingAddress: values.address })
  setStep(2)
}



  return (
  <div className="m-10">

    <Button onClick={toggleTheme} type="primary" className='mb-10'>
        Toggle Theme
      </Button>

  <div className='flex gap-60 m-10'>

    {/* Login form */}

  <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={handleLoginFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item label={null}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>

  {/* shipping address form */}
    <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={handleShippingFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      label="City"
      name="address"
      rules={[{ required: true, message: 'Please input your city!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Street"
      name="address"
      rules={[{ required: true, message: 'Please input your street!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item label={null}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>

  </div>

  <StepsComponent />

  </div>
)
}
