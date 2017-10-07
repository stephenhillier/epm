import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ProjectList from '@/components/ProjectList'
import ProjectDetail from '@/components/ProjectDetail'

Vue.use(Router)

export default new Router({
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'EarthworksPM',
      component: Home
    },
    {
      path: '/myprojects/:id',
      name: 'ProjectDetail',
      props: true,
      component: ProjectDetail
    },
    {
      path: '/myprojects',
      name: 'ProjectList',
      component: ProjectList
    }
  ]
})