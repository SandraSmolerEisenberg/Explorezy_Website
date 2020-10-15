<template>
  <b-container>
    <h2>Explore exiting places in New York!</h2>
    <hr/>
    <b-card-text v-if="message">{{message}}</b-card-text>

    <b-row class="col-md">
        <b-col v-if="places" class="mobileView">
            <b-row>
              <b-col class="col-md">
                <b-container role="button" v-for="place in places" :key="place._id"  @click="showDetailedView(place)">
                  <PlaceBaseView class="tiny-place-styling tiny-place-hover" :place="place"></PlaceBaseView>
                </b-container>
              </b-col>
              <b-col v-if="details" class="col-md">
                <b-container class="place-detailed-view-styling">
                  <b-button-close @click="closeDetailedView"></b-button-close>
                  <b-button class="button-styling" @click="addToFavourite" v-show="isLoggedIn() && !hasFavPlace(selectedPlace)">Add to favourites</b-button>
                  <b-card-sub-title class="padding" v-show="isLoggedIn() && hasFavPlace(selectedPlace)">In my Favorite list</b-card-sub-title>
                  <PlacesDetailedView :place="selectedPlace"></PlacesDetailedView>
                </b-container>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-button class="button-styling" v-show="previousPage" @click="getPreviousPage">Previous</b-button>
                <b-button class="button-styling" v-show="nextPage" @click="getNextPage">Next</b-button>
              </b-col>
            </b-row>
        </b-col>
        <b-col class="showMobileView">
          <b-container>
            <div v-for="place in places" :key="place._id" role="tablist">
              <b-card no-body class="mb-1">
                <b-card-header class="p-0" role="tab">
                  <b-button block href="#" v-b-toggle="'accordion-' + place._id" class="accordion-styling">{{place.name}}</b-button>
                </b-card-header>
                <b-collapse :id="'accordion-' + place._id" accordion="my-accordion" role="tabpanel" @show="showDetailedView(place)">
                  <b-card-body>
                    <b-card-img :src=place.image class="tiny-img"></b-card-img>
                    <b-card-text>
                      <span class="heading">Address</span>
                      <p>City: {{place.address.county}};
                        Post Code: {{place.address.postcode}};
                        Road: {{place.address.road}};
                        County: {{place.address.county}}</p>
                    </b-card-text>
                    <span class="heading">Information</span>
                    <b-card-text>{{ place.wikipedia_extracts.text }}</b-card-text>
                    <b-button class="button-styling" @click="addToFavourite" v-show="isLoggedIn() && !hasFavPlace(selectedPlace)">Add to favourites</b-button>
                    <b-card-sub-title  v-show="isLoggedIn() && hasFavPlace(selectedPlace)">In my Favorite list</b-card-sub-title>
                  </b-card-body>
                </b-collapse>
              </b-card>
            </div>
          </b-container>
          <b-row>
            <b-col>
              <b-button class="button-styling" v-show="previousPage" @click="getPreviousPage">Previous</b-button>
              <b-button class="button-styling" v-show="nextPage" @click="getNextPage">Next</b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
  </b-container>
</template>

<script>
// @ is an alias to /src
import PlaceBaseView from '@/components/places/PlaceBaseView'
import PlacesDetailedView from '@/components/places/PlacesDetailedView'
import PlacesService from '@/services/PlacesService'

export default {
  name: 'places',
  data() {
    return {
      message: '',
      places: [],
      selectedPlace: {},
      details: false,
      currentPage: 1,
      nextPage: null,
      previousPage: null
    }
  },
  components: {
    PlaceBaseView, PlacesDetailedView
  },
  mounted() {
    this.getPlaces(this.currentPage)
  },
  methods: {
    getPlaces(current) {
      PlacesService.getPlacesByPage(current, 5).then(
        response => {
          this.places = response.data.results
          this.nextPage = response.data.nextPage
          this.previousPage = response.data.previousPage
        },
        error => {
          this.places = []
          this.message = error.response.data.message
        }
      ).catch(error => {
        this.message = 'Could not retrieve the places in New York at this point'
        console.log(error.toString())
      })
    },
    closeDetailedView() {
      this.details = false
    },
    showDetailedView(place) {
      if (this.details) {
        this.selectedPlace = place
      } else {
        this.details = !this.details
        this.selectedPlace = place
      }
    },
    getNextPage() {
      this.currentPage = this.nextPage.page
      this.getPlaces(this.nextPage.page)
      this.closeDetailedView()
    },
    getPreviousPage() {
      this.currentPage = this.previousPage.page
      this.getPlaces(this.previousPage.page)
      this.closeDetailedView()
    },
    addToFavourite() {
      var user = this.$store.state.account.user
      console.log(this.selectedPlace._id)
      user.favourite_places.push(this.selectedPlace._id)
      console.log(user.favourite_places)
      this.$store.dispatch('account/update', user).then(
        response => {
          console.log('Added to favourite places')
        },
        error => {
          console.log(error.response.data.message)
        }
      ).catch(error => {
        console.log(error.toString())
      })
    },
    isLoggedIn() {
      return this.$store.state.account.status.currentUser
    },
    hasFavPlace(selectedPlace) {
      return this.$store.state.account.user.favourite_places.includes(selectedPlace._id)
    }
  }
}
</script>

<style scoped>

</style>
