<template>
  <b-container>
    <b-container>
      <b-card-img :src=place.image class="favourite-img"></b-card-img>
      <br>
      <span class="heading">{{place.name}}</span>
      <br><br>
      <b-card-text>
        <span class="heading">Address</span>
        <p>City: {{place.address.county}};
          Post Code: {{place.address.postcode}};
          Road: {{place.address.road}};
          County: {{place.address.county}}</p>
      </b-card-text>
      <br>
      <b-card-text>
        <span class="heading">Information</span>
        <br>
        {{place.wikipedia_extracts.text}}
      </b-card-text>
      <br>
      <span class="heading">Wikipedia</span>
      <br>
      <a v-bind:href="place.wikipedia" target="_blank">View Wikipedia Article</a>
    </b-container>
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
  }

}
</script>

<style scoped>
</style>
