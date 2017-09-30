<template>
  <v-app>
    <main class="white">
      <v-navigation-drawer temporary v-model="sideNav">
        <v-list>
          <v-list-tile 
              v-for="item in menuItems" 
              :key="item.title"
              router
              :to="item.link">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>{{ item.title }}</v-list-tile-content>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>exit_to_app</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              Logout
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
      <v-toolbar flat dense class="grey lighten-4 primary--text">
        <v-toolbar-side-icon 
          @click.native.stop="sideNav = !sideNav"
          class="hidden-sm-and-up"></v-toolbar-side-icon>
        <v-toolbar-title><router-link to="/" tag="span" style="cursor: pointer"><img src="/static/projects/epm.png" height="40px" style="padding-top:10px; margin-bottom:-5px"></router-link></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only">
          <v-btn 
          flat 
          v-for="item in menuItems"
          :key="item.title"
          router
          :to="item.link"
          class="primary--text">
          <v-icon left>{{ item.icon }}</v-icon>
            {{ item.title }}
          </v-btn>
          <v-btn flat>
            <v-icon>exit</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-divider></v-divider>
      <router-view></router-view>

    </main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        sideNav: false
      }
    },
    computed: {
      menuItems () {
        let menuItems = [
          { icon: 'face', title: 'Sign Up', link: '/signup' },
          { icon: 'lock_open', title: 'Sign In', link: '/signin' }
        ]
        if (this.userIsAuthenticated) {
          menuItems = [
            { icon: 'view_list', title: 'Project List', link: '/projects' },
            { icon: 'room', title: 'New Project', link: '/newproject' },
            { icon: 'person', title: 'Profile', link: '/profile' }
          ]
        }
        return menuItems
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    }
  }
</script>
