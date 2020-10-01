<template>
  <div>
  <b-jumbotron header="Trips" lead="Public trips!">
  </b-jumbotron>
    <b-container>
      <b-card-text v-show="message">{{message}}</b-card-text>
      <b-card v-for="trip in trips" :key="trip._id">
        <SingleTrip :trip="trip"></SingleTrip>
      </b-card>
    </b-container>

  </div>
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
    this.checkTrips()
  },
  methods: {
    checkTrips() {
      if (this.trips.length <= 0) {
        this.message = 'There are no trips, log in and add trips to the list'
      }
    },
    getTrips() {
      TripService.getAllPublicTrips().then(response => {
        this.trips = response.data.trips
      }).catch(() => {
        this.message = 'Trips are not avaliable at this time'
      })
    }
  }
}
</script>

<style scoped>

</style>
