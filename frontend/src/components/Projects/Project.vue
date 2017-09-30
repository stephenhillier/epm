<template>
  <v-container>
      <v-layout row wrap>
        <v-flex xs12>
            <v-card>
                <v-card-title>
                    <h6 class="primary--text">{{ project.title }}</h6>
                </v-card-title>
                <v-card-media
                :src="project.imageUrl" height="130px">
                </v-card-media>
                <v-card-text>
                    <div class="accent--text">{{ project.location }} ({{ project.date | date }})</div>
                    <div class="primary--text">
                    {{ project.description }}
                    </div>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn secondary>Go to project</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
      </v-layout>
  </v-container>
</template>
<script>
  export default {
    props: ['id'],
    computed: {
      project () {
        return this.$store.getters.loadedProject(this.id)
      }
    }
  }
</script>