import React, {
  ReactElement,
  createContext,
  useState,
  useMemo,
  useCallback,
} from 'react'
import { getUserInfo } from '@/common/api'
import { IUser } from '@/types/base'

interface Props {
  user: IUser
  children: ReactElement
}

interface Action {
  getUser: () => void
}
export type IContext = [{ user: IUser | null }, Action]

export const Context = createContext<IContext | null>(null)

export default function LayoutProvider({
  children,
  user,
}: Props): ReactElement {
  const [state, setstate] = useState<{ user: IUser | null }>({
    user,
  })
  const getUser = useCallback(() => {
    if (window.sessionStorage.getItem('token')) {
      getUserInfo<IUser>()
        .then((res) => {
          setstate({ user: res })
        })
        .catch(() => {})
    }
  }, [])
  const action = useMemo(
    () => ({
      getUser,
    }),
    []
  )
  return <Context.Provider value={[state, action]}>{children}</Context.Provider>
}
