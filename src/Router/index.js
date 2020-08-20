import loadable from '../utils/loadable'

const adminLayout = loadable(() => import('../page/admin/layout'))
const webLayout = loadable(() => import('../page/web/layout'))

const routes = [
  {
    path: '/admin',
    component: adminLayout,
  },
  {
    path: '/web',
    component: webLayout,
  },
]

export default routes
