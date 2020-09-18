import { Ilist } from './base'

interface Icategory {
  id: string
  name: string
}

export interface Article {
  categories?: Icategory[]
  title: string
  readedCount?: number
  id?: number
  summary?: string
  createdAt?: string
  content: string
}

export type IArticleList = Ilist<Article>
