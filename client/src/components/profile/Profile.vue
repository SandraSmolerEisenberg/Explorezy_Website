<template>
  <b-card>
    <b-card-header>{{currentUser.first_name || 'No name is added'}}</b-card-header>
    <b-card-body>
      <p>
        <strong>First Name:</strong>
        {{currentUser.first_name || 'N/A'}}
      </p>
      <p>
        <strong>Last Name:</strong>
        {{currentUser.first_name || 'N/A'}}
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
</template>

<script>
export default {
  name: 'Profile',
  computed: {
    currentUser() {
      return this.$store.state.account.user[0]
    }
  }

}
</script>

<style scoped>

</style>
