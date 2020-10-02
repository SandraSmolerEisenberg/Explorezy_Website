<template>
  <b-container>
    <b-container class="col-md-6">
      <h2>My Profile Page</h2>
      <hr/>
    <Profile v-if="!updating"></Profile>
      <UpdateProfile v-if="updating"></UpdateProfile>
      <b-button @click="update()">{{getButtonText}}</b-button>
    </b-container>
  </b-container>
</template>

<script>
// @ is an alias to /src
import Profile from '@/components/profile/Profile'
import UpdateProfile from '@/components/profile/UpdateProfile'

export default {
  name: 'profile',
  data() {
    return {
      updating: false
    }
  },
  computed: {
    getButtonText() {
      return this.updating ? 'Back to Profile' : 'Update Profile'
    }
  },
  components: {
    Profile, UpdateProfile
  },
  methods: {
    update() {
      this.updating = !this.updating
    }
  }
}
</script>

<style>

</style>
