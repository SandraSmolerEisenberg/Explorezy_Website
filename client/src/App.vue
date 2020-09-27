<template>
  <div id="app">
        <navigation v-if='!loggedIn'></navigation>
        <navigationLogIn v-if='loggedIn'></navigationLogIn>

        <!-- Render the content of the current page view -->
        <router-view/>
  </div>
</template>

<script>
import Navigationbar from './components/NavBar'
import NavigationbarLogIn from './components/NavBarLogIn'
export default {
  components: {
    navigation: Navigationbar,
    navigationLogIn: NavigationbarLogIn
  },
  computed: { loggedIn() { return this.$store.state.account.status.currentUser } }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#navbarImg {
  max-width: 5em;
  height: auto;
}
</style>
