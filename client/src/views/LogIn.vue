<template>
  <div>
    <h2>Login Page</h2>
    <ValidationObserver v-slot="{ login }">
      <form @submit.prevent="login(onLogin)">

        <!-- Email -->
        <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
          <div class="form-group">
            <label>Email</label>
            <input type="email" class="form-control" v-model="user.email">
            <span>{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <!-- Password -->
        <ValidationProvider name="password" rules="required|max:12|min:6" v-slot="{ errors }">
          <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" v-model="user.password">
            <span>{{ errors[0] }}</span>
          </div>
        </ValidationProvider>

        <!-- Button -->
        <input type="submit" class="btn btn-primary mt-3">

        <div v-if="message">
          {{message}}
        </div>

      </form>
    </ValidationObserver>
  </div>
</template>

<script>
// @ is an alias to /src
import User from '../models/User'

export default {
  data() {
    return {
      message: '',
      user: new User('', '', '', '', [], [])
    }
  },
  methods: {
    onLogin() {
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
