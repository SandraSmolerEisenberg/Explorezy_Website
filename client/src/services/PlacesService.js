import { Api } from '@/Api'

class PlacesService {
  async getAllPlaces() {
    return await Api.get('/places')
  }

  async getPlaceByID(id) {
    return await Api.get('/places/' + id)
  }

  async getPlacesByPage(currentPage, limit) {
    return await Api.get('/places?page=' + currentPage + '&limit=' + limit)
  }
}

export default new PlacesService()
