<template>
<b-container>
    <br>
    <span class="heading">{{place.name}}</span>
    <br><br>
    <b-card-text>
      <span class="heading">Information</span>
      <br/>
      {{introText}}
    </b-card-text>
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
