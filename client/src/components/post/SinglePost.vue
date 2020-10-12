<template>
  <b-container>
    <b-card>
      <b-card-header>{{post.title}}</b-card-header>
      <hr/>
      <b-card-text>
        <b-card-sub-title>Post text</b-card-sub-title>
        <p>{{post.text}}</p>
      </b-card-text>
      <b-card-text>
        <b-card-sub-title>Last updated on:</b-card-sub-title>
        <p>{{creationDate}}</p>
      </b-card-text>
      <hr/>
    </b-card>
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
