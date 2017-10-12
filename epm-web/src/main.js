// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import './stylus/main.styl'
import App from './App'
import router from './router'
import Vue2Leaflet from 'vue2-leaflet'
import { store } from './store'
import axios from 'axios'

Vue.use(Vuetify)
Vue.use(axios)
Vue.config.productionTip = false
Vue.component('v-map', Vue2Leaflet.Map)
Vue.component('v-tilelayer', Vue2Leaflet.TileLayer)
Vue.component('v-marker', Vue2Leaflet.Marker)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created () {
    let token = document.querySelector('meta[name="csrf-token"]')
    if (token) {
      axios.defaults.headers.common['X-CSRFToken'] = token.content
      console.log(token.content)
    } else {
      console.log('CSRF token not found')
    }
    this.$store.dispatch('loadProjects')
  }
})
