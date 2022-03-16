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
      console.log(Menu)
      const asyncRoutes = delIdAndPidAndMapComponent(Menu)
      console.log('生成的routes',asyncRoutes)
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
    if (icon) {
      Menu[i].meta = {
        icon,
        title
      }
    }
    // delete Menu[i]['_id']
    // delete Menu[i]['pid']
  }

  return Menu
}

// function componentMap(Menu) {
//   for(let i = 0; i < Menu.length; i++) {
//     const mapName = Menu[i].component
//     if (Menu[i].component) {
//       Menu[i].component = map[mapName]
//     }
//   }
// }
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
