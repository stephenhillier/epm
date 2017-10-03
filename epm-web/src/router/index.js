import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ProjectList from '@/components/ProjectList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'EarthworksPM',
      component: Home
    },
    {
      path: '/myprojects',
      name: 'Projects',
      component: ProjectList
    }
  ]
})
