<template>
    <b-container>
      <h2>Post Page</h2>
      <hr/>
      <b-tabs class="tabs-styling" v-if="loggedIn" content-class="mt-3">
        <b-tab :title-link-class="'tabText'" @click="getAllPost" title="Posts" active>
          <b-card-text v-if="message">{{message}}</b-card-text>
          <b-container class="post-styling" v-for="post in posts" :key="post._id">
            <SinglePost :post="post"></SinglePost>
            <b-button class="button-styling" v-if="currentUser(post)" @click="deletePost(post)">Delete</b-button>
          </b-container>
        </b-tab>
        <b-tab :title-link-class="'tabText'" class="tabsColor" title="Create" @click="clearData">
          <b-container v-if="loggedIn">
            <CreatePostForm ref="createPost" @update="getAllPost"></CreatePostForm>
          </b-container>
        </b-tab>
        <b-tab :title-link-class="'tabText'" @click="loadUserPost" title="Edit">
          <UpdatePost ref="updatePost"></UpdatePost>
        </b-tab>
      </b-tabs>
      <b-container v-if="!loggedIn">
        <b-card-text v-if="message">{{message}}</b-card-text>
        <b-container v-for="post in posts" :key="post._id">
        <SinglePost class="post-styling" :post="post"></SinglePost>
        </b-container>
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
    loggedIn() { return this.$store.state.account.status.currentUser }
  },
  components: {
    CreatePostForm, SinglePost, UpdatePost
  },
  methods: {
    currentUser(post) {
      return post.author === this.$store.state.account.user._id
    },
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
      ).catch(error => {
        this.message = 'Could not retrieve the posts at this time'
        console.log(error.toString())
      })
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

</style>
