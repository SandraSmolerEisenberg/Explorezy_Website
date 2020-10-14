<template>
    <div>
        <b-navbar toggleable="lg" type="light" variant="light" fixed="top">
            <b-navbar-brand>
            <router-link to="/">
                <b-img id="navbarImg" :src="require('../../assets/logo-and-text.png')"></b-img>
            </router-link>
            </b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav >
                <b-nav-item><router-link class="router-link-text" to="/places">Places</router-link></b-nav-item>
                <b-nav-item><router-link class="router-link-text" to="/posts">Posts</router-link></b-nav-item>
                <b-nav-item><router-link class="router-link-text" to="/trips">Trips</router-link></b-nav-item>
                <b-nav-item><router-link class="router-link-text" to="/mytrips">My Trips</router-link></b-nav-item>
                <b-nav-item><router-link class="router-link-text" to="/myfavourites">My Favourites</router-link></b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                    <b-nav-item><router-link class="router-link-text" to="/profile">{{currentUser}}</router-link></b-nav-item>
              <b-nav-item @click="loggOut">
                <span class="router-link-text underline">Logout</span></b-nav-item>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
export default {
  name: 'navigationBarLogIn',
  computed: { currentUser() { return this.$store.state.account.user.first_name || 'Profile' } },
  methods: {
    loggOut() {
      this.$store.dispatch('account/loggOut')
      this.$router.push('/')
    }
  }
}
</script>
<style>

</style>
