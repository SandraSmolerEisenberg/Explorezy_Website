import { Api } from '@/Api'

class PostService {
  async getAllPosts() {
    return await Api.get('/posts')
  }

  async createPost(post) {
    return await Api.post('/posts', post)
  }
}

export default new PostService()
