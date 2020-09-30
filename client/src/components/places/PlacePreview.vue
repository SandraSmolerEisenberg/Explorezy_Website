<template>
  <div>
    <b-card>
      <b-card-img :src=place.image class="img"></b-card-img>
      <b-card-title>{{place.name}}</b-card-title>
      <b-card-sub-title class="mb-2">{{place.address.road}}</b-card-sub-title>
      <b-card-text>
        {{place.wikipedia_extracts.text}}
      </b-card-text>

      <b-button href="#" variant="primary">Details</b-button>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'place-preview',
  props: ['place'],
  methods: {
    // Some methods
  },
  data() {
    return {
      href: 'https://commons.wikimedia.org/wiki/File:G%C3%B6teborg.jpg'
    }
  }
}
</script>

<style scoped>

</style>
