<template>
  <div id="app">
        <navigation  v-if='!loggedIn'></navigation>
        <navigationLogIn v-if='loggedIn'></navigationLogIn>

        <!-- Render the content of the current page view -->
        <router-view/>
  </div>
</template>

<script>
import Navigationbar from './components/navigation/NavBar'
import NavigationbarLogIn from './components/navigation/NavBarLogIn'
export default {
  components: {
    navigation: Navigationbar,
    navigationLogIn: NavigationbarLogIn
  },
  computed: { loggedIn() { return this.$store.state.account.status.currentUser } }
}
</script>

<style>
@import "./assets/StyleSheet.css";
</style>
