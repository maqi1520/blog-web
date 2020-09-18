import { getUserInfo } from '@/common/api'
import { User } from '@/types/base'
import React, { createContext, ReactElement, useMemo, useState } from 'react'

interface Props {
  user: User
  children: ReactElement
}

interface Action {
  getUser: () => void
}
export type IContext = [{ user: User | null }, Action]

export const Context = createContext<IContext | null>(null)

export default function LayoutProvider({
  children,
  user,
}: Props): ReactElement {
  const [state, setstate] = useState<{ user: User | null }>({
    user,
  })

  const action = useMemo(
    () => ({
      getUser: () => {
        if (window.sessionStorage.getItem('token')) {
          getUserInfo<User>()
            .then((res) => {
              setstate({ user: res })
            })
            .catch(() => {})
        }
      },
    }),
    []
  )
  return <Context.Provider value={[state, action]}>{children}</Context.Provider>
}
