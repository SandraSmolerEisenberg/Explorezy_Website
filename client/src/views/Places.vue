<template>
  <div>
    <b-jumbotron header="Places" lead="Explore exiting places in New York!">
    </b-jumbotron>
      <b-row class="col-md">
        <b-col v-if="places">
          <b-container>
            <b-row>
              <b-col class="col-md-6">
                <b-card role="button" v-for="place in places" :key="place._id"  @click="showDetailedView(place)">
                  <PlaceBaseView :place="place"></PlaceBaseView>
                </b-card>
              </b-col>
              <b-col v-if="details" class="col-md-6">
                <b-card>
                  <b-button-close @click="closeDetailedView"></b-button-close>
                  <PlacesDetailedView :place="selectedPlace"></PlacesDetailedView>
                </b-card>
              </b-col>
            </b-row>
            <b-row class="row-cols-6 align-items-center">
              <b-button v-show="previousPage" @click="getPreviousPage">Previous</b-button>
              <b-button v-show="nextPage" @click="getNextPage">Next</b-button>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
  </div>
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
      message: 'none',
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
      )
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

<style>
.btn_message {
  margin-bottom: 1em;
}
</style>
