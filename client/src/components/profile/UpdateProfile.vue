<template>
  <ValidationObserver v-slot="{ invalid }">
    <form v-if="!message" @submit.prevent="onUpdate">
      <!-- Email -->
      <ValidationProvider name="email" rules="required|email" v-slot="{ errors }">
        <div class="form-group">
          <label for="email">New Email</label>
          <input name="email" type="email" class="form-control" placeholder="email" v-model="newUser.email"/>
          <div  v-if="errors[0]" class="alert-danger">{{ errors[0] }}</div>
        </div>
      </ValidationProvider>
      <!-- Password -->
      <ValidationProvider name="password" rules="required|max:12|min:6" v-slot="{ errors }">
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" placeholder="password" v-model="newUser.password"/>
          <div v-if="errors[0]" class="alert-danger"> {{ errors[0] }}</div>
        </div>
      </ValidationProvider>
      <!-- First Name -->
      <ValidationProvider name="firstName" rules="alpha" v-slot="{ errors }">
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input name="firstName" type="text" class="form-control" placeholder="first name" v-model="newUser.first_name"/>
          <div  v-if="errors[0]" class="alert-danger">{{ errors[0] }}</div>
        </div>
      </ValidationProvider>
      <!-- Last Name -->
      <ValidationProvider name="lastName" rules="alpha" v-slot="{ errors }">
        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input name="lastName" type="text" class="form-control"  placeholder="last name" v-model="newUser.last_name"/>
          <div  v-if="errors[0]" class="alert-danger">{{ errors[0] }}</div>
        </div>
      </ValidationProvider>
      <!-- Button -->
      <input type="submit" value="Submit" :disabled="invalid" class="buttonColor"/>
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
export default {
  name: 'UpdateProfile',
  data() {
    return {
      message: '',
      newUser: {},
      userInStore: {}
    }
  },
  mounted() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.userInStore = this.$store.state.account.user
    },
    onUpdate() {
      this.newUser._id = this.userInStore._id
      this.$store.dispatch('account/update', this.newUser).then(
        response => {
          if (response._id === this.newUser._id) {
            this.message = 'Profile has been updated'
          }
        },
        error => {
          this.message = error.response.data.message
        }
      ).catch(error => {
        this.message = 'Your request could not be prosed at this time'
        console.log(error.toString())
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
