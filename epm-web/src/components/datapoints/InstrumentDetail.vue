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
                              <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
                                <v-marker 
                                v-if="instrument.location"
                                :lat-lng="instrument.location">
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
    <v-layout row wrap class="mb-3">
      <v-flex xs12 md10>
          <v-card>
              <v-card-title dense class='subheader primary info--text'> 
                Soil layers for {{ instrument.name }}:
              </v-card-title>
              <v-card-title>
                <v-btn flat secondary router :to="{ name: 'DatapointCreate', params: { id: this.$route.params.id } }">
                  <v-icon left class="secondary--text">note_add</v-icon>
                  Add soil unit
                </v-btn>
                </v-card-title>
              <v-data-table
                  v-bind:headers='headers'
                  v-bind:items='soilLayers'
                  v-bind:search='search'
                  v-bind:pagination.sync="pagination"
                  class='elevation-1'>
              <template slot='items' scope='props'>
                <td class='text-xs-left grey--text text--darken-1'>{{ props.item.depth_from }}</td>
                <td class='text-xs-left grey--text text--darken-1'>{{ props.item.depth_to }}</td>
                <td class='text-xs-left grey--text text--darken-1'>{{ props.item.get_uscs_display }}</td>
              </template>
              </v-data-table>
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
          { title: 'Type: ', value: this.instrument.data_type },
          { title: 'Project name: ', value: this.project.name },
          { title: 'Project number: ', value: this.project.number },
          { title: 'Date: ', value: this.instrument.date },
          { title: 'Logged by: ', value: this.instrument.field_tech },
          { title: 'Latitude: ', value: this.instrument.location.latitude },
          { title: 'Longitude: ', value: this.instrument.location.longitude }
        ]
        return instrumentSummary
      },
      boreholeCount () {
        var count = 0
        for (let obj in this.projectData) {
          if (this.projectData[obj].data_type === 'BH') {
            count += 1
          }
        }
        return count
      },
      instrumentCount () {
        var count = 0
        for (let obj in this.projectData) {
          if (this.projectData[obj].data_type !== 'BH') {
            count += 1
          }
        }
        return count
      }
    },
    created () {
      this.$store.dispatch('loadCurrentProject', this.$route.params.id)
      this.$store.dispatch('loadBoreholeData', { id: this.$route.params.id, bh: this.$route.params.bh })
    }
  }
</script>
<style>
@import '~leaflet/dist/leaflet.css';
</style>