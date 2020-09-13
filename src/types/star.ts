import { Ilist } from './base'
export interface IStar {
  title: string
  id: number
  url: string
  createdAt: string
}

export type IStarList = Ilist<IStar>
