<template>
  <div>
    <b-card>
      <b-card-header>{{trip.name}}</b-card-header>
      <hr/>
      <b-card-text>
        <b-card-sub-title>Places on trip</b-card-sub-title>
        <p>//ToDo show places here</p>
      </b-card-text>
      <b-card-text>
      <hr/>
    </b-card>
  </div>
</template>
<script>
export default {
  name: 'single-trip',
  props: ['trip'],
  computed: {

  }
}
</script>
<style scoped>

</style>
