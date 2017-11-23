<template>
  <v-container>
      <v-layout row wrap class="mb-3">
        <v-flex xs12 md10>
            <v-card>
                <v-card-title dense class='subheader primary info--text'> 
                  Add soil layer to borehole {{ borehole.name }}
                </v-card-title>
                <v-card-text>
                  <v-layout row wrap>
                    <v-flex md5 xs12>
                      <form @submit.prevent="onCreateSoilLayer">
                          <v-layout row>
                              <v-flex md10>
                                  <v-text-field
                                  name="number"
                                  label="Project number"
                                  id="number"
                                  v-model="this.project.number"
                                  disabled></v-text-field>
                              </v-flex>
                          </v-layout>
                          <v-layout row>
                              <v-flex xs12 md10>
                                  <v-text-field
                                  name="borehole"
                                  label="Borehole"
                                  id="borehole"
                                  v-model="this.borehole.name"
                                  disabled></v-text-field>
                              </v-flex>
                          </v-layout>
                          <v-layout row>
                              <v-flex xs12 md10>
                                  <v-text-field
                                  name="depthFrom"
                                  label="Depth from"
                                  id="depthFrom"
                                  v-model="depthFrom"
                                  required></v-text-field>
                              </v-flex>
                          </v-layout>
                          <v-layout row>
                              <v-flex xs12 md10>
                                  <v-text-field
                                  name="depthTo"
                                  label="Depth to"
                                  id="depthTo"
                                  v-model="depthTo"
                                  required></v-text-field>
                              </v-flex>
                          </v-layout>
                          <v-layout row>
                              <v-flex xs12 md10>
                                <v-select
                                  :items="uscsOptions"
                                  v-model="uscs"
                                  label="Select USCS classification"
                                  item-text="display_name"
                                  item-value="value"
                                  return-object
                                  required
                                ></v-select>
                              </v-flex>
                          </v-layout>
                          <v-layout row>
                            <v-flex xs12 md6>
                              <v-btn secondary type="submit">Create</v-btn>
                            </v-flex>
                          </v-layout>
                      </form>
                    </v-flex>
                  </v-layout>  
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        depthFrom: '',
        depthTo: '',
        uscs: ''
      }
    },
    computed: {
      borehole () {
        return this.$store.getters.getBoreholeData
      },
      project () {
        return this.$store.getters.currentProject
      },
      uscsOptions () {
        var options = this.$store.getters.getUscsOptions
        if (!options) {
          return [{ name: '', display_name: '' }]
        } else {
          return options
        }
      }
    },
    methods: {
      onCreateSoilLayer () {
        const soilLayer = {
          project_id: this.$route.params.id,
          data: {
            project_id: this.$route.params.id,
            datapoint: this.$route.params.bh,
            depth_from: this.depthFrom,
            depth_to: this.depthTo,
            uscs: this.uscs.value
          }
        }
        this.$store.dispatch('addSoilLayer', soilLayer)
      }
    },
    created () {
      this.$store.dispatch('loadUscsOptions', { project_id: this.$route.params.id, borehole_id: this.$route.params.bh })
    }
  }
</script>