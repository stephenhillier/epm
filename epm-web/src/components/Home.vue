<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card>
                    <v-card-title dark class="primary info--text">
                        Welcome back, {{ user }}!
                    </v-card-title>
                    <v-card-text class="primary--text">
                      What's new since you've been gone?
                      <v-list three-line>

                        <v-list-tile avatar>
                          <v-list-tile-avatar>
                            <v-icon primary>announcement</v-icon>
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
                            <v-icon primary>add_to_queue</v-icon>
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
        </v-layout>

    </v-container>
</template>

<script>
  export default {
    computed: {
      user () {
        return 'Steve'
      }
    }
  }
</script>