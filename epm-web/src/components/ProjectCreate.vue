<template>
  <v-container>
      <v-layout row wrap class="mb-3">
        <v-flex xs12 md10>
            <v-card>
                <v-card-title dense class='subheader primary info--text'> 
                  Create new project
                </v-card-title>
                <v-card-text>
                  <v-layout row wrap>
                      <v-flex md5 xs12>
                        
                          <form @submit.prevent="onCreateProject">
                              <v-layout row>
                                  <v-flex md10>
                                      <v-text-field
                                      name="name"
                                      label="Project name"
                                      id="name"
                                      v-model="name"
                                      required></v-text-field>
                                  </v-flex>
                              </v-layout>
                              <v-layout row>
                                  <v-flex xs12 md10>
                                      <v-text-field
                                      name="number"
                                      label="Project number"
                                      id="number"
                                      v-model="number"
                                      required></v-text-field>
                                  </v-flex>
                              </v-layout>
                              <v-layout row>
                                  <v-flex xs12 md10>
                                      <v-text-field
                                      name="client"
                                      label="Client"
                                      id="client"
                                      v-model="client"
                                      required></v-text-field>
                                  </v-flex>
                              </v-layout>
                              <v-layout row>
                                  <v-flex xs12 md10>
                                      <v-text-field
                                      name="location"
                                      label="Location"
                                      id="location"
                                      v-model="location"
                                      required></v-text-field>
                                  </v-flex>
                              </v-layout>
                              <v-layout row>
                                <v-flex xs12 md6>
                                  <v-btn secondary :disabled="!formIsValid" type="submit">Create</v-btn>
                                </v-flex>
                              </v-layout>
                          </form>

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
    data () {
      return {
        name: '',
        number: '',
        client: '',
        location: ''
      }
    },
    computed: {
      formIsValid () {
        return this.name !== '' && this.number !== '' && this.client !== '' && this.location !== ''
      },
      projects () {
        return this.$store.getters.myProjects
      }
    },
    methods: {
      onCreateProject () {
        if (!this.formIsValid) {
          return
        }
        const projectData = {
          name: this.name,
          number: this.number,
          client: this.client,
          location: this.location
        }
        console.log(projectData)
        this.$store.dispatch('addNewProject', projectData)
      }
    }
  }
</script>
<style>
@import '~leaflet/dist/leaflet.css';
</style>