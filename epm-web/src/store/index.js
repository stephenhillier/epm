import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

const api = 'http://localhost:8000/projects/api'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loading: false,
    user: null,
    myProjects: [],
    currentProject: null
  },
  mutations: {
    loadRetrievedProjects (state, payload) {
      state.myProjects = payload
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
    },
    setCurrentProject (state, payload) {
      state.currentProject = payload
    }
  },
  actions: {
    loadProjects ({commit}) {
      commit('setLoading', true)
      axios.get(api + '/projects/')
        .then((data) => {
          console.log(data)
          const projects = []
          const obj = data.data
          for (let item in obj) {
            projects.push({
              id: obj[item].id,
              number: obj[item].number,
              name: obj[item].name,
              pm: obj[item].pm,
              location: obj[item].location,
              client: obj[item].client
            })
          }
          commit('loadRetrievedProjects', projects)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    loadCurrentProject ({commit}, projectId) {
      commit('setLoading', true)
      axios.get(api + '/projects/' + projectId + '/')
        .then((data) => {
          const obj = data.data
          const projectData = {
            id: obj.id,
            number: obj.number,
            name: obj.name,
            pm: obj.pm,
            location: obj.location,
            client: obj.client,
            datapoints: obj.datapoints
          }
          console.log('SET PROJECT TO ' + projectData.id)
          commit('setCurrentProject', projectData)
          commit('setLoading', false)
        })
        .catch((error) => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    clearCurrentProject ({commit}) {
      commit('setCurrentProject', null)
    }
  },
  getters: {
    myProjects (state) {
      return state.myProjects
    },
    currentProject (state) {
      return state.currentProject
    },
    latestProjects (state) {
      return state.myProjects.slice(0, 5)
    }
  }
})
