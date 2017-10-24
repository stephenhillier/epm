<template>
  <v-container>
    <v-layout mb-2>  
    <v-flex xs12 md10>
      <v-card>
        <v-map style="height:16rem" :zoom=11 :center="[48.413220, -123.419482]">
          <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
          <v-marker 
          v-for="point in instruments"
          v-if="point.location"
          :key="point.id"
          :lat-lng="[point.location.latitude, point.location.longitude]">
            <v-tooltip :content="point.name"></v-tooltip>
          </v-marker>
        </v-map>
      </v-card>
    </v-flex>
    </v-layout>
    <v-layout row wrap class="mb-2">
      <v-flex xs12 md10>
          <v-card>
            <v-card-title dense class='subheader primary info--text'>All instruments:</v-card-title>
                <v-card-text>
                <v-layout row wrap> 
                    <v-data-table
                        v-bind:headers='headers'
                        v-bind:items='instruments'
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
                          <template slot="footer">
                            
                            <td colspan="100%"><v-layout row wrap>
                              <v-flex xs7 md4>
                              <v-btn flat secondary router :to="{ name: 'DatapointCreate', params: { id: this.$route.params.id } }">
                                <v-icon left class="secondary--text">note_add</v-icon>
                                New instrument
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
              </v-layout>
            </v-card-text>
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
          sortBy: 'name'
        },
        search: '',
        headers: [
          {
            text: 'Borehole',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'Type', value: 'data_type' },
          { text: 'Date', value: 'date' },
          { text: 'Installed by', value: 'field_tech' },
          { text: 'Latitude', value: 'location.latitude' },
          { text: 'Longitude', value: 'location.longitude' }
        ]
      }
    },
    computed: {
      project () {
        return this.$store.getters.currentProject
      },
      instruments () {
        var data = this.$store.getters.projectData
        if (!data) {
          return []
        } else {
          var instruments = []
          for (let item in data) {
            if (data[item].data_type !== 'BH') {
              instruments.push(data[item])
            }
          }
          return instruments
        }
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