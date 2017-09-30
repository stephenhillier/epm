import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Projects from '@/components/Projects/Projects'
import CreateProject from '@/components/Projects/CreateProject'
import Profile from '@/components/Users/Profile'
import Signup from '@/components/Users/Signup'
import Signin from '@/components/Users/Signin'
import Project from '@/components/Projects/Project'
import AuthGuard from '@/router/auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/projects',
      name: 'Projects',
      component: Projects,
      beforeEnter: AuthGuard
    },
    {
      path: '/newproject',
      name: 'CreateProject',
      component: CreateProject,
      beforeEnter: AuthGuard
    },
    {
      path: '/projects/:id',
      name: 'Project',
      props: true,
      component: Project,
      beforeEnter: AuthGuard
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    }
  ],
  mode: 'history'
})
