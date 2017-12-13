import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

const api = 'https://www.earthworksqc.com/projects/api'
const loginApi = 'https://www.earthworksqc.com/auth'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loading: false,
    error: '',
    currentUser: null,
    myProjects: [],
    currentProject: {},
    message: null,
    projectData: [],
    datatypeOptions: [],
    currentBorehole: { location: { latitude: 0, longitude: 0 } },
    projectSamples: [],
    uscsOptions: [{ value: '', display_name: '' }],
    sampleList: [],
    currentInstrument: {}
  },
  mutations: {
    loadRetrievedProjects (state, payload) {
      state.myProjects = payload
    },
    setUser (state, payload) {
      state.currentUser = payload
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
      state.error = ''
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
    },
    setCurrentBorehole (state, payload) {
      state.currentBorehole = payload
    },
    setCurrentInstrument (state, payload) {
      state.currentInstrument = payload
    },
    setUscsOptions (state, payload) {
      state.uscsOptions = payload
    },
    setSampleList (state, payload) {
      state.sampleList = payload
    }
  },
  actions: {
    resetError ({commit}) {
      commit('clearError')
    },
    userLogin ({commit}, credentials) {
      commit('clearError')
      axios.post(loginApi + '/login/', credentials)
      .then((response) => {
        const token = response.data.token
        const username = response.data.user.username
        commit('setUser', username)
        console.log('User: ' + username + ', token: ' + token)
        localStorage.setItem('user', username)
        localStorage.setItem('token', token)
        const base64Url = token.split('.')[1]
        const base64 = base64Url.replace('-', '+').replace('_', '/')
        const exp = JSON.parse(window.atob(base64)).exp
        localStorage.setItem('tokenExpiry', exp)
        axios.defaults.headers.common = { 'Authorization': 'JWT ' + token }
        this.dispatch('loadProjects')
        router.push('/')
      })
      .catch((error) => {
        commit('setError', 'Invalid username or password.')
        console.log(error)
      })
    },
    userLogout ({commit}) {
      axios.post(loginApi + '/logout/')
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('tokenExpiry')
      commit('setUser', null)
      router.push('/login')
    },
    loadProjects ({commit}) {
      commit('setLoading', true)
      axios.get(api + '/projects/')
        .then((data) => {
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
    loadBoreholeData ({commit}, payload) {
      commit('setLoading', true)
      axios.get(api + '/projects/' + payload.id + '/data/' + payload.bh + '/')
      .then(
        response => {
          const boreholeResponse = response.data
          commit('setCurrentBorehole', boreholeResponse)
          commit('setLoading', false)
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
    },
    loadInstrumentData ({commit}, payload) {
      commit('setLoading', true)
      axios.get(api + '/projects/' + payload.id + '/data/' + payload.instr + '/')
      .then(
        response => {
          commit('setCurrentInstrument', response.data)
          commit('setLoading', false)
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
    changeUser ({commit}, payload) {
      commit('setUser', payload)
    },
    loadDatatypeOptions ({commit}, projectId) {
      commit('setLoading', true)
      axios.options(api + '/projects/' + projectId + '/data/')
      .then(
        response => {
          const datatypes = response.data.actions.POST.data_type.choices
          const options = []
          for (let item in datatypes) {
            options.push({
              value: datatypes[item].value,
              display: datatypes[item].display_name
            })
          }
          commit('setLoading', false)
          commit('setDatatypeOptions', options)
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
    loadUscsOptions ({commit}, payload) {
      axios.options(api + '/projects/' + payload.project_id + '/data/' + payload.borehole_id + '/soil_layers/')
      .then(
        response => {
          const uscsChoices = response.data.actions.POST.uscs.choices
          const choices = []
          for (let item in uscsChoices) {
            choices.push({
              value: uscsChoices[item].value,
              display_name: uscsChoices[item].display_name
            })
          }
          commit('setUscsOptions', choices)
        })
      .catch(
        error => {
          commit('setError', error)
          console.log(error)
        }
      )
    },
    addDatapoint ({commit}, payload) {
      commit('setLoading', true)
      axios.post(api + '/projects/' + payload.project_id + '/data/', payload)
      .then(
        response => {
          commit('setLoading', false)
          store.dispatch('loadProjectData')
          router.push({name: 'ProjectDetail', params: { id: payload.project_id }})
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          console.log(error)
        }
      )
    },
    addSoilLayer ({commit}, payload) {
      commit('setLoading', true)
      axios.post(api + '/projects/' + payload.project_id + '/data/' + payload.data.datapoint + '/soil_layers/', payload.data)
      .then(
        response => {
          commit('setLoading', false)
          store.dispatch('loadBoreholeData', { id: payload.project_id, bh: payload.data.datapoint })
          router.push({name: 'BoreholeDetail', params: { id: payload.project_id, bh: payload.data.datapoint }})
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          console.log(error)
        }
      )
    },
    addSoilSample ({commit}, payload) {
      commit('setLoading', true)
      axios.post(api + '/projects/' + payload.project_id + '/data/' + payload.datapoint_id + '/soil_samples/', payload.data)
      .then(
        response => {
          commit('setLoading', false)
          store.dispatch('loadBoreholeData', { id: payload.project_id, bh: payload.datapoint_id })
          router.push({name: 'BoreholeDetail', params: { id: payload.project_id, bh: payload.datapoint_id }})
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          console.log(error)
        }
      )
    },
    loadSampleData ({commit}, payload) {
      commit('setLoading', true)
      axios.get(api + '/projects/' + payload.id + '/data/')
      .then(
        response => {
          commit('setLoading', false)
          var data = response.data
          var sampleList = []
          for (let obj in data) {
            if (data[obj].soil_samples) {
              for (let sample in data[obj].soil_samples) {
                sampleList.push(data[obj].soil_samples[sample])
              }
            }
          }
          commit('setSampleList', sampleList)
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
    getBoreholeData (state) {
      return state.currentBorehole
    },
    getUser (state) {
      return state.currentUser
    },
    getError (state) {
      return state.error
    },
    getDatatypeOptions (state) {
      return state.datatypeOptions
    },
    getUscsOptions (state) {
      return state.uscsOptions
    },
    getSoilSamples (state) {
      return state.sampleList
    },
    getInstrumentData (state) {
      return state.currentInstrument
    }
  }
})
