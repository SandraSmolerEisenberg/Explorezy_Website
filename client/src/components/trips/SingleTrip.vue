<template>
  <b-container>
      <h3>{{trip.name}}</h3>
      <br/>
      <b-card-text v-if="message">{{message}}</b-card-text>
      <b-card-text>
        <span class="placeHeading">Places added to {{trip.name}}</span>
        <br><br>
        <b-row>
       <b-card class="card-size-my-trips" v-for="place in places" :key="place._id">
         <span class="placeHeading">{{place.name}}</span>
         <br>
         <b-img class="tinyImgClass" :src=place.image></b-img>
         <b-card-text>{{place.wikipedia_extracts.text}}</b-card-text>
       </b-card>
        </b-row>
      </b-card-text>
      <br/>
  </b-container>
</template>
<script>
import TripService from '@/services/TripService'
export default {
  name: 'single-trip',
  props: ['trip'],
  data() {
    return {
      message: '',
      places: []
    }
  },
  mounted() {
    this.getPlaces()
  },
  methods: {
    getPlaces() {
      var errorCounter = 0
      for (let i = 0; i < this.trip.places.length; i++) {
        TripService.getPlaceFromTrip(this.trip._id, this.trip.places[i]).then(
          response => {
            this.places.push(response.data.place)
          }
        ).catch(error => {
          console.log(error.toString())
          errorCounter++
        })
        if (errorCounter > 0) {
          this.message = 'Your request could not be prosed at this time'
        }
      }
    }
  }
}
</script>
<style scoped>

</style>
