import React, { Component } from 'react'
import './index.less'

import { Divider, Icon, Card } from 'antd'

class About extends Component {
  state = { commentList: [] }

  render() {
    return (
      <Card bordered={false}>
        <div className="content-inner-wrapper about">
          <Divider orientation="left">Blog</Divider>
          <p>
            一直基于 react 写业务，所以博客选用了 react + react-router + antd
            这套技术栈
          </p>
          <p>纯函数式开发，很甜</p>
          <p>前端：react + antd + react-router + es6 + webpack + axios</p>
          <p>服务端：koa2 + mysql + sequelize</p>
          <p className="code">源码戳这里</p>
          <p>
            <a
              target="_blank"
              className="link"
              rel="noreferrer noopener"
              href="https://github.com/maqi1520/blog-web"
            >
              web端
            </a>
          </p>
          <p>
            <a
              target="_blank"
              className="link"
              rel="noreferrer noopener"
              href="https://github.com/maqi1520/blog-server"
            >
              node服务端
            </a>
          </p>
          <Divider orientation="left">Me</Divider>
          <ul className="about-list">
            <li>昵称：狂奔的小马</li>
            <li>
              座右铭：Opportunities are always open to those who prepared for it
            </li>
            <li>
              <Icon type="github" style={{ fontSize: '16px' }} />：
              <a
                target="_blank"
                className="link"
                rel="noreferrer noopener"
                href="https://github.com/maqi520"
              >
                github
              </a>
            </li>
            <li>
              联系方式：
              <Divider type="vertical" />
              <i className="iconfont icon-email" />
              <a href="mailto:164377467@qq.com">164377467@qq.com</a>
            </li>
            <li>坐标：杭州</li>
            <li>学历专业：本科</li>
            <li>
              skill：
              <ul>
                <li>前端：Vue、React、ES6/7/8、Echats、Axios</li>
                <li>服务端：Node、Koa2</li>
                <li>数据库：Mysql</li>
                <li>其他：webpack、git、serverless</li>
              </ul>
            </li>
          </ul>
        </div>
      </Card>
    )
  }
}

export default About