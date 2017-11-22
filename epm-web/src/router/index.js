import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

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
      component: Home
    },
    {
      path: '/newproject',
      name: 'ProjectCreate',
      component: ProjectCreate
    },
    {
      path: '/myprojects/:id/data/boreholes/:bh/newsample',
      name: 'SoilSampleCreate',
      component: SoilSampleCreate
    },
    {
      path: '/myprojects/:id/data/boreholes/:bh/newlayer',
      name: 'SoilUnitCreate',
      component: SoilUnitCreate
    },
    {
      path: '/myprojects/:id/data/boreholes/:bh',
      name: 'BoreholeDetail',
      component: BoreholeDetail
    },
    {
      path: '/myprojects/:id/data/boreholes',
      name: 'BoreholeList',
      component: BoreholeList
    },
    {
      path: '/myprojects/:id/data/instruments/:instr',
      name: 'InstrumentDetail',
      component: InstrumentDetail
    },
    {
      path: '/myprojects/:id/data/instruments',
      name: 'InstrumentList',
      component: InstrumentList
    },
    {
      path: '/myprojects/:id/data/samples',
      name: 'SampleList',
      component: SampleList
    },
    {
      path: '/myprojects/:id/data/add',
      name: 'DatapointCreate',
      component: DatapointCreate
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
