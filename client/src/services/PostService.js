import { Api } from '@/Api'

class PostService {
  async getAllPosts() {
    return await Api.get('/posts')
  }

  async createPost(post) {
    return await Api.post('/posts', post)
  }

  async deletePost(post) {
    return await Api.delete('/posts/' + post._id)
  }
}

export default new PostService()
