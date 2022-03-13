import $axios from "./request";

// export function userInfo(data) {
//   const url = '/userInfo'
//   return $axios.get(url, data)
// }
export function userInfo(data) {
  const url = '/roles/auth'
  return $axios.get(url, data)
}