<template>
  <div>
    <b-card>
      <b-card-header>{{post.title}}</b-card-header>
      <hr/>
      <b-card-text>
        <b-card-sub-title>Post text</b-card-sub-title>
        <p>{{post.text}}</p>
      </b-card-text>
      <hr/>
    </b-card>
  </div>
</template>
<script>
export default {
  name: 'SinglePost',
  props: ['post']
}
</script>
<style scoped>

</style>
