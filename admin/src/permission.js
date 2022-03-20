import router from "@/router"
import store from "@/store"
import NProgress from "nprogress"
import 'nprogress/nprogress.css' // progress bar style
import { getTitle } from "./utils/get-page-title"
import { getToken } from "@/utils/auth"

NProgress.configure({ showSpinner: false })
// 退出后动态路由没挂载
router.beforeEach(async (to, from, next) => {

  document.title = getTitle(to.meta.title)
  NProgress.start()
  
  if (to.path === '/login') {
    NProgress.start()
    next()
  } else {
    const hasToken = getToken()
    if (hasToken) {
      const hasAsyncRouter = store.getters.asyncRouter && store.getters.asyncRouter.length > 0
      if (hasAsyncRouter) {
        next()
      } else {
        try {
            const Menu = await store.dispatch('user/_userInfo') 
            console.log('我是后台返回的菜单',Menu)
            const accessRoutes = await store.dispatch('asyncPermission/generatorRoutes', Menu)
            console.log(1111,accessRoutes)
            for(let i = 0; i < accessRoutes.length; i++) {
              let element = accessRoutes[i]
              router.addRoute(element)
            }
            next({ ...to, replace: true })
        } catch(error) {
          console.log(error)
        }
      }
    } else {
      console.log('不会跳到这了吧')
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})