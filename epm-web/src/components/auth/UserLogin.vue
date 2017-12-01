<template>
<div>
  <v-layout row wrap>
    <v-flex md4 sm6 xs12 offset-md4 offset-sm3 >
      <v-card>
        <v-card-title dark class="primary info--text">
          Login:
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex md2 sm6 xs12>
              <form @submit.prevent="onUserLogin">
                  <v-layout row>
                      <v-flex>
                          <v-text-field
                          name="username"
                          label="Username:"
                          id="number"
                          v-model="username"
                          required></v-text-field>
                      </v-flex>
                  </v-layout>
                  <v-layout row>
                      <v-flex>
                          <v-text-field
                          name="password"
                          label="Password"
                          id="password"
                          type="password"
                          v-model="password"
                          required></v-text-field>
                      </v-flex>
                  </v-layout>
                  <v-layout row>
                    <v-flex>
                      <v-btn secondary type="submit">Login</v-btn>
                    </v-flex>
                  </v-layout>
              </form>
            </v-flex>
          </v-layout>  
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
  <v-layout row wrap>
    <v-flex md4 sm6 xs12 offset-md4 offset-sm3>
      <v-alert v-if="error" warning icon="warning" value="true">
      {{ error }}
    </v-alert>
    </v-flex>
  </v-layout>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  computed: {
    error () {
      return this.$store.getters.getError
    }
  },
  methods: {
    onUserLogin () {
      var credentials = {
        username: this.username,
        password: this.password
      }
      this.$store.dispatch('userLogin', credentials)
    }
  }
}
</script>

<style>

</style>
