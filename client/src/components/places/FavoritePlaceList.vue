<template>
  <b-container>
      <b-button variant="primary" @click="addToFavourite" v-show="isLoggedIn() && !hasFavPlace(place)">Add to favourites</b-button>
    <hr/>
    <b-card-text v-if="message">
      {{message}}
      <hr/>
    </b-card-text>
    <b-card>
      <b-card-img :src=place.image class="img"></b-card-img>
      <b-card-header>{{place.name}}</b-card-header>
      <hr/>
      <b-card-text>
        <b-card-sub-title>Address</b-card-sub-title>
        <p>City: {{place.address.county}}
          Post Code: {{place.address.postcode}}
          Address: {{place.address.address29}}
          District: {{place.address.city_district}}</p>
      </b-card-text>
      <hr/>
      <b-card-text>
        <b-card-sub-title>Information</b-card-sub-title>
        <hr/>
        {{place.wikipedia_extracts.text}}
      </b-card-text>
      <hr/>
      <b-link>Wikipedia:
        {{place.wikipedia}}
      </b-link>
    </b-card>
  </b-container>

</template>

<script>
export default {
  name: 'FavoritePlacesList',
  props: ['place'],
  message: '',
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
    }
  },
  isLoggedIn() {
    return this.$store.state.account.status.currentUser
  },
  hasFavPlace(place) {
    return this.$store.state.account.user.favourite_places.includes(place._id)
  }

}
</script>

<style scoped>
.img{
  max-width: 28em;
}
</style>
