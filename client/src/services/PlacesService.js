import { Api } from '@/Api'

class PlacesService {
  async getAllPlaces() {
    return await Api.get('/places')
  }
}

export default new PlacesService()
