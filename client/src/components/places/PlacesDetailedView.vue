<template>
  <b-container class="paddingClass">
      <b-button class="buttonColor" @click="addToFavourite" v-show="isLoggedIn() && !hasFavPlace(place)">Add to favourites</b-button>
    <b-card-text v-if="message">
      {{message}}
    <hr/>
    </b-card-text>
      <b-card-sub-title  v-show="isLoggedIn() && hasFavPlace(place)">In my Favorite list</b-card-sub-title>
      <b-card-img :src=place.image class="imageClass"></b-card-img>
      <span class="placeHeading">{{place.name}}</span>
      <hr/>
      <b-card-text>
        <span class="placeHeading">Address</span>
        <p>City: {{place.address.county}}
          Post Code: {{place.address.postcode}}
          Address: {{place.address.address29}}
          District: {{place.address.city_district}}</p>
      </b-card-text>
      <hr/>
      <b-card-text>
        <span class="placeHeading">Information</span>
        <hr/>
        {{place.wikipedia_extracts.text}}
      </b-card-text>
      <hr/>
      <span class="placeHeading">Wikipedia</span>
      <br>
      <a v-bind:href="place.wikipedia" target="_blank">View Wikipedia Article</a>
  </b-container>

</template>

<script>
export default {
  name: 'PlacesDetailedView',
  message: '',
  props: ['place'],
  computed: {
    getImage() {
      return this.place.image
    }
  },
  methods: {
    addToFavourite() {
      var user = this.$store.state.account.user
      console.log(this.place._id)
      user.favourite_places.push(this.place._id)
      console.log(user.favourite_places)
      this.$store.dispatch('account/update', user).then(
        response => {
          console.log('Added to favourite places')
        },
        error => {
          console.log(error.response.data.message)
        }
      ).catch(error => {
        this.message = 'Your request could not be prosed at this time'
        console.log(error.toString())
      })
    },
    checkUser(place) {
      return this.$store.state.account.status.currentUser && !this.$store.state.account.user.favourite_places.includes(place._id)
    },
    isLoggedIn() {
      return this.$store.state.account.status.currentUser
    },
    hasFavPlace(place) {
      return this.$store.state.account.user.favourite_places.includes(place._id)
    }
  }
}
</script>

<style scoped>

</style>
