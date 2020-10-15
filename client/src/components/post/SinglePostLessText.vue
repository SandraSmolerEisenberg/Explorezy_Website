<template>
  <b-container class="tiny-place-styling">
    <br>
      <span class="heading">{{post.title}}</span>
      <br><br>
      <b-card-text>
        <span class="heading">Post text</span>
        <p>{{introText}}</p>
      </b-card-text>
      <br>
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
