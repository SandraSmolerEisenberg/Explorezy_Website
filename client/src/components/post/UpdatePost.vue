<template>
<b-container>
  <label class="col-md-3">Choose a post:</label>
  <b-form-select class="custom-select my-1 col-md-8" v-model="postSelected" >
    <option v-for="post in posts" :key="post._id">
      {{ post.title }}
    </option>
  </b-form-select>
  <b-container v-if="postSelected">
    <ValidationObserver  v-slot="{ invalid }">
      <form v-if="!message" @submit.prevent="updatePost">
        <!-- Email -->
        <ValidationProvider name="title" rules="required" v-slot="{ errors }">
          <div class="form-group">
            <label for="title">Title</label>
            <input name="title" type="text" class="form-control" placeholder="title" v-model="post.title"/>
            <div  v-if="errors[0]" class="alert-danger">{{ errors[0] }}</div>
          </div>
        </ValidationProvider>
        <!-- Password -->
        <ValidationProvider name="text" rules="required" v-slot="{ errors }">
          <div class="form-group">
            <label for="text">Text</label>
            <textarea type="text" name="text" class="form-control" placeholder="text" v-model="post.text"/>
            <div v-if="errors[0]" class="alert-danger"> {{ errors[0] }}</div>
          </div>
        </ValidationProvider>
        <!-- Button -->
        <input type="submit" :disabled="invalid && postSelected" value="Submit" class="btn btn-primary mt-3"/>
        <div v-if="message">
          <div class="alert alert-danger">{{message}}</div>
        </div>
      </form>
      <div v-if="message">
        <div class="card-header">{{message}}</div>
      </div>
      <hr/>
    </ValidationObserver>
  </b-container>

</b-container>
</template>

<script>
import PostService from '@/services/PostService'
export default {
  name: 'UpdatePost',
  data() {
    return {
      postSelected: false,
      posts: [],
      post: {},
      message: ''
    }
  },
  methods: {
    getUsersPosts() {
      PostService.getAllPostsForUser(this.$store.state.account.user._id).then(
        response => {
          this.posts = response.data
          this.message = ''
          this.postSelected = false
        }
      )
    },
    updatePost() {
      const postToEdit = this.posts.find(obj => { return obj.title === this.postSelected })
      postToEdit.title = this.post.title
      postToEdit.text = this.post.text
      postToEdit.date = Date.now()
      PostService.updatePost(postToEdit).then(() => {
        this.message = 'Post Updated'
      })
    }
  }
}
</script>

<style scoped>

</style>
