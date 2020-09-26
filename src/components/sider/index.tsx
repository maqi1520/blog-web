import { Card, Divider, Tag } from 'antd'
import Link from 'next/link'
import React, { ReactElement } from 'react'
import { color } from '@/utils'
import { Tag as ITag } from '@/types'
import '@/styles/sider.less'

interface Props {
  tags: ITag[]
}

export default function PageSiler({ tags }: Props): ReactElement {
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
      <div className="tags-wrapper">
        <Card bordered={false}>
          <Divider orientation="left">标签</Divider>
          <div className="tags-content">
            {tags.map((v) => (
              <Link key={v.id} href="/archive" as={`/archive?tag=${v.name}`}>
                <a>
                  <Tag color={color[Math.floor(Math.random() * color.length)]}>
                    {v.name}
                  </Tag>
                </a>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
