<template>
  <div>
    <b-card>
      <b-card-header>{{post.title}}</b-card-header>
      <hr/>
      <b-card-text>
        <b-card-sub-title>Post text</b-card-sub-title>
        <p>{{introText}}</p>
      </b-card-text>
      <hr/>
    </b-card>
  </div>
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
