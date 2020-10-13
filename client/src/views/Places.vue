<template>
  <b-container>
    <h2>Explore exiting places in New York!</h2>
    <hr/>
    <b-card-text v-if="message">{{message}}</b-card-text>

    <b-row class="col-md">
        <b-col v-if="places">
          <b-container>
            <b-row>
              <b-col class="col-md">
                <b-card role="button" v-for="place in places" :key="place._id"  @click="showDetailedView(place)">
                  <PlaceBaseView :place="place"></PlaceBaseView>
                </b-card>
              </b-col>
              <b-col v-if="details" class="col-md">
                <b-card>
                  <b-button-close class="buttonColor" @click="closeDetailedView"></b-button-close>
                  <PlacesDetailedView :place="selectedPlace"></PlacesDetailedView>
                </b-card>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-button class="buttonColor" v-show="previousPage" @click="getPreviousPage">Previous</b-button>
                <b-button class="buttonColor" v-show="nextPage" @click="getNextPage">Next</b-button>
              </b-col>
            </b-row>
          </b-container>
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
    }
  }
}
</script>

<style scoped>

</style>
