import React, { ReactElement } from 'react'
import { Card, Row, Col, Affix } from 'antd'
import { markdownToHtml, markdownToToc } from '@/common/markdown'
import { IArticle } from '@/types'
import { CalendarOutlined, EyeOutlined } from '@ant-design/icons'
import { getArticle } from '@/common/api'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { BLOG_NAME } from '@/common/config'

export default function ArticleDetail({
  data,
}: {
  data: IArticle
}): ReactElement {
  const extra = (
    <div className="content-extra">
      <CalendarOutlined style={{ marginRight: 8 }} />
      {data?.createdAt}
      <EyeOutlined style={{ marginRight: 8, marginLeft: 8 }} />
      {data?.readedCount} 次预览
    </div>
  )

  return (
    <Row gutter={16}>
      <Head>
        <title>
          {data.tag}-{BLOG_NAME}
        </title>
      </Head>
      <Col span={18}>
        <Card title={data?.title} extra={extra}>
          <div
            dangerouslySetInnerHTML={{ __html: markdownToHtml(data.content) }}
          ></div>
        </Card>
      </Col>

      <Col span={6}>
        <Affix offsetTop={20}>
          <div>
            <div>目录</div>
            <div
              dangerouslySetInnerHTML={{ __html: markdownToToc(data.content) }}
            ></div>
          </div>
        </Affix>
      </Col>
    </Row>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query
  const data = await getArticle(id as string)
  return {
    props: {
      data,
    },
  }
}
