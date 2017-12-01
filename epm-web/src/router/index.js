import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import AuthGuard from './auth-guard'

import UserLogin from '@/components/auth/UserLogin'

import ProjectList from '@/components/ProjectList'
import ProjectDetail from '@/components/ProjectDetail'
import ProjectCreate from '@/components/ProjectCreate'

import BoreholeList from '@/components/datapoints/BoreholeList'
import BoreholeDetail from '@/components/datapoints/BoreholeDetail'
import SoilUnitCreate from '@/components/datapoints/SoilUnitCreate'
import SoilSampleCreate from '@/components/datapoints/SoilSampleCreate'

import InstrumentList from '@/components/datapoints/InstrumentList'
import InstrumentDetail from '@/components/datapoints/InstrumentDetail'

import SampleList from '@/components/lab/SampleList'

import DatapointCreate from '@/components/datapoints/DatapointCreate'

Vue.use(Router)

export default new Router({
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'EarthworksPM',
      component: Home,
      beforeEnter: AuthGuard
    },
    {
      path: '/login',
      name: 'UserLogin',
      component: UserLogin
    },
    {
      path: '/newproject',
      name: 'ProjectCreate',
      component: ProjectCreate,
      beforeEnter: AuthGuard
    },
    {
      path: '/myprojects/:id/data/boreholes/:bh/newsample',
      name: 'SoilSampleCreate',
      component: SoilSampleCreate,
      beforeEnter: AuthGuard
    },
    {
      path: '/myprojects/:id/data/boreholes/:bh/newlayer',
      name: 'SoilUnitCreate',
      component: SoilUnitCreate,
      beforeEnter: AuthGuard
    },
    {
      path: '/myprojects/:id/data/boreholes/:bh',
      name: 'BoreholeDetail',
      component: BoreholeDetail,
      beforeEnter: AuthGuard
    },
    {
      path: '/myprojects/:id/data/boreholes',
      name: 'BoreholeList',
      component: BoreholeList,
      beforeEnter: AuthGuard
    },
    {
      path: '/myprojects/:id/data/instruments/:instr',
      name: 'InstrumentDetail',
      component: InstrumentDetail,
      beforeEnter: AuthGuard
    },
    {
      path: '/myprojects/:id/data/instruments',
      name: 'InstrumentList',
      component: InstrumentList,
      beforeEnter: AuthGuard
    },
    {
      path: '/myprojects/:id/data/samples',
      name: 'SampleList',
      component: SampleList,
      beforeEnter: AuthGuard
    },
    {
      path: '/myprojects/:id/data/add',
      name: 'DatapointCreate',
      component: DatapointCreate,
      beforeEnter: AuthGuard
    },
    {
      path: '/myprojects/:id',
      name: 'ProjectDetail',
      props: true,
      component: ProjectDetail,
      beforeEnter: AuthGuard
    },
    {
      path: '/myprojects',
      name: 'ProjectList',
      component: ProjectList,
      beforeEnter: AuthGuard
    }
  ]
})
