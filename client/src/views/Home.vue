<template>
  <div>
    <b-jumbotron header="Welcome to Explorezy" lead="Explore exiting places in Gothenburg!">
    </b-jumbotron>
      <b-row class="col-md"><b-col class="col-md-6">Left</b-col><b-col class="col-md-6">Right</b-col></b-row>
  </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'home',
  data() {
    return {
      message: 'none'
    }
  },
  methods: {
    getMessage() {
      Api.get('/')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
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
