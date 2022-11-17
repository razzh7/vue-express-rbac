import { commonRoutes } from "@/router"

const map = {
  Layout: () => import('@/layout'),
  user: () => import('@/views/permission/users/index'),
  roles: () => import('@/views/permission/roles/index'),
  mixin: () => import('@/views/components/mixin/index'),
  upload: () => import('@/views/components/upload/index'),
  table: () => import('@/views/table/index')
}

const state = {
  routes: [],
  asyncRoutes: []
}

const mutations = {
  SET_ROUTES(state, asyncRoutes) {
    state.routes = commonRoutes.concat(asyncRoutes)
    state.asyncRoutes = asyncRoutes
  }
}

const actions = {
  generatorRoutes({ commit }, Menu) {
    return new Promise(resolve => {
      const asyncRoutes = formatRouterTree(delIdAndPidAndMapComponent(Menu))
      asyncRoutes.push({ path: '*', redirect: '/404', hidden: true }) // 加入404页面
      commit('SET_ROUTES', asyncRoutes)
      resolve(asyncRoutes)
    })
  }
}

function delIdAndPidAndMapComponent(Menu) {
  for(let i = 0; i < Menu.length; i++) {
    const mapName = Menu[i].component
    const icon = Menu[i].icon
    const title = Menu[i].title
    if (Menu[i].children) {
      Menu[i].children = delIdAndPidAndMapComponent(Menu[i].children)
    }
    if (mapName) {
      Menu[i].component = map[mapName]
    }
    if (icon || title) {
      Menu[i].meta = {
        icon,
        title
      }
    }
  }

  return Menu
}
/**
 * 
 * @param pid
 * pid: 0 父级菜单
 * pid: !0 子级菜单
 */
function formatRouterTree(routes) {
  let parents = routes.filter(p => p.pid == 0) // 找到所有顶级节点
  let children = routes.filter(c => c.pid != 0)
  dataToTree(parents, children)

  function dataToTree(parents, children) {
    parents.map(p => {
      children.map((c,i) => {
        if (p._id === c.pid) {
          let _c = JSON.parse(JSON.stringify(children))
          _c.splice(i,1)

          dataToTree([c],_c)

          if (p.children) {
            p.children.push(c)
          } else {
            p.children = [c]
          }

        }
      })
    })
  }

  return parents
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
