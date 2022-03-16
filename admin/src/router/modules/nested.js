import Layout from '@/layout'

export default {
  path: '/nested',
  component: Layout,
  redirect: '/nested/menu1/menu1-1',
  meta: { title: '多级菜单', icon: 'el-icon-s-claim' },
  children: [
    {
      path: 'menu1',
      name: 'Menu1',
      redirect: '/nested/menu1/menu1-2',
      component: () => import('@/views/nested/menu1'),
      meta: { title: 'Menu1' },
      // meta: { title: 'Menu1', icon: 'el-icon-s-marketing' },
      children: [
        {
          path: 'menu1-1',
          name: 'Menu1-1',
          redirect: '/nested/menu1/menu1-1/menu1-1-1',
          component: () => import('@/views/nested/menu1/menu1-1'),
          meta: { title: 'Menu1-1' },
          // meta: { title: 'Menu1-1', icon: 'el-icon-s-flag' },
          children: [
            {
              path: 'menu1-1-1',
              name: 'Menu1-1-1',
              component: () => import('@/views/nested/menu1/menu1-1/menu1-1-1'),
              meta: { title: 'Menu1-1-1' }
              // meta: { title: 'Menu1-1-1', icon:'el-icon-s-claim' }
            },
            {
              path: 'menu1-1-2',
              name: 'Menu1-1-2',
              component: () => import('@/views/nested/menu1/menu1-1/menu1-1-2'),
              meta: { title: 'Menu1-1-2' }
              // meta: { title: 'Menu1-1-2', icon:'el-icon-s-claim' }
            }
          ]         
        },
        {
          path: 'menu1-2',
          name: 'Menu1-2',
          component: () => import('@/views/nested/menu1/menu1-2'),
          meta: { title: 'Menu1-2' }           
          // meta: { title: 'Menu1-2', icon: 'el-icon-s-order' }           
        }
      ]
    },
    {
      path: 'menu2',
      name: 'Menu2',
      component: () => import('@/views/nested/menu2'),
      meta: { title: 'Menu2' }
      // meta: { title: 'Menu2', icon: 'el-icon-s-ticket' }
    }]
}