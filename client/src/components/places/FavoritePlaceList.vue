<template>
  <b-container>
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
  }

}
</script>

<style scoped>
.img{
  max-width: 28em;
}
</style>
