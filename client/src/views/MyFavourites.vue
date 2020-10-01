<template>
  <div>
    <b-jumbotron header="My Favourite Places">
    </b-jumbotron>
    <b-container>
      <b-card-header v-show="message">{{message}}</b-card-header>
      <b-row>
        <b-card v-for="place in places" :key="place._id">
          <b-button variant="danger" @click="removeFromList(place)">Remove from my Favourite</b-button>
          <FavoritePlaceList :place="place"></FavoritePlaceList>
        </b-card>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import PlacesService from '@/services/PlacesService'
import FavoritePlaceList from '@/components/places/FavoritePlaceList'
export default {
  name: 'myfavourites',
  data() {
    return {
      message: '',
      userFavourite: [],
      places: []
    }
  },
  components: {
    FavoritePlaceList
  },
  mounted() {
    this.loadFavouritePlace()
  },
  methods: {
    removeFromList(place) {
      const newUser = {}
      newUser._id = this.$store.state.account.user._id
      const index = this.userFavourite.indexOf(place._id)
      this.userFavourite.splice(index, 1)
      newUser.favourite_places = this.userFavourite

      this.$store.dispatch('account/update', newUser).then(
        response => {
          if (response._id === newUser._id) {
            this.message = 'Profile has been updated'
            const placeIndex = this.places.indexOf(place)
            this.places.splice(placeIndex, 1)
          }
        },
        error => {
          this.message = error.response.data.message
        }
      )
    },
    removeItemFormList(arr, value) {
      const index = arr.indexOf(value)
      if (index > -1) {
        arr.splice(index, 1)
      }
      return arr
    },
    loadFavouritePlace() {
      this.userFavourite = this.$store.state.account.user.favourite_places
      if (this.userFavourite.length > 0) {
        this.getFavoritePlaces()
      } else {
        this.message = "You don't have any places in your list"
      }
    },
    getFavoritePlaces() {
      for (let i = 0; i < this.userFavourite.length; i++) {
        PlacesService.getPlaceByID(this.userFavourite[i]).then(
          response => {
            this.places.push(response.data)
          }
        )
      }
    }
  }
}
</script>

<style>
.btn_message {
  margin-bottom: 1em;
}
</style>
