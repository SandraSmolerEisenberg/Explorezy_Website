<template>
  <b-container>
    <br>
      <span class="placeHeading" >{{post.title}}</span>
      <b-card-text>
        <br>
        <span class="placeHeading">Post text</span>
        <p>{{post.text}}</p>
      </b-card-text>
      <b-card-text>
        <span class="placeHeading">Last updated on:</span>
        <p>{{creationDate}}</p>
      </b-card-text>
  </b-container>
</template>
<script>
export default {
  name: 'SinglePost',
  props: ['post'],
  computed: {
    creationDate() {
      return this.post.date.split('T')[0]
    }
  }
}
</script>
<style scoped>

</style>
