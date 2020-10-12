<template>
  <div>
    <b-jumbotron id="jumbotron" header="Welcome to Explorezy" lead="Explore exiting places!">
    </b-jumbotron >
      <b-row class="col-md">
        <b-col  v-show="places">
          <b-card-header>Places</b-card-header>
          <PlaceBaseView v-for="place in places" :key="place._id" :place="place"></PlaceBaseView>
          <b-button class="buttonColor" @click="viewPlaces">View All Places</b-button>
        </b-col>
        <b-col v-show="posts" >
          <b-card-header>Posts</b-card-header>
          <b-card-text v-if="postMessage">{{postMessage}}</b-card-text>
          <SinglePostLessText v-for="post in posts" :key="post._id" :post="post"></SinglePostLessText>
          <b-button class="buttonColor" v-if="!postMessage" @click="viewPosts">View All Posts</b-button>
        </b-col>
      </b-row>
  </div>
</template>

<script>
// @ is an alias to /src
import PlacesService from '@/services/PlacesService'
import PlaceBaseView from '@/components/places/PlaceBaseView'
import PostService from '@/services/PostService'
import SinglePostLessText from '@/components/post/SinglePostLessText'

export default {
  name: 'home',
  data() {
    return {
      message: 'none',
      postMessage: '',
      places: [],
      posts: []
    }
  },
  components: {
    PlaceBaseView, SinglePostLessText
  },
  mounted() {
    this.getAllPlaces()
    this.getAllPosts()
  },
  methods: {
    viewPlaces() {
      this.$router.push('/places').catch(error => {
        console.log(error.message)
      })
    },
    viewPosts() {
      this.$router.push('/posts').catch(error => {
        console.log(error.message)
      })
    },
    getAllPlaces() {
      PlacesService.getAllPlaces().then(
        response => {
          this.places = response.data.places
          this.places = this.places.slice(0, 10)
        },
        error => {
          this.places = []
          this.message = error.toString()
        }
      )
    },
    getAllPosts() {
      PostService.getAllPosts().then(
        response => {
          this.posts = response.data.posts
          if (this.posts.length <= 0) {
            this.postMessage = 'There are no posts written yet'
          } else {
            this.posts = this.posts.slice(0, 10)
          }
        }
      )
    }
  }
}
</script>

<style>

</style>
