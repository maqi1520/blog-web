import React, { Component } from 'react'
import { Layout, Row, Col, BackTop } from 'antd'
import { Route } from 'react-router-dom'
import HeaderCustom from '../header'
import SiderCustom from '../sider'
import routes from '../../../Router/web'
import './index.less'

const { Footer } = Layout

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    document.title = '狂奔小马的博客'
  }
  render() {
    const contentHeight = document.body.clientHeight - 64 - 62
    return (
      <div>
        <Layout className="wrapper">
          <HeaderCustom {...this.props}></HeaderCustom>

          <Layout className="wrapper-container">
            <Layout className="wrapper-content">
              <Row
                gutter={24}
                style={{
                  paddingTop: 24,
                  margin: 0,
                  minHeight: contentHeight,
                  height: '100%',
                  overflow: 'initial',
                }}
              >
                <Col
                  lg={{ span: 5, offset: 1 }}
                  md={{ span: 5, offset: 1 }}
                  xs={{ span: 0 }}
                >
                  <SiderCustom {...this.props} />
                </Col>
                <Col
                  lg={{ span: 16 }}
                  md={{ span: 16 }}
                  xs={{ span: 24 }}
                  className="about-wrapper"
                >
                  {routes.map(({ path, key, component, ...props }, index) => (
                    <Route
                      key={index}
                      exact
                      path={path}
                      component={component}
                      {...props}
                    />
                  ))}
                </Col>
              </Row>
            </Layout>
            <Footer style={{ textAlign: 'center' }}>
              Copyright © blog.maqib.cn 2020 浙ICP备17007919号-1
            </Footer>
          </Layout>
        </Layout>
        <BackTop visibilityHeight="100" />
      </div>
    )
  }
}

export default Index
