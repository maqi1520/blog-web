import React, { ReactElement, useContext } from 'react'
import { Card, Row, Col, Affix, Result, Button, Divider } from 'antd'
import { markdownToHtml, markdownToToc } from '@/common/markdown'
import { Article } from '@/types'
import { CalendarOutlined, EyeOutlined } from '@ant-design/icons'
import { getArticle } from '@/lib/api'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { BLOG_NAME } from '@/common/config'
import Link from 'next/link'
import { Context, IContext } from '@/components/layout/LayoutProvider'
import '@/styles/post.less'

export default function ArticleDetail({
  data,
}: {
  data: Article
}): ReactElement {
  const [state] = useContext(Context) as IContext
  const userId = state.user?.id
  if (!data) {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link href="/">
            <Button type="primary">Back Home</Button>
          </Link>
        }
      />
    )
  }

  const extra = (
    <div className="content-extra">
      <CalendarOutlined style={{ marginRight: 8 }} />
      {data?.createdAt}
      <Divider type="vertical" />
      <EyeOutlined style={{ marginRight: 8, marginLeft: 8 }} />
      {data?.readedCount} 次预览
      {data.userId === userId && (
        <>
          <Divider type="vertical" />
          <Link href="/post/:id/edit" as={`/post/${data.id}/edit`}>
            <Button ghost size="small" type="primary">
              编辑
            </Button>
          </Link>
        </>
      )}
    </div>
  )

  return (
    <Row gutter={16}>
      <Head>
        <title>
          {data.title}-{BLOG_NAME}
        </title>
      </Head>
      <Col sm={{ span: 24 }} md={{ span: 18 }}>
        <Card>
          <div className="post-head">
            <h1>{data?.title}</h1>
            {extra}
          </div>

          <div
            className="markdown-preview"
            dangerouslySetInnerHTML={{ __html: markdownToHtml(data.content) }}
          ></div>
        </Card>
      </Col>

      <Col sm={{ span: 0 }} md={{ span: 6 }}>
        <Affix offsetTop={20}>
          <div className="toc">
            <div className="toc-title">目录</div>
            <div
              className="toc-body"
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
  try {
    const data = await getArticle(id as string)
    return {
      props: {
        data,
      },
    }
  } catch (error) {
    return {
      props: {
        data: null,
      },
    }
  }
}
