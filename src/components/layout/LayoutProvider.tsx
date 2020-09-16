import React, {
  ReactElement,
  createContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react'
import { getUserInfo } from '@/common/api'

interface Props {
  children: ReactElement
}

interface Iuser {
  id: string
}

interface Action {
  getUser: () => void
}
export type IContext = [{ user: Iuser | null }, Action]

export const Context = createContext<IContext | null>(null)

export default function LayoutProvider({ children }: Props): ReactElement {
  const [state, setstate] = useState<{ user: Iuser | null }>({
    user: null,
  })
  const getUser = useCallback(() => {
    if (window.sessionStorage.getItem('token')) {
      getUserInfo<Iuser>()
        .then((res) => {
          setstate({ user: res })
        })
        .catch(() => {})
    }
  }, [])
  useEffect(() => {
    getUser()
  }, [])
  const action = useMemo(
    () => ({
      getUser,
    }),
    []
  )
  return <Context.Provider value={[state, action]}>{children}</Context.Provider>
}
