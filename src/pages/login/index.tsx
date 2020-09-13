import { Form, Input, Button, Card, message } from 'antd'
import { LockOutlined, MailOutlined } from '@ant-design/icons'
import { login } from '@/common/api'
import React, { ReactElement } from 'react'
import { useRouter } from 'next/router'

export default function LoginPage(): ReactElement {
  const router = useRouter()
  const [form] = Form.useForm()

  const onFinish = async (values: { password: string; email: string }) => {
    try {
      const res = await login<{ token: string }>(values)
      const { token } = res
      if (token) {
        sessionStorage.setItem('token', token)
        router.push('/')
      }
    } catch (err) {
      message.error(err.message)
    }
  }
  return (
    <div className="login">
      <Card bordered={false} className="login-form" style={{ width: 360 }}>
        <h1>Login</h1>
        <Form
          form={form}
          size="large"
          name="horizontal_login"
          layout="horizontal"
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button ghost block type="primary" htmlType="submit">
              Sign in
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
