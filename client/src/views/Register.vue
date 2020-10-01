<template>
  <div>
    <h2>Registration Page</h2>
    <ValidationObserver v-slot="{ invalid }">
      <form @submit.prevent="onRegister">

        <!-- Email -->
        <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
          <div class="form-group">
            <label for="email">Email</label>
            <input name="email" type="email" class="form-control" v-model="user.email"/>
            <div  v-if="errors[0]" class="alert-danger">{{ errors[0] }}</div>
          </div>
        </ValidationProvider>
        <!-- Password -->
        <ValidationProvider name="password" rules="required|max:12|min:6" v-slot="{ errors }">
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" v-model="user.password"/>
            <div v-if="errors[0]" class="alert-danger"> {{ errors[0] }}</div>
          </div>
        </ValidationProvider>
        <!-- First Name -->
        <ValidationProvider name="firstName" rules="alpha" v-slot="{ errors }">
          <div class="form-group">
            <label for="firstName">First Name</label>
            <input name="firstName" type="text" class="form-control" v-model="user.first_name"/>
            <div  v-if="errors[0]" class="alert-danger">{{ errors[0] }}</div>
          </div>
        </ValidationProvider>
        <!-- Last Name -->
        <ValidationProvider name="lastName" rules="alpha" v-slot="{ errors }">
          <div class="form-group">
            <label for="lastName">Last Name</label>
            <input name="lastName" type="text" class="form-control" v-model="user.last_name"/>
            <div  v-if="errors[0]" class="alert-danger">{{ errors[0] }}</div>
          </div>
        </ValidationProvider>
        <!-- Button -->
        <input type="submit" :disabled="invalid" class="btn btn-primary mt-3"/>
        <div v-if="message">
         <div class="alert alert-danger">{{message}}</div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script>
// @ is an alias to /src
import User from '../models/User'

export default {
  name: 'register',
  data() {
    return {
      message: '',
      user: new User('', '', '', '', [], [])
    }
  },
  methods: {
    onRegister() {
      this.$store.dispatch('account/register', this.user).then(
        () => {
          this.$router.push('/profile').catch(error => {
            console.log(error.message)
          })
        },
        error => {
          console.log(error.toString())
          this.message = error.response.data.message
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
