<template>
<b-container>
  <label class="col-md-3">Choose a trip:</label>
  <b-form-select class="custom-select my-1 col-md-8" v-model="tripSelected" >
    <option v-for="trip in trips" :key="trip._id">
      {{ trip.name }}
    </option>
  </b-form-select>
  <hr/>
  <div v-show="message">
    <b-card-header>{{message}}</b-card-header>
    <hr/>
  </div>
  <b-row v-show="selected">
    <b-card role="button" @click="addToTrip(place)" class="card-size" v-for="place in places" :key="place._id">
      <b-card-header>{{place.name}}</b-card-header>
      <b-img class="plain" :src=place.image></b-img>
    </b-card>
  </b-row>
</b-container>
</template>

<script>
import PlacesService from '@/services/PlacesService'
import TripService from '@/services/TripService'
export default {
  name: 'AddPlaceToTripForm',
  props: ['trips'],
  data() {
    return {
      tripSelected: {},
      places: [],
      message: ''
    }
  },
  computed: {
    selected() {
      return this.trips.find(obj => { return obj.name === this.tripSelected })
    }
  },
  mounted() {
    this.getPlaces()
  },
  methods: {
    getPlaces() {
      PlacesService.getAllPlaces().then(response => {
        this.places = response.data.places
      })
    },
    resetData() {
      this.message = ''
    },
    addToTrip(place) {
      const trip = this.trips.find(obj => { return obj.name === this.tripSelected })
      TripService.addPlaceToTrip(trip._id, place._id).then(response => {
        if (response) {
          this.message = 'Added ' + place.name
        }
      })
    }
  }
}
</script>

<style scoped>
.card-size {
  max-width: 20em;
}
</style>
