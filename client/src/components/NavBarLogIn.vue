<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand>
            <router-link to="/">
                <b-img id="navbarImg" :src="require('../assets/logo-and-text.png')"></b-img>
            </router-link>
            </b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item><router-link to="/places">Places</router-link></b-nav-item>
                <b-nav-item><router-link to="/posts">Posts</router-link></b-nav-item>
                <b-nav-item><router-link to="/mytrips">My Trips</router-link></b-nav-item>
                <b-nav-item><router-link to="/myfavourites">My Favourites</router-link></b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
                    <template v-slot:button-content>
                        <em>{{currentUser}}</em>
                    </template>
                    <b-dropdown-item><router-link to="/profile">Profile</router-link></b-dropdown-item>
                    <b-dropdown-item @click="loggOut">Logg Out</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
export default {
  name: 'navigationBarLogIn',
  computed: { currentUser() { return this.$store.state.account.user[0].first_name || 'Profile' } },
  methods: {
    loggOut() {
      this.$store.dispatch('account/loggOut')
      this.$router.push('/')
    }
  }
}
</script>
