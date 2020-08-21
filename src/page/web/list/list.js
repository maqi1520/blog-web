import React, { Component } from 'react'
import { color } from '../../../utils'
import api from '../../../common/api'

import { List, Icon, Tag, Spin } from 'antd'
import './list.less'

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
)

class BlogList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageNo: 1,
      pageSize: 5,
      data: [],
    }
  }
  componentDidMount() {
    this.getList()
  }
  async getList() {
    this.setState({ loading: true })
    try {
      const params = {
        pageNo: this.state.pageNo,
        pageSize: this.state.pageSize,
      }
      const { data, code, total } = await api.get('/article/list', params)
      if (code === 1000) {
        this.setState({ data, total, loading: false })
      }
    } catch (error) {
      this.setState({ loading: false })
    }
  }
  render() {
    const pagination = {
      current: this.state.pageNo,
      pageSize: this.state.pageSize,
      total: this.state.total,
      size: 'small',
      onChange: async (page) => {
        await this.setState({ pageNo: page })
        this.getList()
      },
    }

    return (
      <div className="list-wrapper">
        <Spin type="default" spinning={this.state.loading}>
          <List
            itemLayout="vertical"
            size="large"
            pagination={this.state.data.length ? pagination : null}
            dataSource={this.state.data}
            renderItem={(item, index) => (
              <List.Item
                key={index}
                actions={[
                  <IconText
                    type="tags-o"
                    text={item.tag.map((v) => (
                      <Tag
                        key={item + Math.random()}
                        color={color[Math.floor(Math.random() * color.length)]}
                      >
                        {v}
                      </Tag>
                    ))}
                  />,
                  item.category ? (
                    <IconText
                      type="folder"
                      text={item.category.map((v) => (
                        <Tag key={item + Math.random()} color="green">
                          {v}
                        </Tag>
                      ))}
                    />
                  ) : null,
                  <IconText type="calendar" text={item.createdAt} />,
                  <IconText type="eye" text={`${item.readedCount} 次预览`} />,
                ]}
              >
                <List.Item.Meta
                  // className="list-item"
                  title={item.title}
                  description={item.summary}
                  onClick={() =>
                    this.props.history.push(`/web/detail/${item.id}`)
                  }
                />
              </List.Item>
            )}
          />
        </Spin>
      </div>
    )
  }
}

export default BlogList
