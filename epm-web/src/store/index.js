import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'

/* API urls */
const api = 'https://www.earthworksqc.com/projects/api'
const loginApi = 'https://www.earthworksqc.com/auth'

Vue.use(Vuex)

/**
 * Vuex state store for retrieving and storing incoming data from API.
 *
 * TODO: separate state, mutations, actions and getters into modules e.g.:
 *
 * Projects:
 *  state:
 *   currentProject
 *  mutations:
 *    changeCurrentProject ()
 *  actions:
 *    loadCurrentProjectData ()
 *  getters:
 *   getCurrentProjectData ()
 */

export const store = new Vuex.Store({
  state: {
    currentUser: null,

    // helper states for displaying loading and error messages
    loading: false,
    error: '',
    message: null,

    // Project list and currently selected project
    myProjects: [],
    currentProject: {},
    projectData: [],

    // Data item detail pages
    currentBorehole: { location: { latitude: 0, longitude: 0 } },
    currentInstrument: {},
    projectSamples: [],
    sampleList: [],

    // form select options
    uscsOptions: [{ value: '', display_name: '' }],
    datatypeOptions: []
  },
  mutations: {
    // Session state mutations
    setUser (state, payload) {
      state.currentUser = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = ''
    },
    setMessage (state, payload) {
      state.message = payload
    },
    clearMessage (state) {
      state.message = null
    },
    setLoading (state, payload) {
      state.loading = payload
    },

    // Projects state mutations
    loadRetrievedProjects (state, payload) {
      state.myProjects = payload
    },
    setCurrentProject (state, payload) {
      state.currentProject = payload
    },
    setProjectData (state, payload) {
      state.projectData = payload
    },

    // Borehole/Instrument/Samples state mutations
    setCurrentBorehole (state, payload) {
      state.currentBorehole = payload
    },
    setCurrentInstrument (state, payload) {
      state.currentInstrument = payload
    },
    setSampleList (state, payload) {
      state.sampleList = payload
    },

    // fill in data for input form select boxes
    setDatatypeOptions (state, payload) {
      state.datatypeOptions = payload
    },
    setUscsOptions (state, payload) {
      state.uscsOptions = payload
    }
  },
  actions: {
    /**
     * Session/user/login actions
     *
     * userLogin: makes POST request to get token from API
     * userLogout: makes POST request to logout, clears tokens
     * changeUser: changes name of user in state. No API call
     *  - normally sets either null or user's name (on login)
     *  - i.e. doesn't change from one user to another
     * resetError: resets error message
     *
     */
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

        // decode JWT token to capture expiry
        const base64Url = token.split('.')[1]
        const base64 = base64Url.replace('-', '+').replace('_', '/')
        const exp = JSON.parse(window.atob(base64)).exp
        localStorage.setItem('tokenExpiry', exp)

        // Add token to headers when making API calls with axios
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
    changeUser ({commit}, payload) {
      commit('setUser', payload)
    },
    resetError ({commit}) {
      commit('clearError')
    },

    /**
     * Project actions
     *
     * loadProjects: retrieves list of projects with GET request
     * loadCurrentProject: retrieves details from selected project (GET)
     * loadProjectData: retrieves available data from selected project (GET)
     *  e.g. boreholes, instruments, samples etc.
     * clearCurrentProject: clears the current project from state
     *  e.g. when leaving project view
     * addNewProject: adds a new project to database with POST api request
     * */
    loadProjects ({commit}) {
      commit('setLoading', true)
      axios.get(api + '/projects/')
        .then((data) => {
          const projects = []
          const obj = data.data
          for (let item in obj) {
            // make objects out of response data, store in array, send to state
            // todo: can possibly use response data array directly (with serializer)
            // also avoid (let item in arr) for iterating through array
            // (to fix when ready to test)
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
      // API accepts object with keys name (project name), number (proj. number), client, location
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

    /**
     * Data (Borehole/Instrument/Sample) actions
     *
     * loadBoreholeData: retrieves data for the current borehole with GET request
     * loadInstrumentData: retrieves data for current instrument with GET request
     * loadSampleData: retrieves data for current sample with GET request
     *
     * addDatapoint: sends a new datapoint (borehole or instrument) with POST
     * addSoilLayer: creates a new soil layer in a borehole object (POST)
     * addSoilSample: creates a new soil sample in a borehole (POST)
     * */
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
    },

    /**
     * Form select field actions (populates select fields in create forms)
     *
     * loadDataTypeOptions: makes options request and receives list of valid instrument types
     *  e.g. Borehole, Settlement gauge, Inclinometer
     *
     * loadUscsOptions: makes options request and receives valid soil classifications
     *  e.g. GW, SP-SM, ML
     */
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
