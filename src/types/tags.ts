import { Ilist } from './base'

export interface ITag {
  name: string
  id: number
  createdAt: string
}
export type ItagList = Ilist<ITag>
