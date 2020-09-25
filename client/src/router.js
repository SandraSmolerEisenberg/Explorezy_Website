import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Places from './views/Places.vue'
import Posts from './views/Posts.vue'
import MyTrips from './views/MyTrips.vue'
import MyFavourites from './views/MyFavourites.vue'
import LogIn from './views/LogIn.vue'
import Profile from './views/Profile.vue'
import Register from './views/Register.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/places',
      name: 'places',
      component: Places
    },
    {
      path: '/posts',
      name: 'posts',
      component: Posts
    },
    {
      path: '/mytrips',
      name: 'mytrips',
      component: MyTrips
    },
    {
      path: '/myfavourites',
      name: 'myfavourites',
      component: MyFavourites
    },
    {
      path: '/login',
      name: 'login',
      component: LogIn
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})
