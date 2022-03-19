import $axios from "./request";

// export function userInfo(data) {
//   const url = '/userInfo'
//   return $axios.get(url, data)
// }

// 获取菜单栏
export function userInfo(data) {
  const url = '/roles/auth'
  return $axios.get(url, data)
}

// 获取用户列表
export function userList() {
  const url = '/user/userList'
  return $axios.get(url)
}

// 添加用户
export function userAdd(data) {
  const url = '/user/add'
  return $axios.post(url, data)
}
