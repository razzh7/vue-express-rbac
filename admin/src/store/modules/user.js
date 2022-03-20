import { login } from "@/api/login"
import { userInfo, authMenu } from "@/api/userInfo"
import { Message } from "element-ui"
import { resetRouter } from "@/router"
import Cookies from 'js-cookie'

const state = {
  token: Cookies.get('token') ? Cookies.get('token') : '',
  userInfo: '',
  avatar: '',
  asyncRouter: [],
  role_id: '' // 用户对应的角色id
}

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token
    Cookies.set('token', token, { expires: 7 })
    // localStorage.setItem('token', token)
  },
  SET_AVATAR(state, avatar) {
    state.avatar = avatar
  },
  SET_ROLE_ID(state, id) {
    state.role_id = id
  },
  SET_ASYNC_ROUTER(state, asyncRouter) {
    state.asyncRouter = asyncRouter
  },
  REMOVE_TOKEN(state) {
    state.token = ''
    localStorage.removeItem('token')
  },
  REMOVE_ASYNC_ROUTER(state) {
    state.asyncRouter = []
  },
  REMOVE_ROLE_ID(state) {
    state.role_id = ''
  }
}

const actions = {
  _login({ commit }, formDatas) { // -> dispatch('user/login')
    return new Promise((resolve, reject) => {
      login(formDatas).then(res => {
        if (res.code === 0) {
          const { data } = res;
          console.log('我是登录',data)
          Message.success(data.user.msg)
          commit('SET_TOKEN', data.user.token)
          // commit('SET_ROLE_ID', data.user.roles_id)
          localStorage.setItem('roles_id', data.user.roles_id)
          resolve(res)
        } else {
          Message.error(res.msg)
          reject(res)
        }
      })
        .catch(err => {
          reject(err)
        })
    })
  },
  _userInfo({ commit }) {
    return new Promise((resolve, reject) => {
      const roleId = localStorage.getItem('roles_id')
      console.log('肯定罚请求了啊',roleId)
      authMenu({ id: roleId }).then(res => {
        if (res.code === 200) {
          const menu = handleMenu(res.data)
          console.log(123,menu)
          commit('SET_ASYNC_ROUTER', menu)
          console.log('我的menu',menu)
          resolve(menu)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  _loginOut({ commit }) {
    return new Promise(resolve => {
      commit('REMOVE_TOKEN')
      commit('REMOVE_ASYNC_ROUTER') // 清空动态路由信息
      commit('REMOVE_ROLE_ID')
      resetRouter() // 重置路由
      resolve()
    })
  }
}

function handleMenu(Menu) {
  const menu = Menu.map(menu => {
    const separateMenu = menu.menu_id
    return separateMenu
  })
  return menu
}

export default {
  namespaced: true,  // 开启命名空间 
  state,
  mutations,
  actions
}