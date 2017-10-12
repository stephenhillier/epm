<template>
  <v-container>
      <v-layout row wrap class="mb-3">
        <v-flex xs12 md10>
            <v-card>
                <v-card-title dense class='subheader primary info--text'> 
                  All projects:
                </v-card-title>
                <v-card-title>
                  <v-btn flat secondary router to="/newproject">
                    <v-icon left class="secondary--text">create_new_folder</v-icon>
                    New project</v-btn>
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
                </v-data-table>
            </v-card>    
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 md10>
          <v-card>
            <div>
              <v-map style="height:28rem" :zoom=11 :center="[48.413220, -123.419482]">
                <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
                  <v-marker 
                  v-for="project in projects"
                  v-if="project.latlng"
                  :key="project.id"
                  :lat-lng="project.latlng"
                  ></v-marker>
              </v-map>
            </div>
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
    }
  }
</script>
<style>
@import '~leaflet/dist/leaflet.css';
</style>
