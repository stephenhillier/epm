<template>
    <v-container>
        <v-layout row wrap class="text-xs-center mb-2" v-if="loading">
                <div>
                    <v-progress-circular indeterminate v-bind:size="50" class="primary--text"></v-progress-circular>

                    <v-progress-circular indeterminate v-bind:width="3" class="red--text"></v-progress-circular>

                    <v-progress-circular indeterminate v-bind:size="70" v-bind:width="7" class="purple--text"></v-progress-circular>

                    <v-progress-circular indeterminate v-bind:width="3" class="green--text"></v-progress-circular>

                    <v-progress-circular indeterminate v-bind:size="50" class="amber--text"></v-progress-circular>
                </div>
        </v-layout>
        <v-layout row wrap v-for="project in projects" :key="project.id" class="mb-2" v-if="!loading">
            <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
                <v-card class="info">
                    <v-container fluid>
                        <v-layout>
                            <v-flex xs5 sm4 md3>
                                <v-card-media
                                :src="project.imageUrl"
                                height="130px"
                                contain></v-card-media>
                            </v-flex>
                            <v-flex xs7 sm8 md9>
                                <v-card-title primary-title class="primary--text">
                                        {{ project.title }} ({{ project.date | date }})
                                </v-card-title>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <div><v-btn secondary flat :to="'/projects/' + project.id">
                                        <v-icon left>arrow_forward</v-icon>
                                        View Project</v-btn></div>
                                </v-card-actions>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  export default {
    computed: {
      projects () {
        return this.$store.getters.loadedProjects
      },
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>