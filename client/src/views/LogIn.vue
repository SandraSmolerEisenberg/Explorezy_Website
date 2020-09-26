<template>
  <div>
    <p>{{users}}</p>
    <form name="form" @submit.prevent="login">
        <div class="form-group">
          <label for="username">Email</label>
          <input
            v-model="user.email"
            type="text"
            class="form-control"
            name="email"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="user.password"
            type="password"
            class="form-control"
            name="password"
          />
        </div>
        <div class="form-group">
          <button class="btn btn-info  btn-block">
            <span class="text-white">Login</span>
          </button>
        </div>
        <div v-if="message">
          {{message}}
        </div>
      </form>
  </div>
</template>

<script>
// @ is an alias to /src
import User from '../models/User'

export default {
  name: 'login',
  data() {
    return {
      message: '',
      user: new User('', '', '', '', [], []),
      users: []
    }
  },
  methods: {
    login() {
      this.$store.dispatch('account/login', this.user).then(
        () => {
          this.$router.push('/profile')
        },
        error => {
          this.message = error.toString()
        }
      )
    }
  }

}
</script>

<style>
.btn_message {
  margin-bottom: 1em;
}
</style>
