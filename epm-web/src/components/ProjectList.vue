<template>
  <v-container>
      <v-layout row wrap mb-2>
        <v-flex xs12 md10>
          <v-card>
            <div>
              <v-map style="height:16rem; z-index: 1" :zoom=11 :center="[48.413220, -123.419482]">
                <v-tilelayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></v-tilelayer>
                  <v-marker 
                  v-for="project in projects"
                  v-if="project.latlng"
                  :key="project.id"
                  :lat-lng="project.latlng"
                  >
                  <v-tooltip :content="project.number + ' - ' + project.name"></v-tooltip>
                  </v-marker>
              </v-map>
            </div>
          </v-card>
        </v-flex>
      </v-layout>

      <v-layout row wrap mb-3>
        <v-flex xs12 md10>
            <v-card>
              <v-card-title dense class='subheader primary info--text'>All projects:
                <v-spacer></v-spacer>
                <v-chip class="secondary white--text hidden-sm-and-down">
                  <v-avatar>
                    <v-icon>new_releases</v-icon>
                  </v-avatar>
                  Tip: the map shows projects that have data points!
                </v-chip>
              </v-card-title>
                <v-data-table
                    v-bind:headers='headers'
                    v-bind:items='projects'
                    v-bind:search='search'
                    v-bind:pagination.sync="pagination"
                    class='elevation-1'>
                <template slot='items' scope='props'>
                    <router-link :to="'/myprojects/' + props.item.id" tag="td" class="accent--text"><a>{{ props.item.name }}</a></router-link>
                    <td class='text-xs-right grey--text text--darken-1'>{{ props.item.number }}</td>
                    <td class='text-xs-right grey--text text--darken-1'>{{ props.item.location }}</td>
                    <td class='text-xs-right grey--text text--darken-1'>{{ props.item.pm }}</td>
                    <td class='text-xs-right grey--text text--darken-1'>{{ props.item.client }}</td>
                </template>
                <template slot="footer">
                  
                  <td colspan="100%"><v-layout row wrap>
                    <v-flex xs7 md4>
                    <v-btn flat secondary router :to="{ name: 'ProjectCreate' }">
                      <v-icon left class="secondary--text">note_add</v-icon>
                      New project
                    </v-btn></v-flex>
                    <v-flex xs7 md7 offset-md1>
                    <v-text-field
                      prepend-icon="search"
                      label="Search"
                      v-model="search"
                      hide-details
                      class="pb-2"
                    ></v-text-field></v-flex></v-layout>
                  </td>
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
    computed: {
      projects () {
        return this.$store.getters.myProjects
      }
    },
    data () {
      return {
        pagination: {
          sortBy: 'number'
        },
        search: '',
        headers: [
          {
            text: 'Project',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Proj. number', value: 'number' },
          { text: 'Location', value: 'location' },
          { text: 'PM', value: 'pm' },
          { text: 'Client', value: 'client' }
        ]
      }
    },
    created () {
      this.$store.dispatch('loadProjects')
    }
  }
</script>
<style>
@import '~leaflet/dist/leaflet.css';
</style>
