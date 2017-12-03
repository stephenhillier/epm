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
Vue.component('v-tooltip', Vue2Leaflet.Tooltip)
Vue.component('v-popup', Vue2Leaflet.Popup)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created () {
    let token = localStorage.getItem('token')
    if (token) {
      axios.post('https://www.earthworksqc.com/refresh-token/', token)
      .then(
        response => {
          if (response.data.token) {
            let name = localStorage.getItem('user')
            axios.defaults.headers.common = { 'Authorization': 'JWT ' + response.data.token }
            this.$store.dispatch('changeUser', name)
            this.$store.dispatch('loadProjects')
          }
        }
      )
    }
  }
})
