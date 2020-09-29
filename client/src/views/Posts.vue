<template>
  <div>
    <b-container>
      <h2>Post Page</h2>
      <hr/>
      <b-button @click="createPostForm">{{buttonText}}</b-button>
      <hr/>
      <CreatePostForm v-if="form"></CreatePostForm></b-container>
      <SinglePost v-for="post in posts" :key="post._id" :post="post"></SinglePost>
  </div>
</template>

<script>
// @ is an alias to /src
import PostService from '@/services/PostService'
import CreatePostForm from '@/components/post/CreatePostForm'
import SinglePost from '@/components/post/SinglePost'
export default {
  name: 'posts',
  data() {
    return {
      buttonText: '',
      posts: [],
      form: false
    }
  },
  mounted() {
    this.getAllPost()
    this.buttonText = 'Create New Post'
  },
  components: {
    CreatePostForm, SinglePost
  },
  methods: {
    getAllPost() {
      PostService.getAllPosts().then(
        responce => {
          this.posts = responce.data.posts
        }
      )
    },
    createPostForm() {
      this.form = !this.form
      this.buttonText = this.form ? 'Minimize' : 'Create New Post'
    }
  }
}
</script>

<style>
.btn_message {
  margin-bottom: 1em;
}
</style>
