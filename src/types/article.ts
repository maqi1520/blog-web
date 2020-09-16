import { Ilist } from './base'

interface Icategory {
  id: string
  name: string
}

export interface IArticle {
  tag: string[]
  categories: Icategory[]
  title: string
  readedCount: number
  id: number
  summary: string
  createdAt: string
  content: string
}

export type IArticleList = Ilist<IArticle>
