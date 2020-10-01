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
    getTrips() {
      TripService.getAllPublicTrips().then(response => {
        this.trips = response.data.trips
        if (this.trips.length === 0) {
          this.message = 'There are currently no public trips'
        }
      }).catch(() => {
        this.message = 'Trips are not avaliable at this time'
      })
    }
  }
}
</script>

<style scoped>

</style>
