<template>
  <div>
      <b-button variant="primary" @click="addToFavourite" v-show="isLoggedIn() && !hasFavPlace(place)">Add to favourites</b-button>
    <b-card>
      <b-card-sub-title  v-show="isLoggedIn() && hasFavPlace(place)">In my Favorite list</b-card-sub-title>
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
  </div>

</template>

<script>
export default {
  name: 'PlacesDetailedView',
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
      )
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
.img{
  width: 28em;
}
</style>
