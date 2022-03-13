import { login } from "@/api/login"
import { userInfo } from "@/api/userInfo"
import { Message } from "element-ui"
import { resetRouter } from "@/router"
import Cookies from 'js-cookie'

const state = {
  token: Cookies.get('token') ? Cookies.get('token') : '',
  userInfo: '',
  avatar: '',
  asyncRouter: []
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
  SET_ASYNC_ROUTER(state, asyncRouter) {
    state.asyncRouter = asyncRouter
  },
  REMOVE_TOKEN(state) {
    state.token = ''
    localStorage.removeItem('token')
  },
  REMOVE_ASYNC_ROUTER(state) {
    state.asyncRouter = []
  }
}

const actions = {
  _login({ commit }, formDatas) { // -> dispatch('user/login')
    return new Promise((resolve, reject) => {
      login(formDatas).then(res => {
        if (res.code === 0) {
          const { data } = res;
          Message.success(data.user.msg)
          commit('SET_TOKEN', data.user.token)
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
      userInfo().then(res => {
        if (res.code === 0) {
          const { data } = res
          commit('SET_ASYNC_ROUTER', data)
          resolve(data)
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
      resetRouter() // 重置路由
      resolve()
    })
  }
}

export default {
  namespaced: true,  // 开启命名空间 
  state,
  mutations,
  actions
}