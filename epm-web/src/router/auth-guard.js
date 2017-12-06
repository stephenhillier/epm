import { store } from '../store'
import axios from 'axios'

export default (to, from, next) => {
  var ts = Math.round((new Date()).getTime() / 1000)
  var token = localStorage.getItem('token')
  var expiry = localStorage.getItem('tokenExpiry')
  var user = localStorage.getItem('user')
  if (token && user) {
    if (expiry > ts) {
      store.dispatch('changeUser', localStorage.getItem('user'))
      axios.defaults.headers.common = { 'Authorization': 'JWT ' + token }
      next()
    } else {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('tokenExpiry')
      next('/login')
    }
  } else {
    next('/login')
  }
}
