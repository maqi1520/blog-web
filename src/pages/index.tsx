import { getArticles } from '@/common/api'
import { IArticleList } from '@/types'
import { color } from '@/utils'
import {
  CalendarOutlined,
  EyeOutlined,
  FolderOutlined,
  TagOutlined,
} from '@ant-design/icons'
import { List, Tag, Col, Row } from 'antd'
import _ from 'lodash'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import Sider from '@/components/sider'
import { IArticle, ITag } from '@/types'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import { BLOG_NAME } from '@/common/config'

const IconText = ({ icon, text }: { icon: ReactElement; text: any }) => (
  <span>
    {icon}
    <span style={{ marginLeft: 8 }}>{text}</span>
  </span>
)

interface Props {
  articleData: IArticleList
  articles: IArticle[]
  tags: ITag[]
}

export default function ListPage({
  articles,
  tags,
  articleData: res,
}: Props): ReactElement {
  const router = useRouter()
  const { pageNum = '1' } = router.query

  const itemRender = (
    current: number,
    type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next',
    originalElement: React.ReactElement
  ) => {
    return (
      <Link as={`/page/${current}`} href={`/?pageNum=${current}`}>
        {originalElement}
      </Link>
    )
  }
  return (
    <Row gutter={24}>
      <Head>
        <title>{BLOG_NAME}</title>
      </Head>
      <Col lg={{ span: 6 }} md={{ span: 6 }} xs={{ span: 0 }}>
        <Sider tags={tags} articles={articles} />
      </Col>
      <Col lg={{ span: 18 }} md={{ span: 18 }} xs={{ span: 24 }}>
        <div className="list-wrapper">
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              current: +pageNum,
              pageSize: 10,
              itemRender,
              total: res?.total,
            }}
            dataSource={res?.data}
            renderItem={(item, index) => (
              <List.Item
                onClick={(e) => router.push(`/detail/${item.id}`)}
                key={index}
                actions={[
                  <IconText
                    icon={<TagOutlined />}
                    text={_.map(item.tag, (v) => (
                      <Tag
                        key={item.id}
                        color={color[Math.floor(Math.random() * color.length)]}
                      >
                        {v}
                      </Tag>
                    ))}
                  />,
                  item.category ? (
                    <IconText
                      icon={<FolderOutlined />}
                      text={item.category.map((v, index) => (
                        <Tag key={index} color="green">
                          {v}
                        </Tag>
                      ))}
                    />
                  ) : null,
                  <IconText
                    icon={<CalendarOutlined />}
                    text={item.createdAt}
                  />,
                  <IconText
                    icon={<EyeOutlined />}
                    text={`${item.readedCount} 次预览`}
                  />,
                ]}
              >
                <List.Item.Meta title={item.title} description={item.summary} />
              </List.Item>
            )}
          />
        </div>
      </Col>
    </Row>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { pageNum = '1' } = ctx.query
  const articleData = await getArticles({
    pageNum: pageNum.toString(),
    pageSize: '10',
  })
  return {
    props: {
      articleData,
      articles: [],
      tags: [],
    },
  }
}
