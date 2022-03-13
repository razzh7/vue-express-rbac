import Cookies from 'js-cookie'

export function getToken() {
  // return localStorage.getItem('token')
  return Cookies.get('token')
}