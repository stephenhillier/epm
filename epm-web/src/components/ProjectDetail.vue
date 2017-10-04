<template>
  <v-container>
      <v-layout row wrap class="mb-3">
        <v-flex xs12 md10>
            <v-card>
                <v-card-title dense class='subheader primary info--text'> 
                  Project overview:
                </v-card-title>
                <v-card-text>

                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'
  export default {
    computed: {
      currentProject () {
        return this.$state.getters.currentProject
      }
    }
  }
</script>