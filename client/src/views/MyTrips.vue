<template>
    <b-container>
      <h2>My Trips</h2>
      <hr/>
      <b-tabs content-class="mt-3">
        <b-tab @click="getAllTrips" title="My Trips" active>
          <b-card v-for="trip in trips" :key="trip._id">
          <SingleTrip  :trip="trip"></SingleTrip>
          <b-button v-if="currentUser"  @click="deleteTrip(trip)">Delete</b-button>
          </b-card>
          <b-button v-if="currentUser"  @click="deleteAllTrips()">Delete All Trips</b-button>
          <b-card-text v-if="message">{{message}}</b-card-text>
        </b-tab>
        <b-tab title="Create Trip" @click="clearMessage">
            <CreateTripForm ref="createTripTab"></CreateTripForm>
        </b-tab>
        <b-tab title="Add Places to trip" @click="clearMessagePlaceTab">
          <AddPlaceToTripForm ref="addPlaceTab" :trips="trips"></AddPlaceToTripForm>
        </b-tab>
      </b-tabs>

    </b-container>

</template>

<script>
// @ is an alias to /src
import TripService from '@/services/TripService'
import CreateTripForm from '@/components/trips/CreateTripForm'
import SingleTrip from '@/components/trips/SingleTrip'
import AddPlaceToTripForm from '@/components/trips/AddPlaceToTripForm'
export default {
  name: 'trips',
  data() {
    return {
      message: '',
      trips: [],
      form: false
    }
  },
  mounted() {
    this.getAllTrips()
  },
  computed: {
    currentUser() {
      return this.$store.state.account.status.currentUser && this.trips.length > 0
    },
    loggedIn() { return this.$store.state.account.status.currentUser }
  },
  components: {
    CreateTripForm, SingleTrip, AddPlaceToTripForm
  },
  methods: {
    clearMessagePlaceTab() {
      this.$refs.addPlaceTab.resetData()
    },
    clearMessage() {
      this.$refs.createTripTab.resetData()
    },
    getAllTrips() {
      TripService.getAllTrips().then(
        response => {
          this.trips = response.data.trips
        }
      )
    },
    deleteTrip(trip) {
      const payload = {}
      const id = this.$store.state.account.user._id
      payload.userID = id
      payload.tripID = trip._id
      this.$store.dispatch('account/deleteOneTrip', payload).then(
        () => {
          this.message = 'Your trip have been deleted'
          this.getAllTrips()
        },
        error => {
          this.message = error.response.data.message
        }
      )
    },
    deleteAllTrips() {
      const id = this.$store.state.account.user._id
      this.$store.dispatch('account/deleteTrips', id).then(
        () => {
          this.message = 'Your trips have been deleted'
          this.getAllTrips()
        },
        error => {
          this.message = error.response.data.message
        }
      )
    }
  }
}
</script>

<style>
.btn_message {
  margin-bottom: 1em;
}
</style>
