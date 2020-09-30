import { Api } from '@/Api'

class TripService {
  async getAllTrips() {
    return await Api.get('/trips')
  }

  async getTripByID(id) {
    return await Api.get('/trips/' + id)
  }

  async createTrip(trip) {
    return await Api.post('/trips', trip)
  }
}

export default new TripService()
