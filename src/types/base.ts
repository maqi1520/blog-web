export interface List<T> {
  code: number
  total: number
  data: T[]
}

export interface User {
  id: number
  name: string
  email: string
}
