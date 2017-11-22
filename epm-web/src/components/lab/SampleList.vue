<template>
  <v-container>
    <v-layout v-if="soilSamples" row wrap class="mb-3">
      <v-flex xs12 md10>
          <v-card>
              <v-card-title dense class='subheader primary info--text'> 
                Soil samples for {{ project.name }}:
              </v-card-title>
              <v-data-table
                  v-bind:headers='soilSamplesHeaders'
                  v-bind:items='soilSamples'
                  v-bind:search='soilSamplesSearch'
                  v-bind:pagination.sync="soilSamplesPagination"
                  class='elevation-1'>
              <template slot='items' scope='props'>
                <td class='text-xs-left grey--text text--darken-1'>{{ props.item.sample_name }}</td>
                <td class='text-xs-left grey--text text--darken-1'>{{ props.item.depth_from }}</td>
                <td class='text-xs-left grey--text text--darken-1'>{{ props.item.depth_to }}</td>
                <td class='text-xs-left grey--text text--darken-1'>{{ props.item.date }}</td>
                <td class='text-xs-left grey--text text--darken-1'>{{ props.item.field_tech }}</td>
                <td class='text-xs-left grey--text text--darken-1'><v-icon left class="secondary--text">note_add</v-icon></td>
              </template>
              </v-data-table>
          </v-card>    
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        soilSamplesPagination: {
          sortBy: 'sample_name'
        },
        soilSamplesSearch: '',
        soilSamplesHeaders: [
          { text: 'Name', value: 'sample_name', align: 'left', sortable: false },
          { text: 'Depth from (m)', value: 'depth_from', align: 'left', sortable: false },
          { text: 'Depth to (m)', value: 'depth_to', align: 'left', sortable: false },
          { text: 'Date', value: 'date', align: 'left', sortable: false },
          { text: 'Field tech', value: 'field_tech', align: 'left', sortable: false },
          { text: 'Add test', value: 'id', align: 'left', sortable: false }
        ]
      }
    },
    computed: {
      project () {
        var project = this.$store.getters.currentProject
        if (!project) {
          return {}
        } else {
          return project
        }
      },
      soilSamples () {
        var samples = this.$store.getters.getSoilSamples
        if (!samples) {
          return []
        } else {
          return samples
        }
      }
    },
    created () {
      this.$store.dispatch('loadCurrentProject', this.$route.params.id)
      this.$store.dispatch('loadSampleData', { id: this.$route.params.id })
    }
  }
</script>
<style>
@import '~leaflet/dist/leaflet.css';
</style>