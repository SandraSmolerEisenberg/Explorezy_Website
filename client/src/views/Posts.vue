<template>
    <b-container>
      <h2>Post Page</h2>
      <hr/>
      <b-tabs v-if="loggedIn" content-class="mt-3">
        <b-tab @click="getAllPost" title="Posts" active>
          <b-card-text v-if="message">{{message}}</b-card-text>
          <b-card v-for="post in posts" :key="post._id">
            <SinglePost :post="post"></SinglePost>
            <b-button v-if="currentUser"  @click="deletePost(post)">Delete</b-button>
          </b-card>
        </b-tab>
        <b-tab title="Create Post" @click="clearData">
          <b-card v-if="loggedIn">
            <CreatePostForm ref="createPost" @update="getAllPost"></CreatePostForm>
          </b-card>
        </b-tab>
        <b-tab @click="loadUserPost" title="Edit Post">
          <UpdatePost ref="updatePost"></UpdatePost>
        </b-tab>
      </b-tabs>
      <b-container v-if="!loggedIn">
        <b-card-text v-if="message">{{message}}</b-card-text>
        <b-card v-for="post in posts" :key="post._id">
        <SinglePost  :post="post"></SinglePost>
        <b-button v-if="currentUser" @click="deletePost(post)">Delete</b-button>
        </b-card>
      </b-container>

    </b-container>

</template>

<script>
// @ is an alias to /src
import PostService from '@/services/PostService'
import CreatePostForm from '@/components/post/CreatePostForm'
import SinglePost from '@/components/post/SinglePost'
import UpdatePost from '@/components/post/UpdatePost'
export default {
  name: 'posts',
  data() {
    return {
      message: '',
      posts: []
    }
  },
  mounted() {
    this.getAllPost()
  },
  computed: {
    currentUser() {
      return this.$store.state.account.user && this.posts.author === this.$store.state.account.user._id
    },
    loggedIn() { return this.$store.state.account.status.currentUser }
  },
  components: {
    CreatePostForm, SinglePost, UpdatePost
  },
  methods: {
    getAllPost() {
      PostService.getAllPosts().then(
        response => {
          this.posts = response.data.posts
          if (this.posts.length === 0) {
            this.message = 'There are currently no posts'
          } else {
            this.message = ''
          }
        }
      )
    },
    loadUserPost() {
      this.$refs.updatePost.getUsersPosts()
    },
    clearData() {
      this.$refs.createPost.clearData()
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
