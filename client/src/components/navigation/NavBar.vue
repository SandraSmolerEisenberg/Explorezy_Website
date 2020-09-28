<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand>
                <router-link to="/">
                    <b-img id="navbarImg" :src="require('../../assets/logo-and-text.png')"></b-img>
                </router-link>
            </b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item><router-link to="/places">Places</router-link></b-nav-item>
                <b-nav-item><router-link to="/posts">Posts</router-link></b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-item><router-link to="/login">Login</router-link></b-nav-item>
                <b-nav-item><router-link to="/register">Register</router-link></b-nav-item>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
export default {
  name: 'navigationBar'
}
</script>
