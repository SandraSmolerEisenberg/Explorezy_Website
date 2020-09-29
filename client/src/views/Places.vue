<template>
  <div>
    <b-jumbotron header="Places" lead="Explore exiting places in Gothenburg!">
    </b-jumbotron>
      <b-row class="col-md">
        <b-col v-if="places">
          <b-card-header>Details</b-card-header>
          <b-container v-for="place in places" :key="place.id">
            <PlacesDetailedView :place="place" v-if="details" v-on:close="closeDetailedView">
            </PlacesDetailedView>
          </b-container>
        </b-col>
      </b-row>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'
import PlacesDetailedView from '../components/places/PlacesDetailedView'
import PlacesService from '@/services/PlacesService'

export default {
  name: 'places',
  data() {
    return {
      message: 'none',
      places: [],
      details: false
    }
  },
  components: {
    PlacesDetailedView
  },
  mounted() {
    this.getAllPlaces()
  },
  methods: {
    getMessage() {
      Api.get('/places')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    },
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
    closeDetailedView() {
      this.details = true
    }
  }
}
</script>

<style>
.btn_message {
  margin-bottom: 1em;
}
</style>
