<template>
  <b-container class="paddingClass">
      <b-card-img :src=place.image class="imageClass"></b-card-img>
      <span class="placeHeading">{{place.name}}</span>
      <br><br>
      <b-card-text>
        <span class="placeHeading">Address</span>
        <p>City: {{place.address.county}};
          Post Code: {{place.address.postcode}};
          Road: {{place.address.road}};
          County: {{place.address.county}}</p>
      </b-card-text>
      <br>
      <b-card-text>
        <span class="placeHeading">Information</span>
        <br>
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
  props: ['place'],
  computed: {
    getImage() {
      return this.place.image
    }
  },
  methods: {
    checkUser(place) {
      return this.$store.state.account.status.currentUser && !this.$store.state.account.user.favourite_places.includes(place._id)
    }
  }
}
</script>

<style scoped>

</style>
