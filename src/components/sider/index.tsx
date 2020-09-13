import { Card, Divider, Tag } from 'antd'
import Link from 'next/link'
import React, { ReactElement } from 'react'
import { color } from '@/utils'
import { IArticle, ITag } from '@/types'
import '@/styles/sider.less'

interface Props {
  articles: IArticle[]
  tags: ITag[]
}

export default function PageSiler({ tags, articles }: Props): ReactElement {
  return (
    <div className="sider-container">
      <div className="admin-info">
        <header>
          <img src="/me.png" alt="avatar" title="狂奔的小马" />
        </header>
        <p className="admin-name">狂奔的小马</p>
        <p className="admin-desc">
          Opportunities are always open to those who prepared for it.
        </p>
      </div>
      <div className="recent-article">
        <Card bordered={false}>
          <Divider orientation="left">最近文章</Divider>
          <ul className="recent-list">
            {articles.map((v) => (
              <li key={v.id}>
                <Link href="detail/:id" as={`detail/${v.id}`}>
                  {v.title}
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </div>
      <div className="tags-wrapper">
        <Card bordered={false}>
          <Divider orientation="left">标签</Divider>
          <div className="tags-content">
            {tags.map((v) => (
              <Tag
                key={v.id}
                color={color[Math.floor(Math.random() * color.length)]}
              >
                {v.name}
              </Tag>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
