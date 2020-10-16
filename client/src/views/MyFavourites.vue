<template>
  <b-container>
      <h2>My Favourite Places</h2>
      <hr/>
      <b-card-header v-show="message">{{message}}</b-card-header>
      <b-row>
        <b-container class="place-detailed-view-styling" v-for="place in places" :key="place._id">
          <b-button class="button-styling" @click="removeFromList(place)">Remove from Favourites</b-button>
          <FavoritePlaceList :place="place"></FavoritePlaceList>
        </b-container>
      </b-row>
    </b-container>
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
            this.message = 'Place has been removed'
            const placeIndex = this.places.indexOf(place)
            this.places.splice(placeIndex, 1)
            window.setInterval(() => {
              this.message = ''
            }, 3000)
          }
        },
        error => {
          this.message = error.response.data.message
        }
      ).catch(error => {
        this.message = 'Your request could not be prosed at this time'
        console.log(error.toString())
      })
    },
    removeItemFormList(places, itemToRemove) {
      const index = places.indexOf(itemToRemove)
      if (index > -1) {
        places.splice(index, 1)
      }
      return places
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
        ).catch(error => {
          console.log(error.toString())
          this.message = 'Your request could not be prosed at this time'
        })
      }
    }
  }
}
</script>

<style>

</style>
