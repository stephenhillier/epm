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
            <v-flex xs12 md8 class="pa-2">
                <v-card>
                    <v-card-title dark class="primary info--text">
                        Welcome back, {{ user }}!
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
                              You have 6 new items to review.
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
                              You've been added to 3 new projects.
                            </v-list-tile-sub-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </v-list>
                    </v-card-text>
                </v-card>
            </v-flex>
            <v-flex md3 class="hidden-xs-only pa-2" v-if="latestProjects">
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
        return this.$store.getters.latestProjects
      }
    },
    created () {
      this.clearProject()
    },
    mounted () {
      this.clearProject()
    },
    methods: {
      clearProject () {
        this.$store.dispatch('clearCurrentProject')
      }
    }
  }
</script>