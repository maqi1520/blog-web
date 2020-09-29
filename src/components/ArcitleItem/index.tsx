import {
  CalendarOutlined,
  EyeOutlined,
  TagOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { List, message, Tag, Popconfirm } from 'antd'
import React, { useCallback, memo, ReactElement, useContext } from 'react'
import Link from 'next/link'
import { Article } from '@/types'
import { removeArticle } from '@/common/api'
import Router from 'next/router'
import { Context, IContext } from '@/components/layout/LayoutProvider'

export const IconText = ({ icon, text }: { icon: ReactElement; text: any }) => (
  <span>
    {icon}
    <span style={{ marginLeft: 8 }}>{text}</span>
  </span>
)

export interface Props {
  item: Article
}

export const ArcitleItem = memo(({ item }: Props) => {
  const [state] = useContext(Context) as IContext
  const userId = state.user?.id
  const handleRemove = useCallback(() => {
    removeArticle(item.id as string)
      .then(() => {
        message.success('删除成功！')
        Router.replace('/')
      })
      .catch((err) => {
        message.error(err.message)
      })
  }, [item.id])
  return (
    <List.Item
      actions={[
        item.categories ? (
          <IconText
            key="tag"
            icon={<TagOutlined />}
            text={item.categories.map((v, index) => (
              <Tag key={index} color="green">
                {v.name}
              </Tag>
            ))}
          />
        ) : null,
        <IconText
          key="time"
          icon={<CalendarOutlined />}
          text={item.createdAt}
        />,
        <IconText
          key="count"
          icon={<EyeOutlined />}
          text={`${item.readedCount} 次预览`}
        />,
        item.userId === userId ? (
          <Popconfirm
            key="del"
            placement="top"
            title={'确认删除？'}
            onConfirm={handleRemove}
          >
            <DeleteOutlined />
          </Popconfirm>
        ) : undefined,
      ]}
    >
      <Link href="/post/[id]" as={`/post/${item.id}`}>
        <a>
          <List.Item.Meta title={item.title} description={item.summary} />
        </a>
      </Link>
    </List.Item>
  )
})
