import { getArticles } from '@/lib/api'
import { BLOG_NAME } from '@/common/config'
import { IArticleList } from '@/types'
import { ClockCircleOutlined } from '@ant-design/icons'
import { Card, Timeline } from 'antd'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import React, { ReactElement } from 'react'

interface Props {
  articleData: IArticleList
}

export default function index({ articleData: res }: Props): ReactElement {
  return (
    <Card bordered={false}>
      <Head>
        <title>{BLOG_NAME}</title>
      </Head>
      <Timeline>
        {res.data.map((v, i) => {
          return (
            <Timeline.Item dot={<ClockCircleOutlined />} color="red" key={i}>
              <Link href="/post/:id" as={`/post/${v.id}`}>
                <a>
                  <span className="mr20">
                    {(v.createdAt as string).slice(0, 10)}
                  </span>
                  <span>{v.title}</span>
                </a>
              </Link>
            </Timeline.Item>
          )
        })}
      </Timeline>
    </Card>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { pageNum = '1' } = ctx.query
  const articleData = await getArticles({
    pageNum: pageNum.toString(),
    pageSize: '1000',
  })
  return {
    props: {
      articleData,
    },
  }
}
