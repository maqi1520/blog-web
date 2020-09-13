import { Ilist } from './base'

export interface IArticle {
  tag: string[]
  category: string[]
  title: string
  readedCount: number
  id: number
  summary: string
  createdAt: string
  content: string
}

export type IArticleList = Ilist<IArticle>
