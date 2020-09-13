import React, { ReactElement } from 'react'
import { Card, Spin } from 'antd'
import useRequest from '@/common/useRequest'
import Markdown from '@/components/markdown'
import { IArticle } from '@/types'

import { CalendarOutlined, EyeOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'

export default function ArticleDetail(): ReactElement {
  const { query } = useRouter()
  const { id } = query

  const { data, loading } = useRequest<IArticle>({
    url: `/article/${id}`,
  })

  const extra = (
    <div className="content-extra">
      <CalendarOutlined style={{ marginRight: 8 }} />
      {data?.createdAt}
      <EyeOutlined style={{ marginRight: 8, marginLeft: 8 }} />
      {data?.readedCount} 次预览
    </div>
  )

  return (
    <Spin spinning={loading}>
      <Card title={data?.title} extra={extra}>
        <Markdown source={data?.content || ''} />
      </Card>
    </Spin>
  )
}
