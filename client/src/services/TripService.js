import { Api } from '@/Api'

class TripService {
  async getAllTrips() {
    return await Api.get('/trips')
  }

  async getPlaceByID(id) {
    return await Api.get('/trips/' + id)
  }

  async getPlacesByPage(currentPage, limit) {
    return await Api.get('/trips?page=' + currentPage + '&limit=' + limit)
  }
}

export default new TripService()
