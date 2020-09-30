<template>
  <div>
    <b-jumbotron header="Welcome to Explorezy" lead="Explore exiting places!">
      <b-button variant="danger" @click="database">Close</b-button>
    </b-jumbotron>
      <b-row class="col-md">
        <b-col class="col-md-6" v-if="places">
          <b-card-header>Places</b-card-header>
          <b-container v-for="place in places" :key="place._id">
            <div>
              <place-preview v-bind:place="place"></place-preview>
            </div>
          </b-container>
        </b-col>
        <b-col class="col-md-6">Right</b-col>
      </b-row>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import PlacesService from '@/services/PlacesService'
import PlacePreview from '@/components/places/PlacePreview.vue'

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
  mounted() {
    this.getAllPlaces()
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
    getMessage() {
      Api.get('/')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    },
    database() {
      for (var i = 0; i < this.array.length; i++) {
        Api.post('/places', this.array[i])
      }
    }
  }
}
</script>

<style>
.btn_message {
  margin-bottom: 1em;
}
</style>
