import {
  EditOutlined,
  HomeOutlined,
  PlusOutlined,
  SmileTwoTone,
  StarOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import { Button, Col, Layout, Menu, Row } from 'antd'
import Link from 'next/link'
import React, { ReactElement, useContext } from 'react'
import '@/styles/header.less'
import { useRouter } from 'next/router'
import { Context, IContext } from '@/components/layout/LayoutProvider'

const routes = [
  {
    icon: <HomeOutlined />,
    title: '首页',
    path: '/',
  },
  {
    icon: <EditOutlined />,
    title: '归档',
    path: '/archive',
  },
  {
    icon: <StarOutlined />,
    title: '收藏',
    path: '/star',
  },
  {
    icon: <TeamOutlined />,
    title: '关于',
    path: '/about',
  },
]
const { Header } = Layout

interface Props {}

export default function PageHeader({}: Props): ReactElement {
  const [state] = useContext(Context) as IContext
  const router = useRouter()

  return (
    <Header className="header-container">
      <div className="header-content">
        <Row gutter={24}>
          <Col lg={{ span: 6 }} md={{ span: 6 }} xs={{ span: 0 }}>
            <h1 className="logo">
              <SmileTwoTone type="smile" twoToneColor="#eb2f96" />
              <span className="ml10">狂奔小马的博客</span>
            </h1>
          </Col>
          <Col lg={{ span: 15 }} md={{ span: 15 }} xs={{ span: 24 }}>
            <Menu
              theme="light"
              mode="horizontal"
              selectedKeys={[router.pathname]}
            >
              {routes.map((item) => {
                return (
                  <Menu.Item key={item.path}>
                    <Link href={item.path}>
                      <a>
                        {item.icon}
                        <span className="nav-text">{item.title}</span>
                      </a>
                    </Link>
                  </Menu.Item>
                )
              })}
            </Menu>
          </Col>
          <Col lg={{ span: 3 }} md={{ span: 3 }} xs={{ span: 0 }}>
            {state.user ? (
              <Link href="/create">
                <Button shape="circle" icon={<PlusOutlined />} type="primary" />
              </Link>
            ) : (
              <Link href="/login">
                <Button size="small" type="primary">
                  登录
                </Button>
              </Link>
            )}
          </Col>
        </Row>
      </div>
    </Header>
  )
}
