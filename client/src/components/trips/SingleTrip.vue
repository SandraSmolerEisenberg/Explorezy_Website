<template>
  <b-container>
      <span class="placeHeading">{{trip.name}}</span>
      <hr/>
      <b-card-text v-if="message">{{message}}</b-card-text>
      <b-card-text>
        <span class="placeHeading">Places added to {{trip.name}}</span>
        <hr>
        <b-row>
       <b-card class="card-size-my-trips" v-for="place in places" :key="place._id">
         <span class="placeHeading">{{place.name}}</span>
         <br>
         <b-img class="tinyImgClass" :src=place.image></b-img>
         <b-card-text>{{place.wikipedia_extracts.text}}</b-card-text>
       </b-card>
        </b-row>
      </b-card-text>
      <hr/>
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
      for (let i = 0; i < this.trip.places.length; i++) {
        TripService.getPlaceFromTrip(this.trip._id, this.trip.places[i]).then(
          response => {
            this.places.push(response.data.place)
          }
        ).catch(error => {
          console.log(error.toString())
          this.message = 'Your request could not be prosed at this time'
        })
      }
    }
  }
}
</script>
<style scoped>

</style>
