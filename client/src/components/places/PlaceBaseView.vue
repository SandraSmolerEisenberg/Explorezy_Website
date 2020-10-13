<template>
<b-container>
    <span class="placeHeading">{{place.name}}</span>
    <hr/>
    <b-card-text>
      <span class="placeHeading">Information</span>
      <hr/>
      {{introText}}
    </b-card-text>
    <hr/>
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
