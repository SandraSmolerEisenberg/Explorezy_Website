<template>
  <div>
    <b-jumbotron header="Welcome to Explorezy" lead="Explore exiting places!">
    </b-jumbotron>
      <b-row class="col-md">
        <b-col  v-show="places">
          <b-card-header>Places</b-card-header>
          <PlaceBaseView v-for="place in places" :key="place._id" :place="place"></PlaceBaseView>
        </b-col>
        <b-col v-show="posts" >
          <b-card-header>Posts</b-card-header>
          <SinglePostLessText v-for="post in posts" :key="post._id" :post="post"></SinglePostLessText>
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
  components: {
    PlacePreview
  },
  data() {
    return {
      message: 'none',
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
    getAllPlaces() {
      PlacesService.getAllPlaces().then(
        response => {
          this.places = response.data.places
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
        }
      )
    }
  }
}
</script>

<style>
.btn_message {
  margin-bottom: 1em;
}
</style>
