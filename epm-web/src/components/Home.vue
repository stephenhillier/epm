<template>
    <v-container>
        <v-layout>
          <v-flex xs12 md11 hidden-xs-only hidden-sm-only class="pa-2">
            <v-card tile>
          <v-parallax src="/static/projects/roundabout.jpg" height=250 md10>
              <v-layout row><v-spacer></v-spacer></v-layout>
              <v-layout row align-center justify-center class="mt-5">
                <v-spacer></v-spacer>
                <img src="/static/projects/epm_outline_w.png" height=100 class="mt-5">
              </v-layout>
            </v-parallax></v-card>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12 md8>
                <v-layout row wrap>
                  <v-flex class="pa-2">
                    <v-card>
                        <v-card-title dark class="primary info--text body-2">
                            Welcome, {{ user }}!
                        </v-card-title>
                        <v-card-text class="primary--text">
                          What's new since you've been gone?
                          <v-list three-line>

                            <v-list-tile avatar>
                              <v-list-tile-avatar>
                                <v-icon secondary>announcement</v-icon>
                              </v-list-tile-avatar>
                              <v-list-tile-content>
                                <v-list-tile-title class="primary--text">
                                  Review
                                </v-list-tile-title>
                                <v-list-tile-sub-title class="grey--text text--darken-2">
                                  You have 6 new items to review.<br>
                                  <span class="caption accent--text">(feature coming soon!)</span>
                                </v-list-tile-sub-title>
                              </v-list-tile-content>
                            </v-list-tile>
                            <v-list-tile avatar>
                              <v-list-tile-avatar>
                                <v-icon secondary>add_to_queue</v-icon>
                              </v-list-tile-avatar>
                              <v-list-tile-content>
                                <v-list-tile-title class="primary--text">
                                  New projects
                                </v-list-tile-title>
                                <v-list-tile-sub-title class="grey--text text--darken-2">
                                  You've been added to 3 new projects.<br>
                                  <span class="caption accent--text">(feature coming soon!)</span>
                                </v-list-tile-sub-title>
                              </v-list-tile-content>
                            </v-list-tile>
                          </v-list>
                          <v-btn secondary to="/myprojects/">Project List</v-btn> 
                        </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex class="pa-2">
                    <v-card>
                        <v-card-title dark class="primary info--text body-2">
                            Quick start
                        </v-card-title>
                        <v-card-text class="grey--text text--darken-3">
                          <p class="subheading primary--text"><v-icon secondary class="pr-2">new_releases</v-icon>Getting started with Earthworks PM</p>
                          <p>Earthworks PM is a powerful data management platform designed to be intuitive and easy to use. 
                            Boreholes, instrumentation, soil/aggregate samples, and lab testing data are all organized by project.</p>
                          <p>Most of the features of Earthworks PM are accessible through the main menu on the left sidebar. 
                            To get started, use the Project List to select a project. From there, you can also create a new project.
                          </p>
                          <p>Once a project has been selected, you can start adding data. For data points like boreholes and instrumentation that have a specific location, you will be prompted for coordinates (WGS84).</p>
                        </v-card-text>
                    </v-card>
                  </v-flex>
                </v-layout>
            </v-flex>
            <v-flex md3 class="hidden-xs-only pa-2" v-if="latestProjects.length">
              <v-card>
                <v-card-title dark class="primary info--text">
                  Latest projects:
                </v-card-title>
                <v-card-text>
                    <v-list dense v-if="latestProjects">
                      <v-list-tile v-for="item in latestProjects" :key="item.id" router :to="'/myprojects/'+item.id">
                        <v-list-tile-content class="primary--text">{{ item.number }} - {{ item.name }}</v-list-tile-content>
                      </v-list-tile>
                    </v-list>
                  <v-btn secondary to="/myprojects/">See all</v-btn>  
                </v-card-text>
              </v-card>
            </v-flex>
        </v-layout>

    </v-container>
</template>

<script>
  export default {
    computed: {
      user () {
        return this.$store.getters.getUser
      },
      latestProjects () {
        console.log(this.$store.getters.latestProjects)
        return this.$store.getters.latestProjects
      }
    },
    created () {
      this.clearProject()
      if (!this.$store.getters.myProjects) {
        this.$store.dispatch('loadProjects')
      }
    },
    mounted () {
      this.clearProject()
      this.$store.dispatch('loadProjects')
    },
    methods: {
      clearProject () {
        this.$store.dispatch('clearCurrentProject')
      }
    }
  }
</script>