import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import ProjectList from '@/components/ProjectList'
import ProjectDetail from '@/components/ProjectDetail'
import ProjectCreate from '@/components/ProjectCreate'
import DatapointCreate from '@/components/datapoints/DatapointCreate'
import BoreholeList from '@/components/datapoints/BoreholeList'

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
      path: '/newproject',
      name: 'ProjectCreate',
      component: ProjectCreate
    },
    {
      path: '/myprojects/:id/data/add',
      name: 'DatapointCreate',
      component: DatapointCreate
    },
    {
      path: '/myprojects/:id/data/boreholes',
      name: 'BoreholeList',
      component: BoreholeList
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
