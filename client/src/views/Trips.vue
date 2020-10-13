<template>
  <b-container>
    <h2>Trips shared by other users</h2>
    <hr/>
      <b-card-text v-show="message">{{message}}</b-card-text>
      <b-container v-for="trip in trips" :key="trip._id">
        <SingleTrip class="tripDesign" :trip="trip"></SingleTrip>
      </b-container>
  </b-container>
</template>

<script>
import SingleTrip from '@/components/trips/SingleTrip'
import TripService from '@/services/TripService'
export default {
  name: 'Trips',
  data() {
    return {
      trips: [],
      message: ''
    }
  },
  components: {
    SingleTrip
  },
  mounted() {
    this.getTrips()
  },
  methods: {
    getTrips() {
      TripService.getAllPublicTrips().then(response => {
        this.trips = response.data.trips
        if (this.trips.length === 0) {
          this.message = 'There are currently no public trips'
        }
      }).catch(error => {
        this.message = 'Could not retrieve the trips at this time'
        console.log(error.toString())
      })
    }
  }
}
</script>

<style scoped>

</style>
