<template>
<div>
  <b-card>
    <b-card-header>{{place.name}}</b-card-header>
    <hr/>
    <hr/>
    <b-card-text>
      <b-card-sub-title>Information</b-card-sub-title>
      <hr/>
      {{introText}}
    </b-card-text>
    <hr/>
  </b-card>
</div>
</template>

<script>
export default {
  name: 'PlaceBaceView',
  props: ['place'],
  computed: {
    introText() {
      return this.place.wikipedia_extracts.text.split('.')[0] + '.....'
    }
  }
}
</script>

<style scoped>

</style>
