import { Api } from '@/Api'
import TripService from '@/services/TripService'
class UserSevice {
  async login(user) {
    return await Api.post('/users/login', {
      email: user.email,
      password: user.password
    })
      .then(response => {
        if (response.data) {
          localStorage.setItem('account', response.data)
        }
        return response.data
      })
  }

  async register(user) {
    return await Api.post('/users', user)
      .then(response => {
        if (response.data) {
          localStorage.setItem('account', response.data)
        }
        return response.data
      })
  }

  async addTrip(payload) {
    return await TripService.createTrip(payload.trip).then(
      (response) => {
        return Api.post('/users/' + payload.user._id + '/trips', { trip: response.data })
          .then(response => {
            if (response.data) {
              localStorage.setItem('account', response.data)
            }
            return response.data
          })
      }
    )
  }

  async deleteUserTrips(id) {
    return await TripService.deleteUserTrips(id).then(
      (response) => {
        return Api.delete('/users/' + id + '/trips')
          .then(response => {
            if (response.data) {
              localStorage.setItem('account', response.data)
            }
            return response.data
          })
      }
    )
  }

  async deleteUserOneTrip(payload) {
    return await TripService.deleteOneTrip(payload.tripID).then(
      (response) => {
        return Api.delete('/users/' + payload.userID + '/trips/' + payload.tripID)
          .then(response => {
            if (response.data) {
              localStorage.setItem('account', response.data)
            }
            return response.data
          })
      }
    )
  }

  async update(user) {
    return await Api.patch('/users/' + user._id, user)
      .then(response => {
        if (response.data) {
          localStorage.setItem('account', response.data)
        }
        return response.data
      })
  }

  loggOut() {
    localStorage.removeItem('user')
  }

  getAllUsers() {
    return Api.get('/users')
  }
}

export default new UserSevice()
