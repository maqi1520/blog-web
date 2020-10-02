import { AppProps } from 'next/app'
import Layout from '@/components/layout'
import LayoutProvider from '@/components/layout/LayoutProvider'
import '@/styles/index.less'
import '@/styles/globals.less'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LayoutProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LayoutProvider>
  )
}

export default MyApp
