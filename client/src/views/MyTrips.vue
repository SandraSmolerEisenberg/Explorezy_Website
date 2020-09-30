<template>
  <div>
    <b-container>
      <h2>My Trips</h2>
      <hr/>
      <div v-if="loggedIn">
        <b-button @click="createTripForm">{{buttonText}}</b-button>
        <hr/>
        <CreateTripForm v-if="form" @update="getAllTrips"></CreateTripForm>
      </div>
      <b-card v-for="trip in trips" :key="trip._id">
        <SingleTrip  :trip="trip"></SingleTrip>
        <b-button v-if="currentUser" @click="deleteTrip(trip)">Delete</b-button>
      </b-card>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import TripService from '@/services/TripService'
import CreateTripForm from '@/components/trips/CreateTripForm'
import SingleTrip from '@/components/trips/SingleTrip'
export default {
  name: 'trips',
  data() {
    return {
      buttonText: '',
      trips: [],
      form: false
    }
  },
  mounted() {
    this.getAllTrips()
    this.buttonText = 'Create New Trip'
  },
  computed: {
    currentUser() {
      return this.$store.state.account.user && this.trips.user === this.$store.state.account.user._id
    },
    loggedIn() { return this.$store.state.account.status.currentUser }
  },
  components: {
    CreateTripForm, SingleTrip
  },
  methods: {
    getAllTrips() {
      TripService.getAllTrips().then(
        response => {
          this.trips = response.data.trips
        }
      )
    },
    createTripForm() {
      this.form = !this.form
      this.buttonText = this.form ? 'Minimize' : 'Create New Post'
    },
    deleteTrip(trip) {
      TripService.deleteTrip(trip).then(() => {
        this.getAllTrips()
      })
    }
  }
}
</script>

<style>
.btn_message {
  margin-bottom: 1em;
}
</style>
