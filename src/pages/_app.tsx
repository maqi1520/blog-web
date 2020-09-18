import { AppProps, AppContext } from 'next/app'
import Layout from '@/components/layout'
import LayoutProvider from '@/components/layout/LayoutProvider'
import '@/styles/index.less'
import '@/styles/globals.less'
import { getUser } from '@/lib/api'
import { User } from '@/types/base'

function getCookie(name: string, cookie: string | undefined) {
  if (!cookie) return
  const value = `; ${cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return (parts.pop() as string).split(';').shift()
}
interface Props extends AppProps {
  user: User
}

function MyApp({ Component, pageProps, user }: Props) {
  return (
    <LayoutProvider user={user}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LayoutProvider>
  )
}

MyApp.getInitialProps = async (appctx: AppContext) => {
  const { ctx } = appctx
  const token = ctx.req && getCookie('token', ctx.req?.headers.cookie)
  let user
  if (token) {
    try {
      user = await getUser(token)
    } catch (error) {
      console.log(error)
    }
  }
  return {
    user,
  }
}

export default MyApp
