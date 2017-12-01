<template>
  <v-container>
      <v-layout row wrap class="mb-3">
        <v-flex xs12 md10>
            <v-card>
                <v-card-title dense class='subheader primary info--text'> 
                  Project overview:&nbsp;<div v-if="project">{{ project.name }}</div>
                </v-card-title>
                <v-card-text>
                  <v-layout v-if="projectSummary" row wrap>
                      <v-flex md5 xs12>
                        <div v-for="item in projectSummary" :key="item.title">
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
                                v-for="point in projectData"
                                v-if="point.latlng"
                                :key="point.id"
                                :lat-lng="point.latlng">
                                  <v-tooltip :content="point.name"></v-tooltip>
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
                All boreholes, sampling points and instrumentation:
              </v-card-title>
              <v-card-title>
                <v-btn flat secondary router :to="{ name: 'DatapointCreate', params: { id: this.$route.params.id } }">
                  <v-icon left class="secondary--text">note_add</v-icon>
                  New datapoint
                </v-btn>
                <v-spacer class="hidden-xs-only"></v-spacer>
                <v-text-field
                  prepend-icon="search"
                  label="Search"
                  v-model="search"
                  hide-details
                ></v-text-field>
                </v-card-title>
              <v-data-table
                  v-bind:headers='headers'
                  v-bind:items='projectData'
                  v-bind:search='search'
                  v-bind:pagination.sync="pagination"
                  class='elevation-1'>
              <template slot='items' scope='props'>
                <router-link :to="datapointLink(props.item.data_type, props.item.id)" tag="td" class="accent--text"><a>{{ props.item.name }}</a></router-link>
                <td class='text-xs-right grey--text text--darken-1'>{{ props.item.data_type }}</td>
                <td class='text-xs-right grey--text text--darken-1'>{{ props.item.date }}</td>
                <td class='text-xs-right grey--text text--darken-1'>{{ props.item.field_tech }}</td>
                <td class='text-xs-right grey--text text--darken-1'>{{ props.item.location.latitude }}</td>
                <td class='text-xs-right grey--text text--darken-1'>{{ props.item.location.longitude }}</td>
              </template>
              </v-data-table>
          </v-card>    
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import datapointLink from '@/mixins/datapointLink.js'
  import L from 'leaflet'

  delete L.Icon.Default.prototype._getIconUrl
  L.Icon.Default.imagePath = ''
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
  })

  export default {
    mixins: [datapointLink],
    data () {
      return {
        pagination: {
          sortBy: 'data_type'
        },
        search: '',
        headers: [
          {
            text: 'Datapoint',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Type', value: 'data_type' },
          { text: 'Date', value: 'date' },
          { text: 'Logged by', value: 'field_tech' },
          { text: 'Latitude', value: 'location.latitude' },
          { text: 'Longitude', value: 'location.longitude' }
        ]
      }
    },
    computed: {
      project () {
        return this.$store.getters.currentProject
      },
      projectSummary () {
        if (!this.project) {
          return {}
        }
        let projectSummary = [
          { title: 'Project name: ', value: this.project.name },
          { title: 'Project number: ', value: this.project.number },
          { title: 'Client: ', value: this.project.client },
          { title: 'Location: ', value: this.project.location },
          { title: 'Project manager: ', value: this.project.pm },
          { title: 'Boreholes: ', value: this.boreholeCount },
          { title: 'Instruments: ', value: this.instrumentCount }
        ]
        return projectSummary
      },
      projectData () {
        var data = this.$store.getters.projectData
        if (!data) {
          return [ { location: {} } ]
        } else {
          return data
        }
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
      this.$store.dispatch('loadProjectData', this.$route.params.id)
    }
  }
</script>
<style>
@import '~leaflet/dist/leaflet.css';
</style>
