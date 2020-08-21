import React, { Component } from 'react'
import { Timeline, Icon, Card, Spin } from 'antd'
import api from '../../../common/api'
import { Link } from 'react-router-dom'

class Archive extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      loading: false,
    }
  }
  componentDidMount() {
    this.getArticleList()
  }
  setLoading = (loading) => {
    this.setState({ loading })
  }
  async getArticleList() {
    this.setLoading(true)
    try {
      const { data, code } = await api.get('/article/list/all')
      code === 1000 && this.setState({ data, loading: false })
    } catch (error) {
      this.setLoading(false)
    }
  }
  render() {
    const itemMap = this.state.data.map((v, i) => {
      return (
        <Timeline.Item dot={<Icon type="clock-circle-o" />} color="red" key={i}>
          <Link to={`/web/detail/${v.id}`}>
            <span className="mr20">{v.createdAt.slice(0, 10)}</span>
            <span>{v.title}</span>
          </Link>
        </Timeline.Item>
      )
    })
    return (
      <Spin type="default" spinning={this.state.loading}>
        <Card bordered={false}>
          <Timeline>{itemMap}</Timeline>
        </Card>
      </Spin>
    )
  }
}

export default Archive
