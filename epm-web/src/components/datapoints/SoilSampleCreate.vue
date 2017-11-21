<template>
  <v-container>
      <v-layout row wrap class="mb-3">
        <v-flex xs12 md10>
            <v-card>
                <v-card-title dense class='subheader primary info--text'> 
                  Add soil sample to borehole {{ borehole.name }}
                </v-card-title>
                <v-card-text>
                  <v-layout row wrap>
                    <v-flex md5 xs12>
                      <form @submit.prevent="onCreateSoilSample">
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
                                  name="sampleNumber"
                                  label="Sample number"
                                  id="sampleNumber"
                                  v-model="sampleNumber"
                                  required
                                ></v-text-field>
                              </v-flex>
                          </v-layout>
                          <v-layout row>
                              <v-flex xs12 md10>
                                <v-menu
                                  lazy
                                  :close-on-content-click="false"
                                  v-model="menu"
                                  transition="scale-transition"
                                  offset-y
                                  full-width
                                  :nudge-right="40"
                                  max-width="290px"
                                  min-width="290px"
                                >
                                  <v-text-field
                                    slot="activator"
                                    label="Sample date"
                                    v-model="sampleDate"
                                    prepend-icon="event"
                                    readonly
                                  ></v-text-field>
                                  <v-date-picker v-model="sampleDate" no-title scrollable actions>
                                    <template scope="{ save, cancel }">
                                      <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn flat color="primary" @click="cancel">Cancel</v-btn>
                                        <v-btn flat color="primary" @click="save">OK</v-btn>
                                      </v-card-actions>
                                    </template>
                                  </v-date-picker>
                                </v-menu>
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
                              <v-text-field
                                name="fieldTech"
                                label="Field tech"
                                id="fieldTech"
                                v-model="fieldTech"
                                required>
                              </v-text-field>
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
        sampleNumber: '',
        sampleDate: '',
        fieldTech: '',
        menu: false
      }
    },
    computed: {
      borehole () {
        return this.$store.getters.getBoreholeData
      },
      project () {
        return this.$store.getters.currentProject
      }
    },
    methods: {
      onCreateSoilSample () {
        const soilSample = {
          project_id: this.$route.params.id,
          datapoint_id: this.$route.params.bh,
          data: {
            depth_from: this.depthFrom,
            depth_to: this.depthTo,
            number: this.sampleNumber,
            date: this.sampleDate,
            field_tech: this.fieldTech
          }
        }
        console.log(soilSample)
        this.$store.dispatch('addSoilSample', soilSample)
      }
    }
  }
</script>