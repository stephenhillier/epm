import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedProjects: [
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Laurel_Point_Park_in_Victoria_BC.jpg/1280px-Laurel_Point_Park_in_Victoria_BC.jpg',
        id: 'project1',
        title: 'James Bay Parkway',
        date: new Date(),
        location: 'Victoria, BC',
        description: 'New freeway through Downtown Victoria'
      },
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Coast_at_Esquimalt_%286930918074%29.jpg',
        id: 'project2',
        title: 'Esquimalt Towers',
        date: new Date(),
        location: 'Esquimalt, BC',
        description: 'Esquimalt&apos;s hippest new condo development!'
      }
    ],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    setLoadedProjects (state, payload) {
      state.loadedProjects = payload
    },
    createProject (state, payload) {
      state.loadedProjects.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    loadProjects ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('projects').once('value')
        .then((data) => {
          const projects = []
          const obj = data.val()
          for (let key in obj) {
            projects.push({
              id: key,
              title: obj[key].title,
              description: obj[key].title,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date
            })
          }
          commit('setLoadedProjects', projects)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    createProject ({commit}, payload) {
      const project = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date.toISOString()
      }
      firebase.database().ref('projects').push(project)
        .then((data) => {
          const key = data.key
          commit('createProject', {
            ...project,
            id: key
          })
        })
        .catch((error) => {
          console.log(error)
        })
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredProjects: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            const newUser = {
              id: user.uid,
              registeredProjects: []
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid, registeredProjects: []})
    },
    clearError ({commit}) {
      commit('clearError')
    }
  },
  getters: {
    loadedProjects (state) {
      return state.loadedProjects.sort((projectA, projectB) => {
        return projectA.date > projectB.date
      })
    },
    featuredProjects (state, getters) {
      return getters.loadedProjects.slice(0, 5)
    },
    loadedProject (state) {
      return (projectId) => {
        return state.loadedProjects.find((project) => {
          return project.id === projectId
        })
      }
    },
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})
