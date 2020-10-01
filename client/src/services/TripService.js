import { Api } from '@/Api'

class TripService {
  async getAllTrips() {
    return await Api.get('/trips')
  }

  async getAllPublicTrips() {
    return await Api.get('/trips?public=true')
  }

  async getTripByID(id) {
    return await Api.get('/trips/' + id)
  }

  async getPlaceFromTrip(tripID, placeID) {
    return await Api.get('/trips/' + tripID + '/places/' + placeID)
  }

  async createTrip(payload) {
    console.log(payload)
    return await Api.post('/trips', payload)
  }

  async addPlaceToTrip(tripID, placeID) {
    return await Api.post('/trips/' + tripID + '/places', { places: placeID })
  }
}

export default new TripService()
