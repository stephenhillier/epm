export default {
  computed: {
    project () {
      var project = this.$store.getters.currentProject
      if (!project) {
        return {}
      } else {
        return project
      }
    }
  }
}
