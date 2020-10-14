<template>
<b-container>
  <label class="col-md-3">Choose a trip:</label>
  <b-form-select class="custom-select my-1 col-md-8" v-model="tripSelected" >
    <option v-for="trip in trips" :key="trip._id">
      {{ trip.name }}
    </option>
  </b-form-select>
  <br>
  <div v-show="message">
    <span>{{message}}</span>
    <br>
  </div>
  <b-row v-show="selected">
    <b-card role="button" v-show="placesList(place)" @click="addToTrip(place)" class="card-size-my-trips" v-for="place in places" :key="place._id">
      <span class="placeHeading">{{place.name}}</span>
      <b-img class="tinyImgClass" :src=place.image></b-img>
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
      return this.trips.find(obj => {
        return obj.name === this.tripSelected
      })
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

    placesList(place) {
      return (this.places && this.selected) ? !this.selected.places.includes(place._id) : true
    },
    resetData() {
      this.message = ''
    },
    addToTrip(place) {
      const trip = this.trips.find(obj => { return obj.name === this.tripSelected })
      TripService.addPlaceToTrip(trip._id, place._id).then(response => {
        if (response) {
          this.trips.find(obj => {
            if (obj.name === this.tripSelected) {
              obj.places.push(place._id)
            }
          })
          this.message = 'Added ' + place.name
        }
      }).catch(error => {
        this.message = 'Your request could not be prosed at this time'
        console.log(error.toString())
      })
    }
  }
}
</script>

<style scoped>
</style>
