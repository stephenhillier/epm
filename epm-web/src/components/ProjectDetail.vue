<template>
  <v-container>
      <v-layout row wrap class="mb-3">
        <v-flex xs12 md10>
            <v-card>
                <v-card-title dense class='subheader primary info--text'> 
                  Project overview:&nbsp;<div v-if="project">{{ project.name }}</div>
                </v-card-title>
                <v-card-text>
                  <v-layout row wrap>
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

                            <v-map style="height:28rem" :zoom=11 :center="[48.413220, -123.419482]">
                              <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
                                <v-marker 
                                v-for="project in projects"
                                v-if="project.latlng"
                                :key="project.id"
                                :lat-lng="project.latlng"
                                ></v-marker>
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
    computed: {
      project () {
        return this.$store.getters.currentProject
      },
      projectSummary () {
        let projectSummary = [
          { title: 'Project name: ', value: this.project.name },
          { title: 'Project number: ', value: this.project.number },
          { title: 'Client: ', value: this.project.client },
          { title: 'Location: ', value: this.project.location },
          { title: 'Project manager: ', value: this.project.pm }
        ]
        return projectSummary
      }
    },
    created () {
      this.$store.dispatch('loadCurrentProject', this.$route.params.id)
    }
  }
</script>
<style>
@import '~leaflet/dist/leaflet.css';
</style>