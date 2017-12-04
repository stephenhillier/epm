import { store } from '../store'
import axios from 'axios'

export default (to, from, next) => {
  var ts = Math.round((new Date()).getTime() / 1000)
  var token = localStorage.getItem('token')
  if (token && localStorage.getItem('tokenExpiry') > ts && localStorage.getItem('user')) {
    store.dispatch('changeUser', localStorage.getItem('user'))
    axios.defaults.headers.common = { 'Authorization': 'JWT ' + token }
    next()
  } else {
    next('/login')
  }
}
