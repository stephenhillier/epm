<template>
    <v-container>
        <v-layout row wrap class="mb-2">
            <v-flex xs12 sm6 class="text-xs-center text-sm-right">
                <v-btn secondary large router to="/projects/">Explore projects</v-btn>
            </v-flex>
            <v-flex xs12 sm6 class="text-xs-center text-sm-left">
                <v-btn secondary large router to="/newproject">New project</v-btn>
            </v-flex>
        </v-layout>
        <v-layout v-if="loading">
            <v-flex xs12 class="text-xs-center">
                <div>
                    <v-progress-circular indeterminate v-bind:size="50" class="primary--text"></v-progress-circular>

                    <v-progress-circular indeterminate v-bind:width="3" class="red--text"></v-progress-circular>

                    <v-progress-circular indeterminate v-bind:size="70" v-bind:width="7" class="purple--text"></v-progress-circular>

                    <v-progress-circular indeterminate v-bind:width="3" class="green--text"></v-progress-circular>

                    <v-progress-circular indeterminate v-bind:size="50" class="amber--text"></v-progress-circular>
                </div>
            </v-flex>
        </v-layout>
        <v-layout row wrap v-if="!loading">
            <v-flex xs12>
                <v-carousel>
                    <v-carousel-item
                    v-for="project in projects"
                    v-bind:src="project.imageUrl"
                    :key="project.id"
                    @click="onLoadProject(project.id)">
                    <div class="title">
                        {{ project.title }}
                    </div>
                    </v-carousel-item>
                </v-carousel>
           </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
      computed: {
        projects () {
          return this.$store.getters.featuredProjects
        },
        loading () {
          return this.$store.getters.loading
        }
      },
      methods: {
        onLoadProject (id) {
          this.$router.push('/projects/' + id)
        }
      }
    }

</script>

<style scoped>
  .title {
      position: absolute;
      bottom: 50px;
      background-color: rgba(0,0,0,0.5);
      color: white;
      font-size: 2em;
      padding: 20px;
  }
</style>