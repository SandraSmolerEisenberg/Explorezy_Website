<template>
  <b-container>
    <hr/>
  <b-card>
    <span class="placeHeading">{{currentUser.first_name || 'No name is added'}}</span>
    <br>
    <b-card-body>
      <p>
        <strong>First Name:</strong>
        {{currentUser.first_name || 'N/A'}}
      </p>
      <p>
        <strong>Last Name:</strong>
        {{currentUser.last_name || 'N/A'}}
      </p>
      <p>
        <strong>Email:</strong>
        {{currentUser.email}}
      </p>
      <p>
        <strong>Favourite Places saved:</strong>
        {{currentUser.favourite_places.length}}
      </p>
      <p>
        <strong>Trips saved:</strong>
        {{currentUser.trips.length}}
      </p>
    </b-card-body>
  </b-card>
  <hr/>
  </b-container>
</template>

<script>
export default {
  name: 'Profile',
  computed: {
    currentUser() {
      return this.$store.state.account.user
    }
  }

}
</script>

<style scoped>

</style>
