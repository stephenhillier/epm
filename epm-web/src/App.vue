<template>
  <v-app>
    <v-navigation-drawer
    persistent
    clipped
    enable-resize-watcher
    height="100%"
    v-model="drawer"
    v-if="user">
      <v-list class="mt-3">
        <v-list-tile v-for="item in menuItems" :key="item.title" router :to="item.link">
          <v-list-tile-action>
            <v-icon primary>
              {{ item.icon }}
            </v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="primary--text">{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list dense v-if="currentProject">
        <v-subheader class="subheading accent--text">{{ currentProject.name }}</v-subheader>
        <v-list-tile v-for="item in projectItems" :key="item.title" router :to="item.link">
          <v-list-tile-content class="primary--text">{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-divider class="hidden-sm-and-up"></v-divider>
      <v-list>
        <v-list-tile class="hidden-sm-and-up">
          <v-list-tile-content class="primary--text" @click="handleLogout">Log out</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed class="info">
      <v-toolbar-side-icon v-if="user" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title style="margin-bottom: -10px">
        <img src="/static/projects/epm.png" height="30" style="margin-bottom: -3px">
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn v-if="!user" flat class="primary--text" router to="/login">
          Log in
        </v-btn>
        <v-btn v-if="user" flat class="primary--text" @click="handleLogout">
          Log out
        </v-btn>
      </v-toolbar-items>

    </v-toolbar>
    <main>
      <v-container fluid class="grey lighten-4">
        <router-view></router-view>
      </v-container>
    </main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        drawer: true
      }
    },
    computed: {
      user () {
        return this.$store.getters.getUser
      },
      menuItems () {
        let menuItems = [
          { title: 'Home', icon: 'dashboard', link: '/' },
          { title: 'Project list', icon: 'view_list', link: '/myprojects' }
        ]
        if (this.currentProject) {
          menuItems = [
          { title: 'Back to home', icon: 'dashboard', link: '/' },
          { title: 'Change project', icon: 'view_list', link: '/myprojects' }
          ]
        }
        return menuItems
      },
      currentProject () {
        return this.$store.getters.currentProject
      },
      projectItems () {
        let projectItems = null
        if (this.currentProject) {
          projectItems = [
            { title: 'Project overview', link: '/myprojects/' + this.currentProject.id },
            { title: 'Boreholes', link: { name: 'BoreholeList', params: { id: this.currentProject.id } } },
            { title: 'Instrumentation', link: { name: 'InstrumentList', params: { id: this.currentProject.id } } },
            { title: 'Lab testing', link: { name: 'SampleList', params: { id: this.currentProject.id } } }
          ]
        }
        return projectItems
      }
    },
    methods: {
      handleLogout () {
        this.$store.dispatch('userLogout')
      }
    }
  }
</script>
