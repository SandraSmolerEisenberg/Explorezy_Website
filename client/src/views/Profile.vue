<template>
  <div>
    <b-container class="col-md-6">
      <h2>My Profile Page</h2>
      <hr/>
    <Profile></Profile>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Profile from '@/components/profile/Profile'

export default {
  name: 'profile',
  data() {
    return {
      message: 'none'
    }
  },
  components: {
    Profile
  }
}
</script>

<style>
.btn_message {
  margin-bottom: 1em;
}
</style>
