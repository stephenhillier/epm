<template>
  <v-container>
      <v-layout v-if="borehole" row wrap class="mb-3">
        <v-flex xs12 md10>
            <v-card>
                <v-card-title dense class='subheader primary info--text'> 
                  Borehole details:&nbsp;<div v-if="borehole">{{ borehole.name }}</div>
                </v-card-title>
                <v-card-text>
                  <v-layout v-if="boreholeSummary" row wrap>
                      <v-flex md5 xs12>
                        <div v-for="item in boreholeSummary" :key="item.title">
                          <v-layout row wrap>   
                            <v-flex md4 subheader class="grey--text text--darken-2">{{ item.title }}</v-flex>
                            <v-flex md8 subheader class="primary--text">{{ item.value }}</v-flex>
                          </v-layout>
                          <v-divider></v-divider>
                        </div>
                      </v-flex>
                      <v-flex xs12 md6 offset-md1>
                        <v-card v-if="boreholeLocation">

                            <v-map style="height:28rem; z-index: 1" :zoom=11 :center="boreholeLocation">
                              <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
                                <v-marker 
                                v-if="boreholeLocation"
                                :lat-lng="boreholeLocation">
                                  <v-tooltip :content="borehole.name"></v-tooltip>
                                </v-marker>
                            </v-map>

                        </v-card>
                      </v-flex>
                    </v-layout>  
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
    <v-layout v-if="borehole" row wrap class="mb-3">
      <v-flex xs12 md10>
          <v-card>
              <v-card-title dense class='subheader primary info--text'> 
                Soil layers for {{ borehole.name }}:
              </v-card-title>
              <v-card-title>
                <v-btn flat secondary router :to="{ name: 'SoilUnitCreate', params: { id: this.$route.params.id, bh: this.$route.params.bh } }">
                  <v-icon left class="secondary--text">note_add</v-icon>
                  Add soil unit
                </v-btn>
                </v-card-title>
              <v-data-table
                  v-bind:headers='soilLayersHeaders'
                  v-bind:items='soilLayers'
                  v-bind:search='soilLayersSearch'
                  v-bind:pagination.sync="soilLayersPagination"
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
    <v-layout v-if="boreholeSamples" row wrap class="mb-3">
      <v-flex xs12 md10>
          <v-card>
              <v-card-title dense class='subheader primary info--text'> 
                Soil samples for {{ borehole.name }}:
              </v-card-title>
              <v-card-title>
                <v-btn flat secondary router :to="{ name: 'SoilSampleCreate', params: { id: this.$route.params.id, bh: this.$route.params.bh } }">
                  <v-icon left class="secondary--text">note_add</v-icon>
                  Add sample
                </v-btn>
                </v-card-title>
              <v-data-table
                  v-bind:headers='boreholeSamplesHeaders'
                  v-bind:items='boreholeSamples'
                  v-bind:search='boreholeSamplesSearch'
                  v-bind:pagination.sync="boreholeSamplesPagination"
                  class='elevation-1'>
              <template slot='items' scope='props'>
                <td class='text-xs-left grey--text text--darken-1'>{{ props.item.sample_name }}</td>
                <td class='text-xs-left grey--text text--darken-1'>{{ props.item.depth_from }}</td>
                <td class='text-xs-left grey--text text--darken-1'>{{ props.item.depth_to }}</td>
                <td class='text-xs-left grey--text text--darken-1'>{{ props.item.date }}</td>
                <td class='text-xs-left grey--text text--darken-1'>{{ props.item.field_tech }}</td>
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
        soilLayersPagination: {
          sortBy: 'depth_from'
        },
        soilLayersSearch: '',
        soilLayersHeaders: [
          { text: 'Depth from (m)', value: 'depth_from', align: 'left', sortable: false },
          { text: 'Depth to (m)', value: 'depth_to', align: 'left', sortable: false },
          { text: 'USCS', value: 'get_uscs_display', align: 'left', sortable: false }
        ],
        boreholeSamplesPagination: {
          sortBy: 'depth_from'
        },
        boreholeSamplesSearch: '',
        boreholeSamplesHeaders: [
          { text: 'Name', value: 'sample_name', align: 'left', sortable: false },
          { text: 'Depth from (m)', value: 'depth_from', align: 'left', sortable: false },
          { text: 'Depth to (m)', value: 'depth_to', align: 'left', sortable: false },
          { text: 'Date', value: 'date', align: 'left', sortable: false },
          { text: 'Field tech', value: 'field_tech', align: 'left', sortable: false }
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
      borehole () {
        const borehole = this.$store.getters.getBoreholeData
        if (!borehole) {
          return {location: {}}
        } else {
          return borehole
        }
      },
      soilLayers () {
        if (!this.borehole) {
          return []
        } else {
          return this.borehole.soil_layers
        }
      },
      boreholeSamples () {
        if (!this.borehole) {
          return []
        } else {
          return this.borehole.soil_samples
        }
      },
      boreholeSummary () {
        if (!this.borehole) {
          return []
        }
        var boreholeSummary = [
          { title: 'Borehole name: ', value: this.borehole.name },
          { title: 'Project name: ', value: this.project.name },
          { title: 'Project number: ', value: this.project.number },
          { title: 'Date: ', value: this.borehole.date },
          { title: 'Logged by: ', value: this.borehole.field_tech },
          { title: 'Latitude: ', value: this.borehole.location.latitude },
          { title: 'Longitude: ', value: this.borehole.location.longitude }
        ]
        return boreholeSummary
      },
      boreholeLocation () {
        if (!this.borehole.location) {
          return []
        } else {
          return [this.borehole.location.latitude, this.borehole.location.longitude]
        }
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