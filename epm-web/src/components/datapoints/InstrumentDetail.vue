<template>
  <v-container>
      <v-layout row wrap class="mb-3">
        <v-flex xs12 md10>
            <v-card>
                <v-card-title dense class='subheader primary info--text'> 
                  Instrument details:&nbsp;<div v-if="instrument">{{ instrument.name }}</div>
                </v-card-title>
                <v-card-text>
                  <v-layout v-if="instrumentSummary" row wrap>
                      <v-flex md5 xs12>
                        <div v-for="item in instrumentSummary" :key="item.title">
                          <v-layout row wrap>   
                            <v-flex md4 subheader class="grey--text text--darken-2">{{ item.title }}</v-flex>
                            <v-flex md8 subheader class="primary--text">{{ item.value }}</v-flex>
                          </v-layout>
                          <v-divider></v-divider>
                        </div>
                      </v-flex>
                      <v-flex xs12 md6 offset-md1>
                        <v-card>
                          <v-map style="height:28rem; z-index: 1" :zoom=11 :center="[48.413220, -123.419482]">
                            <v-tilelayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></v-tilelayer>
                              <v-marker 
                              v-if="instrumentLocation"
                              :lat-lng="instrumentLocation">
                                <v-tooltip :content="instrument.name"></v-tooltip>
                              </v-marker>
                          </v-map>
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
    data () {
      return {
        pagination: {
          sortBy: 'depth_from'
        },
        search: '',
        headers: [
          { text: 'Depth from', value: 'depth_from', align: 'left', sortable: false },
          { text: 'Depth to', value: 'depth_to', align: 'left', sortable: false },
          { text: 'USCS', value: 'get_uscs_display', align: 'left', sortable: false }
        ]
      }
    },
    computed: {
      project () {
        const project = this.$store.getters.currentProject
        if (!project) {
          return {}
        } else {
          return project
        }
      },
      instrument () {
        const instrument = this.$store.getters.getInstrumentData
        if (!instrument) {
          return {}
        } else {
          return instrument
        }
      },
      instrumentSummary () {
        if (!this.instrument) {
          return []
        }
        var instrumentSummary = [
          { title: 'Instrument name: ', value: this.instrument.name },
          { title: 'Type: ', value: this.instrument.get_data_type_display },
          { title: 'Project name: ', value: this.project.name },
          { title: 'Project number: ', value: this.project.number },
          { title: 'Date: ', value: this.instrument.date },
          { title: 'Logged by: ', value: this.instrument.field_tech },
          { title: 'Latitude: ', value: this.instrumentLocation[0] },
          { title: 'Longitude: ', value: this.instrumentLocation[1] }
        ]
        return instrumentSummary
      },
      instrumentLocation () {
        if (!this.instrument.location) {
          return [0, 0]
        }
        return [this.instrument.location.latitude, this.instrument.location.longitude]
      }
    },
    created () {
      this.$store.dispatch('loadCurrentProject', this.$route.params.id)
      this.$store.dispatch('loadInstrumentData', { id: this.$route.params.id, instr: this.$route.params.instr })
    }
  }
</script>
<style>
@import '~leaflet/dist/leaflet.css';
</style>