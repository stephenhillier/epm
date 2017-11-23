<template>
  <v-container>
      <v-layout row wrap class="mb-3">
        <v-flex xs12 md10>
            <v-card>
                <v-card-title dense class='subheader primary info--text'> 
                  Add new datapoint to project:
                </v-card-title>
                <v-card-text>
                  <v-layout row wrap>
                      <v-flex md5 xs12>
                        
                          <form @submit.prevent="onCreateDatapoint">
                            <v-layout row>
                                  <v-flex md10>
                                      <v-text-field
                                      name="projectNumber"
                                      label="Project number"
                                      id="projectNumber"
                                      v-model="this.project.number"
                                      disabled></v-text-field>
                                  </v-flex>
                              </v-layout>
                              <v-layout row>
                                  <v-flex md10>
                                      <v-text-field
                                      name="project"
                                      label="Project name"
                                      id="project"
                                      v-model="this.project.name"
                                      disabled></v-text-field>
                                  </v-flex>
                              </v-layout>
                              <v-layout row>
                                  <v-flex xs12 md10>
                                    <v-select
                                      :items="datatypeOptions"
                                      v-model="datatype"
                                      label="Select datatype (e.g. borehole or type of instrument)"
                                      item-text="display"
                                      item-value="value"
                                      return-object
                                    ></v-select>
                                  </v-flex>
                              </v-layout>
                              <v-layout row>
                                  <v-flex xs12 md10>
                                    <v-menu
                                      lazy
                                      :close-on-content-click="false"
                                      v-model="menu"
                                      transition="scale-transition"
                                      offset-y
                                      full-width
                                      :nudge-right="40"
                                      max-width="290px"
                                      min-width="290px"
                                    >
                                      <v-text-field
                                        slot="activator"
                                        label="Date"
                                        v-model="date"
                                        prepend-icon="event"
                                        readonly
                                      ></v-text-field>
                                      <v-date-picker v-model="date" no-title scrollable actions>
                                        <template scope="{ save, cancel }">
                                          <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                                            <v-btn flat color="primary" @click="save">OK</v-btn>
                                          </v-card-actions>
                                        </template>
                                      </v-date-picker>
                                    </v-menu>
                                  </v-flex>
                              </v-layout>
                              <v-layout row>
                                  <v-flex xs12 md10>
                                      <v-text-field
                                      name="number"
                                      label="Datapoint number"
                                      id="number"
                                      v-model="number"
                                      :prefix="datapointPrefix"
                                      required
                                      placeholder="01"
                                      focus></v-text-field>
                                  </v-flex>
                              </v-layout>
                              <v-layout row>
                                  <v-flex xs12 md10>
                                      <v-text-field
                                      name="lat"
                                      label="Latitude"
                                      id="lat"
                                      v-model="lat"
                                      required></v-text-field>
                                  </v-flex>
                              </v-layout>
                              <v-layout row>
                                  <v-flex xs12 md10>
                                      <v-text-field
                                      name="lng"
                                      label="Longitude"
                                      id="lng"
                                      v-model="lng"
                                      required></v-text-field>
                                  </v-flex>
                              </v-layout>
                              <v-layout row>
                                  <v-flex xs12 md10>
                                      <v-text-field
                                      name="fieldTech"
                                      label="Installed/logged by:"
                                      id="fieldTech"
                                      v-model="fieldTech"
                                      required></v-text-field>
                                  </v-flex>
                              </v-layout>
                              <v-layout row>
                                <v-flex xs12 md6>
                                  <v-btn secondary :disabled="!formIsValid" type="submit">Create</v-btn>
                                </v-flex>
                              </v-layout>
                          </form>

                      </v-flex>
                      <v-flex xs12 md6 offset-md1>
                        <v-card class="text-xs-center">

                          <v-map style="height:28rem; z-index: 1" :zoom=11 :center="mapCenter">
                            <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
                              <v-marker
                              v-if="latLngAvailable" 
                              :lat-lng="latLng"
                              ></v-marker>
                          </v-map>

                          <v-btn secondary center :disabled="!latLngAvailable" @click="mapCenter = latLng">Center on marker</v-btn>
                          <div>
                            <v-btn @click="latUp()">^</v-btn>
                            <v-btn @click="latDown()">v</v-btn>
                            <v-btn @click="lngDown()">&lt;</v-btn>
                            <v-btn @click="lngUp()">&gt;</v-btn>
                          </div>
                        </v-card>
                      </v-flex>
                    </v-layout>  
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import L from 'leaflet'

  delete L.Icon.Default.prototype._getIconUrl
  L.Icon.Default.imagePath = ''
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
  })

  export default {
    created () {
      this.$store.dispatch('loadDatatypeOptions', this.$route.params.id)
      this.$store.dispatch('loadCurrentProject', this.$route.params.id)
      this.$store.dispatch('loadProjectData', this.$route.params.id)
    },
    data () {
      return {
        datatype: { display: 'Borehole', value: 'BH' },
        date: '2017-01-01',
        number: '',
        fieldTech: '',
        lat: 48.413220,
        lng: -123.419482,
        mapCenter: [48.413220, -123.419482],
        menu: false,
        modal: false
      }
    },
    computed: {
      formIsValid () {
        return this.datatype !== '' && this.number !== '' && this.date !== '' && this.fieldTech !== '' && this.lat !== '' && this.lng !== ''
      },
      projectData () {
        return this.$store.getters.projectData
      },
      project () {
        const obj = this.$store.getters.currentProject
        if (!obj) {
          return []
        } else {
          return obj
        }
      },
      latLng () {
        return [this.lat, this.lng]
      },
      latLngAvailable () {
        const latIsNumber = (this.latLng[0] !== '')
        const lngIsNumber = (this.latLng[1] !== '')
        const latInRange = (this.latLng[0] <= 90) && (this.latLng[0] >= -90)
        const lngInRange = (this.latLng[1] <= 180) && (this.latLng[1] >= -180)
        return latIsNumber && lngIsNumber && latInRange && lngInRange
      },
      datatypeOptions () {
        const types = this.$store.getters.getDatatypeOptions
        if (!types) {
          return [{ display: 'no data yet', value: 'BH' }]
        } else {
          return types
        }
      },
      datapointPrefix () {
        return this.datatype.value + this.date.slice(2, 4) + '-'
      }
    },
    methods: {
      onCreateDatapoint () {
        if (!this.formIsValid) {
          return
        }
        const datapoint = {
          project_id: this.project.id,
          data_type: this.datatype.value,
          date: this.date,
          number: this.number,
          field_tech: this.fieldTech,
          location: {
            latitude: this.lat,
            longitude: this.lng
          }
        }
        console.log(datapoint)
        this.$store.dispatch('addDatapoint', datapoint)
      },
      latUp () {
        this.lat += 0.0005
      },
      latDown () {
        this.lat -= 0.0005
      },
      lngUp () {
        this.lng += 0.0005
      },
      lngDown () {
        this.lng -= 0.0005
      }
    }
  }
</script>
<style>
@import '~leaflet/dist/leaflet.css';
</style>