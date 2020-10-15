<template>
  <div>
    <br><br>
    <b-jumbotron id="jumbotron" header="Welcome to Explorezy" lead="Explore exiting places!"></b-jumbotron >
    <b-img class="mobile-homepage-img" :src="require('../assets/text.png')"></b-img>
      <b-row align-content="center" class="col-md">
        <b-col  v-show="places">
          <h3>Places</h3>
          <hr>
          <b-card-text v-if="message">{{message}}</b-card-text>
          <PlaceBaseView class="tiny-place-styling" v-for="place in places" :key="place._id" :place="place"></PlaceBaseView>
          <b-button class="button-styling" v-if="!message" @click="viewPlaces">View All Places</b-button>
        </b-col>
        <b-col class="home-page-posts" v-show="posts" >
          <h3>Posts</h3>
          <hr>
          <b-card-text v-if="postMessage">{{postMessage}}</b-card-text>
          <SinglePostLessText v-for="post in posts" :key="post._id" :post="post"></SinglePostLessText>
          <b-button class="button-styling" v-if="!postMessage" @click="viewPosts">View All Posts</b-button>
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
      message: '',
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
        }
      ).catch(error => {
        this.places = []
        this.message = 'Could not retrieve the places in New York'
        console.log(error.toString())
      })
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
      ).catch(error => {
        this.postMessage = 'Could not retrieve the posts'
        console.log(error.toString())
      })
    }
  }
}
</script>

<style>

</style>
