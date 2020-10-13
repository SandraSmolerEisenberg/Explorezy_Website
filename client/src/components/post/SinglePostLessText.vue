<template>
  <b-container class="tinyPlaceDesign">
      <span class="placeHeading">{{post.title}}</span>
      <hr/>
      <b-card-text>
        <span class="placeHeading">Post text</span>
        <p>{{introText}}</p>
      </b-card-text>
      <hr/>
  </b-container>
</template>
<script>
export default {
  name: 'SinglePostLessText',
  props: ['post'],
  computed: {
    introText() {
      return this.getIntroText()
    }
  },
  methods: {
    getIntroText() {
      let introText = this.post.text
      let result = introText.split(' ')
      if (result.length > 10) {
        result = result.slice(0, 10)
        introText = result.join(' ') + '...' + '\n' + 'To read complete post go to the post page...'
      }
      return introText
    }
  }
}
</script>
<style scoped>

</style>
