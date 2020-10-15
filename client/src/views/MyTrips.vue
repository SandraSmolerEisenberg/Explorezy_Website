<template>
    <b-container>
      <h2>My Trips</h2>
      <hr/>
      <b-tabs class="tabsDesign" content-class="mt-3">
        <b-tab :title-link-class="'tabText'" @click="reloadData()" title="My Trips" active>
          <b-card-text v-if="errorMessage">{{errorMessage}}</b-card-text>
          <b-card-text v-if="message">{{message}}</b-card-text>
          <b-container class="tripDesign" v-for="trip in trips" :key="trip._id">
          <SingleTrip  :trip="trip"></SingleTrip>
          <b-button class="buttonColor" v-if="currentUser"  @click="deleteTrip(trip)">Delete</b-button>
          </b-container>
          <hr/>
          <b-button class="buttonColor" v-if="currentUser"  @click="deleteAllTrips()">Delete All Trips</b-button>
        </b-tab>
        <b-tab :title-link-class="'tabText'" title="Create" @click="clearMessage">
          <b-container>
            <CreateTripForm ref="createTripTab"></CreateTripForm>
          </b-container>
        </b-tab>
        <b-tab :title-link-class="'tabText'" title="Add Places" @click="clearMessagePlaceTab">
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
      errorMessage: '',
      trips: [],
      form: false
    }
  },
  mounted() {
    this.getAllUserTrips()
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
      this.getAllUserTrips()
    },
    clearMessage() {
      this.$refs.createTripTab.resetData()
      this.getAllUserTrips()
    },
    reloadData() {
      this.messaga = ''
      this.errorMessage = ''
      this.getAllUserTrips()
    },
    getAllUserTrips() {
      var userTrips = this.$store.state.account.user.trips
      this.trips = []
      for (var i = 0; i < userTrips.length; i++) {
        TripService.getTripByID(userTrips[i]).then(
          response => {
            this.trips.push(response.data)
          }
        ).catch(error => {
          console.log(error.toString())
          this.errorMessage = 'Could not get all trips'
        })
      }
    },
    deleteTrip(trip) {
      const payload = {}
      const id = this.$store.state.account.user._id
      payload.userID = id
      payload.tripID = trip._id
      this.$store.dispatch('account/deleteOneTrip', payload).then(
        () => {
          this.message = 'Your trip has been deleted'
          this.getAllUserTrips()
        },
        error => {
          this.message = error.response.data.message
        }
      ).catch(error => {
        this.message = 'Your request could not be processed at this time'
        console.log(error.toString())
      })
    },
    deleteAllTrips() {
      const id = this.$store.state.account.user._id
      this.$store.dispatch('account/deleteTrips', id).then(
        () => {
          this.message = 'Your trips has been deleted'
          this.getAllUserTrips()
        },
        error => {
          if (error.response) {
            this.message = error.response.data.message
          }
        }
      ).catch(error => {
        this.message = 'Your request could not be processed at this time'
        console.log(error.toString())
      })
    }
  }
}
</script>

<style>

</style>
