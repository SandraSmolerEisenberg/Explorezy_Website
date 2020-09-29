<template>
  <div>
    <b-card>
<!--      <b-card-img :src=getImage></b-card-img>-->
      <b-card-img class="image" :src="getImage"></b-card-img>>
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
  }
}
</script>

<style scoped>
.image{
  width: 20em;
}
</style>
