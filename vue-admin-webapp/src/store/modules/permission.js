import { commonRoutes,asyncRoutes } from "@/router"

const state = {
  routes: [],
  asyncRoutes: []
}
const mutations = {
  SET_ROUTES(state, accessRoutes) {
    state.routes = commonRoutes.concat(accessRoutes)
    state.asyncRoutes = accessRoutes
  }
}

const actions = {
  generatorRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessRoutes
      if (roles.includes('admin')) {
        accessRoutes = asyncRoutes || []
      } else {
        accessRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessRoutes)
      resolve(accessRoutes)
    })
  }
}

function filterAsyncRoutes(routes, roles) {
  let res = [];
  routes.forEach(route => {
    const temp = { ...route }
    if (hasPermission(route, roles)) {
      if (temp.children) {
        temp.children = filterAsyncRoutes(temp.children, roles)
      }

      res.push(temp)
    }
  })
    return res
}

function hasPermission(route, roles) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}