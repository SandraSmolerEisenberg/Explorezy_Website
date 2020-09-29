<template>
  <ValidationObserver v-slot="{ invalid }">
    <form v-if="!message" @submit.prevent="createPost">
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
      <input type="submit" :disabled="invalid" class="btn btn-primary mt-3"/>
      <div v-if="message">
        <div class="alert alert-danger">{{message}}</div>
      </div>
    </form>
    <div v-if="message">
      <div class="card-header">{{message}}</div>
    </div>
    <hr/>
  </ValidationObserver>
</template>

<script>
import PostService from '@/services/PostService'
export default {
  name: 'CreatePostForm',
  data() {
    return {
      post: {},
      message: ''
    }
  },
  methods: {
    createPost() {
      this.post.author = this.$store.state.account.user._id
      PostService.createPost(this.post).then(
        response => {
          if (response.title === this.post.title) {
            this.message = 'Your post has been added'
          }
        },
        error => {
          this.message = error.response.data.message
        }
      )
    }
  }
}
</script>

<style scoped>

</style>
