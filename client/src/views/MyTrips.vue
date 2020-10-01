<template>
  <div>
    <b-container>
      <h2>My Trips</h2>
      <hr/>
      <b-tabs content-class="mt-3">
        <b-tab @click="getAllTrips" title="My Trips" active>
          <b-card v-for="trip in trips" :key="trip._id">
          <SingleTrip  :trip="trip"></SingleTrip>
          <b-button v-if="currentUser" @click="deleteTrip(trip)">Delete</b-button>
          </b-card>
        </b-tab>
        <b-tab title="Create Trip" @click="clearMessage">
            <CreateTripForm ref="createTripTab"></CreateTripForm>
        </b-tab>
        <b-tab title="Add Places to trip" @click="clearMessagePlaceTab">
          <AddPlaceToTripForm ref="addPlaceTab" :trips="trips"></AddPlaceToTripForm>
        </b-tab>
      </b-tabs>

    </b-container>
  </div>
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
      trips: [],
      form: false
    }
  },
  mounted() {
    this.getAllTrips()
  },
  computed: {
    currentUser() {
      return this.$store.state.account.user && this.trips.user === this.$store.state.account.user._id
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
