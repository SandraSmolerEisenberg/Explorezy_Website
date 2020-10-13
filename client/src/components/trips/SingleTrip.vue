<template>
  <b-container>
    <b-card>
      <b-card-header>{{trip.name}}</b-card-header>
      <hr/>
      <b-card-text v-if="message">{{message}}</b-card-text>
      <b-card-text>
        <b-card-sub-title>Places on trip</b-card-sub-title>
        <b-row>
       <b-card class="card-size-my-trips" v-for="place in places" :key="place._id">
         <b-card-header>{{place.name}}</b-card-header>
         <b-img class="img" :src=place.image></b-img>
         <b-card-text>{{place.wikipedia_extracts.text}}</b-card-text>
       </b-card>
        </b-row>
      </b-card-text>
      <hr/>
    </b-card>
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
.card-size-my-trips {
  max-width: 30em;
}
.img{
  max-width: 28em;
  max-height: 30em;

}
</style>
