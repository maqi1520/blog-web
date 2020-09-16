export interface Ilist<T> {
  code: number
  total: number
  data: T[]
}

export interface IUser {
  id: number
  name: string
  email: string
}
