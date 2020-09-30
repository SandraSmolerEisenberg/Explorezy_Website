<template>
  <div>
    <b-container>
      <h2>Post Page</h2>
      <hr/>
      <div v-if="loggedIn">
        <b-button @click="createPostForm">{{buttonText}}</b-button>
        <hr/>
        <CreatePostForm v-if="form" @update="getAllPost"></CreatePostForm>
      </div>
      <b-card v-for="post in posts" :key="post._id">
        <SinglePost  :post="post"></SinglePost>
        <b-button v-if="currentUser" @click="deletePost(post)">Delete</b-button>
      </b-card>
    </b-container>
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
  computed: {
    currentUser() {
      return this.$store.state.account.user && this.post.author === this.$store.state.account.user._id
    },
    loggedIn() { return this.$store.state.account.status.currentUser }
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
    },
    deletePost(post) {
      PostService.deletePost(post).then(() => {
        this.getAllPost()
      })
    }
  }
}
</script>

<style>
.btn_message {
  margin-bottom: 1em;
}
</style>
