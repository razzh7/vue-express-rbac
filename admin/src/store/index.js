import Vue from "vue"
import Vuex from "vuex"
import getters from "./getters"
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);
const path = require('path');
/**
 * require.context: 检索指定文件夹下的所有文件
 * params1 要检索的目录
 * params2 是否递归目录中的子文件夹
 * params3 检索文件的条件，搜索以什么后缀结尾的文件
 * 返回值： 返回一个函数
 * 函数下的属性方法：
 * keys(params1) 返回一个以检索文件相对该文件夹的相对路径
 * params1: 传入相对路径返回检索文件的导出模块
 * files.keys(files.keys()[index])
 */
const files = require.context('./modules', false, /\.js$/);
let modules = {};
files.keys().forEach(key => {
  let name = path.basename(key, '.js') // 去掉.js只拿路径 例: user.js -> user
  modules[name] = files(key).default || files(key)
})

const dataState = createPersistedState({
  paths: ['asyncPermission.routes', 'asyncPermission.asyncRoutes', 'user.role_id']
})
const store = new Vuex.Store({
  modules,
  getters,
  plugins: [dataState]
})

export default store;