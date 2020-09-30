<template>
  <ValidationObserver v-slot="{ invalid }">
    <form v-if="!message" @submit.prevent="createTrip">
      <!-- Trip name -->
      <ValidationProvider name="name" rules="required|alpha_spaces" v-slot="{ errors }">
        <div class="form-group">
          <label for="name">Title</label>
          <input name="name" type="text" class="form-control" placeholder="name" v-model="trip.name"/>
          <div  v-if="errors[0]" class="alert-danger">{{ errors[0] }}</div>
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
import TripService from '@/services/TripService'
export default {
  name: 'CreateTripForm',
  data() {
    return {
      trip: {},
      message: ''
    }
  },
  methods: {
    createTrip() {
      this.trip.user = this.$store.state.account.user._id
      TripService.createTrip(this.trip).then(
        () => {
          this.message = 'Your trip has been added'
          this.$emit('update')
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
