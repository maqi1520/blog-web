import usePage from '@/common/usePage'
import useRequest from '@/common/useRequest'
import { IStarList } from '@/types'
import { List, Spin } from 'antd'
import React, { ReactElement } from 'react'

export default function Page(): ReactElement {
  const pagination = usePage()
  const { data: res, loading } = useRequest<IStarList>({
    url: '/star',
    params: {
      pageNo: pagination.current,
      pageSize: pagination.pageSize,
    },
  })

  const { data, total } = res || { data: [], total: 0 }
  return (
    <Spin size="default" spinning={loading}>
      <List
        className="star-list"
        header={<div className="star-header">文章收藏</div>}
        itemLayout="vertical"
        pagination={{ ...pagination, total }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item.id} extra={item.createdAt}>
            <List.Item.Meta
              description={[
                <a
                  key={item.url}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.title}
                </a>,
              ]}
            />
          </List.Item>
        )}
      />
    </Spin>
  )
}
