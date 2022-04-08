import router from "@/router"
import store from "@/store"
import NProgress from "nprogress"
import 'nprogress/nprogress.css' // progress bar style
import { getTitle } from "./utils/get-page-title"
import { getToken } from "@/utils/auth"

NProgress.configure({ showSpinner: false })
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
            const accessRoutes = await store.dispatch('asyncPermission/generatorRoutes', Menu)
            console.log('hou', accessRoutes)
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