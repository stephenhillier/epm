import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

const api = 'http://localhost:8000/projects/api'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loading: false,
    user: null,
    myProjects: [],
    currentProject: null,
    message: null,
    projectData: null,
    datatypeOptions: null
  },
  mutations: {
    loadRetrievedProjects (state, payload) {
      state.myProjects = payload
    },
    setUser (state, payload) {
      state.user = payload
    },
    setProjectData (state, payload) {
      state.projectData = payload
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
    },
    setMessage (state, payload) {
      state.message = payload
    },
    clearMessage (state) {
      state.message = null
    },
    setDatatypeOptions (state, payload) {
      state.datatypeOptions = payload
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
              client: obj[item].client,
              latlng: obj[item].latlng
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
        .then((response) => {
          const obj = response.data
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
    loadProjectData ({commit}, projectId) {
      commit('setLoading', true)
      console.log(api + '/projects/' + projectId + '/data/')
      axios.get(api + '/projects/' + projectId + '/data/')
      .then(
        response => {
          const projectData = response.data
          commit('setLoading', false)
          commit('setProjectData', projectData)
        })
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      )
    },
    clearCurrentProject ({commit}) {
      commit('setCurrentProject', null)
    },
    addNewProject ({commit}, payload) {
      commit('setLoading', true)
      const project = {
        name: payload.name,
        number: payload.number,
        client: payload.client,
        location: payload.location
      }
      axios.post(api + '/projects/', project)
      .then(
        response => {
          commit('setLoading', false)
          store.dispatch('loadProjects')
          router.push('/myprojects')
        })
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      )
    },
    changeUser ({commit}, payload) {
      commit('setUser', payload)
    },
    loadDatatypeOptions ({commit}, projectId) {
      commit('setLoading', true)
      axios.options(api + '/projects/' + projectId + /data/)
      .then(
        response => {
          console.log(response)
          const datatypes = response.data.actions.POST.data_type.choices
          const datatypeOptions = []
          for (let item in datatypes) {
            console.log('adding to datatypeoptions')
            datatypeOptions.push({
              value: item.value,
              display: item.display_name
            })
          }
          commit('setLoading', false)
          commit('setDatatypeOptions', datatypeOptions)
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      )
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
      return state.myProjects.slice(0, 4)
    },
    projectData (state) {
      return state.projectData
    },
    getUser (state) {
      return state.user
    },
    getDatatypeOptions (state) {
      return state.datatypeOptions
    }
  }
})
