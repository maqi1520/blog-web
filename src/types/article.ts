import { List } from './base'

interface Icategory {
  id: string
  name: string
}

export interface Article {
  categories?: Icategory[]
  title: string
  readedCount?: number
  id?: string
  userId?: number
  tag?: []
  summary?: string
  createdAt?: string
  content: string
}

export type IArticleList = List<Article>
