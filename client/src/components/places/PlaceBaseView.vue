<template>
<b-container>
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
</b-container>
</template>

<script>
export default {
  name: 'PlaceBaseView',
  props: ['place'],
  computed: {
    introText() {
      return this.getIntroText()
    }
  },
  methods: {
    getIntroText() {
      let introText = this.place.wikipedia_extracts.text
      let result = introText.split(' ')
      if (result.length > 20) {
        result = result.slice(0, 20)
        introText = result.join(' ') + '...'
      }
      return introText
    }
  }
}
</script>

<style scoped>

</style>
