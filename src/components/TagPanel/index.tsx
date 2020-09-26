import { Select } from 'antd'
import React, { ReactElement, useState, useCallback, useEffect } from 'react'
import { getCategorys } from '@/common/api'
import { TagList, Tag } from '@/types'

const { Option } = Select

export default function CategoryPanel(): ReactElement {
  const [tags, setTags] = useState<Tag[]>([])
  useEffect(() => {
    getCategorys<TagList>().then((res) => {
      setTags(res.data)
    })
  }, [])
  const handleChange = useCallback(() => {}, [])

  return (
    <Select
      mode="tags"
      style={{ width: '100%' }}
      placeholder="Tags Mode"
      onChange={handleChange}
    >
      {tags.map((tag) => (
        <Option value={tag.id} key={tag.id}>
          {tag.name}
        </Option>
      ))}
    </Select>
  )
}
